# Premier League Rankings

> **Relevant source files**
> * [src/data/rankings/premier/attackers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/premier/attackers/rankings-2500.json)
> * [src/data/rankings/premier/chargers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/premier/chargers/rankings-2500.json)
> * [src/data/rankings/premier/closers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/premier/closers/rankings-2500.json)
> * [src/data/rankings/premier/consistency/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/premier/consistency/rankings-2500.json)
> * [src/data/rankings/premier/leads/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/premier/leads/rankings-2500.json)
> * [src/data/rankings/premier/overall/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/premier/overall/rankings-2500.json)
> * [src/data/rankings/premier/switches/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/premier/switches/rankings-2500.json)

## Purpose and Scope

This document covers the pre-calculated Premier League rankings data system. Premier League is a competitive format variant that restricts legendary and mythical Pokémon from participation. Rankings are generated for the same CP tiers as open leagues (1500, 2500, 10000) but reflect a fundamentally different metagame due to these restrictions.

For information about the open league rankings (Great, Ultra, Master), see [Great League Rankings](/pvpoke/pvpoke/4.2-great-league-rankings-(1500-cp)), [Ultra League Rankings](/pvpoke/pvpoke/4.3-ultra-league-rankings-(2500-cp)), and [Master League Rankings](/pvpoke/pvpoke/4.4-master-league-rankings-(10000-cp)). For details on ranking categories (leads, switches, closers, etc.), see [Battle Role Categories](/pvpoke/pvpoke/4.6-battle-role-categories). For the data structure shared across all ranking types, see [Rankings Data Structure](/pvpoke/pvpoke/4.1-rankings-data-structure).

---

## Overview

Premier League rankings represent pre-calculated performance data for Pokémon competing in formats where legendary and mythical species are banned. This restriction significantly alters the competitive landscape, allowing non-legendary species to emerge as top performers that would otherwise be overshadowed.

The rankings maintain the same seven-category structure as open leagues:

* **Overall**: Aggregate performance across all battle roles
* **Consistency**: Reliability across diverse matchups
* **Leads**: Opening battle position performance
* **Switches**: Mid-battle switch-in effectiveness
* **Closers**: Endgame closing performance
* **Attackers**: Fast move damage output
* **Chargers**: Charged move energy generation

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-100`, `src/data/rankings/premier/consistency/rankings-2500.json:1-100`

---

## File Structure

### Directory Organization

```

```

**Premier League File Structure**

Each category directory contains three ranking files corresponding to the standard competitive CP tiers. The file structure mirrors open league organization, enabling consistent data access patterns across format variants.

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1`, `src/data/rankings/premier/consistency/rankings-2500.json:1`, `src/data/rankings/premier/leads/rankings-2500.json:1`

---

## Data Schema

Premier League rankings follow the identical JSON schema as open leagues. Each species entry contains:

| Field | Type | Description |
| --- | --- | --- |
| `speciesId` | String | Unique species identifier (e.g., "corviknight") |
| `speciesName` | String | Display name (e.g., "Corviknight") |
| `rating` | Number | Performance rating (0-1000 scale) |
| `matchups` | Array | Top 5 favorable matchups with ratings |
| `counters` | Array | Top 5 threatening counters with ratings |
| `moves` | Object | Fast and charged move usage statistics |
| `moveset` | Array | Recommended optimal moveset |
| `score` | Number | Normalized score (0-100 scale) |
| `scores` | Array | Category-specific scores [overall, leads, switches, closers, attackers, chargers, consistency] |
| `stats` | Object | Stat product, attack, defense, HP values |

### Example Entry

```

```

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-50`

---

## Meta Composition Analysis

### Top Performers by CP Tier

The Premier format creates distinct metagames at each CP tier due to legendary exclusions:

**Ultra League Premier (2500 CP) - Top 10 Overall**

| Rank | Species | Rating | Primary Role | Score |
| --- | --- | --- | --- | --- |
| 1 | Malamar (Shadow) | 732 | Closer/Switch | 95.0 |
| 2 | Corviknight | 721 | Lead/Overall | 97.6 |
| 3 | Primeape | 719 | Lead/Charger | 97.8 |
| 4 | Hydreigon (Shadow) | 718 | Charger/Switch | 93.1 |
| 5 | Malamar | 714 | Overall/Switch | 93.6 |
| 6 | Kingdra | 710 | Lead/Charger | 93.5 |
| 7 | Grumpig | 708 | Closer/Charger | 96.7 |
| 8 | Dusknoir (Shadow) | 700 | Overall/Lead | 95.4 |
| 9 | Empoleon (Shadow) | 699 | Switch/Charger | 93.8 |
| 10 | Dusknoir | 698 | Overall/Charger | 94.0 |

### Meta Shifts from Open Leagues

```

```

**Premier Meta Characteristics**

Premier formats exhibit several distinctive patterns:

1. **Increased Diversity**: Without legendary dominance, more species achieve viability
2. **Type Shifts**: Reduction in Psychic-type presence; increase in Dark and Fighting types
3. **Stat Budget Changes**: Premier species generally have lower stat products than open meta legendaries
4. **Move Pool Variance**: Greater emphasis on Community Day moves and legacy movesets

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-200`

---

## Category Performance Patterns

### Role Specialization in Premier

Different Premier species excel in specific battle roles. The category-specific rankings reveal optimal positioning strategies:

```

```

**Category Performance Distribution**

### Lead Performance (rankings-2500.json in leads/)

Lead specialists in Premier must handle the meta's most common openers. Bellibolt's perfect lead score (100) reflects its dominance against water-type leads and neutral matchups against prevalent Steel/Flying types.

**Top Lead Performers:**

* Bellibolt: Excels against Empoleon (747 rating), Jellicent (700), and Corviknight (627)
* Corviknight: Strong into Skeledirge (668), Gastrodon (652), and Tentacruel (608)
* Lapras: Beats Togekiss (634), Feraligatr (599), and Talonflame (595)

Sources: `src/data/rankings/premier/leads/rankings-2500.json:1-100`

### Switch Performance (rankings-2500.json in switches/)

Switch specialists must enter battle mid-combat and quickly establish advantage. Shadow forms dominate this category due to their higher attack stats enabling immediate pressure.

**Top Switch Performers:**

* Feraligatr (Shadow): Perfect switch score (100), rating 774
* Primeape: 98.6 switch score, excels against Steel types
* Turtonator: 98.6 score, Fire/Dragon coverage punishes common switches

Sources: `src/data/rankings/premier/switches/rankings-2500.json:1-100`

### Closer Performance (rankings-2500.json in closers/)

Closers finish weakened opponents and must maintain energy advantage. Bulk and typing matter more than raw attack for closer specialists.

**Top Closer Performers:**

* Jellicent: Perfect closer score (100), Ghost/Water typing resists common endgame attacks
* Grumpig: 99.6 closer score, Psychic/Fighting coverage handles many endgame scenarios
* Lapras: 99.6 score, bulk allows survival with shield disadvantage

Sources: `src/data/rankings/premier/closers/rankings-2500.json:1-100`

### Charger Performance (rankings-2500.json in chargers/)

Chargers generate energy rapidly through fast moves, enabling frequent charged move usage. High energy generation directly correlates with match control.

**Top Charger Performers:**

* Dusknoir (Shadow): Perfect charger score (100), Astonish generates 13 energy per turn
* Hydreigon (Shadow): 99.5 score, Dragon Breath provides 3 energy per turn
* Primeape: 99.2 score, Karate Chop generates 8 energy per turn

Sources: `src/data/rankings/premier/chargers/rankings-2500.json:1-100`

---

## Integration with Rankings System

### Data Generation Pipeline

```

```

**Premier Rankings Integration Flow**

The Premier rankings system integrates with the broader PvPoke architecture through shared interfaces and data formats. The consistent JSON schema allows the same display and analysis code to handle both open and Premier league data.

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1`, `src/data/rankings/premier/consistency/rankings-2500.json:1`

---

## Format Variants

### CP Tier Coverage

Premier League rankings exist for all three primary competitive tiers:

| CP Tier | League Name | File Path Pattern | Typical Meta |
| --- | --- | --- | --- |
| 1500 | Great League Premier | `rankings/premier/*/rankings-1500.json` | Balanced stat distributions |
| 2500 | Ultra League Premier | `rankings/premier/*/rankings-2500.json` | High stat product species |
| 10000 | Master League Premier | `rankings/premier/*/rankings-10000.json` | Pseudo-legendaries, evolved forms |

### Master League Premier Characteristics

Master League Premier (CP 10000) represents the most distinct meta shift, as open Master League is dominated by legendary species. Premier elevates pseudo-legendary Pokémon (Dragonite, Tyranitar, Garchomp, Salamence, Metagross, etc.) to top-tier status.

Common Master Premier characteristics:

* **Pseudo-Legendary Dominance**: Species with 600 base stat total become meta defining
* **Community Day Legacy Moves**: Exclusive moves on evolved forms heavily impact viability
* **Higher CP Values**: Most species hit level 40-50 caps, maximizing stat products
* **Type Triangle Emphasis**: Dragon-Steel-Fairy core shapes team building

---

## Move Set Recommendations

### Optimal Move Sets in Premier

Premier rankings include recommended movesets derived from simulation results. The `moveset` array provides the statistically optimal fast move and charged move combination for each species.

**Example Move Set Analysis:**

```

```

**Move Selection Factors:**

1. **Energy Generation**: Fast moves with higher energy generation (e.g., Sand Attack) preferred for energy advantage
2. **Coverage**: Charged moves covering common meta threats (Payback for Ghosts/Psychics)
3. **Usage Statistics**: The `uses` field reflects simulation frequency across matchups

### Alternative Move Sets

The `moves` object contains usage statistics for all legal moves. Alternative sets may be viable in specific team contexts:

* **Corviknight**: Air Slash (35,418 uses) provides STAB Flying damage but lower energy generation than Sand Attack (47,826 uses)
* **Trade-offs**: Coverage vs. energy generation, STAB damage vs. typing advantage

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-50`

---

## Usage in Application

### Rankings Display Interface

```

```

**Rankings Display Flow**

The rankings interface dynamically loads Premier data based on user selections. The consistent data schema allows a single codebase to handle all league variants.

### Team Builder Integration

Team building tools use Premier rankings to:

1. **Suggest Species**: Recommend high-rated species for team slots
2. **Analyze Coverage**: Check type coverage against meta threats
3. **Calculate Synergy**: Evaluate how team members complement each other
4. **Identify Weaknesses**: Highlight common counters to team composition

### Training AI Integration

The Training AI system uses Premier rankings to construct opponent teams that reflect the competitive meta. Higher-rated species appear more frequently in AI team pools, creating realistic practice scenarios.

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-100`

---

## Performance Metrics

### Rating Scale

Premier rankings use a 0-1000 rating scale where:

* **900+**: Dominant meta defining species
* **800-899**: Top tier, excellent performance
* **700-799**: High tier, tournament viable
* **600-699**: Mid tier, situationally strong
* **<600**: Lower tier, niche applications

### Score Normalization

The `score` field (0-100 scale) and `scores` array (category-specific) provide normalized performance metrics for cross-category comparison:

```

```

**Scores Array Index Mapping:**

* `[0]`: Overall performance
* `[1]`: Lead performance
* `[2]`: Switch performance
* `[3]`: Closer performance
* `[4]`: Attacker performance
* `[5]`: Charger performance
* `[6]`: Consistency (if present in some formats)

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-50`

---

## File Size and Performance

### Data File Characteristics

Premier ranking files are substantial JSON documents requiring efficient loading strategies:

| Category | Approximate Size | Entry Count |
| --- | --- | --- |
| Overall | ~700 KB | ~200-300 species |
| Leads | ~600 KB | ~200-300 species |
| Switches | ~600 KB | ~200-300 species |
| Closers | ~600 KB | ~200-300 species |
| Attackers | ~600 KB | ~200-300 species |
| Chargers | ~600 KB | ~200-300 species |
| Consistency | ~600 KB | ~200-300 species |

### Loading Optimization

The application likely implements:

1. **Lazy Loading**: Load category data only when user navigates to that view
2. **Caching**: Store loaded rankings in memory to avoid repeated fetches
3. **Compression**: Serve gzipped JSON for reduced bandwidth
4. **Pagination**: Display results in batches to improve initial render time

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1`, `src/data/rankings/premier/leads/rankings-2500.json:1`, `src/data/rankings/premier/switches/rankings-2500.json:1`

---

## Premier-Specific Considerations

### Legendary Exclusion Impact

The core distinction of Premier League is the exclusion of legendary and mythical Pokémon. This restriction has cascading effects:

**Excluded Species Categories:**

* Legendary birds (Articuno, Zapdos, Moltres)
* Legendary beasts (Raikou, Entei, Suicune)
* Weather trio (Groudon, Kyogre, Rayquaza)
* Creation trio (Dialga, Palkia, Giratina)
* Mythical (Mew, Celebi, Jirachi, Deoxys, etc.)
* Ultra Beasts (Nihilego, Buzzwole, etc.)

**Meta Implications:**

1. **Accessibility**: All viable species obtainable through normal gameplay
2. **Cost**: No requirement for rare candy investment in legendaries
3. **Availability**: Common species from Community Days become meta relevant
4. **Diversity**: Broader species pool sees competitive play

### Shadow Form Prevalence

Premier meta exhibits high Shadow form usage, particularly in switch and charger categories. Shadow forms' +20% attack bonus becomes more impactful when legendary stat budgets are removed from competition.

**Notable Shadow Performers:**

* Malamar (Shadow): #1 Overall, multiple category leader
* Hydreigon (Shadow): Top charger specialist
* Feraligatr (Shadow): Perfect switch score
* Dusknoir (Shadow): Perfect charger score
* Primeape (Shadow): High charger rating

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-100`, `src/data/rankings/premier/switches/rankings-2500.json:1-50`

---

## Comparison with Open Leagues

### Rating Distributions

```

```

**Rating Compression in Premier**

Premier rankings exhibit lower absolute ratings compared to open leagues due to:

1. **Stat Budget Ceiling**: Non-legendary species have lower stat products
2. **Tighter Competition**: More species cluster in similar performance bands
3. **Matchup Volatility**: Without dominant legendaries, matchups are more variable

### Meta Velocity

Premier metas evolve faster than open leagues:

* **Community Day Impact**: New legacy moves immediately affect Premier viability
* **Balance Changes**: Move rebalances have proportionally larger impact
* **Discovery**: Niche species can emerge as meta counters more readily

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-50`

---

## Summary

Premier League Rankings provide pre-calculated performance data for competitive formats excluding legendary and mythical Pokémon. The system maintains identical structure to open league rankings while reflecting fundamentally different metagames shaped by legendary restrictions.

**Key Characteristics:**

* Seven-category ranking system (overall, leads, switches, closers, attackers, chargers, consistency)
* Three CP tiers (1500, 2500, 10000) with distinct metas per tier
* JSON data format compatible with open league rankings infrastructure
* Higher species diversity and more accessible competitive environment
* Shadow form prevalence due to removal of legendary stat budgets

**File Locations:**

* `src/data/rankings/premier/{category}/rankings-{cp}.json`
* Categories: overall, consistency, leads, switches, closers, attackers, chargers
* CP values: 1500, 2500, 10000

**Integration Points:**

* Rankings display interface for user browsing
* Team builder for composition analysis
* Training AI for opponent team generation
* Custom group definitions for Premier-specific formats

Sources: `src/data/rankings/premier/overall/rankings-2500.json:1-100`, `src/data/rankings/premier/leads/rankings-2500.json:1-100`, `src/data/rankings/premier/switches/rankings-2500.json:1-100`, `src/data/rankings/premier/closers/rankings-2500.json:1-100`