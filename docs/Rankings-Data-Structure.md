# Rankings Data Structure

> **Relevant source files**
> * [src/data/overrides/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json)
> * [src/data/rankings/all/attackers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json)
> * [src/data/rankings/all/chargers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json)
> * [src/data/rankings/all/closers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json)
> * [src/data/rankings/all/consistency/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json)
> * [src/data/rankings/all/leads/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json)
> * [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
> * [src/data/rankings/all/switches/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json)

This document describes the JSON schema and data structure for pre-calculated rankings files stored across all competitive leagues. These files contain performance ratings, matchup data, moveset recommendations, and statistical information for every Pokemon in each CP tier. For information about how specific leagues use this data, see [Great League Rankings](/pvpoke/pvpoke/4.2-great-league-rankings-(1500-cp)), [Ultra League Rankings](/pvpoke/pvpoke/4.3-ultra-league-rankings-(2500-cp)), and [Master League Rankings](/pvpoke/pvpoke/4.4-master-league-rankings-(10000-cp)). For information about the battle role categorization system, see [Battle Role Categories](/pvpoke/pvpoke/4.6-battle-role-categories).

## Overview

Rankings data is stored as static JSON files that are generated through offline battle simulations. The system maintains separate ranking files for:

* **League tiers**: 1500 CP (Great League), 2500 CP (Ultra League), 10000 CP (Master League)
* **Battle roles**: overall, consistency, leads, switches, closers, chargers, attackers
* **Meta formats**: Different cup restrictions (stored in separate directories)

These pre-calculated files are consumed by the rankings display interface and provide the foundation for team building recommendations.

## File Organization

```

```

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)
* [src/data/rankings/all/consistency/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L1)
* [src/data/overrides/all/1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L1)

## Rankings Entry Schema

Each rankings file contains an array of Pokemon entries. Below is the complete schema structure:

### Core Fields

| Field | Type | Description |
| --- | --- | --- |
| `speciesId` | string | Unique Pokemon identifier (e.g., `"gastrodon"`, `"empoleon_shadow"`) |
| `speciesName` | string | Display name (e.g., `"Gastrodon"`, `"Empoleon (Shadow)"`) |
| `rating` | number | Overall performance rating (0-1000 scale) |
| `score` | number | Normalized score (0-100 scale) for this category |
| `scores` | number[] | Array of 6 scores: `[overall, consistency, leads, switches, closers, chargers]` or 7 including attackers |
| `editorScore` | number? | Optional manual editor rating override (0-100 scale) |
| `editorNotes` | string? | Optional editorial commentary explaining competitive context |

### Matchup Data

The `matchups` array contains favorable matchup information:

```

```

| Field | Type | Description |
| --- | --- | --- |
| `opponent` | string | Opponent's `speciesId` |
| `rating` | number | This Pokemon's rating in the matchup (0-1000) |
| `opRating` | number? | Opponent's rating in the matchup (0-1000) |

The `counters` array uses identical schema but represents unfavorable matchups.

### Move Usage Statistics

The `moves` object tracks move usage frequency across simulations:

```

```

### Recommended Moveset

The `moveset` array specifies the optimal move configuration:

```

```

Format: `[fastMoveId, chargedMoveId1, chargedMoveId2]`

### Statistics

The `stats` object contains calculated battle statistics:

| Field | Type | Description |
| --- | --- | --- |
| `product` | number | Stat product at optimal IV distribution |
| `atk` | number | Attack stat value |
| `def` | number | Defense stat value |
| `hp` | number | HP stat value |

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L50)

## Complete Entry Example

```

```

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

## Overrides Schema

The overrides files provide manual recommendations and editorial weights that supplement the automated rankings data. Each entry contains:

| Field | Type | Description |
| --- | --- | --- |
| `speciesId` | string | Pokemon identifier matching rankings files |
| `fastMove` | string? | Recommended fast move ID override |
| `chargedMoves` | string[] | Array of 1-2 recommended charged move IDs |
| `weight` | number | Usage weight indicating meta prevalence (higher = more common) |
| `editorScore` | number? | Manual rating override (0-100 scale) |
| `editorNotes` | string? | Detailed competitive analysis and strategic notes |

### Override Entry Example

```

```

**Sources:**

* [src/data/overrides/all/1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L100)

## Battle Role Categories

The rankings system categorizes Pokemon performance across seven distinct battle roles:

```

```

Each Pokemon has a separate ranking file per category, with the `scores` array providing cross-category comparison within a single entry.

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)
* [src/data/rankings/all/consistency/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L1)
* [src/data/rankings/all/leads/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L1)

## Data Structure Relationships

```

```

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)
* [src/data/overrides/all/1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L1)

## Key Data Patterns

### Rating Scale Interpretation

* **Rating (0-1000)**: Higher values indicate stronger performance. Values above 600 are considered competitive, 700+ are meta-defining
* **Score (0-100)**: Normalized percentage score for category rankings. 90+ indicates top-tier performance
* **OpRating**: The opponent's rating in a specific matchup. When `rating - opRating` is large, the matchup is favorable

### Matchup vs Counter Distinction

* **Matchups**: Battles where this Pokemon has `rating > opRating` (winning positions)
* **Counters**: Battles where this Pokemon has `rating < opRating` (losing positions)

The arrays are sorted by rating value, with strongest matchups/worst counters listed first.

### Move Usage Statistics

The `uses` field in move data represents simulation frequency. Higher values indicate:

1. More optimal in the current meta
2. More versatile across matchups
3. Recommended for general use

When multiple fast moves have similar usage, the Pokemon has build diversity.

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L100)
* [src/data/rankings/all/consistency/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L50)

## Editor Annotations System

Editor scores and notes provide human curation layer over automated rankings:

### Editor Score Guidelines

```

```

| Score Range | Interpretation |
| --- | --- |
| 95-100 | Meta-defining, essential for competitive play |
| 90-94 | Top-tier picks with strong meta presence |
| 85-89 | Viable with specific team compositions |
| 80-84 | Situational or requires high skill |
| <80 | Niche or underperforming |

### Editorial Notes Structure

Notes typically follow this pattern:

1. **Current meta position**: Where the Pokemon stands currently
2. **Key strengths**: Primary advantages and winning conditions
3. **Main weaknesses**: Critical vulnerabilities
4. **Usage guidance**: When to use or avoid

Example from Gastrodon:

> "Gastrodon is the premier Ground type. With a solitary weakness to Grass, it's a flexible cornerstone for team building and a defining piece of the metagame. Its main counters are Flying types, in particularly those that resist its Normal or Water-type Charged Attacks."

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L30](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L30)
* [src/data/overrides/all/1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L100)

## Special Cases and Variations

### Shadow Pokemon

Shadow variants are tracked as separate entries with `_shadow` suffix:

```

```

They maintain independent ratings due to different stat distributions and competitive niches.

### Regional Forms

Regional variants use suffixes like `_alolan`, `_galarian`, `_hisuian`:

```

```

### Forme Variations

Some Pokemon track multiple formes:

* `aegislash_shield` (Blade Forme in battle)
* `castform_sunny`, `castform_rainy`, `castform_snowy`
* `gourgeist_small`, `gourgeist_average`, `gourgeist_large`, `gourgeist_super`

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L100)
* [src/data/overrides/all/1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L50)

## Data Consistency Rules

### Required Fields

All entries must include:

* `speciesId`
* `speciesName`
* `rating`
* `score`
* `scores` (array of category scores)
* `stats` (stat product and individual stats)

### Optional Fields

* `editorScore`: Only provided for Pokemon with manual curation
* `editorNotes`: Only provided when editorial context is valuable
* `opRating` in matchups/counters: Omitted when opponent rating is not calculated

### Array Ordering

1. **Ranking files**: Entries ordered by `score` descending (highest rated first)
2. **Matchups**: Ordered by `rating` descending (best matchups first)
3. **Counters**: Ordered by `rating` ascending (worst counters first)
4. **Moves**: Ordered by `uses` descending (most used first)

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L1000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1000)

## Cross-Category Score Interpretation

The `scores` array enables comparison across battle roles:

```

```

### Role Affinity Patterns

* **Lead specialists**: High leads score (index 2), lower switches/closers
* **Flexible picks**: Balanced scores across multiple categories
* **Finishers**: High closers score (index 4), high attackers
* **Pivots**: High switches score (index 3), moderate consistency

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)
* [src/data/rankings/all/leads/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L1)