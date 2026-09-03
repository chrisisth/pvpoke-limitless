# Rankings System

> **Relevant source files**
> * [src/data/overrides/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json)
> * [src/data/rankings/all/attackers/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-10000.json)
> * [src/data/rankings/all/attackers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json)
> * [src/data/rankings/all/attackers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-2500.json)
> * [src/data/rankings/all/chargers/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-10000.json)
> * [src/data/rankings/all/chargers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json)
> * [src/data/rankings/all/chargers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-2500.json)
> * [src/data/rankings/all/closers/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-10000.json)
> * [src/data/rankings/all/closers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json)
> * [src/data/rankings/all/closers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-2500.json)
> * [src/data/rankings/all/consistency/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-10000.json)
> * [src/data/rankings/all/consistency/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json)
> * [src/data/rankings/all/consistency/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-2500.json)
> * [src/data/rankings/all/leads/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-10000.json)
> * [src/data/rankings/all/leads/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json)
> * [src/data/rankings/all/leads/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-2500.json)
> * [src/data/rankings/all/overall/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-10000.json)
> * [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
> * [src/data/rankings/all/overall/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json)
> * [src/data/rankings/all/switches/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-10000.json)
> * [src/data/rankings/all/switches/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json)
> * [src/data/rankings/all/switches/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-2500.json)

The Rankings System provides pre-calculated performance data for all competitive Pokémon across three major league CP tiers (Great League 1500 CP, Ultra League 2500 CP, Master League 10000 CP). These rankings evaluate Pokémon effectiveness through simulated battles and organize results into seven battle role categories: overall, consistency, leads, switches, closers, chargers, and attackers.

For information about how rankings are displayed to users, see [Rankings Display](/pvpoke/pvpoke/4.1-rankings-data-structure). For information about how battle simulations are performed, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine).

## Overview

The Rankings System is a **data consumption** layer that reads pre-calculated JSON files containing comprehensive performance metrics for each Pokémon species. Rankings data is not generated at runtime; instead, static JSON files are served to the client and rendered by interface classes.

```

```

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
* [src/data/rankings/all/consistency/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json)
* [src/data/rankings/all/leads/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json)
* [src/data/rankings/all/switches/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json)
* [src/data/rankings/all/closers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json)
* [src/data/rankings/all/chargers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json)
* [src/data/rankings/all/attackers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json)
* [src/data/overrides/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json)

## League Categories by CP Tier

Rankings are organized into three primary competitive leagues based on CP (Combat Power) limits:

| League | CP Limit | File Pattern | Importance Score |
| --- | --- | --- | --- |
| Great League | 1500 | `rankings-1500.json` | 433.58 |
| Ultra League | 2500 | `rankings-2500.json` | 289.54 |
| Master League | 10000 | `rankings-10000.json` | 202.75 |
| Premier League | 1500 (no legendaries) | `rankings-1500-premier.json` | 75.03 |

Each league has fundamentally different meta characteristics:

* **Great League (1500 CP)**: Most diverse meta with emphasis on balanced stats and defensive typing. Example top performers: Gastrodon, Jellicent, Furret, Altaria
* **Ultra League (2500 CP)**: Increased bulk shifts priority toward Pokemon with higher stat products. Example top performers: Corviknight, Lapras, Jellicent, Moltres (Galarian)
* **Master League (10000 CP)**: Unrestricted tier dominated by legendary Pokémon with maximum stats. Example top performers: Zacian (Crowned Sword), Palkia (Origin), Kyurem (White)

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)
* [src/data/rankings/all/overall/rankings-2500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L1)
* [src/data/rankings/all/overall/rankings-10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-10000.json#L1-L1)

## Battle Role Categories

Each league maintains seven distinct ranking categories that evaluate Pokémon performance in specific battle scenarios:

```

```

### Category Definitions

1. **Overall** (`overall/`): Weighted aggregate score representing general meta viability across all battle scenarios. This is the default ranking view.
2. **Consistency** (`consistency/`): Measures reliable win rate with minimal variance. Pokémon ranked highly here perform predictably even in unfavorable matchups.
3. **Leads** (`leads/`): Evaluates performance when starting as the first Pokémon in battle. Critical for controlling the opening matchup and dictating battle flow.
4. **Switches** (`switches/`): Measures effectiveness when entering mid-battle, typically after losing lead advantage. High switch scores indicate safe swap options.
5. **Closers** (`closers/`): Evaluates performance in endgame scenarios where shields are depleted. Prioritizes raw damage output and finishing power.
6. **Chargers** (`chargers/`): Measures energy generation rate and ability to reach charged attacks quickly. Important for applying early pressure.
7. **Attackers** (`attackers/`): Focuses on shield-breaking potential and raw damage per turn. Differentiates from closers by emphasizing shield pressure.

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)
* [src/data/rankings/all/consistency/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L1)
* [src/data/rankings/all/leads/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L1)
* [src/data/rankings/all/switches/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json#L1-L1)
* [src/data/rankings/all/closers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json#L1-L1)
* [src/data/rankings/all/chargers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json#L1-L1)
* [src/data/rankings/all/attackers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json#L1-L1)

## Rankings Data Schema

Each rankings JSON file contains an array of Pokemon entries with comprehensive performance metrics:

```

```

### Field Descriptions

| Field | Type | Description |
| --- | --- | --- |
| `speciesId` | string | Unique identifier matching GameMaster (e.g., `"gastrodon"`, `"azumarill"`) |
| `speciesName` | string | Display name (e.g., `"Gastrodon"`, `"Azumarill"`) |
| `rating` | number | Overall performance score (0-1000 scale) |
| `matchups` | array | Top 5 favorable matchups with opponent ratings |
| `counters` | array | Top 5 Pokemon that counter this entry |
| `moves.fastMoves` | array | Fast move usage statistics across simulations |
| `moves.chargedMoves` | array | Charged move usage statistics |
| `moveset` | array | Recommended optimal moveset `[fastMove, chargedMove1, chargedMove2]` |
| `score` | number | Category-specific performance score |
| `scores` | array | Score breakdown: `[overall, consistency, leads, switches, closers, chargers, attackers]` |
| `editorScore` | number | Manual editorial rating (optional) |
| `editorNotes` | string | Curator commentary on meta positioning (optional) |
| `stats.product` | number | Stat product (atk × def × hp) |
| `stats.atk` | number | Attack stat at this CP tier |
| `stats.def` | number | Defense stat at this CP tier |
| `stats.hp` | number | HP stat at this CP tier |

### Example Entry Structure

```

```

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

## Overrides and Editorial Curation

The overrides system provides editorial adjustments that supplement pre-calculated rankings data:

```

```

### Override Entry Structure

Each override entry specifies:

| Field | Type | Purpose |
| --- | --- | --- |
| `speciesId` | string | Pokemon identifier |
| `fastMove` | string | Recommended fast move |
| `chargedMoves` | string[] | Recommended charged move pair |
| `weight` | number | Meta relevance multiplier (affects sorting) |
| `editorScore` | number | Manual performance rating (0-100) |
| `editorNotes` | string | Curator analysis of meta positioning |

### Example Override

```

```

The `weight` field influences ranking display order, with higher values indicating greater meta importance. For example, Azumarill has `weight: 22`, reflecting its foundational role in Great League.

**Sources:**

* [src/data/overrides/all/1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L50)

## Rating System and Scoring

Ratings use a 0-1000 scale where higher values indicate stronger performance. The rating system incorporates:

### Rating Calculation Components

```

```

**Rating Ranges:**

* **800-900+**: Top-tier meta definers (e.g., Gastrodon 670 rating but 93.8 score)
* **700-799**: Highly viable meta contenders
* **600-699**: Solid role players with specific niches
* **500-599**: Situational picks requiring team support
* **<500**: Limited viability or highly specialized

Note that `rating` and `score` are distinct metrics:

* `rating`: Raw matchup-based performance score
* `score`: Normalized category-specific score (0-100)

The `scores` array provides subscores: `[overall, consistency, leads, switches, closers, chargers, attackers]`

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

## Matchup and Counter Data

Matchup data quantifies head-to-head performance between specific Pokemon pairs:

### Matchup Structure

**Favorable Matchups** (`matchups` array):

```

```

* `rating`: This Pokemon's performance (782 = strong win)
* `opRating`: Opponent's performance (217 = decisive loss)
* Sum of ratings approximately equals 1000

**Counters** (`counters` array):

```

```

* Low ratings indicate poor performance against this opponent
* Counters list prioritizes Pokemon that threaten this entry

### Rating Interpretation

| Rating Range | Matchup Outcome |
| --- | --- |
| 800-1000 | Dominant victory, can win even down shields |
| 600-799 | Strong advantage, likely wins even |
| 500-599 | Slight advantage or close neutral |
| 400-499 | Slight disadvantage but winnable |
| 200-399 | Strong disadvantage, requires shield advantage |
| 0-199 | Hard counter, nearly unwinnable |

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

## Move Usage Statistics

The `moves` object tracks move usage across thousands of simulated battles:

```

```

### Usage Interpretation

Higher `uses` values indicate moves that perform well across diverse matchup scenarios. The recommended `moveset` is derived from the highest-performing move combination.

**Example:**

```

```

Mud Slap has 2.5x usage of Hidden Power variants, clearly indicating superior performance. Body Slam is the most-used charged move, paired with Water Pulse for optimal coverage.

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

## Data File Organization

Rankings data follows a hierarchical directory structure:

```
src/data/rankings/
├── all/
│   ├── overall/
│   │   ├── rankings-1500.json
│   │   ├── rankings-2500.json
│   │   └── rankings-10000.json
│   ├── consistency/
│   │   ├── rankings-1500.json
│   │   ├── rankings-2500.json
│   │   └── rankings-10000.json
│   ├── leads/
│   │   └── rankings-*.json
│   ├── switches/
│   │   └── rankings-*.json
│   ├── closers/
│   │   └── rankings-*.json
│   ├── chargers/
│   │   └── rankings-*.json
│   └── attackers/
│       └── rankings-*.json
└── [additional league-specific directories]
```

Each category directory contains three CP tier variants. The `all/` prefix indicates unrestricted league data (contrasted with formats like Premier or specialized cups).

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
* [src/data/rankings/all/consistency/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json)
* [src/data/rankings/all/leads/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json)
* [src/data/rankings/all/switches/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json)
* [src/data/rankings/all/closers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json)
* [src/data/rankings/all/chargers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json)
* [src/data/rankings/all/attackers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json)

## Data Consumption Flow

The rankings system operates as a read-only data layer consumed by UI components:

```

```

The system does **not** generate rankings at runtime. All ranking calculations occur during a pre-processing pipeline (not visible in this codebase) that outputs static JSON files.

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
* [src/data/overrides/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json)

## Premier League Variant

Premier League rankings exclude legendary and mythical Pokemon, creating a distinct meta:

```

```

Premier rankings have their own file set but follow identical schema to main league rankings. The primary difference is the eligible Pokemon pool.

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)

## Integration with Groups System

Rankings data is consumed in conjunction with Groups definitions (see [Groups and Meta Definitions](/pvpoke/pvpoke/7.1-groups-and-meta-definitions)):

```

```

Groups files define which Pokemon are eligible for specific formats (e.g., cups, restricted metas). Rankings files contain universal performance data, which is then filtered based on active group restrictions.

**Sources:**

* [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
* [src/data/overrides/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json)