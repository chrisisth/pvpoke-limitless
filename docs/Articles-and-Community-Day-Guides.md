# Articles and Community Day Guides

> **Relevant source files**
> * [src/articles/articles.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/articles.json)
> * [src/articles/community-day/22-02-hoppip.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php)
> * [src/articles/community-day/22-03-sandshrew.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-03-sandshrew.php)
> * [src/articles/community-day/25-08-rookidee.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/25-08-rookidee.php)
> * [src/articles/community-day/25-09-flabebe.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/25-09-flabebe.php)
> * [src/articles/community-day/data/22-02-hoppip.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/data/22-02-hoppip.json)
> * [src/articles/community-day/data/22-03-sandshrew.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/data/22-03-sandshrew.json)
> * [src/articles/community-day/data/25-08-rookidee.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/data/25-08-rookidee.json)
> * [src/articles/community-day/data/25-09-flabebe.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/data/25-09-flabebe.json)
> * [src/articles/community-day/templates/checklist-template.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/templates/checklist-template.php)
> * [src/articles/infographics/22-03-great-league-meta-snapshot.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/infographics/22-03-great-league-meta-snapshot.php)
> * [src/css/article-extras.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.css)
> * [src/css/article-extras.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.css.map)
> * [src/css/article-extras.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss)
> * [src/js/interface/ArticleChecklist.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js)
> * [src/js/interface/ArticlesInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticlesInterface.js)
> * [src/modules/articlepreview.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/articlepreview.php)

## Purpose and Scope

The Articles System provides educational content for PvPoke users, with a specialized focus on **Community Day guides** featuring interactive IV (Individual Values) checklists. The system comprises two main subsystems: a metadata-driven article browsing interface and an interactive checklist tool that uses the core battle simulation engine to calculate CP values and track progress.

For information about the battle simulation engine used by the checklist calculations, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine). For details on GameMaster data lookup, see [GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton).

---

## System Architecture

### High-Level Data Flow

```

```

**Purpose**: This diagram shows how article metadata flows to the browsing interface, while Community Day specific data flows to the interactive checklist system with localStorage persistence.

Sources: [src/articles/articles.json L1-L306](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/articles.json#L1-L306)

 [src/js/interface/ArticlesInterface.js L1-L116](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticlesInterface.js#L1-L116)

 [src/js/interface/ArticleChecklist.js L1-L428](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L1-L428)

---

## Article Metadata System

### articles.json Schema

The [src/articles/articles.json L1-L306](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/articles.json#L1-L306)

 file defines metadata for all articles in the system:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Unique identifier (e.g., "25-09-flabebe") |
| `title` | string | Article display title |
| `description` | string | Brief summary for previews |
| `path` | string | Subdirectory ("community-day", "infographics", "strategy", "development") |
| `tags` | string[] | Categorization tags for filtering |
| `date` | string | Publication date (display format) |

Example entry:

```

```

Sources: [src/articles/articles.json L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/articles.json#L1-L10)

### Article Browsing Interface

```

```

**Purpose**: This diagram maps the ArticlesInterface.js controller methods to their responsibilities in the article browsing workflow.

The `ArticlesInterface` class implements search functionality at [src/js/interface/ArticlesInterface.js L56-L90](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticlesInterface.js#L56-L90)

 It filters articles by matching the search string against both the `title` field and all `tags` entries, with hashtags automatically stripped.

Sources: [src/js/interface/ArticlesInterface.js L19-L90](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticlesInterface.js#L19-L90)

### Article Preview Rendering

The `makeArticleItem()` function at [src/modules/articlepreview.php L16-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/articlepreview.php#L16-L43)

 generates preview cards by:

1. Cloning the `.article-item.template` element
2. Determining thumbnail path based on article `path` field
3. Populating title, date, description, and tags
4. Generating tag links with format `?tag={tagName}`

Sources: [src/modules/articlepreview.php L1-L45](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/articlepreview.php#L1-L45)

---

## Community Day Checklist System

### Data Structure

Community Day data files follow a consistent schema at `src/articles/community-day/data/{articleId}.json`:

```

```

**Field Definitions**:

| Field | Type | Description |
| --- | --- | --- |
| `species` | object[] | Available Pokemon in evolution line |
| `species[].speciesId` | string | Pokemon identifier from GameMaster |
| `species[].baseSpeciesId` | string | Base form for CP calculation |
| `species[].default` | boolean | Default selection in editor |
| `checklist[].title` | string | Display name for checklist entry |
| `checklist[].league` | string | "great", "ultra", "master", "special" |
| `checklist[].cp` | number | CP cap (1500, 2500, 10000, 500) |
| `checklist[].ivs` | number[] | [level, attack, defense, hp] |
| `checklist[].priority` | number | 1-3 (Priority, Nice to Have, Extra Mile) |
| `checklist[].caught` | number | 0 or 1, tracking state |

Sources: [src/articles/community-day/data/22-02-hoppip.json L1-L47](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/data/22-02-hoppip.json#L1-L47)

 [src/articles/community-day/data/22-03-sandshrew.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/data/22-03-sandshrew.json#L1-L100)

### ArticleChecklist Controller Architecture

```

```

**Purpose**: This diagram shows the ArticleChecklist controller's core methods and their interactions with the battle engine and persistence layer.

Sources: [src/js/interface/ArticleChecklist.js L13-L414](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L13-L414)

### Checklist Item Lifecycle

**1. Initialization** ([src/js/interface/ArticleChecklist.js L26-L45](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L26-L45)

):

* Loads JSON from `webRoot+"articles/community-day/data/"+articleId+".json"`
* Checks for localStorage override at key `"cd-" + articleId`
* Uses stored data if available, otherwise defaults to JSON

**2. Display** ([src/js/interface/ArticleChecklist.js L49-L109](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L49-L109)

):

* Sorts items by selected field (priority, cp, speciesId, caught)
* Clones `.checklist-item.template` for each entry
* Populates: * Title and league icon * IV values as progress bars at [src/js/interface/ArticleChecklist.js L73-L75](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L73-L75) * Priority tier (1-3) mapped to display strings at [src/js/interface/ArticleChecklist.js L20](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L20-L20) * Base form CP via `calculateBaseCP()` * Caught state (visual opacity change)

**3. CP Calculation** ([src/js/interface/ArticleChecklist.js L119-L133](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L119-L133)

):

The `calculateBaseCP()` method:

1. Creates a `Battle` instance with the target CP league
2. Instantiates a `Pokemon` with the base species ID
3. Sets level and IV values from checklist data
4. Returns the calculated CP property

This integrates the core battle system to provide accurate CP calculations for unevolved forms.

**4. State Persistence** ([src/js/interface/ArticleChecklist.js L111-L117](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L111-L117)

):

* Stringifies current data object
* Stores to `localStorage` with key `storageKey = "cd-" + articleId`
* Called after: check toggle, add, edit, delete, reset operations

Sources: [src/js/interface/ArticleChecklist.js L26-L133](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L26-L133)

### Checklist UI Template

The checklist template at [src/articles/community-day/templates/checklist-template.php L1-L137](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/templates/checklist-template.php#L1-L137)

 defines:

**Controls Section** ([src/articles/community-day/templates/checklist-template.php L2-L20](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/templates/checklist-template.php#L2-L20)

):

* Sort dropdown (priority, cp, speciesId, caught)
* Edit mode toggle button
* Reset button (edit mode only)

**Item Template** ([src/articles/community-day/templates/checklist-template.php L24-L70](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/templates/checklist-template.php#L24-L70)

):

* Checkbox for caught state
* Title and league icon display
* Three IV progress bars (Attack/Defense/HP)
* Base form sprite and CP
* Priority badge
* Info/Edit/Delete controls (edit mode only)

**Modal Forms** ([src/articles/community-day/templates/checklist-template.php L74-L136](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/templates/checklist-template.php#L74-L136)

):

* Reset confirmation dialog
* Delete confirmation dialog
* New/Edit item form with fields: * Title (text input, max 64 chars) * Species (dropdown populated from data.species) * League (dropdown: Little/Great/Ultra/Master) * Priority (dropdown: 1-3) * IVs (three number inputs, 0-15 range) * Notes (textarea)

Sources: [src/articles/community-day/templates/checklist-template.php L1-L137](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/templates/checklist-template.php#L1-L137)

### Edit Mode Operations

**Item Validation** ([src/js/interface/ArticleChecklist.js L261-L297](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L261-L297)

):

The `validateItemForm()` method checks:

* Title is not empty
* All three IV inputs have values
* IV values are integers (modulo 1 check)
* IV values are in range 0-15
* Applies `.invalid` class to failing inputs

**Add/Edit Flow** ([src/js/interface/ArticleChecklist.js L202-L259](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L202-L259)

):

When saving an item:

1. Validates form inputs
2. Reads species, league, priority from selects
3. Reads IVs from three number inputs at [src/js/interface/ArticleChecklist.js L212-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L212-L214)
4. Creates Battle with selected CP
5. Creates Pokemon to calculate level via `autoLevel` at [src/js/interface/ArticleChecklist.js L220-L223](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L220-L223)
6. Unshifts level onto IV array at [src/js/interface/ArticleChecklist.js L225](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L225-L225)
7. Builds item object with all fields
8. Either pushes to checklist array (new) or replaces at index (edit)
9. Preserves `caught` attribute if editing at [src/js/interface/ArticleChecklist.js L249-L251](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L249-L251)

**Delete Operation** ([src/js/interface/ArticleChecklist.js L362-L382](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L362-L382)

):

* Shows confirmation modal with item title
* On confirm, splices item from checklist array
* Saves and re-displays list

Sources: [src/js/interface/ArticleChecklist.js L161-L382](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L161-L382)

---

## Storage and Persistence

### localStorage Schema

```

```

**Purpose**: This diagram shows the localStorage key naming pattern and the data structure stored for each Community Day article.

Each article stores a complete copy of its data structure, allowing:

* User customizations (added items, edited IVs)
* Progress tracking (caught flags)
* Independent state per article
* Reset to defaults via `defaultData` reference

The storage key pattern `"cd-" + articleId` is defined at [src/js/interface/ArticleChecklist.js L24](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L24-L24)

Sources: [src/js/interface/ArticleChecklist.js L24-L45](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L24-L45)

 [src/js/interface/ArticleChecklist.js L111-L117](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L111-L117)

---

## Styling and Theming

### Pokemon-Specific Themes

The [src/css/article-extras.scss L740-L1182](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L740-L1182)

 file defines unique color schemes for each Community Day Pokemon:

```

```

Each theme controls:

* Background gradients
* Border colors
* Header section backgrounds
* Feature section colors
* FAQ backgrounds

Theme classes are applied to the article container via PHP at [src/articles/community-day/22-02-hoppip.php L14](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L14-L14)

:

```

```

Sources: [src/css/article-extras.scss L740-L1182](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L740-L1182)

 [src/articles/community-day/22-02-hoppip.php L14](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L14-L14)

### Checklist Item Styling

**Priority Colors** ([src/css/article-extras.scss L317-L334](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L317-L334)

):

| Priority | Background | Usage |
| --- | --- | --- |
| 1 | `#ebd19a` (gold) | Must-have Pokemon |
| 2 | `#add0ed` (blue) | Nice to have |
| 3 | `#c3a49a` (bronze) | Extra mile/collectors |

**Caught State** ([src/css/article-extras.scss L308-L316](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L308-L316)

):

* Reduces opacity to 0.5 for all content except checkbox
* Changes border from solid black to `rgba(0,0,0,0.1)`
* Preserves title visibility for quick scanning

**League Icons** ([src/css/article-extras.scss L397-L414](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L397-L414)

):

League icons are rendered as background images:

* `.league.great` - Great League icon
* `.league.ultra` - Ultra League icon
* `.league.master` - Master League icon
* `.league.special` - Special League (Little Cup) icon

Sources: [src/css/article-extras.scss L295-L571](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L295-L571)

### Responsive Layout

**Mobile (< 421px)** ([src/css/article-extras.scss L295-L304](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L295-L304)

):

* Checklist items at 100% width (full screen)
* Single column layout

**Tablet (421px - 727px)** ([src/css/article-extras.scss L1203-L1233](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L1203-L1233)

):

* Two column grid (48.5% each with 3% gap)
* Larger headers and text

**Desktop (≥ 728px)** ([src/css/article-extras.scss L1235-L1259](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L1235-L1259)

):

* Three column grid (31.5% each with 2.75% gap)
* Maximum visual density

Sources: [src/css/article-extras.scss L1201-L1259](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L1201-L1259)

---

## Community Day Article Structure

### PHP Article Template Pattern

Every Community Day article follows this structure:

**1. Metadata** ([src/articles/community-day/22-02-hoppip.php L3-L9](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L3-L9)

):

```

```

**2. Header Include** ([src/articles/community-day/22-02-hoppip.php L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L10-L10)

)

**3. Article Container with Pokemon Class** ([src/articles/community-day/22-02-hoppip.php L14](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L14-L14)

):

```

```

**4. Overview Section** ([src/articles/community-day/22-02-hoppip.php L20-L38](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L20-L38)

):

* Event date and time
* Exclusive move(s)
* Event bonuses

**5. Checklist Section** ([src/articles/community-day/22-02-hoppip.php L40-L43](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L40-L43)

):

```

```

**6. Mega Evolution Suggestions** ([src/articles/community-day/22-02-hoppip.php L45-L72](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L45-L72)

):

* Mega Pokemon that share types
* Bonus candy benefits

**7. FAQ Section** ([src/articles/community-day/22-02-hoppip.php L74-L104](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L74-L104)

):

* Meta analysis
* Common questions

**8. Resources Links** ([src/articles/community-day/22-02-hoppip.php L106-L113](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L106-L113)

):

**9. Scripts** ([src/articles/community-day/22-02-hoppip.php L125-L136](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L125-L136)

):

```

```

Loads:

* `GameMaster.js` - Data access
* `Pokemon.js` - CP calculations
* `ModalWindow.js` - UI dialogs
* `ArticleChecklist.js` - Checklist controller
* `Battle.js` - Simulation engine

**10. Footer Include** ([src/articles/community-day/22-02-hoppip.php L138](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L138-L138)

)

Sources: [src/articles/community-day/22-02-hoppip.php L1-L139](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/22-02-hoppip.php#L1-L139)

 [src/articles/community-day/25-08-rookidee.php L1-L119](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/community-day/25-08-rookidee.php#L1-L119)

---

## Integration with Core Systems

### Battle Engine Integration

The checklist system uses the core battle engine for CP calculations:

```

```

**Purpose**: This diagram shows how the checklist system leverages the battle engine's CP calculation logic rather than reimplementing it.

The `calculateBaseCP()` method at [src/js/interface/ArticleChecklist.js L119-L133](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L119-L133)

 demonstrates this integration:

1. Creates a Battle context with the target league CP
2. Instantiates a Pokemon with base species (unevolved form)
3. Sets level capped at 30 (typical catch level)
4. Sets IVs from checklist data
5. Returns the Pokemon's computed `cp` property

This ensures checklist CP values match what users see in-game and in other PvPoke tools.

Sources: [src/js/interface/ArticleChecklist.js L119-L133](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L119-L133)

### GameMaster Data Loading

The `ArticleChecklist` interface relies on GameMaster for:

* Species lookups (name, stats)
* CP multiplier tables
* Evolution families

The `ArticlesInterface` uses `GameMaster.loadArticleData()` to fetch the articles.json metadata at [src/js/interface/ArticlesInterface.js L21](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticlesInterface.js#L21-L21)

Sources: [src/js/interface/ArticleChecklist.js L18](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L18-L18)

 [src/js/interface/ArticlesInterface.js L21](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticlesInterface.js#L21-L21)

---

## Additional Features

### Feature Displays

The `.cd-features` component ([src/css/article-extras.scss L22-L48](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L22-L48)

) displays event details in a flex layout:

* Date & time
* Exclusive moves
* Event bonuses (stardust, candy, hatch distance)

### Mega Evolution Section

The `.mega-section` component ([src/css/article-extras.scss L52-L101](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L52-L101)

) highlights relevant Mega Pokemon:

* Mega icon graphic
* Species sprites in circular frames
* Recommendations for bonus candy during event

### FAQ Sections

The `.faq-item` component ([src/css/article-extras.scss L255-L274](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L255-L274)

) provides:

* Collapsible question headers
* Detailed answer content
* Meta analysis and strategic advice

### Article Notes

The `.article-note` component ([src/css/article-extras.scss L662-L735](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L662-L735)

) supports:

* General informational callouts
* Quote boxes with attribution
* Scrollable content for long excerpts

Sources: [src/css/article-extras.scss L1-L735](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L1-L735)

---

## Summary

The Articles and Community Day system provides:

1. **Metadata-Driven Architecture**: Articles defined in JSON, rendered dynamically
2. **Interactive IV Checklists**: Track catches with progress persistence
3. **Battle Engine Integration**: Accurate CP calculations via core Pokemon class
4. **localStorage Persistence**: Per-article state with reset capability
5. **Customizable Checklists**: Add, edit, delete entries with validation
6. **Themed Styling**: Pokemon-specific color schemes and responsive layouts
7. **Search & Discovery**: Tag-based filtering and title search

The system demonstrates effective separation of concerns between content (JSON), presentation (PHP/CSS), and behavior (JavaScript controllers), while leveraging the core battle simulation engine for accuracy.

Sources: [src/articles/articles.json L1-L306](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/articles/articles.json#L1-L306)

 [src/js/interface/ArticleChecklist.js L1-L428](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/ArticleChecklist.js#L1-L428)

 [src/css/article-extras.scss L1-L1259](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/article-extras.scss#L1-L1259)