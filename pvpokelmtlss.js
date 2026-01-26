// ==UserScript==
// @name         PVPokeLimitless
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Loads custom pvpoke scripts from GitHub with 1000 Pokemon limit
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
    s.textContent = `try {\n${code}\n} catch (e) { console.error('[PVPokeLimitless][${name}]', e); }\n//# sourceURL=${name}`;
    (document.head || document.documentElement).appendChild(s);
    s.remove();
  }

  async function loadAndVerify({ url, expectGlobal, verify = () => !!uw[expectGlobal], name }, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        log(`Loading ${name} (${attempt}/${retries})`, url);
        const code = await gmGet(url, { timeout: 20000 });
        injectCode(code, name);
        if (expectGlobal) {
          await waitFor(() => verify(), { timeout: 10000, label: `global ${expectGlobal}` });
        }
        log(`OK: ${name}`);
        return true;
      } catch (e) {
        warn(`Error loading ${name}:`, e.message || e);
        if (attempt < retries) await sleep(400 * attempt);
      }
    }
    throw new Error(`Failed: ${name}`);
  }

  const CDN = 'https://raw.githubusercontent.com/chrisisth/pvpoke-limitless/refs/heads/master/src/js/interface';
  const MODULES = [
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
      verify: () => typeof uw.RankingInterface === 'function',
    },
  ];

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
    
    uw.Main();
    
    // Add Save Rankings button
    const button = document.createElement('a');
    button.className = 'button';
    button.textContent = 'Save Rankings';
    button.addEventListener('click', () => {
      const iface = uw.InterfaceMaster.getInstance();
      const meta = iface.getRankingsExport?.();
      if (!meta?.length) return warn('No rankings to save');
      
      const fs = document.querySelector('.format-select');
      const cs = document.querySelector('.category-select');
      const key = `${fs.value}${fs.selectedOptions[0].getAttribute('meta-group')}${cs?.value || ''}`;
      
      const csv = meta.map(p => {
        let line = p.speciesId;
        if (p.shadowType && p.shadowType !== 'normal') line += '-' + p.shadowType;
        line += ',' + p.fastMove.moveId;
        line += ',' + (p.chargedMoves[0]?.moveId || 'none');
        line += ',' + (p.chargedMoves[1]?.moveId || 'none');
        if (p.isCustom) line += `,${p.level},${p.ivs.atk},${p.ivs.def},${p.ivs.hp}`;
        return line;
      }).join('\n');
      
      localStorage.setItem(key, csv);
      alert(`Saved ${meta.length} Pokemon to "${key}"`);
    });
    
    const exportBtn = document.querySelector('a.download-csv');
    (exportBtn?.parentNode || document.body)[exportBtn ? 'insertBefore' : 'appendChild'](button, exportBtn?.nextSibling);
  }

  async function initBattle() {
    log('Init Battle');
    await ensurePvpokeGlobals();
    await loadCustomModulesSequential([MODULES[0]]); // Load PokeMultiSelect only
    await waitFor(() => typeof uw.Main === 'function', { timeout: 20000, label: 'Main()' });
    await whenReady;
    
    uw.Main();
    await sleep(500);
    
    // Update display to show 1000
    uw.$('.poke-max-count').text('1000');
  }

  // Router
  (async function() {
    try {
      const path = location.pathname;
      if (path.includes('/rankings')) await initRankings();
      else if (path.includes('/battle')) await initBattle();
    } catch (e) {
      err('Init failed:', e);
      alert('PVPokeLimitless: Initialization failed. Check console for details.');
    }
  })();

})();
