# Training Analysis and Meta Insights

> **Relevant source files**
> * [src/data/training/analysis/all/10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/10000.json)
> * [src/data/training/analysis/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/1500.json)
> * [src/data/training/analysis/all/2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/2500.json)
> * [src/data/training/analysis/classic/10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/classic/10000.json)
> * [src/data/training/analysis/element/500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/element/500.json)
> * [src/data/training/analysis/remix/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/remix/1500.json)
> * [src/data/training/analysis/remix/2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/remix/2500.json)
> * [src/data/training/getTraining.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php)
> * [src/data/training/teams/gobattleleague/10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/gobattleleague/10000.json)
> * [src/data/training/teams/gobattleleague/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/gobattleleague/1500.json)
> * [src/data/training/teams/gobattleleague/2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/gobattleleague/2500.json)
> * [src/data/training/teams/remix/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/remix/1500.json)
> * [src/data/training/teams/remix/2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/remix/2500.json)
> * [src/js/interface/TrainRankingInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js)
> * [src/train/analysis.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php)

This document covers the Training Analysis system, which aggregates battle results from the Training Mode and displays performance metrics for Pokemon and teams. The system tracks which Pokemon and teams perform best in actual gameplay, providing meta insights based on real battle data rather than simulated matchups.

For information about the Training Mode battle interface and AI opponents, see [Training Mode Interface](/pvpoke/pvpoke/5.1-training-mode-interface). For details on AI decision-making algorithms, see [AI Decision Making](/pvpoke/pvpoke/5.2-ai-decision-making).

---

## Overview

The Training Analysis system collects battle results from Training Mode games played between users and AI opponents, aggregates this data into performance metrics, and displays rankings of top-performing Pokemon and teams. Unlike the pre-calculated rankings in section [4](/pvpoke/pvpoke/4-rankings-system), which are based on simulated 1v1 matchups, Training Analysis reflects actual 3v3 team battles with full dynamic play including switches and shield decisions.

```

```

**Sources:** [src/train/analysis.php L1-L277](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L1-L277)

 [src/js/interface/TrainRankingInterface.js L1-L686](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L1-L686)

 [src/data/training/getTraining.php L1-L128](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php#L1-L128)

---

## Data Collection and Storage

### Database Schema

Training battle results are stored in two database tables managed by server-side PHP code:

**training_pokemon Table:**

* `pokemonId`: Species ID with moveset notation (e.g., "azumarill B+IB/PR")
* `individualScore`: Damage output metric (100% = 1 Pokemon KO'd)
* `teamScore`: Team performance rating (0-1000 scale)
* `postDatetime`: Timestamp of battle
* `format`: League format identifier (e.g., "all-1500")

**training_team Table:**

* `teamStr`: Pipe-separated team composition (e.g., "azumarill B/IB/PR|bastiodon SD/Ft/SE|cradily Ac/GK/RT")
* `teamScore`: Team performance rating (0-1000 scale)
* `postDatetime`: Timestamp of battle
* `format`: League format identifier

```

```

**Sources:** [src/data/training/getTraining.php L30-L46](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php#L30-L46)

---

## Data Aggregation Process

The `getTraining.php` script periodically queries the database to generate aggregated analysis data:

### Query Parameters

| Parameter | Description | Default Value |
| --- | --- | --- |
| `lookbackDays` | Number of days of historical data to include | 14 days |
| `pokeMinimum` | Minimum usage threshold for Pokemon | 0 games |
| `teamMinimum` | Minimum usage threshold for teams | 0 games |
| `usageBreakdownMinimum` | Minimum usage % to generate trend data | 5% |

### Aggregation Process

```

```

**Sources:** [src/data/training/getTraining.php L8-L125](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php#L8-L125)

### Usage Trend Data Generation

For Pokemon that exceed the usage threshold (default 5%), the system generates 30-day usage trends:

1. Divide last 30 days into 10 periods of 3 days each
2. For each period, calculate: `(Pokemon appearances / Total teams) * 100`
3. Store as `usageTrend` array with 10 values

[src/data/training/getTraining.php L66-L105](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php#L66-L105)

---

## Analysis Data Structure

### JSON Schema

The generated analysis JSON files follow this structure:

```

```

### File Organization

Analysis data is organized by cup and CP level:

| Path | Description |
| --- | --- |
| `data/training/analysis/all/1500.json` | Great League (all Pokemon) |
| `data/training/analysis/all/2500.json` | Ultra League (all Pokemon) |
| `data/training/analysis/all/10000.json` | Master League (all Pokemon) |
| `data/training/analysis/remix/1500.json` | Great League Remix Cup |
| `data/training/analysis/element/500.json` | Element Cup (500 CP) |

**Sources:** [src/data/training/analysis/all/1500.json L1-L351](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/1500.json#L1-L351)

 [src/data/training/analysis/all/2500.json L1-L247](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/2500.json#L1-L247)

 [src/data/training/analysis/all/10000.json L1-L142](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/10000.json#L1-L142)

---

## Performance Metrics

### Team Rating

Team Rating is a number between 0 and 1000 that measures battle performance quality:

* **Above 500**: Team wins more often than it loses
* **Below 500**: Team loses more often than it wins
* **Calculation**: Based on remaining HP on opposing team at battle end

The metric accounts for win quality - a dominant win (opponent team at low HP) scores higher than a close win.

[src/train/analysis.php L163-L164](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L163-L164)

 [src/train/analysis.php L213-L214](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L213-L214)

### Individual Rating

Individual Rating measures a Pokemon's damage output and shield pressure:

* **Base**: 100% equals 1 Pokemon worth of damage dealt
* **Shield Value**: * Great League: 1 shield = 50% of a Pokemon * Ultra/Master League: 1 shield = 40% of a Pokemon
* **Example**: 120.5% = 1.2 Pokemon KO'd + shields drawn

[src/train/analysis.php L215](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L215-L215)

### Low Volume Indicators

The interface marks low-confidence data points:

| Data Type | Threshold | Visual Indicator |
| --- | --- | --- |
| Pokemon | < 250 games | Orange "low-volume" class |
| Teams | < 30 games | Orange "low-volume" class |

[src/js/interface/TrainRankingInterface.js L134-L142](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L134-L142)

**Sources:** [src/js/interface/TrainRankingInterface.js L108-L136](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L108-L136)

 [src/train/analysis.php L215-L217](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L215-L217)

---

## Frontend Interface

### TrainRankingInterface.js

The `TrainRankingInterface` class manages the analysis page UI:

```

```

**Sources:** [src/js/interface/TrainRankingInterface.js L1-L686](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L1-L686)

### Table Display Logic

The interface clones hidden template rows and populates them with data:

[src/js/interface/TrainRankingInterface.js L78-L141](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L78-L141)

Key display features:

* **Color-coded ratings**: Background color intensity based on normalized team score
* **Type badges**: Pokemon type indicators on sprites
* **Moveset abbreviations**: Compact move notation (e.g., "B+IB/PR")
* **Usage percentages**: Calculated as `(games / totalPerformers * 3) * 100`

### CSV Export

The interface generates CSV downloads for both tables:

* **Performers CSV**: Pokemon name, team rating, individual rating, usage
* **Teams CSV**: Team composition, team rating, usage

[src/js/interface/TrainRankingInterface.js L253-L274](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L253-L274)

**Sources:** [src/js/interface/TrainRankingInterface.js L74-L284](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L74-L284)

---

## Usage Trend Visualization

### Canvas-Based Charts

Usage trends are displayed using HTML5 Canvas with animated line graphs:

```

```

### Chart Features

1. **Dual-line comparison**: Compare up to 2 Pokemon usage trends
2. **Automatic Y-axis scaling**: Switches between 20% and 50% max based on data
3. **Animation**: Lines draw progressively over 25ms intervals
4. **Type-colored legends**: Each line color matches Pokemon's primary type
5. **Date labels**: Shows 30-day span from `lastUpdated` property

[src/js/interface/TrainRankingInterface.js L463-L665](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L463-L665)

### Drawing Implementation

The trend line animation uses interval-based drawing:

```

```

[src/js/interface/TrainRankingInterface.js L618-L633](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L618-L633)

**Sources:** [src/js/interface/TrainRankingInterface.js L463-L646](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L463-L646)

 [src/js/interface/TrainRankingInterface.js L499-L584](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L499-L584)

---

## Search and Filtering

### Pokemon Search

The interface supports advanced search strings using the `PokeSearch` module:

* **Type filters**: `water`, `dragon`, etc.
* **Move filters**: `@counter`, `@hydropump`
* **Exclusions**: `!legendary`, `!steel`
* **Combinations**: Multiple criteria with AND logic

[src/js/interface/TrainRankingInterface.js L407-L421](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L407-L421)

### Team Search Logic

Team searches match if ANY team member matches the criteria (OR logic):

```

```

[src/js/interface/TrainRankingInterface.js L441-L459](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L441-L459)

**Sources:** [src/js/interface/TrainRankingInterface.js L407-L461](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L407-L461)

---

## URL State Management

The interface uses browser history API to maintain navigation state:

### URL Structure

```
/train/analysis/{cup}/{cp}/
```

Examples:

* `/train/analysis/all/1500/` - Great League
* `/train/analysis/remix/2500/` - Ultra League Remix
* `/train/analysis/premier/10000/` - Master League Premier

### State Management Flow

```

```

[src/js/interface/TrainRankingInterface.js L37-L40](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L37-L40)

 [src/js/interface/TrainRankingInterface.js L332-L339](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L332-L339)

**Sources:** [src/js/interface/TrainRankingInterface.js L288-L355](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L288-L355)

---

## Analysis vs Rankings Comparison

The analysis page includes documentation explaining differences from standard rankings:

| Aspect | Standard Rankings | Training Analysis |
| --- | --- | --- |
| **Data Source** | Simulated 1v1 matchups | Actual training battles |
| **Team Context** | Individual performance | Full team composition |
| **Dynamic Play** | None (direct simulation) | Switches, baits, shield decisions |
| **Update Speed** | Immediate for new Pokemon | Requires battle volume |
| **Repeatability** | 100% consistent | Subject to player behavior |

[src/train/analysis.php L231-L233](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L231-L233)

### Sample Size Considerations

The documentation warns about sample size bias:

* **High volume** (dark text): High confidence, representative data
* **Low volume** (orange text): May be outliers or single-player bias
* **Minimum thresholds**: ~150 games for Pokemon, ~20 games for teams

[src/train/analysis.php L230](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L230-L230)

**Sources:** [src/train/analysis.php L224-L235](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L224-L235)

---

## Data Update Frequency

The analysis data is periodically regenerated:

1. Training battles continuously add data to database
2. `getTraining.php` queries database with 14-day lookback window
3. Aggregated data overwrites JSON files
4. `lastUpdated` property tracks generation date

Current update dates in data files:

* Great League: October 24, 2025
* Ultra League: October 24, 2025
* Master League: September 26, 2025

[src/data/training/analysis/all/1500.json L3](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/1500.json#L3-L3)

 [src/data/training/analysis/all/2500.json L3](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/2500.json#L3-L3)

 [src/data/training/analysis/all/10000.json L3](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/10000.json#L3-L3)

**Sources:** [src/data/training/getTraining.php L10-L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php#L10-L27)

 [src/train/analysis.php L278](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L278-L278)