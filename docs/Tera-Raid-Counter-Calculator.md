# Tera Raid Counter Calculator

> **Relevant source files**
> * [src/tera/css/tera-style.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.css)
> * [src/tera/css/tera-style.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.css.map)
> * [src/tera/css/tera-style.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.scss)
> * [src/tera/data/gamemaster.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/data/gamemaster.json)
> * [src/tera/footer.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/footer.php)
> * [src/tera/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/header.php)
> * [src/tera/img/bg.jpg](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/img/bg.jpg)
> * [src/tera/img/options.png](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/img/options.png)
> * [src/tera/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/index.php)
> * [src/tera/js/GameMaster.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/GameMaster.js)
> * [src/tera/js/Pokemon.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Pokemon.js)
> * [src/tera/js/TeraInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js)
> * [src/tera/js/TeraRanker.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js)
> * [src/tera/js/Trait.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Trait.js)
> * [src/tera/modules/ads/base-code.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/modules/ads/base-code.php)
> * [src/tera/modules/ads/mobile-320.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/modules/ads/mobile-320.php)
> * [src/tera/modules/ads/nitro-sidebar-left-300.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/modules/ads/nitro-sidebar-left-300.php)

## Purpose and Scope

The Tera Raid Counter Calculator is a specialized tool for evaluating Pokemon effectiveness against Tera Raid bosses in Pokemon Scarlet & Pokemon Violet. This system operates independently from the main PvPoke battle simulator, using a separate data format and scoring algorithm tailored to the Tera mechanic introduced in Generation IX.

For information about the core PvP battle system, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine). For the main PvPoke rankings system, see [Rankings System](/pvpoke/pvpoke/4-rankings-system).

## System Architecture

The Tera Raid system consists of a client-side JavaScript application that loads Pokemon data, accepts user-configured raid boss parameters, and ranks potential attackers based on offensive and defensive type matchups.

**System Component Overview**

```

```

**Sources:** [src/tera/index.php L220-L227](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/index.php#L220-L227)

 [src/tera/header.php L1-L115](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/header.php#L1-L115)

 [src/tera/js/TeraInterface.js L1-L640](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L1-L640)

## Data Model

### GameMaster Data Structure

The Tera Raid system uses a separate `gamemaster.json` file with a distinct schema from the main PvPoke data. Each Pokemon entry includes Generation IX base stats and optional trait associations.

**Pokemon Entry Schema**

| Field | Type | Description | Example |
| --- | --- | --- | --- |
| `id` | string | Unique identifier | `"garchomp"` |
| `name` | string | Display name | `"Garchomp"` |
| `types` | string[] | Base types (1-2) | `["dragon", "ground"]` |
| `stats.hp` | number | Base HP stat | `108` |
| `stats.atk` | number | Base Attack stat | `130` |
| `stats.def` | number | Base Defense stat | `95` |
| `stats.spA` | number | Base Special Attack stat | `80` |
| `stats.spD` | number | Base Special Defense stat | `85` |
| `stats.spe` | number | Base Speed stat | `102` |
| `traits` | string[] | Optional trait IDs | `["intimidate"]` |
| `defaults` | object | Optional preset configuration | See below |

**Defaults Configuration**

Some Pokemon have pre-configured defaults for common raid boss setups:

```

```

**Sources:** [src/tera/data/gamemaster.json L1-L9000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/data/gamemaster.json#L1-L9000)

 [src/tera/js/GameMaster.js L9-L34](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/GameMaster.js#L9-L34)

### Pokemon Class

The `Pokemon` class ([src/tera/js/Pokemon.js L5](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Pokemon.js#L5-L5)

) represents individual Pokemon instances with type, stats, Tera type, and trait configuration.

```

```

**Key Methods:**

* `stat(name)`: Returns effective stat value with trait modifiers applied ([src/tera/js/Pokemon.js L55-L63](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Pokemon.js#L55-L63) )
* `enableTrait(id)`: Activates a trait; exclusive traits (abilities) disable others ([src/tera/js/Pokemon.js L72-L91](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Pokemon.js#L72-L91) )
* `hasTrait(id)`: Checks if trait is active, used throughout scoring calculations ([src/tera/js/Pokemon.js L118-L128](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Pokemon.js#L118-L128) )

**Sources:** [src/tera/js/Pokemon.js L1-L173](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Pokemon.js#L1-L173)

### Trait System

The `Trait` class represents Pokemon abilities and other passive effects that modify type matchups or stats. Traits are categorized by type:

* **ability**: Exclusive traits (one active at a time) like `"intimidate"`, `"huge_power"`
* **move**: Non-exclusive traits that can stack

**Trait Effect Examples**

| Trait ID | Effect | Implementation |
| --- | --- | --- |
| `water_absorb` | Immune to Water moves | `Trait.evaluateType()` returns 0× effectiveness |
| `thick_fat` | Resists Fire/Ice moves | Returns 0.5× effectiveness for Fire/Ice |
| `huge_power` | Doubles Attack stat | `Trait.evaluateStat("atk")` returns 2× multiplier |
| `intimidate` | Reduces opponent's Attack | Opponent's `stat("atk")` returns 0.8× value |
| `levitate` | Immune to Ground moves | Returns 0× effectiveness for Ground |

**Sources:** [src/tera/js/Trait.js L1-L117](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Trait.js#L1-L117)

 [src/tera/data/gamemaster.json L122-L148](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/data/gamemaster.json#L122-L148)

## Scoring Algorithm

The `TeraRanker` class implements a dual-scoring system that evaluates both offensive potential and defensive survivability against a configured raid boss.

### Ranking Process Flow

```

```

**Sources:** [src/tera/js/TeraRanker.js L13-L37](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L13-L37)

 [src/tera/js/TeraRanker.js L162-L207](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L162-L207)

### Offensive Scoring

The `scoreOffense()` method ([src/tera/js/TeraRanker.js L41-L87](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L41-L87)

) calculates damage output potential:

**Offense Calculation Steps:**

1. **Base Type Effectiveness**: Evaluate attacker's natural types against boss's Tera type ``` ```
2. **Tera Type Effectiveness**: Evaluate attacker's Tera type ``` ```
3. **Weighted Average**: ``` ```
4. **Stat Modifier**: Factor in relevant offensive and defensive stats ``` ```
5. **Final Score**: `offenseScore = typeScore × statScore`

**STAB (Same-Type Attack Bonus) Calculation:**

| Condition | STAB Multiplier |
| --- | --- |
| Base type only | 1.5× |
| Tera type only | 1.5× |
| Base type = Tera type | 2.0× |
| With Adaptability trait | 2.0× / 2.25× |

**Sources:** [src/tera/js/TeraRanker.js L41-L87](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L41-L87)

 [src/tera/js/TeraRanker.js L259-L273](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L259-L273)

### Defensive Scoring

The `scoreDefense()` method ([src/tera/js/TeraRanker.js L91-L158](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L91-L158)

) calculates damage mitigation:

**Defense Calculation Steps:**

1. **Base Type Defense**: For each boss attack type ``` ```
2. **Weighted Threat Assessment**: ``` ```
3. **Tera Type Defense**: Recalculate with Tera type replacing base types ``` ```
4. **Weighted Average**: ``` ```
5. **Stat Modifier**: Factor in bulk ``` ```
6. **Final Score**: `defenseScore = typeScore × statScore / 3.375`

The division by 3.375 normalizes defense scores to match the scale of offense scores ([src/tera/js/TeraRanker.js L155](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L155-L155)

).

**Sources:** [src/tera/js/TeraRanker.js L91-L158](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L91-L158)

### Type Effectiveness Matrix

The `getEffectiveness()` method ([src/tera/js/TeraRanker.js L235-L256](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L235-L256)

) implements the standard Pokemon type chart with trait modifications applied via `getEffectivenessTraits()` ([src/tera/js/TeraRanker.js L225-L231](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L225-L231)

).

**Trait Type Interactions:**

```

```

**Sources:** [src/tera/js/Trait.js L28-L69](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/Trait.js#L28-L69)

 [src/tera/js/TeraRanker.js L277-L395](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraRanker.js#L277-L395)

## User Interface Flow

### Raid Boss Configuration

The `InterfaceMaster` singleton ([src/tera/js/TeraInterface.js L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L1-L1)

) manages the user interface through jQuery event handlers.

**Boss Configuration Interface Elements:**

```

```

**Key Event Handlers:**

| Event | Element | Handler | Line Reference |
| --- | --- | --- | --- |
| Input search | `#poke-search` | Autocomplete Pokemon name | [src/tera/js/TeraInterface.js L275-L287](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L275-L287) |
| Pokemon select | `#poke-select` | `selectNewPokemon()` | [src/tera/js/TeraInterface.js L336-L340](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L336-L340) |
| Tera type select | `#tera-select` | Updates `selectedTera` with animation | [src/tera/js/TeraInterface.js L343-L358](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L343-L358) |
| Add attack type | `#attack-type-select` | Appends to `selectedTypes` | [src/tera/js/TeraInterface.js L361-L368](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L361-L368) |
| Remove attack type | `.type-item a.close` | Splices from `selectedTypes` | [src/tera/js/TeraInterface.js L371-L380](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L371-L380) |
| Toggle trait | `.boss-section .trait-item` | `enableTrait()` / `disableTrait()` | [src/tera/js/TeraInterface.js L383-L391](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L383-L391) |

**Sources:** [src/tera/js/TeraInterface.js L220-L534](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L220-L534)

 [src/tera/index.php L31-L121](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/index.php#L31-L121)

### Results Display

After clicking the "Check Counters" button ([src/tera/index.php L124](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/index.php#L124-L124)

), the interface displays ranked results in a scrollable table.

**Results Table Structure:**

```

```

**Display Logic ([src/tera/js/TeraInterface.js L40-L144](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L40-L144)

):**

1. **Sorting**: Results sorted by `displayOptions.sort` (overall/offense/defense)
2. **Filtering**: When `showBest=true`, only highest-scored variant per species shown
3. **Pagination**: Limited to 50 entries for performance
4. **Row Content**: * Pokemon name with active traits * Base typing labels * Tera type label * Calculated score (clickable for details)

**Score Detail Modal:**

Clicking a score opens a modal ([src/tera/js/TeraInterface.js L394-L427](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L394-L427)

) showing:

* Overall counter score
* Offensive score
* Defensive score
* Type matchup breakdown
* Active traits

**Sources:** [src/tera/js/TeraInterface.js L40-L450](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L40-L450)

 [src/tera/index.php L126-L216](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/index.php#L126-L216)

### Results Filtering

The `filterResults()` method ([src/tera/js/TeraInterface.js L557-L619](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L557-L619)

) supports advanced search syntax:

**Filter Syntax:**

| Query | Matches |
| --- | --- |
| `azumarill` | Pokemon name starts with "azumarill" |
| `water` | Pokemon with Water typing |
| `@steel` | Pokemon with Steel Tera type |
| `water&fairy` | Pokemon with both Water AND Fairy types |
| `water,fire` | Pokemon with Water OR Fire type |
| `!dragon` | Pokemon WITHOUT Dragon type |
| `water&!dragon` | Water type but NOT Dragon |

**Sources:** [src/tera/js/TeraInterface.js L296-L321](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L296-L321)

 [src/tera/js/TeraInterface.js L557-L619](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L557-L619)

## URL State Management

The system uses pushState for shareable URLs with the pattern:

```
/tera/{pokemonId}/{teraType}/{attackTypes}/{traits}
```

**URL Parameter Mapping:**

| Parameter | Query Key | Description | Example |
| --- | --- | --- | --- |
| Pokemon | `p` | Pokemon species ID | `garchomp` |
| Tera Type | `t` | Selected Tera type | `ground` |
| Attack Types | `a` | Hyphen-separated types | `dragon-ground-rock` |
| Traits | `tr` | Hyphen-separated trait IDs | `intimidate-sand_force` |

**State Persistence Flow:**

```

```

**State Loading ([src/tera/js/TeraInterface.js L148-L216](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L148-L216)

):**

When loading from URL:

1. Parse `get` object populated by PHP ([src/tera/header.php L87-L98](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/header.php#L87-L98) )
2. Instantiate `selectedPokemon` from `p` parameter
3. Set `selectedTera` from `t` parameter
4. Parse `a` parameter into `selectedTypes` array
5. Parse `tr` parameter and enable specified traits
6. Execute ranking and display results

**Sources:** [src/tera/js/TeraInterface.js L148-L216](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L148-L216)

 [src/tera/js/TeraInterface.js L220-L270](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L220-L270)

 [src/tera/header.php L87-L98](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/header.php#L87-L98)

 [src/tera/index.php L3-L13](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/index.php#L3-L13)

## Tera Type Visual System

The system uses dynamic CSS classes and background gradients to represent each Pokemon type and Tera type visually.

**Type Color Implementation:**

Each of the 18 Pokemon types has:

* A CSS class with gradient background ([src/tera/css/tera-style.scss L387-L404](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.scss#L387-L404) )
* An icon image ([src/tera/css/tera-style.scss L347-L364](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.scss#L347-L364) )
* Dynamic `.boss-section` background when selected as Tera type ([src/tera/css/tera-style.scss L327-L344](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.scss#L327-L344) )

**Type Label Component:**

```

```

The Tera type receives a special crystallized border style ([src/tera/css/tera-style.scss L417-L418](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.scss#L417-L418)

) to distinguish it from base types.

**Sources:** [src/tera/css/tera-style.scss L226-L345](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.scss#L226-L345)

 [src/tera/css/tera-style.scss L385-L449](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/css/tera-style.scss#L385-L449)

 [src/tera/js/TeraInterface.js L536-L554](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/tera/js/TeraInterface.js#L536-L554)