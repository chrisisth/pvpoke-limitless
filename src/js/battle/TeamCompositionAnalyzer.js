// JavaScript Document

/*
 * Team Composition Analyzer
 * Evaluates team quality based on PvP fundamentals:
 * - EPT/DPT balance (energy generation vs pressure)
 * - Role distribution (Lead/Safe Swap/Closer)
 * - Bulk distribution (stat product and survivability)
 * - Type coverage (defensive resistances and offensive threats)
 */

var TeamCompositionAnalyzer = (function () {
    var instance;

    function createInstance() {
        var object = new analyzerObject();

        function analyzerObject() {
            var self = this;
            var gm = GameMaster.getInstance();

            // League-specific bulk benchmarks (Defense × HP product)
            var BULK_BENCHMARKS = {
                1500: 22000,   // Great League
                2500: 35000,   // Ultra League
                10000: 35000,  // Master League
                500: 10000     // Little Cup
            };

            // EPT/DPT thresholds for classification
            var HIGH_EPT_THRESHOLD = 3.5;
            var HIGH_DPT_THRESHOLD = 3.0;
            var BALANCED_EPT_THRESHOLD = 2.5;

            /**
             * Main evaluation function - scores a complete team composition
             * @param {Array} team - Array of Pokemon objects
             * @param {Number} cp - League CP limit
             * @returns {Object} Comprehensive team composition scores
             */
            this.evaluateTeamComposition = function(team, cp) {
                if (!team || team.length === 0) {
                    return this.getEmptyScore();
                }
                
                // Filter out any undefined/null Pokemon
                var validTeam = team.filter(function(p) { return p != null && p != undefined; });
                if (validTeam.length === 0) {
                    return this.getEmptyScore();
                }

                return {
                    bulk: this.calculateBulkScore(validTeam, cp),
                    eptDpt: this.calculateEnergyBalance(validTeam),
                    roles: this.analyzeRoleDistribution(validTeam),
                    typeCoverage: this.analyzeTypeCoverage(validTeam),
                    overall: 0  // Will be calculated as weighted average
                };
            };

            /**
             * Calculate team bulk score
             * Higher stat product = better survivability and shield economy
             */
            this.calculateBulkScore = function(team, cp) {
                var totalBulk = 0;
                var bulkValues = [];
                var benchmark = BULK_BENCHMARKS[cp] || BULK_BENCHMARKS[1500];

                for (var i = 0; i < team.length; i++) {
                    var pokemon = team[i];
                    if (!pokemon || !pokemon.stats) continue;
                    
                    // Bulk = Defense × HP
                    var bulk = pokemon.stats.def * pokemon.stats.hp;
                    bulkValues.push(bulk);
                    totalBulk += bulk;
                }
                
                if (bulkValues.length === 0) {
                    return { score: 0, average: 0, benchmark: benchmark, hasGlassCannon: false, hasTank: false, distribution: 'unknown' };
                }

                var averageBulk = totalBulk / bulkValues.length;
                
                // Calculate distribution (avoid all-glass or all-tank)
                var bulkVariance = this.calculateVariance(bulkValues);
                var hasGlassCannon = bulkValues.some(function(b) { return b < benchmark * 0.6; });
                var hasTank = bulkValues.some(function(b) { return b > benchmark * 1.2; });

                // Score: 0-100
                var bulkRatio = averageBulk / benchmark;
                var baseScore = Math.min(100, bulkRatio * 100);
                
                // Bonus for having both a tank and balanced distribution
                var distributionBonus = 0;
                if (hasTank && !hasGlassCannon) {
                    distributionBonus = 10;
                } else if (bulkVariance < benchmark * 0.3) {
                    distributionBonus = 5; // Consistent bulk
                }

                return {
                    score: Math.min(100, baseScore + distributionBonus),
                    average: averageBulk,
                    benchmark: benchmark,
                    hasGlassCannon: hasGlassCannon,
                    hasTank: hasTank,
                    distribution: bulkVariance < benchmark * 0.3 ? 'balanced' : 'varied'
                };
            };

            /**
             * Calculate EPT/DPT balance
             * Ideal: 1 high EPT, 1 high DPT, 1 balanced
             */
            this.calculateEnergyBalance = function(team) {
                var eptValues = [];
                var dptValues = [];
                
                for (var i = 0; i < team.length; i++) {
                    var pokemon = team[i];
                    if (!pokemon.fastMove) continue;
                    
                    // EPT and DPT calculations
                    // cooldown is in milliseconds, 500ms = 1 turn
                    var turns = pokemon.fastMove.cooldown / 500;
                    var ept = pokemon.fastMove.energyGain / turns;
                    var dpt = pokemon.fastMove.power / turns;
                    
                    eptValues.push(ept);
                    dptValues.push(dpt);
                }

                var hasHighEPT = eptValues.some(function(e) { return e >= HIGH_EPT_THRESHOLD; });
                var hasHighDPT = dptValues.some(function(d) { return d >= HIGH_DPT_THRESHOLD; });
                var hasBalanced = eptValues.some(function(e, idx) { 
                    return e >= BALANCED_EPT_THRESHOLD && dptValues[idx] >= BALANCED_EPT_THRESHOLD; 
                });

                var avgEPT = this.average(eptValues);
                var avgDPT = this.average(dptValues);

                // Score: 0-100
                var score = 0;
                if (hasHighEPT) score += 35;
                if (hasHighDPT) score += 35;
                if (hasBalanced || (hasHighEPT && hasHighDPT)) score += 30;

                return {
                    score: score,
                    averageEPT: avgEPT,
                    averageDPT: avgDPT,
                    hasHighEPT: hasHighEPT,
                    hasHighDPT: hasHighDPT,
                    hasBalanced: hasBalanced,
                    classification: this.classifyEnergyProfile(hasHighEPT, hasHighDPT, hasBalanced)
                };
            };

            /**
             * Analyze role distribution
             * Ideal team has Lead, Safe Swap, and Closer
             */
            this.analyzeRoleDistribution = function(team) {
                var roles = {
                    lead: false,
                    safeSwap: false,
                    closer: false,
                    attacker: 0,
                    charger: 0,
                    consistency: 0
                };

                for (var i = 0; i < team.length; i++) {
                    var pokemon = team[i];
                    
                    // Detect role if method exists
                    if (typeof pokemon.detectOptimalRole === 'function') {
                        var roleData = pokemon.detectOptimalRole();
                        var primaryRole = roleData.primary;

                        if (primaryRole === 'lead') roles.lead = true;
                        if (primaryRole === 'switch' || primaryRole === 'charger') roles.safeSwap = true;
                        if (primaryRole === 'closer' || primaryRole === 'consistency') roles.closer = true;
                        
                        // Count secondary characteristics
                        if (primaryRole === 'attacker') roles.attacker++;
                        if (primaryRole === 'charger') roles.charger++;
                        if (primaryRole === 'consistency') roles.consistency++;
                    }
                }

                // Score: 0-100
                var score = 0;
                if (roles.lead) score += 33;
                if (roles.safeSwap) score += 34;
                if (roles.closer) score += 33;

                return {
                    score: score,
                    hasLead: roles.lead,
                    hasSafeSwap: roles.safeSwap,
                    hasCloser: roles.closer,
                    distribution: this.getRoleDistributionLabel(roles)
                };
            };

            /**
             * Analyze type coverage - both defensive and offensive
             */
            this.analyzeTypeCoverage = function(team) {
                var resistances = {};  // Type -> count of Pokemon that resist it
                var weaknesses = {};    // Type -> count of Pokemon weak to it
                var offensiveCoverage = {}; // Type -> count of Pokemon that hit it super-effectively
                var doubleWeaknesses = [];

                // Analyze each Pokemon
                for (var i = 0; i < team.length; i++) {
                    var pokemon = team[i];
                    if (!pokemon) continue;
                    
                    // Defensive analysis - use Pokemon's typeEffectiveness property
                    if (pokemon.typeEffectiveness) {
                        for (var attackType in pokemon.typeEffectiveness) {
                            // Initialize counters if not yet done
                            if (resistances[attackType] === undefined) {
                                resistances[attackType] = 0;
                                weaknesses[attackType] = 0;
                            }
                            
                            var effectiveness = pokemon.typeEffectiveness[attackType];
                            
                            if (effectiveness < 1) {
                                resistances[attackType]++;
                            } else if (effectiveness > 1) {
                                weaknesses[attackType]++;
                                
                                // Check for double weakness
                                if (effectiveness >= 1.96) {  // 1.6 * 1.6 = 2.56, but checking 1.96 for safety
                                    doubleWeaknesses.push({
                                        pokemon: pokemon.speciesName,
                                        type: attackType
                                    });
                                }
                            }
                        }
                    }

                    // Offensive analysis
                    if (pokemon.fastMove) {
                        if (offensiveCoverage[pokemon.fastMove.type] === undefined) {
                            offensiveCoverage[pokemon.fastMove.type] = 0;
                        }
                        offensiveCoverage[pokemon.fastMove.type]++;
                    }
                    if (pokemon.chargedMoves && pokemon.chargedMoves.length > 0) {
                        for (var j = 0; j < pokemon.chargedMoves.length; j++) {
                            var moveType = pokemon.chargedMoves[j].type;
                            if (offensiveCoverage[moveType] === undefined) {
                                offensiveCoverage[moveType] = 0;
                            }
                            offensiveCoverage[moveType]++;
                        }
                    }
                }

                // Calculate coverage scores
                var resistanceScore = this.calculateCoverageScore(resistances, team.length);
                var offensiveScore = this.calculateCoverageScore(offensiveCoverage, 1);
                var weaknessScore = this.calculateWeaknessPenalty(weaknesses, doubleWeaknesses, team.length);

                // Overall score: 0-100
                var score = (resistanceScore * 0.4) + (offensiveScore * 0.4) + (weaknessScore * 0.2);

                return {
                    score: Math.min(100, score),
                    resistances: resistances,
                    weaknesses: weaknesses,
                    offensiveCoverage: offensiveCoverage,
                    doubleWeaknesses: doubleWeaknesses,
                    resistanceScore: resistanceScore,
                    offensiveScore: offensiveScore,
                    weaknessScore: weaknessScore
                };
            };

            /**
             * Calculate how well types are covered
             */
            this.calculateCoverageScore = function(coverage, teamSize) {
                var totalTypes = Object.keys(coverage).length;
                if (totalTypes === 0) return 0; // Prevent division by zero
                
                var coveredTypes = 0;
                var wellCoveredTypes = 0;

                for (var type in coverage) {
                    if (coverage[type] > 0) coveredTypes++;
                    if (coverage[type] >= 2) wellCoveredTypes++;
                }

                var coverageRatio = coveredTypes / totalTypes;
                var depthBonus = (wellCoveredTypes / totalTypes) * 20;

                return Math.min(100, (coverageRatio * 80) + depthBonus);
            };

            /**
             * Calculate penalty for shared weaknesses
             */
            this.calculateWeaknessPenalty = function(weaknesses, doubleWeaknesses, teamSize) {
                var maxScore = 100;
                
                // Penalty for types that hit multiple team members
                for (var type in weaknesses) {
                    if (weaknesses[type] >= 2) {
                        maxScore -= 15; // Shared weakness is bad
                    }
                    if (weaknesses[type] >= 3) {
                        maxScore -= 20; // Very bad
                    }
                }

                // Penalty for double weaknesses
                maxScore -= doubleWeaknesses.length * 10;

                return Math.max(0, maxScore);
            };

            /**
             * Helper: Calculate variance
             */
            this.calculateVariance = function(values) {
                var avg = this.average(values);
                var squareDiffs = values.map(function(value) {
                    var diff = value - avg;
                    return diff * diff;
                });
                return Math.sqrt(this.average(squareDiffs));
            };

            /**
             * Helper: Calculate average
             */
            this.average = function(arr) {
                if (arr.length === 0) return 0;
                var sum = arr.reduce(function(a, b) { return a + b; }, 0);
                return sum / arr.length;
            };

            /**
             * Helper: Classify energy profile
             */
            this.classifyEnergyProfile = function(hasHighEPT, hasHighDPT, hasBalanced) {
                if (hasHighEPT && hasHighDPT) return 'optimal';
                if (hasHighEPT && !hasHighDPT) return 'energy-focused';
                if (!hasHighEPT && hasHighDPT) return 'pressure-focused';
                if (hasBalanced) return 'balanced';
                return 'slow';
            };

            /**
             * Helper: Get role distribution label
             */
            this.getRoleDistributionLabel = function(roles) {
                if (roles.lead && roles.safeSwap && roles.closer) return 'complete';
                if ((roles.lead && roles.safeSwap) || (roles.safeSwap && roles.closer)) return 'partial';
                return 'unbalanced';
            };

            /**
             * Helper: Empty score object
             */
            this.getEmptyScore = function() {
                return {
                    bulk: { score: 0, average: 0, benchmark: 22000 },
                    eptDpt: { score: 0, averageEPT: 0, averageDPT: 0 },
                    roles: { score: 0, hasLead: false, hasSafeSwap: false, hasCloser: false },
                    typeCoverage: { score: 0, doubleWeaknesses: [] },
                    overall: 0
                };
            };

            /**
             * Calculate overall composite score from weights
             */
            this.calculateOverallScore = function(composition, weights) {
                var total = 0;
                total += composition.bulk.score * (weights.bulk || 0.25);
                total += composition.eptDpt.score * (weights.eptDpt || 0.20);
                total += composition.roles.score * (weights.roles || 0.25);
                total += composition.typeCoverage.score * (weights.typeCoverage || 0.30);
                
                composition.overall = total;
                return total;
            };
        }

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
