// JavaScript Document

var InterfaceMaster = (function () {
    var instance;

    function createInstance() {


        var object = new interfaceObject();

		function interfaceObject(){

			var gm;
			var battle;
			var pokeSelectors = [];
			var multiSelectors = [
				new PokeMultiSelect($(".team .poke.multi")),
				new PokeMultiSelect($(".custom-threats .poke.multi")),
				new PokeMultiSelect($(".custom-alternatives .poke.multi")),
				new PokeMultiSelect($(".exclude-alternatives .poke.multi")),
				new PokeMultiSelect($(".exclude-threats .poke.multi"))
			];
			var results; // Store team matchup results for later reference
			var altRankings; // Store alternatives for searching
			var counterTeam;
			var self = this;
			var runningResults = false;

			var histograms = [];

			this.context = "team";


			this.init = function(){

				gm = GameMaster.getInstance();
				var data = gm.data;

				battle = new Battle();

				pokeSearch.setBattle(battle);

				for(var i = 0; i < multiSelectors.length; i++){
					multiSelectors[i].init(data.pokemon, battle);
				}

				multiSelectors[0].setMaxPokemonCount(6);
				multiSelectors[0].setContext("team");


				$(".format-select").on("change", selectFormat);
				$(".rate-btn").on("click", rateClick);
				$(".print-scorecard").on("click", printScorecard);
				$("body").on("click", ".alternatives-table .button.add", addAlternativePokemon);
				$("body").on("click", ".check", checkBox);
				$(".team-size-select").on("change", selectTeamSize);
				$(".shield-select").on("change", toggleShieldWeights);
				$(".reset-weights").on("click", resetShieldWeights);
				$(".ranking-weight").on("input", updateRankingWeights);
				$(".reset-enhanced").on("click", resetEnhancedSettings);

				// If get data exists, load settings

				this.loadGetData();

				// Load rankings for the current league

				if(! get){
					gm.loadRankingData(self, "overall", parseInt($(".format-select option:selected").attr("value")), "all");
				}

				window.addEventListener('popstate', function(e) {
					get = e.state;
					self.loadGetData();
				});
			};

			// Given JSON of get parameters, load these settings

			this.loadGetData = function(){

				// Clear all currently selected Pokemon

				for(var i = 0; i < pokeSelectors.length; i++){
					pokeSelectors[i].clear();
				}

				$(".section.typings").hide();

				if(! get){
					return false;
				}

				// Cycle through parameters and set them

				for(var key in get){
					if(get.hasOwnProperty(key)){

						var val = get[key];

						// Process each type of parameter

						switch(key){
							case "t":
								// Add each team member to the multi-selector
								var list = val.split(",");
								var pokeList = [];

								// Set max team size to length of list, if option exists
								$(".team-size-select option[value="+list.length+"]").prop("selected", "selected");
								$(".team-size-select").trigger("change");

								for(var i = 0; i < list.length; i++){
									var arr = list[i].split('-');
									var pokemon = new Pokemon(arr[0], 0, battle);

									pokemon.initialize(battle.getCP());

									if(arr.length >= 8){
										pokemon.setIV("atk", arr[2]);
										pokemon.setIV("def", arr[3]);
										pokemon.setIV("hp", arr[4]);
										pokemon.setLevel(arr[1]);
									}

									// Check string for other parameters
									for(var n = 0; n < arr.length; n++){
										switch(arr[n]){
											case "shadow":
											case "purified":
												pokemon.setShadowType(arr[n]);
												break;
										}
									}

									// Split out the move string and select moves

									if(list[i].split("-m-").length > 1){
										var moveStr = list[i].split("-m-")[1];

										arr = moveStr.split("-");

										// Search string for any custom moves to add
										var customFastMove = false;

										for(var n = 0; n < arr.length; n++){
											if(arr[n].match('([A-Z_]+)')){
												var move = gm.getMoveById(arr[n]);
												var movePool = (move.energyGain > 0) ? pokemon.fastMovePool : pokemon.chargedMovePool;
												var moveType = (move.energyGain > 0) ? "fast" : "charged";
												var moveIndex = n-1;

												if(moveType == "fast"){
													customFastMove = true;
												}

												pokemon.addNewMove(arr[n], movePool, true, moveType, moveIndex);
											}
										}

										if(! customFastMove){
											pokemon.selectMove("fast", pokemon.fastMovePool[arr[0]].moveId, 0);
										}

										for(var n = 1; n < arr.length; n++){
											// Don't set this move if already set as a custom move

											if(arr[n].match('([A-Z_]+)')){
												continue;
											}

											var moveId = "none";

											if(arr[n] > 0){
												moveId = pokemon.chargedMovePool[arr[n]-1].moveId;
											}

											if(moveId != "none"){
												pokemon.selectMove("charged", moveId, n-1);
											} else{
												if((arr[1] == "0")&&(arr[2] == "0")){
													pokemon.selectMove("charged", moveId, 0); // Always deselect the first move because removing it pops the 2nd move up
												} else{
													pokemon.selectMove("charged", moveId, n-1);
												}
											}

										}
									} else{
										// Auto select moves if none are specified
										pokemon.autoSelectMoves();
									}


									pokeList.push(pokemon);
								}

								multiSelectors[0].setPokemonList(pokeList);
								break;

							case "cp":
								//Parse this out if it contains level cap
								var getCP = val;

								if(val.indexOf("-") > -1){
									getCP = val.split("-")[0];
								}

								battle.setCP(getCP);

								// Set format

								$(".format-select option[value=\""+getCP+"\"][cup=\""+battle.getCup().name+"\"]").prop("selected","selected");
								break;

							case "cup":
								battle.setCup(val);

								if(battle.getCup().tierRules){
									multiSelectors[0].setCliffhangerMode(true);
								} else{
									multiSelectors[0].setCliffhangerMode(false);
								}

								if(battle.getCup().partySize == 8){
									$(".team-size-select option[value=8]").prop("selected", "selected");
									$(".team-size-select").trigger("change");
								}

								if(battle.getCup().allowSameSpecies){
									$(".check.same-species").addClass("on");
								}
								break;
						}
					}

				}

				// Update both Pokemon selectors

				for(var i = 0; i < pokeSelectors.length; i++){
					pokeSelectors[i].update();
				}

				// Auto run the battle

				$(".rate-btn").trigger("click");
			}

			// Callback for loading ranking data

			this.displayRankingData = function(data){
				console.log("Ranking data loaded");

				if(runningResults){
					self.updateTeamResults();

					$("html, body").animate({ scrollTop: $(".section.typings a").first().offset().top }, 500);


					$(".rate-btn .btn-label").html("Rate Team");
				} else{
					// Update MultiSelect to display Pokemon eligibility

					multiSelectors[0].updateListDisplay();
				}
			}

			// Update team info output

			this.updateTeamResults = function(){
				var key = battle.getCup().name + "overall" + battle.getCP();

				if(! gm.rankings[key]){
					runningResults = true;
					gm.loadRankingData(self, "overall", battle.getCP(), battle.getCup().name);
					return false;
				}

				var metaKey = $(".format-select option:selected").attr("meta-group");

				if(! gm.groups[metaKey]){
					runningResults = true;
					gm.loadGroupData(self, metaKey);
					return false;
				}

				var metaGroup = gm.groups[metaKey];

				// Gather advanced settings
				var scorecardCount = parseInt($(".scorecard-length-select option:selected").val());
				var counterTeamSize = parseInt($(".counter-team-size-select option:selected").val());
				var allowShadows = $(".team-option .check.allow-shadows").hasClass("on");
				var allowXL = $(".team-option .check.allow-xl").hasClass("on");
				var baitShields = $(".team-option .check.shield-baiting").hasClass("on") ? 1 : 0;
				var prioritizeMeta = $(".team-option .check.prioritize-meta").hasClass("on");

				if(battle.getCup().name == "shadow"){
					allowShadows = true;
				}

				// Get team and validate results

				var team = multiSelectors[0].getPokemonList();

				if(team.length == 0){
					$(".section.error").show();
					return false;
				}

				// Process defensive and offensive matchups

				var defenseArr = [];
				var offenseArr = [];

				for(var i = 0; i < team.length; i++){
					var poke = team[i];

					defenseArr.push(
						{
							name: poke.speciesName,
							type: poke.types[0],
							matchups: this.getTypeEffectivenessArray(poke.types, "defense")
						});

					// Gather offensive matchups for fast move

					offenseArr.push(
						{
							name: poke.fastMove.name,
							type: poke.fastMove.type,
							matchups: this.getTypeEffectivenessArray([poke.fastMove.type], "offense")
						});

					// Gather offensive matchups for all charged moves

					for(var n = 0; n < poke.chargedMoves.length; n++){
						offenseArr.push(
							{
								name: poke.chargedMoves[n].name,
								type: poke.chargedMoves[n].type,
								matchups: this.getTypeEffectivenessArray([poke.chargedMoves[n].type], "offense")
							});
					}
				}

				// Display data

				$(".typings").show();

				this.displayArray(defenseArr, "defense");
				this.displayArray(offenseArr, "offense");
				this.generateSummaries(defenseArr, offenseArr);

				// Generate counters and histograms, and display that, too
				var shieldMode = $(".team-advanced .flex.poke .shield-select option:selected").val();
				var shieldCount = 1;

				if(shieldMode != "average"){
					shieldCount = parseInt(shieldMode);
					shieldMode = "single";
				}

				var teamSettings = getDefaultMultiBattleSettings();
				var opponentSettings = getDefaultMultiBattleSettings();

				teamSettings.shields = opponentSettings.shields = shieldCount;
				teamSettings.bait = opponentSettings.bait = baitShields;

				var ranker = RankerMaster.getInstance();
				ranker.setShieldMode(shieldMode);
				ranker.applySettings(teamSettings, 0);
				ranker.applySettings(opponentSettings, 1);
				ranker.setMetaGroup(metaGroup);
				ranker.setPrioritizeMeta(prioritizeMeta);
				
				// Set custom shield weights if using "all" mode
				if(shieldMode == "all"){
					ranker.setShieldWeights(self.getShieldWeights());
				}
				
				// Apply enhanced ranking settings
				ranker.setEnhancedWeights(self.getEnhancedWeights());
				ranker.setEnhancedOptions(self.getEnhancedOptions());

				ranker.setRecommendMoveUsage(true);

				// Set targets for custom threats
				if(multiSelectors[1].getPokemonList().length > 0){
					ranker.setTargets(multiSelectors[1].getPokemonList());
					ranker.setRecommendMoveUsage(false);
				}

				var data = ranker.rank(team, battle.getCP(), battle.getCup(), [], "team-counters");
				var counterRankings = data.rankings;
				var teamRatings = data.teamRatings;

				counterTeam = [];

				// Clear targets so it will default to the normal format if the user changes settings
				ranker.setTargets([]);

				results = counterRankings;

				// Let's start with the histograms, because they're kinda neat

				for(var i = 0; i < team.length; i++){
					if(histograms.length <= i){
						var histogram = new BattleHistogram($(".histogram").eq(i));
						histogram.generate(team[i], teamRatings[i]);

						histograms.push(histogram);
					} else{
						histograms[i].generate(team[i], teamRatings[i]);
					}
				}

				// Potential threats

				var csv = ','; // CSV data of all matchups
				$(".section.typings .rankings-container").html('');
				$(".threats-table").html("");
				$(".meta-table").html("");

				var $row = $("<thead><tr><td class=\"arrow\"></td></tr></thead>");

				for(var n = 0; n < team.length; n++){
					$row.find("tr").append("<td class=\"name-small\">"+team[n].speciesName+"</td>");

					csv += team[n].speciesName + ' ' + team[n].generateMovesetStr();
					if(n < team.length -1){
						csv += ',';
					}
				}

				csv += ',Threat Score,Overall Rating';

				$(".threats-table").append($row);
				$(".meta-table").append($row.clone());
				$(".threats-table").append("<tbody></tbody>");
				$(".meta-table").append("<tbody></tbody>");

				var avgThreatScore = 0;
				var count = 0;
				var total = scorecardCount;
				var excludedThreats = multiSelectors[4].getPokemonList();
				var excludedThreatIDs = [];

				for(var i = 0; i < excludedThreats.length; i++){
					// Include shadow ID's for Shadow Pokemon
					var excludedId = excludedThreats[i].speciesId;

					if((excludedThreats[i].shadowType == "shadow")&&(excludedId.indexOf("_shadow") == -1)){
						excludedId = excludedId + "_shadow";
					}

					excludedThreatIDs.push(excludedId);
				}

				var i = 0;

				while((count < total || counterTeam.length < counterTeamSize)&&(i < counterRankings.length)){
					var r = counterRankings[i];

					// Don't exclude threats that are part of a custom threat list

					if(multiSelectors[1].getPokemonList().length == 0){
						if((r.speciesId.indexOf("_shadow") > -1)&&(! allowShadows)){
							i++;
							continue;
						}

						if(r.speciesId.indexOf("_xs") > -1){
							i++;
							continue;
						}

						if(r.pokemon.hasTag("teambuilderexclude")){
							i++;
							continue;
						}
					}


					if(excludedThreatIDs.indexOf(r.speciesId) > -1){
						i++;
						continue;
					}

					var pokemon = r.pokemon;

					// Push to counter team
					if(counterTeam.length < counterTeamSize){
						let similarCounterExists = counterTeam.some(counter => {
							let similarityScore = counter.calculateSimilarity(pokemon, pokemon?.traits, false);

							return similarityScore == -1 || similarityScore >= 1000;
						});

						//let isMeta = (metaGroup.some(poke => poke.speciesId.replace("_shadow", "") == pokemon.speciesId.replace("_shadow", "")));

						let customThreatsListLength = multiSelectors[1].getPokemonList().length;
						if(! similarCounterExists || (customThreatsListLength != 0 && customThreatsListLength <= 12)){
							counterTeam.push(pokemon);

							avgThreatScore += r.rating;
						}
					}

					// Add results to threats table
					if(count >= total){
						i++;
						continue;
					}

					// Generate enhanced display info for threats
					var enhancedInfo = "";
					var enhancedOptions = self.getEnhancedOptions();
					
					if(enhancedOptions.statProductDisplay) {
						var statProduct = pokemon.calculateStatProduct(battle.getCP());
						enhancedInfo += "<div class=\"stat-product-info\">SP: " + 
							Math.round(statProduct.relativeEfficiency * 100) + "% <span class=\"stat-grade " + 
							statProduct.grade + "\">" + statProduct.grade + "</span></div>";
					}
					
					if(enhancedOptions.roleDetection) {
						var role = pokemon.detectOptimalRole();
						enhancedInfo += "<div class=\"role-badge " + role.primary + "\">" + 
							role.primary.charAt(0).toUpperCase() + role.primary.slice(1) + "</div>";
					}

					$row = $("<tr><th class=\"name\"><b>"+(count+1)+". "+pokemon.speciesName+"</b>" + enhancedInfo + "</th></tr>");

					for(var n = 0; n < r.matchups.length; n++){
						var $cell = $("<td><a class=\"rating\" href=\"#\" target=\"blank\"><span></span></a></td>");
						var rating = r.matchups[n].rating;

						$cell.find("a").addClass(battle.getRatingClass(rating));

						if(! baitShields){
							pokemon.isCustom = true;
							pokemon.baitShields = 0;
							r.matchups[n].opponent.isCustom = true;
							r.matchups[n].opponent.baitShields = 0;
						}

						var pokeStr = pokemon.generateURLPokeStr();
						var moveStr = pokemon.generateURLMoveStr();
						var opPokeStr = r.matchups[n].opponent.generateURLPokeStr();
						var opMoveStr = r.matchups[n].opponent.generateURLMoveStr();
						var shieldStr = shieldCount + "" + shieldCount;
						var battleLink = host+"battle/"+battle.getCP(true)+"/"+pokeStr+"/"+opPokeStr+"/"+shieldStr+"/"+moveStr+"/"+opMoveStr+"/";
						$cell.find("a").attr("href", battleLink);

						$row.append($cell);
					}

					i++;
					count++;

					$(".threats-table tbody").append($row);
				}

				// Display average threat score
				avgThreatScore = Math.round(avgThreatScore / counterTeamSize);
				$(".threat-score").html(avgThreatScore);

				// Build CSV results

				for(var i = 0; i < counterRankings.length; i++){
					var r = counterRankings[i];

					csv += '\n';

					csv += r.speciesName + ' ' + r.pokemon.generateMovesetStr() + ',';

					for(var n = 0; n < r.matchups.length; n++){
						csv += r.matchups[n].rating;

						if(n < r.matchups.length-1){
							csv += ',';
						}
					}

					csv += ',' + (Math.round(r.score*10)/10) + ',' + r.overall;
				}

				// Display meta scorecard
				if(multiSelectors[1].getPokemonList().length == 0){
					counterRankings.sort((a,b) => (a.overall > b.overall) ? -1 : ((b.overall > a.overall) ? 1 : 0));
				} else{
					counterRankings.sort((a,b) => (a.speciesName > b.speciesName) ? 1 : ((b.speciesName > a.speciesName) ? -1 : 0));
				}


				count = 0;
				total = scorecardCount;
				i = 0;

				while((count < total)&&(i < counterRankings.length)){
					var r = counterRankings[i];

					if(multiSelectors[1].getPokemonList().length == 0){
						if((r.speciesId.indexOf("_shadow") > -1)&&(! allowShadows)){
							i++;
							continue;
						}

						if((r.speciesId.indexOf("_xs") > -1)&&(allowXL)){
							i++;
							continue;
						}
					}

					if(excludedThreatIDs.indexOf(r.speciesId) > -1){
						i++;
						continue;
					}

					if((r.pokemon.needsXLCandy())&&(! allowXL)){
						i++;
						continue;
					}

					// Skip Pokemon if it isn't in the current meta group
					if(multiSelectors[1].getPokemonList().length == 0){
						var inMetaGroup = false;

						for(var n = 0; n < metaGroup.length; n++){
							var searchId = metaGroup[n].speciesId;
							searchId = searchId.replace("_shadow","");
							searchId = searchId.replace("_xs","");
							searchId = searchId.replace("_xl","");

							if(searchId == r.speciesId){
								inMetaGroup = true;
							}
						}

						if(! inMetaGroup){
							i++;
							continue;
						}
					}

					var pokemon = r.pokemon;

					// Add results to meta table

					$row = $("<tr><th class=\"name\"><b>"+pokemon.speciesName+"</b></th></tr>");

					for(var n = 0; n < r.matchups.length; n++){
						var $cell = $("<td><a class=\"rating\" href=\"#\" target=\"blank\"><span></span></a></td>");
						var rating = r.matchups[n].rating;

						$cell.find("a").addClass(battle.getRatingClass(rating));

						if(! baitShields){
							pokemon.isCustom = true;
							pokemon.baitShields = 0;
							r.matchups[n].opponent.isCustom = true;
							r.matchups[n].opponent.baitShields = 0;
						}

						var pokeStr = pokemon.generateURLPokeStr();
						var moveStr = pokemon.generateURLMoveStr();
						var opPokeStr = r.matchups[n].opponent.generateURLPokeStr();
						var opMoveStr = r.matchups[n].opponent.generateURLMoveStr();
						var shieldStr = shieldCount + "" + shieldCount;
						var battleLink = host+"battle/"+battle.getCP(true)+"/"+pokeStr+"/"+opPokeStr+"/"+shieldStr+"/"+moveStr+"/"+opMoveStr+"/";
						$cell.find("a").attr("href", battleLink);

						$row.append($cell);
					}

					i++;
					count++;

					$(".meta-table tbody").append($row);
				}

				// And for kicks, generate the counters to those counters

				var exclusionList = []; // Exclude the current team from the alternative results

				for(var i = 0; i < team.length; i++){
					exclusionList.push(team[i].speciesId);
				}

				// Exclude any Pokemon specified in the advanced settings

				var excludedAlternatives = multiSelectors[3].getPokemonList();

				for(var i = 0; i < excludedAlternatives.length; i++){
					// Include shadow ID's for Shadow Pokemon
					var excludedId = excludedAlternatives[i].speciesId;

					if((excludedAlternatives[i].shadowType == "shadow")&&(excludedId.indexOf("_shadow") == -1)){
						excludedId = excludedId + "_shadow";
					}

					exclusionList.push(excludedId);
				}

				// In Cliffhanger, exclude Pokemon that would put the team over the point limit
				var tiers = [];

				if(battle.getCup().tierRules){
					var cliffObj = multiSelectors[0].calculateCliffhangerPoints();
					var remainingPoints = cliffObj.max - cliffObj.points;
					tiers = cliffObj.tiers;
					var remainingPicks = 6 - team.length;

					// Reduce remaining points by the cost of remaining picks so incompatible tiers aren't suggested
					remainingPoints -= (remainingPicks - 1) * cliffObj.floor;

					console.log("remaining points:" + remainingPoints);

					// Add ineligible tiers to the exclusion list
					for(var i = 0; i < tiers.length; i++){
						if(remainingPoints < tiers[i].points){
							for(var n = 0; n < tiers[i].pokemon.length; n++){
								exclusionList.push(tiers[i].pokemon[n]);
								exclusionList.push(tiers[i].pokemon[n]+"_shadow");
								exclusionList.push(tiers[i].pokemon[n]+"_xl");
							}
						}
					}
				}

				// If using a restricted Pokemon, exclude restricted list

				if(battle.getCup().restrictedPokemon){
					var restrictedPicks = 0;

					for(var i = 0; i < team.length; i++){
						if(battle.getCup().restrictedPokemon.indexOf(team[i].speciesId.replace("shadow","")) > -1){
							restrictedPicks++;
						}
					}

					if(restrictedPicks >= battle.getCup().restrictedPicks){
						for(var n = 0; n < battle.getCup().restrictedPokemon.length; n++){
							exclusionList.push(battle.getCup().restrictedPokemon[n]);
						}
					}
				}

				ranker.setRecommendMoveUsage(true);

				// Set targets for custom alternatives
				if(multiSelectors[2].getPokemonList().length > 0){
					ranker.setTargets(multiSelectors[2].getPokemonList());
					ranker.setRecommendMoveUsage(false);
				}

				$(".poke-search[context='alternative-search']").val('');

				// NEW: Use team composition-based ranking instead of just counter-team performance
				var useCompositionAnalysis = $(".enhanced-option .check.advanced-synergy").hasClass("on");
				
				if (useCompositionAnalysis && typeof ranker.evaluateTeamImprovement === 'function') {
					// Update weights from UI before evaluating
					ranker.setEnhancedWeights(self.getEnhancedWeights());
					
					// New algorithm: Evaluate alternatives by team composition improvement
					try {
						altRankings = self.rankAlternativesByCompositionImprovement(
							ranker,
							team, 
							counterTeam, 
							battle.getCP(), 
							battle.getCup(), 
							exclusionList
						);
						
						if (!altRankings || altRankings.length === 0) {
							console.warn('Composition analysis returned no results, falling back to old algorithm');
							altRankings = ranker.rank(counterTeam, battle.getCP(), battle.getCup(), exclusionList, "team-alternatives").rankings;
							altRankings.sort((a,b) => (a.matchupAltScore > b.matchupAltScore) ? -1 : ((b.matchupAltScore > a.matchupAltScore) ? 1 : 0));
						}
					} catch (e) {
						console.error('Error in composition analysis:', e);
						// Fallback to old algorithm
						altRankings = ranker.rank(counterTeam, battle.getCP(), battle.getCup(), exclusionList, "team-alternatives").rankings;
						altRankings.sort((a,b) => (a.matchupAltScore > b.matchupAltScore) ? -1 : ((b.matchupAltScore > a.matchupAltScore) ? 1 : 0));
					}
				} else {
					// Fallback to old algorithm
					altRankings = ranker.rank(counterTeam, battle.getCP(), battle.getCup(), exclusionList, "team-alternatives").rankings;
					altRankings.sort((a,b) => (a.matchupAltScore > b.matchupAltScore) ? -1 : ((b.matchupAltScore > a.matchupAltScore) ? 1 : 0));
				}
				
				self.displayAlternatives();

				// Clear targets so it will default to the normal format if the user changes settings
				ranker.setTargets([]);



				// Update the overall team grades
				$(".overview-section .notes div").hide();

				// Coverage grade, take threat score
				var threatGrade = self.calculateLetterGrade(1200 - avgThreatScore, 680);

				$(".overview-section.coverage .grade").html(threatGrade.letter);
				$(".overview-section.coverage .grade").attr("grade", threatGrade.letter);
				$(".overview-section.coverage .notes div[grade=\""+threatGrade.letter+"\"]").show();

				// Bulk grade, average HP x Defense stats
				var leagueAverageBulk = [22000,35000,35000,10000];
				var averageBulk = 0;
				var goalBulk = leagueAverageBulk[0];

				for(var i = 0; i < team.length; i++){
					team[i].fullReset();
					averageBulk += (team[i].getEffectiveStat(1) * team[i].stats.hp);
				}

				averageBulk /= team.length;

				if(battle.getCP() == 2500){
					goalBulk = leagueAverageBulk[1];
					if(battle.getCup().name == "premier"){
						goalBulk = 33000;
					}
				} else if(battle.getCP() == 10000){
					goalBulk = leagueAverageBulk[2];
				} else if(battle.getCP() == 500){
					goalBulk = leagueAverageBulk[3];
				}

				var bulkGrade = self.calculateLetterGrade(averageBulk, goalBulk);
				$(".overview-section.bulk .grade").html(bulkGrade.letter);
				$(".overview-section.bulk .grade").attr("grade", bulkGrade.letter);
				$(".overview-section.bulk .notes div[grade=\""+bulkGrade.letter+"\"]").show();

				// Safety grade, how safe these Pokemon's matchups are

				var overallRankings = gm.rankings[key];
				var averageSafety = 0;

				for(var i = 0; i < team.length; i++){
					var safety = 60;

					for(var n = 0; n < overallRankings.length; n++){
						if(team[i].speciesId == overallRankings[n].speciesId){
							safety = overallRankings[n].scores[2];
							break;
						}
					}
					averageSafety += safety;
				}

				averageSafety /= team.length;

				var safetyGrade = self.calculateLetterGrade(averageSafety, 98);
				$(".overview-section.safety .grade").html(safetyGrade.letter);
				$(".overview-section.safety .grade").attr("grade", safetyGrade.letter);
				$(".overview-section.safety .notes div[grade=\""+safetyGrade.letter+"\"]").show();

				// Consistency grade, how bait dependent movesets are
				var averageConsistency = 0;

				for(var i = 0; i < team.length; i++){
					averageConsistency += team[i].calculateConsistency();
				}

				averageConsistency /= team.length;

				var consistencyGrade = self.calculateLetterGrade(averageConsistency, 98);
				$(".overview-section.consistency .grade").html(consistencyGrade.letter);
				$(".overview-section.consistency .grade").attr("grade", consistencyGrade.letter);
				$(".overview-section.consistency .notes div[grade=\""+consistencyGrade.letter+"\"]").show();

				// Set download link data
				var cupTitle = "All Pokemon";
				if(battle.getCup().title){
					cupTitle = battle.getCup().title;
				}
				var filename = "Team vs. " + cupTitle + ".csv";
				var filedata = '';

				if (!csv.match(/^data:text\/csv/i)) {
					filedata = [csv];
					filedata = new Blob(filedata, { type: 'text/csv'});
				}

				$(".button.download-csv").attr("href", window.URL.createObjectURL(filedata));
				$(".button.download-csv").attr("download", filename);


				// Update page title with team name

				var teamNameStr = team[0].speciesName;
				var i = 1;

				for(i = 1; i < Math.min(team.length, 3); i++){
					teamNameStr += ", " + team[i].speciesName;
				}

				if(i < team.length){
					teamNameStr += "+" + (team.length - i);
				}

				document.title = teamNameStr + " - Team Builder | PvPoke";


				runningResults = false;
			}

			// Display the list of alternative Pokemon given a list of searched Pokemon
			this.displayAlternatives = function(list){
				// Gather advanced settings
				var team = multiSelectors[0].getPokemonList();
				var scorecardCount = parseInt($(".scorecard-length-select option:selected").val());
				var alternativeCount = parseInt($(".alternatives-length-select option:selected").val());
				var allowShadows = $(".team-option .check.allow-shadows").hasClass("on");
				var allowXL = $(".team-option .check.allow-xl").hasClass("on");
				var baitShields = $(".team-option .check.shield-baiting").hasClass("on");
				var allowSameSpecies = $(".team-option .check.same-species").hasClass("on");

				// Generate counters and histograms, and display that, too
				var shieldMode = $(".team-advanced .flex.poke .shield-select option:selected").val();
				var shieldCount = 1;

				if(shieldMode == "all"){
					// For "all" mode, default to 1v1 for battle links
					shieldCount = 1;
				} else if(shieldMode != "average"){
					shieldCount = parseInt(shieldMode);
					shieldMode = "single";
				}

				$(".alternatives-table").html("");

				var $row = $("<thead><tr><td class=\"arrow\"></td></tr></thead>");

				for(var n = 0; n < counterTeam.length; n++){
					$row.find("tr").append("<td class=\"name-small\">"+counterTeam[n].speciesName+"</td>");
				}
				
				// Add score column header
				$row.find("tr").append("<td class=\"name-small score-header\" title=\"Total Score = Base Score + Win Rate Bonus\">Score</td>");

				$(".alternatives-table").append($row);
				$(".alternatives-table").append("<tbody></tbody>");

				count = 0;
				total = alternativeCount;
				i = 0;

				// For labyrinth cup, exclude types already on team
				var excludedTypes = [];

				if(battle.getCup().name == "labyrinth"){
					for(var n = 0; n < team.length; n++){
						excludedTypes.push(team[n].types[0]);

						if(team[n].types[1] != "none"){
							excludedTypes.push(team[n].types[1]);
						}
					}
				}

				// Exclude Mega evolutions if one is already on the team
				var hasMega = false;

				for(var n = 0; n < team.length; n++){
					if(team[n].hasTag("mega")){
						hasMega = true;
					}
				}

				// For slot metas, exclude slots that are already filled
				var usedSlots = [];

				if(battle.getCup().slots){
					for(var n = 0; n < team.length; n++){
						let slots = team[n].getSlotNumbers(battle.getCup(), false);

						// Use slots in order
						if(slots.length == 1){
							usedSlots.push(slots[0]);
						} else if(slots.length > 0){
							for(let j = 0; j < slots.length; j++){
								if(! usedSlots.includes(slots[j])){
									usedSlots.push(slots[j]);
									break;
								}
							}
						}
					}
				}

				while((count < total)&&(i < altRankings.length)){
					var r = altRankings[i];

					// Don't exclude alternatives from a custom alternatives list
					if(multiSelectors[2].getPokemonList().length == 0){
						if((r.speciesId.indexOf("_shadow") > -1)&&(! allowShadows)){
							i++
							continue;
						}

						if((r.speciesId.indexOf("_xs") > -1)&&(allowXL)){
							i++;
							continue;
						}

						if((r.pokemon.needsXLCandy())&&(! allowXL)){
							i++;
							continue;
						}


						if(r.pokemon.hasTag("mega") && hasMega){
							i++;
							continue;
						}

						if((! allowSameSpecies) && team.filter(poke => poke.dex == r.pokemon.dex).length > 0){
							i++;
							continue;
						}
					}

					var pokemon = r.pokemon;

					// Filter out Pokemon from search
					if(list && list.indexOf(pokemon.speciesId) == -1){
						i++;
						continue;
					}

					// For Labyrinth Cup, exclude Pokemon of existing types
					if(battle.getCup().name == "labyrinth"){
						if(excludedTypes.indexOf(pokemon.types[0]) > -1 || excludedTypes.indexOf(pokemon.types[1]) > -1){
							i++;
							continue;
						}
					}

					// For slot metas, exclude Pokemon of used slots
					if((battle.getCup().slots)&&(team.length < 6)){
						let slots = pokemon.getSlotNumbers(battle.getCup(), false);

						// If every slot this Pokemon could fill is used, exclude it
						if(slots.every(slot => usedSlots.includes(slot))){
							i++;
							continue;
						}
					}

					// Add results to alternatives table
					
					// Check if we're using composition-based analysis (based on checkbox state, not data structure)
					var isCompositionBased = $(".enhanced-option .check.advanced-synergy").hasClass("on");
					
					// Calculate win/loss record and score breakdown
					var wins = r.matchups ? r.matchups.filter(m => m.rating > 500).length : 0;
					var losses = r.matchups ? r.matchups.filter(m => m.rating <= 500).length : 0;
					var winRate = r.matchups ? (wins / r.matchups.length * 100).toFixed(1) : "N/A";
					var winBonus = (wins / (r.matchups?.length || 1) >= 0.5) ? ((wins / r.matchups.length - 0.5) * 100).toFixed(1) : 0;
					var baseScore = (r.matchupAltScore - winBonus).toFixed(1);
					var totalScore = r.matchupAltScore.toFixed(1);
					
					var scoreTooltip = isCompositionBased ? 
						"Team Composition Score\nThreat Coverage: " + (r.threatCoverage?.toFixed(1) || "N/A") :
						"W-L: " + wins + "-" + losses + " (" + winRate + "%)\n" +
						"Base Score: " + baseScore + "\n" +
						"Win Bonus: +" + winBonus + "\n" +
						"Total Score: " + totalScore;

					// Generate enhanced display info
					var enhancedInfo = "";
					var enhancedOptions = self.getEnhancedOptions();
					
					// Show replacement recommendation if composition-based
					if (isCompositionBased && r.replacedPokemon) {
						enhancedInfo += "<div class=\"replacement-info\">Replace: <b>" + r.replacedPokemon.speciesName + "</b></div>";
						
						// Show improvements
						if (r.improvements) {
							var improvements = [];
							if (r.improvements.bulkDelta > 5) improvements.push("+" + r.improvements.bulkDelta.toFixed(0) + " Bulk");
							if (r.improvements.eptDptDelta > 5) improvements.push("Better Energy");
							if (r.improvements.roleDelta > 0) improvements.push("Fills Role");
							if (r.improvements.typeCoverageDelta > 5) improvements.push("Better Coverage");
							
							if (improvements.length > 0) {
								enhancedInfo += "<div class=\"improvements-info\">" + improvements.join(", ") + "</div>";
							}
						}
					}
					
					if(enhancedOptions.statProductDisplay) {
						var statProduct = pokemon.calculateStatProduct(battle.getCP());
						enhancedInfo += "<div class=\"stat-product-info\">Stat Product: " + 
							Math.round(statProduct.relativeEfficiency * 100) + "% <span class=\"stat-grade " + 
							statProduct.grade + "\">" + statProduct.grade + "</span></div>";
					}
					
					if(enhancedOptions.roleDetection) {
						var role = pokemon.detectOptimalRole();
						enhancedInfo += "<div class=\"role-badge " + role.primary + "\">" + 
							role.primary.charAt(0).toUpperCase() + role.primary.slice(1) + "</div>";
					}

					var recordDisplay = isCompositionBased ? "" : "<div class=\"record\">"+wins+"-"+losses+"</div>";
					$row = $("<tr><th class=\"name\" title=\"" + scoreTooltip + "\"><b>"+(count+1)+". "+pokemon.speciesName+recordDisplay + enhancedInfo + "<div class=\"button add\" pokemon=\""+pokemon.speciesId+"\" alias=\""+pokemon.aliasId+"\">+</div></b></th></tr>");

					// Only show matchup cells if we have matchup data
					if (!isCompositionBased && r.matchups && r.matchups.length > 0) {
						for(var n = 0; n < r.matchups.length; n++){
							var $cell = $("<td><a class=\"rating\" href=\"#\" target=\"blank\"><span></span></a></td>");
							var rating = r.matchups[n].rating;

							$cell.find("a").addClass(battle.getRatingClass(rating));

							if(! baitShields){
								pokemon.isCustom = true;
								pokemon.baitShields = 0;
								r.matchups[n].opponent.isCustom = true;
								r.matchups[n].opponent.baitShields = 0;
							}

							var pokeStr = pokemon.generateURLPokeStr();
							var moveStr = pokemon.generateURLMoveStr();
							var opPokeStr = r.matchups[n].opponent.generateURLPokeStr();
							var opMoveStr = r.matchups[n].opponent.generateURLMoveStr();
							var shieldStr = shieldCount + "" + shieldCount;
							var battleLink = host+"battle/"+battle.getCP(true)+"/"+pokeStr+"/"+opPokeStr+"/"+shieldStr+"/"+moveStr+"/"+opMoveStr+"/";
							$cell.find("a").attr("href", battleLink);

							$row.append($cell);
						}
					} else if (isCompositionBased) {
						// For composition-based alternatives, show a single summary cell with improvement details
						var $summaryCell = $("<td colspan=\"" + (counterTeam.length) + "\" class=\"composition-summary\">");
						
						// Show meaningful improvements based on what's significant
						if (r.improvements) {
							var improvements = [];
							
							// Only show significant changes (>5 points for positive, >2 points for negative)
							if (r.improvements.bulkDelta > 5) {
								improvements.push("<span class=\"improvement-positive\" title=\"Increases team survivability and shield pressure\">+Bulk</span>");
							} else if (r.improvements.bulkDelta < -5) {
								improvements.push("<span class=\"improvement-negative\" title=\"Decreases team survivability\">-Bulk</span>");
							}
							
							if (r.improvements.eptDptDelta > 5) {
								improvements.push("<span class=\"improvement-positive\" title=\"Better fast move energy generation and damage\">+Energy Balance</span>");
							} else if (r.improvements.eptDptDelta < -5) {
								improvements.push("<span class=\"improvement-negative\" title=\"Worse fast move effectiveness\">-Energy Balance</span>");
							}
							
							if (r.improvements.roleDelta > 5) {
								improvements.push("<span class=\"improvement-positive\" title=\"Fills missing Lead/Safe Swap/Closer role\">+Role Coverage</span>");
							} else if (r.improvements.roleDelta < -5) {
								improvements.push("<span class=\"improvement-negative\" title=\"Creates role imbalance\">-Role Coverage</span>");
							}
							
							if (r.improvements.typeCoverageDelta > 5) {
								improvements.push("<span class=\"improvement-positive\" title=\"Reduces shared weaknesses and improves type diversity\">+Type Synergy</span>");
							} else if (r.improvements.typeCoverageDelta < -5) {
								improvements.push("<span class=\"improvement-negative\" title=\"Increases weakness overlap or removes unique type\">-Type Synergy</span>");
							}
							
							if (improvements.length > 0) {
								$summaryCell.append("<div class=\"improvements-list\">" + improvements.join(" ") + "</div>");
							} else {
								$summaryCell.append("<div class=\"improvements-neutral\">Minor adjustments</div>");
							}
							
							// Show threat coverage score if available
							if (r.threatCoverage !== undefined) {
								var threatScore = r.threatCoverage.toFixed(1);
								$summaryCell.append("<div class=\"threat-coverage\" title=\"Average performance against identified threats (0-100 scale)\">Threat Coverage: " + threatScore + "/100</div>");
							}
						}
						
						$row.append($summaryCell);
					}
					
					// Add score column
					var scoreBreakdown = isCompositionBased ? 
						"Composition: " + totalScore :
						"Base: " + baseScore + " + Bonus: " + winBonus;
					var $scoreCell = $("<td class=\"score-cell\" title=\"" + scoreTooltip + "\"><span class=\"total-score\">" + totalScore + "</span><div class=\"score-breakdown\">" + scoreBreakdown + "</div></td>");
					$row.append($scoreCell);

					// Add region for alternative Pokemon for Continentals
					if(battle.getCup().name == "continentals-3"){
						var slotNumber = pokemon.getContinentalSlot();
						var regions = gm.data.pokemonRegions;
						var regionName = regions[slotNumber-1].name;

						$row.find("th.name").append("<div class=\"region-label "+regionName.toLowerCase()+"\">Slot "+ slotNumber + "</div>");
					}

					// Add points for alternative Pokemon for Cliffhanger
					if(battle.getCup().tierRules){
						var tierName = "";
						var pointsName = "points";
						var points = gm.getPokemonTier(pokemon.speciesId, battle.getCup());

						if(points == 1){
							pointsName = "point";
						}

						$row.find("th.name").append("<div class=\"region-label "+tierName.toLowerCase()+"\">"+points+" "+pointsName+"</div>");
					}

					// Add slot label for slot metas
					if(battle.getCup().slots){
						var tierName = "";
						var slot = 0;

						let slots = pokemon.getSlotNumbers(battle.getCup());

						if(slots.length > 0){
							$row.find("th.name").append("<div class=\"region-label\">Slot "+slots.join(", ")+"</div>");
						}

					}

					$(".alternatives-table tbody").append($row);

					i++;
					count++;
				}

				// Center search with the table
				$(".poke-search[context='alternative-search']").parent().css("max-width", $(".alternatives-table").width());
				$(".poke-search[context='alternative-search']").parent().css("margin", "0 auto");

				if(multiSelectors[0].getAvailableSpots() <= 0){
					$(".alternatives-table .button.add").hide();
				}
			}

			// Given a goal value, convert a score into a letter grade

			this.calculateLetterGrade = function(value, goal){
				var gradeScale = [
					{
						letter: "A",
						value: .9
					},
					{
						letter: "B",
						value: .8
					},
					{
						letter: "C",
						value: .7
					},
					{
						letter: "D",
						value: .6
					}
				];

				var percentage = value / goal;
				var letter="F";

				for(var i = gradeScale.length - 1; i >= 0; i--){
					if(percentage >= gradeScale[i].value){
						letter = gradeScale[i].letter;
					}
				}

				var result = {
					letter: letter
				}


				return result;
			}

			// Given a subject type, produce effectiveness array for offense or defense

			this.getTypeEffectivenessArray = function(subjectTypes, direction){
				var arr = [];

				var allTypes = Pokemon.getAllTypes();

				for(var n = 0; n < allTypes.length; n++){

					if(direction == "offense"){
						var effectiveness = DamageCalculator.getEffectiveness(subjectTypes[0], [allTypes[n]]);

						// Round to nearest thousandths to avoid Javascript floating point wonkiness

						effectiveness = Math.floor(effectiveness * 1000) / 1000;

						arr.push(effectiveness);
					} else if(direction == "defense"){
						effectiveness = DamageCalculator.getEffectiveness(allTypes[n], subjectTypes);

						// Round to nearest thousandths to avoid Javascript floating point wonkiness

						effectiveness = Math.floor(effectiveness * 1000) / 1000;

						arr.push(effectiveness);
					}
				}

				return arr;
			}

			this.displayArray = function(arr, direction){
				$(".typings ."+direction).html('');

				// Yes, actually using the <table> tag for its intended function

				var $table = $("<table></table>");

				// Output header row of all types

				var allTypes = Pokemon.getAllTypes();
				var $tr = $("<tr><td></td></tr>");

				for(var i = 0; i < allTypes.length; i++){
					$tr.append("<td class=\""+allTypes[i].toLowerCase()+" heading\">"+allTypes[i]+"</td>");
				}

				$table.append($tr);

				// Output row for each item in arr

				for(var i = 0; i < arr.length; i++){

					$tr = $("<tr></tr>");

					$tr.append("<td class=\""+arr[i].type+" name heading\">"+arr[i].name+"</td>");

					for(var n = 0; n < arr[i].matchups.length; n++){

						var number = arr[i].matchups[n];
						var colors = ['81, 251, 35', '251, 35, 81'];
						var colorIndex = 0;
						var opacity = 0;

						// Display green for resistance and effective moves, red for weaknesses and ineffective moves

						if(direction == "defense"){
							if(number < 1){
								colorIndex = 0;
								opacity = .244 / number;
							} else if(number > 1){
								colorIndex = 1;
								opacity = number / 2.65;
							}
						} else if(direction == "offense"){
							if(number < 1){
								colorIndex = 1;
								opacity = .39 / number;
							} else if(number > 1){
								colorIndex = 0;
								opacity = number / 1.6;
							}
						}

						$tr.append("<td style=\"background:rgba("+colors[colorIndex]+","+opacity+")\">"+arr[i].matchups[n]+"</td>");
					}

					$table.append($tr);
				}

				$(".typings ."+direction).append($table);
			}

			// Given arrays for defensive and offensive effectiveness, produce a written summary

			this.generateSummaries = function(defenseArr, offenseArr){

				$(".summary").html('');

				// Defensive Summary

				var defenseSumArr = []; // Array of string items

				defenseSumArr = this.generateTypeSummary(defenseArr, defenseSumArr, "defense");

				var $defenseList = $("<ul></ul>");

				for(var i = 0; i < defenseSumArr.length; i++){
					$defenseList.append("<li>"+defenseSumArr[i]+"</li>");
				}

				$(".defense-summary").append($defenseList);

				// Offensive Summary

				var offenseSumArr = []; // Array of string items

				offenseSumArr = this.generateTypeSummary(offenseArr, offenseSumArr, "offense");

				var $offenseList = $("<ul></ul>");

				for(var i = 0; i < offenseSumArr.length; i++){
					$offenseList.append("<li>"+offenseSumArr[i]+"</li>");
				}

				$(".offense-summary").append($offenseList);
			}

			// Return an array of descriptions given an array of type effectiveness, and a flag for offense or defense

			this.generateTypeSummary = function(arr, sumArr, direction){
				var typesResistedArr = [];
				var typesWeakArr = [];
				var typesNeutralOrBetter = []; // Array of types that can be hit for neutral damage or better
				var productArr = []; // Product of resistances across all Pokemon

				var allTypes = Pokemon.getAllTypes();

				for(var i = 0; i < allTypes.length; i++){
					typesResistedArr.push(0);
					typesWeakArr.push(0);
					typesNeutralOrBetter.push(0);
					productArr.push(1);
				}

				for(var i = 0; i < arr.length; i++){
					var obj = arr[i];

					for(var n = 0; n < obj.matchups.length; n++){

						if(obj.matchups[n] < 1){
							typesResistedArr[n] = 1;
						} else if (obj.matchups[n] > 1){
							typesWeakArr[n] = 1;
						}

						if(obj.matchups[n] >= 1){
							typesNeutralOrBetter[n] = 1;
						}

						productArr[n] *= obj.matchups[n];
					}
				}
				// Produce a final defensive count

				var typesResisted = 0;
				var typesWeak = 0;
				var overallStrengths = [];
				var overallWeaknesses = [];
				var overallNoNeutralDamage = [];

				for(var i = 0; i < allTypes.length; i++){
					if(typesResistedArr[i] == 1){
						typesResisted++;
					}

					if(typesWeakArr[i] == 1){
						typesWeak++;
					}

					if(typesNeutralOrBetter[i] == 0){
						overallNoNeutralDamage.push(allTypes[i]);
					}

					if(productArr[i] < 1){
						overallStrengths.push(allTypes[i]);
					} else if(productArr[i] > 1){
						overallWeaknesses.push(allTypes[i]);
					}
				}

				if(direction == "defense"){
					sumArr.push("This team resists " + typesResisted + " of " + allTypes.length + " types.");
					sumArr.push("This team is weak to " + typesWeak + " of " + allTypes.length + " types.");
				} else if(direction == "offense"){
					sumArr.push("This team can hit " + typesWeak + " of " + allTypes.length + " types super effectively.");
				}

				var str;

				// On defense show which types are best resisted, and on offense show which types are best hit effectively

				if(overallStrengths.length > 0){
					if(direction=="defense"){
						str = this.generateTypeSummaryList(overallStrengths, "Overall, strong against","");
					} else if(direction=="offense"){
						str = this.generateTypeSummaryList(overallWeaknesses, "Overall, most effective against","");
					}

					sumArr.push(str);
				}

				// On defense, show list of types that hit this team most effectively

				if((overallWeaknesses.length > 0) && (direction == "defense")){
					str = this.generateTypeSummaryList(overallWeaknesses, "Overall, weak to","");

					sumArr.push(str);
				}

				// On offense, show list of types that can't be hit with neutral or better damage

				if((overallNoNeutralDamage.length > 0) && (direction == "offense")){
					str = this.generateTypeSummaryList(overallNoNeutralDamage, "This team can't hit", " for at least neutral damage.");

					sumArr.push(str);
				}

				return sumArr;
			}

			// Generate and return a descriptive string given a list of types

			this.generateTypeSummaryList = function(arr, beforeStr, afterStr){

				var str = beforeStr;

				for(var i = 0; i < arr.length; i++){
					if(i > 0){
						str += ",";

						if((i == arr.length - 1) && (i > 1)){
							str += " and";
						}
					}

					str += " <span class=\"" + arr[i].toLowerCase() + "\">" + arr[i] + "</span>";
				}

				str += afterStr;

				return str;
			}

			// Event handler for changing the cup select

			function selectFormat(e){
				var cp = $(".format-select option:selected").val();
				var cup = $(".format-select option:selected").attr("cup");

				battle.setCP(cp);
				battle.setCup(cup);

				var levelCap = 50;

				if(battle.getCup().levelCap){
					levelCap = battle.getCup().levelCap;
				}

				battle.setLevelCap(levelCap);

				// Set the selected team to the new CP
				for(var i = 0; i < multiSelectors.length; i++){
					multiSelectors[i].setCP(cp);
					multiSelectors[i].setLevelCap(levelCap);
				}

				if(battle.getCup().tierRules){
					multiSelectors[0].setCliffhangerMode(true);
				} else{
					multiSelectors[0].setCliffhangerMode(false);
				}

				if(battle.getCup().partySize == 8){
					$(".team-size-select option[value=8]").prop("selected", "selected");
					$(".team-size-select").trigger("change");
				}

				if(battle.getCup().allowSameSpecies){
					$(".check.same-species").addClass("on");
				}

				// Load ranking data for movesets
				var key = battle.getCup().name + "overall" + battle.getCP();

				if(! gm.rankings[key]){
					gm.loadRankingData(self, "overall", battle.getCP(), battle.getCup().name);
				}
			}

			// Event handler for clicking the rate button

			function rateClick(e){
				$(".rate-btn .btn-label").html("Generating...");
				$(".section.error").hide();
				$(".team-advanced").prev(".toggle").removeClass("active"); // Hide advanced options when generating results

				// This is stupid but the visual updates won't execute until Javascript has completed the entire thread

				setTimeout(function(){
					var results = self.updateTeamResults();

					// Set new page state
					var cp = battle.getCP(true);
					var cup = battle.getCup().name;

					var pokes = multiSelectors[0].getPokemonList();
					var moveStrs = [];
					var teamStr = "team-builder/"+cup+"/"+cp+"/";

					for(var i = 0; i < pokes.length; i++){

						var poke = pokes[i];

						moveStrs.push(poke.generateURLMoveStr());

						teamStr += pokes[i].generateURLPokeStr("team-builder");

						if(i < pokes.length - 1){
							teamStr += "%2C";
						}
					}

					// Add move strings to URL

					var link = host + teamStr;

					$(".share-link input").val(link);

					// Push state to browser history so it can be navigated, only if not from URL parameters

					if(get){

						var sameTeam = true;

						for(var i = 0; i < pokes.length; i++){
							if(get["p"+(i+1)] != pokes[i].speciesId){
								sameTeam = false;
							}
						}

						if(get["cup"] != cup){
							sameTeam = false;
						}

						if(sameTeam){
							return;
						}
					}

					var url = webRoot+teamStr;

					// No guarantee the user will have selected 3 Pokemon, so need to account for all possibilities

					var data = {cup: cup, cp: cp};

					for(var i = 0; i < pokes.length; i++){
						data["p"+(i+1)] = pokes[i].speciesId;
						data["m"+(i+1)] = moveStrs[i];
					}

					window.history.pushState(data, "Team Builder", url);

					// Send Google Analytics pageview
					var teamNameStr = pokes[0].speciesName;
					var i = 1;

					for(i = 1; i < Math.min(pokes.length, 3); i++){
						teamNameStr += ", " + pokes[i].speciesName;
					}

					if(i < pokes.length){
						teamNameStr += "+" + (pokes.length - i);
					}

					gtag('event', 'page_view', {
					  page_title: teamNameStr + " - Team Builder | PvPoke",
					  page_location: link,
					  pageview_type: 'virtual'
					});

					if(results === false){
						return;
					}

					$(".rate-btn .btn-label").html("Rate Team");

					// Scroll down to results

					$("html, body").animate({ scrollTop: $(".section.typings a").first().offset().top }, 500);

					},
				10);

			}

			// Add a Pokemon from the alternatives table

			function addAlternativePokemon(e){
				var id = $(e.target).attr("pokemon");

				// Use an alias ID if it exists
				if($(e.target).attr("alias") != $(e.target).attr("pokemon")){
					id = $(e.target).attr("alias");
				}

				$(".poke-select-container .poke.multi .add-poke-btn").trigger("click", false);

				let pokeSelector = multiSelectors[0].getPokeSelector();
				pokeSelector.setPokemon(id);

				$("html, body").animate({ scrollTop: $(".poke.multi").offset().top }, 500);

				// Use alias default moveset if it exists
				if($(e.target).attr("alias") != $(e.target).attr("pokemon")){
					var pokemon = new Pokemon($(e.target).attr("pokemon"), 0, battle);
					pokemon.initialize(true);
					pokemon.selectRecommendedMoveset();

					$(".modal .move-select.fast option[value=\""+pokemon.fastMove.moveId+"\"]").prop("selected", "selected");
					$(".modal .move-select.fast").trigger("change");

					$(".modal .move-select.charged").eq(0).find("option[value=\""+pokemon.chargedMoves[0].moveId+"\"]").prop("selected", "selected");
					$(".modal .move-select.charged").eq(0).trigger("change");

					$(".modal .move-select.charged").eq(1).find("option[value=\""+pokemon.chargedMoves[1].moveId+"\"]").prop("selected", "selected");
					$(".modal .move-select.charged").eq(1).trigger("change");
				}
			}

			// Open the print dialogue

			function printScorecard(e){
				e.preventDefault();

				$("body").addClass("scorecard-print");

				window.print();
			}

			// Turn checkboxes on and off

			function checkBox(e){
				$(this).toggleClass("on");
				$(this).trigger("change");
			}

			// Change the maximum team size in the advanced settings

			function selectTeamSize(e){
				multiSelectors[0].setMaxPokemonCount($(e.target).find("option:selected").val());
			}

			// Toggle shield weights section visibility based on shield mode

			function toggleShieldWeights(e){
				var shieldMode = $(e.target).find("option:selected").val();
				
				if(shieldMode == "all"){
					$(".shield-weights-section").slideDown(300);
				} else {
					$(".shield-weights-section").slideUp(300);
				}
			}

			// Reset shield weights to default values

			function resetShieldWeights(e){
				e.preventDefault();
				
				// Equal shield scenarios
				$(".shield-weight[data-scenario='1-1']").val(6);
				$(".shield-weight[data-scenario='0-0']").val(4);
				$(".shield-weight[data-scenario='2-2']").val(2);
				
				// Shield advantage scenarios (you have more)
				$(".shield-weight[data-scenario='1-0']").val(3);
				$(".shield-weight[data-scenario='2-1']").val(3);
				$(".shield-weight[data-scenario='2-0']").val(1);
				
				// Shield disadvantage scenarios (you have fewer)
				$(".shield-weight[data-scenario='0-1']").val(3);
				$(".shield-weight[data-scenario='1-2']").val(3);
				$(".shield-weight[data-scenario='0-2']").val(1);
			}

			// Update ranking weight display values
			function updateRankingWeights(e) {
				var $slider = $(e.target);
				var value = $slider.val();
				$slider.siblings('.weight-value').text(value + '%');
				
				// Normalize weights to total 100%
				var total = 0;
				$('.ranking-weight').each(function() {
					total += parseInt($(this).val());
				});
				
				if(total > 0) {
					$('.ranking-weight').each(function() {
						var normalizedValue = Math.round((parseInt($(this).val()) / total) * 100);
						$(this).siblings('.weight-value').text(normalizedValue + '%');
					});
				}
			}

			// Reset enhanced settings to defaults
			function resetEnhancedSettings(e) {
				e.preventDefault();
				
				// Reset weight sliders to new defaults
				$('.ranking-weight[data-factor="threatCoverage"]').val(30).trigger('input');
				$('.ranking-weight[data-factor="bulkImprovement"]').val(20).trigger('input');
				$('.ranking-weight[data-factor="eptDptBalance"]').val(15).trigger('input');
				$('.ranking-weight[data-factor="roleCompletion"]').val(15).trigger('input');
				$('.ranking-weight[data-factor="typeCoverage"]').val(15).trigger('input');
				$('.ranking-weight[data-factor="metaRelevance"]').val(5).trigger('input');
				
				// Reset checkboxes
				$('.enhanced-option .check').addClass('on');
				$('.enhanced-option .check.position-weighting').removeClass('on');
			}

			// Get enhanced ranking weights from UI
			this.getEnhancedWeights = function() {
				var total = 0;
				var weights = {};
				
				// Get raw values for new weight system
				weights.threatCoverage = parseInt($('.ranking-weight[data-factor="threatCoverage"]').val()) || 30;
				weights.bulkImprovement = parseInt($('.ranking-weight[data-factor="bulkImprovement"]').val()) || 20;
				weights.eptDptBalance = parseInt($('.ranking-weight[data-factor="eptDptBalance"]').val()) || 15;
				weights.roleCompletion = parseInt($('.ranking-weight[data-factor="roleCompletion"]').val()) || 15;
				weights.typeCoverage = parseInt($('.ranking-weight[data-factor="typeCoverage"]').val()) || 15;
				weights.metaRelevance = parseInt($('.ranking-weight[data-factor="metaRelevance"]').val()) || 5;
				
				// Normalize to percentages
				total = Object.values(weights).reduce((sum, val) => sum + val, 0);
				if(total > 0) {
					Object.keys(weights).forEach(key => {
						weights[key] = weights[key] / total;
					});
				}
				
				return weights;
			}

			// Get enhanced ranking options from UI
			this.getEnhancedOptions = function() {
				return {
					roleDetection: $('.enhanced-option .check.role-detection').hasClass('on'),
					statProductDisplay: $('.enhanced-option .check.stat-product-display').hasClass('on'),
					advancedSynergy: $('.enhanced-option .check.advanced-synergy').hasClass('on'),
					qualityScoring: $('.enhanced-option .check.quality-scoring').hasClass('on'),
					positionWeighting: $('.enhanced-option .check.position-weighting').hasClass('on')
				};
			}

			// Get shield scenario weights from UI

			this.getShieldWeights = function(){
				return {
					// Equal shield scenarios
					'1-1': parseInt($(".shield-weight[data-scenario='1-1']").val()) || 6,
					'0-0': parseInt($(".shield-weight[data-scenario='0-0']").val()) || 4,
					'2-2': parseInt($(".shield-weight[data-scenario='2-2']").val()) || 2,
					
					// Shield advantage scenarios (you have more shields)
					'1-0': parseInt($(".shield-weight[data-scenario='1-0']").val()) || 3,
					'2-1': parseInt($(".shield-weight[data-scenario='2-1']").val()) || 3,
					'2-0': parseInt($(".shield-weight[data-scenario='2-0']").val()) || 1,
					
					// Shield disadvantage scenarios (you have fewer shields)
					'0-1': parseInt($(".shield-weight[data-scenario='0-1']").val()) || 3,
					'1-2': parseInt($(".shield-weight[data-scenario='1-2']").val()) || 3,
					'0-2': parseInt($(".shield-weight[data-scenario='0-2']").val()) || 1
				};
			}

			/**
			 * NEW: Rank alternatives by team composition improvement
			 * Evaluates each alternative by simulating team with that Pokemon
			 */
			this.rankAlternativesByCompositionImprovement = function(ranker, currentTeam, counterTeam, cp, cup, exclusionList) {
				var pokemonList = gm.generateFilteredPokemonList(battle, cup.include, cup.exclude);
				var alternativesLength = parseInt($(".alternatives-length-select option:selected").val()) || 100;
				var allowShadows = $(".team-option .check.allow-shadows").hasClass("on");
				var allowXL = $(".team-option .check.allow-xl").hasClass("on");
				
				// Remove excluded Pokemon
				if (exclusionList && exclusionList.length > 0) {
					pokemonList = pokemonList.filter(function(pokemon) {
						return exclusionList.indexOf(pokemon.speciesId) === -1;
					});
				}

				var evaluatedAlternatives = [];

				// Evaluate each potential alternative
				for (var i = 0; i < Math.min(pokemonList.length, alternativesLength * 3); i++) {
					var pokemon = pokemonList[i];
					
					// Apply filters
					if (!allowShadows && pokemon.speciesId.indexOf("_shadow") > -1) continue;
					if (!allowXL && pokemon.needsXLCandy && pokemon.needsXLCandy()) continue;
					
					// Select best moveset
					if (typeof pokemon.selectRecommendedMoveset === 'function') {
						pokemon.selectRecommendedMoveset();
					}

					// Evaluate this alternative for ALL team slots (not just the best one)
					try {
						for (var slotIndex = 0; slotIndex < currentTeam.length; slotIndex++) {
							var evaluation = ranker.evaluateTeamImprovement(pokemon, currentTeam, slotIndex, counterTeam, cp);
							
							if (evaluation && evaluation.compositeScore > 0) {
								evaluatedAlternatives.push({
									pokemon: pokemon,
									speciesId: pokemon.speciesId,
									speciesName: pokemon.speciesName,
									rating: evaluation.compositeScore,
									score: evaluation.compositeScore,
									matchupAltScore: evaluation.compositeScore,
									replacementIndex: slotIndex,
									replacedPokemon: evaluation.replacedPokemon,
									improvements: evaluation.improvements,
									threatCoverage: evaluation.threatCoverageScore,
									moveset: {
										fastMove: pokemon.fastMove,
										chargedMoves: pokemon.chargedMoves.slice()
									}
								});
							}
						}
					} catch (e) {
						console.error('Error evaluating', pokemon.speciesName, ':', e);
					}
				}

				// Sort by composite score (descending)
				evaluatedAlternatives.sort(function(a, b) {
					return b.score - a.score;
				});

				return evaluatedAlternatives.slice(0, alternativesLength);
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
