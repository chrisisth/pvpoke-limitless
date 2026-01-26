# Synergy Finder - Fehleranalyse & Lösungsplan

## FEHLER 1: `Pokemon.clone()` existiert nicht
**Datei:** SynergyAnalyzer.js, Zeile ~40
**Problem:** Halluzinierte Methode - Pokemon hat keine clone()-Funktion
**Aktueller Code:**
```javascript
const testPoke = candidatePoke.clone();
```

**LÖSUNGSPLAN:**
- ✅ **Ansatz:** Keine Kopie erstellen - nutze direkt das Pokemon-Objekt aus der Liste
- ✅ **Warum:** Für Synergie-Berechnung braucht man keine Kopie, nur die bestehenden Moves
- ✅ **Änderung in:** `_calculateSynergyWithVariations()` Methode
- ✅ **Neue Logik:** Hole Move-Objekte aus den Pools statt sie zu setzen

```javascript
// STATT:
const testPoke = candidatePoke.clone();
testPoke.selectMove("fast", moveset.fast);

// BESSER:
const testPoke = candidatePoke; // Nutze Original
// oder für different movesets:
_calculateSynergyScore(basePoke, candidatePoke, cp, cup, moveset);
```

---

## FEHLER 2: `pokemon.fastMovePool` / `pokemon.chargedMovePool` existiert nicht
**Datei:** SynergyAnalyzer.js, Zeile ~90
**Problem:** Diese Properties existieren als `fastMovePool` (nicht leer!), aber Zugriff ist falsch
**Aktueller Code:**
```javascript
const fastMoves = pokemon.fastMovePool || [];
const chargedMoves = pokemon.chargedMovePool || [];
```

**LÖSUNGSPLAN:**
- ✅ **Status:** Die Properties EXISTIEREN tatsächlich! Sind in Pokemon.js definiert
- ✅ **Fehler war:** Falsche Annahme - es IST OK diese zu verwenden
- ✅ **Verbesserung:** Defensive Checks hinzufügen falls leer
- ✅ **Keine Änderung nötig** - aber Fehlerbehandlung verbessern

```javascript
// BESSER (mit Fehlerbehandlung):
const fastMoves = (pokemon.fastMovePool && pokemon.fastMovePool.length > 0) 
  ? pokemon.fastMovePool 
  : [];
```

---

## FEHLER 3: `selectMove()` falsch aufgerufen
**Datei:** SynergyAnalyzer.js, Zeile ~45-47
**Problem:** selectMove() braucht moveId (string), nicht move-Objekt
**Aktueller Code:**
```javascript
testPoke.selectMove("fast", moveset.fast);
for (let j = 0; j < moveset.charged.length; j++) {
    testPoke.selectMove("charged", moveset.charged[j], j);
}
```

**LÖSUNGSPLAN:**
- ✅ **Ansatz 1:** selectMove() RICHTIG aufrufen mit moveId
- ✅ **Ansatz 2:** Keine Methode aufrufen, nur Synergien mit bestehendem Moveset rechnen
- ✅ **Empfehlung:** Ansatz 2 - einfacher und schneller
- ✅ **Änderung:** Moveset-Variations nur für Synergie-Scoring nutzen, nicht anwenden

```javascript
// STATT selectMove zu nutzen:
// Nutze moveset.fast und moveset.charged direkt bei der Synergieberechnung
// ohne das Pokemon-Objekt zu modifizieren
score = this._calculateSynergyScore(basePoke, candidatePoke, cp, cup, {
    fast: moveset.fast,
    charged: moveset.charged
});
```

---

## FEHLER 4: `getPokemonByAliasId()` existiert nicht
**Datei:** SynergyFinderInterface.js, Zeile ~27
**Problem:** Diese Methode gibt es nicht in GameMaster
**Aktueller Code:**
```javascript
const pokemon = gm.getPokemonByAliasId(pokeParam);
```

**LÖSUNGSPLAN:**
- ✅ **Verfügbare Methoden:** `getPokemonById(speciesId)`, `getPokemonByFamily()`
- ✅ **Lösung:** Nutze `getPokemonById()` statt `getPokemonByAliasId()`
- ✅ **Änderung:**

```javascript
// STATT:
const pokemon = gm.getPokemonByAliasId(pokeParam);

// BESSER:
const pokemon = gm.getPokemonById(pokeParam); // pokeParam ist die speciesId
```

---

## FEHLER 5: Type-Datenstruktur falsch
**Datei:** SynergyAnalyzer.js, Zeilen ~290-310
**Problem:** Halluzinierte `typeData.weaknesses` - GameMaster Struktur ist anders
**Aktueller Code:**
```javascript
if (typeData && typeData.weaknesses) {
    typeData.weaknesses.forEach(w => weaknesses.add(w));
}
```

**LÖSUNGSPLAN:**
- ✅ **Research nötig:** Echte Type-Struktur in gamemaster.json prüfen
- ✅ **Vermutung:** Types sind in `data.types[typeName].weaknesses` oder similar
- ✅ **Temporäre Lösung:** Einfache Type-Weakness Mapping direkt in Code

```javascript
// STATT Komplexe GameMaster Nutzung:
// Nutze einfaches Objekt für Schwächen/Resistenzen
const TYPE_MATCHUPS = {
    'fire': { weaknesses: ['water', 'ground', 'rock'] },
    'water': { weaknesses: ['grass', 'electric'] },
    // etc...
};

// ODER: Schaue in bestehende battle.js wie TypeMultiplier berechnet werden
```

---

## FEHLER 6: Modal `hide/active` Klassen Mismatch
**Datei:** SynergyFinderInterface.js, Zeile ~65 vs CSS
**Problem:** JS nutzt `hide` Klasse, aber CSS erwartet `active` Klasse
**Aktueller Code (JS):**
```javascript
$(".synergy-detail-modal").addClass("hide");
// und
$(".synergy-detail-modal").removeClass("hide");
```

**Aktueller Code (CSS):**
```css
.synergy-detail-modal.active {
    display: flex;
}
```

**LÖSUNGSPLAN:**
- ✅ **Lösung:** Standardisiere auf `active` Klasse (wie in bestehenden Modals)
- ✅ **Änderung in:** SynergyFinderInterface.js
- ✅ **CSS ist OK** - hat `hide` und `active`

```javascript
// STATT .hide:
$(".synergy-detail-modal").removeClass("active");

// STATT .show:
$(".synergy-detail-modal").addClass("active");
```

---

## FEHLER 7: `.poke-search-result` Selector existiert nicht
**Datei:** SynergyFinderInterface.js, Zeile ~48
**Problem:** PokeSearch erzeugt nicht diesen Selektor
**Aktueller Code:**
```javascript
$("body").on("click", ".poke-search-result", function() {
```

**LÖSUNGSPLAN:**
- ✅ **Research:** Schaue wie PokeSearch in Interface.js verwendet wird
- ✅ **Lösung:** Nutze PokeSearch's .init() Callback oder schaue nach dem richtigen Event
- ✅ **Alternative:** Nutze `.rank` Selektor (Standard-Ranking-Selector)

```javascript
// PokeSearch hat callbacks - nutze diese:
pokeSearch.setCallback(function(pokemon) {
    self.startSynergyAnalysis(pokemon);
});

// ODER nutze Standard-Klick wenn suche ergebnisse zeigt:
$("body").on("click", ".rank[context='synergy-search']", function() {
    const speciesId = $(this).attr("data");
    const pokemon = gm.getPokemonById(speciesId);
    if (pokemon) {
        self.startSynergyAnalysis(pokemon);
    }
});
```

---

## FEHLER 8: PokeSearch Initialisierung falsch
**Datei:** SynergyFinderInterface.js, Zeile ~20
**Problem:** PokeSearch wird nicht korrekt initialisiert
**Aktueller Code:**
```javascript
const pokeSearch = new PokeSearch($(".synergy-input-container"));
pokeSearch.setBattle(battle);
pokeSearch.init(gm.data.pokemon, battle);
pokeSearch.setContext("synergy-search");
```

**LÖSUNGSPLAN:**
- ✅ **Schau Interface.js:** Dort wird PokeSearch richtig genutzt
- ✅ **Fehler:** Übergabe von Container statt Input-Element
- ✅ **Änderung:**

```javascript
// BESSER:
const pokeSearch = new PokeSearch($(".synergy-input-container")); // Keep
pokeSearch.setBattle(battle);
pokeSearch.init(gm.data.pokemon, battle);
// setContext müsste geprüft werden ob es existiert
```

---

## FEHLER 9: HTML `hide` Klasse Display
**Datei:** synergy-finder.php, `.synergy-results-container`
**Problem:** Element hat `hide` Klasse, aber CSS hat kein `display: block` wenn Klasse entfernt
**Aktueller HTML:**
```html
<div class="section white synergy-results-container hide">
```

**Aktueller CSS:**
```css
/* FEHLT: .synergy-results-container { display: block; } */
.synergy-detail-modal.hide { display: none; }
```

**LÖSUNGSPLAN:**
- ✅ **Lösung:** Nutze `display: block !important;` wenn hide entfernt wird
- ✅ **ODER:** Nutz jQuery `.show()` statt `.removeClass("hide")`
- ✅ **Empfehlung:** Letzteres für Konsistenz

```javascript
// STATT:
$(".synergy-results-container").removeClass("hide");

// BESSER:
$(".synergy-results-container").show();
$(".synergy-analysis-info").hide();
```

---

## FEHLER 10: Externe Bild-URL hardcodiert
**Datei:** SynergyFinderInterface.js, Zeile ~123
**Problem:** Externe GitHub-URL wird hartcodiert - sollte relative Path sein
**Aktueller Code:**
```javascript
"<span class='poke-image' style='background-image: url(https://raw.githubusercontent.com/PogoUK/PvP/master/Images/Pokemon/" + result.pokemon.dex + ".png)'></span>"
```

**LÖSUNGSPLAN:**
- ✅ **Schaue bestehenden Code:** Wie werden Pokémon-Bilder woanders eingebunden?
- ✅ **Lösung:** Nutze `webRoot` Variable und richtige Pfade
- ✅ **Änderung:**

```javascript
// STATT externe URL:
// Nutze richtige Bild-Pfade des Systems
"<span class='poke-image' style='background-image: url(" + webRoot + "img/pokemon/" + result.pokemon.dex + ".png)'></span>"

// ODER wenn es Sprite-Container gibt:
"<div class='sprite-container' sprite='" + result.pokemon.speciesId + "'></div>"
```

---

## ZUSAMMENFASSUNG DER FIXES

| Nr | Fehler | Datei | Fix-Ansatz | Priorität |
|----|--------|-------|-----------|-----------|
| 1 | `clone()` | SynergyAnalyzer.js | Keine Kopie nutzen | 🔴 KRITISCH |
| 2 | `fastMovePool` | SynergyAnalyzer.js | OK verwenden, nur besser prüfen | 🟡 MINOR |
| 3 | `selectMove()` falsch | SynergyAnalyzer.js | Direkt Moveset nutzen | 🔴 KRITISCH |
| 4 | `getPokemonByAliasId()` | SynergyFinderInterface.js | `getPokemonById()` nutzen | 🔴 KRITISCH |
| 5 | Type-Struktur | SynergyAnalyzer.js | Einfaches Mapping-Objekt | 🟠 MAJOR |
| 6 | Modal-Klasse Mismatch | SynergyFinderInterface.js | Auf `active` standardisieren | 🟡 MINOR |
| 7 | `.poke-search-result` | SynergyFinderInterface.js | PokeSearch Callback nutzen | 🔴 KRITISCH |
| 8 | PokeSearch Init | SynergyFinderInterface.js | Prüfen ob Parameter OK | 🟠 MAJOR |
| 9 | HTML Hide/Show | SynergyFinderInterface.js | $.show()/hide() nutzen | 🟡 MINOR |
| 10 | Externe URL | SynergyFinderInterface.js | Relative Pfade nutzen | 🟡 MINOR |

