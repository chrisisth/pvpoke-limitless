// ==UserScript==
// @name         PVPokeLimitless
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  PVPokeLimitless Tapermonkey
// @author       Chris
// @match        *://pvpoke.com/*
// @grant        GM.xmlHttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  var url = window.location.href;

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

  function BlockScript(script) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
          for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            if (node.tagName === "SCRIPT" && node.src.includes(script)) {
              node.parentNode.removeChild(node);
            }
          }
        }
      });
    });

    observer.observe(document, { childList: true, subtree: true });
  }

  function LoadScript(scripturl) {
    GM.xmlHttpRequest({
      method: "GET",
      url: scripturl,
      onload: function (response) {
        const script = document.createElement("script");
        script.textContent = response.responseText;
        document.head.appendChild(script);
      },
      onerror: function (error) {
        console.error("Error loading script:", error);
      },
    });
  }

  if (url.includes("/new-season/rankings") || url.includes("/rankings")) {
    BlockScript("Pokebox.js");
    BlockScript("PokeMultiSelect.js");
    BlockScript("RankingInterface.js");

    LoadScript(
      "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/Pokebox.js"
    );
    LoadScript(
      "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/PokeMultiSelect.js"
    );
    LoadScript(
      "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/RankingInterface.js"
    );

    window.onload = function () {
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
      Main();
    };
  }
  if (url.includes("/new-season/battle") || url.includes("/battle")) {
    BlockScript("PokeMultiSelect.js");
    BlockScript("RankingInterface.js");

    LoadScript(
      "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/Pokebox.js"
    );
    LoadScript(
      "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/PokeMultiSelect.js"
    );
    window.onload = function () {
      Main();
      $(".poke-max-count").text("1000");
    };
  }

  if (
    url.includes("/new-season/team-builder") ||
    url.includes("/team-builder")
  ) {
    BlockScript("PokeMultiSelect.js");
    BlockScript("RankingInterface.js");

    LoadScript(
      "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/Pokebox.js"
    );
    LoadScript(
      "https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface/PokeMultiSelect.js"
    );

    window.onload = function () {
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
        var values = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        values.forEach(function (value) {
          var option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          scorecardSelect.appendChild(option);
        });
      }
      Main();
      $(".custom-alternatives .poke-max-count").text("1000");
      $(".custom-threats .poke-max-count").text("1000");
      $(".exclude-alternatives .poke-max-count").text("1000");
      $(".exclude-threats .poke-max-count").text("1000");
    };
  }
})();
