# Pokemon Class

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

## Purpose and Scope

This page documents the `Pokemon` class defined in [src/js/pokemon/Pokemon.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js)

 The `Pokemon` class is the core entity representing individual Pokémon in PvPoke's battle simulation system. It encapsulates all properties and behaviors of a Pokémon including stats (Attack, Defense, HP), IVs, CP calculation, move management, and battle state (current HP, energy, buffs/debuffs).

For information about the battle simulation engine that orchestrates Pokemon interactions, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine). For the singleton that manages Pokemon and move data, see [GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton). For the move system itself, see [Move System](/pvpoke/pvpoke/3.3-move-system).

**Sources:** [src/js/pokemon/Pokemon.js L1-L21](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L21)

---

## Class Architecture

The `Pokemon` class is implemented as a JavaScript constructor function (pre-ES6 style) that creates instances representing individual Pokémon battlers. Each instance maintains its own battle state while referencing shared data from the GameMaster singleton.

```

```

**Key Constructor Parameters:**

* `id` - Species identifier string (e.g., "azumarill", "medicham")
* `i` - Battle index (0 or 1) indicating which side of the battle
* `b` - Reference to the Battle instance
* `d` - Optional pre-loaded data object (if not provided, fetched from GameMaster)

**Sources:** [src/js/pokemon/Pokemon.js L1-L21](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L21)

 [src/js/GameMaster.js L228-L236](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L228-L236)

---

## Pokemon Data Model

Each Pokemon instance is initialized from a data structure stored in `pokemon.json`. This data defines the species' immutable characteristics.

### Data Structure Schema

| Field | Type | Description |
| --- | --- | --- |
| `speciesId` | string | Unique identifier (e.g., "venusaur") |
| `speciesName` | string | Display name (e.g., "Venusaur") |
| `dex` | number | Pokédex number |
| `baseStats` | object | Base stats: `{atk, def, hp}` |
| `types` | array | Type array (e.g., `["grass", "poison"]`) |
| `fastMoves` | array | Array of available fast move IDs |
| `chargedMoves` | array | Array of available charged move IDs |
| `defaultIVs` | object | Default IVs for cp500/cp1500/cp2500 |
| `tags` | array | Tags like "shadow", "legendary", "starter" |
| `family` | object | Evolution family data |
| `eliteMoves` | array | Elite/legacy move IDs (optional) |
| `level25CP` | number | CP at level 25 with 15/15/15 IVs |

### Example Data Entry

```

```

**Sources:** [src/data/gamemaster/pokemon.json L110-L138](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster/pokemon.json#L110-L138)

 [src/js/pokemon/Pokemon.js L7-L21](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L7-L21)

---

## Stats System and CP Calculation

The Pokemon class implements Pokémon GO's stat and CP calculation formulas. Each Pokemon has both base stats (from data) and effective stats (modified by IVs and level).

```

```

### Key Properties

| Property | Description |
| --- | --- |
| `baseStats` | Base stats from species data `{atk, def, hp}` |
| `ivs` | Individual Values `{atk, def, hp}` (0-15) |
| `level` | Pokemon level (1-50, can be half levels) |
| `cp` | Calculated Combat Power |
| `stats` | Effective battle stats `{atk, def, hp}` |
| `statBuffs` | Current buff/debuff stages `[atkStage, defStage]` |

### CP Calculation Method

The `calculateCP()` method implements the core CP formula:

**Formula:**

```
effectiveStat = (baseStat + IV) * CPM
CP = max(10, floor((effectiveAtk * sqrt(effectiveDef) * sqrt(effectiveHP)) / 10))
```

Where `CPM` (CP Multiplier) is looked up from the `cpms` array based on level.

**Sources:** [src/js/pokemon/Pokemon.js L22-L23](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L22-L23)

 [src/js/pokemon/Pokemon.js L356-L394](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L356-L394)

---

## Initialization and IV Optimization

The `initialize()` method prepares a Pokemon for battle by calculating optimal IVs and level for a given CP cap.

```

```

### The maximize() Algorithm

The `maximize()` method finds the optimal IV combination and level that maximizes a Pokemon's battle effectiveness under a CP cap:

1. **Iterate through all IV combinations** (0-15 for Atk, Def, HP)
2. **For each IV set, binary search for max level** that stays under CP cap
3. **Calculate stat product** (Atk × Def × HP) as optimization metric
4. **Apply constraints:** * Respect level cap (default 50, can be 40 or 51) * Optionally maximize specific stats (Atk for breakpoints, Def for bulk) * Apply IV floors (e.g., 10/10/10 for raids, 1/15/15 for Great League)
5. **Select best combination** with highest stat product

**Sources:** [src/js/pokemon/Pokemon.js L395-L602](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L395-L602)

---

## Move Management

Each Pokemon has one fast move and up to two charged moves. Moves are managed through several key methods.

### Move Selection Data Structure

```

```

### Key Move Methods

| Method | Purpose |
| --- | --- |
| `initializeMoves()` | Populates move pools from species data |
| `resetMoves()` | Clears selected moves (for user selection) |
| `autoSelectMoves()` | AI selects optimal moves for matchup |
| `selectMove(moveId, isCharged, index)` | Manually select a move |
| `getBestChargedMove(opponent, shieldScenario)` | Returns optimal charged move for situation |
| `hasMove(moveId, movetype)` | Check if Pokemon has access to a move |

### Move Auto-Selection Algorithm

The `autoSelectMoves()` method selects the best moveset for a Pokemon against a specific opponent:

1. **Fast Move Selection:** * Evaluate each fast move's DPT (Damage Per Turn) and EPT (Energy Per Turn) * Calculate turns to KO the opponent * Select move that KOs fastest while generating sufficient energy
2. **Charged Move Selection:** * Prioritize coverage moves that deal super-effective damage * Consider move efficiency (DPE - Damage Per Energy) * For second move, select coverage for opponent's type resistances * Factor in buff/debuff effects

**Sources:** [src/js/pokemon/Pokemon.js L603-L861](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L603-L861)

 [src/js/pokemon/Pokemon.js L1131-L1357](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1131-L1357)

---

## Battle State Management

During battle, each Pokemon maintains dynamic state that changes turn-by-turn.

### State Properties

| Property | Type | Description |
| --- | --- | --- |
| `hp` | number | Current hit points (0 to max HP) |
| `startHp` | number | HP at battle start |
| `energy` | number | Current energy (0-100) |
| `startEnergy` | number | Energy at battle start |
| `shields` | number | Remaining shields (0-2) |
| `startingShields` | number | Shields at battle start |
| `statBuffs` | array | `[atkStage, defStage]` (-4 to +4) |
| `cooldown` | number | Turns until next action available |
| `isCharging` | boolean | Currently charging a move |
| `chargedMovesOnly` | boolean | Can only use charged moves this turn |

### State Lifecycle Methods

```

```

### The reset() Method

Called to reset a Pokemon to its initial battle state:

* Restores HP to starting value
* Resets energy to starting value
* Restores shield count
* Clears all stat buffs/debuffs
* Resets cooldowns and charging state
* Clears battle history

**Sources:** [src/js/pokemon/Pokemon.js L862-L904](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L862-L904)

---

## Damage Calculation

The Pokemon class implements damage calculation with type effectiveness, STAB, and stat modifiers.

### Damage Formula

```
baseDamage = (movePower * effectiveAtk / effectiveDef) * effectiveness * stabMultiplier
damage = floor(baseDamage * buffMultiplier) + 1
```

Where:

* `movePower` - Base power of the move
* `effectiveAtk` - Attacker's attack stat (with CPM)
* `effectiveDef` - Defender's defense stat (with CPM)
* `effectiveness` - Type effectiveness multiplier (0.390625 to 2.56)
* `stabMultiplier` - 1.2 if move type matches Pokemon type
* `buffMultiplier` - Applied from stat stages: `(4 + stage) / 4`

### Stat Buff/Debuff System

Stat stages range from -4 to +4, with each stage representing a 25% change:

| Stage | Multiplier | Effect |
| --- | --- | --- |
| -4 | 0.0 | 0% of base stat |
| -3 | 0.25 | 25% of base stat |
| -2 | 0.5 | 50% of base stat |
| -1 | 0.75 | 75% of base stat |
| 0 | 1.0 | 100% (normal) |
| +1 | 1.25 | 125% |
| +2 | 1.5 | 150% |
| +3 | 1.75 | 175% |
| +4 | 2.0 | 200% (max) |

**Methods:**

* `applyStatChange(stages)` - Apply buff/debuff stages `[atkStage, defStage]`
* `resetStatBuffs()` - Clear all buffs/debuffs
* `getStatMultiplier(stat)` - Get current multiplier for a stat

**Sources:** [src/js/pokemon/Pokemon.js L905-L993](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L905-L993)

 [src/js/pokemon/Pokemon.js L1003-L1028](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1003-L1028)

---

## Type Effectiveness System

The Pokemon class determines type effectiveness for damage calculations and matchup evaluation.

### Type Effectiveness Methods

| Method | Purpose |
| --- | --- |
| `typeEffectiveness(moveType)` | Returns multiplier for a move type against this Pokemon |
| `hasType(type)` | Check if Pokemon has a specific type |
| `getTypes()` | Returns array of Pokemon's types |

### Effectiveness Calculation

Type effectiveness is multiplicative across both of a Pokemon's types:

```

```

**Multiplier Values:**

* **Super effective:** 1.6
* **Normal:** 1.0
* **Not very effective:** 0.625
* **Double resistance:** 0.390625 (0.625 × 0.625)
* **Double weakness:** 2.56 (1.6 × 1.6)

**Sources:** [src/js/pokemon/Pokemon.js L1029-L1077](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1029-L1077)

---

## Helper and Utility Methods

The Pokemon class provides numerous utility methods for battle simulation and UI display.

### Status and Query Methods

| Method | Return Type | Description |
| --- | --- | --- |
| `isAlive()` | boolean | HP > 0 |
| `isFainted()` | boolean | HP <= 0 |
| `hasShields()` | boolean | shields > 0 |
| `isCharged()` | boolean | Has enough energy for charged move |
| `hasTag(tag)` | boolean | Check for tag (e.g., "shadow", "legendary") |
| `getSpeciesId()` | string | Returns speciesId |
| `getSpeciesName()` | string | Returns display name |
| `getDex()` | number | Returns Pokédex number |
| `getCP()` | number | Returns current CP |
| `getBattle()` | Battle | Returns battle instance reference |
| `getIndex()` | number | Returns battle index (0 or 1) |

### Move Query Methods

| Method | Return Type | Description |
| --- | --- | --- |
| `getFastMove()` | Move | Returns selected fast move object |
| `getChargedMoves()` | array | Returns array of charged moves |
| `getFastMovePool()` | array | Returns all available fast moves |
| `getChargedMovePool()` | array | Returns all available charged moves |
| `getMoveset()` | array | Returns `[fastMove, chargedMove1, chargedMove2]` |

### Display and Formatting Methods

| Method | Return Type | Description |
| --- | --- | --- |
| `generateIVString()` | string | Format: "Atk/Def/HP Lv" |
| `generateURLPokeStr()` | string | URL-safe Pokemon identifier |
| `getTypeColor(index)` | string | Hex color for type |

**Sources:** [src/js/pokemon/Pokemon.js L1078-L1130](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1078-L1130)

 [src/js/pokemon/Pokemon.js L1358-L1495](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1358-L1495)

---

## Shadow Pokemon and Form Changes

The Pokemon class handles special mechanics for Shadow Pokemon and form changes.

### Shadow Pokemon

Shadow Pokemon have modified stats and are identified by the `_shadow` suffix in their `speciesId`:

**Modifications:**

* +20% Attack multiplier
* -20% Defense multiplier (making them glassier)
* Access to exclusive moves: Frustration (default) and Return (if purified)
* Identified by `shadow` tag

**Methods:**

* `isShadow()` - Returns true if Pokemon is Shadow
* Shadow stat modifiers are applied in stat calculations automatically

### Form Changes

Some Pokemon can change forms mid-battle (e.g., Aegislash changing between Shield and Blade forms):

**Properties:**

* `formChange` - Boolean indicating if Pokemon can change forms
* `startFormId` - Original form ID
* `activeFormId` - Current form ID

**Methods:**

* `changeForm(formId)` - Switch to a different form
* `reset()` - Reverts to starting form

**Sources:** [src/js/pokemon/Pokemon.js L1496-L1572](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1496-L1572)

---

## Integration with Battle System

The Pokemon class is tightly integrated with the Battle class, which orchestrates turn-by-turn combat.

```

```

### Battle Integration Methods

| Method | Called By | Purpose |
| --- | --- | --- |
| `setBattle(battle)` | Battle | Assign battle instance reference |
| `setIndex(index)` | Battle | Set battle position (0 or 1) |
| `initialize(cp)` | Battle | Prepare for battle at CP cap |
| `reset()` | Battle | Reset to starting state |
| `addEnergy(amount)` | Battle | Grant energy from fast moves |
| `applyDamage(damage)` | Battle | Deduct HP from attacks |
| `useShield()` | Battle | Consume one shield |

### Turn Processing Flow

During each battle turn:

1. Battle calls Pokemon's fast move or charged move
2. Pokemon calculates damage using opponent's stats
3. Battle applies damage to opponent via `applyDamage()`
4. Battle grants energy to attacker via `addEnergy()`
5. Pokemon checks if charged move can be used
6. Battle records actions to timeline

**Sources:** [src/js/pokemon/Pokemon.js L82-L96](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L82-L96)

 [src/js/battle/Battle.js L82-L117](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L82-L117)

---

## Usage Examples

### Creating a Pokemon Instance

```

```

### Manual IV and Move Configuration

```

```

### Querying Pokemon State

```

```

**Sources:** [src/js/pokemon/Pokemon.js L7-L21](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L7-L21)

 [src/js/interface/PokeSelect.js L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/PokeSelect.js#L1-L10)

---

## Class Diagram Summary

```

```

**Sources:** [src/js/pokemon/Pokemon.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L100)