# Battle Simulation Engine

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

The Battle Simulation Engine is the core computational system that powers all PvP analysis features in PvPoke. It implements a turn-based simulation model that replicates Pokémon GO's real-time battle mechanics in discrete 500ms intervals. This document covers the `Battle` class architecture, turn processing mechanics, action queue management, and timeline tracking.

For information about the Pokémon entities that participate in battles, see [Pokemon Class](/pvpoke/pvpoke/3.2-pokemon-class). For details on move mechanics and damage calculations, see [Move System](/pvpoke/pvpoke/3.3-move-system). For data loading and management, see [GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton).

---

## Architecture Overview

The battle simulation engine is implemented in the `Battle` class, which orchestrates all aspects of a PvP encounter. It manages two `Pokemon` instances, processes actions in a turn-based queue, maintains a timeline of events, and calculates battle outcomes.

### Battle Class Structure

```

```

**Sources:** [src/js/battle/Battle.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L100)

The `Battle` class maintains two `Pokemon` instances in the `pokemon` array and orchestrates their interactions through a turn-based system. Each battle has configuration properties (CP limit, cup format, mode) and runtime state (current turn, phase, timeline).

### Key Battle Properties

| Property | Type | Purpose |
| --- | --- | --- |
| `pokemon[2]` | Pokemon[] | The two active battlers |
| `players[2]` | Player[] | Player controllers (human or AI) |
| `timeline` | Event[] | Complete event history |
| `actions` | Action[] | User-defined action sequence |
| `turnActions` | Action[] | Actions to process this turn |
| `queuedActions` | Action[] | Future turn actions |
| `time` | number | Current simulation time (ms) |
| `turns` | number | Total turns elapsed |
| `phase` | string | Current battle state |
| `mode` | string | "simulate" or "emulate" |
| `cp` | number | CP limit (1500, 2500, 10000) |
| `cup` | Cup | Format restrictions |

**Sources:** [src/js/battle/Battle.js L8-L66](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L8-L66)

---

## Battle Modes

The engine supports four distinct battle modes, each serving different analysis purposes.

### Battle Mode Types

```

```

**Sources:** [src/js/battle/Battle.js L26-L28](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L26-L28)

 [src/js/interface/Interface.js L32-L33](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L32-L33)

### Mode Characteristics

| Mode | Description | Decision Making | Use Case |
| --- | --- | --- | --- |
| **Single** | 1v1 matchup | Fully automated | Rankings generation, matchup analysis |
| **Multi** | 3v3 team battle | Automated with switch logic | Team ratings, coverage analysis |
| **Matrix** | All vs. all bulk simulation | Automated optimal play | Meta analysis, large-scale comparisons |
| **Emulated** | Interactive battle | User inputs or AI decisions | Training mode, strategy testing |

**Sources:** [src/js/interface/Interface.js L32-L33](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L32-L33)

 [src/battle.php L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/battle.php#L1-L50)

The `mode` property determines simulation behavior:

* **"simulate"**: Automated decision-making, optimizes for best play
* **"emulate"**: Responds to user actions or AI controller decisions

**Sources:** [src/js/battle/Battle.js L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L27-L27)

---

## Turn-Based Simulation Loop

The battle progresses in discrete 500ms turns, with each turn processing queued actions and updating Pokémon states.

### Main Simulation Flow

```

```

**Sources:** [src/js/battle/Battle.js L217-L400](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L217-L400)

### Turn Processing Method

The `processTurn()` method is the heart of the simulation engine:

```sql
Battle.processTurn()
├── Process queued actions (switches, charged moves)
├── Apply fast move damage for both Pokemon
├── Check for charged move availability
├── Handle shield decisions
├── Update energy and cooldowns
├── Record timeline events
└── Advance turn counter
```

**Sources:** [src/js/battle/Battle.js L800-L1200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L800-L1200)

### Delta Time System

The engine uses a 500ms time quantum (`deltaTime = 500`) to represent each turn:

* **Turn 0**: Battle start (time = 0ms)
* **Turn 1**: time = 500ms
* **Turn 2**: time = 1000ms
* **Turn N**: time = N × 500ms

Fast move cooldowns and charged move execution are aligned to these 500ms intervals.

**Sources:** [src/js/battle/Battle.js L37](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L37-L37)

---

## Action Queue System

Actions are queued and executed in a specific order each turn. The queue system handles fast moves, charged moves, and switches.

### Action Types and Processing

```

```

**Sources:** [src/js/battle/Battle.js L23-L25](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L23-L25)

### Action Object Structure

Actions in the queue are JavaScript objects with the following structure:

| Field | Type | Description |
| --- | --- | --- |
| `type` | string | "fast", "charged", "switch", "wait" |
| `value` | number | Move index (for charged moves) |
| `pokemon` | number | Pokemon index (0 or 1) |
| `turn` | number | Turn to execute (optional) |
| `priority` | number | Execution priority (optional) |

**Sources:** [src/js/battle/Battle.js L600-L800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L600-L800)

### Action Processing Priority

When multiple actions are queued for the same turn:

1. **Switches** (highest priority)
2. **Charged moves** (processed by priority stat)
3. **Fast moves** (simultaneous for both Pokemon)
4. **Wait actions** (lowest priority)

**Sources:** [src/js/battle/Battle.js L900-L1100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L900-L1100)

---

## Phase Management

The battle transitions through different phases to handle special states like charged move execution and switching.

### Phase State Machine

```

```

**Sources:** [src/js/battle/Battle.js L45-L47](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L45-L47)

### Phase Properties

| Phase | Description | Duration | Phase Props |
| --- | --- | --- | --- |
| `neutral` | Normal battle state | Variable | None |
| `suspend_charged` | Charged move sequence initiated | Instant | `{pokemon: index, move: Move}` |
| `charging` | Charging animation | 10000ms | `{pokemon: index, move: Move}` |
| `shield_decision` | Shield use decision point | Instant | `{attacker: index, defender: index}` |
| `switching` | Pokemon switch in progress | Variable | `{pokemon: index}` |

**Sources:** [src/js/battle/Battle.js L45-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L45-L50)

The `phaseProps` object stores context-specific data for the current phase, such as which Pokémon is using a charged move or which move is being executed.

**Sources:** [src/js/battle/Battle.js L46](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L46-L46)

---

## Timeline System

The timeline records a complete history of battle events for analysis and replay.

### Timeline Event Structure

```

```

**Sources:** [src/js/battle/Battle.js L32-L35](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L32-L35)

### Timeline Event Schema

Each timeline event is an object with these properties:

| Property | Type | Description |
| --- | --- | --- |
| `type` | string | Event type identifier |
| `turn` | number | Turn number when event occurred |
| `time` | number | Timestamp in milliseconds |
| `pokemon` | number | Pokemon index (0 or 1) |
| `values` | number[] | Event-specific values (damage, energy, etc.) |
| `multiplier` | number | Type effectiveness multiplier (optional) |

**Sources:** [src/js/battle/Battle.js L1400-L1600](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1400-L1600)

### Timeline Methods

The Battle class provides methods to interact with the timeline:

| Method | Purpose |
| --- | --- |
| `getTimeline()` | Returns the complete timeline array |
| `addTimelineEvent(event)` | Appends an event to the timeline |
| `getTimelineEventsByTurn(turn)` | Retrieves events for a specific turn |
| `displayTimeline()` | Renders timeline in UI (emulated mode) |

**Sources:** [src/js/battle/Battle.js L1200-L1400](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1200-L1400)

---

## Battle Initialization and Configuration

### Initialization Flow

```

```

**Sources:** [src/js/battle/Battle.js L3-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L3-L100)

 [src/js/pokemon/Pokemon.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L50)

### Key Initialization Methods

| Method | Parameters | Purpose |
| --- | --- | --- |
| `setCP(cpLimit)` | cpLimit: number | Sets CP limit and reinitializes Pokemon |
| `setLevelCap(val)` | val: number | Sets max level (40, 50, 51) |
| `setCup(cupName)` | cupName: string | Loads cup format from GameMaster |
| `setCustomCup(customCup)` | customCup: Cup | Sets custom format rules |
| `setNewPokemon(poke, index, initialize)` | poke: Pokemon, index: 0\|1, initialize: boolean | Assigns Pokemon to battle slot |
| `setPlayers(arr)` | arr: Player[] | Sets player controllers |

**Sources:** [src/js/battle/Battle.js L138-L194](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L138-L194)

---

## Battle Results and Ratings

After simulation completes, the engine calculates comprehensive battle metrics.

### Battle Result Object

```

```

**Sources:** [src/js/battle/Battle.js L38-L42](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L38-L42)

### Rating Calculation

The `determineBattleRatings()` method calculates a 0-1000 battle rating for each Pokemon:

**Formula Components:**

* **Base Score**: 500 (for a win) or 0 (for a loss)
* **HP Bonus**: Remaining HP percentage × 250
* **Turn Penalty**: -(turns elapsed / max turns) × 250
* **Shield Bonus**: Shields remaining × 100

**Rating Calculation:**

```
rating = baseScore + (hpRemaining / maxHP) * 250 
         - (turns / maxTurns) * 250 
         + shieldsRemaining * 100
```

**Sources:** [src/js/battle/Battle.js L2000-L2200](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L2000-L2200)

### Result Methods

| Method | Returns | Purpose |
| --- | --- | --- |
| `getBattleRatings()` | number[] | Returns [rating1, rating2] |
| `getWinner()` | number\|'tie' | Returns winning Pokemon index |
| `getDuration()` | number | Returns battle duration in ms |
| `getTurnsToWin()` | number[] | Returns victory timing for each Pokemon |

**Sources:** [src/js/battle/Battle.js L2100-L2300](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L2100-L2300)

---

## Integration with Other Systems

### Battle Engine Dependencies

```

```

**Sources:** [src/js/battle/Battle.js L1-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L10)

 [src/js/GameMaster.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L50)

The Battle class coordinates with:

* **Pokemon**: Manages individual battler state, stats, and move execution
* **GameMaster**: Provides Pokemon data, move data, and format definitions
* **Interface**: Handles UI updates and user input
* **Player**: Provides decision-making (human or AI)

**Sources:** [src/js/battle/Battle.js L4-L10](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L4-L10)

 [src/js/interface/Interface.js L12-L19](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L12-L19)

---

## Performance Considerations

### Optimization Techniques

The battle engine implements several optimizations for performance:

1. **Pokemon Object Reuse**: The `getAllPokemon()` method caches Pokemon instances by CP level to avoid repeated initialization
2. **Minimal Timeline Recording**: In simulate mode, timeline events are only recorded when needed for analysis
3. **Lazy Evaluation**: Move selections and switch decisions are computed on-demand rather than pre-calculated
4. **Delta Time Batching**: 500ms time quantum reduces computation frequency

**Sources:** [src/js/GameMaster.js L209-L219](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L209-L219)

 [src/js/battle/Battle.js L37](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L37-L37)

### Simulation Modes

| Mode | Timeline Recording | UI Updates | Use Case |
| --- | --- | --- | --- |
| Fast simulation | Minimal | None | Bulk calculations (Matrix mode) |
| Full simulation | Complete | None | Single battle analysis |
| Emulated | Real-time | Every turn | Interactive training mode |

**Sources:** [src/js/battle/Battle.js L26-L28](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L26-L28)

---

**Primary Sources:**

* [src/js/battle/Battle.js L1-L2500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/battle/Battle.js#L1-L2500)
* [src/js/pokemon/Pokemon.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Pokemon.js#L1-L100)
* [src/js/GameMaster.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/GameMaster.js#L1-L50)
* [src/js/interface/Interface.js L12-L40](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/Interface.js#L12-L40)