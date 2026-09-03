# Great League Rankings (1500 CP)

> **Relevant source files**
> * [src/data/overrides/all/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json)
> * [src/data/rankings/all/attackers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json)
> * [src/data/rankings/all/chargers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json)
> * [src/data/rankings/all/closers/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json)
> * [src/data/rankings/all/consistency/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json)
> * [src/data/rankings/all/leads/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json)
> * [src/data/rankings/all/overall/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json)
> * [src/data/rankings/all/switches/rankings-1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json)

This page documents the pre-calculated rankings data for Great League, the most popular competitive format in Pokémon GO PvP with a 1500 CP limit. It covers the data structure, top performers, meta analysis, and league-specific considerations.

For information about the general rankings data schema across all leagues, see [Rankings Data Structure](/pvpoke/pvpoke/4.1-rankings-data-structure). For other league rankings, see [Ultra League Rankings](/pvpoke/pvpoke/4.3-ultra-league-rankings-(2500-cp)) and [Master League Rankings](/pvpoke/pvpoke/4.4-master-league-rankings-(10000-cp)).

## Great League Format

Great League is the entry-level competitive format with a maximum CP limit of 1500. This CP restriction fundamentally shapes the meta:

* **Bulk-focused species**: Lower CP favors Pokémon with high defense and HP stats over attack stats
* **Legendary restrictions**: Most legendaries exceed 1500 CP, creating a more accessible meta
* **Evolution considerations**: Many pre-evolutions and first-stage evolutions become viable
* **IV optimization**: Lower attack IVs with higher defense/HP maximize stat product under the CP cap

The CP formula heavily influences which species perform well:

```
CP = (Attack × √Defense × √HP × CP_Multiplier²) / 10
```

Higher defense and HP relative to attack yields better stat products at the 1500 CP threshold.

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L2](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L2)

## Data Files and Structure

Great League rankings are stored across seven category-specific JSON files in the `src/data/rankings/all/` directory:

```

```

Sources: [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

 [src/data/rankings/all/consistency/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L1)

 [src/data/overrides/all/1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L1)

### File Locations

| Category | File Path |
| --- | --- |
| Overall | `src/data/rankings/all/overall/rankings-1500.json` |
| Consistency | `src/data/rankings/all/consistency/rankings-1500.json` |
| Leads | `src/data/rankings/all/leads/rankings-1500.json` |
| Switches | `src/data/rankings/all/switches/rankings-1500.json` |
| Closers | `src/data/rankings/all/closers/rankings-1500.json` |
| Chargers | `src/data/rankings/all/chargers/rankings-1500.json` |
| Attackers | `src/data/rankings/all/attackers/rankings-1500.json` |
| Overrides | `src/data/overrides/all/1500.json` |

Each file follows the same schema (see [Rankings Data Structure](/pvpoke/pvpoke/4.1-rankings-data-structure)) but ranks Pokémon differently based on the battle scenario each category simulates.

Sources: [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

 [src/data/rankings/all/consistency/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L1)

 [src/data/rankings/all/leads/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L1)

 [src/data/rankings/all/switches/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json#L1-L1)

 [src/data/rankings/all/closers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json#L1-L1)

 [src/data/rankings/all/chargers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json#L1-L1)

 [src/data/rankings/all/attackers/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json#L1-L1)

 [src/data/overrides/all/1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L1)

## Top Performers Analysis

The following diagram maps the top-tier performers in Great League to their primary roles and defining characteristics:

```

```

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L150)

### Top 10 Overall Rankings

| Rank | Species | Rating | Score | Editor Score | Primary Role |
| --- | --- | --- | --- | --- | --- |
| 1 | Gastrodon | 670 | 93.8 | 95 | Ground/Water Core |
| 2 | Jellicent | 682 | 93.8 | 95 | Ghost Pressure |
| 3 | Furret | 672 | 93.7 | 95 | Normal Generalist |
| 4 | Altaria | 686 | 93.6 | 95 | Dragon/Flying Counter |
| 5 | Azumarill | 615 | 92.4 | 93 | Fairy Bulky Water |
| 6 | Corviknight | 726 | 91.5 | 90 | Steel/Flying Wall |
| 7 | Stunfisk | 650 | 91.0 | - | Electric/Ground Hybrid |
| 8 | Wigglytuff | 645 | 91.0 | - | Charmer Fairy |
| 9 | Goodra | 705 | 90.8 | - | Dragon Special Tank |
| 10 | Bastiodon | 609 | 90.6 | 90 | Extreme Defense Wall |

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L200)

### Editor Annotations

Top performers feature expert-curated notes stored in the `editorNotes` field. Examples:

**Gastrodon** (editorScore: 95):

> "Gastrodon is the premier Ground type. With a solitary weakness to Grass, it's a flexible cornerstone for team building and a defining piece of the metagame. Its main counters are Flying types, in particularly those that resist its Normal or Water-type Charged Attacks."

**Jellicent** (editorScore: 95):

> "Jellicent was a strong Pokemon before, and with the buff to Shadow Ball, it now has all the makings of a top meta Pokemon. Excellent stats, defensive typing, pacing, and power make Jellicent a key pick going forward."

**Furret** (editorScore: 95):

> "Furret has assumed the neutral Normal-type role in place of predecessors like Dunsparce and Lickitung. While it lacks their bulk, its deceptive offenses, valuable Grass coverage, and sheer dominance against Ghosts make it a strong centerpiece in the meta."

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L50)

## Meta Characteristics

Great League meta in the current season exhibits several defining patterns:

```

```

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L100)

### Dominant Archetypes

**1. Mud Slap Ground Types**

* **Representatives**: Gastrodon, Stunfisk, Clodsire, Toedscruel
* **Characteristics**: High Fast Move pressure (3.33 DPT, 2.67 EPT), Water or Electric secondary typing
* **Counters**: Flying types (Altaria, Corviknight), Grass types
* **Data Example**: Gastrodon has 25,115 uses of Mud Slap vs. 17 different Hidden Power variants combined

**2. Ghost Pressure**

* **Representatives**: Jellicent, Sableye (Shadow), Dusknoir (Shadow), Galarian Corsola
* **Characteristics**: Hex (3.0 DPT, 3.33 EPT) or Shadow Claw (3.0 DPT, 2.67 EPT) fast moves
* **Counters**: Charmer Fairies (Wigglytuff, Clefable), Normal types (Furret)
* **Data Example**: Jellicent's Hex usage is 86,525 vs. Bubble at 66,275

**3. Normal Generalists**

* **Representatives**: Furret, Lickilicky, Lickitung
* **Characteristics**: Body Slam spam, Ghost immunity, broad neutral coverage
* **Counters**: Fighting types (Primeape, Annihilape), Steel types (Corviknight)
* **Data Example**: Furret shows 79,417 Sucker Punch uses with 52,157 Swift and 36,433 Trailblaze

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L100)

### Move Usage Statistics

The most common charged moves in Great League (based on top 50 species):

| Charged Move | Frequency | Primary Users | Characteristics |
| --- | --- | --- | --- |
| Body Slam | 12 species | Furret, Lickilicky, Sealeo | 35 energy, 50 power, no effect |
| Shadow Ball | 10 species | Jellicent, Sableye, Dusknoir | 45 energy, 100 power, neutral coverage |
| Ice Beam | 9 species | Azumarill, Lapras, Dewgong | 55 energy, 90 power, Ice coverage |
| Rock Tomb | 8 species | Cradily, Stunfisk, Runerigus | 60 energy, 70 power, -1 Atk debuff |
| Aqua Tail | 7 species | Dragonair, Kingdra, Drapion | 35 energy, 50 power, Water spam |
| Foul Play | 7 species | Sableye, Mandibuzz, Malamar | 45 energy, 70 power, Dark coverage |

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L100)

## Role-Specific Rankings

Each category simulates different battle scenarios to evaluate Pokémon performance. The role categories are documented in detail at [Battle Role Categories](/pvpoke/pvpoke/4.6-battle-role-categories).

### Consistency Leaders

The consistency category evaluates Pokémon that perform well across many shield scenarios. Top performers:

| Rank | Species | Score | Key Trait |
| --- | --- | --- | --- |
| 1 | Stunfisk | 100 | Consistent Ground/Electric typing |
| 2 | Bastiodon | 100 | Extreme defense stat product |
| 3 | Empoleon | 100 | Steel/Water hybrid with Hydro Cannon |
| 4 | Empoleon (Shadow) | 100 | Glass cannon variant |
| 5 | Cradily | 100 | Rock Tomb debuff stacking |

Sources: [src/data/rankings/all/consistency/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-1500.json#L1-L50)

### Lead Rankings

Lead rankings simulate even-shield scenarios (1v1 with equal shields). Top performers:

| Rank | Species | Rating | Score | Lead Strength |
| --- | --- | --- | --- | --- |
| 1 | Primeape | 722 | 100 | Rage Fist pressure |
| 2 | Corviknight | 726 | 99.4 | Defensive Steel/Flying |
| 3 | Araquanid | 711 | 99.3 | Bubble Beam debuff spam |
| 4 | Pangoro | 731 | 98.4 | Fighting/Dark coverage |
| 5 | Sealeo (Shadow) | 721 | 97.8 | Powder Snow + Body Slam |

Sources: [src/data/rankings/all/leads/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-1500.json#L1-L50)

### Switch Rankings

Switch rankings simulate 0-shield scenarios where Pokémon enter mid-battle. Top performers:

| Rank | Species | Rating | Score | Switch Strength |
| --- | --- | --- | --- | --- |
| 1 | Sealeo (Shadow) | 809 | 100 | Altaria counter with shields down |
| 2 | Samurott | 796 | 96.6 | Hydro Cannon + Fury Cutter |
| 3 | Crustle | 811 | 96.3 | Rock Wrecker spam |
| 4 | Sealeo | 772 | 95.6 | Non-shadow consistency |
| 5 | Feraligatr (Shadow) | 791 | 95.5 | Shadow Claw + Hydro Cannon |

Sources: [src/data/rankings/all/switches/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-1500.json#L1-L50)

### Closer Rankings

Closer rankings simulate 2-shield scenarios evaluating late-game potential. Top performers:

| Rank | Species | Rating | Score | Closer Strength |
| --- | --- | --- | --- | --- |
| 1 | Aegislash | 719 | 100 | Blade Forme charge stacking |
| 2 | Registeel | 638 | 92 | Lock-On + Focus Blast/Zap Cannon |
| 3 | Clodsire | 639 | 91.2 | Ground/Poison bulk |
| 4 | Electivire (Shadow) | 669 | 91.2 | Wild Charge + Ice Punch |
| 5 | Carbink | 646 | 90.3 | Rock/Fairy resistance |

Sources: [src/data/rankings/all/closers/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-1500.json#L1-L50)

### Charger Rankings

Charger rankings evaluate Pokémon that quickly build to charged moves. Top performers:

| Rank | Species | Rating | Score | Charger Strength |
| --- | --- | --- | --- | --- |
| 1 | Dusknoir (Shadow) | 840 | 100 | Astonish to Dynamic Punch |
| 2 | Primeape | 863 | 99.3 | Karate Chop to Rage Fist |
| 3 | Primeape (Shadow) | 817 | 99.1 | Shadow pressure variant |
| 4 | Toucannon (Shadow) | 828 | 98.7 | Beak Blast spam |
| 5 | Crustle (Shadow) | 855 | 98.1 | Fury Cutter energy generation |

Sources: [src/data/rankings/all/chargers/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-1500.json#L1-L50)

### Attacker Rankings

Attacker rankings evaluate raw offensive pressure with reduced defensive weighting. Top performers:

| Rank | Species | Score | Attacker Strength |
| --- | --- | --- | --- |
| 1 | Bastiodon | 100 | Smack Down pressure vs. Fliers |
| 2 | Corviknight | 99.2 | Air Cutter spam |
| 3 | Araquanid | 98 | Bug Bite + Water Pulse |
| 4 | Carbink | 98 | Rock Throw pressure |
| 5 | Bastiodon (Shadow) | 95.6 | Shadow Smack Down |

Sources: [src/data/rankings/all/attackers/rankings-1500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-1500.json#L1-L50)

## Overrides and Customization

The `src/data/overrides/all/1500.json` file contains editorial curation for Great League, specifying:

* **Recommended movesets**: Optimal fast move and charged move combinations
* **Weight values**: Usage priority for ranking calculations (1-23 observed range)
* **Editor scores**: Expert-assigned ratings (0-95 scale)
* **Editor notes**: Strategic analysis and meta commentary

### Override Data Structure

```

```

Sources: [src/data/overrides/all/1500.json L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L10)

### Highest Weight Pokémon

Weight indicates meta relevance and simulation priority:

| Species | Weight | Interpretation |
| --- | --- | --- |
| Gastrodon | 23 | Most dominant meta presence |
| Cradily | 22 | Core defensive pivot |
| Azumarill | 22 | Historical meta staple |
| Altaria | 19 | Dragon/Flying counter core |
| Furret | 18 | Rising Normal generalist |
| Empoleon | 15 | Steel/Water hybrid threat |
| Corviknight | 15 | Defensive Steel wall |

Sources: [src/data/overrides/all/1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L100)

### Shadow Pokémon Weighting

Shadow variants typically receive lower weights (1-10) despite higher damage output due to:

* Higher resource cost (Frustration TM removal)
* Reduced bulk from shadow penalty
* Limited availability windows

Example: Gastrodon (weight: 23) vs. Gastrodon Shadow (weight: 1)

Sources: [src/data/overrides/all/1500.json L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L200)

## Matchup and Counter Data

Each ranking entry includes `matchups` and `counters` arrays identifying key battles:

### Matchup Data Format

```

```

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L10)

### Example: Gastrodon Matchups

**Top 5 Favorable Matchups**:

```

```

* Gastrodon: 782/1000 (78.2% win probability)
* Stunfisk: 217/1000 (21.7% win probability)

**Top 5 Counters**:

```

```

* Gastrodon: 231/1000 (23.1% win probability)
* Altaria significantly favored

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L5](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L5)

## Statistical Distribution

Score distribution across the Great League meta (scores array: [overall, leads, switches, closers, chargers, attackers]):

```

```

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L5](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L5)

### Score Ranges by Tier

| Tier | Score Range | Example Pokémon |
| --- | --- | --- |
| S+ Tier | 93.5+ | Gastrodon, Jellicent, Furret, Altaria |
| S Tier | 90.0-93.4 | Azumarill, Corviknight, Stunfisk, Wigglytuff |
| A Tier | 85.0-89.9 | Clefable, Clodsire, Tinkaton, Umbreon |
| B Tier | 80.0-84.9 | Lower ranked meta picks |
| C Tier | <80.0 | Niche or outclassed species |

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L150)

## CP and Stat Products

Great League's 1500 CP limit creates a unique stat optimization landscape:

### Top Stat Products

| Species | Stat Product | Attack | Defense | HP | Type Advantage |
| --- | --- | --- | --- | --- | --- |
| Bastiodon | 2776 | 80.6 | 247.6 | 139 | Extreme defense |
| Melmetal | ~2500 | Variable | Variable | Variable | Steel bulk |
| Azumarill | 2400 | 93.4 | 134.4 | 191 | Fairy + Water |
| Mandibuzz | 2440 | 92.1 | 151.2 | 175 | Flying/Dark |
| Clodsire | 2367 | 95.0 | 119.7 | 208 | HP specialist |

Formula: `Stat Product = Attack × Defense × HP`

Higher stat products generally correlate with better overall ratings, though typing and movesets remain crucial factors.

Sources: [src/data/rankings/all/overall/rankings-1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L100)

### IV Optimization Patterns

Great League heavily favors low Attack, high Defense/HP IVs (commonly 0/15/15 or similar "rank 1" spreads) to maximize stat product under the CP cap. Exceptions include:

* **XL species** (Medicham, Sableye): Different IV breakpoints due to level scaling
* **Shadow Pokémon**: Attack boost may warrant different spreads
* **Mirror matchups**: CMP (Charged Move Priority) considerations

This data is calculated by the `Pokemon.js` class during initialization.

Sources: [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

## Integration with Battle System

Rankings data flows into live battle simulations and team building:

```

```

Sources: [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)

 [src/data/overrides/all/1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/1500.json#L1-L1)

### Simulation Parameters

Rankings are generated using standardized battle parameters:

* **Shield scenarios**: Varies by category (0v0, 1v1, 2v2)
* **Starting energy**: 0 for both Pokémon
* **IV spreads**: Optimal for each species (typically low Attack, high Defense/HP)
* **Move selections**: Based on usage data and editorial picks from overrides

These parameters are configured in the `Battle.js` simulation engine.

Sources: [src/data/rankings/all/overall/rankings-1500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-1500.json#L1-L1)