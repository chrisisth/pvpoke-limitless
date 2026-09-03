# Application Architecture

> **Relevant source files**
> * [src/battle.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php)
> * [src/css/style.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css)
> * [src/css/style.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css.map)
> * [src/css/style.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.scss)
> * [src/css/themes/night.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css)
> * [src/css/themes/night.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css.map)
> * [src/css/themes/night.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss)
> * [src/data/formats.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/formats.php)
> * [src/data/gamemaster.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json)
> * [src/data/gamemaster.min.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.min.json)
> * [src/data/gamemaster/formats.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/formats.json)
> * [src/data/gamemaster/moves.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json)
> * [src/data/gamemaster/pokemon.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json)
> * [src/footer.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php)
> * [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)
> * [src/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php)
> * [src/js/GameMaster.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js)
> * [src/js/battle/Battle.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js)
> * [src/js/interface/Interface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js)
> * [src/js/interface/PokeMultiSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeMultiSelect.js)
> * [src/js/interface/PokeSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js)
> * [src/js/interface/RankingInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js)
> * [src/js/interface/Settings.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js)
> * [src/js/interface/TeamInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TeamInterface.js)
> * [src/js/pokemon/Pokemon.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js)
> * [src/modules/cupselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/cupselect.php)
> * [src/modules/formatselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/formatselect.php)
> * [src/modules/pokemultiselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokemultiselect.php)
> * [src/modules/pokeselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokeselect.php)
> * [src/rankings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php)
> * [src/rss/feed.xml](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rss/feed.xml)
> * [src/settings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php)
> * [src/team-builder.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/team-builder.php)

## Purpose and Scope

This document describes the overall application architecture of PvPoke, including the PHP template layer, JavaScript interface layer, data loading pipeline, singleton patterns, and module organization. It explains how different components work together to deliver the battle simulation and ranking features.

For details about the battle simulation engine specifically, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine). For data flow and state management patterns, see [Data Flow and State Management](/pvpoke/pvpoke/8.2-data-flow-and-state-management). For client-side storage mechanisms, see [Client-Side Storage](/pvpoke/pvpoke/8.3-client-side-storage).

---

## Architecture Overview

PvPoke follows a **two-tier architecture** with a thin PHP template layer serving static HTML and a thick JavaScript application layer handling all business logic and user interactions. There is no traditional backend application server—all computation happens client-side after data files are loaded.

```

```

**Sources:** [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 [src/index.php L1-L141](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L1-L141)

 [src/js/GameMaster.js L1-L550](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L550)

 [src/js/interface/Interface.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L50)

---

## PHP Template Layer

The PHP layer is **stateless** and serves primarily to:

1. Initialize user settings from cookies
2. Render page-specific HTML templates
3. Include JavaScript modules based on page context
4. Set SEO metadata (titles, descriptions, canonical URLs)

### Header Initialization

The `header.php` file is included by every page and performs critical initialization:

```

```

**Key functions in header.php:**

| Lines | Purpose |
| --- | --- |
| [src/header.php L1-L8](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L8) | Load config, set `$SITE_VERSION` for cache busting |
| [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76) | Parse settings cookie into `$_SETTINGS` object with defaults |
| [src/header.php L78-L84](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L78-L84) | Group migration flag for localStorage updates |
| [src/header.php L87-L219](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L87-L219) | HTML head: meta tags, CSS includes, JavaScript globals |
| [src/header.php L167-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L167-L199) | Convert PHP `$_SETTINGS` to JavaScript `settings` object |
| [src/header.php L201-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L201-L214) | Convert PHP `$_GET` to JavaScript `get` object |
| [src/header.php L235-L316](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L235-L316) | Navigation menu with dynamic format links |

**Settings object structure:**

```yaml
settings = {
    defaultIVs: "gamemaster",
    animateTimeline: 1,
    matrixDirection: "row",
    gamemaster: "gamemaster",  // Can be custom ID
    pokeboxId: 0,
    pokeboxLastDateTime: 0,
    xls: true,
    rankingDetails: "one-page",
    hardMovesetLinks: 0,
    colorblindMode: 0,
    performanceMode: 0,
    theme: "default"
}
```

**Sources:** [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 [src/modules/config.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/config.php)

### Page Templates

Each major feature has a dedicated PHP template that includes appropriate JavaScript modules:

| Template | Purpose | Key Modules |
| --- | --- | --- |
| `index.php` | Home page with navigation buttons | RSSReader, HomeInterface |
| `battle.php` | Battle simulator interface | Battle, Pokemon, Interface, PokeSelect |
| `rankings.php` | Rankings display | RankingInterface, RankingDetails |
| `team-builder.php` | Team builder | TeamInterface, TeamRanker |
| `train/index.php` | Training mode | TrainingBattle, TrainingInterface, TrainingAI |

**Conditional script loading pattern:**

[src/index.php L107-L140](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L107-L140)

 demonstrates the pattern for including JavaScript modules only when needed. The localhost check loads individual files for debugging while production uses minified bundles.

**Sources:** [src/index.php L1-L141](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L1-L141)

 [src/battle.php L1-L300](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php#L1-L300)

 [src/rankings.php L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L200)

---

## JavaScript Application Layer

The JavaScript layer implements the **Interface-Controller pattern** with singleton data management. All interfaces follow a consistent instantiation and initialization pattern.

### Singleton Pattern: GameMaster

The `GameMaster` is the central singleton that manages all game data:

```

```

**Key responsibilities:**

| Method | Purpose |
| --- | --- |
| `getInstance()` | Returns singleton instance, creates if needed |
| `getPokemonById(id)` | Fast lookup via `pokemonMap` |
| `getAllPokemon(battle)` | Returns cached Pokemon array for CP level |
| `loadCustomGameMaster(id, callback)` | Load from localStorage or default |
| `saveCustomGameMaster(data)` | Persist to localStorage |
| `createSearchMaps()` | Build Map objects for O(1) lookups |
| `flushAllPokemonCache()` | Clear cache when data changes |

**Initialization sequence:**

[src/js/GameMaster.js L32-L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L32-L124)

 loads `gamemaster.json` via AJAX on page load. If `settings.gamemaster !== "gamemaster"`, it loads a custom gamemaster from localStorage instead [src/js/GameMaster.js L81-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L81-L122)

**Sources:** [src/js/GameMaster.js L1-L550](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L550)

### Singleton Pattern: InterfaceMaster

Each page type has its own `InterfaceMaster` implementation that follows the singleton pattern:

```

```

**Common pattern in all interfaces:**

```

```

**Sources:** [src/js/interface/Interface.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L50)

 [src/js/interface/RankingInterface.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L50)

 [src/js/interface/TeamInterface.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TeamInterface.js#L1-L50)

### jQuery-Based UI Controllers

All user interactions are handled through **jQuery event handlers** attached in interface initialization. There is no modern framework like React or Vue—the application uses direct DOM manipulation.

**Common UI patterns:**

| Pattern | Implementation | Example |
| --- | --- | --- |
| Select change | `$(".selector").change(function(){...})` | Format/cup selection |
| Button click | `$(".button").click(function(){...})` | Run battle, update rankings |
| Dynamic lists | `$container.append($item)` | Rankings, battle results |
| Modals | `ModalWindow` class | Pokemon details, custom groups |

**Example from Interface.js:**

[src/js/interface/Interface.js L100-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L100-L200)

 shows the pattern for attaching event handlers to Pokemon selectors, battle buttons, and option toggles.

**Sources:** [src/js/interface/Interface.js L1-L3000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L3000)

 [src/js/interface/PokeSelect.js L1-L1500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L1500)

---

## Data Loading and Initialization

Data flows through a **load-then-initialize** pipeline where static JSON files are fetched first, then interfaces are initialized with the loaded data.

```

```

**Loading minified vs full data:**

[src/js/GameMaster.js L24-L28](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L24-L28)

 determines whether to load `gamemaster.min.json` (production) or `gamemaster.json` (localhost). The minified version is used in production for faster loading.

**Custom gamemaster loading:**

[src/js/GameMaster.js L127-L168](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L127-L168)

 implements loading custom gamemasters from localStorage. This allows users to test custom Pokemon or move modifications without affecting the default data.

**Sources:** [src/js/GameMaster.js L1-L250](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L250)

 [src/header.php L155-L215](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L155-L215)

### URL State Management

Pages read initial state from URL parameters converted to JavaScript by PHP:

[src/header.php L201-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L201-L214)

 converts `$_GET` into a JavaScript `get` object. Interfaces then parse this to restore state:

**Example from rankings:**

[src/rankings.php L4-L14](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L4-L14)

 reads `cp` and `cup` from URL, then [src/js/interface/RankingInterface.js L200-L300](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L200-L300)

 uses these values to load the appropriate ranking data.

**Sources:** [src/header.php L201-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L201-L214)

 [src/rankings.php L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L200)

 [src/js/interface/RankingInterface.js L1-L2000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L2000)

---

## Module Organization

The JavaScript codebase is organized into logical modules by responsibility:

```

```

**Directory structure:**

| Path | Purpose |
| --- | --- |
| `js/GameMaster.js` | Central data management singleton |
| `js/battle/` | Battle simulation engine and related systems |
| `js/pokemon/` | Pokemon class and move processing |
| `js/interface/` | UI controllers and components |
| `js/training/` | Training mode AI and battle systems |
| `js/tera/` | Tera Raid calculator (separate subsystem) |

**Sources:** [src/js/](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/)

### PHP Module Organization

PHP modules are reusable UI components included by page templates:

| Module | Purpose | Used By |
| --- | --- | --- |
| `modules/config.php` | Define `$WEB_ROOT`, `$WEB_HOST` | All pages via header |
| `modules/formatselect.php` | Format dropdown | Rankings, battle, team builder |
| `modules/cupselect.php` | Cup dropdown | Battle, team builder |
| `modules/pokemultiselect.php` | Pokemon group picker | Rankings, team builder |
| `modules/ads/` | Ad placement templates | Various pages |

**Sources:** [src/modules/](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/)

---

## Component Communication Pattern

Components communicate through **direct method calls** and **shared state** rather than events or message passing:

```

```

**Key patterns:**

1. **Interfaces own Battles**: Each interface creates and manages its own `Battle` instances [src/js/interface/Interface.js L50-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L50-L100)
2. **Direct Pokemon construction**: Interfaces create `Pokemon` objects by passing species IDs to the constructor [src/js/pokemon/Pokemon.js L7-L20](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L7-L20)
3. **Callback for updates**: Battle simulation can use callbacks to update UI during long-running operations [src/js/battle/Battle.js L75-L77](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L75-L77)
4. **Shared GameMaster**: All components access the same `GameMaster` singleton for data consistency

**Sources:** [src/js/interface/Interface.js L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L200)

 [src/js/battle/Battle.js L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L200)

 [src/js/pokemon/Pokemon.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L100)

---

## Styling Architecture

The application uses **SCSS compiled to CSS** with a theme system:

```

```

**Theme loading:**

[src/header.php L151-L153](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L151-L153)

 conditionally includes theme CSS based on user settings:

```

```

**SCSS variable system:**

[src/css/style.scss L1-L74](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.scss#L1-L74)

 defines color variables and mixins used throughout. The compiled CSS is served with cache-busting version numbers [src/header.php L141](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L141-L141)

**Sources:** [src/css/style.scss L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.scss#L1-L100)

 [src/header.php L141-L153](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L141-L153)

 [src/css/themes/](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/)

---

## Key Architectural Decisions

| Decision | Rationale | Trade-offs |
| --- | --- | --- |
| **Client-side computation** | No server costs, instant simulations, works offline | Initial load time, limited by browser performance |
| **Singleton pattern** | Single source of truth for data, easy access | Global state, potential memory leaks |
| **jQuery over framework** | Lightweight, mature, no build step | More verbose, harder to maintain complex UIs |
| **Static JSON files** | Cacheable, no database needed, version controlled | Large file sizes, no dynamic queries |
| **localStorage for customs** | Persistent user data, no backend | Limited storage, no sync across devices |
| **PHP templates only** | Simple deployment, no server-side logic | Limited dynamic content, SEO challenges |

**Sources:** [src/js/GameMaster.js L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L10)

 [src/header.php L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L100)

 [src/js/interface/Interface.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L50)

---

## Summary

PvPoke's architecture is characterized by:

1. **Two-tier design**: PHP templates serve HTML, JavaScript handles all logic
2. **Singleton data management**: `GameMaster` provides centralized data access
3. **Interface-controller pattern**: Each page type has its own `InterfaceMaster`
4. **Direct DOM manipulation**: jQuery-based UI updates without a framework
5. **Static file serving**: All data loaded from pre-generated JSON files
6. **Client-side persistence**: Settings in cookies, custom data in localStorage

This architecture enables zero server costs and instant battle simulations while maintaining flexibility for user customization through the gamemaster editor and custom groups system.