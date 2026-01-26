/**
 * Synergy Finder Interface
 * Handles the UI for finding team synergies
 */

function SynergyFinderInterface() {
	const self = this;
	const gm = GameMaster.getInstance();
	let currentPokemon = null;
	let currentCup = 'all';
	let currentCp = '1500';
	let synergyAnalyzer = null;
	let currentResults = [];
	let battle = new Battle();
	let ranker = RankerMaster.getInstance();

	this.init = function() {
		// Get parameters from URL
		const params = new URLSearchParams(window.location.search);
		if (window.location.pathname.includes('/synergy-finder/')) {
			const pathParts = window.location.pathname.split('/').filter(p => p);
			const finderIndex = pathParts.indexOf('synergy-finder');
			if (finderIndex !== -1 && finderIndex + 3 < pathParts.length) {
				currentCup = pathParts[finderIndex + 1];
				currentCp = pathParts[finderIndex + 2];
				const pokeParam = pathParts[finderIndex + 3];
				if (pokeParam) {
					this.loadPokemonFromParam(pokeParam);
				}
			}
		}

		// Initialize Pokemon Search
		const pokeSearch = new PokeSearch($(".synergy-input-container"));
		pokeSearch.setBattle(battle);
		pokeSearch.init(gm.data.pokemon, battle);
		pokeSearch.setContext("synergy-search");

		// Pokemon selection via PokeSearch callback
		pokeSearch.onSelect(function(pokemon) {
			if (pokemon) {
				self.startSynergyAnalysis(pokemon);
			}
		});

		// Set up format select
		$(".format-select").on("change", function() {
			const format = $(this).val().split('-');
			currentCup = format[1];
			currentCp = format[0];
		});

		// Detail modal
		$(".synergy-detail-modal .close-btn").on("click", function(e) {
			e.preventDefault();
			$(".synergy-detail-modal").removeClass("active");
		});

		$("body").on("click", ".synergy-detail-btn", function(e) {
			e.preventDefault();
			const index = $(this).attr("data-index");
			if (currentResults[index]) {
				self.showSynergyDetail(currentResults[index]);
			}
		});

		// Set initial format if in URL
		$(".format-select").val(currentCp + "-" + currentCup);
		$(".league-select").val(currentCp);
	};

	/**
	 * Load Pokemon from URL parameter
	 */
	this.loadPokemonFromParam = function(pokeParam) {
		const pokemon = gm.getPokemonById(pokeParam);
		if (pokemon) {
			this.startSynergyAnalysis(pokemon);
		}
	};

	/**
	 * Start synergy analysis for selected pokemon
	 */
	this.startSynergyAnalysis = function(pokemon) {
		currentPokemon = pokemon;
		
		// Update UI
		$(".synergy-results-container").show();
		$(".synergy-results-table").hide();
		$(".synergy-analysis-info").show();
		
		$(".synergy-pokemon-name").html(pokemon.speciesName);
		$(".synergy-pokemon-description").html(
			"Finding the best team partners for <strong>" + pokemon.speciesName + "</strong> in <strong>" + 
			this._getCupName(currentCup, currentCp) + "</strong>. This analysis tests different movesets for each candidate Pokemon."
		);

		// Create analyzer
		synergyAnalyzer = new SynergyAnalyzer(pokemon, gm.data.pokemon, battle, ranker);

		// Run analysis
		this._runAnalysis();
	};

	/**
	 * Run synergy analysis with progress tracking
	 */
	this._runAnalysis = function() {
		const results = synergyAnalyzer.findBestPartners(currentCp, currentCup, 50, (progress) => {
			const percent = Math.round(progress * 100);
			$(".progress").css("width", percent + "%");
		});

		currentResults = results;

		// Display results
		$(".synergy-analysis-info").hide();
		$(".synergy-results-table").show();
		$(".synergy-results-list").html("");

		for (let i = 0; i < results.length; i++) {
			const result = results[i];
			const scorePercent = Math.round(result.score.total);
			
			const $row = $(
				"<div class='synergy-result-row'>" +
					"<div class='item rank'>#" + result.rank + "</div>" +
					"<div class='item pokemon-name'>" +
						"<span class='poke-image' style='background-image: url(" + webRoot + "img/pokemon/" + result.pokemon.dex + ".png)'></span>" +
						"<span class='name'>" + result.pokemon.speciesName + "</span>" +
					"</div>" +
					"<div class='item score'>" +
						"<div class='score-bar'>" +
							"<div class='score-fill' style='width: " + scorePercent + "%'></div>" +
						"</div>" +
						"<div class='score-text'>" + scorePercent + "%</div>" +
					"</div>" +
					"<div class='item details-btn'>" +
						"<button class='synergy-detail-btn button' data-index='" + i + "'>Details</button>" +
					"</div>" +
				"</div>"
			);

			$(".synergy-results-list").append($row);
		}
	};

	/**
	 * Show detailed synergy information
	 */
	this.showSynergyDetail = function(result) {
		const poke1 = currentPokemon;
		const poke2 = result.pokemon;
		const score = result.score;

		$(".detail-pokemon-name").html(poke1.speciesName + " ↔ " + poke2.speciesName);

		// Type Analysis
		const typeHtml = this._generateTypeAnalysis(poke1, poke2);
		$(".type-analysis").html(typeHtml);

		// Scores
		$(".weakness-score").html(Math.round(score.weaknessAbsorption) + "%");
		$(".resistance-score").html(Math.round(score.mutualResistances) + "%");
		$(".coverage-score").html(Math.round(score.offensiveCoverage) + "%");
		$(".role-score").html(Math.round(score.roleComplement) + "%");
		$(".meta-score").html(Math.round(score.metaRobustness) + "%");
		$(".total-score").html(Math.round(score.total) + "%");

		// Movesets tested
		const movesetHtml = this._generateMovesetInfo(poke2);
		$(".movesets-tested").html(movesetHtml);

		// Key matchups
		const matchupHtml = this._generateKeyMatchups(poke1, poke2);
		$(".key-matchups").html(matchupHtml);

		// Team suggestion
		const teamHtml = this._generateTeamSuggestion(poke1, poke2);
		$(".team-suggestion").html(teamHtml);

		// Show modal
		$(".synergy-detail-modal").addClass("active");
	};

	/**
	 * Generate type analysis HTML
	 */
	this._generateTypeAnalysis = function(poke1, poke2) {
		let html = "<div class='type-sync-grid'>";
		
		html += "<div class='pokemon-types'>";
		html += "<strong>" + poke1.speciesName + "</strong> Types: ";
		for (let i = 0; i < poke1.types.length; i++) {
			if (poke1.types[i] !== "none") {
				html += "<span class='type-badge " + poke1.types[i] + "'>" + poke1.types[i] + "</span>";
			}
		}
		html += "</div>";

		html += "<div class='pokemon-types'>";
		html += "<strong>" + poke2.speciesName + "</strong> Types: ";
		for (let i = 0; i < poke2.types.length; i++) {
			if (poke2.types[i] !== "none") {
				html += "<span class='type-badge " + poke2.types[i] + "'>" + poke2.types[i] + "</span>";
			}
		}
		html += "</div>";

		html += "</div>";
		return html;
	};

	/**
	 * Generate moveset testing info
	 */
	this._generateMovesetInfo = function(pokemon) {
		let html = "<p>Multiple movesets tested for <strong>" + pokemon.speciesName + "</strong>:</p>";
		html += "<ul>";
		html += "<li><strong>Optimal moveset:</strong> " + pokemon.fastMove.displayName + " / ";
		if (pokemon.chargedMoves) {
			for (let i = 0; i < pokemon.chargedMoves.length; i++) {
				html += pokemon.chargedMoves[i].displayName;
				if (i < pokemon.chargedMoves.length - 1) html += ", ";
			}
		}
		html += "</li>";
		html += "<li><strong>Alternative movesets:</strong> Up to 9 variations tested with different fast moves and charged move combinations</li>";
		html += "<li><strong>Best result displayed:</strong> The synergy score shown is from the best-performing moveset</li>";
		html += "</ul>";
		return html;
	};

	/**
	 * Generate key matchups between the pair
	 */
	this._generateKeyMatchups = function(poke1, poke2) {
		let html = "<p>This pairing provides complementary coverage:</p>";
		html += "<ul>";
		
		// Type weaknesses
		const weak1 = this._getWeaknesses(poke1.types);
		const weak2 = this._getWeaknesses(poke2.types);
		
		const covered = weak1.filter(w => weak2.indexOf(w) === -1);
		if (covered.length > 0) {
			html += "<li><strong>" + poke2.speciesName + "</strong> covers weaknesses to: " + covered.join(", ") + "</li>";
		}
		
		html += "</ul>";
		return html;
	};

	/**
	 * Generate team suggestion
	 */
	this._generateTeamSuggestion = function(poke1, poke2) {
		let html = "<p>To complete this pairing, consider a third Pokemon that:</p>";
		html += "<ul>";
		html += "<li>Covers the weaknesses of both " + poke1.speciesName + " and " + poke2.speciesName + "</li>";
		html += "<li>Has different roles (lead, safe switch, or closer)</li>";
		html += "<li>Provides type coverage against meta threats</li>";
		html += "</ul>";
		return html;
	};

	/**
	 * Get weaknesses for types (with fallback to embedded type system)
	 */
	this._getWeaknesses = function(types) {
		const weaknesses = new Set();
		
		// Type weakness fallback table (same as in SynergyAnalyzer)
		const typeWeaknesses = {
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
		
		for (let i = 0; i < types.length; i++) {
			const typeData = gm.getType(types[i]);
			if (typeData && typeData.weaknesses) {
				// Try GameMaster API first
				typeData.weaknesses.forEach(w => weaknesses.add(w));
			} else if (typeWeaknesses[types[i]]) {
				// Fallback to embedded type system
				typeWeaknesses[types[i]].forEach(w => weaknesses.add(w));
			}
		}
		
		return Array.from(weaknesses);
	};

	/**
	 * Get cup name for display
	 */
	this._getCupName = function(cup, cp) {
		if (cup === 'all') {
			switch(cp) {
				case '500': return 'Little League';
				case '1500': return 'Great League';
				case '2500': return 'Ultra League';
				case '10000': return 'Master League';
				case '10000-40': return 'Master League Classic';
				default: return 'League';
			}
		}
		return cup.charAt(0).toUpperCase() + cup.slice(1) + ' Cup';
	};
}

// Initialize when page loads
$(document).ready(function() {
	const synergyInterface = new SynergyFinderInterface();
	synergyInterface.init();
});
