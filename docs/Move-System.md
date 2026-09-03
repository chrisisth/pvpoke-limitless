# Move System

> **Relevant source files**
> * [src/battle.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php)
> * [src/css/style.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css)
> * [src/css/style.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.css.map)
> * [src/css/style.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/style.scss)
> * [src/data/formats.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/formats.php)
> * [src/data/gamemaster.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json)
> * [src/data/gamemaster.min.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.min.json)
> * [src/data/gamemaster/formats.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/formats.json)
> * [src/data/gamemaster/moves.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json)
> * [src/data/gamemaster/pokemon.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json)
> * [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)
> * [src/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/index.php)
> * [src/js/GameMaster.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js)
> * [src/js/battle/Battle.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js)
> * [src/js/interface/Interface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js)
> * [src/js/interface/PokeMultiSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeMultiSelect.js)
> * [src/js/interface/PokeSelect.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js)
> * [src/js/interface/RankingInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js)
> * [src/js/interface/TeamInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TeamInterface.js)
> * [src/js/pokemon/Pokemon.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js)
> * [src/modules/cupselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/cupselect.php)
> * [src/modules/formatselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/formatselect.php)
> * [src/modules/pokemultiselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokemultiselect.php)
> * [src/modules/pokeselect.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/modules/pokeselect.php)
> * [src/rankings.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rankings.php)
> * [src/rss/feed.xml](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/rss/feed.xml)
> * [src/team-builder.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/team-builder.php)

This page documents the move system in PvPoke's battle simulation engine. Moves are the primary actions Pokemon perform during battles, consisting of Fast Moves (energy generators) and Charged Moves (energy consumers with higher damage).

For information about how moves are executed within battles, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine). For Pokemon-specific move selection and initialization, see [Pokemon Class](/pvpoke/pvpoke/3.2-pokemon-class).

---

## Move Categories

PvPoke implements two distinct move categories that correspond to Pokemon GO's combat mechanics:

### Fast Moves

Fast moves are executed continuously during battle, generating energy for charged moves. Key characteristics:

* **energy** field is always `0` (they don't consume energy)
* **energyGain** field determines how much energy is generated per use
* Lower power compared to charged moves
* Execute in fixed turn intervals (1-5 turns typically)
* Cannot be shielded

### Charged Moves

Charged moves consume energy and deal higher damage. Key characteristics:

* **energy** field specifies the energy cost (35-100 typically)
* **energyGain** field is always `0`
* Higher power values
* Can be shielded by opponents
* May apply stat buffs/debuffs
* Pokemon can know up to 2 charged moves simultaneously

Sources: [src/data/gamemaster/moves.json L1-L113203](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L1-L113203)

---

## Move Data Structure

All moves are defined in the GameMaster data files with the following schema:

```

```

### Core Properties

| Property | Type | Description | Example |
| --- | --- | --- | --- |
| `moveId` | string | Unique identifier (uppercase) | `"ACID"`, `"HYDRO_CANNON"` |
| `name` | string | Display name | `"Acid"`, `"Hydro Cannon"` |
| `abbreviation` | string | Short form for UI | `"Ac"`, `"HC"` |
| `type` | string | Move type (affects effectiveness) | `"poison"`, `"water"` |
| `power` | number | Base damage before modifiers | `6`, `80` |
| `energy` | number | Energy cost (0 for fast moves) | `0`, `40` |
| `energyGain` | number | Energy generated (0 for charged) | `8`, `0` |
| `cooldown` | number | Duration in milliseconds | `1000`, `500` |
| `turns` | number | PvP turn count (500ms per turn) | `2`, `1` |
| `archetype` | string | Move classification | `"Multipurpose"`, `"Debuff"`, `"High Energy"` |

Sources: [src/data/gamemaster/moves.json L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L1-L50)

 [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)

---

## Move Effects and Buffs

Charged moves can apply stat modifications through the buff system:

```

```

### Buff Array Format

The `buffs` array contains two integers: `[attackChange, defenseChange]`

**Examples:**

* `[1, 0]` - Raises attacker's attack by 1 stage
* `[0, -2]` - Lowers opponent's defense by 2 stages
* `[2, 2]` - Raises attacker's attack AND defense by 2 stages
* `[-1, -1]` - Lowers attacker's attack AND defense by 1 stage (self-debuff)

### Buff Application Properties

| Property | Type | Description | Example Values |
| --- | --- | --- | --- |
| `buffs` | array | `[attack, defense]` stage changes | `[1, 0]`, `[0, -2]`, `[2, 2]` |
| `buffTarget` | string | Who receives the buff | `"self"`, `"opponent"` |
| `buffApplyChance` | string | Probability of application | `"1"` (100%), `"0.5"` (50%), `"0.1"` (10%) |

### Stat Stage Multipliers

The GameMaster defines maximum buff stages and divisors:

```

```

This creates stat multipliers ranging from 0.5x (stage -4) to 2.0x (stage +4), calculated as:

* Multiplier = `(buffDivisor + stage) / buffDivisor`

Sources: [src/data/gamemaster.json L5-L9](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json#L5-L9)

 [src/data/gamemaster/moves.json L15-L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L15-L27)

---

## Move Data Loading and Access

```

```

### GameMaster Singleton Pattern

The GameMaster uses a singleton pattern to maintain a single source of move data throughout the application:

**Initialization:**

```

```

**Search Map Creation:**

```

```

**Move Retrieval:**
The GameMaster provides no direct `getMoveById()` function; instead, code accesses the `moveMap` directly or iterates through `data.moves`.

Sources: [src/js/GameMaster.js L18-L19](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L18-L19)

 [src/js/GameMaster.js L188-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L188-L192)

---

## Move Selection and Learnsets

Pokemon have restricted movesets defined in their species data:

```

```

### Move Assignment in Pokemon Class

Pokemon are initialized with moves from their available learnsets:

**Fast Move Selection:**

* Pokemon has one fast move at a time
* Selected from the `fastMoves` array in species data
* Stored in `pokemon.fastMove` property

**Charged Move Selection:**

* Pokemon can know 1-2 charged moves
* Selected from `chargedMoves` and potentially `eliteMoves` arrays
* Stored in `pokemon.chargedMoves` array (max length 2)

**Elite Moves:**

* Special moves that are normally unavailable
* Require specific events or Elite TMs in Pokemon GO
* Marked separately but accessed through normal move selection

Sources: [src/data/gamemaster/pokemon.json L12-L13](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json#L12-L13)

 [src/data/gamemaster/pokemon.json L129](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json#L129-L129)

---

## Damage Calculation

Move damage is calculated using a complex formula incorporating multiple factors:

```

```

### Damage Formula Components

The damage calculation follows Pokemon GO's PvP mechanics:

**Base Formula:**

```
damage = floor(0.5 * power * (attack / defense) * multipliers) + 1
```

**Multipliers Include:**

1. **STAB (Same Type Attack Bonus):** 1.2x if move type matches Pokemon type
2. **Type Effectiveness:** Ranges from 0.390625x (double-resisted) to 2.56x (double-super-effective)
3. **Attack Buff:** `(4 + attackStage) / 4` where stage ranges from -4 to +4
4. **Defense Buff:** `(4 + defenseStage) / 4` where stage ranges from -4 to +4
5. **Shadow Bonus:** 1.2x attack for Shadow Pokemon (with 0.833x defense penalty)
6. **Weather Bonus:** 1.2x for weather-boosted moves (not typically simulated)

### Type Effectiveness Matrix

Type effectiveness is calculated using a matrix of type interactions:

* **Super Effective (x2):** Fire vs Grass, Water vs Fire, etc.
* **Not Very Effective (x0.625):** Fire vs Water, Grass vs Fire, etc.
* **Double Super Effective (x2.56):** Fire vs Grass/Bug
* **Double Resisted (x0.390625):** Fire vs Water/Rock

The actual multipliers are more complex than simple doubling due to Pokemon GO's unique scaling.

Sources: The damage calculation is implemented in the Pokemon and Battle classes, though the exact implementation details are not visible in the provided file excerpts.

---

## Energy Mechanics

Energy is the resource system that governs charged move usage:

```

```

### Energy System Rules

**Energy Range:** 0 to 100

* Pokemon start with 0 energy by default (configurable in battle settings)
* Energy cannot exceed 100
* Energy cannot go below 0

**Fast Move Energy Generation:**

* Each fast move execution adds `energyGain` to the Pokemon's energy
* Example: Vine Whip (2 turns, 8 energy) generates 4 energy per turn
* Faster moves often generate less energy per use but more per second

**Charged Move Energy Costs:**

| Cost Tier | Energy | Examples | Usage Pattern |
| --- | --- | --- | --- |
| Low | 35-40 | Dragon Claw, Leaf Blade | Spam moves, high frequency |
| Medium | 45-55 | Hydro Cannon, Frenzy Plant | Balanced moves, standard frequency |
| High | 60-70 | Shadow Ball, Earthquake | Heavy hitters, low frequency |
| Very High | 75-100 | Hyper Beam, Solar Beam | Rarely used, very powerful |

**Energy Advantage:**

* Winning CMP (Charge Move Priority) or fainting an opponent while retaining energy
* A Pokemon with 100 energy can immediately use a charged move when switched in
* Energy is preserved when Pokemon switches out and returns

Sources: [src/data/gamemaster/moves.json L9-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L9-L10)

 [src/data/gamemaster/moves.json L18-L19](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L18-L19)

---

## Move Processing in Battle

Move execution follows a turn-based system coordinated by the Battle class:

```

```

### Turn-Based Execution

**Turn Duration:** Each turn is 500 milliseconds in PvP

* Fast moves specify their duration in `turns` (e.g., 2 turns = 1000ms)
* Charged moves execute in 1 turn (500ms) but trigger a mini-game phase
* Move cooldowns prevent actions until the move completes

**Action Priority:**

1. **Switch Actions:** Processed first if Pokemon switches
2. **Charged Move Decisions:** Checked when energy threshold is met
3. **Fast Move Execution:** Default action if no charged move is used

**Simultaneous Actions (CMP):**
When both Pokemon attempt charged moves on the same turn:

* **CMP (Charge Move Priority)** determines order
* Higher attack stat goes first
* If tied, player with priority setting goes first

Sources: [src/js/battle/Battle.js L20-L61](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L20-L61)

---

## Move Archetypes

Moves are categorized by archetype to indicate their strategic role:

| Archetype | Description | Characteristics | Examples |
| --- | --- | --- | --- |
| **Multipurpose** | Balanced fast moves | Moderate energy gain and damage | Vine Whip, Snarl |
| **High Energy** | Fast energy generators | High energy gain, low damage | Lock-On, Psycho Cut |
| **Heavy Damage** | Damage-focused fast moves | High damage, low energy gain | Charm, Razor Leaf |
| **Spam/Bait** | Low-cost charged moves | Low energy cost (35-40) | Dragon Claw, Leaf Blade, Night Slash |
| **Nuke** | High-damage charged moves | High cost (50-70+), high power | Hydro Cannon, Blast Burn |
| **Debuff** | Applies opponent debuffs | Guaranteed or high-chance debuff | Acid Spray, Sand Tomb |
| **Self-Buff** | Boosts user stats | Guaranteed or high-chance buff | Power-Up Punch, Ancient Power |
| **Closing** | High-energy finishers | Very high cost (65-100) | Close Combat, Overheat |

**Archetype Examples from Data:**

```

```

```

```

Sources: [src/data/gamemaster/moves.json L11-L12](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L11-L12)

 [src/data/gamemaster/moves.json L25](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L25-L25)

---

## Move Type Interactions

Moves inherit the type effectiveness system from mainline Pokemon games with Pokemon GO-specific scaling:

### Type System Implementation

**Type Effectiveness Calculation:**
The game uses a compressed effectiveness system:

* Super Effective: ~1.6x (not a simple 2x like main series)
* Not Very Effective: ~0.625x
* Double Super Effective: ~2.56x (1.6 * 1.6)
* Double Resisted: ~0.390625x (0.625 * 0.625)
* Immune: 0.390625x (Pokemon GO has no immunities, only double resistance)

**Effectiveness Categories:**

| Effectiveness | Multiplier | Visual Indicator | Example |
| --- | --- | --- | --- |
| Double Super Effective | ~2.56x | "Super effective!" | Fire vs Grass/Bug |
| Super Effective | ~1.6x | "Super effective!" | Fire vs Grass |
| Neutral | 1.0x | - | Fire vs Electric |
| Not Very Effective | ~0.625x | "Not very effective..." | Fire vs Water |
| Double Resisted | ~0.390625x | "Not very effective..." | Fire vs Water/Rock |

**Type Coverage:**
Pokemon can have up to two types, and moves have a single type:

* Dual-type Pokemon can be double weak or double resistant
* STAB applies if move type matches either of the Pokemon's types

Sources: The type effectiveness chart is implemented in the battle calculation logic, though specific multipliers are not visible in the provided file excerpts.

---

## Custom Move Configuration

The system supports move customization through groups and overrides:

```

```

**Groups Configuration:**
Groups files can modify which moves are available in specific formats or cups:

* Add or remove moves from Pokemon learnsets
* Ban specific moves entirely (e.g., Charm in certain cups)
* Force specific movesets for balance

**Overrides Configuration:**
Overrides adjust recommended movesets and weights without changing availability:

* Suggest optimal move combinations
* Provide editor scores and notes
* Don't restrict what moves can be used

Sources: Based on the system architecture diagrams and references to groups and overrides in [src/header.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/header.php)

 though detailed implementation is not visible in provided excerpts.

---

## Summary Table: Fast vs Charged Moves

| Property | Fast Moves | Charged Moves |
| --- | --- | --- |
| **Purpose** | Generate energy | Consume energy for damage |
| **Energy Cost** | 0 (always) | 35-100 |
| **Energy Gain** | 2-13 per use | 0 (always) |
| **Typical Power** | 3-16 | 35-150 |
| **Shieldable** | No | Yes |
| **Can Apply Buffs** | No | Yes (some moves) |
| **Execution Frequency** | Every 1-5 turns | When sufficient energy available |
| **Quantity Per Pokemon** | Exactly 1 | 1-2 |
| **Turn Duration** | 1-5 turns | 1 turn (plus minigame) |
| **Damage per Energy** | N/A (generates energy) | ~0.5-2.5 DPE |

---

## Move Data Files Summary

| File | Purpose | Contents |
| --- | --- | --- |
| `data/gamemaster.json` | Master game data file | Contains full move array plus all game settings |
| `data/gamemaster.min.json` | Minified version | Compressed version for production use |
| `data/gamemaster/moves.json` | Move definitions | Array of all ~400+ moves with full properties |
| `data/gamemaster/pokemon.json` | Pokemon species data | Includes `fastMoves` and `chargedMoves` arrays per species |
| `data/groups/*.json` | Format-specific configs | Move restrictions for special cups/formats |
| `data/overrides/*.json` | Recommended movesets | Suggested optimal move combinations |

Sources: [src/js/GameMaster.js L26-L28](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L26-L28)

 [src/js/GameMaster.js L134-L138](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L134-L138)

 [src/data/gamemaster/moves.json L1-L113203](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/moves.json#L1-L113203)

 [src/data/gamemaster/pokemon.json L1-L1560679](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json#L1-L1560679)