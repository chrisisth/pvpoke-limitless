# Groups and Meta Definitions

> **Relevant source files**
> * [src/data/groups/championshipseries.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json)
> * [src/data/groups/great.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json)
> * [src/data/groups/master.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json)
> * [src/data/groups/ultra.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json)

**Purpose**: This document explains the groups system, which defines meta-specific move configurations for competitive Pokémon formats. Groups files specify which fast move and charged move combinations are commonly used or recommended for each Pokémon in a given league or competitive format.

**Scope**: This page covers the structure of group JSON files, league-specific group definitions, shadow Pokémon handling, and how groups integrate with rankings and battle systems. For information about override files that provide editorial annotations, see [Overrides System](/pvpoke/pvpoke/7.2-overrides-system). For user settings and custom gamemaster management, see [User Settings and Themes](/pvpoke/pvpoke/7.3-user-settings-and-themes).

---

## Overview

Groups are JSON files stored in [src/data/groups/](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/)

 that define movesets for Pokémon in specific competitive formats. Unlike the GameMaster which contains all possible moves a Pokémon can learn, groups specify the practical movesets used in actual competitive play. This information is used by the rankings system to pre-calculate matchups with realistic move configurations rather than all possible combinations.

```

```

**Sources**: [src/data/groups/great.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json)

 [src/data/groups/ultra.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json)

 [src/data/groups/master.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json)

 [src/data/groups/championshipseries.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json)

---

## Group File Structure

Each group file is a JSON array of Pokémon entries. Each entry specifies a single moveset configuration for a specific Pokémon species.

### JSON Schema

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `speciesId` | string | Yes | Pokémon identifier matching GameMaster format |
| `fastMove` | string | Yes | Single fast move ID in SCREAMING_SNAKE_CASE |
| `chargedMoves` | string[] | Yes | Array of exactly 2 charged move IDs |
| `shadowType` | string | No | Set to `"shadow"` for shadow Pokémon variants |

### Example Entry Structure

```

```

For shadow Pokémon:

```

```

**Sources**: [src/data/groups/great.json L19-L22](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L19-L22)

 [src/data/groups/great.json L13-L17](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L13-L17)

---

## Data Flow and Integration

The following diagram illustrates how group files integrate with the broader PvPoke system:

```

```

**Sources**: [src/data/groups/great.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json)

 [src/data/groups/ultra.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json)

 [src/data/groups/master.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json)

---

## League-Specific Groups

### Great League (1500 CP)

The Great League group defines movesets for the 1500 CP format, focusing on Pokémon that perform well under the lower CP cap. This group contains approximately 43 species.

**Notable patterns**:

* Includes both normal and shadow variants of key meta Pokémon
* Shadow variants: `annihilape_shadow`, `empoleon_shadow`, `feraligatr_shadow`, `marowak_shadow`, `sableye_shadow`, `scizor_shadow`, `sealeo_shadow`, `talonflame_shadow`
* Some Pokémon like `steelix` have `shadowType: "shadow"` even without `_shadow` suffix

**Key meta picks**:

* Azumarill: `BUBBLE` / `ICE_BEAM` + `PLAY_ROUGH` [src/data/groups/great.json L19-L22](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L19-L22)
* Altaria: `DRAGON_BREATH` / `SKY_ATTACK` + `FLAMETHROWER` [src/data/groups/great.json L3-L6](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L3-L6)
* Bastiodon: `SMACK_DOWN` / `STONE_EDGE` + `FLAMETHROWER` [src/data/groups/great.json L24-L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L24-L27)

**Sources**: [src/data/groups/great.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json)

---

### Ultra League (2500 CP)

The Ultra League group covers the 2500 CP format with approximately 51 species. This league features a wider variety of Pokémon including legendaries and bulkier options.

**Notable patterns**:

* Includes legendary Pokémon: `giratina_altered`, `cresselia`, `mewtwo_armored`, `cobalion`, `virizion`, `regidrago`, `kyurem`
* Shadow variants: `annihilape_shadow`, `drapion_shadow`, `dusknoir_shadow`, `empoleon_shadow`, `feraligatr_shadow`, `nidoqueen_shadow`, `scizor_shadow`, `walrein_shadow`
* Some Pokémon have duplicate entries with different movesets (e.g., Giratina Altered, Lapras)

**Key meta picks**:

* Giratina Altered: `DRAGON_BREATH` / `DRAGON_CLAW` + `ANCIENT_POWER` [src/data/groups/ultra.json L98-L101](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json#L98-L101)
* Cresselia: `CONFUSION` / `GRASS_KNOT` + `MOONBLAST` [src/data/groups/ultra.json L39-L42](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json#L39-L42)
* Walrein: `POWDER_SNOW` / `ICICLE_SPEAR` + `EARTHQUAKE` [src/data/groups/ultra.json L250-L253](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json#L250-L253)

**Sources**: [src/data/groups/ultra.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json)

---

### Master League (10000 CP)

The Master League group is for unrestricted CP battles, featuring approximately 32 species, primarily legendary and mythical Pokémon with high base stats.

**Notable patterns**:

* Dominated by legendary Pokémon
* Includes origin and alternate forms: `dialga_origin`, `palkia_origin`, `kyurem_black`, `kyurem_white`, `necrozma_dawn_wings`, `necrozma_dusk_mane`
* Multiple Zacian/Zamazenta forms
* Note: `zamazenta_crowned_shield` has a duplicate entry with different fast moves [src/data/groups/master.json L148-L156](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json#L148-L156)

**Key meta picks**:

* Dialga Origin: `DRAGON_BREATH` / `ROAR_OF_TIME` + `IRON_HEAD` [src/data/groups/master.json L3-L6](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json#L3-L6)
* Mewtwo: `PSYCHO_CUT` / `PSYSTRIKE` + `SHADOW_BALL` [src/data/groups/master.json L73-L76](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json#L73-L76)
* Kyogre: `WATERFALL` / `AVALANCHE` + `ORIGIN_PULSE` [src/data/groups/master.json L28-L31](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json#L28-L31)

**Sources**: [src/data/groups/master.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json)

---

### Championship Series

The Championship Series group defines the meta for official competitive tournaments. It contains approximately 35 species and represents a curated competitive format.

**Notable patterns**:

* Mix of Great and Ultra League viable Pokémon
* Heavily focuses on shadow variants
* Excludes some legendaries present in open leagues
* Shares many movesets with Great League but includes some Ultra League picks

**Unique inclusions**:

* `goodra` (not in base great.json): `DRAGON_BREATH` / `AQUA_TAIL` + `THUNDER_PUNCH` [src/data/groups/championshipseries.json L80-L83](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json#L80-L83)
* `clefable`: `FAIRY_WIND` / `MOONBLAST` + `METEOR_MASH` [src/data/groups/championshipseries.json L196-L199](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json#L196-L199)

**Sources**: [src/data/groups/championshipseries.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json)

---

## Shadow Pokémon Handling

Shadow Pokémon are represented in two ways within group files:

### Method 1: _shadow Suffix

The most common approach uses a `_shadow` suffix in the `speciesId` along with `"shadowType": "shadow"`:

```

```

**Examples**: `annihilape_shadow`, `empoleon_shadow`, `feraligatr_shadow`, `marowak_shadow`, `sableye_shadow`, `scizor_shadow`, `sealeo_shadow`, `talonflame_shadow`

### Method 2: Direct shadowType Property

Some entries specify shadow status without modifying the `speciesId`:

```

```

This pattern appears in [src/data/groups/great.json L158-L162](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L158-L162)

 for Steelix.

### Shadow vs Normal Variants

Group files often include both normal and shadow variants of the same Pokémon when both are competitively viable:

| Species | Normal Variant | Shadow Variant | Difference |
| --- | --- | --- | --- |
| Annihilape | ✓ (Great) | ✓ (Great, Championship) | Shadow preferred in competitive |
| Empoleon | ✓ (All leagues) | ✓ (Great, Ultra, Championship) | Both viable |
| Sableye | ✓ (Great, Championship) | ✓ (Great, Championship) | Both meta-relevant |
| Feraligatr | ✓ (Great, Ultra, Championship) | ✓ (Great, Ultra) | Similar usage |

**Sources**: [src/data/groups/great.json L8-L17](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L8-L17)

 [src/data/groups/great.json L54-L63](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L54-L63)

 [src/data/groups/great.json L141-L150](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L141-L150)

---

## Moveset Selection Rationale

```

```

**Common charged move patterns**:

1. **Spam + Nuke**: One low-energy move for consistent damage/baiting, one high-damage move as a finisher (e.g., Walrein: `ICICLE_SPEAR` + `EARTHQUAKE`)
2. **STAB + Coverage**: One same-type attack bonus move, one coverage move for type disadvantages (e.g., Azumarill: `PLAY_ROUGH` (Fairy STAB) + `ICE_BEAM` (coverage))
3. **Dual Coverage**: Two coverage moves targeting different meta threats (e.g., Clodsire: `STONE_EDGE` + `EARTHQUAKE`)
4. **Buff + Nuke**: One move with stat boosts, one high-damage move (e.g., Talonflame: `FLAME_CHARGE` + `FLY`)

**Sources**: [src/data/groups/great.json L19-L27](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L19-L27)

 [src/data/groups/ultra.json L250-L253](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json#L250-L253)

 [src/data/groups/great.json L169-L172](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json#L169-L172)

---

## Usage in Rankings System

Groups are primarily consumed during the rankings generation process (not directly visible in the codebase but inferred from the data structure):

```

```

### Runtime Group Loading

While the pre-computed rankings are generated using group files, the group definitions are also used at runtime for:

1. **Default moveset selection**: When users select a Pokémon in the battle interface, the group file provides the default moveset
2. **Team building**: TeamRanker uses group movesets to evaluate team compositions
3. **Quick battle setup**: Groups enable "meta presets" for rapid battle configuration

**Sources**: [src/data/groups/great.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json)

 [src/data/groups/ultra.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json)

 [src/data/groups/master.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json)

---

## Custom Groups

Users can create and store custom group definitions using browser localStorage, similar to custom GameMasters. This allows players to:

* Define movesets for custom cups or formats
* Experiment with alternative moveset metas
* Save team compositions for specific tournaments

### Storage Structure

Custom groups are stored in localStorage with a key pattern matching the group file naming convention. The structure mirrors the standard group JSON format.

### Integration with Rankings

Custom groups can be used in combination with the rankings system to:

* Override default movesets during team evaluation
* Generate custom rankings for alternative meta scenarios
* Test hypothetical format changes

**Note**: Custom groups are a client-side feature. Pre-calculated rankings files (`rankings-*.json`) always use the default group configurations from [src/data/groups/](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/)

**Sources**: [src/data/groups/great.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/great.json)

 [src/data/groups/ultra.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/ultra.json)

 [src/data/groups/master.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/master.json)

 [src/data/groups/championshipseries.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/groups/championshipseries.json)

---

## Maintenance and Updates

Group files are manually curated to reflect the evolving competitive meta. Updates typically occur when:

1. **New Pokémon are released**: Species added with initial moveset recommendations
2. **Move changes**: Balance updates may shift optimal movesets
3. **Meta shifts**: Popular movesets change based on usage patterns
4. **Tournament formats**: Championship Series group updated for official events

### File Update Patterns

| File | Last Major Changes | Frequency |
| --- | --- | --- |
| `great.json` | High (64.11) | Most frequently updated |
| `championshipseries.json` | High (53.65) | Updated before tournaments |
| `master.json` | Medium (31.99) | Updated with legendary releases |
| `ultra.json` | Medium (26.70) | Regular meta adjustments |

**Sources**: File importance scores from provided data

---

## Related Systems

* **[Overrides System](/pvpoke/pvpoke/7.2-overrides-system)**: Provides editorial annotations and recommended movesets that complement group definitions
* **[GameMaster Singleton](/pvpoke/pvpoke/3.4-gamemaster-singleton)**: Contains the underlying Pokémon and move data that groups reference
* **[Rankings Data Structure](/pvpoke/pvpoke/4.1-rankings-data-structure)**: Pre-computed rankings generated using group movesets
* **[User Settings and Themes](/pvpoke/pvpoke/7.3-user-settings-and-themes)**: Manages selection between default and custom groups