# Core Battle System

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

The Core Battle System is the central engine that powers all battle simulations in PvPoke. This system calculates damage, energy, and battle outcomes for all PvP scenarios across the platform. It handles turn-based combat simulation, move execution, stat calculations, and battle timeline management.

This document provides an overview of the battle system architecture and how its components interact. For detailed information on specific subsystems, see:

* Battle simulation mechanics and modes: [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine)
* Pokemon state management and calculations: [Pokemon Class](/pvpoke/pvpoke/3.2-pokemon-class)
* Move data and damage formulas: [Move System](/pvpoke/pvpoke/3.3-move-system)
* Game data access patterns: [GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton)

---

## System Architecture

The Core Battle System consists of three primary classes that work together to simulate Pokemon battles:

```

```

**Sources:** [src/js/battle/Battle.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L50)

 [src/js/pokemon/Pokemon.js L1-L30](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L30)

 [src/js/GameMaster.js L1-L40](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L40)

---

## Core Components

### Battle Class

The `Battle` class orchestrates all battle simulation logic. It maintains the battle state, processes actions, and generates the battle timeline.

**Key Responsibilities:**

* Maintains two `Pokemon` instances at indices 0 and 1
* Processes the action queue and generates turn-by-turn events
* Tracks battle timeline with damage, energy, and move events
* Manages battle phases: `"neutral"`, `"suspend_charged"`, `"charging"`, etc.
* Enforces battle rules from cup definitions and CP limits

**Critical State Variables:**

| Variable | Type | Purpose |
| --- | --- | --- |
| `pokemon[]` | Pokemon[2] | The two battling Pokemon |
| `timeline[]` | Array | Sequential battle events with timestamps |
| `turnActions[]` | Array | Actions processed this turn |
| `queuedActions[]` | Array | Actions queued for future turns |
| `time` | Number | Current battle time in milliseconds |
| `phase` | String | Current battle phase state |
| `cp` | Number | CP limit for the battle (1500/2500/10000) |
| `cup` | Object | Cup rules defining allowed Pokemon/moves |

**Sources:** [src/js/battle/Battle.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L100)

### Pokemon Class

The `Pokemon` class represents an individual Pokemon in battle, managing its stats, moves, energy, HP, and buffs/debuffs.

**Key Responsibilities:**

* Calculates CP, stats, and IVs based on level and battle CP limit
* Manages fast move and charged move availability
* Tracks current HP, energy, shields, and stat stages
* Executes moves and applies damage/energy changes
* Handles stat buffs/debuffs with stage multipliers

**Critical State Variables:**

| Variable | Type | Purpose |
| --- | --- | --- |
| `hp` | Number | Current hit points |
| `energy` | Number | Current energy (0-100) |
| `shields` | Number | Remaining shields (0-2) |
| `fastMove` | Move | Selected fast move |
| `chargedMoves[]` | Move[] | Available charged moves (1-2) |
| `statBuffs[]` | Number[2] | Attack and Defense buff stages (-4 to +4) |
| `stats` | Object | Calculated Attack, Defense, HP stats |
| `level` | Number | Pokemon level (1-50 or 51) |
| `ivs` | Object | Individual Values {atk, def, hp} |

**Sources:** [src/js/pokemon/Pokemon.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L100)

### GameMaster Singleton

The `GameMaster` singleton provides access to all game data loaded from `gamemaster.json`. It uses the singleton pattern to ensure only one instance exists throughout the application.

**Key Responsibilities:**

* Loads and caches Pokemon and move data from JSON
* Provides lookup methods: `getPokemonById()`, `getPokemonByFamily()`
* Maintains search maps for fast data access
* Manages custom gamemaster overrides from localStorage
* Creates Pokemon selection lists sorted alphabetically

**Sources:** [src/js/GameMaster.js L1-L125](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L125)

---

## Battle Execution Flow

```

```

**Sources:** [src/js/battle/Battle.js L200-L500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L200-L500)

### Turn Processing

Each turn in the battle follows this sequence:

1. **Fast Move Execution** - Both Pokemon execute fast moves based on cooldown * [src/js/battle/Battle.js L600-L700](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L600-L700) * Damage calculated using type effectiveness and stat modifiers * Energy gained based on move's `energyGain` value
2. **Energy Check** - Determine if Pokemon can use charged moves * [src/js/battle/Battle.js L750-L850](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L750-L850) * Compare `pokemon.energy` >= `move.energy` cost
3. **Action Registration** - Queue charged moves or shields * [src/js/battle/Battle.js L900-L1000](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L900-L1000) * Actions added to `turnActions[]` array
4. **Charged Move Resolution** - Process charged moves with priority rules * [src/js/battle/Battle.js L1100-L1300](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1100-L1300) * Higher attack Pokemon moves first (unless `usePriority` flag set) * Apply damage, energy cost, and buff/debuff effects
5. **Timeline Update** - Record all events for display * [src/js/battle/Battle.js L1400-L1500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1400-L1500) * Events include: damage dealt, energy changes, shields used, buffs applied

**Sources:** [src/js/battle/Battle.js L600-L1500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L600-L1500)

---

## Battle Modes

The battle system supports four distinct simulation modes:

```

```

**Sources:** [src/js/battle/Battle.js L50-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L50-L100)

### Mode Comparison

| Mode | `battle.mode` | Purpose | Input | Output |
| --- | --- | --- | --- | --- |
| **Single** | `"simulate"` | Test one matchup | 2 Pokemon | Winner, damage, timeline |
| **Multi** | `"simulate"` | Simulate team battle | 2 teams of 3 | Team scores, switch points |
| **Matrix** | `"simulate"` | Bulk calculations | List vs List | Win/loss matrix |
| **Emulated** | `"emulate"` | Interactive training | User + AI actions | Real-time battle display |

**Mode Selection:**

* Set via `battle.mode` property [src/js/battle/Battle.js L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L27-L27)
* Single/Multi/Matrix use automated AI decision making
* Emulated mode processes user input from `actions[]` array [src/js/battle/Battle.js L20](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L20-L20)

**Sources:** [src/js/battle/Battle.js L20-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L20-L50)

 [src/js/interface/Interface.js L30-L60](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L30-L60)

---

## Data Structures

### Timeline Events

The `timeline[]` array stores sequential battle events. Each event is an object with this structure:

```

```

**Sources:** [src/js/battle/Battle.js L1400-L1600](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1400-L1600)

### Action Queue

The `turnActions[]` and `queuedActions[]` arrays manage pending actions:

```

```

Actions are sorted by priority before execution. Higher attack stat = higher priority (lower number).

**Sources:** [src/js/battle/Battle.js L900-L1100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L900-L1100)

---

## Stat Calculations

### CP Formula

Pokemon CP is calculated from base stats, IVs, and level:

```yaml
CP = floor( (Attack × √Defense × √HP × CPM²) / 10 )

where:
  Attack = (BaseAttack + AttackIV) × CPM
  Defense = (BaseDefense + DefenseIV) × CPM
  HP = floor((BaseHP + HPIV) × CPM)
  CPM = CP Multiplier at given level
```

**Sources:** [src/js/pokemon/Pokemon.js L600-L700](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L600-L700)

### Damage Formula

Damage is calculated with type effectiveness and stat modifiers:

```
Damage = floor(
  0.5 × Power × (Attack/Defense) × 
  Effectiveness × 
  AttackBuffMultiplier × 
  DefenseBuffMultiplier
) + 1
```

**Multipliers:**

* Type effectiveness: 1.6 (super effective), 1.0 (neutral), 0.625 (not very effective)
* Buff stages: from 0.5 (4 stages down) to 2.0 (4 stages up)
* Shadow Pokemon: 1.2× attack, 0.833× defense

**Sources:** [src/js/pokemon/Pokemon.js L900-L1100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L900-L1100)

### Buff/Debuff System

Stat modifications use discrete stages from -4 to +4:

| Stage | Multiplier |
| --- | --- |
| -4 | 0.50 |
| -3 | 0.57 |
| -2 | 0.67 |
| -1 | 0.80 |
| 0 | 1.00 |
| +1 | 1.25 |
| +2 | 1.50 |
| +3 | 1.75 |
| +4 | 2.00 |

Stages are capped by `maxBuffStages` setting (default: 4) defined in [src/data/gamemaster.json L6-L8](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json#L6-L8)

**Sources:** [src/js/pokemon/Pokemon.js L1200-L1300](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1200-L1300)

 [src/data/gamemaster.json L6-L8](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json#L6-L8)

---

## Integration Points

### Interface Layer

The battle system is driven by the `Interface` class which handles UI updates and user interactions:

```

```

**Key Integration Methods:**

* `battle.start()` - Begin simulation [src/js/battle/Battle.js L200-L250](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L200-L250)
* `battle.setNewPokemon(poke, index)` - Set active Pokemon [src/js/battle/Battle.js L82-L117](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L82-L117)
* `battle.setCP(cpLimit)` - Set battle CP tier [src/js/battle/Battle.js L150-L158](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L150-L158)
* `battle.getTimeline()` - Retrieve battle events [src/js/battle/Battle.js L1700-L1750](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1700-L1750)

**Sources:** [src/js/interface/Interface.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L1-L100)

 [src/js/battle/Battle.js L82-L250](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L82-L250)

### Rankings System

Rankings are pre-calculated using the battle system to simulate all matchups:

1. Create Battle instance with CP limit and cup rules
2. Load all eligible Pokemon from GameMaster
3. Simulate each Pokemon vs meta Pokemon list
4. Calculate ratings based on win percentage and efficiency
5. Sort and categorize by role (leads, switches, closers, etc.)

Output stored in `rankings-{cp}.json` files consumed by the rankings UI.

**Sources:** [src/js/interface/RankingInterface.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/RankingInterface.js#L1-L50)

### Training Mode

Training mode uses emulated battles with AI decision making:

1. Set `battle.mode = "emulate"` [src/js/battle/Battle.js L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L27-L27)
2. Assign `Player` instances with AI or human control
3. Process turn-by-turn with user input from UI
4. AI evaluates scenarios and selects optimal moves
5. Display real-time battle state in interface

**Sources:** [src/js/battle/Battle.js L100-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L100-L150)

---

## Performance Considerations

### Pokemon Object Caching

GameMaster caches Pokemon objects to avoid repeated instantiation:

```

```

This cache dramatically improves performance for bulk simulations like matrix battles and rankings calculations.

**Sources:** [src/js/GameMaster.js L208-L219](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L208-L219)

### Search Maps

GameMaster uses `Map` objects for O(1) lookup performance:

* `pokemonMap` - Key: speciesId, Value: pokemon data object
* `moveMap` - Key: moveId, Value: move data object

Created once during initialization via `createSearchMaps()`.

**Sources:** [src/js/GameMaster.js L187-L192](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L187-L192)

### Timeline Optimization

In simulation mode (non-emulated), timeline events can be throttled or disabled to improve calculation speed. The `animateTimeline` setting controls whether full event details are recorded.

**Sources:** [src/js/battle/Battle.js L1400-L1600](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1400-L1600)

---

## Configuration

### Battle Settings

Battle behavior is configured through `gamemaster.json` settings:

```

```

* `partySize` - Team size for multi battles (always 3)
* `maxBuffStages` - Maximum buff/debuff stages (±4)
* `buffDivisor` - Divisor for buff stage calculations

**Sources:** [src/data/gamemaster.json L5-L9](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json#L5-L9)

### Cup Rules

Cup/format restrictions are defined in the `cups[]` array in gamemaster.json:

```

```

Filters support multiple types:

* `"filterType": "tag"` - Filter by Pokemon tags
* `"filterType": "type"` - Filter by Pokemon type
* `"filterType": "id"` - Filter by specific species IDs
* `"filterType": "move"` - Filter by move availability

**Sources:** [src/data/gamemaster.json L37-L72](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/gamemaster.json#L37-L72)

---

## Error Handling

The battle system includes validation at multiple points:

1. **Pokemon Validation** - Ensures Pokemon data exists before battle * [src/js/battle/Battle.js L82-L90](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L82-L90)
2. **Move Validation** - Verifies moves are available for the Pokemon * [src/js/pokemon/Pokemon.js L400-L500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L400-L500)
3. **Energy Validation** - Checks sufficient energy before charged moves * [src/js/battle/Battle.js L750-L850](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L750-L850)
4. **CP Limit Enforcement** - Recalculates stats when CP limit changes * [src/js/battle/Battle.js L150-L158](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L150-L158)

Invalid states log warnings to console but attempt to continue execution when possible.

**Sources:** [src/js/battle/Battle.js L82-L158](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L82-L158)

 [src/js/pokemon/Pokemon.js L400-L500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L400-L500)