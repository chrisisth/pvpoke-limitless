# Data Flow and State Management

> **Relevant source files**
> * [src/battle.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php)
> * [src/css/style.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css)
> * [src/css/style.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css.map)
> * [src/css/style.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.scss)
> * [src/css/train.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.css)
> * [src/css/train.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.css.map)
> * [src/css/train.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.scss)
> * [src/data/formats.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/formats.php)
> * [src/data/gamemaster.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json)
> * [src/data/gamemaster.min.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.min.json)
> * [src/data/gamemaster/formats.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/formats.json)
> * [src/data/gamemaster/moves.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json)
> * [src/data/gamemaster/pokemon.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json)
> * [src/data/training/aiArchetypes.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json)
> * [src/data/training/teams/jungle/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/jungle/1500.json)
> * [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)
> * [src/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php)
> * [src/js/GameMaster.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js)
> * [src/js/battle/Battle.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js)
> * [src/js/interface/Interface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js)
> * [src/js/interface/PokeMultiSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeMultiSelect.js)
> * [src/js/interface/PokeSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js)
> * [src/js/interface/RankingInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js)
> * [src/js/interface/TeamInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TeamInterface.js)
> * [src/js/pokemon/Player.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Player.js)
> * [src/js/pokemon/Pokemon.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js)
> * [src/js/training/BattleInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js)
> * [src/js/training/MatchHandler.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js)
> * [src/js/training/TrainingAI.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js)
> * [src/js/training/TrainingEditor.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingEditor.js)
> * [src/js/training/TrainingSetupInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js)
> * [src/modules/cupselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/cupselect.php)
> * [src/modules/formatselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/formatselect.php)
> * [src/modules/pokemultiselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokemultiselect.php)
> * [src/modules/pokeselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokeselect.php)
> * [src/rankings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php)
> * [src/rss/feed.xml](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rss/feed.xml)
> * [src/team-builder.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/team-builder.php)
> * [src/train/editor.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/editor.php)
> * [src/train/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php)

## Purpose and Scope

This document describes how data flows through PvPoke from initialization through battle simulation to UI display, and how application state is managed across different persistence layers. It covers the request/response cycle, URL-based state restoration, client-side storage patterns, and the battle simulation data pipeline.

For information about the specific data structures and file formats, see [Data Management](/pvpoke/pvpoke/7-data-management). For details on the battle simulation engine mechanics, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine). For client-side storage implementation details, see [Client-Side Storage](/pvpoke/pvpoke/8.3-client-side-storage).

---

## Initial Page Load and Data Initialization

When a user visits any PvPoke page, a multi-stage initialization process loads and prepares data for the application.

### Server-Side Initialization

The PHP layer in [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 performs initial state setup:

1. **Cookie-based Settings Loading**: Settings are read from the `settings` cookie and deserialized into a PHP object `$_SETTINGS` [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)
2. **Default Value Population**: Missing settings are filled with defaults (e.g., `matrixDirection`, `gamemaster`, `pokeboxId`) [src/header.php L14-L75](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L14-L75)
3. **Legacy Migration**: Deprecated gamemaster versions are migrated to current versions [src/header.php L18-L25](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L18-L25)
4. **Global Variable Output**: Settings are serialized to JavaScript as a global `settings` object [src/header.php L167-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L167-L199)
5. **GET Parameter Exposure**: URL parameters are sanitized and output as a global `get` object [src/header.php L203-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L203-L214)

```

```

**Sources**: [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

### Client-Side GameMaster Loading

After the page loads, [src/js/GameMaster.js L1-L657](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L657)

 initializes the singleton data layer:

1. **AJAX Request**: Loads `gamemaster.json` (or `gamemaster.min.json` for production) via jQuery AJAX [src/js/GameMaster.js L32-L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L32-L44)
2. **Data Storage**: Stores the complete data object in `object.data` [src/js/GameMaster.js L41](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L41-L41)
3. **Search Map Creation**: Creates indexed Maps for fast Pokemon and move lookups [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)
4. **Select List Generation**: Builds a searchable Pokemon list with nicknames and priorities [src/js/GameMaster.js L195-L205](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L195-L205)
5. **Format Population**: Injects cup and format options into dropdowns [src/js/GameMaster.js L47-L52](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L47-L52)
6. **Interface Initialization**: Triggers interface initialization once data is ready [src/js/GameMaster.js L73-L79](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L73-L79)

```

```

**Sources**: [src/js/GameMaster.js L3-L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L3-L124)

 [src/js/GameMaster.js L188-L205](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L205)

### Custom GameMaster Override

When a custom gamemaster is active (`settings.gamemaster != "gamemaster"`), the loading process diverges:

1. **localStorage Retrieval**: Fetches custom data from localStorage by key [src/js/GameMaster.js L82](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L82-L82)
2. **JSON Parsing**: Deserializes the stored custom gamemaster [src/js/GameMaster.js L85](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L85-L85)
3. **Data Replacement**: Overwrites default Pokemon and moves arrays [src/js/GameMaster.js L87-L105](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L87-L105)
4. **Map Regeneration**: Recreates search maps with custom data [src/js/GameMaster.js L108-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L108-L109)

**Sources**: [src/js/GameMaster.js L80-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L80-L122)

---

## URL-Based State Management

PvPoke uses URL parameters extensively to encode and restore application state, enabling shareable links and browser history navigation.

### URL Parameter Flow

#### PHP-to-JavaScript Bridge

URL parameters are captured on the server side and exposed to JavaScript:

```

```

[src/header.php L203-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L203-L214)

 sanitizes GET parameters and outputs them as JSON:

```

```

**Sources**: [src/header.php L203-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L203-L214)

### State Restoration from URL

Different interfaces parse URL parameters to restore state:

#### Battle Interface URL Schema

The battle interface in [src/js/interface/Interface.js L33-L182](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L33-L182)

 decodes parameters:

| Parameter | Purpose | Example |
| --- | --- | --- |
| `p1`, `p2` | Pokemon species IDs | `p1=azumarill` |
| `s1`, `s2` | Moveset (format: `fm-cm1-cm2`) | `s1=2-AQUA_TAIL-ICE_BEAM` |
| `a1`, `a2` | Custom actions | `a1=1-2-WAIT` |
| `shield1`, `shield2` | Shield configuration | `shield1=0` |
| `cp` | CP limit | `cp=1500` |
| `m` | Battle mode | `m=0` (single) or `m=1` (matrix) |

[src/js/interface/Interface.js L162-L182](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L162-L182)

 parses these parameters and calls appropriate selector methods like `selector.selectPokemon(speciesId)`.

**Sources**: [src/js/interface/Interface.js L33-L182](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L33-L182)

#### Rankings Interface URL Schema

The rankings interface in [src/rankings.php L1-L203](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L203)

 and [src/js/interface/RankingInterface.js L1-L1700](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L1700)

 uses:

| Parameter | Purpose | Example |
| --- | --- | --- |
| `cp` | League CP limit | Path: `/rankings/all/1500/overall/` |
| `cup` | Cup format | Path: `/rankings/premierultra/2500/overall/` |
| `p` | Selected Pokemon detail view | `p=azumarill-41-15-15-14-4-4-1-1` |

The `p` parameter encodes: `speciesId-level-atk-def-hp-fastMove-chargedMove1-chargedMove2-chargedMove3`

**Sources**: [src/rankings.php L1-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php#L1-L86)

 [src/js/interface/RankingInterface.js L1-L1700](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L1700)

### URL State Updates

When state changes, interfaces update the URL without page reload:

```

```

[src/js/interface/Interface.js L1050-L1100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1050-L1100)

 (approximate location) uses `history.pushState()` to update the URL when selections change, creating browser history entries for back/forward navigation.

**Sources**: [src/js/interface/Interface.js L1-L3000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L3000)

 [src/js/interface/PokeSelect.js L1-L1500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L1500)

---

## Settings and Configuration State

User preferences flow through multiple persistence layers and affect both UI and battle mechanics.

### Settings Architecture

```

```

**Sources**: [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

 [src/header.php L167-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L167-L199)

### Settings Data Structure

The `settings` object contains:

| Property | Type | Purpose | Default |
| --- | --- | --- | --- |
| `defaultIVs` | string | IV display mode | `"gamemaster"` |
| `animateTimeline` | boolean | Animate battle timeline | `true` |
| `matrixDirection` | string | Matrix display orientation | `"row"` |
| `gamemaster` | string | Active gamemaster ID | `"gamemaster"` |
| `pokeboxId` | string/number | Pokébox integration ID | `0` |
| `theme` | string | CSS theme name | `"default"` |
| `colorblindMode` | number | Colorblind mode toggle | `0` |
| `performanceMode` | number | Performance optimizations | `0` |

[src/header.php L63-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L63-L76)

 defines defaults, and [src/header.php L167-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L167-L199)

 outputs them to JavaScript.

**Sources**: [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

 [src/header.php L167-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L167-L199)

### Settings Write Flow

When a user changes settings:

1. JavaScript updates the local `settings` object
2. AJAX POST to [src/modules/settingsCookie.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/settingsCookie.php)  (inferred)
3. PHP writes the updated cookie
4. Cookie expires in 5 years
5. Page reloads to apply theme changes (if needed)

**Sources**: [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

### Custom GameMaster Selection

The `settings.gamemaster` property determines data source:

```

```

[src/js/GameMaster.js L67-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L67-L122)

 implements this branching logic. When a custom gamemaster is active, [src/header.php L319-L323](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L319-L323)

 displays a banner notification.

**Sources**: [src/js/GameMaster.js L67-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L67-L122)

 [src/header.php L319-L323](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L319-L323)

---

## Battle Simulation State Flow

The battle simulation represents the most complex state management in PvPoke, with state flowing through Pokemon instances, the Battle controller, and the timeline.

### Battle State Lifecycle

```

```

**Sources**: [src/js/battle/Battle.js L1-L1800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L1800)

### Pokemon State Management

Each `Pokemon` instance maintains its own state:

| State Property | Type | Source | Mutability |
| --- | --- | --- | --- |
| `speciesId` | string | Constructor | Immutable |
| `index` | number | Battle.setNewPokemon() | Set once |
| `hp` | number | Initialize/damage | Mutable |
| `energy` | number | Move processing | Mutable |
| `shields` | number | Player config | Decrements |
| `startingShields` | number | Player config | Immutable |
| `statBuffs` | array | Buff application | Mutable |
| `fastMove` | Move | Selected/auto | Mutable |
| `chargedMoves` | Move[] | Selected/auto | Mutable |
| `priority` | number | Player config | Immutable |

[src/js/pokemon/Pokemon.js L1-L2500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L2500)

 defines the Pokemon class with these properties. The Battle instance coordinates state changes across both Pokemon.

**Sources**: [src/js/pokemon/Pokemon.js L1-L2500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L2500)

 [src/js/battle/Battle.js L82-L117](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L82-L117)

### Turn-Based Action Processing

Each battle turn processes a queue of actions:

```

```

[src/js/battle/Battle.js L500-L1000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L500-L1000)

 (approximate) implements the action processing loop. Actions are sorted by priority (Charged Moves > Fast Moves > Waits), then processed sequentially.

**Sources**: [src/js/battle/Battle.js L1-L1800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L1800)

### Timeline State Tracking

The `timeline` array records every state change:

```

```

[src/js/battle/Battle.js L32-L37](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L32-L37)

 initializes the timeline, and various methods throughout the Battle class append events. The timeline enables UI playback and debugging.

**Sources**: [src/js/battle/Battle.js L32-L900](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L32-L900)

### State Synchronization to UI

After simulation, state flows to the interface:

```

```

[src/js/interface/Interface.js L500-L800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L500-L800)

 (approximate) reads battle results and updates DOM elements. The timeline is consumed by animation functions that step through events.

**Sources**: [src/js/interface/Interface.js L1-L3000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L3000)

---

## Client-Side Storage Architecture

PvPoke uses multiple browser storage mechanisms for different data types with different persistence requirements.

### Storage Layer Mapping

```

```

**Sources**: [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

 [src/js/GameMaster.js L82-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L82-L185)

### localStorage Schema

| Key Pattern | Data Type | Purpose | Example |
| --- | --- | --- | --- |
| `custom_gamemaster_*` | JSON object | Custom Pokemon/moves | `custom_gamemaster_123` |
| `customGroup-*` | JSON object | Custom Pokemon groups | `customGroup-myteam` |
| `cd-{articleId}` | JSON array | Community Day checklist state | `cd-beldum-2024` |
| `rankingsShowMoveCounts` | string boolean | UI preference | `"true"` |
| `migrate` | string | Migration flag | `"true"` |

[src/js/GameMaster.js L82-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L82-L122)

 demonstrates custom gamemaster retrieval from localStorage. [src/js/interface/RankingInterface.js L28-L30](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L28-L30)

 reads UI preferences.

**Sources**: [src/js/GameMaster.js L82-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L82-L185)

 [src/js/interface/RankingInterface.js L28-L30](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L28-L30)

### Cookie Management

The `settings` cookie stores key-value pairs:

```
settings={"defaultIVs":"gamemaster","animateTimeline":1,"theme":"default",...}
```

[src/header.php L10-L11](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L11)

 reads and deserializes the cookie. The cookie has a 5-year expiration [src/header.php L83](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L83-L83)

 (inferred from migration cookie pattern).

**Sources**: [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

### Storage Write Patterns

#### localStorage Write

```

```

[src/js/GameMaster.js L171-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L171-L185)

 implements custom gamemaster saving with `window.localStorage.setItem()`.

**Sources**: [src/js/GameMaster.js L171-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L171-L185)

#### Cookie Write (via Server)

```

```

Cookie updates require server round-trip because JavaScript cannot set long-expiration cookies with HttpOnly flags (inferred security pattern).

**Sources**: [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

---

## State Synchronization Patterns

PvPoke employs several patterns to keep state synchronized across components.

### Singleton Pattern for Data Access

The `GameMaster` singleton ensures consistent data access:

```

```

[src/js/GameMaster.js L3-L4](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L3-L4)

 implements the singleton pattern with a private instance variable. All components call `GameMaster.getInstance()` to access the same data.

**Sources**: [src/js/GameMaster.js L3-L657](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L3-L657)

### Observer Pattern for UI Updates

Battle simulation uses callbacks to notify UI of state changes (inferred pattern):

```

```

[src/js/battle/Battle.js L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L76-L76)

 defines `updateCallback` for interface notifications during simulation.

**Sources**: [src/js/battle/Battle.js L74-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L74-L76)

### Cache Invalidation

When the gamemaster changes, caches are flushed:

```

```

[src/js/GameMaster.js L222-L225](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L222-L225)

 implements cache flushing to ensure stale Pokemon objects don't persist after data changes.

**Sources**: [src/js/GameMaster.js L222-L225](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L222-L225)

### State Restoration Precedence

When multiple state sources exist, precedence is:

1. **URL parameters** (highest priority - explicit user navigation)
2. **localStorage** (persistent preferences)
3. **cookies** (session preferences)
4. **defaults** (fallback values)

[src/js/interface/Interface.js L33-L182](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L33-L182)

 demonstrates this precedence by first checking `get` (URL params), then falling back to stored preferences.

**Sources**: [src/js/interface/Interface.js L33-L182](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L33-L182)

 [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

---

## Data Flow Summary

### Complete Request-Response-Simulation Cycle

```

```

**Sources**: [src/header.php L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L1-L324)

 [src/js/GameMaster.js L1-L657](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L657)

 [src/js/battle/Battle.js L1-L1800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L1800)

 [src/js/interface/Interface.js L1-L3000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L3000)