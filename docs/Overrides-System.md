# Overrides System

> **Relevant source files**
> * [src/data/overrides/all/10000.json](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json)

## Purpose and Scope

The Overrides System provides editorial curation for the pre-calculated rankings data. It defines recommended movesets, weights for meta prevalence, and expert commentary for Pokemon across different competitive formats. These overrides supplement the raw simulation data with human expertise about practical metagame performance.

For custom user-defined modifications to Pokemon and moves, see [GameMaster Editor](/pvpoke/pvpoke/6.3-gamemaster-editor). For meta-specific move configurations and cup definitions, see [Groups and Meta Definitions](/pvpoke/pvpoke/7.1-groups-and-meta-definitions).

---

## Overview

The Overrides System consists of JSON files that specify:

* **Recommended movesets** - which Fast Move and Charged Move combinations to feature in rankings
* **Weights** - numerical values indicating a Pokemon's prevalence or importance in the meta
* **Editor scores** - manually curated performance ratings (0-100 scale)
* **Editor notes** - expert commentary about strengths, weaknesses, and strategic considerations

These overrides are applied to rankings data during display, ensuring that users see the most relevant movesets and receive context about Pokemon performance that may not be captured by pure simulation results.

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## File Structure

Override files are organized by competitive format in the `src/data/overrides/` directory:

```markdown
src/data/overrides/
├── all/
│   ├── 1500.json      # Great League overrides
│   ├── 2500.json      # Ultra League overrides
│   └── 10000.json     # Master League overrides
└── {cup-name}/
    ├── 1500.json      # Cup-specific Great League overrides
    ├── 2500.json      # Cup-specific Ultra League overrides
    └── 10000.json     # Cup-specific Master League overrides
```

The `all/` directory contains overrides for open competitive formats, while cup-specific directories contain overrides tailored to restricted formats with custom rulesets.

**Diagram: Override Data Flow**

```

```

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Override Entry Schema

Each override file contains a JSON array of override objects. Each object represents a single Pokemon configuration with the following structure:

**Diagram: Override Entry Structure**

```

```

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

### Field Definitions

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `speciesId` | String | Yes | Unique identifier for the Pokemon species (e.g., `"dialga_origin"`, `"palkia_shadow"`) |
| `fastMove` | String | No | Recommended Fast Move ID (e.g., `"DRAGON_BREATH"`, `"COUNTER"`) |
| `chargedMoves` | Array<String> | No | Array of 1-2 recommended Charged Move IDs (e.g., `["HYDRO_CANNON", "EARTHQUAKE"]`) |
| `weight` | Number | Yes | Meta prevalence indicator, typically 1-50, with higher values indicating greater importance |
| `editorScore` | Number | No | Manual performance rating on 0-100 scale |
| `editorNotes` | String | No | Expert commentary about the Pokemon's role, strengths, and weaknesses |

### Example Entries

**High-Impact Meta Staple:**

```

```

**Basic Override (No Editorial Commentary):**

```

```

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Recommended Movesets

The primary function of overrides is to specify which movesets should be featured in rankings displays. Without overrides, rankings might show suboptimal or less common moveset combinations.

### Moveset Selection Logic

1. **Fast Move Override**: If `fastMove` is specified, this Fast Move is featured for the Pokemon in rankings
2. **Charged Move Override**: If `chargedMoves` is specified (1-2 moves), these Charged Moves are featured
3. **Partial Overrides**: Either field can be omitted to use default behavior

### Multiple Entries Per Species

Some Pokemon have multiple override entries with different movesets to showcase different playstyles:

```

```

This allows rankings to display multiple viable configurations for versatile Pokemon.

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Weighting System

The `weight` field is a numerical indicator of a Pokemon's prevalence, importance, or recommended priority in the metagame. Higher weights indicate greater significance.

### Weight Ranges and Interpretation

| Weight Range | Interpretation | Example Use Cases |
| --- | --- | --- |
| 1-5 | Niche picks, spice options | Uncommon Pokemon with limited usage |
| 6-15 | Viable alternatives | Solid performers but not top-tier |
| 16-25 | Meta relevant | Frequently seen in competitive play |
| 26-42 | Meta defining | Top-tier Pokemon that shape the metagame |

### Example Weight Distribution

From Master League (10000 CP) overrides:

```

```

Weights are used by the rankings display to determine ordering, emphasis, or filtering when presenting Pokemon to users.

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Editorial Scores and Notes

### Editor Score

The `editorScore` field provides a manual performance rating on a 0-100 scale that reflects expert assessment beyond simulation results. This addresses cases where:

* Simulation results don't capture strategic nuances
* Pokemon perform differently in practice than in theory
* Meta game considerations aren't reflected in matchup win rates

**Score Ranges:**

* **85-89**: Strong performers with minor limitations
* **90-94**: Excellent performers with clear strengths
* **95-99**: Top-tier elite performers
* **100**: Meta-defining, best-in-class performers

### Editor Notes

The `editorNotes` field contains expert commentary providing strategic context. These notes typically cover:

* Core strengths and weaknesses
* Key matchup considerations
* Team building implications
* Playstyle characteristics
* Meta positioning

**Example with Full Editorial Data:**

```

```

This commentary explains why Kyogre receives a 90 editor score despite potentially lower simulation ratings.

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Integration with Rankings System

**Diagram: Override Integration Architecture**

```

```

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

### Loading Process

1. **Rankings Data Load**: Base rankings data is loaded from `rankings-{cp}.json` files
2. **Override Data Load**: Corresponding override file is loaded from `overrides/{format}/{cp}.json`
3. **Merge Operation**: Override data is merged with rankings entries by `speciesId`
4. **Display**: Rankings interface displays Pokemon with: * Recommended movesets from overrides * Visual weight indicators (size, prominence) * Editor scores and notes where provided

### Override Priority

When an override exists for a Pokemon:

* **Movesets**: Override movesets take precedence over simulation defaults
* **Scores**: `editorScore` may supplement or replace simulation-based ratings
* **Commentary**: `editorNotes` provide additional context in the UI

When no override exists:

* Pokemon uses default moveset selection logic
* Pure simulation results determine display
* No editorial commentary is shown

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Creating and Maintaining Overrides

### File Format Requirements

Override files must:

* Be valid JSON arrays
* Use UTF-8 encoding
* Follow the schema defined in this document
* Be located in the correct directory path

### Best Practices

1. **Moveset Selection**: Choose movesets that: * Are optimal or near-optimal for the format * Represent common competitive usage * Balance performance with accessibility
2. **Weight Assignment**: Consider: * Usage frequency in competitive play * Impact on meta game dynamics * Availability to players
3. **Editorial Content**: When adding `editorScore` and `editorNotes`: * Provide actionable strategic insights * Explain discrepancies between sims and practice * Highlight key matchups and counters * Keep notes concise but informative
4. **Consistency**: Maintain: * Consistent weight scaling across formats * Similar score ranges for similar performance levels * Parallel structure in editorial notes

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Relationship to Groups System

While both Overrides and Groups ([Groups and Meta Definitions](/pvpoke/pvpoke/7.1-groups-and-meta-definitions)) involve data curation, they serve distinct purposes:

| Aspect | Overrides System | Groups System |
| --- | --- | --- |
| **Purpose** | Define recommended movesets and editorial ratings | Define meta-specific move availability and restrictions |
| **Scope** | Individual Pokemon configurations | Entire competitive formats |
| **Content** | Movesets, weights, scores, notes | Eligible Pokemon lists, move overrides, cup rules |
| **Files** | `overrides/{format}/{cp}.json` | `groups/{format}.json` |
| **Usage** | Rankings display and recommendations | Battle simulation and format enforcement |

Groups determine *what* is legal in a format, while Overrides determine *what is recommended* for display in rankings.

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)

---

## Summary

The Overrides System provides critical editorial curation layer for PvPoke's rankings:

* **Moveset Curation**: Ensures users see optimal, practical movesets rather than simulation artifacts
* **Meta Context**: Weights indicate Pokemon prevalence and importance
* **Expert Analysis**: Editor scores and notes provide strategic insights beyond raw data
* **Format Flexibility**: Separate override files for each CP level and competitive format

This system bridges the gap between pure simulation results and practical metagame knowledge, making rankings more useful and actionable for competitive players.

**Sources:** [src/data/overrides/all/10000.json L1](https://github.com/pvpoke/pvpoke/blob/59a4e0a2/src/data/overrides/all/10000.json#L1-L1)