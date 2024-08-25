// ==UserScript==
// @name         PVPokeLimitless
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  PVPokeLimitless Tapermonkey
// @author       Chris
// @match        *://pvpoke.com/*
// @grant        GM.xmlHttpRequest
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  "use strict";
  var url = window.location.href;

  //Enable save rankings to group
  if (url.includes("/new-season/rankings") || url.includes("/rankings")) {
    GM.xmlHttpRequest({
      method: "GET",
      url: "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/Pokebox.js",
      onload: function (response) {
        const script = document.createElement("script");
        script.textContent = response.responseText;
        document.head.appendChild(script);
      },
      onerror: function (error) {
        console.error("Error loading script:", error);
      },
    });

    GM.xmlHttpRequest({
      method: "GET",
      url: "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/PokeMultiSelect.js",
      onload: function (response) {
        const script = document.createElement("script");
        script.textContent = response.responseText;
        document.head.appendChild(script);
      },
      onerror: function (error) {
        console.error("Error loading script:", error);
      },
    });

    GM.xmlHttpRequest({
      method: "GET",
      url: "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/RankingInterface.js",
      onload: function (response) {
        const customScriptContent = response.responseText;

        // Replace RankingInterface.js
        function replaceScript(oldScriptSrc, newScriptContent) {
          const scripts = document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes(oldScriptSrc)) {
              const newScript = document.createElement("script");
              newScript.textContent = newScriptContent;
              scripts[i].parentNode.replaceChild(newScript, scripts[i]);
              break;
            }
          }
        }
        replaceScript("RankingInterface.js", customScriptContent);
        console.log("Replaced");
      },
      onerror: function (error) {
        console.error("Error loading script:", error);
      },
    });

    function SaveRankingButton() {
      var customMetaSelector = new PokeMultiSelect($(".poke.multi").eq(0));
      var data = GameMaster.getInstance().data;
      customMetaSelector.init(data.pokemon, new Battle());
      customMetaSelector.setPokemonList(metaGroupExport);

      var cup = document.getElementsByClassName("format-select")[0];
      cup = cup.options[cup.selectedIndex];
      var cp = cup.value;
      cup = cup.getAttribute("meta-group");

      var category = document.getElementsByClassName("category-select")[0];
      category = category.options[category.selectedIndex];
      category = category.value;

      customMetaSelector.saveCustomList(cp + cup + category, false);
    }

    var button = document.createElement("a");
    button.className = "button";
    button.textContent = "Save Rankings";

    button.addEventListener("click", function () {
      SaveRankingButton();
    });

    var exportButton = document.querySelector("a.download-csv");
    if (exportButton) {
      exportButton.parentNode.insertBefore(button, exportButton.nextSibling);
    }
  }

  if (url.includes("/new-season/battle") || url.includes("/battle")) {

    GM.xmlHttpRequest({
      method: "GET",
      url: "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/PokeMultiSelect.js",
      onload: function (response) {
        const customScriptContent = response.responseText;

        function replaceScript(oldScriptSrc, newScriptContent) {
          const scripts = unsafeWindow.document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes(oldScriptSrc)) {
              const newScript = unsafeWindow.document.createElement("script");
              newScript.textContent = newScriptContent;
              scripts[i].parentNode.replaceChild(newScript, scripts[i]);
              break;
            }
          }
        }
        // Replace RankingInterface.js
        replaceScript("PokeMultiSelect.js", customScriptContent);
        console.log("Replaced");
      },
      onerror: function (error) {
        console.error("Error loading script:", error);
      },
    });
  }

  if (
    url.includes("/new-season/team-builder") ||
    url.includes("/team-builder")
  ) {

    GM.xmlHttpRequest({
      method: "GET",
      url: "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/PokeMultiSelect.js",
      onload: function (response) {
        const customScriptContent = response.responseText;

        function replaceScript(oldScriptSrc, newScriptContent) {
          const scripts = unsafeWindow.document.getElementsByTagName("script");
          for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].src.includes(oldScriptSrc)) {
              const newScript = unsafeWindow.document.createElement("script");
              newScript.textContent = newScriptContent;
              scripts[i].parentNode.replaceChild(newScript, scripts[i]);
              break;
            }
          }
        }
        // Replace RankingInterface.js
        replaceScript("PokeMultiSelect.js", customScriptContent);
        console.log("Replaced");
      },
      onerror: function (error) {
        console.error("Error loading script:", error);
      },
    });

    // Team Builder - team size = 3
    var teamOption = document.querySelector(".team-option .team-size-select");
    if (teamOption) {
      var newOption = document.createElement("option");
      newOption.value = "3";
      newOption.textContent = "3";
      teamOption.appendChild(newOption);
    }

    // Team Builder - scorecard increase
    var scorecardSelect = document.querySelector(
      ".team-option .scorecard-length-select"
    );
    if (scorecardSelect) {
      var values = [100, 200, 300, 400, 500];
      values.forEach(function (value) {
        var option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        scorecardSelect.appendChild(option);
      });
    }
  }

})();
