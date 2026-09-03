# Client-Side Storage

> **Relevant source files**
> * [src/css/themes/night.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css)
> * [src/css/themes/night.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css.map)
> * [src/css/themes/night.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss)
> * [src/data/gamemaster/validations.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json)
> * [src/footer.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php)
> * [src/gm-editor/edit.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/edit.php)
> * [src/gm-editor/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php)
> * [src/gm-editor/move.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/move.php)
> * [src/gm-editor/pokemon.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php)
> * [src/js/devtools/gm-editor/GMEditorInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js)
> * [src/js/devtools/gm-editor/GMEditorMoveInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js)
> * [src/js/devtools/gm-editor/GMEditorPokeInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js)
> * [src/js/devtools/gm-editor/GMEditorTableInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js)
> * [src/js/devtools/gm-editor/GMEditorUtils.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js)
> * [src/js/interface/Settings.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js)
> * [src/settings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php)

## Purpose and Scope

This document describes the client-side data persistence mechanisms used in PvPoke, including localStorage for custom game data and browser cookies for user preferences. It covers data structures, save/load patterns, validation, and migration strategies.

For information about the GameMaster singleton that manages custom gamemaster loading, see [GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton). For details on custom data editing interfaces, see [GameMaster Editor](/pvpoke/pvpoke/6.3-gamemaster-editor). For user settings configuration, see [User Settings and Themes](/pvpoke/pvpoke/7.3-user-settings-and-themes).

---

## Overview

PvPoke uses a two-tier client-side storage strategy:

| Storage Mechanism | Data Type | Persistence | Size Limit |
| --- | --- | --- | --- |
| **localStorage** | Custom gamemasters, custom groups, checklist state, training teams | Permanent (until cleared) | ~5-10MB |
| **Cookies** | User settings, theme, preferences | Permanent (server-synchronized) | ~4KB per cookie |

The separation allows for:

* Large, structured data (custom gamemasters) stored locally without server interaction
* Small, frequently-accessed settings synchronized with the server via cookies
* Migration paths between storage mechanisms (e.g., custom groups moved from cookies to localStorage)

Sources: [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

 [src/js/devtools/gm-editor/GMEditorInterface.js L22-L36](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L22-L36)

 [src/js/interface/Settings.js L48-L90](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L90)

---

## localStorage Architecture

```

```

**localStorage API Usage in PvPoke**

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L22-L36](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L22-L36)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L585-L606](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L585-L606)

 [src/js/devtools/gm-editor/GMEditorTableInterface.js L419-L421](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorTableInterface.js#L419-L421)

---

## Custom Gamemaster Storage

### Data Structure

Custom gamemasters are stored as JSON objects with the following schema:

```

```

**Key Naming Convention**: The `id` field serves as both the object property and the localStorage key. Valid IDs must:

* Be 3-64 characters long
* Contain only alphanumeric characters and underscores
* Not be "gamemaster" (reserved for default)
* Be unique across all custom gamemasters

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L46-L54](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L46-L54)

 [src/data/gamemaster/validations.json L3-L78](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json#L3-L78)

### Save/Load Flow

```

```

**Save Flow Implementation**

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L470-L481](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L470-L481)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L577-L610](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L577-L610)

### Custom Gamemaster Enumeration

Loading all custom gamemasters from localStorage:

[src/js/devtools/gm-editor/GMEditorInterface.js L19-L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L19-L44)

```

```

This pattern iterates through all localStorage keys, checks for the `dataType: "gamemaster"` field, and populates dropdown options. The same pattern is used in:

* [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)  - Settings page gamemaster selector
* [src/gm-editor/index.php L20-L23](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L20-L23)  - Main gamemaster editor page

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L19-L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L19-L44)

 [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

### Individual Entry Save Pattern

When editing a single Pokemon or Move:

[src/js/devtools/gm-editor/GMEditorPokeInterface.js L577-L610](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L577-L610)

```

```

**Key Pattern**: Always reload the full gamemaster from localStorage before saving to prevent overwriting concurrent changes from other tabs.

Sources: [src/js/devtools/gm-editor/GMEditorPokeInterface.js L577-L610](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L577-L610)

 [src/js/devtools/gm-editor/GMEditorMoveInterface.js L630-L667](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L630-L667)

### Deletion Flow

[src/js/devtools/gm-editor/GMEditorInterface.js L484-L499](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L484-L499)

```

```

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L484-L499](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L484-L499)

---

## Custom Groups Storage

Custom groups were migrated from cookies to localStorage in a one-time migration process.

### Migration Pattern

[src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

```

```

**Migration Trigger**: The `$performGroupMigration` flag is set server-side when cookies with the `custom_group` prefix are detected. After migration, the flag is cleared to prevent re-running.

Sources: [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

---

## Cookie-Based Settings

User preferences are stored in browser cookies and synchronized with the server via AJAX.

### Settings Data Structure

Settings stored in cookies:

| Setting | Type | Values | Default |
| --- | --- | --- | --- |
| `theme` | string | "default", "night" | "default" |
| `gamemaster` | string | "gamemaster", or custom GM ID | "gamemaster" |
| `performanceMode` | int | 0, 1 | 0 |
| `colorblindMode` | int | 0, 1 | 0 |
| `defaultIVs` | string | "gamemaster", "maximize" | "gamemaster" |
| `ads` | int | 0, 1 | 1 |
| `xls` | int | 0, 1 | 1 |
| `rankingDetails` | string | "one-page", "tabs" | "one-page" |
| `hardMovesetLinks` | int | 0, 1 | 0 |
| `pokeboxId` | int | User's Pokebattler ID | null |
| `pokeboxLastDateTime` | string | ISO datetime | null |

Sources: [src/settings.php L19-L97](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L19-L97)

 [src/js/interface/Settings.js L48-L90](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L90)

### Settings Save Flow

```

```

**Settings Save Implementation**

[src/js/interface/Settings.js L48-L91](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L91)

```

```

Sources: [src/js/interface/Settings.js L48-L91](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L91)

### Gamemaster Selection in Settings

The settings page loads custom gamemasters from localStorage to populate the dropdown:

[src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

```

```

When a user selects a different gamemaster and saves, the `gamemaster` setting is updated in the cookie, affecting all subsequent page loads.

Sources: [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

 [src/settings.php L34-L47](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L34-L47)

---

## Data Validation

All custom gamemaster data is validated before saving using a validation system defined in JSON.

### Validation Architecture

```

```

**Validation System Overview**

Sources: [src/js/devtools/gm-editor/GMEditorUtils.js L19-L106](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L19-L106)

 [src/data/gamemaster/validations.json L1-L408](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json#L1-L408)

### Validation Loading

[src/js/devtools/gm-editor/GMEditorUtils.js L342-L366](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L342-L366)

```

```

The `GMEditorValidations` object is populated with validation rules for three object types:

* `gamemaster` - Full gamemaster validation
* `pokemon` - Pokemon entry validation
* `move` - Move entry validation

Sources: [src/js/devtools/gm-editor/GMEditorUtils.js L342-L366](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L342-L366)

### Validation Execution

**Pokemon Entry Validation Example**:

[src/js/devtools/gm-editor/GMEditorUtils.js L38-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L38-L86)

```

```

**Key Validation Step**: Beyond field-level validation, Pokemon entries are tested by attempting to initialize them in all four CP leagues (500, 1500, 2500, 10000) to ensure they can be used in battles.

Sources: [src/js/devtools/gm-editor/GMEditorUtils.js L38-L86](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L38-L86)

### Validation Rule Types

[src/data/gamemaster/validations.json L80-L257](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json#L80-L257)

Example validation definition for Pokemon `speciesId`:

```

```

**Validation Types Implemented**:

| Type | Purpose | Example |
| --- | --- | --- |
| `required` | Field must exist and not be empty | All IDs, names |
| `string_min_length` | Minimum string length | `speciesId` min 3 chars |
| `string_max_length` | Maximum string length | `speciesId` max 64 chars |
| `number` | Must be numeric | Base stats |
| `number_min_value` | Minimum numeric value | `dex` >= 1 |
| `number_max_value` | Maximum numeric value | `energy` <= 100 |
| `integer` | Must be whole number | `dex`, `baseStats` |
| `unique_id` | ID must be unique in dataset | `speciesId`, `moveId` |
| `existing_id` | ID must exist in dataset | `aliasId` |
| `whitelist` | Value must be in allowed list | `buddyDistance` in [1,3,5,20] |
| `blacklist` | Value must not be in forbidden list | `speciesId` != "new" |
| `regex` | Must match regex pattern | `speciesId` alphanumeric + underscore |
| `type` | Must be valid Pokemon type | Move types |
| `types` | Array of two valid types | Pokemon types |
| `baseStats` | Valid baseStats object | atk/def/hp validation |
| `all_pokemon` | Validate all Pokemon in array | Full gamemaster validation |
| `all_moves` | Validate all moves in array | Full gamemaster validation |

Sources: [src/js/devtools/gm-editor/GMEditorUtils.js L109-L275](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L109-L275)

 [src/data/gamemaster/validations.json L1-L408](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/validations.json#L1-L408)

### UI Validation Feedback

Validation errors are displayed inline in the editor UI:

[src/js/devtools/gm-editor/GMEditorPokeInterface.js L302-L325](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L302-L325)

```

```

Errors are displayed immediately below the offending field, and the "Save Changes" button is disabled until all errors are resolved.

Sources: [src/js/devtools/gm-editor/GMEditorPokeInterface.js L302-L325](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L302-L325)

 [src/js/devtools/gm-editor/GMEditorMoveInterface.js L268-L290](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorMoveInterface.js#L268-L290)

---

## Storage Limits and Best Practices

### localStorage Quotas

Most browsers provide 5-10MB of localStorage per origin. PvPoke's usage:

| Data Type | Typical Size | Max Size |
| --- | --- | --- |
| Single custom gamemaster | 1-2MB | ~5MB |
| Custom group | <1KB | ~10KB |
| Checklist state | <1KB | ~5KB |
| Training teams | <10KB | ~50KB |

**Best Practice**: Users are limited to a small number of custom gamemasters (typically 2-3) to avoid quota issues.

### Cookie Limitations

Cookies have a 4KB limit per cookie and ~20 cookies per domain. PvPoke uses a single settings cookie to stay well within limits.

### Data Integrity Patterns

**Change Detection**:

[src/js/devtools/gm-editor/GMEditorUtils.js L368-L378](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L368-L378)

```

```

**Note**: Multi-tab change detection is commented out but shows the pattern for detecting when localStorage is modified in another tab.

Sources: [src/js/devtools/gm-editor/GMEditorUtils.js L368-L378](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorUtils.js#L368-L378)

**Dirty State Tracking**:

[src/js/devtools/gm-editor/GMEditorInterface.js L113-L123](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L113-L123)

```

```

The `lastSavedJSON` variable tracks the last saved state. Any changes enable the save button by comparing stringified JSON.

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L113-L123](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L113-L123)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L327-L337](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L327-L337)

---

## Import/Export System

All custom gamemasters support JSON export/import for sharing.

### Export Flow

Export code is automatically generated and displayed in a textarea:

[src/gm-editor/index.php L35-L42](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L35-L42)

```

```

The textarea is populated via `updateExportCode()` whenever data changes.

Sources: [src/gm-editor/index.php L35-L42](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/index.php#L35-L42)

 [src/gm-editor/pokemon.php L252-L259](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/pokemon.php#L252-L259)

 [src/gm-editor/move.php L191-L198](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/gm-editor/move.php#L191-L198)

### Import Flow

[src/js/devtools/gm-editor/GMEditorInterface.js L368-L390](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L368-L390)

```

```

**Import Process**:

1. Parse JSON from textarea
2. Validate full gamemaster structure
3. If valid, load into editor
4. If invalid, show error modal and revert to previous state

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L368-L390](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L368-L390)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js L559-L575](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js#L559-L575)

---

## Storage Key Naming Conventions

### localStorage Keys

| Pattern | Example | Purpose |
| --- | --- | --- |
| Custom GM ID | `gm-id-my_custom_meta` | Custom gamemaster data |
| Custom group name | `Custom Great League` | Custom group data (migrated) |
| Checklist key | `cd-article-123` | Community Day checklist state |
| Training teams | (varies) | Training team pools |

**Detection**: Custom gamemasters are identified by checking for `dataType: "gamemaster"` property rather than key pattern.

### Cookie Names

Settings are stored in a single cookie object accessed via `settings` global variable in JavaScript.

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js L22-L36](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js#L22-L36)

 [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

---

## Migration and Versioning

### Custom Group Migration

The one-time migration from cookies to localStorage:

**Migration Conditions**:

* Server detects `custom_group*` cookies
* Sets `$performGroupMigration` flag
* Footer script migrates data and flag is cleared

**Why Migrate**: Cookie size limitations (4KB) were insufficient for custom group data as features expanded.

Sources: [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

### Future Migration Considerations

While not currently implemented, the validation system could support schema versioning:

```

```

This would enable graceful upgrades when the gamemaster structure changes.

---

## Summary

PvPoke's client-side storage architecture provides:

1. **localStorage for structured data**: Custom gamemasters (1-5MB), custom groups, checklists, training teams
2. **Cookies for preferences**: Small settings synchronized with server
3. **Validation system**: JSON-defined rules enforce data integrity before saves
4. **Import/Export**: Full JSON export/import for sharing custom gamemasters
5. **Migration support**: One-time migrations (e.g., cookies → localStorage) when storage needs change

The dual storage approach balances performance (localStorage for large data), server synchronization (cookies for settings), and data portability (JSON import/export).

Sources: [src/js/devtools/gm-editor/GMEditorInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorInterface.js)

 [src/js/devtools/gm-editor/GMEditorPokeInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/devtools/gm-editor/GMEditorPokeInterface.js)

 [src/js/interface/Settings.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js)

 [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)