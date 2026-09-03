# Master League Rankings (10000 CP)

> **Relevant source files**
> * [src/data/rankings/all/attackers/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/attackers/rankings-10000.json)
> * [src/data/rankings/all/chargers/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/chargers/rankings-10000.json)
> * [src/data/rankings/all/closers/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/closers/rankings-10000.json)
> * [src/data/rankings/all/consistency/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/consistency/rankings-10000.json)
> * [src/data/rankings/all/leads/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/leads/rankings-10000.json)
> * [src/data/rankings/all/overall/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/overall/rankings-10000.json)
> * [src/data/rankings/all/switches/rankings-10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/rankings/all/switches/rankings-10000.json)

## Purpose and Scope

This page documents the Master League rankings data for Pokémon GO PvP battles. Master League has a 10,000 CP limit, which effectively means no CP restrictions for most Pokémon, making it the premier unrestricted competitive tier where legendary and mythical Pokémon dominate the meta.

The rankings are pre-calculated performance data stored in static JSON files, organized by battle role categories. For information about other competitive leagues, see [Great League Rankings](/pvpoke/pvpoke/4.2-great-league-rankings-(1500-cp)) and [Ultra League Rankings](/pvpoke/pvpoke/4.3-ultra-league-rankings-(2500-cp)). For details on the ranking data structure shared across all leagues, see [Rankings Data Structure](/pvpoke/pvpoke/4.1-rankings-data-structure). For explanations of the battle role categories, see [Battle Role Categories](/pvpoke/pvpoke/4.6-battle-role-categories).

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-100`

## Master League Characteristics

Master League differs fundamentally from Great and Ultra Leagues due to its unrestricted CP limit:

| Characteristic | Master League |
| --- | --- |
| CP Limit | 10,000 (effectively unlimited) |
| Dominant Types | Dragon, Steel, Fairy, Psychic |
| Meta Staples | Legendary and Mythical Pokémon |
| IV Optimization | Best Buddy at 100% IVs preferred |
| Accessibility | Requires significant Rare Candy and Stardust investment |

The league features powerful legendary Pokémon like **Zacian (Crowned Sword)**, **Palkia (Origin)**, **Dialga (Origin)**, **Kyurem (White/Black)**, and **Xerneas** as the core meta threats. Unlike lower leagues where bulk often trumps attack, Master League rewards both offensive pressure and defensive typing.

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-50`

## Ranking File Organization

Master League rankings are stored across seven category-specific JSON files:

```

```

Each file contains an ordered array of Pokémon ranked by performance in that specific battle role. The combined importance of Master League rankings data is **202.75**, making it the third most important league after Great League (433.58) and Ultra League (289.54).

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1`, `src/data/rankings/all/consistency/rankings-10000.json:1`, `src/data/rankings/all/leads/rankings-10000.json:1`

## Data Structure Schema

Each Pokémon entry in the rankings follows this structure:

```

```

**Example Entry (Zacian - Crowned Sword):**

```

```

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-100`, `src/data/rankings/all/consistency/rankings-10000.json:1-10`

## Top Performers by Category

### Overall Rankings

The overall category represents aggregated performance across all battle scenarios. Top 10 performers:

| Rank | Pokémon | Species ID | Rating | Score | Editor Score |
| --- | --- | --- | --- | --- | --- |
| 1 | Zacian (Crowned Sword) | `zacian_crowned_sword` | 709 | 99.2 | 100 |
| 2 | Palkia (Origin) | `palkia_origin` | 820 | 98.9 | 100 |
| 3 | Metagross | `metagross` | 727 | 98.1 | - |
| 4 | Xerneas | `xerneas` | 733 | 96.6 | - |
| 5 | Zamazenta (Crowned Shield) | `zamazenta_crowned_shield` | 714 | 95.5 | - |
| 6 | Kyurem (White) | `kyurem_white` | 771 | 94.8 | 95 |
| 7 | Dialga (Origin) | `dialga_origin` | 753 | 94.4 | 95 |
| 8 | Reshiram | `reshiram` | 784 | 94.2 | - |
| 9 | Lunala | `lunala` | 726 | 94.0 | - |
| 10 | Zekrom | `zekrom` | 762 | 93.2 | - |

**Key Observations:**

* **Zacian** and **Palkia (Origin)** are rated as perfect (100) by editors despite not having the highest raw ratings
* Steel/Fairy and Water/Dragon typings dominate the top spots
* Origin formes of Palkia and Dialga outperform their standard formes
* Dragon types remain highly relevant despite Fairy-type threats

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-100`

### Consistency Rankings

Consistency measures reliable performance across diverse matchups. Top performers:

| Rank | Pokémon | Species ID | Rating | Score |
| --- | --- | --- | --- | --- |
| 1 | Zamazenta (Crowned Shield) | `zamazenta_crowned_shield` | 714 | 100 |
| 2 | Yveltal | `yveltal` | 733 | 100 |
| 3 | Jirachi | `jirachi` | 686 | 100 |
| 4 | Rhyperior | `rhyperior` | 666 | 100 |
| 5 | Victini | `victini` | 651 | 100 |

Zamazenta's Fighting/Steel typing and excellent bulk make it the most consistent performer, handling both Dragons and Steel types effectively.

**Sources:** `src/data/rankings/all/consistency/rankings-10000.json:1-10`

### Lead Rankings

Lead Pokémon excel at controlling the opening matchup. Top performers:

| Rank | Pokémon | Species ID | Rating | Score |
| --- | --- | --- | --- | --- |
| 1 | Kyurem (White) | `kyurem_white` | 771 | 100 |
| 2 | Dialga (Origin) | `dialga_origin` | 753 | 97.8 |
| 3 | Groudon | `groudon` | 727 | 97.8 |
| 4 | Zamazenta (Crowned Shield) | `zamazenta_crowned_shield` | 714 | 97.8 |
| 5 | Palkia (Origin) | `palkia_origin` | 820 | 96.7 |

**Sources:** `src/data/rankings/all/leads/rankings-10000.json:1-10`

### Switch Rankings

Switch Pokémon enter mid-battle to gain advantageous matchups. Top performers:

| Rank | Pokémon | Species ID | Rating | Score |
| --- | --- | --- | --- | --- |
| 1 | Palkia (Origin) | `palkia_origin` | 882 | 100 |
| 2 | Metagross | `metagross` | 804 | 99.5 |
| 3 | Kyurem (White) | `kyurem_white` | 855 | 99.2 |
| 4 | Metagross (Shadow) | `metagross_shadow` | 814 | 98.2 |
| 5 | Palkia (Shadow) | `palkia_shadow` | 861 | 98.1 |

Palkia (Origin) dominates as a switch with its fast-charging **Aqua Tail** and nuke-damage **Spacial Rend**.

**Sources:** `src/data/rankings/all/switches/rankings-10000.json:1-10`

### Closer Rankings

Closers finish battles when shields are depleted. Top performers:

| Rank | Pokémon | Species ID | Rating | Score |
| --- | --- | --- | --- | --- |
| 1 | Zacian (Crowned Sword) | `zacian_crowned_sword` | 715 | 100 |
| 2 | Groudon (Shadow) | `groudon_shadow` | 683 | 95.1 |
| 3 | Metagross | `metagross` | 644 | 94.4 |
| 4 | Eternatus | `eternatus` | 695 | 94.1 |
| 5 | Xerneas | `xerneas` | 696 | 93.9 |

**Sources:** `src/data/rankings/all/closers/rankings-10000.json:1-10`

### Charger Rankings

Chargers excel at generating and applying shield pressure. Top performers:

| Rank | Pokémon | Species ID | Rating | Score |
| --- | --- | --- | --- | --- |
| 1 | Reshiram | `reshiram` | 896 | 100 |
| 2 | Kyurem (White) | `kyurem_white` | 887 | 98.1 |
| 3 | Metagross (Shadow) | `metagross_shadow` | 852 | 96.2 |
| 4 | Palkia (Shadow) | `palkia_shadow` | 896 | 96.1 |
| 5 | Zekrom | `zekrom` | 874 | 95.8 |

**Sources:** `src/data/rankings/all/chargers/rankings-10000.json:1-10`

### Attacker Rankings

Attackers deal raw damage with minimal setup. Top performers:

| Rank | Pokémon | Species ID | Rating | Score |
| --- | --- | --- | --- | --- |
| 1 | Solgaleo | `solgaleo` | 539 | 100 |
| 2 | Xerneas | `xerneas` | 513 | 99.4 |
| 3 | Metagross | `metagross` | 465 | 99.2 |
| 4 | Zacian (Crowned Sword) | `zacian_crowned_sword` | 512 | 97.9 |
| 5 | Lugia | `lugia` | 558 | 97.3 |

**Sources:** `src/data/rankings/all/attackers/rankings-10000.json:1-10`

## Meta Core and Archetypes

```

```

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-50`, `src/data/rankings/all/consistency/rankings-10000.json:1-20`

## Moveset Analysis

### Most Used Fast Moves

| Move | Type | Energy | Damage | Primary Users |
| --- | --- | --- | --- | --- |
| `DRAGON_BREATH` | Dragon | +3 | 4 | Palkia, Dialga, Reshiram, Zekrom |
| `METAL_CLAW` | Steel | +3 | 5 | Zacian, Zamazenta, Dialga |
| `COUNTER` | Fighting | +4 | 4 | Marshadow, Annihilape |
| `CONFUSION` | Psychic | +3 | 20 | Meloetta, Jirachi, Mewtwo |
| `FIRE_SPIN` | Fire | +10 | 14 | Reshiram, Ho-Oh, Solgaleo |

### Signature Charged Moves

Master League features exclusive signature moves that define the meta:

| Move | User | Type | Power | Energy | Notes |
| --- | --- | --- | --- | --- | --- |
| `BEHEMOTH_BLADE` | Zacian | Steel | 100 | 50 | High damage Steel nuke |
| `BEHEMOTH_BASH` | Zamazenta | Steel | 100 | 50 | Defensive equivalent |
| `SPACIAL_REND` | Palkia | Dragon | 95 | 50 | Guaranteed +2 Atk boost |
| `ROAR_OF_TIME` | Dialga | Dragon | 150 | 65 | Massive nuke damage |
| `FUSION_FLARE` | Reshiram, Kyurem-W | Fire | 90 | 45 | Fast charging Fire attack |
| `FUSION_BOLT` | Zekrom, Kyurem-B | Electric | 90 | 45 | Fast charging Electric attack |
| `GEOMANCY` | Xerneas | Fairy | 0 | 0 | Instant +2 Atk, +1 Def on entry |

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-30`

## Common Team Compositions

### ABB (Double Steel) Structure

```yaml
Lead: Dialga (Origin) - Steel/Dragon
Safe Switch: Zacian (Crowned Sword) - Steel/Fairy
Closer: Metagross - Steel/Psychic
```

**Strategy:** Dominates Dragon-heavy teams, forces Ho-Oh as a counter. Weak to simultaneous Ground + Fire/Fighting coverage.

### Balanced Dragon Core

```yaml
Lead: Palkia (Origin) - Water/Dragon
Safe Switch: Kyurem (White) - Dragon/Ice
Closer: Groudon - Ground
```

**Strategy:** Dragon pressure with Fire/Ground/Water coverage. Handles Steel types while maintaining Dragon dominance.

### Anti-Meta Fairy Stack

```yaml
Lead: Xerneas - Fairy
Safe Switch: Zacian (Crowned Sword) - Steel/Fairy
Closer: Togekiss - Fairy/Flying
```

**Strategy:** Exploits Dragon-heavy meta. Extremely vulnerable to Steel and Poison types.

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-50`, `src/data/rankings/all/leads/rankings-10000.json:1-20`

## Stat Product Distribution

Master League Pokémon at level 50 (Best Buddy level 51 for legendaries):

```

```

Most competitive Master League Pokémon maintain stat products above 8000, with bulk being crucial for surviving the high-damage meta. Notable exceptions like **Kartana** (6065) succeed through typing advantages and fast move pressure.

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-50`

## Editor Annotations

Select Pokémon have manual editor ratings and strategic notes:

### Zacian (Crowned Sword)

* **Editor Score:** 100
* **Notes:** "Crowned Forme Zacian boasts one of the best defensive typings in the game and stats which rival those of Mega Evolutions. It's a definitive Master League Pokemon of the current era, alongside Palkia. It's only held back by slower pacing and widely resisted Steel offenses, but neither of these put a dent in its dominating presence."

### Palkia (Origin)

* **Editor Score:** 100
* **Notes:** "Origin Palkia is one of the definitive Master League Pokemon. It has everything you could ask for - stats, speed, power, and great typing, making it a top pick by most categories. Origin Forme is strictly better than Palkia's regular forme. If you don't have Spacial Rend, Fire Blast is a viable option to hit Zacian and other Steel types."

### Dialga (Origin)

* **Editor Score:** 95
* **Notes:** "Origin Dialga is a signature presence in Master League, strictly better than its regular forme. Iron Head is a weaker attack, so Dialga is more dependent on its nuke, Roar of Time, than Palkia is. Dialga's struggles against Zacian keep it from being as dominating as its predecessor."

### Kyurem (Black/White)

* **Editor Score:** 95
* **Notes:** "Black and White Kyurem have declined since the introduction of Zacian, but remain powerful picks. They capitalize on their amazing stats, solid pacing, and powerful signature attacks. White Kyurem is generally the less flexible of the two, but poses a stronger threat to Zacian and Palkia. Black Kyurem is generally the more flexible of the two but has fewer domineering matchups."

### Kyogre

* **Editor Score:** 90
* **Notes:** "Kyogre has historically rated poorly in the sims, especially as power creep has overtaken it. However, it has an important role to play against Ho-oh and Ground types, and it can be an vital counterpart to the meta's powerful Dragons. It now has much more accessible Ice coverage in Avalanche, giving it more flexibility than it's ever had. With proven success despite previous shortcomings, Kyogre should see increased prominence."

### Lugia

* **Editor Score:** 90
* **Notes:** "Lugia scores well in simulations thanks to its incredible stats and neutral matchup profile. However, its low offensive power and its struggles against Zacian and other Steel types reduce its effectiveness in the metagame."

### Ho-Oh

* **Editor Score:** 90
* **Notes:** "Ho-oh is a vital anti-meta presence to combat Zacian and other Steel or Fairy types. Its high-energy attacks can threaten most Pokemon, but some may find its playstyle to be too cumbersome. It also faces significant challenges against Palkia."

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-30`

## Data Loading in Application

```

```

The rankings are loaded client-side via AJAX requests when users navigate to the Master League rankings page. The application:

1. Loads the base ranking JSON for the selected category
2. Cross-references `gamemaster.json` for Pokémon and move details
3. Applies any `overrides/*.json` editorial adjustments
4. Filters by selected cup/format from `groups/*.json`
5. Renders the ranked list with expandable matchup details

**Sources:** Based on system architecture from Diagram 2 in overview

## Shadow Pokémon Performance

Master League includes several Shadow variants that trade bulk for increased attack:

| Shadow Pokémon | Overall Rating | Notes |
| --- | --- | --- |
| Metagross (Shadow) | 701 | Higher switch score (814) than regular (804) |
| Palkia (Shadow) | 791 | Sacrifices bulk for faster KOs |
| Dialga (Shadow) | 697 | Less consistent than Origin forme |
| Lugia (Shadow) | 725 | Maintains bulk advantage even with Shadow nerf |
| Groudon (Shadow) | N/A (in closers) | Dominant closer (683 rating, 95.1 score) |

Shadow Pokémon generally perform worse in Master League compared to lower leagues, as the loss of bulk is more punishing against the league's high damage output. Exceptions include **Shadow Metagross** and **Shadow Groudon**, which maintain competitive viability.

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:10-50`, `src/data/rankings/all/switches/rankings-10000.json:1-30`

## Matchup Rating System

Matchup ratings use a 0-1000 scale:

* **800+:** Dominant win (opponent has minimal winning scenarios)
* **600-799:** Solid advantage (win with shields or energy lead)
* **500-599:** Slight advantage (favorable but close)
* **400-499:** Slight disadvantage
* **200-399:** Significant disadvantage
* **< 200:** Heavily countered

**Example - Zacian vs Dialga (Origin):**

```

```

Zacian has a **742 rating** against Dialga, indicating a solid advantage. Zacian's Steel/Fairy typing resists Dialga's Dragon moves while threatening with Close Combat.

**Example - Zacian vs Ho-Oh:**

```

```

Zacian only achieves a **322 rating** against Ho-Oh, indicating a significant disadvantage. Ho-Oh's Fire typing and Sacred Fire/Brave Bird threaten Zacian while resisting its Steel attacks.

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-10`

## Usage Statistics

Move usage data reflects simulation frequency across tens of thousands of battles:

### Fast Move Distribution (Palkia Origin)

```

```

**Dragon Breath** is preferred (52.5% usage) over **Dragon Tail** (47.5%) due to faster energy generation, despite Dragon Tail's higher damage.

### Charged Move Distribution (Palkia Origin)

```

```

**Aqua Tail** (45.7% usage) is the primary bait move, while **Spacial Rend** (24.5%) serves as the closing nuke. **Fire Blast** (10.0%) provides Steel-type coverage, particularly against Zacian.

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-5`

## Key Type Matchups

Master League type matchups differ from lower leagues due to the prevalence of Dragons and Fairies:

```

```

**Sources:** `src/data/rankings/all/overall/rankings-10000.json:1-50`

## File References and Integration

The Master League rankings integrate with multiple system components:

| Component | File Path | Purpose |
| --- | --- | --- |
| Rankings Display | `src/rankings.php` | UI template for rankings page |
| Rankings Interface | `src/js/RankingsInterface.js` | Client-side controller |
| Pokemon Data | `src/data/gamemaster.json` | Base stats, types, moves |
| Move Overrides | `src/data/overrides/all/*.json` | Editorial move recommendations |
| Group Definitions | `src/data/groups/*.json` | Cup/format filters |
| Battle Simulator | `src/js/Battle.js` | Generates matchup data |
| Rankings Generator | External (not in repo) | Pre-calculates all rankings |

Rankings are consumed by:

* **Team Builder** (`src/team-builder.php`) - References top threats
* **Training Mode** (`src/train/`) - Uses rankings for AI team selection
* **Battle Simulator** (`src/battle.php`) - Displays rankings for selected Pokémon

**Sources:** Based on system architecture from Diagrams 1, 2, and 4 in overview