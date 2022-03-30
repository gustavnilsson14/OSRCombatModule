function getEnemies(){
    return [
        {
            "name":"straker",
            "description":"A creature close to the neural magic. Strakers are sadistic, silent, and prays on wanderers of the metro.",
            "stats":{
                "str": 5,
                "dex": 9,
                "wil": 14,
                "en": 90,
                "av": 0,
            },
            "weaknesses":[
                "light",
                "cut",
                "pain",
                "nuke",
            ],
            "attacks":[
                {
                    "name":"smack",
                    "damage": "2-2-2",
                    "damageTypes": [
                        "smash"
                    ]
                },
                {
                    "name":"surge",
                    "damage": "3-3-2",
                    "damageTypes": [
                        "neural",
                        "pain"
                    ]
                },
            ],
            "actions":[
                {
                    "name":"psychic vortex",
                    "effect": "Roll 1d4, usable on a 4. Creates a phychic vortex on a tile. Passing through, or ending a turn inside the vortex deals 2d4 neural damage. When damaged, on failed WIL, immediately stops, and cannot exit the vortex until spending a TA to exit.",
                },
                {
                    "name":"drain power",
                    "effect": "Target an enemy in melee, if they fail WIL, they lose all their spell charges. Restores 1d4 endurance per spell charge drained.",
                },
                {
                    "name": "Teleportation",
                    "effect": "Move to any tile. On a failed WIL, cannot teleport again.",
                },
                {
                    "name":"screech",
                    "effect": "All enemies. On failed WIL, they may not charge, and the straker may remove a dice from any attack they make.",
                },
            ]
        },
        {
            "name":"moledog",
            "description":"A blind, subterranean dog which has strong claws for digging, a great sense of smell, and whiskers to navigate.",
            "stats":{
                "str": 8,
                "dex": 8,
                "wil": 4,
                "en": 40,
                "av": 0,
            },
            "weaknesses":[
                "light",
                "smash",
                "stab",
                "nuke",
            ],
            "attacks":[
                {
                    "name":"bite",
                    "damage": "2-1-1",
                    "damage types": [
                        "pain",
                        "stab",
                    ]
                },
                {
                    "name":"swipe",
                    "damage": "3-1-1",
                    "damage types": [
                        "cut",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "blindsight",
                    "effect": "The moledog uses its heightened secondary senses to anticipate, and evade danger. It cannot attack, but ranged attacks deal one less dice of the dogs choosing",
                },
                {
                    "name": "burrow",
                    "effect": "If on soft soil, the moledog burrows into the ground, and escpaes from combat",
                },
                {
                    "name": "on the hunt",
                    "effect": "Mole dogs move twice as fast when charging if an enemy is retreating",
                },
            ]
        },
        {
            
            "name":"Demon spider",
            "description":"An elusive menace, able to phase in and out of existance at will.",
            "stats":{
                "str": 4,
                "dex": 14,
                "wil": 9,
                "en": 42,
                "av": 1,
            },
            "weaknesses":[
                "smash",
                "blast",
                "pain",
                "light",
            ],
            "attacks":[
                {
                    "name":"Bite",
                    "damage": "2-2-1",
                    "damage types": [
                        "pain",
                        "nuke",
                    ]
                },
                {
                    "name":"Stinger",
                    "damage": "1-1-1",
                    "damage types": [
                        "nuke",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Spit",
                    "effect": "Allows melee attack to be ranged if stationary.",
                },
                {
                    "name": "Rappel",
                    "effect": "Allows moving anywhere on the battleground at the end of round, at the expense of no actions or movement",
                },
                {
                    "name": "Phase shift",
                    "effect": "When hit by Nuke, Ooze, Volt, Burst, or Gun, the spider phases out of existence, and is unharmed",
                },
                {
                    "name": "Poison gland",
                    "effect": "If the stinger deals damage, on failed STR victim becomes poisoned",
                },
            ]
        },
        {
            
            "name":"Ooze Zombie",
            "description":"A human being infested by ooze.",
            "stats":{
                "str": 7,
                "dex": 3,
                "wil": 99,
                "en": 30,
                "av": 0,
            },
            "weaknesses":[
                "cut",
                "pain",
                "smash",
                "blast",
                "light",
                "nuke",
            ],
            "attacks":[
                {
                    "name":"Bite",
                    "damage": "2-1-1",
                    "damage types": [
                        "pain",
                        "ooze",
                    ]
                },
                {
                    "name":"Punch",
                    "damage": "1-1-1",
                    "damage types": [
                        "smash",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Ooze infection",
                    "effect": "Bites which deal damage, on failed STR cause sickness.",
                },
                {
                    "name": "Rush",
                    "effect": "Charge movement is doubled, cannot take action",
                },
            ]
        },
        {  
            "name":"City bear",
            "description":"A mutated, intelligent bear. Only hunts for human if they must.",
            "stats":{
                "str": 12,
                "dex": 7,
                "wil": 5,
                "en": 60,
                "av": 1,
            },
            "weaknesses":[
                "stab",
                "gun",
                "burst",
                "ooze",
                "volt",
            ],
            "attacks":[
                {
                    "name":"Bite",
                    "damage": "3-2-1",
                    "damage types": [
                        "pain",
                        "cut",
                    ]
                },
                {
                    "name":"Swipe",
                    "damage": "2-2-1",
                    "damage types": [
                        "pain",
                        "smash",
                    ]
                },
                {
                    "name":"Bear Arbalest",
                    "damage": "3-2-1",
                    "damage types": [
                        "stab",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Roar",
                    "effect": "On a failed WIL enemies lose their movement and action in the first turn.",
                },
                {
                    "name": "Bear charge",
                    "effect": "All bears on the same tile charge, moving twice the first turn",
                },
                {
                    "name": "Sharpen claws",
                    "effect": "Swipe deals 1d6 extra damage, but bear cannot move",
                },
            ]
        },
        {
            "name": "Evil Hornet",
            "description": "A giant evil flying insect. Evil hornets are still just hornets, but huge.",
            "stats":{
                "str": 4,
                "dex": 16,
                "wil": 5,
                "en": 34,
                "av": 0,
            },
            "weaknesses":[
                "smash",
                "blast",
                "light",
            ],
            "attacks":[
                {
                    "name":"Sting",
                    "damage": "3-1-1",
                    "damage types": [
                        "pain",
                        "nuke",
                    ]
                },
                {
                    "name":"Bite",
                    "damage": "2-2-1",
                    "damage types": [
                        "pain",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Flight",
                    "effect": "Hornet moves anywhere on the map at the end of the round, but must stand ground during",
                },
                {
                    "name": "Ready poison",
                    "effect": "Sting attacks deal 1d4 extra damage",
                },
                {
                    "name": "Evasive",
                    "effect": "Ranged attacks deal only the level die",
                },
            ]
        },
        {
            "name": "Gun hag",
            "description": "An elderly person, thoroughly corrupted by volt magic, with guns protruding from mouth, eyes, fingers, and knees",
            "stats":{
                "str": 14,
                "dex": 5,
                "wil": 16,
                "en": 142,
                "av": 2,
            },
            "weaknesses":[
                "light",
                "smash",
                "pain",
                "stab",
            ],
            "attacks":[
                {
                    "name":"Mouth Shotgun",
                    "damage": "3-3-3",
                    "damage types": [
                        "gun",
                        "blast",
                    ]
                },
                {
                    "name":"Eye Barrels",
                    "damage": "3-3-3",
                    "damage types": [
                        "gun",
                        "burst",
                    ]
                },
                {
                    "name":"Finger Teslas (melee)",
                    "damage": "5-1-3",
                    "damage types": [
                        "volt",
                        "pain",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Lightning Strike",
                    "effect": "Roll 1d4, usable on 4. At the end of the round, a lightning strikes a tile. Combatants on that tile, and adjacent ones take dealing 3d6 volt, and blast damage on a failed DEX.",
                },
                {
                    "name": "Stasis",
                    "effect": "On failed WIL, target cannot move, or take action for the round",
                },
                {
                    "name": "Shield",
                    "effect": "Ranged attacks against the gun hag deal only the damage die",
                },
                {
                    "name": "Static field",
                    "effect": "Roll 1d4, usable on 3. A single tile becomes filled with static electricity. At the start of turn, or when entering, combatants inside take 2d4 volt damage",
                },
            ]
        },
        {
            "name": "Saurian",
            "description": "A giant lizard walking upright, and able to use tools with their hands. Aggressive and carnivorous.",
            "stats":{
                "str": 8,
                "dex": 10,
                "wil": 5,
                "en": 48,
                "av": 1,
            },
            "weaknesses":[
                "light",
                "smash",
                "pain",
                "stab",
            ],
            "attacks":[
                {
                    "name":"Spear",
                    "damage": "2-2-1",
                    "damage types": [
                        "stab",
                    ]
                },
                {
                    "name":"Spear Throw",
                    "damage": "2-2-1",
                    "damage types": [
                        "stab",
                    ]
                },
                {
                    "name":"Tail swipe",
                    "damage": "1-2-1",
                    "damage types": [
                        "smash",
                        "pain",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Constrict",
                    "effect": "An enemy in melee cannot move on a failed STR.",
                },
                {
                    "name": "Slither",
                    "effect": "Move twice when charging if at least one opponent retreats",
                },
                {
                    "name": "Venom spit",
                    "effect": "One ranged opponent, on a failed DEX they take 2d4 ooze damage",
                },
                {
                    "name": "Inner strength",
                    "effect": "Mitigate one weakness this round.",
                },
            ]
        },
        {
            "name": "Owltopus",
            "description": "A flying owl-squid hybrid. Has innate neural powers, but is not an aggressive creature unless cornered",
            "stats":{
                "str": 3,
                "dex": 16,
                "wil": 12,
                "en": 32,
                "av": 0,
            },
            "weaknesses":[
                "nuke",
                "gun",
                "burst",
                "volt",
            ],
            "attacks":[
                {
                    "name":"Beak",
                    "damage": "1-2-1",
                    "damage types": [
                        "cut",
                        "pain"
                    ]
                },
                {
                    "name":"Tentacles",
                    "damage": "1-2-1",
                    "damage types": [
                        "smash",
                        "pain"
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Attach",
                    "effect": "Attach to a melee enemy on failed DEX, moving with them. Beak, and tentacle attacks have advantage, and enemy can only melee attack the owltopus.",
                },
                {
                    "name": "Hoot",
                    "effect": "On successful WIL, deal 2d4 neural damage to an enemy",
                },
                {
                    "name": "Hooooooooot",
                    "effect": "All enemies, on a failed WIL, lose their action, and move back on the first turn",
                },
                {
                    "name": "Fly",
                    "effect": "Move two tiles, ignoring enemies.",
                },
            ]
        },
        {
            "name": "Roller Thug",
            "description": "A thug on rollerblades. Extremely skilled, and able to skate on most surfaces.",
            "stats":{
                "str": 7,
                "dex": 12,
                "wil": 5,
                "en": 50,
                "av": 1,
            },
            "weaknesses":[
                "stab",
                "smash",
                "gun",
                "burst",
                "blast",
                "ooze",
            ],
            "attacks":[
                {
                    "name":"Baseball bat",
                    "damage": "1-3-1",
                    "damage types": [
                        "smash",
                    ]
                },
                {
                    "name":"Wrist cannon",
                    "damage": "1-2-1",
                    "damage types": [
                        "smash",
                    ]
                },
            ],
            "actions":[
                {
                    "name": "Trick blades",
                    "effect": "On successful DEX, move twice each round when charging or retreating. when arriving at target, deal 1d8 extra melee damage. On fail, no move, or attack first turn.",
                },
                {
                    "name": "Superior dash",
                    "effect": "Move two tiles",
                },
            ]
        },
    ]
}