# Developer Guide

> **Relevant source files**
> * [src/battle.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php)
> * [src/css/style.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css)
> * [src/css/style.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css.map)
> * [src/css/style.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.scss)
> * [src/data/formats.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/formats.php)
> * [src/data/gamemaster.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json)
> * [src/data/gamemaster.min.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.min.json)
> * [src/data/gamemaster/formats.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/formats.json)
> * [src/data/gamemaster/moves.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json)
> * [src/data/gamemaster/pokemon.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json)
> * [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)
> * [src/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php)
> * [src/js/GameMaster.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js)
> * [src/js/battle/Battle.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js)
> * [src/js/interface/Interface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js)
> * [src/js/interface/PokeMultiSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeMultiSelect.js)
> * [src/js/interface/PokeSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js)
> * [src/js/interface/RankingInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js)
> * [src/js/interface/TeamInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TeamInterface.js)
> * [src/js/pokemon/Pokemon.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js)
> * [src/modules/cupselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/cupselect.php)
> * [src/modules/formatselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/formatselect.php)
> * [src/modules/pokemultiselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokemultiselect.php)
> * [src/modules/pokeselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokeselect.php)
> * [src/rankings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php)
> * [src/rss/feed.xml](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rss/feed.xml)
> * [src/team-builder.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/team-builder.php)

This guide provides technical documentation for developers who want to understand, modify, or extend the PvPoke codebase. It covers the application architecture, key design patterns, data flow, and development workflows.

For detailed information on specific topics:

* Application architecture patterns: see [Application Architecture](/pvpoke/pvpoke/8.1-application-architecture)
* Data flow and state management: see [Data Flow and State Management](/pvpoke/pvpoke/8.2-data-flow-and-state-management)
* Client-side storage implementation: see [Client-Side Storage](/pvpoke/pvpoke/8.3-client-side-storage)
* Adding new game data: see [Adding Custom Pokemon and Moves](/pvpoke/pvpoke/8.4-adding-custom-pokemon-and-moves)

---

## Technology Stack

PvPoke is built as a **client-side JavaScript application** with PHP templating for server-side rendering. There is no traditional backend API or database for core functionality.

**Core Technologies:**

* **PHP 7+**: Server-side templating, page rendering, settings cookies
* **JavaScript (ES5-era)**: All application logic, battle simulation, UI interactions
* **jQuery 3.3.1**: DOM manipulation and event handling
* **SCSS/CSS**: Styling with theme support
* **JSON**: Data storage format for game data and rankings

**Data Storage:**

* **Static JSON files**: Game master data, rankings, groups, overrides
* **localStorage**: Custom gamemasters, custom groups, user preferences
* **Cookies**: Settings synchronization across pages
* **No database**: All data is file-based or client-side

**Build Tools:**

* SCSS compilation to CSS
* JSON minification for gamemaster data
* No complex build pipeline or bundling

Sources: [src/header.php L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L10)

 [src/index.php L107-L128](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L107-L128)

 [src/js/GameMaster.js L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L10)

---

## Codebase Structure

```

```

**Key Directories:**

| Directory | Purpose | Key Files |
| --- | --- | --- |
| `src/` | PHP page templates | `index.php`, `battle.php`, `rankings.php`, `header.php` |
| `src/modules/` | Reusable PHP components | `formatselect.php`, `cupselect.php`, `pokemultiselect.php` |
| `src/js/` | JavaScript application code | `GameMaster.js` |
| `src/js/battle/` | Battle simulation engine | `Battle.js`, `Pokemon.js` |
| `src/js/interface/` | UI controllers | `Interface.js`, `RankingInterface.js`, `PokeSelect.js` |
| `src/data/` | Static JSON data files | `gamemaster.json`, `rankings-*.json` |
| `src/data/groups/` | Meta group definitions | `great.json`, `ultra.json`, `master.json` |
| `src/data/overrides/` | Editorial overrides | `moves.json`, `rankings.json` |
| `src/css/` | Compiled stylesheets | `style.css`, `themes/*.css` |

Sources: [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 [src/index.php L1-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L1-L150)

 [src/js/GameMaster.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L50)

---

## Request Flow and Page Architecture

```

```

**Page Load Sequence:**

1. **PHP Initialization** [src/header.php L1-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L86) * Parse settings cookie * Set default values for missing settings * Output global JavaScript variables (`settings`, `get`, `webRoot`)
2. **HTML Template Rendering** [src/rankings.php L84-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L84-L150) * Generate page-specific HTML structure * Include reusable modules * Embed inline JavaScript for page context
3. **JavaScript Bootstrap** [src/header.php L155-L215](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L155-L215) * jQuery library loads first * GameMaster singleton initializes * AJAX request loads `gamemaster.json` or custom gamemaster
4. **Interface Initialization** [src/js/GameMaster.js L67-L79](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L67-L79) * GameMaster calls `InterfaceMaster.getInstance().init()` * Interface parses URL parameters from `get` object * UI components bind to DOM elements
5. **Data Loading** [src/js/interface/RankingInterface.js L50-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L50-L150) * Interface loads additional data (rankings, groups, overrides) * Data populates UI elements * User interactions become active

Sources: [src/header.php L1-L215](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L215)

 [src/rankings.php L84-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L84-L150)

 [src/js/GameMaster.js L30-L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L30-L124)

---

## Core JavaScript Architecture

```

```

**Key Classes and Patterns:**

**GameMaster (Singleton)** [src/js/GameMaster.js L3-L5](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L3-L5)

* **Pattern**: Module pattern with singleton instance
* **Initialization**: `GameMaster.getInstance()` creates or returns existing instance
* **Purpose**: Centralized access to game data
* **Key Properties**: * `data`: Full gamemaster JSON object * `pokemonMap`: Map for O(1) Pokemon lookup by ID * `moveMap`: Map for O(1) move lookup by ID * `allPokemon`: Cache of Pokemon instances by CP
* **Key Methods**: * `getPokemonById(id)`: Returns Pokemon data object * `loadCustomGameMaster(id, callback)`: Loads custom data from localStorage * `createSearchMaps()`: Builds indexed maps for fast lookup

**Battle** [src/js/battle/Battle.js L3-L4](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L3-L4)

* **Pattern**: Class instance (not singleton)
* **Purpose**: Manages battle simulation state and execution
* **Key Properties**: * `pokemon`: Array of two Pokemon instances * `players`: Array of Player instances (for emulated battles) * `timeline`: Array of turn-by-turn events * `actions`: Queue of user-defined actions * `cp`: CP limit for the battle * `cup`: Cup/format configuration
* **Key Methods**: * `simulate()`: Runs automated battle simulation * `step()`: Advances battle by one turn * `doAction(action)`: Executes a specific action

**Pokemon** [src/js/pokemon/Pokemon.js L7-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L7-L10)

* **Pattern**: Class instance
* **Purpose**: Represents individual Pokemon with stats, moves, and battle state
* **Key Properties**: * `stats`: Current battle stats (atk, def, hp) * `ivs`: Individual values * `fastMove`, `chargedMoves`: Selected moves * `energy`, `hp`, `shields`: Current battle state
* **Key Methods**: * `initialize(cp)`: Calculate stats for given CP limit * `selectMove()`: AI decision-making for move selection * `calculateCP()`: Compute CP from level and IVs

**InterfaceMaster (Singleton)** [src/js/interface/Interface.js L3-L9](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L3-L9)

* **Pattern**: Module pattern with singleton instance
* **Purpose**: Coordinates UI interactions and battle execution
* **Key Properties**: * `pokeSelectors`: Array of PokeSelect instances * `battle`: Reference to Battle instance * `context`: Current page context ("battle", "rankings", etc.)
* **Key Methods**: * `init(gm)`: Initialize interface with GameMaster reference * `update()`: Refresh UI based on current state * `generateURLs()`: Create shareable URLs from current state

Sources: [src/js/GameMaster.js L3-L227](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L3-L227)

 [src/js/battle/Battle.js L3-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L3-L50)

 [src/js/pokemon/Pokemon.js L7-L30](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L7-L30)

 [src/js/interface/Interface.js L3-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L3-L50)

---

## Settings and Configuration System

```

```

**Settings Flow:**

1. **Cookie to PHP** [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76) * Read `$_COOKIE['settings']` JSON string * Decode into `$_SETTINGS` object * Fill missing properties with defaults * Handle deprecated values (e.g., old gamemaster versions)
2. **PHP to JavaScript** [src/header.php L167-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L167-L199) * Output inline `<script>` block * Create global `settings` object * Copy all properties from PHP to JS
3. **JavaScript Usage** [src/js/GameMaster.js L23-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L23-L122) * Check `settings.gamemaster` to determine which data to load * If "gamemaster": Load default minified JSON * If custom ID: Load from `localStorage.getItem(id)`

**Key Settings:**

| Property | Type | Purpose | Default |
| --- | --- | --- | --- |
| `theme` | string | UI theme | `"default"` |
| `gamemaster` | string | Active gamemaster ID | `"gamemaster"` |
| `defaultIVs` | string | Default IV source | `"gamemaster"` |
| `animateTimeline` | boolean | Timeline animations | `1` |
| `colorblindMode` | boolean | Colorblind-friendly UI | `0` |
| `performanceMode` | boolean | Reduced animations | `0` |
| `matrixDirection` | string | Matrix table orientation | `"row"` |
| `rankingDetails` | string | Rankings detail view | `"one-page"` |

**Custom Gamemaster Loading:**

When `settings.gamemaster != "gamemaster"`, the GameMaster loads custom data from localStorage:

```

```

Sources: [src/header.php L10-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L199)

 [src/js/GameMaster.js L23-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L23-L122)

---

## URL Parameter Handling

All interactive pages use URL parameters to preserve and share state. Parameters are parsed server-side and exposed to JavaScript.

**PHP URL Parsing** [src/header.php L201-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L201-L214)

```

```

**JavaScript URL Generation** [src/js/interface/Interface.js L2500-L2600](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L2500-L2600)

The interface generates shareable URLs by constructing query strings from current battle state:

```

```

**Common Parameters:**

| Parameter | Example | Purpose |
| --- | --- | --- |
| `p` | `azumarill-40-15-15-15-4-4-1-0` | Pokemon ID with stats |
| `s` | `BUBBLE-1-ICE_BEAM-PLAY_ROUGH` | Moveset configuration |
| `shield` | `1` or `0` | Shield count (0-2) |
| `cup` | `all`, `amor`, etc. | Format/cup selection |
| `cp` | `1500`, `2500`, `10000` | CP limit |

**Pokemon URL Encoding:**

Pokemon are encoded as: `speciesId-level-atkIV-defIV-hpIV-fastMove-chargedMove1-chargedMove2-shadow`

Example: `azumarill-40-15-15-15-4-4-1-0`

* Species: azumarill
* Level: 40
* IVs: 15/15/15
* Fast move index: 4
* Charged move indices: 4, 1
* Shadow: 0 (not shadow)

Sources: [src/header.php L201-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L201-L214)

 [src/js/interface/Interface.js L2450-L2650](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L2450-L2650)

---

## Development Workflow

**Local Development Setup:**

1. **PHP Server**: Use built-in PHP server or Apache/nginx ``` ```
2. **Access Site**: Navigate to `http://localhost:8000/`
3. **Random Versioning**: When `$WEB_ROOT` contains "src", site version randomizes [src/header.php L4-L7](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L4-L7) ``` ``` This prevents caching during development.

**Data Loading Modes:**

* **Default Gamemaster**: Loads minified `gamemaster.min.json` [src/js/GameMaster.js L26-L28](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L26-L28)
* **Custom Gamemaster**: Loads from localStorage when `settings.gamemaster` is set to custom ID
* **Localhost Exception**: On localhost, loads full `gamemaster.json` instead of minified version

**Testing Custom Data:**

1. Navigate to `/gm-editor/`
2. Create or modify custom gamemaster
3. Changes save to localStorage
4. Test in battle/rankings with custom data active

**Common Files to Modify:**

| Task | Files |
| --- | --- |
| Add new Pokemon | `data/gamemaster/pokemon.json` |
| Add new moves | `data/gamemaster/moves.json` |
| Modify battle logic | `js/battle/Battle.js` |
| Modify Pokemon stats | `js/pokemon/Pokemon.js` |
| Change UI behavior | `js/interface/Interface.js` |
| Add new page | Create `*.php` in `src/` |
| Modify styling | `css/style.scss` → compile to `style.css` |

**Debugging Tools:**

* **Browser Console**: All major operations log to console
* **Debug Mode**: Set `debugMode = true` in Battle.js for detailed logging [src/js/battle/Battle.js L68](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L68-L68)
* **Timeline**: Battle timeline provides turn-by-turn analysis
* **URL State**: All battle state preserved in URL for reproduction

Sources: [src/header.php L4-L7](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L4-L7)

 [src/js/GameMaster.js L26-L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L26-L124)

 [src/js/battle/Battle.js L68](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L68-L68)

---

## Key Development Patterns

**Singleton Pattern (GameMaster, InterfaceMaster):**

```

```

Benefits:

* Single source of truth for game data
* Shared state across all components
* Lazy initialization

**Search Map Optimization** [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)

Instead of array searches, GameMaster uses Maps for O(1) lookups:

```

```

**Pokemon Instance Caching** [src/js/GameMaster.js L209-L219](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L209-L219)

To avoid recreating Pokemon objects, GameMaster caches by CP:

```

```

**Event-Driven UI Updates:**

Interface components use jQuery event delegation and callbacks:

```

```

**Modular PHP Components:**

Reusable components are included where needed:

```

```

Sources: [src/js/GameMaster.js L3-L227](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L3-L227)

 [src/js/interface/PokeSelect.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L100)

---

## Common Development Tasks

**Adding a New Battle Mode:**

1. Add mode option to `Battle.setMode()` method
2. Implement mode-specific logic in `Battle.simulate()` or `Battle.step()`
3. Update Interface.js to handle new mode
4. Add UI controls in relevant PHP template

**Creating a New Page:**

1. Create `newpage.php` in `src/`
2. Include `header.php` and set meta variables
3. Add page-specific HTML and controls
4. Include relevant JavaScript modules in footer
5. Create interface controller if needed (e.g., `NewPageInterface.js`)
6. Add navigation link in `header.php` menu

**Modifying Battle Calculations:**

1. Locate calculation in `Battle.js` or `Pokemon.js`
2. Modify algorithm (e.g., damage formula, energy generation)
3. Test across multiple scenarios
4. Clear cached Pokemon if stats change: `GameMaster.flushAllPokemonCache()`

**Adding Custom Data Support:**

1. Define data structure in localStorage
2. Update GameMaster to load/save custom data
3. Add editor UI (see `gm-editor/` for reference)
4. Handle validation and error cases

For detailed guides on specific tasks, see:

* [Application Architecture](/pvpoke/pvpoke/8.1-application-architecture) for system design patterns
* [Data Flow and State Management](/pvpoke/pvpoke/8.2-data-flow-and-state-management) for data pipeline
* [Client-Side Storage](/pvpoke/pvpoke/8.3-client-side-storage) for localStorage implementation
* [Adding Custom Pokemon and Moves](/pvpoke/pvpoke/8.4-adding-custom-pokemon-and-moves) for game data modifications

Sources: [src/js/battle/Battle.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L100)

 [src/js/GameMaster.js L170-L227](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L170-L227)

 [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)