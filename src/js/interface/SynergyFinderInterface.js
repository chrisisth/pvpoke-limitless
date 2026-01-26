// SynergyFinderInterface.js
// Fully rewritten, robust integration between SynergyAnalyzer and the Synergy Finder UI.
// - Builds Pokemon instances once and caches them
// - Uses delegated event handlers
// - Uses <button> for Details to avoid link overlay issues
// - Defensive checks and progress callback support

var SynergyFinderInterface = (function () {
  var instance;

  function createInstance() {
    var object = new SynergyFinder();

    function SynergyFinder() {
      var gm = null;
      var battle = null;
      var analyzer = null;
      var self = this;
      var results = [];
      var running = false;

      // Cache for Pokemon instances (built once)
      var allPokemonInstances = null;

      // Public init called from page (or via wait-for-GM wrapper)
      this.init = function () {
        // Defensive: wait for GameMaster to be available and populated
        waitForGameMaster(function () {
          gm = GameMaster.getInstance();
          battle = new Battle();

          if (typeof pokeSearch !== "undefined") {
            pokeSearch.setBattle(battle);
          }

          bindUI();

          // If URL params exist, load them
          self.loadGetData();
        });
      };

      // Wait until GameMaster exists and has pokemon data
      function waitForGameMaster(cb) {
        try {
          var gmCandidate = window.GameMaster && GameMaster.getInstance && GameMaster.getInstance();
          if (gmCandidate && gmCandidate.data && Array.isArray(gmCandidate.data.pokemon) && gmCandidate.data.pokemon.length > 0) {
            cb();
          } else {
            setTimeout(function () {
              waitForGameMaster(cb);
            }, 50);
          }
        } catch (e) {
          setTimeout(function () {
            waitForGameMaster(cb);
          }, 50);
        }
      }

      /**
       * Build Pokemon instances from GameMaster raw data.
       * Cached to avoid repeated heavy instantiation.
       */
      function buildAllPokemonInstances() {
        if (allPokemonInstances && allPokemonInstances.length) return allPokemonInstances;

        var raw = (gm && gm.data && gm.data.pokemon) ? gm.data.pokemon : [];
        allPokemonInstances = [];

        for (var i = 0; i < raw.length; i++) {
          try {
            var p = raw[i];
            var poke = new Pokemon(p.speciesId, 0, battle);
            // initialize for current CP so move pools and stats are populated
            poke.initialize(battle.getCP());
            allPokemonInstances.push(poke);
          } catch (err) {
            // Skip problematic entries but continue building
            console.warn("SynergyFinder: failed to instantiate", raw[i] && raw[i].speciesId, err);
          }
        }

        return allPokemonInstances;
      }

      // --- UI binding ---
      function bindUI() {
        // Basic logs for debugging
        // console.log("SynergyFinderInterface: bindUI");

        // Format select (cp / cup)
        $("body").on("change", ".format-select", function () {
          selectFormat();
        });

        // Search input handlers
        $("body").on("input", ".poke-search[context='synergy-search']", onSearchInput);
        $("body").on("keydown", ".poke-search[context='synergy-search']", onSearchKeyDown);

        // Delegated row click: ignore clicks that originate from the details button
        $("body").on("click", ".synergy-results-list .result-row", function (e) {
          if ($(e.target).closest('.details-btn, .details-btn-button').length) {
            // Click came from details area — ignore here
            return;
          }

          var id = $(this).attr("data-id");
          var idx = $(this).attr("data-index");

          if (id) {
            selectPokemonById(id);
          } else if (typeof idx !== "undefined" && idx !== null) {
            openDetailModal(parseInt(idx, 10));
          }
        });

        // Details button (uses <button> to avoid link overlay issues)
        $("body").on("click", ".synergy-results-list .details-btn-button", function (e) {
          e.preventDefault();
          e.stopPropagation();
          var idx = $(this).closest(".result-row").attr("data-index");
          if (typeof idx !== "undefined" && idx !== null) {
            openDetailModal(parseInt(idx, 10));
          }
        });

        // Quick-result click (from search suggestions)
        $("body").on("click", ".synergy-results-list .synergy-quick-result", function (e) {
          e.preventDefault();
          var id = $(this).attr("data-id");
          if (id) selectPokemonById(id);
        });

        // Find button (if present)
        $("body").on("click", ".synergy-find-btn", function (e) {
          e.preventDefault();
          var val = $(".poke-search[context='synergy-search']").val().trim();
          if (val) selectPokemonByString(val);
        });

        // Close modal
        $("body").on("click", ".synergy-detail-modal .close-btn", function (e) {
          e.preventDefault();
          $(".synergy-detail-modal").addClass("hide");
        });

        // Popstate for back/forward navigation
        window.addEventListener('popstate', function (e) {
          get = e.state;
          self.loadGetData();
        });
      }

      // Handle format change (cp/cup)
      function selectFormat() {
        var cp = $(".format-select option:selected").val();
        var cup = $(".format-select option:selected").attr("cup");

        if (!battle) battle = new Battle();
        battle.setCP(cp);
        battle.setCup(cup);

        var current = $(".synergy-results-container").data("selected");
        if (current) {
          // Re-run analysis for the same pokemon with new format
          selectPokemonById(current);
        }
      }

      // Search input handler: show quick matches
      function onSearchInput(e) {
        var q = $(e.target).val().trim().toLowerCase();
        var $list = $(".synergy-results-list");
        $list.empty();

        if (!q) {
          $(".synergy-results-container").addClass("hide");
          return;
        }

        var pool = (gm && gm.data && gm.data.pokemon) ? gm.data.pokemon : [];
        var matches = [];

        for (var i = 0; i < pool.length; i++) {
          var p = pool[i];
          var name = (p.speciesName || p.speciesId || "").toLowerCase();
          var id = (p.speciesId || "").toLowerCase();

          if (name.indexOf(q) > -1 || id.indexOf(q) > -1) {
            matches.push(p);
          }

          if (matches.length >= 12) break;
        }

        if (matches.length === 0) {
          $(".synergy-results-container").removeClass("hide");
          $(".synergy-results-table").addClass("hide");
          $(".synergy-analysis-info").removeClass("hide").find("p").text("No matches found.");
          return;
        }

        $(".synergy-results-container").removeClass("hide");
        $(".synergy-analysis-info").removeClass("hide").find("p").text("Select a Pokémon to analyze...");
        $(".synergy-results-table").addClass("hide");

        for (var j = 0; j < matches.length; j++) {
          var mp = matches[j];
          var $row = $("<div class='result-row synergy-quick-result' data-id='" + mp.speciesId + "'>" +
            "<div class='pokemon-name'>" + mp.speciesName + "</div>" +
            "<div class='pokemon-id'>" + mp.speciesId + "</div>" +
            "</div>");
          $list.append($row);
        }
      }

      // Keyboard support: Enter selects first match
      function onSearchKeyDown(e) {
        if (e.key === "Enter") {
          var first = $(".synergy-results-list .synergy-quick-result").first();
          if (first.length) {
            selectPokemonById(first.attr("data-id"));
          } else {
            var val = $(e.target).val().trim();
            if (val) selectPokemonByString(val);
          }
        }
      }

      // Resolve free text to speciesId
      function selectPokemonByString(str) {
        var pool = (gm && gm.data && gm.data.pokemon) ? gm.data.pokemon : [];
        var q = str.trim().toLowerCase();

        for (var i = 0; i < pool.length; i++) {
          if (pool[i].speciesId && pool[i].speciesId.toLowerCase() === q) {
            return selectPokemonById(pool[i].speciesId);
          }
        }

        for (var j = 0; j < pool.length; j++) {
          if (pool[j].speciesName && pool[j].speciesName.toLowerCase() === q) {
            return selectPokemonById(pool[j].speciesId);
          }
        }

        for (var k = 0; k < pool.length; k++) {
          if ((pool[k].speciesName || "").toLowerCase().indexOf(q) > -1) {
            return selectPokemonById(pool[k].speciesId);
          }
        }

        $(".synergy-analysis-info").removeClass("hide").find("p").text("No Pokémon matched your search.");
      }

      // Select by speciesId and start analysis
      function selectPokemonById(speciesId) {
        if (!speciesId || !gm || !gm.data) return;

        if (!battle) battle = new Battle();

        var base = new Pokemon(speciesId, 0, battle);
        base.initialize(battle.getCP());

        $(".synergy-results-container").removeClass("hide");
        $(".synergy-pokemon-name").text(base.speciesName);
        $(".synergy-pokemon-description").text((base.types || []).join(" / ") || "—");
        $(".synergy-results-table").addClass("hide");
        $(".synergy-analysis-info").removeClass("hide");
        $(".synergy-analysis-info .progress").css("width", "0%");

        $(".synergy-results-container").data("selected", speciesId);

        // Build instances and instantiate analyzer
        var allPokemon = buildAllPokemonInstances();
        analyzer = new SynergyAnalyzer(base, allPokemon, battle, null);

        runAnalysis(base);
      }

      // Run analyzer.findBestPartners with progress callback and render results
      function runAnalysis(basePokemon) {
        if (!analyzer) return;

        running = true;
        var cp = battle.getCP();
        var cup = battle.getCup().name;
        var limit = 100;

        try {
          var progressCallback = function (progress) {
            var pct = Math.round(progress * 100);
            $(".synergy-analysis-info .progress").css("width", pct + "%");
          };

          // Analyzer is synchronous in current implementation; adapt if async later
          var synergies = analyzer.findBestPartners(cp, cup, limit, progressCallback) || [];

          results = synergies;
          renderResults();
        } catch (err) {
          console.error("SynergyFinder: analysis failed", err);
          $(".synergy-analysis-info .progress").css("width", "0%");
          $(".synergy-analysis-info p").text("Analysis failed. See console for details.");
        } finally {
          running = false;
        }
      }

      // Render results table (uses <button> for details)
      function renderResults() {
        $(".synergy-analysis-info").addClass("hide");
        $(".synergy-results-table").removeClass("hide");
        var $list = $(".synergy-results-list");
        $list.empty();

        if (!results || results.length === 0) {
          $list.append("<div class='no-results'>No synergy partners found.</div>");
          return;
        }

        for (var i = 0; i < results.length; i++) {
          var r = results[i];
          var partner = r.pokemon;
          var score = Math.round((r.score && r.score.total) ? r.score.total : (r.score || 0));
          var safeName = partner && partner.speciesName ? partner.speciesName : (partner && partner.speciesId ? partner.speciesId : "Unknown");

          var $row = $(
            "<div class='result-row' data-index='" + i + "'>" +
              "<div class='header rank'>" + (i + 1) + "</div>" +
              "<div class='header pokemon-name'>" + safeName + "</div>" +
              "<div class='header score'>" + score + "%</div>" +
              "<div class='header details-btn'><button class='button small details-btn-button' type='button'>Details</button></div>" +
            "</div>"
          );

          $list.append($row);
        }
      }

      // Open detail modal for a result index
      function openDetailModal(index) {
        console.log("SynergyFinder: openDetailModal", index);
        if (!results || !results[index]) {
          console.warn("SynergyFinder: no result at index", index);
          return;
        }

        var entry = results[index];
        var partner = entry.pokemon;
        var score = entry.score || {};
        var moveset = entry.moveset || {};

        $(".synergy-detail-modal .detail-pokemon-name").text(partner.speciesName || partner.speciesId || "Unknown");

        // Type analysis
        var typeAnalysisHtml = "";
        if (analyzer && typeof analyzer._getWeaknesses === "function") {
          var weak = analyzer._getWeaknesses(partner.types || []);
          var resList = [];
          for (var t = 0; t < (partner.types || []).length; t++) {
            var ty = partner.types[t];
            if (analyzer.typeResistances && analyzer.typeResistances[ty]) {
              resList = resList.concat(analyzer.typeResistances[ty]);
            }
          }
          resList = Array.from(new Set(resList));
          typeAnalysisHtml += "<div><b>Types:</b> " + ((partner.types || []).join(" / ") || "—") + "</div>";
          typeAnalysisHtml += "<div><b>Weaknesses:</b> " + (weak.length ? weak.join(", ") : "None") + "</div>";
          typeAnalysisHtml += "<div><b>Resistances:</b> " + (resList.length ? resList.join(", ") : "None") + "</div>";
        } else {
          typeAnalysisHtml = "<div>Type analysis unavailable.</div>";
        }
        $(".synergy-detail-modal .type-analysis").html(typeAnalysisHtml);

        // Scores
        $(".synergy-detail-modal .weakness-score").text(Math.round((score.weaknessAbsorption || 0)) + "%");
        $(".synergy-detail-modal .resistance-score").text(Math.round((score.mutualResistances || 0)) + "%");
        $(".synergy-detail-modal .coverage-score").text(Math.round((score.offensiveCoverage || 0)) + "%");
        $(".synergy-detail-modal .role-score").text(Math.round((score.roleComplement || 0)) + "%");
        $(".synergy-detail-modal .meta-score").text(Math.round((score.metaRobustness || 0)) + "%");
        $(".synergy-detail-modal .total-score").text(Math.round((score.total || 0)) + "%");

        // Movesets tested
        var movesHtml = "";
        if (moveset && (moveset.fast || moveset.charged)) {
          if (moveset.fast) movesHtml += "<div><b>Fast:</b> " + moveset.fast + "</div>";
          if (moveset.charged) movesHtml += "<div><b>Charged:</b> " + (Array.isArray(moveset.charged) ? moveset.charged.join(", ") : moveset.charged) + "</div>";
          movesHtml += "<div class='muted'>Note: moveset IDs shown; UI can be extended to resolve names.</div>";
        } else {
          movesHtml = "<div>No moveset details available.</div>";
        }
        $(".synergy-detail-modal .movesets-tested").html(movesHtml);

        // Placeholders for matchups and team suggestions
        $(".synergy-detail-modal .key-matchups").html("<div class='muted'>Key matchups are not computed by the type-only analyzer.</div>");
        $(".synergy-detail-modal .team-suggestion").html("<div class='muted'>Team suggestions require composition analysis integration.</div>");

        $(".synergy-detail-modal").removeClass("hide");
      }

      // Load GET parameters (cp, cup, p)
      this.loadGetData = function () {
        if (!get) return;

        for (var key in get) {
          if (!get.hasOwnProperty(key)) continue;
          var val = get[key];

          switch (key) {
            case "cp":
              var cpVal = val;
              if (val.indexOf("-") > -1) cpVal = val.split("-")[0];
              if (!battle) battle = new Battle();
              battle.setCP(cpVal);
              $(".format-select option[value=\"" + cpVal + "\"]").prop("selected", "selected");
              break;

            case "cup":
              if (!battle) battle = new Battle();
              battle.setCup(val);
              $(".format-select option[cup=\"" + val + "\"]").first().prop("selected", "selected");
              break;

            case "p":
              (function (speciesId) {
                setTimeout(function () {
                  selectPokemonById(speciesId);
                }, 50);
              })(val);
              break;
          }
        }
      };

      // Re-run analysis for currently selected pokemon
      this.reanalyzeSelected = function () {
        var selected = $(".synergy-results-container").data("selected");
        if (selected) selectPokemonById(selected);
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
