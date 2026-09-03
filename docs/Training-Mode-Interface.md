# Training Mode Interface

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

This document covers the **Training Mode setup interface** which allows users to configure and initiate practice battles against AI opponents. It describes the user-facing controls, battle modes (Single 3v3 and Tournament 6v6), team selection methods, AI difficulty levels, and the setup workflow.

For documentation on AI decision-making and battle strategies, see [AI Decision Making](/pvpoke/pvpoke/5.2-ai-decision-making). For analytics and performance tracking, see [Training Analysis and Meta Insights](/pvpoke/pvpoke/5.3-training-analysis-and-meta-insights).

---

## Overview

The Training Mode Interface provides a setup screen where users configure battle parameters before entering an interactive battle simulation. The interface is implemented across three primary files: the PHP template [src/train/index.php L1-L165](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L1-L165)

 the setup interface controller [src/js/training/TrainingSetupInterface.js L1-L628](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L1-L628)

 and the battle interface controller [src/js/training/BattleInterface.js L1-L1570](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L1-L1570)

 These components are coordinated by [src/js/training/MatchHandler.js L1-L168](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L1-L168)

**Sources:** [src/train/index.php L1-L165](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L1-L165)

 [src/js/training/TrainingSetupInterface.js L1-L628](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L1-L628)

---

## Component Architecture

```

```

**Sources:** [src/train/index.php L1-L165](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L1-L165)

 [src/js/training/TrainingSetupInterface.js L19-L95](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L19-L95)

 [src/js/training/MatchHandler.js L3-L25](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L3-L25)

---

## Battle Modes

The interface supports two distinct battle modes controlled by the `.mode-select` dropdown:

### Single Mode (3v3)

| Property | Value |
| --- | --- |
| **Party Size** | 3 Pokémon |
| **Format** | Best-of-one battle |
| **Team Selection** | Direct team selection or roster selection for tournament cups |
| **UI Element** | `<option value="single">Single (3v3)</option>` |

When Single mode is selected, the `partySize` variable is set to 3 [src/js/training/TrainingSetupInterface.js L288-L293](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L288-L293)

 and users proceed directly to battle after clicking the "Train" button.

### Tournament Mode (6v6)

| Property | Value |
| --- | --- |
| **Party Size** | 6 Pokémon roster |
| **Format** | Best-of-five series with team selection between rounds |
| **Team Selection** | Select 3 from roster of 6 before each battle |
| **UI Element** | `<option value="tournament">Tournament (6v6)</option>` |

In Tournament mode, clicking "Train" opens the team selection screen [src/js/training/TrainingSetupInterface.js L78](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L78-L78)

 where users choose 3 Pokémon from their 6-Pokémon roster for each round. The `roundRecord` array tracks wins and losses [src/js/training/MatchHandler.js L13](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L13-L13)

**Note:** Tournament mode is automatically disabled for GO Battle League formats with `partySize: 3` [src/js/training/TrainingSetupInterface.js L530-L536](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L530-L536)

**Sources:** [src/train/index.php L35-L38](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L35-L38)

 [src/js/training/TrainingSetupInterface.js L286-L298](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L286-L298)

 [src/js/training/MatchHandler.js L13-L14](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L13-L14)

---

## AI Difficulty Levels

Four difficulty levels are defined in [src/data/training/aiArchetypes.json L1-L71](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json#L1-L71)

 and displayed via `.difficulty-select`:

```

```

### Difficulty Configuration Table

| Difficulty | Level | Charged Moves | Energy Guess Range | IV Combo Range | Reaction Time | Key Strategies |
| --- | --- | --- | --- | --- | --- | --- |
| **Novice** | 0 | 1 | ±15 energy | 3000 ranks | 12 turns | DEFAULT, SHIELD |
| **Rival** | 1 | 2 | ±10 energy | 2000 ranks | 8 turns | + SWITCH_BASIC |
| **Elite** | 2 | 2 | ±5 energy | 1000 ranks | 4 turns | + FARM_ENERGY, BAIT_SHIELDS |
| **Champion** | 3 (default) | 2 | ±0 energy | 200 ranks | 0 turns | + All advanced strategies |

The `chargedMoveCount` determines how many charged moves AI Pokémon have [src/js/training/TrainingAI.js L226-L232](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L226-L232)

 The `reactionTime` parameter adds delay before the AI switches Pokémon [src/js/training/TrainingAI.js L1062](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L1062-L1062)

**Sources:** [src/data/training/aiArchetypes.json L1-L71](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/aiArchetypes.json#L1-L71)

 [src/train/index.php L49-L55](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L49-L55)

 [src/js/training/TrainingAI.js L20](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L20-L20)

---

## Team Selection Methods

The `.team-method-select` dropdown controls how the AI opponent's team is generated:

```

```

### Random Team Selection

When `teamSelectMethod === "random"` [src/js/training/TrainingSetupInterface.js L306-L310](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L306-L310)

 the AI calls `TrainingAI.generateRoster()` [src/js/training/TrainingAI.js L36-L244](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L36-L244)

 which:

1. Loads team data for the selected league/cup via `gm.loadTeamData()` [src/js/training/TrainingAI.js L44](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L44-L44)
2. Selects slots from the team pool based on weight values [src/js/training/TrainingAI.js L108-L146](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L108-L146)
3. Generates random IVs within the difficulty's `ivComboRange` [src/js/training/TrainingAI.js L211-L223](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L211-L223)
4. Assigns appropriate movesets [src/js/training/TrainingAI.js L225-L228](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L225-L228)

### Manual Team Selection

Shows a second `PokeMultiSelect` interface [src/js/training/TrainingSetupInterface.js L313-L317](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L313-L317)

 where users build the opponent's team directly.

### Featured Teams

Loads teams from [src/data/training/teams/featured/featured-july.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/training/teams/featured/featured-july.json)

 [src/js/training/TrainingSetupInterface.js L6-L17](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L6-L17)

 When a featured team is selected:

1. The associated league/cup is auto-selected [src/js/training/TrainingSetupInterface.js L354-L355](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L354-L355)
2. Team preview is displayed with Pokémon and movesets [src/js/training/TrainingSetupInterface.js L365-L401](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L365-L401)
3. Team metadata (creator, description, link) is shown [src/js/training/TrainingSetupInterface.js L348-L351](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L348-L351)

### Custom Team Pool

Accepts JSON data from:

* localStorage (saved via Training Team Editor)
* Pasted JSON from textarea [src/train/index.php L70](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L70-L70)
* GoBattleLog.com export codes [src/train/index.php L66](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L66-L66)

Validation occurs via `validateTeamCode()` [src/js/training/TrainingSetupInterface.js L575-L598](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L575-L598)

 and displays success/error messages [src/train/index.php L71-L72](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L71-L72)

**Sources:** [src/train/index.php L57-L73](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L57-L73)

 [src/js/training/TrainingSetupInterface.js L301-L337](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L301-L337)

 [src/js/training/TrainingAI.js L36-L244](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingAI.js#L36-L244)

---

## Setup Flow and State Transitions

```

```

### Key Setup Methods

| Method | Purpose | Source |
| --- | --- | --- |
| `startBattle()` | Validates inputs, initiates roster/team generation | [src/js/training/TrainingSetupInterface.js L219-L283](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L219-L283) |
| `initBattle(props)` | Creates Player instances, sets up battle configuration | [src/js/training/MatchHandler.js L28-L56](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L28-L56) |
| `rosterReady()` | Callback after AI roster generation completes | [src/js/training/MatchHandler.js L162-L164](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L162-L164) |
| `openTeamSelect()` | Displays tournament team selection screen | [src/js/training/TrainingSetupInterface.js L129-L197](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L129-L197) |
| `startTournamentBattle()` | Initiates tournament round with selected team | [src/js/training/MatchHandler.js L91-L108](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L91-L108) |

**Sources:** [src/js/training/TrainingSetupInterface.js L219-L283](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L219-L283)

 [src/js/training/MatchHandler.js L28-L164](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L28-L164)

---

## Setup Interface Elements

The setup screen consists of several key UI sections defined in [src/train/index.php L11-L103](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L11-L103)

:

### Your Team Section

```

```

* **PokeMultiSelect Component:** Displays and manages user's team selection
* **Random Button:** Calls `randomizeTeam()` to generate a random team [src/js/training/TrainingSetupInterface.js L543-L549](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L543-L549)

### Settings Panel

Located in `.poke.ai-options` [src/train/index.php L32-L93](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L32-L93)

:

| Control | Element | Purpose |
| --- | --- | --- |
| **Mode Select** | `.mode-select` | Single vs Tournament |
| **League & Cup** | `.league-cup-select` | Sets CP limit and meta format |
| **Difficulty** | `.difficulty-select` | AI skill level (0-3) |
| **Autotap Toggle** | `.autotap-toggle` | Automatic fast move execution |
| **Team Method** | `.team-method-select` | Random/Manual/Featured/Custom |

### Featured Team Display

Conditionally shown when a featured team is selected [src/train/index.php L74-L90](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L74-L90)

:

```

```

Shows team creator avatar, name, description, and Pokémon/moveset preview.

**Sources:** [src/train/index.php L25-L93](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L25-L93)

 [src/js/training/TrainingSetupInterface.js L340-L404](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L340-L404)

---

## Tournament Team Selection Screen

When Tournament mode is active, the `.section.team-select` screen appears [src/train/index.php L105-L125](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L105-L125)

:

```

```

### Selection Logic

The `selectRosterPokemon()` function [src/js/training/TrainingSetupInterface.js L407-L464](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L407-L464)

 handles click events:

1. **Deselection:** If already selected, removes from `currentTeam` and resets `currentTeamIndex`
2. **New Selection:** Adds to `currentTeam[currentTeamIndex]` and increments index
3. **Visual Feedback:** Adds `.selected` class and displays team number [src/js/training/TrainingSetupInterface.js L424-L427](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L424-L427)
4. **Button State:** Shows "Let's Go" button only when 3 Pokémon selected [src/js/training/TrainingSetupInterface.js L459-L463](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L459-L463)

The round record displays as `{wins}-{losses}` format [src/train/index.php L122](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L122-L122)

 updated via `MatchHandler.nextTournamentRoundSetup()` [src/js/training/MatchHandler.js L112-L142](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L112-L142)

**Sources:** [src/train/index.php L105-L125](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L105-L125)

 [src/js/training/TrainingSetupInterface.js L129-L197](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L129-L197)

 [src/js/training/TrainingSetupInterface.js L407-L464](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L407-L464)

---

## League and Cup Selection

The `.league-cup-select` dropdown [src/train/index.php L40-L48](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L40-L48)

 controls both CP limits and meta restrictions:

```

```

Available leagues are hardcoded [src/train/index.php L40-L48](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L40-L48)

:

* GO Battle League (Great/Ultra/Master)
* Open Great/Ultra/Master League

Special cups like Cliffhanger force featured team mode and hide random team option [src/js/training/TrainingSetupInterface.js L519-L527](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L519-L527)

**Sources:** [src/train/index.php L40-L48](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L40-L48)

 [src/js/training/TrainingSetupInterface.js L501-L539](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L501-L539)

---

## InterfaceMaster Singleton Pattern

The `InterfaceMaster` singleton [src/js/training/TrainingSetupInterface.js L19-L628](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L19-L628)

 manages all setup UI state:

```

```

### Initialization Sequence

[src/js/training/TrainingSetupInterface.js L46-L95](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L46-L95)

1. Create `Battle` instance
2. Initialize two `PokeMultiSelect` instances (user + opponent)
3. Load ranking data via `gm.loadRankingData()`
4. Attach event listeners for all controls
5. Load saved team pools from localStorage

**Sources:** [src/js/training/TrainingSetupInterface.js L19-L628](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L19-L628)

---

## Properties Object Structure

When starting a battle, the setup interface constructs a `props` object [src/js/training/TrainingSetupInterface.js L256-L268](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L256-L268)

:

```

```

This properties object is passed to `MatchHandler.initBattle()` [src/js/training/MatchHandler.js L28](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L28-L28)

 to initialize the battle.

**Sources:** [src/js/training/TrainingSetupInterface.js L256-L280](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L256-L280)

 [src/js/training/MatchHandler.js L28-L56](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L28-L56)

---

## Visual Styling and Layout

The training interface uses distinct styling defined in [src/css/train.scss L35-L108](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.scss#L35-L108)

:

### Layout Structure

```

```

### Feature Visibility

Conditional display classes control which UI elements appear:

| Class | Default State | Purpose |
| --- | --- | --- |
| `.featured-team-section` | `display: none` | Shows when featured team selected |
| `.custom-team-section` | `display: none` | Shows when custom import selected |
| `.poke.multi` (opponent) | `display: none` | Shows when manual method selected |

**Sources:** [src/css/train.scss L35-L108](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/css/train.scss#L35-L108)

 [src/train/index.php L11-L103](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/train/index.php#L11-L103)

---

## Event Listeners and User Interactions

All user interactions are bound in `InterfaceMaster.init()` [src/js/training/TrainingSetupInterface.js L62-L74](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L62-L74)

:

| Selector | Event | Handler | Purpose |
| --- | --- | --- | --- |
| `.league-cup-select` | change | `selectLeague` | Update battle CP/cup |
| `.mode-select` | change | `selectMode` | Switch single/tournament |
| `.team-method-select` | change | `selectTeamMethod` | Switch team selection method |
| `.featured-team-select` | change | `selectFeaturedTeam` | Load featured team data |
| `.battle-btn` | click | `startBattle` | Begin battle validation/setup |
| `.lets-go-btn` | click | `startTournamentBattle` | Start tournament round |
| `.return-to-setup` | click | `returnToSetup` | Exit team selection |
| `.self .roster .pokemon` | click | `selectRosterPokemon` | Tournament team selection |
| `a.random` | click | `randomizeTeam` | Generate random user team |
| `.check` | click | `checkBox` | Toggle checkboxes |
| `textarea.team-import` | change | `initTeamCodeCheck` | Validate custom import |
| `.team-fill-select` | change | `loadTeamPool` | Load saved team pool |

**Sources:** [src/js/training/TrainingSetupInterface.js L62-L74](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L62-L74)

---

## Transition to Battle Interface

Once setup is complete, control transfers to `BattlerMaster` [src/js/training/BattleInterface.js L5-L1570](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L5-L1570)

:

```

```

The `InterfaceMaster.close()` method [src/js/training/TrainingSetupInterface.js L105-L114](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L105-L114)

 hides the setup UI sections, while `BattlerMaster.init()` [src/js/training/BattleInterface.js L53-L128](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L53-L128)

 displays the battle window and begins the simulation.

**Sources:** [src/js/training/TrainingSetupInterface.js L105-L114](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/TrainingSetupInterface.js#L105-L114)

 [src/js/training/BattleInterface.js L53-L128](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/BattleInterface.js#L53-L128)

 [src/js/training/MatchHandler.js L28-L108](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/js/training/MatchHandler.js#L28-L108)