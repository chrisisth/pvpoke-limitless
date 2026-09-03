# Overview

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

## Purpose and Scope

PvPoke is an open-source battle simulation and analysis platform for Pokémon GO Player vs. Player (PvP) battles. The system provides four primary capabilities:

1. **Battle Simulation**: Turn-by-turn combat engine that simulates matchups between Pokémon
2. **Rankings**: Pre-calculated performance data across competitive leagues (Great League at 1500 CP, Ultra League at 2500 CP, Master League at 10000 CP)
3. **Team Analysis**: Tools for evaluating three-Pokémon team compositions
4. **AI Training**: Practice mode against computer-controlled opponents with strategic decision-making

This document provides a high-level overview of the system architecture. For detailed information about specific subsystems, see:

* Battle simulation mechanics: [Core Battle System](/pvpoke/pvpoke/3-core-battle-system)
* Rankings data structure: [Rankings System](/pvpoke/pvpoke/4-rankings-system)
* AI behavior: [Training System](/pvpoke/pvpoke/5-training-system)
* Data customization: [Data Management](/pvpoke/pvpoke/7-data-management)

Sources: [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 [src/index.php L1-L148](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L1-L148)

 [Diagram 1 from high-level overview](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/Diagram 1 from high-level overview)

---

## System Architecture

PvPoke follows a three-layer architecture: a **data layer** (JSON files), a **computation layer** (JavaScript battle engine), and a **presentation layer** (PHP templates + jQuery interfaces).

### Architecture Diagram

```

```

Sources: [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 [src/js/GameMaster.js L1-L600](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L600)

 [src/js/battle/Battle.js L1-L1500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L1500)

 [src/js/pokemon/Pokemon.js L1-L2000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L2000)

 [Diagram 1, Diagram 2 from high-level overview](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/Diagram 1, Diagram 2 from high-level overview)

---

## Core Components

### Data Management

| Component | File | Purpose |
| --- | --- | --- |
| **GameMaster** | `src/js/GameMaster.js` | Singleton that loads and manages all game data |
| **Pokemon Data** | `src/data/gamemaster/pokemon.json` | Base stats, types, moves for all Pokémon |
| **Move Data** | `src/data/gamemaster/moves.json` | Power, energy, effects for all moves |
| **Format Definitions** | `src/data/gamemaster/formats.json` | League rules and cup restrictions |

The `GameMaster` singleton loads `gamemaster.json` (or its minified version `gamemaster.min.json`) on page load and creates indexed maps for fast lookups:

```

```

Sources: [src/js/GameMaster.js L32-L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L32-L124)

 [src/js/GameMaster.js L188-L205](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L205)

 [src/data/gamemaster.json L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json#L1-L10)

### Battle Engine

The battle simulator consists of three primary classes:

| Class | File | Responsibility |
| --- | --- | --- |
| **Battle** | `src/js/battle/Battle.js` | Manages turn-by-turn simulation, timeline, action queue |
| **Pokemon** | `src/js/pokemon/Pokemon.js` | Handles stat calculations, CP, IVs, move selection |
| **Move** | Within Pokemon.js | Represents Fast Moves and Charged Moves with damage/energy |

```

```

Sources: [src/js/battle/Battle.js L3-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L3-L100)

 [src/js/pokemon/Pokemon.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L50)

 [Diagram 3 from high-level overview](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/Diagram 3 from high-level overview)

### User Interfaces

Each major feature has a dedicated PHP entry point and JavaScript interface controller:

| Feature | PHP Entry | JavaScript Controller | Purpose |
| --- | --- | --- | --- |
| **Battle** | `battle.php` | `Interface.js` | Single/Multi/Matrix battle simulation |
| **Rankings** | `rankings.php` | `RankingInterface.js` | Display pre-calculated rankings data |
| **Team Builder** | `team-builder.php` | `TeamInterface.js` | Team composition analysis |
| **Training** | `train/index.php` | `Interface.js` + `TrainingAI.js` | AI-powered practice battles |

All PHP templates include `header.php` which initializes settings and navigation.

Sources: [src/battle.php L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php#L1-L50)

 [src/rankings.php L1-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L86)

 [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 [src/js/interface/Interface.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L100)

 [src/js/interface/RankingInterface.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L100)

---

## Data Flow

### Initialization Sequence

```

```

The initialization flow demonstrates how the system loads game data before any user interactions:

1. **Settings Load**: `header.php` reads the `settings` cookie to configure gamemaster version, theme, and preferences [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)
2. **GameMaster Load**: `GameMaster.js` performs an AJAX request to load `gamemaster.min.json` [src/js/GameMaster.js L32-L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L32-L44)
3. **Index Creation**: Creates `pokemonMap` and `moveMap` for O(1) lookups [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)
4. **Interface Init**: Initializes the appropriate interface controller [src/js/GameMaster.js L73-L75](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L73-L75)

Sources: [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

 [src/js/GameMaster.js L32-L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L32-L124)

 [src/js/GameMaster.js L188-L205](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L205)

### Battle Simulation Flow

```

```

When a user initiates a battle:

1. **Pokemon Selection**: `PokeSelect.js` creates `Pokemon` instances from user input [src/js/interface/PokeSelect.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L100)
2. **Stat Calculation**: Each `Pokemon` calculates stats based on CP limit, IVs, and level [src/js/pokemon/Pokemon.js L400-L600](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L400-L600)
3. **Battle Loop**: `Battle.mainLoop()` processes actions every 500ms (deltaTime) [src/js/battle/Battle.js L800-L1000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L800-L1000)
4. **Timeline Recording**: Events are recorded in `timeline[]` array for replay [src/js/battle/Battle.js L1200-L1400](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1200-L1400)

Sources: [src/js/interface/PokeSelect.js L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L200)

 [src/js/pokemon/Pokemon.js L400-L600](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L400-L600)

 [src/js/battle/Battle.js L800-L1400](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L800-L1400)

---

## Feature-to-Code Mapping

### Main Features and Their Implementations

```

```

Sources: [src/battle.php L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php#L1-L100)

 [src/rankings.php L1-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L150)

 [src/js/interface/Interface.js L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L200)

 [src/js/interface/RankingInterface.js L1-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L150)

 [src/js/interface/TeamInterface.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TeamInterface.js#L1-L100)

### URL Routes to PHP Templates

| URL Pattern | PHP File | Purpose |
| --- | --- | --- |
| `/` | `index.php` | Home page with feature links |
| `/battle/` | `battle.php` | Single battle interface |
| `/battle/multi/` | `battle.php` | Multi battle (3v3) interface |
| `/battle/matrix/` | `battle.php` | Matrix battle (all vs all) |
| `/rankings/{cup}/{cp}/{category}/` | `rankings.php` | Rankings for specific format |
| `/team-builder/` | `team-builder.php` | Team composition analysis |
| `/train/` | `train/index.php` | Training mode entry |
| `/train/analysis/` | `train/analysis.php` | Training analytics dashboard |
| `/settings/` | `settings.php` | User preferences |

The routing is handled by `.htaccess` URL rewriting, with PHP templates using `$_SERVER['REQUEST_URI']` to determine context.

Sources: [src/index.php L1-L148](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L1-L148)

 [src/battle.php L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php#L1-L10)

 [src/rankings.php L1-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L86)

 [src/header.php L252-L316](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L252-L316)

---

## Technology Stack

### Frontend

* **JavaScript (ES5)**: Core battle logic, no framework dependencies
* **jQuery 3.3.1**: DOM manipulation and AJAX requests
* **SCSS/CSS**: Theming system with multiple color schemes

### Backend

* **PHP 7+**: Server-side templating and routing
* **JSON**: Data storage format for all game data
* **Browser localStorage**: Client-side storage for custom gamemasters and groups
* **Cookies**: User settings persistence

### Key Design Patterns

| Pattern | Implementation | Location |
| --- | --- | --- |
| **Singleton** | `GameMaster.getInstance()` | `src/js/GameMaster.js:3-8` |
| **Factory** | `new Pokemon(id, index, battle)` | `src/js/pokemon/Pokemon.js:7-20` |
| **Observer** | `battle.setUpdateCallback()` | `src/js/battle/Battle.js:75-77` |
| **Strategy** | AI decision methods | `src/js/training/TrainingAI.js` |

Sources: [src/js/GameMaster.js L3-L8](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L3-L8)

 [src/js/pokemon/Pokemon.js L7-L20](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L7-L20)

 [src/js/battle/Battle.js L75-L77](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L75-L77)

---

## Settings and Configuration

### Settings Management

```

```

Settings are synchronized between PHP and JavaScript:

**PHP Side** (`header.php:10-76`):

* Reads `settings` cookie
* Creates `$_SETTINGS` object with defaults
* Handles gamemaster migration
* Passes to JavaScript via inline `<script>` tag

**JavaScript Side** (`header.php:167-199`):

* Global `settings` object contains: * `gamemaster`: Which gamemaster JSON to use ("gamemaster" or custom ID) * `theme`: Color scheme ("default", "night", etc.) * `defaultIVs`: IV preference * `colorblindMode`: Accessibility flag * `performanceMode`: Optimization flag

**Available Settings**:

| Setting | Type | Purpose |
| --- | --- | --- |
| `gamemaster` | string | Active gamemaster ID |
| `theme` | string | Visual theme |
| `defaultIVs` | string | Default IV configuration |
| `animateTimeline` | boolean | Enable battle animations |
| `colorblindMode` | boolean | Colorblind-friendly colors |
| `performanceMode` | boolean | Reduce visual effects |
| `rankingDetails` | string | Rankings display mode |

Sources: [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

 [src/header.php L167-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L167-L199)

---

## Extension Points

### Custom GameMasters

Users can create custom gamemasters with modified Pokémon stats and moves:

1. **Storage**: Saved in `localStorage` with key matching gamemaster ID
2. **Format**: JSON structure matching `gamemaster.json` schema
3. **Editor**: `gm-editor/` provides UI for creating/editing
4. **Activation**: Selected via settings, referenced in `settings.gamemaster`

When a custom gamemaster is active:

* Banner displays at top of page [src/header.php L319-L323](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L319-L323)
* `GameMaster.loadCustomGameMaster()` loads from localStorage [src/js/GameMaster.js L127-L168](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L127-L168)
* All battle simulations use custom data

Sources: [src/header.php L319-L323](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L319-L323)

 [src/js/GameMaster.js L81-L123](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L81-L123)

 [src/js/GameMaster.js L127-L168](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L127-L168)

### Custom Groups

Groups define meta-specific move configurations for themed cups:

* **Location**: `src/data/groups/*.json`
* **Structure**: Arrays of Pokémon with move overrides
* **Usage**: Applied during rankings generation and team analysis
* **Examples**: `great.json`, `ultra.json`, `championshipseries.json`

Sources: [Diagram 5 from high-level overview](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/Diagram 5 from high-level overview)

---

## Performance Considerations

### Caching Strategy

```

```

The `GameMaster.getAllPokemon()` method caches `Pokemon` instances by CP to avoid repeated initialization during bulk operations like matrix battles.

**Optimization Techniques**:

* **Indexed Maps**: `pokemonMap` and `moveMap` provide O(1) lookups [src/js/GameMaster.js L190-L191](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L190-L191)
* **Pokemon Caching**: `allPokemon[cp]` caches by battle CP [src/js/GameMaster.js L209-L219](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L209-L219)
* **Minified Data**: Production uses `gamemaster.min.json` [src/js/GameMaster.js L26-L28](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L26-L28)
* **Performance Mode**: Reduces animations and visual effects [src/header.php L55-L57](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L55-L57)

Sources: [src/js/GameMaster.js L209-L225](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L209-L225)

 [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)

 [src/header.php L55-L57](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L55-L57)

---

## Summary

PvPoke is a comprehensive battle simulation platform centered around a JavaScript battle engine (`Battle.js` and `Pokemon.js`) that consumes game data from `gamemaster.json`. The system separates pre-computed rankings (stored as static JSON files) from real-time battle simulation, providing both quick reference data and detailed matchup analysis. PHP templates serve as entry points for different features, while JavaScript interface controllers manage user interactions and coordinate with the battle engine. Client-side storage enables extensive customization through custom gamemasters and groups, while the singleton `GameMaster` pattern ensures consistent data access across all features.

**Core File Reference**:

* Data: `src/data/gamemaster.json`, `src/data/rankings-*.json`
* Engine: `src/js/battle/Battle.js`, `src/js/pokemon/Pokemon.js`
* Management: `src/js/GameMaster.js`
* Interfaces: `src/js/interface/Interface.js`, `RankingInterface.js`, `TeamInterface.js`
* Templates: `src/header.php`, `src/battle.php`, `src/rankings.php`, `src/team-builder.php`

Sources: [All files referenced throughout this document](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/All files referenced throughout this document)