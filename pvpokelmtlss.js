// ==UserScript==
// @name         PVPokeLimitless
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Lädt eigene pvpoke-Skripte via CDN robust nach.
// @author       Chris
// @match        *://pvpoke.com/*
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
  'use strict';

  const uw = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

  function log(...args) { console.info('[PVPokeLimitless]', ...args); }
  function warn(...args) { console.warn('[PVPokeLimitless]', ...args); }
  function err(...args) { console.error('[PVPokeLimitless]', ...args); }

  const whenReady = new Promise((resolve) => {
    if (document.readyState === 'interactive' || document.readyState === 'complete') resolve();
    else document.addEventListener('DOMContentLoaded', resolve, { once: true });
  });

  function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

  async function waitFor(condition, { timeout = 15000, interval = 50, label = 'condition' } = {}) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      try {
        const v = condition();
        if (v) return v;
      } catch (_) { /* ignore */ }
      await sleep(interval);
    }
    throw new Error(`Timeout waiting for ${label}`);
  }

  function gmGet(url, { timeout = 15000 } = {}) {
    return new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error(`Timeout fetching ${url}`)), timeout);
      GM.xmlHttpRequest({
        method: 'GET',
        headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
        },
        url,
        onload: (res) => {
          clearTimeout(t);
          if (res.status >= 200 && res.status < 300 && res.responseText && res.responseText.length > 0) {
            resolve(res.responseText);
          } else {
            reject(new Error(`HTTP ${res.status} for ${url}`));
          }
        },
        onerror: (e) => {
          clearTimeout(t);
          reject(e && e.error ? new Error(e.error) : new Error(`Network error for ${url}`));
        }
      });
    });
  }

  function injectCode(code, name = 'injected.js') {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    // ensure page context execution
    s.textContent = `try {\n${code}\n} catch (e) { console.error('[PVPokeLimitless][${name}]', e); }\n//# sourceURL=${name}`;
    (document.head || document.documentElement).appendChild(s);
    s.remove();
  }

  async function loadAndVerify({ url, expectGlobal, verify = () => !!uw[expectGlobal], name }, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        log(`Lade ${name} (${attempt}/${retries})`, url);
        const code = await gmGet(url, { timeout: 20000 });
        injectCode(code, name);
        if (expectGlobal) {
          await waitFor(() => verify(), { timeout: 10000, label: `global ${expectGlobal}` });
        }
        log(`OK: ${name}`);
        return true;
      } catch (e) {
        warn(`Fehler beim Laden ${name}:`, e.message || e);
        if (attempt < retries) await sleep(400 * attempt); // simple backoff
      }
    }
    throw new Error(`Fehlgeschlagen: ${name}`);
  }


  const CDN = 'https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/interface';
  const CDN_BATTLE = 'https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/master/src/js/battle';
  const MODULES = [
    {
      name: 'Pokebox.js',
      url: `${CDN}/Pokebox.js`,
      expectGlobal: 'Pokebox',
      verify: () => typeof uw.Pokebox === 'function',
    },
    {
      name: 'PokeMultiSelect.js',
      url: `${CDN}/PokeMultiSelect.js`,
      expectGlobal: 'PokeMultiSelect',
      verify: () => typeof uw.PokeMultiSelect === 'function',
    },
    {
      name: 'RankingInterface.js',
      url: `${CDN}/RankingInterface.js`,
      expectGlobal: 'RankingInterface',
      verify: () => typeof uw.RankingInterface === 'function' || !!uw.InterfaceMaster,
    },
  ];
  
  const TEAM_BUILDER_MODULES = [
    {
      name: 'TeamCompositionAnalyzer.js',
      url: `${CDN_BATTLE}/TeamCompositionAnalyzer.js`,
      expectGlobal: 'TeamCompositionAnalyzer',
      verify: () => typeof uw.TeamCompositionAnalyzer === 'function',
    },
    {
      name: 'TeamRanker.js',
      url: `${CDN_BATTLE}/rankers/TeamRanker.js`,
      expectGlobal: null, // TeamRanker is not a global, it's loaded as part of the system
      verify: () => true, // Just check it loaded
    },
    {
      name: 'TeamInterface.js',
      url: `${CDN}/TeamInterface.js`,
      expectGlobal: 'TeamInterface',
      verify: () => typeof uw.TeamInterface === 'function',
    },
  ];

  const HARD_BLOCK_ORIGINALS = false;

  if (HARD_BLOCK_ORIGINALS) {
    const patterns = [/Pokebox\.js/i, /PokeMultiSelect\.js/i, /RankingInterface\.js/i];
    const originalAppend = Element.prototype.appendChild;
    Element.prototype.appendChild = function patchedAppend(child) {
      try {
        if (child && child.tagName === 'SCRIPT') {
          const src = child.src || '';
          if (patterns.some((re) => re.test(src))) {
            log('Blockiere originales Script:', src);
            return child;
          }
        }
      } catch (_) { /* ignore */ }
      return originalAppend.call(this, child);
    };
  }


  function SaveRankingButton() {
    const $ = uw.$;
    const PokeMultiSelect = uw.PokeMultiSelect;
    const GameMaster = uw.GameMaster;
    const InterfaceMaster = uw.InterfaceMaster;
    const Battle = uw.Battle;

    if (!($ && PokeMultiSelect && GameMaster && InterfaceMaster && Battle)) {
      return err('Benötigte Globals fehlen für SaveRankingButton');
    }

    try {
      // Get current rankings data
      const currentMeta = InterfaceMaster.getInstance().getMetaGroup();
      
      if (!currentMeta || currentMeta.length === 0) {
        warn('Keine Rankings zum Speichern gefunden');
        return;
      }

      // Get format information
      const formatSelect = document.querySelector('.format-select');
      if (!formatSelect) {
        err('Format-Select nicht gefunden');
        return;
      }
      
      const selectedOption = formatSelect.options[formatSelect.selectedIndex];
      const cp = selectedOption.value;
      const cupGroup = selectedOption.getAttribute('meta-group') || '';

      // Get category
      const categorySelect = document.querySelector('.category-select');
      const categoryValue = categorySelect ? categorySelect.options[categorySelect.selectedIndex].value : '';

      // Create unique key for this ranking
      const saveKey = `${cp}${cupGroup}${categoryValue}`;
      
      log('Speichere Rankings:', {
        cp: cp,
        cupGroup: cupGroup,
        category: categoryValue,
        pokemonCount: currentMeta.length,
        key: saveKey
      });

      // Check if multi-select container exists, if not create it
      let multiSelectContainer = $('.custom-ranking-selector');
      if (multiSelectContainer.length === 0) {
        // Create container for the multi-select
        multiSelectContainer = $('<div class="poke multi custom-ranking-selector" style="margin: 20px 0;"></div>');
        // Insert it before the rankings table or after the controls
        const insertPoint = $('.rankings-container, .format-select-container').first();
        if (insertPoint.length > 0) {
          insertPoint.after(multiSelectContainer);
        } else {
          $('.main').prepend(multiSelectContainer);
        }
      }

      // Initialize PokeMultiSelect with the container
      const customMetaSelector = new PokeMultiSelect(multiSelectContainer);
      const data = GameMaster.getInstance().data;
      customMetaSelector.init(data.pokemon, new Battle());
      
      // Set the current meta group
      customMetaSelector.setPokemonList(currentMeta);
      
      // Save to localStorage
      customMetaSelector.saveCustomList(saveKey, false);
      
      log(`✓ ${currentMeta.length} Pokemon gespeichert unter Schlüssel: ${saveKey}`);
      alert(`Rankings gespeichert!\n${currentMeta.length} Pokemon unter "${saveKey}"`);
      
    } catch (e) {
      err('Fehler beim Speichern:', e);
      alert('Fehler beim Speichern der Rankings. Siehe Konsole für Details.');
    }
  }


  async function ensurePvpokeGlobals() {
    await waitFor(() => uw.$ && uw.GameMaster && uw.InterfaceMaster, {
      timeout: 20000,
      label: 'pvpoke Globals ($, GameMaster, InterfaceMaster)'
    });
  }

  async function loadCustomModulesSequential(required) {
    for (const mod of required) await loadAndVerify(mod);
  }

  async function initRankings() {
    log('Init Rankings');
    await ensurePvpokeGlobals();
    await loadCustomModulesSequential(MODULES);

    await waitFor(() => typeof uw.Main === 'function', { timeout: 20000, label: 'Main()' });

    await whenReady;
    const button = document.createElement('a');
    button.className = 'button';
    button.textContent = 'Save Rankings';
    button.addEventListener('click', SaveRankingButton);

    const exportButton = document.querySelector('a.download-csv');
    if (exportButton && exportButton.parentNode) {
      exportButton.parentNode.insertBefore(button, exportButton.nextSibling);
    } else {
      document.body.appendChild(button);
    }

    try {
      uw.Main();
    } catch (e) {
      err('Main() Fehler:', e);
    }
  }

  async function initBattle() {
    log('Init Battle');
    await ensurePvpokeGlobals();
    await loadCustomModulesSequential(MODULES.slice(0, 2));

    await waitFor(() => typeof uw.Main === 'function', { timeout: 20000, label: 'Main()' });
    await whenReady;
    try {
      uw.Main();
    } catch (e) {
      err('Main() Fehler:', e);
    }
    if (uw.$) {
      uw.$('.poke-max-count').text('1000');
    }
  }

  async function initTeamBuilder() {
    log('Init Team Builder');
    await ensurePvpokeGlobals();
    
    // Load Pokebox + PokeMultiSelect first
    await loadCustomModulesSequential(MODULES.slice(0, 2));
    
    // Then load team-builder specific modules
    await loadCustomModulesSequential(TEAM_BUILDER_MODULES);

    await whenReady;

    // Teamsize 3
    const teamOption = document.querySelector('.team-option .team-size-select');
    if (teamOption && !Array.from(teamOption.options).some(o => o.value === '3')) {
      const newOption = document.createElement('option');
      newOption.value = '3';
      newOption.textContent = '3';
      teamOption.appendChild(newOption);
    }

    // Scorecard: 100..1000
    const scorecardSelect = document.querySelector('.team-option .scorecard-length-select');
    if (scorecardSelect) {
      const values = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
      const existing = new Set(Array.from(scorecardSelect.options).map(o => Number(o.value)));
      values.forEach((value) => {
        if (!existing.has(value)) {
          const option = document.createElement('option');
          option.value = String(value);
          option.textContent = String(value);
          scorecardSelect.appendChild(option);
        }
      });
    }

    await waitFor(() => typeof uw.Main === 'function', { timeout: 20000, label: 'Main()' });
    try {
      uw.Main();
    } catch (e) {
      err('Main() Error:', e);
    }

    if (uw.$) {
      uw.$('.custom-alternatives .poke-max-count').text('1000');
      uw.$('.custom-threats .poke-max-count').text('1000');
      uw.$('.exclude-alternatives .poke-max-count').text('1000');
      uw.$('.exclude-threats .poke-max-count').text('1000');
    }
  }

  // --- Router ----------------------------------------------------------------

  (async function mainRouter() {
    try {
      const path = location.pathname || '';
      if (path.includes('/rankings')) {
        await initRankings();
      } else if (path.includes('/battle')) {
        await initBattle();
      } else if (path.includes('/team-builder')) {
        await initTeamBuilder();
      } else {
        // Keine Aktion auf anderen Seiten notwendig
        log('Seite nicht relevant für PVPokeLimitless:', path);
      }
    } catch (e) {
      err('Initialisierung fehlgeschlagen:', e);
      // Sichtbares Fallback für den Nutzer
      try { alert('PVPokeLimitless: Fehler bei der Initialisierung. Details in der Konsole.'); } catch (_) {}
    }
  })();

})();
