# GameMaster Editor

> **Relevant source files**
> * [src/data/gamemaster/validations.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json)
> * [src/gm-editor/edit.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/edit.php)
> * [src/gm-editor/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php)
> * [src/gm-editor/move.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/move.php)
> * [src/gm-editor/pokemon.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php)
> * [src/js/devtools/gm-editor/GMEditorInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js)
> * [src/js/devtools/gm-editor/GMEditorMoveInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js)
> * [src/js/devtools/gm-editor/GMEditorPokeInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js)
> * [src/js/devtools/gm-editor/GMEditorTableInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js)
> * [src/js/devtools/gm-editor/GMEditorUtils.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js)

The GameMaster Editor is a code-free customization system that allows users to modify Pokémon stats, moves, and movesets for use in simulations. It enables creating hypothetical scenarios, testing balance changes, and previewing unreleased content. All customizations are stored client-side in browser localStorage and only affect runtime-generated features (battle simulations, team analysis), not pre-calculated rankings data.

For information about the core GameMaster singleton that manages data loading and access, see [GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton). For settings management including gamemaster selection, see [User Settings and Themes](/pvpoke/pvpoke/7.3-user-settings-and-themes).

## System Overview

The GameMaster Editor consists of four main interfaces accessed through `/gm-editor/`:

| Page | Purpose | Primary Interface Class |
| --- | --- | --- |
| `index.php` | Gamemaster selection and management | `GMEditorInterface.js` |
| `edit.php?c=pokemon` | Table view of all Pokemon | `GMEditorTableInterface.js` |
| `edit.php?c=moves` | Table view of all moves | `GMEditorTableInterface.js` |
| `pokemon.php?p={id}` | Individual Pokemon editor | `GMEditorPokeInterface.js` |
| `move.php?m={id}` | Individual Move editor | `GMEditorMoveInterface.js` |

Custom gamemasters are stored as JSON objects in `localStorage` with the structure:

```
{
  "id": "custom_gm_id",
  "title": "My Custom Gamemaster",
  "dataType": "gamemaster",
  "pokemon": [...],
  "moves": [...]
}
```

Sources: [src/gm-editor/index.php L1-L135](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L1-L135)

 [src/js/devtools/gm-editor/GMEditorInterface.js L46-L111](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L46-L111)

## Data Flow Architecture

```

```

**Data Flow: Gamemaster Editor to Battle System**

The editor modifies localStorage gamemasters which are loaded by the GameMaster singleton when `settings.gamemaster` is set to a custom value. All battle simulations and runtime features use the active gamemaster.

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L46-L111](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L46-L111)

 [src/js/devtools/gm-editor/GMEditorTableInterface.js L30-L59](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L30-L59)

 [src/js/GameMaster.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js)

 (referenced but not provided)

## Main Interface: Gamemaster Management

The main editor page at `/gm-editor/` provides gamemaster selection and high-level operations.

### Interface Initialization

[src/js/devtools/gm-editor/GMEditorInterface.js L18-L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L18-L44)

 initializes by:

1. Scanning localStorage for all objects with `dataType: "gamemaster"`
2. Populating the `#gm-select` dropdown with available gamemasters
3. Selecting the current gamemaster from `settings.gamemaster`
4. Loading that gamemaster's data via `gm.loadCustomGameMaster()`

### Gamemaster Selection

When the user changes the dropdown [src/js/devtools/gm-editor/GMEditorInterface.js L314-L351](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L314-L351)

:

1. Calls `gm.loadCustomGameMaster(id, callback)`
2. Updates `settings.gamemaster` via AJAX POST to `settingsCookie.php`
3. Shows/hides save and delete buttons based on selection
4. Regenerates the changelog display

### Changelog Generation

[src/js/devtools/gm-editor/GMEditorInterface.js L132-L247](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L132-L247)

 compares custom gamemaster data with the original `gm.originalData` to generate a changelog table showing:

* Added Pokemon/Moves (`type: "addition"`)
* Deleted Pokemon/Moves (`type: "deletion"`)
* Modified entries (`type: "edit"`) with specific property changes

Changes are detected by [src/js/devtools/gm-editor/GMEditorInterface.js L250-L311](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L250-L311)

 which recursively compares objects and identifies array differences.

### Import/Export

[src/js/devtools/gm-editor/GMEditorInterface.js L370-L390](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L370-L390)

 handles import by:

1. Parsing JSON from textarea
2. Validating via `GMEditorUtils.ValidateGamemaster(customData)`
3. Calling `setGameMasterData()` if valid

The export textarea is automatically updated with `JSON.stringify(data)` [src/js/devtools/gm-editor/GMEditorInterface.js L113-L123](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L113-L123)

Sources: [src/gm-editor/index.php L1-L135](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L1-L135)

 [src/js/devtools/gm-editor/GMEditorInterface.js L1-L514](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L1-L514)

## Table Interface: Pokemon and Move Lists

The table interface at `/gm-editor/edit.php?c={pokemon|moves}` displays all entries in a sortable, searchable table.

### Table Display Flow

```

```

**Table Interface Data Flow**

Sources: [src/js/devtools/gm-editor/GMEditorTableInterface.js L30-L80](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L30-L80)

### Data Source Configuration

[src/js/devtools/gm-editor/GMEditorTableInterface.js L36-L56](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L36-L56)

 sets:

* `source`: Points to either `data.pokemon` or `data.moves`
* `idKey`: Either `"speciesId"` or `"moveId"`
* `nameKey`: Either `"speciesName"` or `"name"`
* `sort`: Default sort field

### Pokemon Table Rendering

[src/js/devtools/gm-editor/GMEditorTableInterface.js L83-L163](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L83-L163)

 generates table rows showing:

* Dex number, name
* Fast moves (with `*` for elite, `†` for legacy)
* Charged moves (with same indicators)
* Tags, search priority, released status
* Edit/Copy/Delete controls

Rows are paginated at 200 per page [src/js/devtools/gm-editor/GMEditorTableInterface.js L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L27-L27)

### Search Functionality

[src/js/devtools/gm-editor/GMEditorTableInterface.js L222-L274](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L222-L274)

 implements search:

1. User types in `.poke-search` input
2. Debounced query after 200ms [src/js/devtools/gm-editor/GMEditorTableInterface.js L234](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L234-L234)
3. Calls `gm.generatePokemonListFromSearchString()` or `gm.generateMoveListFromSearchString()`
4. Stores results in `searchResults` array
5. Re-renders table with filtered results

### Copy and Delete Operations

**Copy Entry** [src/js/devtools/gm-editor/GMEditorTableInterface.js L378-L432](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L378-L432)

:

1. Clones the selected entry with `{...targetObj}`
2. Generates unique ID by appending `_copy` or `_copy_N`
3. Inserts after the original in the array
4. Automatically saves to localStorage
5. Calls `gm.flushAllPokemonCache()` to clear caches

**Delete Entry** [src/js/devtools/gm-editor/GMEditorTableInterface.js L436-L459](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L436-L459)

:

1. Shows confirmation modal
2. Removes from array via `source.splice(targetIndex, 1)`
3. Re-displays table (save happens separately via Save Changes button)

Sources: [src/gm-editor/edit.php L1-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/edit.php#L1-L199)

 [src/js/devtools/gm-editor/GMEditorTableInterface.js L1-L553](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L1-L553)

## Pokemon Editor

The individual Pokemon editor at `/gm-editor/pokemon.php?p={speciesId}` provides a comprehensive form for editing all Pokemon properties.

### Pokemon Data Structure

A Pokemon entry contains:

| Field | Type | Description |
| --- | --- | --- |
| `speciesId` | string | Unique identifier (lowercase, underscores) |
| `speciesName` | string | Display name |
| `dex` | number | Pokedex number |
| `types` | array[2] | Primary and secondary types |
| `baseStats` | object | `{atk, def, hp}` base stats |
| `defaultIVs` | object | Default IVs for leagues: `{cp500, cp1500, cp2500}` |
| `fastMoves` | array | Fast move IDs |
| `chargedMoves` | array | Charged move IDs |
| `eliteMoves` | array | Subset of moves requiring Elite TM |
| `legacyMoves` | array | Subset of moves that are legacy |
| `buddyDistance` | number | 1, 3, 5, or 20 km |
| `thirdMoveCost` | number | Stardust/candy cost |
| `released` | boolean | Whether Pokemon is in-game |
| `tags` | array | Special categorization flags |
| `searchPriority` | number | Search ranking for similar names |

Sources: [src/gm-editor/pokemon.php L1-L293](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php#L1-L293)

### Form Field Mapping

```

```

**Pokemon Editor Two-Way Data Binding**

The interface maintains synchronization between form inputs and the `selectedPokemon` object.

Sources: [src/js/devtools/gm-editor/GMEditorPokeInterface.js L145-L300](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L145-L300)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L362-L423](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L362-L423)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L433-L513](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L433-L513)

### Default IV Generation

[src/js/devtools/gm-editor/GMEditorPokeInterface.js L357-L360](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L357-L360)

 triggers `gm.generateDefaultIVsByPokemon()` which:

1. Creates a Battle instance for each league (500, 1500, 2500 CP)
2. Instantiates a Pokemon with the given base stats
3. Calls `pokemon.generateIVCombinations()` to find optimal IVs
4. Selects top-ranked IVs for each league

The default IV table [src/js/devtools/gm-editor/GMEditorPokeInterface.js L180-L240](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L180-L240)

 displays:

* League name (cp500, cp1500, cp2500, etc.)
* Level and IV inputs
* Calculated rank among all IV combinations
* Resulting CP value

### Move List Management

Move lists are displayed as editable lists via `GMEditorUtils.DisplayEditableList()` [src/js/devtools/gm-editor/GMEditorPokeInterface.js L244-L247](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L244-L247)

**Adding moves** [src/js/devtools/gm-editor/GMEditorPokeInterface.js L384-L416](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L384-L416)

:

1. User selects from filtered dropdown (excludes already-added moves)
2. Move ID is pushed to appropriate array
3. `displaySelectedPokemon()` refreshes the UI

**Removing moves** [src/js/devtools/gm-editor/GMEditorPokeInterface.js L516-L542](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L516-L542)

:

1. User clicks `<span>` delete button
2. Move is filtered out of array
3. Enforces minimum: at least one fast move and one charged move

### Save Operation

[src/js/devtools/gm-editor/GMEditorPokeInterface.js L579-L610](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L579-L610)

 saves by:

1. Loading most recent gamemaster from localStorage
2. Finding existing entry by `speciesId`
3. Overwriting or appending `selectedPokemon`
4. Calling `gm.saveCustomGameMaster(data)`
5. Updating `lastSavedJSON` to track changes

The Save Changes button is enabled when `JSON.stringify(selectedPokemon) != lastSavedJSON` [src/js/devtools/gm-editor/GMEditorPokeInterface.js L332-L336](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L332-L336)

Sources: [src/gm-editor/pokemon.php L1-L293](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php#L1-L293)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L1-L625](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L1-L625)

## Move Editor

The move editor at `/gm-editor/move.php?m={moveId}` provides forms for editing move data and managing learnsets.

### Move Data Structure

| Field | Type | Description | Fast/Charged |
| --- | --- | --- | --- |
| `moveId` | string | Unique identifier | Both |
| `name` | string | Display name | Both |
| `type` | string | Move type | Both |
| `power` | number | Base damage | Both |
| `energy` | number | Energy cost | Charged only |
| `energyGain` | number | Energy generated | Fast only |
| `turns` | number | Duration in turns | Fast only |
| `cooldown` | number | `500 * turns` | Fast only |
| `archetype` | string | Category (e.g., "High Quality", "Nuke") | Both |
| `buffs` | array[2] | `[atk_stage, def_stage]` | Charged only |
| `buffApplyChance` | string | Probability as decimal string | Charged only |
| `buffTarget` | string | "self", "opponent", or "both" | Charged only |
| `buffsSelf` | array[2] | Self stat changes (if target="both") | Charged only |
| `buffsOpponent` | array[2] | Opponent stat changes (if target="both") | Charged only |

Sources: [src/gm-editor/move.php L1-L235](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/move.php#L1-L235)

### Fast vs Charged Move Handling

The interface toggles form sections based on move category [src/js/devtools/gm-editor/GMEditorMoveInterface.js L179-L246](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L179-L246)

:

**Fast Move Display**:

* Shows `#move-turns` field
* Calculates DPT (damage per turn) and EPT (energy per turn)
* Hides effect fields
* Uses `gm.data.fastMoveArchetypes`

**Charged Move Display**:

* Shows `#move-effect` dropdown and stat modifier inputs
* Calculates DPE (damage per energy)
* Hides turns field
* Uses `gm.data.chargedMoveArchetypes`

Category switching [src/js/devtools/gm-editor/GMEditorMoveInterface.js L360-L390](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L360-L390)

:

* Fast → Charged: Sets `energy = 50`, removes buff properties
* Charged → Fast: Sets `energyGain = 1`, `turns = 1`, removes buffs

### Stat Modifier Interface

[src/gm-editor/move.php L90-L135](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/move.php#L90-L135)

 provides inputs for buff effects with three modes:

1. **None**: No buffs, hides stat modifier inputs
2. **Modify Attacker Stats**: Shows attacker inputs, uses `buffs` array
3. **Modify Defender Stats**: Shows defender inputs, uses `buffs` array
4. **Both**: Shows both sets, uses `buffsSelf` and `buffsOpponent` arrays

[src/js/devtools/gm-editor/GMEditorMoveInterface.js L579-L604](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L579-L604)

 handles stat input changes:

* Clamps values between `-maxBuffStages` and `+maxBuffStages` (typically ±4)
* Updates appropriate array property
* For "both" mode, copies `buffsSelf` to `buffs` for compatibility

### Learnset Management

The learnset section tracks which Pokemon can learn the move.

**Initialization** [src/js/devtools/gm-editor/GMEditorMoveInterface.js L36-L57](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L36-L57)

:

1. Iterates all Pokemon in `data.pokemon`
2. Checks if `moveId` appears in `fastMoves` or `chargedMoves`
3. Separates into `pokemonWithMove` and `pokemonWithoutMove` arrays
4. Sorts both alphabetically

**Adding to Learnset** [src/js/devtools/gm-editor/GMEditorMoveInterface.js L492-L520](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L492-L520)

:

1. User searches for Pokemon in `.poke-search` input
2. Selects from `#add-learnset` dropdown populated with `pokemonWithoutMove`
3. Clicks confirm button
4. Move is added to appropriate movepool based on `selectedMove.energy > 0`
5. Automatically includes Shadow and Mega variants [src/js/devtools/gm-editor/GMEditorMoveInterface.js L496-L503](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L496-L503)

**Removing from Learnset** [src/js/devtools/gm-editor/GMEditorMoveInterface.js L627-L664](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L627-L664)

:

1. User clicks delete button in editable list
2. Move is removed from Pokemon's movepool
3. Enforces minimum of one move in each category
4. Shows error modal if Pokemon would have zero moves

### Archetype Auto-Selection

[src/js/devtools/gm-editor/GMEditorMoveInterface.js L393-L396](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L393-L396)

 calls `gm.generateArchetypeByMove()` which categorizes moves based on power, energy efficiency, and effects. This is triggered:

* When move category changes
* When power or energy values change
* When clicking "Auto Select Archetype" button

Sources: [src/gm-editor/move.php L1-L235](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/move.php#L1-L235)

 [src/js/devtools/gm-editor/GMEditorMoveInterface.js L1-L685](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L1-L685)

## Validation System

The validation system ensures data integrity before saving changes.

### Validation Rules Schema

[src/data/gamemaster/validations.json L1-L408](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json#L1-L408)

 defines validation rules for three object types:

```

```

### Validation Types

| Type | Description | Implementation |
| --- | --- | --- |
| `required` | Field must have a value | [src/js/devtools/gm-editor/GMEditorUtils.js L122-L127](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L122-L127) |
| `unique_id` | No duplicate IDs in array | [src/js/devtools/gm-editor/GMEditorUtils.js L181-L196](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L181-L196) |
| `existing_id` | Must reference existing entry | [src/js/devtools/gm-editor/GMEditorUtils.js L198-L208](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L198-L208) |
| `string_min_length` | Minimum string length | [src/js/devtools/gm-editor/GMEditorUtils.js L129-L133](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L129-L133) |
| `string_max_length` | Maximum string length | [src/js/devtools/gm-editor/GMEditorUtils.js L135-L139](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L135-L139) |
| `number` | Must be numeric | [src/js/devtools/gm-editor/GMEditorUtils.js L141-L145](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L141-L145) |
| `integer` | Must be whole number | [src/js/devtools/gm-editor/GMEditorUtils.js L159-L163](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L159-L163) |
| `number_min_value` | Minimum numeric value | [src/js/devtools/gm-editor/GMEditorUtils.js L147-L151](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L147-L151) |
| `number_max_value` | Maximum numeric value | [src/js/devtools/gm-editor/GMEditorUtils.js L153-L157](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L153-L157) |
| `type` | Valid Pokemon type | [src/js/devtools/gm-editor/GMEditorUtils.js L165-L169](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L165-L169) |
| `whitelist` | Value in allowed list | [src/js/devtools/gm-editor/GMEditorUtils.js L224-L228](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L224-L228) |
| `blacklist` | Value not in forbidden list | [src/js/devtools/gm-editor/GMEditorUtils.js L230-L234](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L230-L234) |
| `regex` | Matches pattern | [src/js/devtools/gm-editor/GMEditorUtils.js L236-L241](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L236-L241) |

### Validation Flow

```

```

**Validation Pipeline**

Sources: [src/js/devtools/gm-editor/GMEditorUtils.js L19-L276](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L19-L276)

### Pokemon Entry Validation

[src/js/devtools/gm-editor/GMEditorUtils.js L39-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L39-L86)

 validates Pokemon by:

1. Checking all properties against rules in `GMEditorValidations.pokemon`
2. Special handling for `baseStats` object [src/js/devtools/gm-editor/GMEditorUtils.js L210-L222](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L210-L222)
3. Attempting to initialize Pokemon in all leagues (500, 1500, 2500, 10000 CP)
4. Catching initialization failures and adding error message

[src/js/devtools/gm-editor/GMEditorPokeInterface.js L303-L325](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L303-L325)

 displays validation errors:

* Removes previous `.error-label` elements
* Creates new error labels for each field with errors
* Inserts after the corresponding input field
* Disables save button if any errors exist

### Move Entry Validation

[src/js/devtools/gm-editor/GMEditorUtils.js L89-L106](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L89-L106)

 validates moves similarly but without initialization testing. Error display follows the same pattern [src/js/devtools/gm-editor/GMEditorMoveInterface.js L268-L290](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L268-L290)

### Gamemaster Validation

[src/js/devtools/gm-editor/GMEditorUtils.js L20-L36](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L20-L36)

 validates entire gamemasters by checking:

* `id` and `title` properties
* All Pokemon entries via `all_pokemon` validation [src/js/devtools/gm-editor/GMEditorUtils.js L243-L256](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L243-L256)
* All Move entries via `all_moves` validation [src/js/devtools/gm-editor/GMEditorUtils.js L258-L271](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L258-L271)

This is used during import operations [src/js/devtools/gm-editor/GMEditorInterface.js L374](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L374-L374)

Sources: [src/data/gamemaster/validations.json L1-L408](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json#L1-L408)

 [src/js/devtools/gm-editor/GMEditorUtils.js L1-L378](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L1-L378)

## Import/Export System

All editor pages include import/export functionality via the "Import/Export" section.

### Export Code Generation

Export code is automatically updated when data changes:

* **Gamemaster**: [src/js/devtools/gm-editor/GMEditorInterface.js L113-L123](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L113-L123)
* **Pokemon/Move List**: [src/js/devtools/gm-editor/GMEditorTableInterface.js L208-L219](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L208-L219)
* **Individual Entry**: [src/js/devtools/gm-editor/GMEditorPokeInterface.js L327-L337](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L327-L337)  [src/js/devtools/gm-editor/GMEditorMoveInterface.js L292-L302](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L292-L302)

The textarea contains `JSON.stringify()` output of the current data object. Users can copy this to share or backup their customizations.

### Import Validation and Application

Import handlers follow a consistent pattern:

1. **Parse JSON** from textarea
2. **Validate** using appropriate method: * Gamemaster: `GMEditorUtils.ValidateGamemaster()` * Pokemon list: `ValidatePokemonEntry()` for each * Move list: `ValidateMoveEntry()` for each * Individual entry: Validates automatically on `displaySelected...()`
3. **Apply** if valid or show error modal
4. **Update display** to reflect imported data

Example from table interface [src/js/devtools/gm-editor/GMEditorTableInterface.js L478-L521](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L478-L521)

:

```

```

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L370-L390](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L370-L390)

 [src/js/devtools/gm-editor/GMEditorTableInterface.js L478-L521](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L478-L521)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L560-L575](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L560-L575)

## Storage and Persistence

### LocalStorage Structure

Custom gamemasters are stored as independent localStorage entries:

```
localStorage["gm-id-1"] = '{"id":"gm-id-1","title":"Custom 1",...}'
localStorage["gm-id-2"] = '{"id":"gm-id-2","title":"Custom 2",...}'
localStorage["gamemaster"] = '...' // Default (if downloaded)
```

[src/js/devtools/gm-editor/GMEditorInterface.js L20-L37](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L20-L37)

 scans all localStorage keys looking for objects with `dataType: "gamemaster"` to populate the selection dropdown.

### Active Gamemaster Selection

The `settings.gamemaster` cookie/preference determines which gamemaster is loaded:

* Set via Settings page [User Settings and Themes](/pvpoke/pvpoke/7.3-user-settings-and-themes)
* Updated when changing selection in editor [src/js/devtools/gm-editor/GMEditorInterface.js L323-L344](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L323-L344)
* Persisted to server via POST to `settingsCookie.php`

### Save Operations

**GameMaster.saveCustomGameMaster()** [referenced L476](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/referenced in src/js/devtools/gm-editor/GMEditorInterface.js#L476-L476)

:

* Writes JSON to `localStorage[data.id]`
* Flushes Pokemon cache to force reload
* Updates internal `GameMaster.data` reference

The editor tracks unsaved changes by comparing current JSON with `lastSavedJSON`:

* Stored when loading or after save [src/js/devtools/gm-editor/GMEditorPokeInterface.js L35-L39](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L35-L39)
* Compared when data changes [src/js/devtools/gm-editor/GMEditorPokeInterface.js L332-L336](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L332-L336)
* Enables/disables Save Changes button accordingly

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L18-L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L18-L44)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L35-L39](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L35-L39)

 [src/js/devtools/gm-editor/GMEditorTableInterface.js L523-L538](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L523-L538)

## Affected vs Unaffected Systems

### Affected (Runtime-Generated)

Custom gamemasters modify data used by systems that generate results at runtime:

| System | Why Affected |
| --- | --- |
| Single/Multi/Matrix Battle | Uses `GameMaster.getInstance()` for Pokemon and move data |
| Team Builder | Analyzes teams with active gamemaster |
| Custom Rankings | Generates rankings from scratch with custom data |
| Training Mode | AI battles use current gamemaster |
| CMP Chart | Calculates from active stat values |
| Move Pages | Displays move data from gamemaster |

Sources: [src/gm-editor/index.php L71-L79](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L71-L79)

### Unaffected (Pre-Calculated)

Systems that load static JSON files are not affected:

| System | Why Unaffected |
| --- | --- |
| Rankings Pages | Loads pre-calculated `rankings-{cp}.json` files |
| Training Analysis | Reads pre-aggregated `analysis/{cup}/{cp}.json` |
| Articles | Static content, not dynamically generated |

Sources: [src/gm-editor/index.php L81-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L81-L86)

### Technical Reason

The GameMaster singleton [GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton) loads either:

* Default `gamemaster.json` from server
* Custom gamemaster from `localStorage[settings.gamemaster]`

All runtime systems access data through this singleton, making them automatically respect the active gamemaster. Pre-calculated files are loaded directly by their respective interfaces, bypassing the GameMaster singleton entirely.

Sources: [src/gm-editor/index.php L68-L87](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L68-L87)

## Utility Functions

### GMEditorUtils Class

Static utility class providing reusable editor functionality:

**String Manipulation**:

* `StringToID(string, fieldName)` [src/js/devtools/gm-editor/GMEditorUtils.js L3-L12](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L3-L12) : Converts titles to IDs
* `RemoveSpecialCharacters(string)` [src/js/devtools/gm-editor/GMEditorUtils.js L14-L17](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L14-L17) : Sanitizes input

**Validation**:

* `ValidateGamemaster(entry)` [src/js/devtools/gm-editor/GMEditorUtils.js L20-L36](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L20-L36)
* `ValidatePokemonEntry(entry)` [src/js/devtools/gm-editor/GMEditorUtils.js L39-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L39-L86)
* `ValidateMoveEntry(entry)` [src/js/devtools/gm-editor/GMEditorUtils.js L89-L106](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L89-L106)
* `ValidateField(objectType, fieldName, value)` [src/js/devtools/gm-editor/GMEditorUtils.js L110-L276](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L110-L276)

**Display**:

* `DisplayEditableList(dataType, listItems)` [src/js/devtools/gm-editor/GMEditorUtils.js L282-L338](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L282-L338) : Renders lists with delete buttons

### Editable List Display

[src/js/devtools/gm-editor/GMEditorUtils.js L282-L338](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L282-L338)

 generates HTML for move/tag lists:

```

```

Supported data types:

* `fastMoves`, `chargedMoves`: Show move names with type coloring
* `eliteMoves`, `legacyMoves`: Show move names
* `learnset`: Show Pokemon names
* `tags`, `nicknames`: Show strings directly

Delete handling [src/js/devtools/gm-editor/GMEditorPokeInterface.js L516-L542](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L516-L542)

 is unified across all list types.

Sources: [src/js/devtools/gm-editor/GMEditorUtils.js L1-L378](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L1-L378)

## Implementation Notes

### Singleton Pattern

All interface classes use the Module/Singleton pattern [src/js/devtools/gm-editor/GMEditorInterface.js L3-L514](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L3-L514)

:

```

```

This ensures only one interface instance exists per page.

### URL Parameter Handling

Editors read URL parameters from global `get` object:

* Pokemon: `?p=charizard` loads Charizard for editing
* Move: `?m=DRAGON_CLAW` loads Dragon Claw
* Table: `?c=pokemon` or `?c=moves` determines category

Special value `?p=new` or `?m=new` creates a blank entry [src/js/devtools/gm-editor/GMEditorPokeInterface.js L96-L136](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L96-L136)

 [src/js/devtools/gm-editor/GMEditorMoveInterface.js L122-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L122-L150)

### Default Gamemaster Restrictions

When `settings.gamemaster == "gamemaster"` (default):

* Save and Delete buttons are removed [src/gm-editor/pokemon.php L29-L32](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php#L29-L32)
* Edit controls are hidden [src/js/devtools/gm-editor/GMEditorTableInterface.js L74-L79](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L74-L79)
* Prevents accidental modification of base data

Sources: [src/js/devtools/gm-editor/GMEditorPokeInterface.js L1-L625](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L1-L625)

 [src/js/devtools/gm-editor/GMEditorMoveInterface.js L1-L685](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L1-L685)

 [src/gm-editor/pokemon.php L29-L32](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php#L29-L32)