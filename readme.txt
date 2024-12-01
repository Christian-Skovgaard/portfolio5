hej

For at få vores site til at virke skal den snakke med en mongodb server.

DB-en skal hede 'fitness'
Collectionen skal hede 'machines'
Dokumenterne kan findes i machines.json


denne kommando kan også bruges i shell
db.machines.insertMany([
  {
    "name": "treadmill",
    "musclegroup": ["calves", "thighs", "butt"],
    "difficulty": 1,
    "dangerlevel": 1
  },
  {
    "name": "bike",
    "musclegroup": ["calves", "thighs", "butt"],
    "difficulty": 1,
    "dangerlevel": 1
  },
  {
    "name": "kettlebell",
    "musclegroup": ["thighs", "shoulders", "butt", "abs", "chest"],
    "difficulty": 2,
    "dangerlevel": 2
  },
  {
    "name": "cabletower",
    "musclegroup": ["bicep", "tricep", "chest", "upper back", "lower back", "back", "shoulder","abs", "thighs", "butt", "calves"],
    "difficulty": 2,
    "dangerlevel": 2
  },
  {
    "name": "handweight",
    "musclegroup": ["bicep", "tricep", "chest","upper back", "lower back", "back", "shoulder"],
    "difficulty": 3,
    "dangerlevel": 3
  },
  {
    "name": "legpress",
    "musclegroup": ["thighs", "butt", "calves"],
    "difficulty": 1,
    "dangerlevel": 3
  },
  {
    "name": "stairwalker",
    "musclegroup": ["thighs", "butt", "calves", "abs"],
    "difficulty": 1,
    "dangerlevel": 1
  },
  {
    "name": "skiing",
    "musclegroup": ["thighs", "butt", "calves", "abs", "shoulder"],
    "difficulty": 1,
    "dangerlevel": 1
  },
  {
    "name": "bench",
    "musclegroup": ["bicep", "tricep", "chest", "shoulder"],
    "difficulty": 2,
    "dangerlevel": 3
  },
  {
    "name": "abcrunch",
    "musclegroup": ["abs", "lower back", "back"],
    "difficulty": 1,
    "dangerlevel": 1
  },
  {
    "name": "chestpress",
    "musclegroup": ["chest", "bicep", "tricep", "upper back"],
    "difficulty": 1,
    "dangerlevel": 2
  },
  {
    "name": "deadlift",
    "musclegroup": ["thighs", "shoulders", "butt", "abs"],
    "difficulty": 3,
    "dangerlevel": 3
  },
  {
    "name": "seatedrow",
    "musclegroup": ["chest", "bicep", "tricep", "upper back"],
    "difficulty": 1,
    "dangerlevel": 2
  }
])