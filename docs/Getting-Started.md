# Getting Started

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

This page introduces the main features of PvPoke and explains how to navigate the application. It covers the primary entry points (Battle, Rankings, Team Builder, Train) and the basic configuration system that applies across all features.

For details about the battle simulation engine mechanics, see [Core Battle System](/pvpoke/pvpoke/3-core-battle-system). For information about how data is managed and stored, see [Data Management](/pvpoke/pvpoke/7-data-management). For development-focused architectural details, see [Developer Guide](/pvpoke/pvpoke/8-developer-guide).

---

## Purpose and Scope

PvPoke provides five main tools for Pokémon GO PvP analysis:

1. **Battle** - Simulate individual matchups
2. **Rankings** - View pre-calculated performance metrics
3. **Team Builder** - Analyze team compositions
4. **Train** - Practice against AI opponents
5. **Tera Raid Counter Calculator** - A separate tool for Pokémon Scarlet/Violet raids

This page focuses on the first four PvP tools. For the Tera Raid system, see [Tera Raid Counter Calculator](/pvpoke/pvpoke/6.1-tera-raid-counter-calculator).

---

## Application Entry Points

The home page [src/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php)

 serves as the central hub, presenting all features as clickable buttons. The navigation is also accessible via the fixed header on every page.

### Home Page Structure

```

```

**Sources:** [src/index.php L1-L111](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L1-L111)

 [src/header.php L235-L316](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L235-L316)

---

## Navigation Structure

The header provides persistent navigation across all pages. It initializes settings from cookies and provides dropdowns for multi-option features.

### Header Navigation System

```

```

**Sources:** [src/header.php L249-L313](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L249-L313)

---

## Settings and Configuration System

Before using any feature, the application initializes user settings from cookies. These settings persist across sessions and affect all features.

### Settings Initialization Flow

```

```

**Sources:** [src/header.php L9-L221](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L9-L221)

### Settings Table

| Setting | Type | Default | Purpose |
| --- | --- | --- | --- |
| `defaultIVs` | string | "gamemaster" | IV calculation method |
| `animateTimeline` | boolean | 1 | Enable battle timeline animations |
| `theme` | string | "default" | Visual theme (default/night) |
| `gamemaster` | string | "gamemaster" | Active data source (default or custom) |
| `pokeboxId` | integer | 0 | Pokébox integration ID |
| `colorblindMode` | boolean | 0 | Enable colorblind-friendly UI |
| `performanceMode` | boolean | 0 | Reduce visual effects for performance |
| `matrixDirection` | string | "row" | Matrix battle display orientation |
| `rankingDetails` | string | "one-page" | Rankings display mode |

**Sources:** [src/header.php L63-L75](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L63-L75)

---

## Core Features Quick Reference

Each feature follows a similar pattern: load `GameMaster` data, initialize the interface, and set up Pokémon selectors.

### Feature-to-Code Mapping

```

```

**Sources:** [src/battle.php L1-L219](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php#L1-L219)

 [src/rankings.php L1-L234](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L234)

 [src/js/interface/Interface.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L100)

 [src/js/interface/RankingInterface.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L100)

 [src/js/interface/TeamInterface.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TeamInterface.js#L1-L100)

---

## GameMaster Initialization

All features depend on `GameMaster`, a singleton that loads Pokémon and move data from JSON files.

### GameMaster Loading Sequence

```

```

**Sources:** [src/js/GameMaster.js L1-L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L124)

### GameMaster Key Methods

| Method | Purpose | Returns |
| --- | --- | --- |
| `getInstance()` | Get singleton instance | GameMaster object |
| `getPokemonById(id)` | Retrieve Pokémon data by species ID | Pokemon data object |
| `getAllPokemon(battle)` | Get all Pokémon for a CP level | Array of Pokemon objects |
| `getCupById(cupName)` | Get cup/format restrictions | Cup configuration object |
| `loadCustomGameMaster(id, callback)` | Load custom data from localStorage | Via callback |

**Sources:** [src/js/GameMaster.js L229-L252](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L229-L252)

---

## Pokemon Selection System

All features use `PokeSelect` or `PokeMultiSelect` components for Pokémon selection. These provide search, filtering, and move customization.

### PokeSelect Component Structure

```

```

**Sources:** [src/js/interface/PokeSelect.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L100)

 [src/modules/pokeselect.php L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokeselect.php#L1-L50)

### Selection Workflow

1. **Search/Select Pokémon**: User types in search box or selects from dropdown
2. **PokeSelect.update()**: Updates available moves based on species
3. **Auto-select moves**: Calls `Pokemon.selectRecommendedMoveset()` if enabled
4. **Initialize Pokemon**: Creates `Pokemon` object with selected species and moves
5. **Display stats**: Shows CP, HP, Attack, Defense based on IVs
6. **Battle ready**: Pokémon object is ready for simulation

**Sources:** [src/js/interface/PokeSelect.js L200-L500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L200-L500)

---

## Format and Cup Selection

Most features allow selection of different competitive formats (Great League, Ultra League, etc.) via dropdowns.

### Format Selection Components

```

```

**Sources:** [src/modules/formatselect.php L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/formatselect.php#L1-L50)

 [src/modules/cupselect.php L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/cupselect.php#L1-L10)

 [src/data/gamemaster/formats.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/formats.json#L1-L100)

### Format Configuration Object

Formats are defined in [src/data/gamemaster/formats.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/formats.json)

 and include:

```

```

**Sources:** [src/data/gamemaster/formats.json L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/formats.json#L1-L200)

---

## Common UI Patterns

All features share common UI components and patterns:

### Shared UI Components

| Component | Class/ID | Purpose | Used In |
| --- | --- | --- | --- |
| Format select | `.format-select` | Choose league/format | Battle, Rankings, Team Builder |
| Cup select | `.cup-select` | Choose cup restrictions | Battle, Multi Battle, Team Builder |
| Poke select | `.poke` | Select individual Pokémon | Battle, Rankings detail |
| Poke multi select | `.poke.multi` | Select Pokémon groups | Multi Battle, Team Builder, Train |
| Category select | `.category-select` | Choose ranking category | Rankings |
| Battle button | `.battle-btn` | Start simulation | Battle, Multi Battle |
| Modal window | `.modal` | Display detailed information | All features |

**Sources:** [src/css/style.scss L630-L1000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.scss#L630-L1000)

 [src/js/interface/ModalWindow.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ModalWindow.js#L1-L100)

---

## Getting Help and Additional Resources

### In-App Resources

* **Settings Page** (`/settings/`) - Configure theme, gamemaster, and performance options
* **Contact Page** (`/contact/`) - Report issues or provide feedback
* **Articles** (`/articles/`) - Strategy guides and Community Day checklists

### Custom Data Tools

* **GameMaster Editor** (`/gm-editor/`) - Create custom Pokémon and moves (see [GameMaster Editor](/pvpoke/pvpoke/6.3-gamemaster-editor))
* **Custom Rankings** (`/custom-rankings/`) - Generate rankings for custom Pokémon groups

**Sources:** [src/header.php L298-L302](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L298-L302)

 [src/index.php L50-L58](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php#L50-L58)

---

## Next Steps

After familiarizing yourself with the navigation and basic features:

1. **For Battle Mechanics** - See [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine) for details on how battles are calculated
2. **For Rankings** - See [Rankings System](/pvpoke/pvpoke/4-rankings-system) for information about pre-calculated data
3. **For Team Building** - See [Team Builder](/pvpoke/pvpoke/5-training-system) for coverage analysis details
4. **For AI Training** - See [Training System](/pvpoke/pvpoke/5-training-system) for AI opponent mechanics
5. **For Customization** - See [Data Management](/pvpoke/pvpoke/7-data-management) for custom gamemasters and groups

**Sources:** [README or documentation structure](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/README or documentation structure)