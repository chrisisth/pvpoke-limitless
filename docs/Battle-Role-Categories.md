# Battle Role Categories

> **Relevant source files**
> * [src/data/overrides/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json)
> * [src/data/rankings/all/attackers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json)
> * [src/data/rankings/all/attackers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-2500.json)
> * [src/data/rankings/all/chargers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json)
> * [src/data/rankings/all/chargers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-2500.json)
> * [src/data/rankings/all/closers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json)
> * [src/data/rankings/all/closers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-2500.json)
> * [src/data/rankings/all/consistency/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json)
> * [src/data/rankings/all/consistency/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-2500.json)
> * [src/data/rankings/all/leads/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json)
> * [src/data/rankings/all/leads/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-2500.json)
> * [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
> * [src/data/rankings/all/overall/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json)
> * [src/data/rankings/all/switches/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json)
> * [src/data/rankings/all/switches/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-2500.json)

## Purpose and Scope

This page documents the seven battle role categories used to rank Pokémon performance in PvPoke's competitive analysis system. Each category evaluates Pokémon based on different battle scenarios and tactical roles, providing specialized rankings beyond overall performance metrics.

For information about the rankings data structure itself, see [Rankings Data Structure](/pvpoke/pvpoke/4.1-rankings-data-structure). For league-specific rankings, see [Great League Rankings](/pvpoke/pvpoke/4.2-great-league-rankings-(1500-cp)), [Ultra League Rankings](/pvpoke/pvpoke/4.3-ultra-league-rankings-(2500-cp)), and [Master League Rankings](/pvpoke/pvpoke/4.4-master-league-rankings-(10000-cp)).

## Overview

PvPoke categorizes Pokémon performance into seven distinct battle roles, each with dedicated ranking files. These categories help players understand not just which Pokémon are strong overall, but which excel in specific situations like leading battles, switching defensively, or closing out matches.

```

```

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

 [src/data/rankings/all/leads/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L1)

 [src/data/rankings/all/switches/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json#L1-L1)

 [src/data/rankings/all/closers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json#L1-L1)

 [src/data/rankings/all/chargers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json#L1-L1)

 [src/data/rankings/all/attackers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json#L1-L1)

 [src/data/rankings/all/consistency/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L1)

## File Structure and Location

Each category has dedicated ranking files organized by CP tier:

```

```

**Pattern:** `src/data/rankings/all/{category}/rankings-{cp}.json`

Where:

* `{category}` is one of: `overall`, `consistency`, `leads`, `switches`, `closers`, `chargers`, `attackers`
* `{cp}` is one of: `1500` (Great League), `2500` (Ultra League), `10000` (Master League)

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

 [src/data/rankings/all/consistency/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L1)

## The Seven Categories

### Category Definitions

| Category | Index | Focus | Key Metrics |
| --- | --- | --- | --- |
| **Overall** | 0 | Aggregate performance across all scenarios | Composite of all category scores |
| **Consistency** | 1 | Reliable, predictable outcomes | Low variance in matchup quality |
| **Leads** | 2 | Opening battle performance with full HP/energy | Shield management, early game pressure |
| **Switches** | 3 | Defensive pivot performance when switching in | Matchup coverage, defensive typing |
| **Closers** | 4 | Endgame scenarios with energy/shield advantage | Closing power, late-game sweeping |
| **Chargers** | 5 | Energy generation and fast move pressure | Fast move damage, energy gain rate |
| **Attackers** | 6 | Raw offensive damage output | Charged move power, neutral damage |

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

 [src/data/rankings/all/consistency/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L2)

### 1. Overall Rankings

The **Overall** category provides a composite rating across all battle scenarios. It aggregates performance from the other six specialized categories to identify Pokémon with well-rounded capabilities.

**Characteristics:**

* Contains a `scores` array with individual category scores
* Most commonly referenced ranking for general recommendations
* Balances strengths and weaknesses across different roles

**Example entry:**

```

```

The `scores` array maps to: `[overall, consistency, leads, switches, closers, chargers]` (attackers is not included in the array).

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

### 2. Leads Rankings

The **Leads** category evaluates Pokémon performance as the first battler sent out, starting with full HP and zero energy in both shields available.

**Characteristics:**

* Emphasizes shield baiting and early game pressure
* Favors Pokémon with strong fast move damage
* Values typing that counters common lead picks

**Top performers typically have:**

* High fast move pressure
* Access to shield-pressure charged moves
* Favorable matchups against meta leads

**Example top lead (Great League 1500):**

```

```

**Sources:** [src/data/rankings/all/leads/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L2)

### 3. Switches Rankings

The **Switches** category measures performance when pivoting into battle mid-match, typically to counter an opponent's Pokémon or preserve team alignment.

**Characteristics:**

* Evaluates defensive typing and resistances
* Emphasizes matchup coverage for common threats
* Values bulk and neutral damage output

**Strategic importance:**

* Safe switch options provide team flexibility
* Strong against multiple common Pokémon
* Can absorb opponent's shields or energy

**Example top switch (Great League 1500):**

```

```

**Sources:** [src/data/rankings/all/switches/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json#L1-L2)

### 4. Closers Rankings

The **Closers** category evaluates performance in endgame scenarios, often with energy or shield advantages built up during the match.

**Characteristics:**

* Assumes energy has been accumulated
* Often involves unshielded or reduced-shield scenarios
* Emphasizes charged move power and coverage

**Key factors:**

* Ability to sweep with shield/energy advantage
* High-damage charged moves that finish weakened opponents
* Bulk to survive fast move damage

**Example top closer (Great League 1500):**

```

```

**Sources:** [src/data/rankings/all/closers/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json#L1-L2)

### 5. Chargers Rankings

The **Chargers** category focuses on energy generation rate and fast move pressure, identifying Pokémon that can rapidly build to charged moves.

**Characteristics:**

* Prioritizes fast move damage and energy per turn (EPT)
* Values fast charging moves (low energy cost)
* Emphasizes pressure and move frequency

**Optimal charger traits:**

* High EPT fast moves (3.0+ EPT)
* Low-cost charged moves for frequent attacks
* Ability to apply consistent fast move pressure

**Example top charger (Great League 1500):**

```

```

**Sources:** [src/data/rankings/all/chargers/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json#L1-L2)

### 6. Attackers Rankings

The **Attackers** category measures raw offensive capability and neutral damage output, identifying Pokémon that threaten the widest range of opponents.

**Characteristics:**

* Evaluates damage-per-turn (DPT) of moves
* Emphasizes offense over bulk
* Values type coverage and super-effective damage

**Typical attacker strengths:**

* High attack stat
* Powerful charged moves
* Coverage moves hitting many types

**Example top attacker (Great League 1500):**

```

```

**Sources:** [src/data/rankings/all/attackers/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json#L1-L2)

### 7. Consistency Rankings

The **Consistency** category identifies Pokémon with reliable, predictable performance across many matchups, minimizing variance and risk.

**Characteristics:**

* Low variance in matchup outcomes
* Predictable energy flows and damage trades
* Minimal dependency on baits or prediction

**Consistency indicators:**

* Few hard losses among common meta Pokémon
* Reliable neutral matchups
* Straightforward optimal play patterns

**Example top consistency pick (Great League 1500):**

```

```

**Sources:** [src/data/rankings/all/consistency/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L2)

## Data Structure

### JSON Schema for Category Rankings

Each category ranking file contains an array of Pokémon entries with this structure:

```

```

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

### Field Descriptions

| Field | Type | Description | Present In |
| --- | --- | --- | --- |
| `speciesId` | string | Unique identifier (e.g., "gastrodon") | All categories |
| `speciesName` | string | Display name | All categories |
| `rating` | number | Numeric rating for sorting | All categories |
| `score` | number | Normalized score (0-100) for this category | All categories |
| `scores` | number[] | Array of 6 scores for all categories | Overall only |
| `matchups` | object[] | Top 5 favorable matchups with ratings | All categories |
| `counters` | object[] | Top 5 unfavorable matchups with ratings | All categories |
| `moves` | object | Fast and charged move usage statistics | All categories |
| `moveset` | string[] | Recommended [fast, charged1, charged2] | All categories |
| `editorScore` | number | Optional manual score (0-100) | Some entries |
| `editorNotes` | string | Optional editorial commentary | Some entries |
| `stats` | object | Stat product, atk, def, hp at optimal IVs | All categories |

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

### Scores Array Mapping

In the **Overall** rankings, each entry contains a `scores` array with 6 values:

```

```

**Index mapping:**

* `scores[0]` → Overall score (same as `score` field)
* `scores[1]` → Consistency score
* `scores[2]` → Leads score
* `scores[3]` → Switches score
* `scores[4]` → Closers score
* `scores[5]` → Chargers score
* Attackers score is not included in the array (only in dedicated file)

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

## Scoring System

### Rating vs Score

The rankings use two related but distinct numeric values:

| Metric | Range | Purpose | Calculation |
| --- | --- | --- | --- |
| **rating** | Variable (e.g., 600-850) | Raw performance value from simulations | Sum of weighted matchup results |
| **score** | 0-100 | Normalized category-specific rating | Rating scaled to 100 for top performer |

**Example:**

```

```

The `score` normalizes the `rating` to make it easier to compare relative performance within a category.

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

### Top Performers by Category

The highest `score` value in each category indicates the top-ranked Pokémon for that specific role. Here are examples from Great League (1500 CP):

| Category | Top Performer(s) | Score | Notable Trait |
| --- | --- | --- | --- |
| Overall | Gastrodon | 93.8 | Well-rounded with solitary Grass weakness |
| Consistency | Stunfisk, Bastiodon, Empoleon | 100 | Reliable outcomes, minimal variance |
| Leads | Primeape, Corviknight, Araquanid | 100 | Strong shield pressure and fast move damage |
| Switches | Sealeo (Shadow) | 100 | Excellent defensive pivot with coverage |
| Closers | Aegislash (Blade) | 100 | High closing power with energy advantage |
| Chargers | Dusknoir (Shadow) | 100 | Superior energy generation rate |
| Attackers | Bastiodon | 100 | Highest raw offensive damage potential |

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

 [src/data/rankings/all/consistency/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L2)

 [src/data/rankings/all/leads/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L2)

## Category-Specific Optimization

### Moveset Variations

Different categories may recommend different movesets for the same Pokémon based on role requirements:

**Example: Empoleon variations across categories**

```

```

Both use the same moveset, but Empoleon scores perfectly in consistency due to its reliable pacing.

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

 [src/data/rankings/all/consistency/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L2)

### Move Usage Statistics

Each category tracks move usage across simulated battles:

```

```

Higher `uses` values indicate moves that performed better in simulations for that specific category.

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L2)

## Integration with Rankings Display

### File Loading Pattern

The rankings system loads category data from the file structure pattern:

```
GET /data/rankings/{groupId}/{category}/rankings-{cp}.json
```

Where:

* `{groupId}` typically `"all"` for open formats
* `{category}` is one of the seven category names
* `{cp}` is the CP tier (1500, 2500, 10000)

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

### Category Selection in UI

Users can switch between categories to view specialized rankings:

```

```

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

## Editorial Annotations

### Editor Scores and Notes

Some Pokémon entries include manual editorial assessments that provide context beyond simulation data:

```

```

**Field purposes:**

* `editorScore`: Manual rating (0-100) that may differ from simulated `score`
* `editorNotes`: Strategic commentary, meta context, or caveats about simulation results

These annotations help bridge the gap between theoretical performance and practical competitive play.

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

## Practical Application

### Team Building Strategy

Players use category rankings to build balanced teams:

1. **Lead selection**: Choose from top Leads rankings for early game control
2. **Safe switch**: Select from Switches rankings for defensive pivots
3. **Closer**: Pick from Closers rankings for endgame sweeping potential

**Example balanced team structure:**

```yaml
Team: [Lead Pick, Safe Switch, Closer]
      [Primeape,  Corviknight,  Aegislash]
      
Categories:
  Lead:    100 score (Primeape in Leads)
  Switch:  100 score (Corviknight has strong switch rating)
  Closer:  100 score (Aegislash in Closers)
```

**Sources:** [src/data/rankings/all/leads/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L2)

 [src/data/rankings/all/switches/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json#L1-L2)

 [src/data/rankings/all/closers/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json#L1-L2)

### Identifying Specialists vs Generalists

Comparing a Pokémon's scores across categories reveals specialization:

**Specialist example (Bastiodon):**

```

```

Bastiodon excels as a Closer and Charger but struggles as a Lead (45.8).

**Generalist example (Gastrodon):**

```

```

Gastrodon performs well across all categories with no glaring weaknesses.

**Sources:** [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)