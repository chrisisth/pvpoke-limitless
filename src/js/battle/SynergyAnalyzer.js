/**
 * Synergy Analyzer
 * Calculates type synergies, movesets compatibility and team synergy scores
 */

class SynergyAnalyzer {
	constructor(basePokemon, allPokemon, battle, ranker) {
		this.basePokemon = basePokemon;
		this.allPokemon = allPokemon;
		this.battle = battle;
		this.ranker = ranker;
		
		// Synergy weights
		this.weights = {
			weaknessAbsorption: 0.30,
			mutualResistances: 0.20,
			offensiveCoverage: 0.20,
			roleComplement: 0.15,
			metaRobustness: 0.15
		};

		// Simple type matchup system (from Pokémon type data)
		this.typeWeaknesses = {
			'normal': ['fighting'],
			'fire': ['water', 'ground', 'rock'],
			'water': ['grass', 'electric'],
			'grass': ['fire', 'ice', 'poison', 'flying', 'bug'],
			'electric': ['ground'],
			'ice': ['fire', 'fighting', 'rock', 'steel'],
			'fighting': ['flying', 'psychic', 'fairy'],
			'poison': ['ground', 'psychic'],
			'ground': ['water', 'grass', 'ice'],
			'flying': ['electric', 'ice', 'rock'],
			'psychic': ['bug', 'ghost', 'dark'],
			'bug': ['fire', 'flying', 'rock'],
			'rock': ['water', 'grass', 'fighting', 'ground', 'steel'],
			'ghost': ['ghost', 'dark'],
			'dragon': ['ice', 'dragon', 'fairy'],
			'dark': ['fighting', 'bug', 'fairy'],
			'steel': ['fire', 'water', 'ground'],
			'fairy': ['poison', 'steel']
		};

		this.typeResistances = {
			'normal': [],
			'fire': ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
			'water': ['fire', 'water', 'ice', 'steel'],
			'grass': ['ground', 'water', 'grass'],
			'electric': ['flying', 'steel', 'electric'],
			'ice': ['ice'],
			'fighting': ['rock', 'bug', 'dark'],
			'poison': ['grass', 'poison'],
			'ground': ['poison', 'rock'],
			'flying': ['fighting', 'bug', 'grass'],
			'psychic': ['fighting', 'psychic'],
			'bug': ['grass', 'fighting', 'ground'],
			'rock': ['normal', 'flying', 'poison', 'fire'],
			'ghost': ['poison', 'bug'],
			'dragon': ['fire', 'water', 'grass', 'electric'],
			'dark': ['ghost', 'dark'],
			'steel': ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'],
			'fairy': ['fighting', 'bug', 'dark']
		};
	}

	/**
	 * Find best synergy partners for the base pokemon
	 * Tests different movesets for each candidate
	 */
	findBestPartners(cp, cup, limit = 50, progressCallback = null) {
		const synergies = [];
		const candidatePokemon = this._getValidCandidates(cp, cup);
		const totalCandidates = candidatePokemon.length;
		
		for (let i = 0; i < candidatePokemon.length; i++) {
			const candidate = candidatePokemon[i];
			
			// Calculate synergy with different movesets
			const score = this._calculateSynergyWithVariations(this.basePokemon, candidate, cp, cup);
			
			if (score) {
				synergies.push({
					pokemon: candidate,
					score: score,
					rank: 0
				});
			}
			
			// Progress callback
			if (progressCallback) {
				progressCallback((i + 1) / totalCandidates);
			}
		}
		
		// Sort by score descending
		synergies.sort((a, b) => b.score.total - a.score.total);
		
		// Assign ranks
		for (let i = 0; i < synergies.length; i++) {
			synergies[i].rank = i + 1;
		}
		
		return synergies.slice(0, limit);
	}

	/**
	 * Get valid candidate pokemon (exclude base, shadows, alts)
	 */
	_getValidCandidates(cp, cup) {
		const candidates = [];
		const seenSpecies = {};
		
		for (let i = 0; i < this.allPokemon.length; i++) {
			const poke = this.allPokemon[i];
			
			// Skip the base pokemon
			if (poke.speciesId === this.basePokemon.speciesId) {
				continue;
			}
			
			// Skip if already have this species
			if (seenSpecies[poke.dex]) {
				continue;
			}
			
			// Check if eligible for cup
			if (!this._isEligibleForCup(poke, cup)) {
				continue;
			}
			
			candidates.push(poke);
			seenSpecies[poke.dex] = true;
		}
		
		return candidates;
	}

	/**
	 * Check if pokemon is eligible for cup
	 */
	_isEligibleForCup(pokemon, cup) {
		if (cup === 'all') {
			return true;
		}
		
		// Add cup-specific eligibility checks if needed
		if (pokemon.hasTag && pokemon.hasTag("cupexclude")) {
			return false;
		}
		
		return true;
	}

	/**
	 * Calculate synergy with different movesets for the candidate
	 * FIX: Keine Pokemon.clone() - nutze Original und teste verschiedene Movesets
	 */
	_calculateSynergyWithVariations(basePoke, candidatePoke, cp, cup) {
		const allScores = [];
		
		// Get all possible movesets for candidate
		const movesets = this._getMovesetsForPokemon(candidatePoke);
		
		// Test each moveset variation WITHOUT modifying the pokemon object
		for (let i = 0; i < movesets.length; i++) {
			const moveset = movesets[i];
			
			// Calculate synergy scores directly - pass moveset as parameter
			const score = this._calculateSynergyScore(basePoke, candidatePoke, cp, cup, moveset);
			if (score) {
				allScores.push({...score, moveset: moveset});
			}
		}
		
		// Return best score with moveset info
		if (allScores.length === 0) {
			return null;
		}
		
		allScores.sort((a, b) => b.total - a.total);
		return allScores[0]; // Return best moveset result
	}

	/**
	 * Get all possible movesets for a pokemon
	 * FIX: Defensive checks - fastMove/chargedMoves könnten null sein
	 */
	_getMovesetsForPokemon(pokemon) {
		const movesets = [];
		
		// Get fast moves
		const fastMoves = pokemon.fastMovePool || [];
		const chargedMoves = pokemon.chargedMovePool || [];
		
		// Generate moveset combinations (limit to top combinations)
		if (fastMoves.length === 0 || chargedMoves.length === 0) {
			return movesets;
		}
		
		// Always test the optimal moveset first - but check if it exists
		if (pokemon.fastMove && pokemon.chargedMoves && pokemon.chargedMoves.length > 0) {
			movesets.push({
				fast: pokemon.fastMove.moveId,
				charged: pokemon.chargedMoves.map(m => m.moveId),
				isOptimal: true
			});
		} else {
			// If no selected moves, use first available from pools
			if (fastMoves.length > 0 && chargedMoves.length > 0) {
				movesets.push({
					fast: fastMoves[0].moveId,
					charged: [chargedMoves[0].moveId],
					isOptimal: true
				});
			}
		}
		
		// Test other fast moves with current charged moves
		const chargedMoveIds = pokemon.chargedMoves && pokemon.chargedMoves.length > 0
			? pokemon.chargedMoves.map(m => m.moveId)
			: (chargedMoves.length > 0 ? [chargedMoves[0].moveId] : []);
		
		for (let i = 0; i < Math.min(fastMoves.length, 3); i++) {
			const currentFastId = pokemon.fastMove ? pokemon.fastMove.moveId : null;
			if (fastMoves[i].moveId !== currentFastId && chargedMoveIds.length > 0) {
				movesets.push({
					fast: fastMoves[i].moveId,
					charged: chargedMoveIds,
					isAlternate: true
				});
			}
		}
		
		// Test alternative charged move combinations
		if (chargedMoves.length > 2) {
			const currentFastId = pokemon.fastMove ? pokemon.fastMove.moveId : fastMoves[0].moveId;
			for (let i = 0; i < Math.min(chargedMoves.length, 4); i++) {
				for (let j = i + 1; j < Math.min(chargedMoves.length, 4); j++) {
					const newMoves = [chargedMoves[i].moveId, chargedMoves[j].moveId];
					const exists = movesets.some(m => 
						m.fast === currentFastId && 
						JSON.stringify(m.charged) === JSON.stringify(newMoves)
					);
					
					if (!exists) {
						movesets.push({
							fast: currentFastId,
							charged: newMoves,
							isAlternate: true
						});
					}
				}
			}
		}
		
		return movesets.slice(0, 10); // Limit to 10 moveset variations per pokemon
	}

	/**
	 * Calculate synergy score between two pokemon
	 * FIX: moveset parameter hinzugefügt (wird übergeben, nicht angewendet)
	 */
	_calculateSynergyScore(poke1, poke2, cp, cup, moveset) {
		const scores = {
			weaknessAbsorption: this._calculateWeaknessAbsorption(poke1, poke2),
			mutualResistances: this._calculateMutualResistances(poke1, poke2),
			offensiveCoverage: this._calculateOffensiveCoverage(poke1, poke2, moveset),
			roleComplement: this._calculateRoleComplement(poke1, poke2),
			metaRobustness: this._calculateMetaRobustness(poke1, poke2, cp, cup)
		};
		
		// Calculate weighted total (scale to 0-100 percent)
		const total = (
			scores.weaknessAbsorption * this.weights.weaknessAbsorption +
			scores.mutualResistances * this.weights.mutualResistances +
			scores.offensiveCoverage * this.weights.offensiveCoverage +
			scores.roleComplement * this.weights.roleComplement +
			scores.metaRobustness * this.weights.metaRobustness
		) * 20; // Scale from 0-5 to 0-100
		
		return {
			total: Math.min(100, total),
			weaknessAbsorption: scores.weaknessAbsorption * 20,
			mutualResistances: scores.mutualResistances * 20,
			offensiveCoverage: scores.offensiveCoverage * 20,
			roleComplement: scores.roleComplement * 20,
			metaRobustness: scores.metaRobustness * 20
		};
	}

	/**
	 * Score how well poke2 absorbs poke1's weaknesses
	 */
	_calculateWeaknessAbsorption(poke1, poke2) {
		const poke1Weaknesses = this._getWeaknesses(poke1.types);
		let absorbedCount = 0;
		
		for (let i = 0; i < poke1Weaknesses.length; i++) {
			const weakType = poke1Weaknesses[i];
			const resistance = this._getResistanceMultiplier(poke2.types, weakType);
			
			// Score is high if poke2 resists what poke1 is weak to
			if (resistance < 1) {
				absorbedCount += (1 - resistance);
			}
		}
		
		return Math.min(5, absorbedCount);
	}

	/**
	 * Score mutual resistances (defensive synergy)
	 */
	_calculateMutualResistances(poke1, poke2) {
		const types1 = poke1.types;
		const types2 = poke2.types;
		let score = 0;
		
		// Check for shared resistances
		const commonResistances = this._getCommonResistances(types1, types2);
		score += commonResistances.length * 0.3;
		
		// Check for immunity coverage (one's weakness is other's strength)
		const mutualCoverage = this._getMutualCoverage(types1, types2);
		score += mutualCoverage * 0.3;
		
		// Bonus for covering each other's weaknesses
		const poke1Weak = this._getWeaknesses(types1);
		const poke2Weak = this._getWeaknesses(types2);
		
		let coverageBonus = 0;
		for (let i = 0; i < poke1Weak.length; i++) {
			if (poke2Weak.indexOf(poke1Weak[i]) === -1) {
				coverageBonus++;
			}
		}
		
		score += Math.min(2, coverageBonus * 0.4);
		
		return Math.min(5, score);
	}

	/**
	 * Score offensive coverage together
	 * FIX: moveset parameter für alternative Movesets, AND prüfe ob fastMove existiert
	 */
	_calculateOffensiveCoverage(poke1, poke2, moveset) {
		const types1 = new Set();
		const types2 = new Set();
		
		// Collect offensive types from poke1 - defensive check for fastMove
		if (poke1.fastMove && poke1.fastMove.type) {
			types1.add(poke1.fastMove.type);
		} else {
			types1.add('normal'); // Fallback default
		}
		
		if (poke1.chargedMoves && Array.isArray(poke1.chargedMoves)) {
			poke1.chargedMoves.forEach(m => {
				if (m && m.type) {
					types1.add(m.type);
				}
			});
		}
		
		// Collect offensive types from poke2 (use provided moveset if available)
		if (moveset) {
			// For now, use the moves from the moveset (fast move ID and charged move IDs)
			// In a real implementation, look up the move objects and their types
			types2.add(poke2.fastMove && poke2.fastMove.type ? poke2.fastMove.type : 'normal');
			if (poke2.chargedMoves && Array.isArray(poke2.chargedMoves)) {
				poke2.chargedMoves.forEach(m => {
					if (m && m.type) {
						types2.add(m.type);
					}
				});
			}
		} else {
			types2.add(poke2.fastMove && poke2.fastMove.type ? poke2.fastMove.type : 'normal');
			if (poke2.chargedMoves && Array.isArray(poke2.chargedMoves)) {
				poke2.chargedMoves.forEach(m => {
					if (m && m.type) {
						types2.add(m.type);
					}
				});
			}
		}
		
		// Score based on type diversity
		const totalTypes = new Set([...types1, ...types2]);
		let score = totalTypes.size * 0.3;
		
		// Bonus for complementary coverage
		const commonTypes = [...types1].filter(t => types2.has(t));
		score += Math.max(0, 5 - commonTypes.length) * 0.3;
		
		return Math.min(5, score);
	}

	/**
	 * Score role complement (simplified without role analysis)
	 */
	_calculateRoleComplement(poke1, poke2) {
		// Check bulk difference
		const bulk1 = poke1.stats.hp * poke1.stats.def;
		const bulk2 = poke2.stats.hp * poke2.stats.def;
		const bulkRatio = bulk1 > 0 ? bulk2 / bulk1 : 1;
		
		// Prefer different bulk profiles
		let score = 0;
		if (bulkRatio > 1.3 || bulkRatio < 0.77) {
			score += 2;
		}
		
		// Check attack difference
		const attack1 = poke1.stats.atk;
		const attack2 = poke2.stats.atk;
		const attackRatio = attack1 > 0 ? attack2 / attack1 : 1;
		
		if (attackRatio > 1.2 || attackRatio < 0.84) {
			score += 2;
		}
		
		// Check energy gain patterns (different fast move cooldowns = good)
		if (poke1.fastMove && poke2.fastMove) {
			if (Math.abs(poke1.fastMove.cooldown - poke2.fastMove.cooldown) > 200) {
				score += 1;
			}
		}
		
		return Math.min(5, score);
	}

	/**
	 * Score against meta (which meta pokemon do they counter together?)
	 */
	_calculateMetaRobustness(poke1, poke2, cp, cup) {
		// This is simplified - in a real implementation you'd check actual matchups
		let score = 0;
		
		// Bonus for type diversity against common threats
		const types = new Set([poke1.types[0], poke1.types[1], poke2.types[0], poke2.types[1]]);
		score += Math.min(3, types.size * 0.6);
		
		// Bonus if both have reasonable bulk
		const avgBulk1 = poke1.stats.hp * poke1.stats.def;
		const avgBulk2 = poke2.stats.hp * poke2.stats.def;
		
		if (avgBulk1 > 20000 && avgBulk2 > 20000) {
			score += 2;
		}
		
		return Math.min(5, score);
	}

	/**
	 * Helper: Get weaknesses for types (using embedded type system)
	 */
	_getWeaknesses(types) {
		const weaknesses = new Set();
		
		for (let i = 0; i < types.length; i++) {
			const type = types[i];
			if (this.typeWeaknesses[type]) {
				this.typeWeaknesses[type].forEach(w => weaknesses.add(w));
			}
		}
		
		return Array.from(weaknesses);
	}

	/**
	 * Helper: Get resistance multiplier for type against given attacking type
	 * Uses embedded typeWeaknesses system for consistency
	 */
	_getResistanceMultiplier(types, attackType) {
		// If the attacking type is in the resistances, return 0.5 (resist)
		// Otherwise return 1 (normal)
		for (let i = 0; i < types.length; i++) {
			const type = types[i];
			if (this.typeResistances[type] && this.typeResistances[type].indexOf(attackType) > -1) {
				return 0.5; // This type resists the attack
			}
		}
		
		// Check for weaknesses (reverse lookup)
		for (let i = 0; i < types.length; i++) {
			const type = types[i];
			if (this.typeWeaknesses[type] && this.typeWeaknesses[type].indexOf(attackType) > -1) {
				return 2; // This type is weak to the attack
			}
		}
		
		return 1; // Normal damage
	}

	/**
	 * Helper: Get common resistances (using embedded type system)
	 */
	_getCommonResistances(types1, types2) {
		const resistances1 = new Set();
		const resistances2 = new Set();
		
		for (let i = 0; i < types1.length; i++) {
			const type = types1[i];
			if (this.typeResistances[type]) {
				this.typeResistances[type].forEach(r => resistances1.add(r));
			}
		}
		
		for (let i = 0; i < types2.length; i++) {
			const type = types2[i];
			if (this.typeResistances[type]) {
				this.typeResistances[type].forEach(r => resistances2.add(r));
			}
		}
		
		return [...resistances1].filter(r => resistances2.has(r));
	}

	/**
	 * Helper: Get mutual coverage score
	 */
	_getMutualCoverage(types1, types2) {
		const gm = GameMaster.getInstance();
		let score = 0;
		
		// Check if either is immune to what other is weak to
		const weaknesses1 = this._getWeaknesses(types1);
		const weaknesses2 = this._getWeaknesses(types2);
		
		for (let i = 0; i < weaknesses1.length; i++) {
			const resistance = this._getResistanceMultiplier(types2, weaknesses1[i]);
			if (resistance < 1) {
				score += 1;
			}
		}
		
		for (let i = 0; i < weaknesses2.length; i++) {
			const resistance = this._getResistanceMultiplier(types1, weaknesses2[i]);
			if (resistance < 1) {
				score += 1;
			}
		}
		
		return Math.min(2, score * 0.5);
	}
}
