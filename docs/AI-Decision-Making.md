# AI Decision Making

> **Relevant source files**
> * [src/css/train.css](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.css)
> * [src/css/train.css.map](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.css.map)
> * [src/css/train.scss](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.scss)
> * [src/data/training/aiArchetypes.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json)
> * [src/data/training/teams/jungle/1500.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/jungle/1500.json)
> * [src/js/pokemon/Player.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Player.js)
> * [src/js/training/BattleInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js)
> * [src/js/training/MatchHandler.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js)
> * [src/js/training/TrainingAI.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js)
> * [src/js/training/TrainingEditor.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingEditor.js)
> * [src/js/training/TrainingSetupInterface.js](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js)
> * [src/train/editor.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/editor.php)
> * [src/train/index.php](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php)

## Purpose and Scope

This document explains how the `TrainingAI` class makes strategic decisions during battles in training mode. It covers scenario simulation, strategy selection, shield logic, switch decisions, and difficulty-based behavior scaling. For information about the training mode user interface and setup, see [Training Mode Interface](/pvpoke/pvpoke/5.1-training-mode-interface). For analytics and performance tracking, see [Training Analysis and Meta Insights](/pvpoke/pvpoke/5.3-training-analysis-and-meta-insights).

## Architecture Overview

The AI decision-making system is implemented in the `TrainingAI` class, which is instantiated by the `Player` class when the player has AI control enabled. The AI operates at two distinct phases: **team selection** (before battle) and **in-battle decisions** (during battle).

```

```

**Sources:** [src/js/training/TrainingAI.js L11-L23](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L11-L23)

 [src/js/pokemon/Player.js L1-L25](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Player.js#L1-L25)

## Difficulty Levels

The AI has four difficulty levels defined in `aiArchetypes.json`, each with progressively more advanced capabilities and tighter performance parameters:

| Difficulty | Level | Charged Moves | Energy Guess Range | Reaction Time (turns) | IV Range | Key Strategies |
| --- | --- | --- | --- | --- | --- | --- |
| **Novice** | 0 | 1 | ±15 energy | 12 | Top 3000 | DEFAULT, SHIELD |
| **Rival** | 1 | 2 | ±10 energy | 8 | Top 2000 | + SWITCH_BASIC |
| **Elite** | 2 | 2 | ±5 energy | 4 | Top 1000 | + FARM_ENERGY, BAIT_SHIELDS |
| **Champion** | 3 | 2 | ±0 energy (perfect) | 0 (instant) | Top 200 | + All advanced strategies |

**Champion-level strategies include:**

* `SWITCH_FARM` - Build energy before switching
* `OVERFARM` - Store extra energy for next Pokemon
* `OPTIMIZE_TIMING` - Align move timing perfectly
* `PRESERVE_SWITCH_ADVANTAGE` - Protect switch advantage
* `ADVANCED_SHIELDING` - Complex shield decisions
* `BAD_DECISION_PROTECTION` - Prevent obviously bad choices
* `SACRIFICIAL_SWAP` - Strategic sacrifices

**Sources:** [src/data/training/aiArchetypes.json L1-L71](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json#L1-L71)

 [src/js/training/TrainingAI.js L20-L32](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L20-L32)

## Scenario Simulation System

The AI evaluates potential outcomes by running simulated battles through the `runScenario()` method. This is the core mechanism for all strategic decisions.

```

```

### Simulation Process

Each scenario simulation:

1. **Preserves state** - Stores current HP, energy, stat buffs, cooldowns, shields
2. **Sets behavior** - Configures baiting and farming flags
3. **Runs battles** - Simulates all shield combinations (0v0, 0v1, 0v2, 1v0, 1v1, 1v2, 2v0, 2v1, 2v2)
4. **Weights results** - Applies shield weights `[4, 4, 1]` to emphasize common scenarios
5. **Calculates average** - Returns weighted average rating (0-1000)
6. **Restores state** - Resets Pokemon to original state

**Key insight:** The rating scale is centered at 500 (even matchup), with higher values favoring the AI's Pokemon.

**Sources:** [src/js/training/TrainingAI.js L815-L957](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L815-L957)

 [src/js/training/TrainingAI.js L599-L622](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L599-L622)

## Team Selection Strategies

Before battle begins, the AI uses one of several strategies to select a team of 3 from its roster of 6 (or generates a preset team).

```

```

### Strategy Selection Weights

The AI uses weighted random selection to choose strategies. In subsequent rounds after a loss, strategies that counter the opponent's team are heavily favored:

* **After win:** `SAME_TEAM` and `SAME_TEAM_DIFFERENT_LEAD` weighted 3x, counter strategies weighted 12x
* **After loss:** Counter strategies weighted 3x, same team strategies weighted 12x
* **Basic strategy weight:** Scales with difficulty level and roster size

**Sources:** [src/js/training/TrainingAI.js L248-L551](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L248-L551)

 [src/js/training/TrainingAI.js L276-L307](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L276-L307)

## In-Battle Decision Framework

Once battle begins, the AI makes decisions at three key points: **matchup evaluation**, **action selection**, and **shield/switch decisions**.

### Matchup Evaluation

The `evaluateMatchup()` method is called at battle start and whenever switches complete. It runs all four scenario types and determines the AI's operating strategy.

```

```

**Key decision factors:**

* **Overall rating** - Average performance across scenarios
* **Switch availability** - Can't switch within 45 seconds of last switch
* **Opponent switch status** - If opponent is switch-locked, hard counter is favored
* **Switch advantage** - Champion AI preserves switch advantage strategically
* **HP preservation** - Won't switch with low HP if opponent can also switch

**Sources:** [src/js/training/TrainingAI.js L632-L811](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L632-L811)

### Action Decision Logic

On each turn, `decideAction()` determines whether to use a fast move, charged move, or switch.

```

```

**Overfarm conditions (Champion AI only):**

* Matchup rating > 450
* Not switching
* Opponent has multiple remaining Pokemon
* Opponent energy < 50 (heavily weighted)
* Future damage < 15% of current HP
* Not already at 100 energy
* Not using buff moves (Power-Up Punch, Acid Spray)
* Current HP > 20%

**Sources:** [src/js/training/TrainingAI.js L1030-L1127](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1030-L1127)

### Shield Decision Logic

The `decideShield()` method determines whether to use a shield when the opponent uses a charged move.

```

```

**Champion-level shield factors:**

* **Energy denial** - Shields deny opponent energy gain
* **Switch advantage** - If opponent is switch-locked, shields less valuable
* **Remaining Pokemon** - Preserves shields when multiple Pokemon remain
* **Damage threshold** - Won't shield hits less than certain % of max HP
* **Shield parity** - More likely to shield when ahead on shields

**Sources:** [src/js/training/TrainingAI.js L1181-L1294](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1181-L1294)

### Switch Selection Logic

When the AI decides to switch, `decideSwitch()` determines which Pokemon to switch to.

```

```

**Key insights:**

* **Exponential weighting** - Small rating differences create large weight differences
* **Hard vs soft counters** - When opponent is switch-locked, heavily favor the hardest counter. Otherwise, favor soft counters to minimize opponent's ability to counter-switch.
* **Bad decision protection** - Champion AI prevents selecting obviously inferior switches

**Sources:** [src/js/training/TrainingAI.js L1131-L1177](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1131-L1177)

## Difficulty Scaling Implementation

The difficulty levels affect AI behavior through several mechanisms:

### Parameter Differences

| Parameter | Implementation | Effect |
| --- | --- | --- |
| **chargedMoveCount** | [TrainingAI.js L226-L232](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/TrainingAI.js#L226-L232) | Novice uses only 1 charged move per Pokemon |
| **energyGuessRange** | [TrainingAI.js L1314-L1317](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/TrainingAI.js#L1314-L1317) | Adds uncertainty to opponent energy estimation |
| **moveGuessCertainty** | [TrainingAI.js L1328-L1379](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/TrainingAI.js#L1328-L1379) | Lower levels less accurate at predicting opponent moves |
| **reactionTime** | [TrainingAI.js L1062](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/TrainingAI.js#L1062-L1062) | Delay in turns before executing switch decision |
| **ivComboRange** | [TrainingAI.js L211-L218](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/TrainingAI.js#L211-L218) | Higher levels use better IV spreads |

### Strategy Availability

The `hasStrategy()` helper method checks if a strategy is available at the current difficulty level:

```

```

**Strategies by level:**

* **Level 0 (Novice):** DEFAULT, SHIELD
* **Level 1 (Rival):** + SWITCH_BASIC
* **Level 2 (Elite):** + FARM_ENERGY, BAIT_SHIELDS
* **Level 3 (Champion):** + All advanced strategies

**Sources:** [src/js/training/TrainingAI.js L1382-L1388](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1382-L1388)

 [src/data/training/aiArchetypes.json L1-L71](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json#L1-L71)

### Move Timing Optimization

Champion-level AI can set `optimizeMoveTiming` on its Pokemon, which aligns move timing to minimize energy waste and maximize damage windows:

```

```

**Sources:** [src/js/training/TrainingAI.js L202-L206](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L202-L206)

## Helper Functions and Utilities

### DecisionOption Class

A simple helper for weighted random selection:

```

```

Options are placed in a bucket multiple times according to their weight, then one is randomly selected.

**Sources:** [src/js/training/TrainingAI.js L1397-L1400](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1397-L1400)

 [src/js/training/TrainingAI.js L971-L995](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L971-L995)

### Energy and Damage Calculation

The AI estimates opponent energy and potential damage using move energy gains and cooldown timing:

```

```

The `calculatePotentialDamage()` method considers all possible charged moves the opponent could use with the given energy.

**Sources:** [src/js/training/TrainingAI.js L1038-L1051](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1038-L1051)

 [src/js/training/TrainingAI.js L1296-L1312](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1296-L1312)

## Integration with Battle System

The AI integrates with the battle system through the `Player` class, which serves as the interface between AI decisions and battle execution:

```

```

**Key interaction points:**

1. **Turn execution** - Battle calls `player.getAI().decideAction()` for AI players
2. **Shield prompts** - Battle calls `player.getAI().decideShield()` when charged move used
3. **Switch timer** - When switch timer reaches 0, AI re-evaluates matchup
4. **Battle events** - Switch completions trigger matchup re-evaluation

**Sources:** [src/js/pokemon/Player.js L108-L125](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/pokemon/Player.js#L108-L125)

 [src/js/training/TrainingAI.js L632-L811](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L632-L811)