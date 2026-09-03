# User Settings and Themes

> **Relevant source files**
> * [src/css/themes/night.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css)
> * [src/css/themes/night.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css.map)
> * [src/css/themes/night.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss)
> * [src/footer.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php)
> * [src/js/interface/Settings.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js)
> * [src/settings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php)

## Purpose and Scope

This document covers the user settings system and theming functionality in PvPoke. User settings control visual appearance, performance optimizations, default behaviors, and integration with external services like Pokebattler's Pokebox. Settings are persisted via browser cookies and accessed globally across the application through the `$_SETTINGS` PHP object.

For information about custom game data editing, see [GameMaster Editor](/pvpoke/pvpoke/6.3-gamemaster-editor). For information about custom meta definitions and groups, see [Groups and Meta Definitions](/pvpoke/pvpoke/7.1-groups-and-meta-definitions).

**Sources:** [src/settings.php L1-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L1-L109)

## Settings Architecture Overview

```

```

**Settings Flow Diagram**

The settings system follows a client-server persistence model where user preferences are captured in the UI, serialized via AJAX, stored in browser cookies, and then reloaded on every page request through `header.php`. Custom gamemasters are stored separately in localStorage and dynamically loaded into the gamemaster dropdown.

**Sources:** [src/settings.php L1-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L1-L109)

 [src/js/interface/Settings.js L1-L121](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L1-L121)

 [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)

## Available Settings

The following table documents all user-configurable settings available in PvPoke:

| Setting | Type | Options | Default | Description |
| --- | --- | --- | --- | --- |
| **theme** | Dropdown | `default`, `night` | `default` | Visual theme for the site |
| **gamemaster** | Dropdown | `gamemaster` + custom | `gamemaster` | Active Pokemon/move data version |
| **pokeboxId** | Text Input | Integer | Empty | Pokebattler account ID for Pokebox integration |
| **performanceMode** | Checkbox | `0`, `1` | `0` | Disables CPU-intensive features (animations, suggestions) |
| **colorblindMode** | Checkbox | `0`, `1` | `0` | High-contrast colors for battle ratings |
| **ads** | Checkbox | `0`, `1` | `1` | Show/hide advertisements |
| **xls** | Checkbox | `0`, `1` | `1` | Show Pokemon over Level 40 in rankings |
| **defaultIVs** | Dropdown | `gamemaster`, `maximize` | `gamemaster` | Default IV strategy for Pokemon selection |
| **rankingDetails** | Dropdown | `one-page`, `tabs` | `one-page` | Layout for ranking detail pages |
| **hardMovesetLinks** | Checkbox | `0`, `1` | `0` | Bake move IDs into battle URLs (for article writers) |

**Sources:** [src/settings.php L19-L97](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L19-L97)

## Settings Page Interface

### UI Structure

The settings page is implemented as a PHP template with form controls:

```

```

**Settings Page DOM Structure**

Each setting is rendered with its current value pre-selected using PHP conditional logic. For example, the theme dropdown at [src/settings.php L20-L32](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L20-L32)

 checks `$_SETTINGS->theme` and marks the appropriate option as selected.

**Sources:** [src/settings.php L14-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L14-L100)

### JavaScript Interactions

The `Settings.js` module manages user interactions:

```

```

**Settings.js Event Flow**

The `interfaceObject.init()` function at [src/js/interface/Settings.js L13-L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L13-L44)

 sets up event listeners and loads custom gamemasters from localStorage. The `checkBox()` function at [src/js/interface/Settings.js L95-L105](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L95-L105)

 toggles checkbox states and immediately applies colorblind mode by adding/removing the `colorblind` class to the body element.

The `saveSettings()` function at [src/js/interface/Settings.js L48-L91](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L91)

 collects all form values and POSTs them to `settingsCookie.php`:

**Sources:** [src/js/interface/Settings.js L1-L121](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L1-L121)

### Custom Gamemaster Loading

Custom gamemasters stored in localStorage are dynamically added to the gamemaster dropdown:

```

```

**Custom Gamemaster Loading Flow**

The loading logic at [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

 iterates through all localStorage keys, parses each as JSON, and checks for a `dataType` field equal to `"gamemaster"`. Valid custom gamemasters are appended to the dropdown with their `title` as the display text and `id` as the value.

**Sources:** [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

## Theme System

### SCSS Architecture

PvPoke uses SCSS for theme styling with a variable-based color system. The night theme demonstrates the architecture:

```

```

**Night Theme SCSS Structure**

The night theme SCSS file at [src/css/themes/night.scss L1-L466](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L1-L466)

 defines color variables at the top (lines 3-10) and applies them throughout the stylesheet. Key color variables include:

* `$color-blue-dark` (#003462): Primary interactive elements
* `$dark` (#080c10): Panel backgrounds
* `$font-color` (#f9fdff): Text color
* `$link-color` (#3eca9f): Links and accents

**Sources:** [src/css/themes/night.scss L1-L466](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L1-L466)

### Theme-Specific Assets

Themes include custom images and backgrounds:

| Asset Type | Default | Night Theme |
| --- | --- | --- |
| Background | `sunflower-bg.jpg` | `sunflower-bg-night.jpg` |
| Battle Background | Standard | `themes/night/pvp-background.jpg` |
| Nav Icons | Black | White versions (`nav-battle-white.png`) |
| Matrix Header | Light | Dark (`matrix-arrow-header-dark.png`) |
| Eye Icon | Black | White (`eye-white.png`) |

Theme-specific images are referenced in the SCSS using relative paths. For example, the night theme sets the battle background at [src/css/themes/night.scss L293](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L293-L293)

:

**Sources:** [src/css/themes/night.scss L14](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L14-L14)

 [src/css/themes/night.scss L129-L146](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L129-L146)

 [src/css/themes/night.scss L293](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L293-L293)

 [src/css/themes/night.scss L390](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L390-L390)

 [src/css/themes/night.scss L426](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.scss#L426-L426)

### Theme Application

Themes are loaded conditionally based on the user's settings:

```

```

**Theme Loading Flow**

The theme CSS is loaded in `header.php` based on the `$_SETTINGS->theme` value. The appropriate stylesheet is included in the HTML `<head>` section, applying all theme-specific styles globally.

**Sources:** [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)

 [src/css/themes/night.css L1-L424](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/themes/night.css#L1-L424)

## Settings Persistence

### Cookie Storage

User settings are persisted to browser cookies via the `settingsCookie.php` endpoint:

```

```

**Settings Cookie Persistence Flow**

When the user clicks "Save Settings", the `saveSettings()` function at [src/js/interface/Settings.js L48-L91](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L48-L91)

 collects all form values and sends them via AJAX POST to `settingsCookie.php`. The PHP script serializes the data to JSON and sets a browser cookie named `settings`. On subsequent page loads, `header.php` reads this cookie and deserializes it into the `$_SETTINGS` PHP object.

**Sources:** [src/js/interface/Settings.js L62-L90](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L62-L90)

### localStorage for Custom Data

Custom gamemasters are stored separately in browser localStorage rather than cookies due to size constraints:

```

```

**localStorage Gamemaster Structure**

Custom gamemasters must include a `dataType` field set to `"gamemaster"`, along with `id` and `title` fields for identification and display. The validation logic at [src/js/interface/Settings.js L28-L37](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L28-L37)

 checks these fields before adding the gamemaster to the dropdown.

**Sources:** [src/js/interface/Settings.js L18-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L18-L43)

### Data Migration

The footer includes one-time migration logic for moving custom groups from cookies to localStorage:

```

```

**Custom Group Migration Flow**

The migration logic at [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

 checks if `$performGroupMigration` is true, then iterates through all cookies to find those with keys containing `'custom_group'`. For each match, it outputs JavaScript that pushes the data into an array, which is then migrated to localStorage client-side.

**Sources:** [src/footer.php L119-L143](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/footer.php#L119-L143)

## Integration with Application Features

### Performance Mode Impact

When `performanceMode` is enabled (`$_SETTINGS->performanceMode == 1`), the following features are disabled:

| Feature | Location | Impact |
| --- | --- | --- |
| Timeline Animations | Battle page | Disables animation of fast move timeline |
| Suggested Teammates | Rankings page | Hides recommended team partners |
| Similar Pokemon | Rankings page | Hides alternative Pokemon suggestions |

Performance mode is checked in various JavaScript modules to conditionally disable CPU-intensive calculations and DOM updates.

**Sources:** [src/settings.php L54-L55](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L54-L55)

### Colorblind Mode

Colorblind mode increases contrast for battle ratings and adds visual symbols:

```

```

**Colorblind Mode Application**

The colorblind mode checkbox immediately applies changes by adding the `colorblind` class to the `<body>` element at [src/js/interface/Settings.js L98-L103](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L98-L103)

 CSS rules targeting `body.colorblind` provide higher contrast styles throughout the application.

**Sources:** [src/js/interface/Settings.js L98-L104](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L98-L104)

 [src/settings.php L58-L70](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L58-L70)

### Default IV Strategy

The `defaultIVs` setting controls which IV spread is used when selecting Pokemon:

* **`gamemaster`** (default): Uses "typical" IVs around rank 500, representing average player resources
* **`maximize`**: Uses optimal IV spreads for maximum stat product (rank 1)

This setting affects Pokemon initialization in:

* Single Battle mode
* Multi Battle mode (user's team only)
* Team Builder (user's team only)

Opponents in Multi Battle and Team Builder always use typical IVs regardless of this setting.

**Sources:** [src/settings.php L80-L85](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L80-L85)

### Pokebox Integration

The `pokeboxId` setting links PvPoke to a user's Pokebattler account:

```

```

**Pokebox Integration Flow**

When a `pokeboxId` is configured, the Pokebox integration allows users to import their actual Pokemon from Pokebattler's database, including real IV spreads and levels. This feature is accessible from Pokemon selection interfaces throughout the site.

**Sources:** [src/settings.php L49-L51](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L49-L51)

### XL Pokemon Toggle

The `xls` setting controls visibility of Pokemon over Level 40:

* **Enabled** (default): Shows all Pokemon including those requiring XL Candy
* **Disabled**: Filters out Pokemon above Level 40 from primary views

This setting affects:

* Rankings page display
* Team Builder results
* Battle simulation Pokemon selection

Users can still temporarily toggle XL Pokemon on individual pages regardless of this setting.

**Sources:** [src/settings.php L76-L78](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L76-L78)

## Settings Access Patterns

### Server-Side Access

Settings are accessed in PHP templates via the `$_SETTINGS` object:

```

```

The `$_SETTINGS` object is populated in `header.php` by deserializing the `settings` cookie.

**Sources:** [src/settings.php L23-L25](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L23-L25)

 [src/settings.php L54](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L54-L54)

 [src/settings.php L59](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/settings.php#L59-L59)

### Client-Side Access

Settings are accessed in JavaScript via the global `settings` object:

```

```

The `settings` object is initialized in `header.php` and made available globally to all JavaScript modules.

**Sources:** [src/js/interface/Settings.js L34-L36](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L34-L36)

 [src/js/interface/Settings.js L73](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Settings.js#L73-L73)