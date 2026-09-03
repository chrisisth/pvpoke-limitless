# Adding Custom Pokemon and Moves

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
> * [src/data/gamemaster/validations.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json)
> * [src/gm-editor/edit.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/edit.php)
> * [src/gm-editor/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php)
> * [src/gm-editor/move.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/move.php)
> * [src/gm-editor/pokemon.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php)
> * [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)
> * [src/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php)
> * [src/js/GameMaster.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js)
> * [src/js/battle/Battle.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js)
> * [src/js/devtools/gm-editor/GMEditorInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js)
> * [src/js/devtools/gm-editor/GMEditorMoveInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js)
> * [src/js/devtools/gm-editor/GMEditorPokeInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js)
> * [src/js/devtools/gm-editor/GMEditorTableInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js)
> * [src/js/devtools/gm-editor/GMEditorUtils.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js)
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

This document provides technical guidance for developers who want to extend PvPoke by adding new Pokemon or moves to the system. It covers the data structures, validation requirements, storage mechanisms, and integration points necessary to create custom game data.

**Scope**: This page focuses on the technical implementation of custom Pokemon and moves. For information about the GameMaster Editor user interface, see [GameMaster Editor](/pvpoke/pvpoke/6.3-gamemaster-editor). For details about data persistence architecture, see [Client-Side Storage](/pvpoke/pvpoke/8.3-client-side-storage).

---

## System Overview

PvPoke uses a custom gamemaster system that allows users to create modified versions of the default game data stored in localStorage. The system supports both official data (`gamemaster.json`) and user-defined custom gamemasters.

```

```

**Sources**: [src/js/GameMaster.js L1-L366](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L366)

 [src/header.php L10-L85](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L85)

---

## Pokemon Data Structure

Each Pokemon entry must conform to a specific schema. All Pokemon are stored in the `pokemon` array within the gamemaster object.

### Required Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `dex` | Number | National Pokedex number | `1` |
| `speciesName` | String | Display name | `"Bulbasaur"` |
| `speciesId` | String | Unique identifier (lowercase, underscored) | `"bulbasaur"` |
| `baseStats` | Object | Base stats object `{atk, def, hp}` | `{atk: 118, def: 111, hp: 128}` |
| `types` | Array[String] | Up to 2 type strings | `["grass", "poison"]` |
| `fastMoves` | Array[String] | Fast move IDs (uppercase, underscored) | `["TACKLE", "VINE_WHIP"]` |
| `chargedMoves` | Array[String] | Charged move IDs | `["POWER_WHIP", "SEED_BOMB"]` |
| `released` | Boolean | Whether Pokemon is available | `true` |

### Optional Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `tags` | Array[String] | Classification tags | `["starter", "shadoweligible"]` |
| `defaultIVs` | Object | Default IV spreads by CP tier | `{cp1500: [20.5, 4, 13, 14]}` |
| `level25CP` | Number | CP at level 25, 10/10/10 IVs | `627` |
| `eliteMoves` | Array[String] | Moves requiring Elite TM | `["FRENZY_PLANT"]` |
| `legacyMoves` | Array[String] | Removed moves | `["BODY_SLAM"]` |
| `searchPriority` | Number | Search ranking (higher = higher priority) | `13` |
| `buddyDistance` | Number | Buddy walking distance (km) | `3` |
| `thirdMoveCost` | Number | Stardust cost for second Charged Move | `10000` |
| `family` | Object | Evolution family data | See below |
| `nicknames` | Array[String] | Alternative search terms | `["zard"]` |

### Family Object Structure

```

```

### Example Pokemon Entry

```

```

**Sources**: [src/data/gamemaster/pokemon.json L110-L138](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json#L110-L138)

 [src/data/gamemaster.json L1-L324](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json#L1-L324)

---

## Move Data Structure

Moves are categorized as Fast Moves (energy generation) or Charged Moves (energy consumption). All moves are stored in the `moves` array.

### Required Fields

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `moveId` | String | Unique identifier (uppercase, underscored) | `"VINE_WHIP"` |
| `name` | String | Display name | `"Vine Whip"` |
| `type` | String | Move type | `"grass"` |
| `power` | Number | Base damage | `5` |
| `energy` | Number | Energy cost (0 for Fast Moves) | `0` |
| `energyGain` | Number | Energy gained (0 for Charged Moves) | `8` |
| `cooldown` | Number | Duration in milliseconds | `1000` |

### Optional Fields - Fast Moves

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `archetype` | String | Move category | `"High Energy"` |
| `turns` | Number | Number of turns | `2` |

### Optional Fields - Charged Moves

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `buffs` | Array[Number] | `[attackStage, defenseStage]` buff modifiers | `[0, -2]` |
| `buffTarget` | String | `"self"` or `"opponent"` | `"opponent"` |
| `buffApplyChance` | String | Probability as decimal string | `"1"` or `"0.3"` |
| `archetype` | String | Move category | `"Debuff"` |

### Buff Mechanics

Buffs use a stage system where each stage modifies the stat by 1/4:

* Attack stages: Each stage increases damage by 25%
* Defense stages: Each stage reduces incoming damage by 25%
* Valid range: -4 to +4 stages

### Example Fast Move

```

```

### Example Charged Move

```

```

**Sources**: [src/data/gamemaster/moves.json L1-L29](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L1-L29)

---

## Custom Gamemaster Object Schema

Custom gamemasters are stored in localStorage with the following structure:

```

```

### Structure Definition

```

```

### Storage Key Convention

Custom gamemasters are stored in localStorage using their `id` as the key. The settings cookie references this ID in `settings.gamemaster`.

**Sources**: [src/js/GameMaster.js L171-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L171-L185)

---

## Creating and Saving Custom Gamemasters

### Workflow Diagram

```

```

### Loading a Custom Gamemaster

The `loadCustomGameMaster` function loads either the default gamemaster or a custom one from localStorage:

```

```

**Parameters**:

* `id` (String): Either `"gamemaster"` for default or a custom gamemaster ID
* `callback` (Function): Called with the loaded data object

**Behavior**:

1. If `id === "gamemaster"`: Loads `gamemaster.min.json` via AJAX
2. Otherwise: Retrieves from `localStorage.getItem(id)` and parses JSON
3. Returns data via callback in standard format

**Sources**: [src/js/GameMaster.js L127-L168](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L127-L168)

### Saving a Custom Gamemaster

The `saveCustomGameMaster` function persists custom data to localStorage:

```

```

**Process**:

1. Sorts `data.pokemon` by `dex` field (ascending)
2. Sorts `data.moves` by `moveId` field (alphabetically)
3. Creates standardized gamemaster object with `id`, `title`, `dataType`, `pokemon`, `moves`
4. Calls `localStorage.setItem(data.id, JSON.stringify(customData))`

**Sources**: [src/js/GameMaster.js L171-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L171-L185)

---

## Validation Requirements

### Pokemon Validation

The system does not enforce strict validation at runtime, but the following rules ensure proper functionality:

#### Required Field Validation

```

```

#### Naming Conventions

* `speciesId`: Lowercase, use underscores for spaces, no special characters (e.g., `"venusaur_mega"`, `"mr_mime"`)
* `moveId`: Uppercase, use underscores for spaces (e.g., `"VINE_WHIP"`, `"FRENZY_PLANT"`)

#### Type Validation

Valid type strings: `"normal"`, `"fighting"`, `"flying"`, `"poison"`, `"ground"`, `"rock"`, `"bug"`, `"ghost"`, `"steel"`, `"fire"`, `"water"`, `"grass"`, `"electric"`, `"psychic"`, `"ice"`, `"dragon"`, `"dark"`, `"fairy"`, `"none"`

Use `"none"` for single-type Pokemon's second type slot.

#### Move Reference Validation

All move IDs in `fastMoves` and `chargedMoves` arrays must exist in the `moves` array. The system uses `moveMap.get(moveId)` to look up moves.

**Sources**: [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)

 [src/js/pokemon/Pokemon.js L1-L130](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L130)

### Move Validation

#### Energy Conservation

Fast Moves and Charged Moves must maintain energy conservation:

* Fast Moves: `energy === 0` and `energyGain > 0`
* Charged Moves: `energy > 0` and `energyGain === 0`

#### Turn-Based Timing

The `cooldown` field determines move duration:

* Each turn = 500ms
* `turns = cooldown / 500`
* Common values: 500ms (1 turn), 1000ms (2 turns), 1500ms (3 turns)

#### Buff Validation

If providing buffs:

* `buffs` must be `[attackStage, defenseStage]` where each value is between -4 and 4
* `buffTarget` must be `"self"` or `"opponent"`
* `buffApplyChance` must be a string representing a decimal between 0 and 1

**Sources**: [src/data/gamemaster/moves.json L1-L29](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L1-L29)

---

## Integration with Search and Selection Systems

### Search Map Generation

After loading or modifying gamemaster data, the system rebuilds indexed maps for fast lookup:

```

```

The `createSearchMaps` function creates Map objects for O(1) lookup:

```

```

**Sources**: [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)

### Pokemon Select List

The `createPokeSelectList` function generates a flattened array optimized for UI autocomplete and search:

```

```

This list is consumed by `PokeSelect.js` for Pokemon selection interfaces.

**Sources**: [src/js/GameMaster.js L195-L205](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L195-L205)

 [src/js/interface/PokeSelect.js L1-L6](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L6)

---

## Switching Between Gamemasters

### Settings Cookie Integration

The active gamemaster is determined by the `settings.gamemaster` value stored in a browser cookie:

```

```

### Header Banner Display

When a custom gamemaster is active, a banner is displayed to inform users:

```

```

**Sources**: [src/header.php L319-L323](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L319-L323)

 [src/header.php L10-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php#L10-L76)

### Runtime Loading Process

```

```

**Sources**: [src/js/GameMaster.js L67-L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L67-L122)

---

## Testing Custom Pokemon and Moves

### Battle Simulation Testing

To verify custom Pokemon behave correctly:

1. **Create Test Pokemon**: Add a custom Pokemon with known base stats
2. **Verify CP Calculation**: Check that CP at specific levels matches expected values
3. **Test Move Assignment**: Ensure all moves in `fastMoves` and `chargedMoves` are accessible
4. **Run Battle Simulation**: Use Battle mode to test damage calculations

### Test Checklist

| Test Case | Validation Point | How to Verify |
| --- | --- | --- |
| CP Calculation | Pokemon.calculateCP() | Compare with online IV calculators |
| Move Availability | Pokemon.fastMovePool, chargedMovePool | Check move selection UI |
| Damage Calculation | Battle simulation results | Calculate expected damage manually |
| Buff Application | Move with buffs | Verify stat changes in battle timeline |
| Type Effectiveness | Battle against known types | Check damage multipliers |
| Search/Selection | Pokemon appears in selectors | Search for custom Pokemon |

### Debug Mode

Enable debug logging in `Battle.js` to trace damage calculations:

```

```

This outputs turn-by-turn battle events to the console.

**Sources**: [src/js/battle/Battle.js L18-L19](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L18-L19)

---

## Common Issues and Solutions

### Pokemon Not Appearing in Selection

**Problem**: Custom Pokemon doesn't appear in Pokemon selector dropdown.

**Causes**:

1. `released` field is `false` or missing
2. `speciesId` contains invalid characters
3. Search maps not rebuilt after adding Pokemon

**Solution**:

* Ensure `released: true`
* Rebuild search maps by calling `createSearchMaps()` and `createPokeSelectList()`
* Verify `speciesId` follows naming conventions

### Move Not Working in Battle

**Problem**: Pokemon cannot use an assigned move.

**Causes**:

1. Move doesn't exist in `moves` array
2. Move ID spelling mismatch
3. Move type is incorrect (Fast move energy values vs Charged move)

**Solution**:

* Verify move exists in `moveMap` using browser console: `GameMaster.getInstance().moveMap.get("MOVE_ID")`
* Check exact spelling matches between Pokemon's move arrays and move `moveId`
* Ensure Fast Moves have `energy: 0, energyGain > 0` and Charged Moves have `energy > 0, energyGain: 0`

### Incorrect Damage Calculation

**Problem**: Battle damage doesn't match expectations.

**Causes**:

1. Base stats incorrect
2. Type effectiveness miscalculated
3. Move power incorrect

**Solution**:

* Verify `baseStats.atk` and `baseStats.def` match source data
* Check `types` array is correct for both Pokemon
* Confirm move `power` values in moves array

### Custom Gamemaster Not Persisting

**Problem**: Changes disappear on page reload.

**Causes**:

1. `saveCustomGameMaster()` not called
2. localStorage quota exceeded
3. Browser in private/incognito mode

**Solution**:

* Ensure save function is called after modifications
* Check localStorage size (typically 5-10MB limit)
* Use regular browsing mode for persistent storage

**Sources**: [src/js/GameMaster.js L171-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L171-L185)

 [src/js/battle/Battle.js L1-L216](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L216)

---

## Example: Adding a New Pokemon

### Step-by-Step Process

```

```

### Example: Adding a New Move

```

```

**Sources**: [src/js/GameMaster.js L127-L185](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L127-L185)

 [src/data/gamemaster/pokemon.json L110-L138](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json#L110-L138)

 [src/data/gamemaster/moves.json L1-L29](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L1-L29)