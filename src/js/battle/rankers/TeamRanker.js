// JavaScript Document

/*
* This is the Ranker.js file without all the bells and whistles,
* used to rank potential counters on the Team Builder page.
* Should I be using the same code? Yup. Am I? Nope. Stay tuned for
* when this comes back to bite me.
*/

var RankerMaster = (function () {
    var instance;

    function createInstance() {


        var object = new rankerObject();

		function rankerObject(){
			var gm = GameMaster.getInstance();
			var battle;
			var self = this;
			var compositionAnalyzer; // Team composition analyzer instance

			var targets = []; // Set targets to rank against

			var rankings = [];

			var shieldMode = 'single'; // single - sim specific shield scenarios, average - sim average of 0 and 1 shields each
			var overrideSettings = [getDefaultMultiBattleSettings(), getDefaultMultiBattleSettings()];
			
			// Default shield scenario weights for "all" mode
			var shieldWeights = {
				// Equal shield scenarios
				'1-1': 6,
				'0-0': 4,
				'2-2': 2,
				
				// Shield advantage scenarios (you have more shields)
				'1-0': 3,
				'2-1': 3,
				'2-0': 1,
				
				// Shield disadvantage scenarios (you have fewer shields) 
				'0-1': 3,
				'1-2': 3,
				'0-2': 1
			};

			// Enhanced ranking algorithm weights - now focused on TEAM COMPOSITION improvements
			var enhancedWeights = {
				// New composition-based weights (used when Advanced Team Synergy is ON)
				threatCoverage: 0.30,   // How well alternative counters your threats
				bulkImprovement: 0.20,  // Bulk/survivability improvement
				eptDptBalance: 0.15,    // Energy generation and pressure balance
				roleCompletion: 0.15,   // Filling missing Lead/Safe Swap/Closer roles
				typeCoverage: 0.15,     // Defensive and offensive type synergy
				metaRelevance: 0.05,    // Current usage and consistency
				// Legacy weights (used when Advanced Team Synergy is OFF)
				battle: 0.40,
				statProduct: 0.15,
				role: 0.15,
				quality: 0.15,
				meta: 0.15
			};

			// Initialize composition analyzer
			try {
				compositionAnalyzer = TeamCompositionAnalyzer.getInstance();
			} catch(e) {
				console.warn('TeamCompositionAnalyzer not available, using fallback', e);
			}

			var enhancedOptions = {
				roleDetection: true,
				statProductDisplay: true,
				advancedSynergy: true
			};

			var useRecommendedMoves = true;
			var prioritizeMeta = true;

			var csv = '';

			var metaGroup = [];

			this.context = "team-builder";

			// Run an individual rank set

			this.rank = function(team, cp, cup, exclusionList, context){
				if(context){
					self.context = context;
				}

				var totalBattles = 0;

				battle = new Battle();

				if(isNaN(cp)){
					var levelCap = parseInt(cp.split("-")[1]);
					cp = parseInt(cp.split("-")[0]);
					battle.setLevelCap(levelCap);
				}

				battle.setCP(cp);

				if(cup.name != "custom"){
					battle.setCup(cup.name);
				} else{
					battle.setCustomCup(cup);
				}

				var pokemonList = [];
				var teamRatings = [];

				for(var i = 0; i < team.length; i++){
					teamRatings.push([]);
				}

				rankings = [];

				if(team.length == 1){
					csv = 'Pokemon,Battle Rating,Energy Remaining,HP Remaining'
				}

				if((targets.length == 0)&&(context != "matrix")){
					// Get a full list of Pokemon from the game master
					pokemonList = gm.generateFilteredPokemonList(battle, cup.include, cup.exclude);
				} else{
					// Otherwise, push all set targets into the list

					for(var i = 0; i < targets.length; i++){
						pokemonList.push(targets[i]);
					}
				}

				// Remove any Pokemon that are in the exclusion list
				if(exclusionList){
					for(var i = 0; i < pokemonList.length; i++){
						if(exclusionList.indexOf(pokemonList[i].speciesId) > -1){
							pokemonList.splice(i, 1);
							i--;
						}
					}
				}

				// For all eligible Pokemon, simulate battles and gather rating data

				var rankCount = pokemonList.length;

				for(var i = 0; i < rankCount; i++){

					var pokemon = pokemonList[i];

					if((targets.length == 0)&&(useRecommendedMoves)){
						pokemon.selectRecommendedMoveset();
					}

					var rankObj = {
						pokemon: pokemon,
						speciesId: pokemon.speciesId,
						speciesName: pokemon.speciesName,
						types: pokemon.types,
						rating: 0,
						opRating: 0,
						matchups: [],
						index: i
					};

					// Add to CSV

					var name = pokemon.speciesName;
					var moveset = {
						fastMove: pokemon.fastMove,
						chargedMoves: []
					};

					name += ' ' + pokemon.generateMovesetStr();
					csv += '\n' + name;

					for(var n = 0; n < pokemon.chargedMoves.length; n++){
						moveset.chargedMoves.push(pokemon.chargedMoves[n]);
					}

					/*if((overrideSettings[1].ivs != "gamemaster")&&(overrideSettings[1].ivs != "original")){
						pokemon.levelCap = overrideSettings[1].levelCap;
						pokemon.maximizeStat(overrideSettings[1].ivs);
					} else if((overrideSettings[1].ivs == "gamemaster")&&(pokemon.isCustom)){
						pokemon.isCustom = false;
						pokemon.initialize(battle.getCP());
						if(pokemon.baitShields != 1){
							pokemon.isCustom = true;
						}
					}*/

					rankObj.moveset = moveset;

					var avg = 0;
					var matchupScore = 0; // A softer representation of wins/losses used for team builder threats and alternatives
					var matchupAltScore = 0;
					var opponentRating = 0;

					// Simulate battle against each Pokemon

					for(var n = 0; n < team.length; n++){

						var opponent = team[n];

						opponent.index = 1;

						totalBattles++;

						battle.setNewPokemon(pokemon, 0, false);
						battle.setNewPokemon(opponent, 1, false);


						// Force best moves on counters but not on the user's selected Pokemon

						if((context != "team-counters")&&(context != "matrix")&&(team.length > 1)&&(useRecommendedMoves)){
							opponent.selectRecommendedMoveset();
						}

						self.applySettingsToPokemon(overrideSettings[1], pokemon);

						if(context == "matrix" || context == "team-counters"){
							self.applySettingsToPokemon(overrideSettings[0], opponent);
						}

						if(overrideSettings[1].bait != 1){
							pokemon.isCustom = true;
						}

						if(overrideSettings[0].bait != 1){
							opponent.isCustom = true;
						}

						var shieldTestArr = []; // Array of shield scenarios to test


						if(shieldMode == 'single'){
							shieldTestArr.push([ overrideSettings[0].shields, overrideSettings[1].shields ]);
						} else if(shieldMode == 'average'){
							shieldTestArr.push([0,0], [1,1]);
						} else if(shieldMode == 'all'){
							shieldTestArr.push([0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]);
						}

						var avgPokeRating = 0;
						var avgOpRating = 0;
						var shieldRatings = [];
						var scenarioWeights = []; // Renamed to avoid shadowing the shieldWeights object

						for(var j = 0; j < shieldTestArr.length; j++){
							pokemon.setShields(shieldTestArr[j][1]);
							opponent.setShields(shieldTestArr[j][0]);

							battle.simulate();

							var healthRating = (pokemon.hp / pokemon.stats.hp);
							var damageRating = ((opponent.stats.hp - opponent.hp) / (opponent.stats.hp));

							var opHealthRating = (opponent.hp / opponent.stats.hp);
							var opDamageRating = ((pokemon.stats.hp - pokemon.hp) / (pokemon.stats.hp));

							var rating = Math.floor( (healthRating + damageRating) * 500);
							var opRating = Math.floor( (opHealthRating + opDamageRating) * 500);

							if(isNaN(avgPokeRating)){
								console.log(battle.getPokemon());
								return false;
							}

							// Calculate weight for this shield scenario
							var weight = 1;
							if(shieldMode == 'average'){
								weight = 4; // Equal weight for 0-0 and 1-1
							} else if(shieldMode == 'all'){
								// Use configurable weights
								var playerShields = shieldTestArr[j][1];
								var opponentShields = shieldTestArr[j][0];
								
								// Use specific scenario-based weight (player-opponent format)
								var key = playerShields + '-' + opponentShields;
								weight = shieldWeights[key] || 1;
							}

							avgPokeRating += (rating * weight);
							avgOpRating += (opRating * weight);
							scenarioWeights.push(weight);

							shieldRatings.push(rating);
						}

						if(shieldTestArr.length > 1){
							if(shieldMode == 'average'){
								avgPokeRating = Math.round( Math.pow(shieldRatings[0] * Math.pow(shieldRatings[1], 3), 1/4));
								avgOpRating = Math.floor(avgOpRating / shieldTestArr.length);
							} else if(shieldMode == 'all'){
								// Calculate weighted average
								var totalWeight = scenarioWeights.reduce((a, b) => a + b, 0);
								avgPokeRating = Math.round(avgPokeRating / totalWeight);
								avgOpRating = Math.round(avgOpRating / totalWeight);
							}
						} else {
							avgOpRating = Math.floor(avgOpRating / shieldTestArr.length);
						}

						csv += ',' + avgOpRating + ',' + opponent.energy + ',' + opponent.hp;

						avg += avgPokeRating;
						opponentRating = avgOpRating;

						var score = 500;
						var alternativeScore = 500;

						if(avgPokeRating > 500){
							// Power curve: diminishing returns on overkill wins
							alternativeScore = 500 + Math.pow(avgPokeRating - 500, .75);
							score = 500 + Math.pow(avgPokeRating - 500, .75);
						} else{
							// Graduated penalty: less harsh for close losses
							var lossDelta = 500 - avgPokeRating;  // How far from break-even (0-500)
							var penaltyFactor = Math.min(0.5, lossDelta / 1000);  // Max 50% penalty
							alternativeScore = avgPokeRating * (1 - penaltyFactor);
							score = avgPokeRating * (1 - penaltyFactor);
						}

						
						// Apply enhanced ranking algorithm if enabled
						if(enhancedOptions.qualityScoring || enhancedOptions.roleDetection || enhancedOptions.statProductDisplay) {
							var enhancedScore = self.calculateEnhancedScore(pokemon, opponent, avgPokeRating, context);
							score = enhancedScore.total;
							alternativeScore = enhancedScore.total;
						}

						// Factor in meta relevance
						if(context == "team-counters" || context == "team-alternatives"){
							let isMetaFactor = enhancedWeights.meta || 0.25;

							if(score > 500 && prioritizeMeta){
								if(metaGroup.some(poke => poke.speciesId == pokemon.speciesId)){
									score += (1000 - score) * isMetaFactor;
									alternativeScore += (1000 - alternativeScore) * isMetaFactor;
								} else{
									score -= (score - 500) * (1 - isMetaFactor);
									alternativeScore -= (alternativeScore - 500) * (1 - isMetaFactor);
								}
							}
						}

						matchupScore += score;
						matchupAltScore += alternativeScore;

						if(typeof settings !== 'undefined' && settings.matrixDirection == "column"){
							avgPokeRating = 1000 - avgPokeRating;
						}

						teamRatings[n].push(avgOpRating);


						var matchup = {
							opponent: opponent,
							rating: avgPokeRating,
							score: score,
							alternativeScore: alternativeScore,
							time: battle.getDuration()
						};

						// Calculate breakpoint and bulkpoint
						if(context == "matrix"){
							pokemon.reset();
							opponent.reset();

							var breakpoint = DamageCalculator.damageByStats(pokemon, opponent, pokemon.getEffectiveStat(0), opponent.getEffectiveStat(1), opponent.typeEffectiveness[pokemon.fastMove.type], pokemon.fastMove);

							var bulkpoint = DamageCalculator.damageByStats(opponent, pokemon, opponent.getEffectiveStat(0), pokemon.getEffectiveStat(1), pokemon.typeEffectiveness[opponent.fastMove.type], opponent.fastMove);

							matchup.breakpoint = breakpoint; // Fast move breakpoint
							matchup.bulkpoint = bulkpoint; // Fast move bulkpoint
							matchup.breakpointCM1 = 0;
							matchup.breakpointCM2 = 0;
							matchup.bulkpointCM1 = 0;
							matchup.bulkpointCM2 = 0;

							if(pokemon.chargedMoves.length > 0){
								var breakpointCM1 = DamageCalculator.damageByStats(pokemon, opponent, pokemon.getEffectiveStat(0), opponent.getEffectiveStat(1), opponent.typeEffectiveness[pokemon.chargedMoves[0].type], pokemon.chargedMoves[0]);
								matchup.breakpointCM1 = breakpointCM1;
							}

							if(pokemon.chargedMoves.length > 1){
								var breakpointCM2 = DamageCalculator.damageByStats(pokemon, opponent, pokemon.getEffectiveStat(0), opponent.getEffectiveStat(1), opponent.typeEffectiveness[pokemon.chargedMoves[1].type], pokemon.chargedMoves[1]);
								matchup.breakpointCM2 = breakpointCM2;
							}

							if(opponent.chargedMoves.length > 0){
								var bulkpointCM1 = DamageCalculator.damageByStats(opponent, pokemon, opponent.getEffectiveStat(0), pokemon.getEffectiveStat(1), pokemon.typeEffectiveness[opponent.chargedMoves[0].type], opponent.chargedMoves[0]);
								matchup.bulkpointCM1 = bulkpointCM1;
							}

							if(opponent.chargedMoves.length > 1){
								var bulkpointCM2 = DamageCalculator.damageByStats(opponent, pokemon, opponent.getEffectiveStat(0), pokemon.getEffectiveStat(1), pokemon.typeEffectiveness[opponent.chargedMoves[1].type], opponent.chargedMoves[1]);
								matchup.bulkpointCM2 = bulkpointCM2;
							}


							matchup.atkDifferential = pokemon.stats.atk - opponent.stats.atk;
						}

						pokemon.reset();
						opponent.reset();

						rankObj.matchups.push(matchup);
					}

					avg = Math.floor(avg / team.length);
					matchupScore = matchupScore / team.length;
					matchupAltScore = matchupAltScore / team.length;

					// Calculate win rate bonus for consistent performance
					var wins = rankObj.matchups.filter(m => m.rating > 500).length;
					var winRate = wins / team.length;
					
					// Add bonus for high win rates (up to 50 point bonus for 100% win rate)
					if(winRate >= 0.5){
						var winBonus = (winRate - 0.5) * 100;
						matchupAltScore += winBonus;
					}

					rankObj.rating = avg;
					rankObj.opRating = opponentRating;
					rankObj.score = matchupScore;
					rankObj.matchupAltScore = matchupAltScore;
					rankObj.overall = (pokemon.overall !== undefined) ? pokemon.overall : 0;
					rankObj.speciesName = pokemon.speciesName;

					rankings.push(rankObj);
				}

				// Sort rankings

				if((self.context == "team-builder")||(self.context == "team-counters")){
					rankings.sort((a,b) => (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0));
				} else if(self.context == "battle"){
					rankings.sort((a,b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
				}

				// Sort team's matchups by best to worst

				for(var i = 0; i < teamRatings.length; i++){
					 teamRatings[i].sort((a,b) => (a > b) ? -1 : ((b > a) ? 1 : 0));
				}

				battle.clearPokemon(); // Prevents associated Pokemon objects from being altered by future battles

				return {rankings: rankings, teamRatings: teamRatings, csv: csv};
			}

			// Set the targets to rank against

			this.setTargets = function(arr){
				targets = arr;
			}

			// Set how to handle multiple shield scenarios

			this.setShieldMode = function(value){
				shieldMode = value;
			}
			
			// Set custom shield scenario weights for "all" mode
			this.setShieldWeights = function(weights){
				if(weights){
					shieldWeights = weights;
				}
			}

			// Apply settings from a MultiSelector

			this.applySettings = function(settings, index){
				overrideSettings[index] = settings;
			}

			this.applySettingsToPokemon = function(settings, pokemon){
				var defaultSettings = getDefaultMultiBattleSettings();

				var fastMoveCount = Math.floor((settings.startEnergy * 500) / pokemon.fastMove.cooldown);

				pokemon.baitShields = settings.bait;
				pokemon.startHp = Math.floor(settings.startHp * pokemon.stats.hp);
				pokemon.startEnergy = Math.min(pokemon.fastMove.energyGain * fastMoveCount, 100);
				pokemon.startCooldown = settings.startCooldown;
				pokemon.optimizeMoveTiming = settings.optimizeMoveTiming;
				pokemon.startStatBuffs = settings.startStatBuffs;

				if(settings.bait != defaultSettings.bait || settings.startCooldown != defaultSettings.startCooldown ||
					settings.optimizeMoveTiming != defaultSettings.optimizeMoveTiming || settings.startStatBuffs != defaultSettings.startStatBuffs){
					pokemon.isCustom = true;
				}
			}

			// Set whether to use recommended movesets for threats

			this.setRecommendMoveUsage = function(val){
				useRecommendedMoves = val;
			}

			// Set the meta group for determining which Pokemon are meta for factoring team builder threats and alternatives
			this.setMetaGroup = function(group){
				metaGroup = group;
			}

			// Set whether or not to prioritize meta Pokemon in the results
			this.setPrioritizeMeta = function(val){
				prioritizeMeta = val;
			}

			// Set enhanced ranking weights
			this.setEnhancedWeights = function(weights){
				enhancedWeights = Object.assign(enhancedWeights, weights);
			}

			// Set enhanced ranking options
			this.setEnhancedOptions = function(options){
				enhancedOptions = Object.assign(enhancedOptions, options);
			}

			// Calculate enhanced score using multiple factors
			this.calculateEnhancedScore = function(pokemon, opponent, battleRating, context){
				var baseScore = battleRating;
				var factors = {};
				
				// 1. Battle Rating (base component)
				factors.battle = baseScore * enhancedWeights.battle;
				
				// 2. Stat Product Factor
				if(enhancedOptions.statProductDisplay) {
					var statProduct = pokemon.calculateStatProduct(battle.getCP());
					var statProductBonus = Math.min(1.2, statProduct.relativeEfficiency);
					factors.statProduct = baseScore * statProductBonus * enhancedWeights.statProduct;
				} else {
					factors.statProduct = 0;
				}
				
				// 3. Role Alignment Factor
				if(enhancedOptions.roleDetection) {
					var roleData = pokemon.detectOptimalRole();
					var roleAlignment = self.calculateRoleAlignment(roleData.primary, context);
					factors.role = baseScore * roleAlignment * enhancedWeights.role;
				} else {
					factors.role = 0;
				}
				
				// 4. Meta Relevance Factor
				var metaRelevance = self.calculateMetaRelevance(pokemon);
				factors.meta = baseScore * metaRelevance * enhancedWeights.meta;
				
				// 5. Matchup Quality Factor
				if(enhancedOptions.qualityScoring) {
					var quality = self.calculateMatchupQuality(battleRating);
					factors.quality = baseScore * quality * enhancedWeights.quality;
				} else {
					factors.quality = 0;
				}
				
				// Composite score
				var total = Object.values(factors).reduce((sum, val) => sum + val, 0);
				
				return {
					base: baseScore,
					total: total,
					factors: factors
				};
			}

			// Calculate role alignment score
			this.calculateRoleAlignment = function(role, context) {
				var alignments = {
					'team-counters': { lead: 1.2, switch: 1.1, closer: 1.0, attacker: 1.1, charger: 1.0, consistency: 1.0 },
					'team-alternatives': { lead: 1.1, switch: 1.2, closer: 1.2, attacker: 1.0, charger: 1.1, consistency: 1.1 }
				};
				
				return alignments[context] && alignments[context][role] ? alignments[context][role] : 1.0;
			}

		// Calculate meta relevance
		this.calculateMetaRelevance = function(pokemon) {
			var relevance = 1.0;
			
			// Check if Pokemon is in meta group (top picks)
			if(metaGroup.some(poke => poke.speciesId === pokemon.speciesId)) {
				relevance += 0.3;
			}
			
			// NEW: Bonus based on current rankings position
			// Look up Pokemon in rankings array (populated during rank() call)
			var pokemonRank = null;
			
			if (rankings && rankings.length > 0) {
				for (var i = 0; i < rankings.length; i++) {
					if (rankings[i].speciesId === pokemon.speciesId) {
						pokemonRank = i + 1; // 1-based ranking
						break;
					}
				}
			}
			
			if (pokemonRank !== null) {
				if (pokemonRank <= 10) {
					relevance += 0.5; // Top 10: massive bonus
				} else if (pokemonRank <= 25) {
					relevance += 0.3; // Top 25: solid bonus
				} else if (pokemonRank <= 50) {
					relevance += 0.15; // Top 50: small bonus
				} else if (pokemonRank <= 100) {
					relevance += 0.05; // Top 100: tiny bonus
				}
			}
			
			// Factor in usage patterns (simplified)
			if(pokemon.speciesName.includes("Shadow")) {
				relevance += 0.1; // Shadow bonus
			}
			
			return Math.min(relevance, 2.0); // Cap at 100% bonus
		}			// Calculate matchup quality beyond win/loss
			this.calculateMatchupQuality = function(rating) {
				var quality = 1.0;
				
				if(rating > 700) {
					quality = 1.3; // Decisive wins
				} else if(rating > 600) {
					quality = 1.1; // Solid wins
				} else if(rating > 400) {
					quality = 0.9; // Close losses
				} else {
					quality = 0.7; // Decisive losses
				}
				
				return quality;
			}

			/**
			 * NEW: Evaluate team composition improvement when adding an alternative
			 * This is the core of the improved algorithm
			 */
			this.evaluateTeamImprovement = function(alternative, currentTeam, replacementIndex, counterTeam, cp) {
				if (!compositionAnalyzer) {
					// Fallback to old behavior if analyzer not available
					return { compositeScore: 0, improvements: {} };
				}

				// Ensure battle is initialized
				if (!battle) {
					battle = new Battle();
				}
				
				// Parse CP value (might be "1500" or "1500-40")
				var cpValue = cp;
				if (typeof cp === 'string' && cp.indexOf('-') > -1) {
					var parts = cp.split("-");
					cpValue = parseInt(parts[0]);
					var levelCap = parseInt(parts[1]);
					battle.setCP(cpValue);
					battle.setLevelCap(levelCap);
				} else {
					cpValue = parseInt(cp);
					battle.setCP(cpValue);
				}

				// Evaluate current team (use numeric CP for benchmarks)
				var currentComposition = compositionAnalyzer.evaluateTeamComposition(currentTeam, cpValue);
				compositionAnalyzer.calculateOverallScore(currentComposition, {
					bulk: 0.25, eptDpt: 0.20, roles: 0.25, typeCoverage: 0.30
				});

				// Create hypothetical new team with the alternative
				var newTeam = currentTeam.slice(); // Clone array
				newTeam[replacementIndex] = alternative;

				// Evaluate new team (use numeric CP for benchmarks)
				var newComposition = compositionAnalyzer.evaluateTeamComposition(newTeam, cpValue);
				compositionAnalyzer.calculateOverallScore(newComposition, {
					bulk: 0.25, eptDpt: 0.20, roles: 0.25, typeCoverage: 0.30
				});

				// Calculate improvements (deltas) - safe access with fallbacks
			var improvements = {
				bulkDelta: (newComposition.bulk && currentComposition.bulk) ? 
					newComposition.bulk.score - currentComposition.bulk.score : 0,
				eptDptDelta: (newComposition.eptDpt && currentComposition.eptDpt) ? 
					newComposition.eptDpt.score - currentComposition.eptDpt.score : 0,
				roleDelta: (newComposition.roles && currentComposition.roles) ? 
					newComposition.roles.score - currentComposition.roles.score : 0,
				typeCoverageDelta: (newComposition.typeCoverage && currentComposition.typeCoverage) ? 
					newComposition.typeCoverage.score - currentComposition.typeCoverage.score : 0,
				overallDelta: newComposition.overall - currentComposition.overall,
				metaRelevance: this.calculateMetaRelevance(alternative) // Store meta relevance for display
			};				// CRITICAL: Penalize based on team weakness overlap and type diversity
				var removedPokemon = currentTeam[replacementIndex];
				var typeRedundancyPenalty = 0;
				
				// Helper function to get weaknesses for a Pokemon (effectiveness >= 1.6)
				var getWeaknesses = function(pokemon) {
					var weaknesses = [];
					if (pokemon.typeEffectiveness) {
						for (var type in pokemon.typeEffectiveness) {
							if (pokemon.typeEffectiveness[type] >= 1.6) {
								weaknesses.push(type);
							}
						}
					}
					return weaknesses;
				};
				
				// Get weaknesses for alternative and remaining team
				var altWeaknesses = getWeaknesses(alternative);
				var sharedWeaknessCount = 0;
				
				// Check how many weaknesses the alternative shares with remaining team
				for (var i = 0; i < currentTeam.length; i++) {
					if (i === replacementIndex) continue;
					
					var teamMemberWeaknesses = getWeaknesses(currentTeam[i]);
					
					// Count shared weaknesses
					for (var w = 0; w < altWeaknesses.length; w++) {
						if (teamMemberWeaknesses.indexOf(altWeaknesses[w]) > -1) {
							sharedWeaknessCount++;
							// Extra penalty if it's a common attacking type (Fighting, Rock, Steel, Fire, Water, Ground)
							var commonTypes = ['fighting', 'rock', 'steel', 'fire', 'water', 'ground', 'ice'];
							if (commonTypes.indexOf(altWeaknesses[w]) > -1) {
								sharedWeaknessCount += 0.5; // 50% extra penalty for common attacking types
							}
						}
					}
				}
				
				// Heavy penalty for shared weaknesses (each shared weakness = 20 points)
				typeRedundancyPenalty += sharedWeaknessCount * 20;
				
				// CRITICAL: Penalize inherently fragile types (Ice, Bug, Grass) that have excessive weaknesses
				// Ice has 4 weaknesses (Fighting, Rock, Steel, Fire), Bug has 3 (Fire, Flying, Rock), Grass has 5
				var fragileTypes = {
					'ice': 30,      // Ice types are extremely vulnerable
					'bug': 20,      // Bug types have many common weaknesses
					'grass': 25,    // Grass types are weak to many meta types
					'rock': 20,     // Rock has 5 weaknesses (Water, Grass, Fighting, Ground, Steel)
					'psychic': 15   // Psychic weak to common Dark/Ghost
				};
				
				for (var t = 0; t < alternative.types.length; t++) {
					var altType = alternative.types[t].toLowerCase();
					if (fragileTypes[altType]) {
						typeRedundancyPenalty += fragileTypes[altType];
					}
				}
				
				// Check if removed Pokemon has unique types not on alternative
				for (var t = 0; t < removedPokemon.types.length; t++) {
					var removedType = removedPokemon.types[t];
					var typeIsUnique = true;
					
					// Check if any other team member shares this type
					for (var i = 0; i < currentTeam.length; i++) {
						if (i === replacementIndex) continue;
						if (currentTeam[i].types.indexOf(removedType) > -1) {
							typeIsUnique = false;
							break;
						}
					}
					
					// If type is unique and alternative doesn't have it, heavy penalty
					if (typeIsUnique && alternative.types.indexOf(removedType) === -1) {
						typeRedundancyPenalty += 25; // Major penalty for losing unique type
					}
				}
				
				// Check if alternative creates type redundancy with remaining team
				for (var t = 0; t < alternative.types.length; t++) {
					var altType = alternative.types[t];
					var typeCount = 0;
					
					for (var i = 0; i < currentTeam.length; i++) {
						if (i === replacementIndex) continue;
						if (currentTeam[i].types.indexOf(altType) > -1) {
							typeCount++;
						}
					}
					
					// Penalty for each redundant type
					if (typeCount > 0) {
						typeRedundancyPenalty += typeCount * 12;
					}
				}

				// Evaluate threat coverage (how well alternative performs against counterTeam)
				var threatCoverageScore = 0;
				if (counterTeam && counterTeam.length > 0) {
					var totalRating = 0;
					
					for (var i = 0; i < counterTeam.length; i++) {
						// Set default shields (1v1)
						alternative.setShields(1);
						counterTeam[i].setShields(1);
						
						battle.setNewPokemon(alternative, 0, false);
						battle.setNewPokemon(counterTeam[i], 1, false);
						battle.simulate();
						
						var healthRating = (alternative.hp / alternative.stats.hp);
						var damageRating = ((counterTeam[i].stats.hp - counterTeam[i].hp) / counterTeam[i].stats.hp);
						var rating = (healthRating + damageRating) * 500;
						
						totalRating += rating;
						
						// Reset Pokemon for next simulation
						alternative.reset();
						counterTeam[i].reset();
					}
					
					// Safe division
					threatCoverageScore = counterTeam.length > 0 ? (totalRating / counterTeam.length) / 10 : 0; // Scale to 0-100
				}

				// Calculate weighted composite score
				// Normalize deltas to 0-100 range (deltas can be -100 to +100, so we shift by 50 to get 0-100)
				var normalizedBulk = Math.max(0, Math.min(100, improvements.bulkDelta + 50));
				var normalizedEPT = Math.max(0, Math.min(100, improvements.eptDptDelta + 50));
				var normalizedRole = Math.max(0, Math.min(100, improvements.roleDelta + 50));
				var normalizedCoverage = Math.max(0, Math.min(100, improvements.typeCoverageDelta + 50));
				
				// Calculate meta relevance bonus (0-100 scale)
				var metaRelevance = this.calculateMetaRelevance(alternative);
				var metaScore = metaRelevance * 50; // Scale 1.0-1.5 to 50-75 range
				
				var compositeScore = 
					(threatCoverageScore * enhancedWeights.threatCoverage) +
					(normalizedBulk * enhancedWeights.bulkImprovement) +
					(normalizedEPT * enhancedWeights.eptDptBalance) +
					(normalizedRole * enhancedWeights.roleCompletion) +
					(normalizedCoverage * enhancedWeights.typeCoverage) +
					(metaScore * enhancedWeights.metaRelevance);
				
			// CRITICAL: Apply quality filters to prevent garbage recommendations
			
			// 1. Penalty for mediocre threat coverage
			// Pokemon should ideally win 60%+ of matchups against identified threats
			if (threatCoverageScore < 58) {
				var coveragePenalty = (58 - threatCoverageScore) * 2; // 2 points per point below 58
				compositeScore -= coveragePenalty;
			}
			
			// 2. Stronger penalty for poor coverage
			if (threatCoverageScore < 52) {
				compositeScore = compositeScore * 0.7; // Reduce score by 30%
			}
			
			// 3. Disqualify Pokemon that lose more than they win
			if (threatCoverageScore < 50) {
				compositeScore = compositeScore * 0.4; // Reduce score by 60%
			}
			
			// 4. Penalty for losing bulk (makes team glassier)
			if (improvements.bulkDelta < -5) {
				var bulkPenalty = Math.abs(improvements.bulkDelta) * 1.5; // 1.5 points per bulk lost
				compositeScore -= bulkPenalty;
			}
			
			// 5. Completely disqualify terrible combinations
			if (threatCoverageScore < 48 && improvements.bulkDelta < -10) {
				compositeScore = 0; // Glass cannons that lose badly = unacceptable
			}
			
			// Apply type redundancy penalty
			compositeScore = Math.max(0, compositeScore - typeRedundancyPenalty);				return {
					compositeScore: compositeScore,
					improvements: improvements,
					threatCoverageScore: threatCoverageScore,
					replacedPokemon: currentTeam[replacementIndex],
					newComposition: newComposition,
					currentComposition: currentComposition
				};
			}

		};

        return object;
	}

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();
