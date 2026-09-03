# Ultra League Rankings (2500 CP)

> **Relevant source files**
> * [src/data/rankings/all/attackers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-2500.json)
> * [src/data/rankings/all/chargers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-2500.json)
> * [src/data/rankings/all/closers/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-2500.json)
> * [src/data/rankings/all/consistency/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-2500.json)
> * [src/data/rankings/all/leads/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-2500.json)
> * [src/data/rankings/all/overall/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json)
> * [src/data/rankings/all/switches/rankings-2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-2500.json)

## Purpose and Scope

This page documents the pre-calculated rankings data for Ultra League, one of the three main competitive formats in Pokémon GO PvP. Ultra League enforces a 2500 CP limit on all participating Pokémon. This document covers the data structure, file organization, top meta performers, and meta analysis specific to this format.

For information about the general rankings data structure shared across all leagues, see [Rankings Data Structure](/pvpoke/pvpoke/4.1-rankings-data-structure). For other competitive leagues, see [Great League Rankings](/pvpoke/pvpoke/4.2-great-league-rankings-(1500-cp)) and [Master League Rankings](/pvpoke/pvpoke/4.4-master-league-rankings-(10000-cp)). For an explanation of the seven ranking categories, see [Battle Role Categories](/pvpoke/pvpoke/4.6-battle-role-categories).

## Overview

Ultra League is the mid-tier competitive format in Pokémon GO PvP with a CP cap of 2500. This league sits between Great League (1500 CP) and Master League (no cap), offering a unique meta where certain Pokémon find their optimal performance window. The higher CP limit allows for greater stat product diversity compared to Great League while maintaining some accessibility compared to Master League's legendary-heavy meta.

The rankings data files contain pre-calculated battle simulation results for all eligible Pokémon, organized into seven battle role categories. Each category evaluates Pokémon based on different strategic contexts within 3v3 team battles.

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L10)

## File Structure and Organization

### Data File Locations

```

```

All seven category files follow identical schema structures but contain different rankings based on their evaluation criteria. The file naming convention is consistent: `rankings-2500.json` in each category subdirectory.

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L1)

 [src/data/rankings/all/consistency/rankings-2500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-2500.json#L1-L1)

 [src/data/rankings/all/leads/rankings-2500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-2500.json#L1-L1)

## Top Meta Performers

### Overall Rankings

The overall rankings aggregate performance across all battle contexts. Here are the top 10 performers:

| Rank | Pokémon | Rating | Score | Key Strengths |
| --- | --- | --- | --- | --- |
| 1 | Galarian Moltres | 672 | 96.7 | Gastrodon (772), Feraligatr (683), Florges (658) |
| 2 | Corviknight | 717 | 95.6 | Gastrodon (652), Virizion (645), Giratina-A (546) |
| 3 | Lapras | 697 | 95.5 | Virizion (638), Togekiss (634), Feraligatr (599) |
| 4 | Jellicent | 671 | 95.1 | Gastrodon (650), Empoleon (619), Lapras (604) |
| 5 | Shadow Lapras | 679 | 94.9 | Corviknight (670), Gastrodon (610), Feraligatr (597) |
| 6 | Empoleon | 684 | 94.6 | Clefable (731), Florges (563), Togekiss (550) |
| 7 | Florges | 641 | 94.6 | Lapras (618), Gastrodon (611), Jellicent (608) |
| 8 | Shadow Empoleon | 697 | 94.4 | Togekiss (870), Clefable (784), Florges (724) |
| 9 | Shadow Feraligatr | 668 | 94.4 | Togekiss (581), Corviknight (559), Jellicent (537) |
| 10 | Clefable | 695 | 94.3 | Giratina-A (769), Virizion (767), Zygarde-C (693) |

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L500)

### Category Leaders

Different Pokémon excel in specific battle roles:

| Category | Top Performer | Rating | Optimal Moveset | Score |
| --- | --- | --- | --- | --- |
| **Consistency** | Empoleon | 684 | Metal Sound + Hydro Cannon + Drill Peck | 100 |
| **Leads** | Corviknight | 717 | Sand Attack + Air Cutter + Payback | 100 |
| **Switches** | Shadow Feraligatr | 780 | Shadow Claw + Hydro Cannon + Ice Beam | 100 |
| **Closers** | Registeel | 631 | Lock-On + Focus Blast + Zap Cannon | 100 |
| **Chargers** | Shadow Dusknoir | 821 | Astonish + Dynamic Punch + Shadow Punch | 100 |
| **Attackers** | Corviknight | 526 | Sand Attack + Air Cutter + Payback | 100 |

**Sources:** [src/data/rankings/all/consistency/rankings-2500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-2500.json#L1-L50)

 [src/data/rankings/all/leads/rankings-2500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-2500.json#L1-L50)

 [src/data/rankings/all/switches/rankings-2500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-2500.json#L1-L50)

 [src/data/rankings/all/closers/rankings-2500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-2500.json#L1-L50)

 [src/data/rankings/all/chargers/rankings-2500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-2500.json#L1-L50)

 [src/data/rankings/all/attackers/rankings-2500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-2500.json#L1-L50)

## Meta Analysis

### Core Meta Characteristics

The Ultra League meta is characterized by several dominant archetypes based on editor annotations in the data files:

#### Water/Ice Types

Lapras remains "an excellent, flexible pick in the format" despite Bellibolt's prominence. Both regular and Shadow variants perform well, with editor scores of 95. The format's bulk allows Lapras to leverage its defensive typing effectively.

```
"editorNotes": "Lapras continues to be an excellent, flexible pick in the format. 
Bellibolt's prominence adds a wrinkle, but hasn't yet pushed Lapras out of the top meta."
```

#### Steel/Flying Types

Corviknight has established itself as a foundational pick with an editor score of 95:

```
"editorNotes": "Ultra League gives Corviknight more room to flex its bulk. It pairs 
excellently with other top picks of the format, like Bellibolt or Gastrodon, making it 
a foundational pick for team building."
```

#### Steel/Water Types

Empoleon benefits significantly from Ultra League's higher CP cap with an editor score of 95:

```
"editorNotes": "Impressive typing and pacing make Empoleon a standout Hydro Cannon user 
in the format. It's found stronger meta relevancy here in Ultra League, where a wider 
abundance of Dragon and Fairy types see play."
```

#### Fairy Types

Florges (editor score 95) serves as a top-tier Fairy option with improved pacing over similar Pokémon:

```python
"editorNotes": "Florges echoes Tapu Fini, but brings improved pacing and closing power 
which make it a top meta contender. Stat effects from either Chilling Water or Trailblaze 
amplify Florges's neutral play."
```

#### Fighting/Grass Types

Virizion has reached peak meta relevance with an editor score of 95:

```
"editorNotes": "Virizion has a long pedigree in Ultra League. Its hard wins against 
Bellibolt and Gastrodon outshine its potential inflexibility. With Talonflame and 
Giratina on a significant downturn, it is perhaps at its most meta relevant ever."
```

#### Declining Meta Threats

Giratina (Altered) has seen reduced play despite historical dominance (editor score 90):

```
"editorNotes": "Once the mascot of the format, recent changes have seen Giratina's play 
decline. It is weak to both of its sub-typings and no longer stands out as the best Ghost 
or the best Dragon."
```

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L2000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L2000)

## Data Schema

### Entry Structure

Each ranking entry follows this schema:

```

```

### Detailed Field Breakdown

| Field | Type | Description |
| --- | --- | --- |
| `speciesId` | string | Internal identifier (e.g., `"moltres_galarian"`) |
| `speciesName` | string | Display name (e.g., `"Moltres (Galarian)"`) |
| `rating` | number | Overall matchup rating against the meta |
| `matchups` | array | Top 5 favorable matchups with opponent and rating |
| `counters` | array | Top 5 threatening matchups with opponent and rating |
| `moves.fastMoves` | array | Fast move options with usage statistics |
| `moves.chargedMoves` | array | Charged move options with usage statistics |
| `moveset` | array | Recommended moveset (1 fast + 2 charged) |
| `score` | number | Normalized performance score (0-100) |
| `scores` | array | Six category-specific scores |
| `stats` | object | Stat product, attack, defense, HP at 2500 CP |
| `editorScore` | number | Optional human-curated score |
| `editorNotes` | string | Optional meta analysis commentary |

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L100)

### Example Entry

```

```

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L39-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L39-L76)

## Move Usage Statistics

### Understanding Move Usage Data

The `moves` object contains usage statistics from simulated battles. Higher usage values indicate more popular or effective moves in the meta:

```

```

Example from Lapras:

* **Fast Moves**: Psywave (42,520 uses) > Ice Shard (31,147) > Water Gun (28,573)
* **Charged Moves**: Sparkling Aria (34,747 uses) > Ice Beam (23,791) > Surf (15,386)

The recommended moveset array synthesizes this data: `["PSYWAVE", "SPARKLING_ARIA", "ICE_BEAM"]`

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L77-L131](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L77-L131)

## Score Components

### Six-Dimensional Scoring

Each Pokémon receives a `scores` array with six values corresponding to different battle contexts. The order maps to these categories:

1. **Leads** - Performance when starting the battle
2. **Switches** - Effectiveness when swapped in
3. **Closers** - Endgame performance with limited HP/shields
4. **Attackers** - Direct damage output capability
5. **Consistency** - Reliability across matchups
6. **Chargers** - Energy generation and pressure

Example score breakdown for Galarian Moltres:

```yaml
scores: [99.1, 98.4, 90.3, 97.0, 86.5, 88.4]
```

This shows exceptional lead (99.1) and switch (98.4) performance, but lower consistency (86.5).

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L50)

## Data Consumption Flow

```

```

The rankings display system loads the appropriate `rankings-2500.json` file based on user-selected category and league. Overrides and group data augment the base rankings with editorial content and format-specific configurations.

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L1)

 Referenced from system architecture diagrams

## Matchup Rating System

### Rating Interpretation

Matchup ratings indicate battle simulation outcomes on a scale where 500 represents an even matchup:

| Rating Range | Interpretation |
| --- | --- |
| 800+ | Dominant victory (hard counter) |
| 700-799 | Strong advantage |
| 600-699 | Moderate advantage |
| 500-599 | Slight advantage |
| 400-499 | Slight disadvantage |
| 300-399 | Moderate disadvantage |
| 200-299 | Strong disadvantage |
| <200 | Severe disadvantage (hard counter) |

Example from Empoleon's matchups:

* vs Clefable: 731 rating (strong advantage)
* vs Gastrodon: 308 counter rating (moderate disadvantage)

Some matchup entries include `opRating` showing the opponent's perspective:

```

```

This indicates Empoleon has a slight advantage (550) while Togekiss faces a disadvantage (449).

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L132-L171](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L132-L171)

## Stat Product Calculations

### CP Cap Optimization

The `stats` object shows each Pokémon's optimized stat distribution at the 2500 CP cap:

```

```

Example stat comparisons:

| Pokémon | Stat Product | Attack | Defense | HP | Optimization Strategy |
| --- | --- | --- | --- | --- | --- |
| Corviknight | 4522 | 137.8 | 170.0 | 193 | Bulk-focused (high def/hp) |
| Lapras | 4638 | 133.9 | 149.8 | 231 | HP-weighted |
| Regidrago | 4031 | 154.5 | 84.3 | 309 | Glass cannon (low def) |
| Empoleon | 3856 | 161.9 | 150.7 | 158 | Attack-weighted |

Higher stat products generally indicate better bulk, but attack-weighted distributions may excel in specific matchups despite lower products.

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L200)

## Category-Specific Insights

### Chargers Category

The chargers category rewards Pokémon with exceptional energy generation for applying shield pressure:

Top 5 Chargers:

1. **Shadow Dusknoir** (821 rating, 100 score) - Fast energy gain with Astonish
2. **Shadow Hydreigon** (837 rating, 98.9 score) - Dragon Breath efficiency
3. **Shadow Toucannon** (829 rating, 98.9 score) - Peck + Beak Blast spam
4. **Palkia** (824 rating, 98.7 score) - Aqua Tail accessibility
5. **Primeape** (857 rating, 98.5 score) - Karate Chop + Rage Fist

These Pokémon force opponents to use shields early, creating endgame advantages.

**Sources:** [src/data/rankings/all/chargers/rankings-2500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-2500.json#L1-L100)

### Closers Category

The closers category evaluates endgame performance when shields are depleted:

Top 5 Closers:

1. **Registeel** (631 rating, 100 score) - Lock-On flexibility with no shield reliance
2. **Galarian Moltres** (629 rating, 98.4 score) - Strong neutral damage
3. **Jellicent** (609 rating, 98.2 score) - Spammy moves for chip damage
4. **Lapras** (621 rating, 98.2 score) - Bulk enables shield-less trades
5. **Clefable** (634 rating, 97.7 score) - Hard counters remain effective

**Sources:** [src/data/rankings/all/closers/rankings-2500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-2500.json#L1-L100)

## Format-Specific Meta Shifts

### Ultra League vs Other Leagues

Ultra League's 2500 CP cap creates distinct meta differences:

**Advantages Over Great League:**

* Empoleon gains viability: "It's found stronger meta relevancy here in Ultra League, where a wider abundance of Dragon and Fairy types see play"
* Corviknight has "more room to flex its bulk"
* Cradily: "The format's bulk improves its play with Rock Tomb"

**Advantages Over Master League:**

* More accessible than legendary-heavy Master League
* Greater stat product diversity (not purely stat-capped)
* Virizion: "With Talonflame and Giratina on a significant downturn, it is perhaps at its most meta relevant ever"

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L500)

## Usage in Application

### Rankings Display Interface

The rankings data is consumed by `rankings.php` and related JavaScript interfaces:

1. **League Selection**: User selects "Ultra League" (2500 CP)
2. **Category Selection**: Chooses from 7 categories (overall/consistency/leads/etc.)
3. **Data Loading**: System loads appropriate `rankings-2500.json` file
4. **Rendering**: Displays ranked list with matchup details and move recommendations
5. **Filtering**: Users can filter by type, move, or search for specific Pokémon

The interface leverages the pre-calculated data to provide instant meta insights without runtime simulation costs.

**Sources:** Referenced from overall system architecture

## Historical Context

Editor notes reveal meta evolution:

### Recently Improved:

* **Virizion**: "perhaps at its most meta relevant ever"
* **Gastrodon**: "has become a staple in the format"

### Recently Declined:

* **Giratina (Altered)**: "Once the mascot of the format, recent changes have seen Giratina's play decline"
* **Cresselia**: "could see some resurgence but has thus far failed to find a foothold in the metagame"

### Current Concerns:

* **Bellibolt Impact**: Multiple notes mention Bellibolt's prominence affecting Water and Ice types
* **Power Creep**: Cresselia "overshadowed by power creep over the years"

**Sources:** [src/data/rankings/all/overall/rankings-2500.json L1-L1000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-2500.json#L1-L1000)