# Data Management

> **Relevant source files**
> * [src/css/themes/night.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css)
> * [src/css/themes/night.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css.map)
> * [src/css/themes/night.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss)
> * [src/data/groups/championshipseries.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json)
> * [src/data/groups/great.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json)
> * [src/data/overrides/all/10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json)
> * [src/footer.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php)
> * [src/js/interface/Settings.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js)
> * [src/settings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php)

## Purpose and Scope

This page provides an overview of PvPoke's data configuration systems: groups, overrides, and user settings. These systems allow customization of Pokemon movesets, editorial curation of rankings, and user-specific preferences. For detailed information about each subsystem, see:

* Groups and Meta Definitions ([#7.1](/pvpoke/pvpoke/7.1-groups-and-meta-definitions))
* Overrides System ([#7.2](/pvpoke/pvpoke/7.2-overrides-system))
* User Settings and Themes ([#7.3](/pvpoke/pvpoke/7.3-user-settings-and-themes))

For information about the core game data (Pokemon and move stats), see GameMaster Singleton ([#3.4](/pvpoke/pvpoke/3.4-gamemaster-singleton)).

---

## Data Configuration Architecture

PvPoke employs three complementary configuration systems that operate at different layers of the application:

```

```

**Sources:** [src/data/groups/great.json L1-L216](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L1-L216)

 [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

 [src/settings.php L1-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L1-L109)

 [src/js/interface/Settings.js L1-L121](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L1-L121)

---

## System Roles

| System | Purpose | Scope | Storage Location | Mutability |
| --- | --- | --- | --- | --- |
| **Groups** | Define meta-specific Pokemon movesets for competitive formats | League/cup-level | `src/data/groups/*.json` | Static (can be overridden via localStorage) |
| **Overrides** | Provide editorial recommendations, weights, and annotations for rankings | Per-league rankings | `src/data/overrides/all/*.json` | Static |
| **Settings** | Store user preferences for theme, gamemaster, and display options | User-level | Browser cookies + localStorage | Dynamic |
| **Themes** | Define visual appearance (colors, fonts, backgrounds) | Site-wide | `src/css/themes/*.css` | Static (selected dynamically) |

**Sources:** [src/data/groups/great.json L1-L216](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L1-L216)

 [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

 [src/settings.php L1-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L1-L109)

---

## Groups System

Groups define the "meta" for specific competitive formats by specifying which Pokemon should use which movesets. Each group file contains an array of Pokemon configurations with recommended fast moves and charged moves.

### Structure

Groups are JSON arrays stored at `src/data/groups/{format}.json`:

* `great.json` - Great League (1500 CP)
* `ultra.json` - Ultra League (2500 CP)
* `master.json` - Master League (10000 CP)
* `championshipseries.json` - Championship Series format
* Custom groups stored in `localStorage`

### Example Entry

```

```

**Shadow Pokemon** are identified by a `shadowType` property:

```

```

Groups determine which Pokemon appear in rankings and with which movesets. For complete details, see Groups and Meta Definitions ([#7.1](/pvpoke/pvpoke/7.1-groups-and-meta-definitions)).

**Sources:** [src/data/groups/great.json L1-L216](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L1-L216)

 [src/data/groups/championshipseries.json L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json#L1-L200)

---

## Overrides System

Overrides provide editorial curation for rankings, including recommended movesets, weights (usage frequency), editor scores, and notes. Unlike groups, overrides include metadata that influences how Pokemon are displayed and ranked.

### Structure

Overrides are stored as JSON arrays at `src/data/overrides/all/{cp}.json` where `cp` is the league CP limit (1500, 2500, 10000, etc.).

### Example Entry

```

```

### Key Properties

| Property | Type | Purpose |
| --- | --- | --- |
| `speciesId` | string | Pokemon identifier |
| `fastMove` | string | Recommended fast move |
| `chargedMoves` | array | Recommended charged moves (up to 2) |
| `weight` | number | Usage frequency/meta relevance (1-42 scale) |
| `editorScore` | number | Editorial rating (0-100) |
| `editorNotes` | string | Strategic analysis and commentary |

The `weight` property determines visual prominence in rankings (larger bubbles, higher listing). For complete details, see Overrides System ([#7.2](/pvpoke/pvpoke/7.2-overrides-system)).

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## User Settings and Themes

Settings control user-specific preferences including theme selection, gamemaster version, performance options, and display preferences. Settings are persisted via browser cookies with custom gamemasters stored in `localStorage`.

### Settings Architecture

```

```

**Sources:** [src/settings.php L1-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L1-L109)

 [src/js/interface/Settings.js L1-L121](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L1-L121)

### Available Settings

| Setting | Cookie Key | Type | Default | Purpose |
| --- | --- | --- | --- | --- |
| Theme | `theme` | string | `"default"` | Visual appearance (default/night) |
| Gamemaster | `gamemaster` | string | `"gamemaster"` | Data version to use |
| Performance Mode | `performanceMode` | boolean | `false` | Disable CPU-intensive features |
| Colorblind Mode | `colorblindMode` | boolean | `false` | High-contrast battle ratings |
| Show XL Pokemon | `xls` | boolean | `true` | Include Level 40+ Pokemon |
| Show Ads | `ads` | boolean | `true` | Display advertisements |
| Default IVs | `defaultIVs` | string | `"gamemaster"` | IV selection strategy |
| Ranking Details | `rankingDetails` | string | `"one-page"` | Display format (one-page/tabs) |
| Hard Moveset Links | `hardMovesetLinks` | boolean | `false` | Bake move IDs into URLs |
| Pokebox ID | `pokeboxId` | integer | `null` | Pokebattler integration |

**Sources:** [src/settings.php L20-L96](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L20-L96)

 [src/js/interface/Settings.js L48-L91](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L91)

### Theme System

PvPoke supports multiple visual themes defined in SCSS and compiled to CSS. Each theme defines color schemes, backgrounds, and styling for all UI elements.

#### Theme Structure

Themes are stored at `src/css/themes/{name}.scss` and compiled to `{name}.css`:

* `default.scss` - Default light theme
* `night.scss` - Dark theme

#### Theme Variables (Night Theme Example)

```

```

Theme selection is handled by the settings system, which applies the appropriate CSS file based on the `theme` cookie value.

For complete details on settings and themes, see User Settings and Themes ([#7.3](/pvpoke/pvpoke/7.3-user-settings-and-themes)).

**Sources:** [src/css/themes/night.scss L1-L466](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L1-L466)

 [src/css/themes/night.css L1-L424](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css#L1-L424)

 [src/settings.php L20-L32](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L20-L32)

---

## Storage Architecture

Data configuration uses a multi-tier storage system combining static files, browser storage, and server-side persistence:

```

```

**Sources:** [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

 [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

 [src/settings.php L23-L46](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L23-L46)

### localStorage Contents

The `localStorage` API stores three types of custom data:

#### Custom Gamemasters

```

```

#### Custom Groups

```

```

#### Community Day Checklists

```

```

**Sources:** [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

 [src/footer.php L122-L141](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L122-L141)

### Cookie Migration

PvPoke previously stored custom groups in cookies but migrated to `localStorage` for better capacity. The migration code runs once per user:

```

```

**Sources:** [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

---

## Data Flow and Consumption

Configuration data flows from storage through initialization layers into the application components:

```

```

**Sources:** [src/js/interface/Settings.js L48-L91](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L91)

 [src/settings.php L1-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L1-L109)

 [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

### Initialization Order

1. **Server-side (header.php)** * Read cookies into `$_SETTINGS` object * Select theme CSS file * Inject settings into page
2. **Client-side (Settings.js)** * Read `localStorage` for custom gamemasters * Populate UI dropdowns * Bind event handlers
3. **Data loading (GameMaster.js)** * Read `settings.gamemaster` to determine data source * Load groups file for current league/cup * Load overrides file for current league * Merge with custom data from `localStorage` if applicable
4. **Application layer** * Battle engine uses configured Pokemon movesets * Rankings display uses override weights and notes * UI respects theme and display preferences

**Sources:** [src/settings.php L1-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L1-L109)

 [src/js/interface/Settings.js L13-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L13-L43)

---

## Configuration Priority

When multiple configuration sources provide conflicting data, the system follows this priority order (highest to lowest):

1. **Custom gamemasters** (localStorage) - User-defined Pokemon/move data
2. **Custom groups** (localStorage) - User-defined movesets for specific formats
3. **Static groups** (groups/*.json) - Default meta-specific movesets
4. **Overrides** (overrides/*.json) - Editorial recommendations (rankings only)
5. **GameMaster** (gamemaster.json) - Base Pokemon and move data

This allows users to override any default configuration while maintaining fallbacks to official data.

**Sources:** [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

---

## Integration with Core Systems

### Battle System Integration

The battle engine ([#3](/pvpoke/pvpoke/3-core-battle-system)) consumes configuration data through the GameMaster singleton:

* **Groups** determine default movesets when Pokemon are selected
* **Settings** control which gamemaster version is loaded
* **Custom gamemasters** can modify Pokemon stats, types, and available moves

### Rankings Integration

The rankings system ([#4](/pvpoke/pvpoke/4-rankings-system)) uses all three configuration layers:

* **Groups** define which Pokemon appear in each league's rankings
* **Overrides** provide weights, scores, and editorial notes
* **Settings** control XL Pokemon visibility and ranking detail display

### Training System Integration

The training system ([#5](/pvpoke/pvpoke/5-training-system)) respects configuration data:

* **Groups** determine AI team compositions
* **Settings** (performanceMode) can affect training features
* **Custom gamemasters** affect battle outcomes

**Sources:** [src/settings.php L54-L78](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L54-L78)