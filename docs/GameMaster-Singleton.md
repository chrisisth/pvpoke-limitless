# GameMaster Singleton

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

The GameMaster singleton is the central data management system in PvPoke, responsible for loading, storing, and providing access to all Pokemon and move data throughout the application. It serves as the single source of truth for game mechanics, Pokemon statistics, movesets, and competitive format definitions.

This document covers the GameMaster's singleton implementation, data structures, loading mechanisms, and lookup operations. For information about how Pokemon objects use this data in battle, see [Pokemon Class](/pvpoke/pvpoke/3.2-pokemon-class). For details on competitive format definitions and cup rules, see [Groups and Meta Definitions](/pvpoke/pvpoke/7.1-groups-and-meta-definitions).

## Architecture Overview

The GameMaster follows a singleton pattern with lazy initialization, ensuring only one instance exists across the entire application. All components access game data through this centralized instance.

```

```

Sources: [src/js/GameMaster.js:1-226], [src/js/battle/Battle.js:4], [src/js/pokemon/Pokemon.js:8]

## Singleton Pattern Implementation

The GameMaster uses the JavaScript module pattern to implement a thread-safe singleton:

```

```

The singleton is created on first access and reused for all subsequent calls:

| Component | Location | Purpose |
| --- | --- | --- |
| `GameMaster` | Variable wrapping IIFE | Singleton container |
| `instance` | Private variable | Holds the single instance |
| `createInstance()` | Private function | Factory for creating the singleton |
| `getInstance()` | Public method | Returns the singleton instance |

Sources: [src/js/GameMaster.js:3-7]

## Data Structure

### gamemaster.json Schema

The primary data file follows this structure:

```

```

Sources: [src/data/gamemaster.json:1-36], [src/data/gamemaster.json:37-271]

### In-Memory Data Structures

After loading, data is organized into optimized structures:

| Structure | Type | Key | Value | Purpose |
| --- | --- | --- | --- | --- |
| `data.pokemon` | Array | - | Pokemon objects | Sequential access, iteration |
| `pokemonMap` | Map | `speciesId` | Pokemon object | O(1) lookup by ID |
| `data.moves` | Array | - | Move objects | Sequential access |
| `moveMap` | Map | `moveId` | Move object | O(1) lookup by move ID |
| `pokeSelectList` | Array | - | Search metadata | Optimized for UI autocomplete |
| `allPokemon` | Object | `cp` | `Pokemon[]` | Cached Pokemon instances per CP |

Sources: [src/js/GameMaster.js:9-19], [src/js/GameMaster.js:188-219]

## Data Loading Lifecycle

### Initial Load Sequence

```

```

Sources: [src/js/GameMaster.js:23-124]

### Settings-Based Loading

The GameMaster determines which data file to load based on the `settings.gamemaster` value initialized in PHP:

**Default Gamemaster Path:**

* Production: `data/gamemaster.min.json`
* Localhost: `data/gamemaster.json`

**Custom Gamemaster Path:**

* Load `gamemaster.min.json` as template
* Retrieve custom data from `localStorage` by key
* Override `pokemon` and `moves` arrays with custom data

Sources: [src/header.php:167-199], [src/js/GameMaster.js:23-28], [src/js/GameMaster.js:80-122]

## Search Map Creation

After loading data, the GameMaster creates optimized lookup structures:

### pokemonMap and moveMap

```

```

These maps enable constant-time lookups by ID without iterating arrays.

### pokeSelectList

A search-optimized array for UI autocomplete functionality:

| Field | Type | Purpose |
| --- | --- | --- |
| `speciesId` | string | Unique identifier |
| `speciesName` | string (lowercase) | Search matching |
| `displayName` | string | UI display |
| `dex` | number | Pokedex sorting |
| `priority` | number | Search result ordering |
| `nicknames` | string[] | Alternative search terms |
| `tags` | string[] | Filtering (shadow, mega, etc) |

Sources: [src/js/GameMaster.js:188-205]

## Custom GameMaster Support

### Storage Format

Custom gamemasters are stored in `localStorage` with this structure:

```

```

### Load/Save Operations

```

```

Sources: [src/js/GameMaster.js:127-185]

## Lookup and Query Operations

### Primary Lookup Functions

| Function | Parameter | Returns | Time Complexity |
| --- | --- | --- | --- |
| `getPokemonById(id)` | `speciesId` string | Pokemon object or undefined | O(1) |
| `getPokemonByFamily(familyId)` | `familyId` string | Pokemon[] | O(n) |
| `getPokemonForms(dex)` | `dex` number | Pokemon[] | O(n) |
| `getPokemonTier(id, cup)` | `speciesId`, cup object | number (tier points) | O(k) where k = tier count |
| `getAllPokemon(battle)` | Battle instance | Pokemon[] | O(n) first call, O(1) cached |

### Pokemon Lookup Example Flow

```

```

Sources: [src/js/GameMaster.js:228-298]

### Caching Strategy

The `getAllPokemon(battle)` function implements CP-based caching:

```

```

This cache dramatically improves performance for matrix battles and rankings by reusing Pokemon instances across multiple simulations at the same CP level.

Sources: [src/js/GameMaster.js:209-219]

## Integration Points

### Battle System Integration

```

```

Sources: [src/js/battle/Battle.js:4], [src/js/pokemon/Pokemon.js:8-20]

### Interface Integration Points

The GameMaster is accessed by various interface components:

| Component | Access Pattern | Purpose |
| --- | --- | --- |
| `PokeSelect` | `gm.pokeSelectList` | Autocomplete search |
| `PokeMultiSelect` | `gm.data.pokemon` | Group selection |
| `RankingInterface` | `gm.data.pokemon`, `gm.getCupById()` | Rankings display |
| `TeamInterface` | `gm.getAllPokemon(battle)` | Team building |
| `InterfaceMaster` | `gm.data.formats` | Format/cup dropdowns |

Sources: [src/js/interface/PokeSelect.js:9], [src/js/interface/PokeMultiSelect.js:9], [src/js/interface/RankingInterface.js:15]

### Format and Cup Select Population

On load, the GameMaster populates UI dropdowns with format and cup data:

```

```

Sources: [src/js/GameMaster.js:47-63]

## Global Access Pattern

Throughout the codebase, GameMaster is accessed using the singleton pattern:

```

```

This ensures:

* Single source of truth across the application
* Consistent data access patterns
* Efficient memory usage (one copy of data)
* Easy testing and mocking

Sources: [src/js/GameMaster.js:4], [src/js/battle/Battle.js:4], [src/js/pokemon/Pokemon.js:8], [src/js/interface/Interface.js:13]

## File Structure

### Core Files

| File | Purpose | Size (lines) |
| --- | --- | --- |
| `js/GameMaster.js` | Singleton implementation and data management | 574 |
| `data/gamemaster.json` | Full Pokemon and move data (development) | ~683KB |
| `data/gamemaster.min.json` | Minified data (production) | ~450KB |
| `data/gamemaster/pokemon.json` | Pokemon definitions source | ~212KB |
| `data/gamemaster/moves.json` | Move definitions source | ~86KB |
| `data/gamemaster/formats.json` | Format/cup definitions | ~122KB |

### PHP Integration

The settings object initialized in PHP determines which gamemaster to load:

```

```

Sources: [src/header.php:10-76], [src/header.php:167-199]

## Performance Considerations

### Optimization Strategies

1. **Minified Production Data**: The production site loads `gamemaster.min.json`, which is ~34% smaller than the full JSON
2. **Map-Based Lookups**: Using ES6 Map provides O(1) lookup vs O(n) array iteration
3. **Pokemon Instance Caching**: `allPokemon` cache prevents recreating Pokemon objects for bulk operations
4. **Lazy Initialization**: Singleton is only created when first accessed
5. **Search List Optimization**: `pokeSelectList` pre-processes data for UI searches

### Cache Invalidation

The cache must be flushed when custom gamemasters are loaded:

```

```

This ensures that Pokemon instances are recreated with the new data.

Sources: [src/js/GameMaster.js:222-225]