# Training System

> **Relevant source files**
> * [src/css/train.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.css)
> * [src/css/train.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.css.map)
> * [src/css/train.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.scss)
> * [src/data/training/aiArchetypes.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json)
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
> * [src/data/training/teams/jungle/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/jungle/1500.json)
> * [src/data/training/teams/remix/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/remix/1500.json)
> * [src/data/training/teams/remix/2500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/remix/2500.json)
> * [src/js/interface/TrainRankingInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js)
> * [src/js/pokemon/Player.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Player.js)
> * [src/js/training/BattleInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js)
> * [src/js/training/MatchHandler.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js)
> * [src/js/training/TrainingAI.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js)
> * [src/js/training/TrainingEditor.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingEditor.js)
> * [src/js/training/TrainingSetupInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js)
> * [src/train/analysis.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php)
> * [src/train/editor.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/editor.php)
> * [src/train/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php)

## Purpose and Scope

The Training System is an AI-powered battle practice mode that allows users to battle against computer opponents in a simulated environment. It provides single (3v3) and tournament (6v6) battle modes across multiple difficulty levels, team selection options, and comprehensive battle analytics. This document covers the training battle interface, AI decision-making, team generation, and performance analytics collection.

For information about the core battle simulation mechanics that power training battles, see [Battle Simulation Engine](/pvpoke/pvpoke/3.1-battle-simulation-engine). For team building and analysis tools, see [Team Building](/pvpoke/pvpoke/6-specialized-tools).

**Sources:** [src/train/index.php L1-L165](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L1-L165)

 [src/js/training/TrainingAI.js L1-L50](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1-L50)

---

## System Architecture

The Training System consists of four primary components that work together to deliver an interactive battle experience:

```

```

**Sources:** [src/js/training/MatchHandler.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L1-L100)

 [src/js/training/TrainingSetupInterface.js L19-L95](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L19-L95)

 [src/js/training/BattleInterface.js L5-L78](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L5-L78)

---

## Training Battle Setup

### Setup Interface

The training setup page ([src/train/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php)

) provides controls for configuring battle parameters before initiating a match. The interface is managed by `InterfaceMaster` singleton in [src/js/training/TrainingSetupInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js)

| Configuration Option | Values | Description |
| --- | --- | --- |
| **Battle Mode** | Single (3v3), Tournament (6v6) | Determines roster size and match structure |
| **League & Cup** | 1500/2500/10000 CP, Various cups | Sets CP limit and eligible Pokémon |
| **Difficulty** | Novice (0), Rival (1), Elite (2), Champion (3) | Controls AI sophistication |
| **Autotap** | On/Off | Automatically queues fast moves |
| **Team Selection** | Random, Manual, Custom, Featured | How opponent team is generated |

**Key Methods:**

* `startBattle(e)` [src/js/training/TrainingSetupInterface.js L219-L283](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L219-L283)  - Validates settings and dispatches to `MatchHandler.initBattle()`
* `selectMode(e)` [src/js/training/TrainingSetupInterface.js L287-L298](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L287-L298)  - Switches between single and tournament modes
* `selectTeamMethod(e)` [src/js/training/TrainingSetupInterface.js L302-L337](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L302-L337)  - Changes team selection method
* `selectFeaturedTeam(e)` [src/js/training/TrainingSetupInterface.js L341-L404](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L341-L404)  - Loads featured team from content creators

**Sources:** [src/train/index.php L11-L103](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L11-L103)

 [src/js/training/TrainingSetupInterface.js L46-L95](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L46-L95)

### Team Selection Methods

```

```

**Sources:** [src/js/training/TrainingSetupInterface.js L219-L283](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L219-L283)

 [src/js/training/TrainingAI.js L36-L244](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L36-L244)

---

## AI System

### AI Difficulty Levels

The AI behavior is configured via difficulty archetypes defined in [src/data/training/aiArchetypes.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json)

 Each level modifies multiple parameters:

| Difficulty | Level | Charged Moves | Energy Guess Range | Reaction Time | IV Rank Range | Strategies |
| --- | --- | --- | --- | --- | --- | --- |
| **Novice** | 0 | 1 | ±15 energy | 12 turns | 0-3000 | DEFAULT, SHIELD |
| **Rival** | 1 | 2 | ±10 energy | 8 turns | 0-2000 | + SWITCH_BASIC |
| **Elite** | 2 | 2 | ±5 energy | 4 turns | 0-1000 | + FARM_ENERGY, BAIT_SHIELDS |
| **Champion** | 3 | 2 | Perfect (0) | 2 turns | 0-500 | + All advanced strategies |

**Sources:** [src/data/training/aiArchetypes.json L1-L56](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json#L1-L56)

### TrainingAI Class Architecture

The `TrainingAI` class ([src/js/training/TrainingAI.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js)

) implements sophisticated decision-making logic:

```

```

**Sources:** [src/js/training/TrainingAI.js L11-L1500](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L11-L1500)

### Team Generation Strategy

When `generateTeam()` is called, the AI uses one of several pick strategies based on previous results:

| Strategy | When Used | Description |
| --- | --- | --- |
| `BASIC` | Fresh round, weighted by difficulty | Random consecutive 3 from roster |
| `BEST` | Fresh round | Lead with highest average performance |
| `COUNTER` | Fresh round | Lead with counter to opponent's best |
| `UNBALANCED` | Fresh round | Two strong picks + bodyguard lead |
| `SAME_TEAM` | After win | Reuse winning team |
| `SAME_TEAM_DIFFERENT_LEAD` | After win | Reuse team, swap lead |
| `COUNTER_LAST_LEAD` | After loss | Lead with counter to previous opponent lead |
| `PRESET` | Preset teams available | Use full preset team from pool |

**Sources:** [src/js/training/TrainingAI.js L248-L551](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L248-L551)

### Decision-Making Process

Each turn, the AI follows this decision hierarchy:

```

```

**Sources:** [src/js/training/TrainingAI.js L632-L811](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L632-L811)

 [src/js/training/TrainingAI.js L1030-L1127](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1030-L1127)

### Shield Decision Logic

The `decideShield()` method [src/js/training/TrainingAI.js L1181-L1395](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1181-L1395)

 evaluates whether to use a shield:

1. **Estimate opponent energy** - Uses `energyGuessRange` from difficulty settings
2. **Calculate potential damage** from upcoming charged moves
3. **Evaluate shield scenarios**: * Damage prevented vs shield cost * Remaining Pokemon count * Health of current Pokemon * Shield parity (player vs opponent shields)
4. **Bad Decision Protection** - Champion difficulty validates decisions with additional simulations

**Sources:** [src/js/training/TrainingAI.js L1181-L1395](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1181-L1395)

---

## Battle Execution

### MatchHandler Coordination

The `MatchHandler` class [src/js/training/MatchHandler.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js)

 coordinates the overall battle flow:

```

```

**Sources:** [src/js/training/MatchHandler.js L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L1-L100)

 [src/js/training/BattleInterface.js L52-L128](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L52-L128)

### Battle Interface Updates

The `BattleInterface.update()` method [src/js/training/BattleInterface.js L132-L554](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L132-L554)

 processes each turn update:

| Phase | Description | Actions |
| --- | --- | --- |
| `countdown` | Pre-battle countdown | Display 3-2-1-Go animation |
| `suspend_charged_attack` | Player charged move ready | Show charge-up minigame |
| `suspend_charged_shield` | Opponent charged move incoming | Prompt shield decision |
| `suspend_switch_self` | Player needs to switch | Open switch window |
| `animating` | Move animation playing | Display move effects |
| `game_over` | Battle complete | Show end screen statistics |

**Sources:** [src/js/training/BattleInterface.js L132-L256](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L132-L256)

### End-Game Analytics

After battle completion, `reportBattleAnalytics()` [src/js/training/BattleInterface.js L735-L800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L735-L800)

 collects:

* Battle result (win/loss/tie)
* League/cup and difficulty
* Team compositions for both players
* Individual Pokemon performance metrics: * Damage dealt * Shields burned * Energy gained/used/lost * Charged move damage

This data is stored server-side and aggregated for the Training Analysis page.

**Sources:** [src/js/training/BattleInterface.js L650-L800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L650-L800)

---

## Training Analysis

### Analytics Data Structure

Training battle results are aggregated into JSON files [src/data/training/analysis/all/*.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/*.json)

 with the following schema:

```

```

**Metrics:**

* **individualScore** - Average damage dealt as percentage (100% = 1 Pokemon worth + shield value)
* **teamScore** - Battle rating (0-1000) where >500 indicates winning record
* **games** - Sample size (usage count)
* **usageTrend** - Usage percentage over last 30 days (10 data points)

**Sources:** [src/data/training/analysis/all/1500.json L1-L350](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/analysis/all/1500.json#L1-L350)

### Analysis Interface

The Training Analysis page [src/train/analysis.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php)

 displays top performers using `TrainRankingInterface` [src/js/interface/TrainRankingInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js)

:

```

```

**Key Methods:**

* `loadRankings(league, cup)` [src/js/interface/TrainRankingInterface.js L45-L63](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L45-L63)  - Fetches analysis data
* `displayRankingData(rankings)` [src/js/interface/TrainRankingInterface.js L67-L250](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L67-L250)  - Populates tables
* `displayUsage(e)` [src/js/interface/TrainRankingInterface.js L340-L420](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L340-L420)  - Shows usage trend modal

**Sources:** [src/train/analysis.php L1-L277](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/analysis.php#L1-L277)

 [src/js/interface/TrainRankingInterface.js L1-L450](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/interface/TrainRankingInterface.js#L1-L450)

### Server-Side Data Collection

Training battle results are stored via [src/data/training/getTraining.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php)

 which:

1. Accepts POST data with battle results
2. Stores in database tables: `training_pokemon`, `training_team`
3. Aggregates data for past 14 days
4. Filters by minimum usage thresholds
5. Generates JSON files for each league/cup combination

**Database Schema (inferred):**

| Table | Columns | Purpose |
| --- | --- | --- |
| `training_pokemon` | pokemon, moves, score, league, cup, timestamp | Individual Pokemon performance |
| `training_team` | team, score, league, cup, timestamp | Team performance |

**Sources:** [src/data/training/getTraining.php L1-L120](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/getTraining.php#L1-L120)

---

## Team Data Management

### Preset Team Structure

Preset teams are defined in JSON files under [src/data/training/teams/](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/)

:

```

```

**Example Preset:**

```

```

**Sources:** [src/data/training/teams/gobattleleague/1500.json L1-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/gobattleleague/1500.json#L1-L100)

### Featured Teams

Featured teams [src/data/training/teams/featured/featured-*.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/featured/featured-*.json)

 include metadata for content creator teams:

| Field | Description |
| --- | --- |
| `name` | Team creator name |
| `slug` | Unique identifier |
| `description` | Team description |
| `link` | Creator's channel/profile URL |
| `img` | Creator avatar filename |
| `cupName` | Cup/format name |
| `league` | CP limit |
| `cup` | Cup identifier |
| `pokemon` | Array of 3-6 Pokemon with movesets |
| `weight` | Selection probability |

**Sources:** [src/js/training/TrainingSetupInterface.js L6-L17](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L6-L17)

 [src/js/training/TrainingSetupInterface.js L341-L404](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L341-L404)

### Custom Team Editor

Users can create custom team pools via [src/train/editor.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/editor.php)

 using `TrainingEditor` [src/js/training/TrainingEditor.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingEditor.js)

:

1. Build teams using `PokeMultiSelect` interface
2. Store teams array in localStorage with key format: `"training-teams-{name}"`
3. Data structure includes `dataType: "training-teams"` flag
4. Teams can be exported as JSON and shared via text codes
5. Imported via textarea in main training interface

**Sources:** [src/train/editor.php L1-L120](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/editor.php#L1-L120)

 [src/js/training/TrainingEditor.js L1-L300](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingEditor.js#L1-L300)

---

## Data Flow Summary

```

```

**Sources:** [src/js/training/MatchHandler.js L29-L100](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L29-L100)

 [src/js/training/TrainingAI.js L36-L244](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L36-L244)

 [src/js/training/TrainingAI.js L632-L811](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L632-L811)

 [src/js/training/BattleInterface.js L735-L800](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L735-L800)