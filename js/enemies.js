function getEnemies() {
  return [
    {
      name: "straker",
      description: "A creature close to the neural magic. Strakers are sadistic, silent, and prays on wanderers of the metro.",
      stats: {
        str: 5,
        dex: 9,
        wil: 14,
        en: 90,
        av: 0,
      },
      weaknesses: ["light", "cut", "pain", "nuke"],
      attacks: [
        {
          name: "smack",
          damage: "2-2-2",
          damageTypes: ["smash"],
        },
        {
          name: "surge",
          damage: "3-3-2",
          damageTypes: ["neural", "pain"],
        },
      ],
      actions: [
        {
          name: "psychic vortex",
          effect:
            "Creates a phychic vortex on a tile. Passing through, or ending a turn inside the vortex deals 2d4 neural damage. When damaged, on failed WIL, immediately stops, and cannot exit the vortex until spending a TA to exit. Recharges on a 4",
        },
        {
          name: "drain power",
          effect: "Target an enemy in melee, if they fail WIL, they lose all their spell charges. Restores 1d4 endurance per spell charge drained.",
        },
        {
          name: "Teleportation",
          effect: "Move to any tile. On a failed WIL, cannot teleport again.",
        },
        {
          name: "screech",
          effect: "All enemies. On failed WIL, they may not charge, and the straker may remove a dice from any attack they make.",
        },
      ],
    },
    {
      name: "moledog",
      description: "A blind, subterranean dog which has strong claws for digging, a great sense of smell, and whiskers to navigate.",
      stats: {
        str: 8,
        dex: 8,
        wil: 4,
        en: 40,
        av: 0,
      },
      weaknesses: ["light", "smash", "stab", "nuke"],
      attacks: [
        {
          name: "bite",
          damage: "2-1-1",
          "damage types": ["pain", "stab"],
        },
        {
          name: "swipe",
          damage: "3-1-1",
          "damage types": ["cut"],
        },
      ],
      actions: [
        {
          name: "blindsight",
          effect:
            "The moledog uses its heightened secondary senses to anticipate, and evade danger. It cannot attack, but ranged attacks deal one less dice of the dogs choosing",
        },
        {
          name: "burrow",
          effect: "If on soft soil, the moledog burrows into the ground, and escpaes from combat",
        },
        {
          name: "on the hunt",
          effect: "Mole dogs move twice as fast when charging if an enemy is retreating",
        },
      ],
    },
    {
      name: "Demon spider",
      description: "An elusive menace, able to phase in and out of existance at will.",
      stats: {
        str: 4,
        dex: 14,
        wil: 9,
        en: 42,
        av: 1,
      },
      weaknesses: ["smash", "blast", "pain", "light"],
      attacks: [
        {
          name: "Bite",
          damage: "2-2-1",
          "damage types": ["pain", "nuke"],
        },
        {
          name: "Stinger",
          damage: "1-1-1",
          "damage types": ["nuke"],
        },
      ],
      actions: [
        {
          name: "Spit",
          effect: "Allows melee attack to be ranged if stationary.",
        },
        {
          name: "Rappel",
          effect: "Allows moving anywhere on the battleground at the end of round, at the expense of no actions or movement",
        },
        {
          name: "Phase shift",
          effect: "When hit by Nuke, Ooze, Volt, Burst, or Gun, the spider phases out of existence, and is unharmed",
        },
        {
          name: "Poison gland",
          effect: "If the stinger deals damage, on failed STR victim becomes poisoned",
        },
      ],
    },
    {
      name: "Ooze Zombie",
      description: "A human being infested by ooze.",
      stats: {
        str: 7,
        dex: 3,
        wil: 99,
        en: 30,
        av: 0,
      },
      weaknesses: ["cut", "pain", "smash", "blast", "light", "nuke"],
      attacks: [
        {
          name: "Bite",
          damage: "2-1-1",
          "damage types": ["pain", "ooze"],
        },
        {
          name: "Punch",
          damage: "1-1-1",
          "damage types": ["smash"],
        },
      ],
      actions: [
        {
          name: "Ooze infection",
          effect: "Bites which deal damage, on failed STR cause sickness.",
        },
        {
          name: "Rush",
          effect: "Charge movement is doubled, cannot take action",
        },
      ],
    },
    {
      name: "City bear",
      description: "A mutated, intelligent bear. Only hunts for human if they must.",
      stats: {
        str: 12,
        dex: 7,
        wil: 5,
        en: 60,
        av: 1,
      },
      weaknesses: ["stab", "gun", "burst", "ooze", "volt"],
      attacks: [
        {
          name: "Bite",
          damage: "3-2-1",
          "damage types": ["pain", "cut"],
        },
        {
          name: "Swipe",
          damage: "2-2-1",
          "damage types": ["pain", "smash"],
        },
        {
          name: "Bear Arbalest",
          damage: "3-2-1",
          "damage types": ["stab"],
        },
      ],
      actions: [
        {
          name: "Roar",
          effect: "On a failed WIL enemies lose their movement and action in the first turn.",
        },
        {
          name: "Bear charge",
          effect: "All bears on the same tile charge, moving twice the first turn",
        },
        {
          name: "Sharpen claws",
          effect: "Swipe deals 1d6 extra damage, but bear cannot move",
        },
      ],
    },
    {
      name: "Evil Hornet",
      description: "A giant evil flying insect. Evil hornets are still just hornets, but huge.",
      stats: {
        str: 4,
        dex: 16,
        wil: 5,
        en: 34,
        av: 0,
      },
      weaknesses: ["smash", "blast", "light"],
      attacks: [
        {
          name: "Sting",
          damage: "3-1-1",
          "damage types": ["pain", "nuke"],
        },
        {
          name: "Bite",
          damage: "2-2-1",
          "damage types": ["pain"],
        },
      ],
      actions: [
        {
          name: "Flight",
          effect: "Hornet moves anywhere on the map at the end of the round, but must stand ground during",
        },
        {
          name: "Ready poison",
          effect: "Sting attacks deal 1d4 extra damage",
        },
        {
          name: "Evasive",
          effect: "Ranged attacks deal only the level die",
        },
      ],
    },
    {
      name: "Gun hag",
      description: "An elderly person, thoroughly corrupted by volt magic, with guns protruding from mouth, eyes, fingers, and knees",
      stats: {
        str: 14,
        dex: 5,
        wil: 16,
        en: 142,
        av: 2,
      },
      weaknesses: ["light", "smash", "pain", "stab"],
      attacks: [
        {
          name: "Mouth Shotgun",
          damage: "3-3-3",
          "damage types": ["gun", "blast"],
        },
        {
          name: "Eye Barrels",
          damage: "3-3-3",
          "damage types": ["gun", "burst"],
        },
        {
          name: "Finger Teslas (melee)",
          damage: "5-1-3",
          "damage types": ["volt", "pain"],
        },
      ],
      actions: [
        {
          name: "Lightning Strike",
          effect:
            "Roll 1d4, usable on 4. At the end of the round, a lightning strikes a tile. Combatants on that tile, and adjacent ones take dealing 3d6 volt, and blast damage on a failed DEX.",
        },
        {
          name: "Stasis",
          effect: "On failed WIL, target cannot move, or take action for the round",
        },
        {
          name: "Shield",
          effect: "Ranged attacks against the gun hag deal only the damage die",
        },
        {
          name: "Static field",
          effect:
            "Roll 1d4, usable on 3. A single tile becomes filled with static electricity. At the start of turn, or when entering, combatants inside take 2d4 volt damage",
        },
      ],
    },
    {
      name: "Saurian",
      description: "A giant lizard walking upright, and able to use tools with their hands. Aggressive and carnivorous.",
      stats: {
        str: 8,
        dex: 10,
        wil: 5,
        en: 48,
        av: 1,
      },
      weaknesses: ["light", "smash", "pain", "stab"],
      attacks: [
        {
          name: "Spear",
          damage: "2-2-1",
          "damage types": ["stab"],
        },
        {
          name: "Spear Throw",
          damage: "2-2-1",
          "damage types": ["stab"],
        },
        {
          name: "Tail swipe",
          damage: "1-2-1",
          "damage types": ["smash", "pain"],
        },
      ],
      actions: [
        {
          name: "Constrict",
          effect: "An enemy in melee cannot move on a failed STR.",
        },
        {
          name: "Slither",
          effect: "Move twice when charging if at least one opponent retreats",
        },
        {
          name: "Venom spit",
          effect: "One ranged opponent, on a failed DEX they take 2d4 ooze damage",
        },
        {
          name: "Inner strength",
          effect: "Mitigate one weakness this round.",
        },
      ],
    },
    {
      name: "Owltopus",
      description: "A flying owl-squid hybrid. Has innate neural powers, but is not an aggressive creature unless cornered",
      stats: {
        str: 3,
        dex: 16,
        wil: 12,
        en: 32,
        av: 0,
      },
      weaknesses: ["nuke", "gun", "burst", "volt"],
      attacks: [
        {
          name: "Beak",
          damage: "1-2-1",
          "damage types": ["cut", "pain"],
        },
        {
          name: "Tentacles",
          damage: "1-2-1",
          "damage types": ["smash", "pain"],
        },
      ],
      actions: [
        {
          name: "Attach",
          effect:
            "Attach to a melee enemy on failed DEX, moving with them. Beak, and tentacle attacks have advantage, and enemy can only melee attack the owltopus.",
        },
        {
          name: "Hoot",
          effect: "On successful WIL, deal 2d4 neural damage to an enemy, and they lose their next Tactical action",
        },
        {
          name: "Hooooooooot",
          effect: "All enemies, on a failed WIL, lose their action, and move back on the first turn",
        },
        {
          name: "Fly",
          effect: "Move two tiles, ignoring enemies.",
        },
      ],
    },
    {
      name: "Roller Thug",
      description: "A thug on rollerblades. Extremely skilled, and able to skate on most surfaces.",
      stats: {
        str: 7,
        dex: 12,
        wil: 5,
        en: 50,
        av: 1,
      },
      weaknesses: ["stab", "smash", "gun", "burst", "blast", "ooze"],
      attacks: [
        {
          name: "Baseball bat",
          damage: "1-3-1",
          "damage types": ["smash"],
        },
        {
          name: "Wrist cannon",
          damage: "1-2-1",
          "damage types": ["smash"],
        },
      ],
      actions: [
        {
          name: "Trick blades",
          effect:
            "On successful DEX, move twice each round when charging or retreating. when arriving at target, deal 1d8 extra melee damage. On fail, no move, or attack first turn.",
        },
        {
          name: "Superior dash",
          effect: "Move two tiles",
        },
      ],
    },
    {
      name: "Thug",
      description: "A thug. Uses advanced tactics, prone to kidnapping.",
      stats: {
        str: 5,
        dex: 5,
        wil: 5,
        en: 45,
        av: 0,
      },
      weaknesses: ["pain", "smash", "gun", "burst", "blast", "nuke"],
      attacks: [
        {
          name: "Makeshift pistol",
          damage: "3-1-1",
          "damage types": ["gun"],
        },
        {
          name: "Cutter ",
          damage: "3-1-1",
          "damage types": ["cut", "pain"],
        },
      ],
      actions: [
        {
          name: "Cower",
          effect: "The combatant cannot move or attack, but suffers only the level die from ranged damage",
        },
        {
          name: "Relentless",
          effect: "This round, an attack of the combatants choice gets advantage, prior to rolling",
        },
      ],
    },
    {
      name: "Coeurl",
      description: "A giant mutated cat with long, radioactive tentacles instead of whiskers.",
      image: "coeurl.png",
      stats: {
        str: 10,
        dex: 15,
        wil: 4,
        en: 120,
        av: 1,
      },
      weaknesses: ["stab", "cut", "blast", "volt", "neural"],
      attacks: [
        {
          name: "Shred",
          damage: "3-3-3",
          "damage types": ["cut", "pain"],
        },
        {
          name: "Tentacle Clap",
          damage: "3-3-3",
          "damage types": ["nuke", "light"],
        },
      ],
      actions: [
        {
          name: "Pounce",
          effect: "Move into melee with any enemy between 2 or 3 tiles away. On failed STR, enemy takes 1d10 pain damage and suffer knockback",
        },
        {
          name: "on the hunt",
          effect: "Coeurl move twice as fast when charging if an enemy is retreating",
        },
        {
          name: "Flash",
          effect: "Coeurk move twice as fast when charging if an enemy is retreating",
        },
      ],
    },
    {
      name: "Roidrat",
      description: "A mutated, angry rat, with an overdeveloped muscular structure.",
      image: "rat2.png",
      stats: {
        str: 7,
        dex: 10,
        wil: 2,
        en: 30,
        av: 0,
      },
      weaknesses: ["cut", "gun", "burst", "blast", "volt"],
      attacks: [
        {
          name: "Smash",
          damage: "2-1-1",
          "damage types": ["smash"],
        },
        {
          name: "Bite",
          damage: "2-1-1",
          "damage types": ["pain"],
        },
      ],
      actions: [
        {
          name: "Hulk jump",
          effect: "Move into melee with any enemy between 2 or 3 tiles away. On failed STR, enemy takes 1d4 smash damage and suffer knockback",
        },
        {
          name: "Frenzy",
          effect: "When using the stand ground movement, gain 1d6 extra melee damage. Recharges on a 4.",
        },
      ],
    },
    {
      name: "Zone eel",
      description: "Zone eels are large, omnivorous beasts of the zone. They are commonly domesticated as mounts.",
      image: "eel.png",
      stats: {
        str: 10,
        dex: 12,
        wil: 5,
        en: 80,
        av: 0,
      },
      weaknesses: ["gun", "burst", "volt", "light"],
      attacks: [
        {
          name: "Bite",
          damage: "3-2-2",
          "damage types": ["pain"],
        },
      ],
      actions: [
        {
          name: "Constrict",
          effect:
            "On successful STR, constrict the enemy, who can escape with successful STR as a TA. Constricted cannot move, and eel can only melee attack constricted, with advantage.",
        },
        {
          name: "Slither",
          effect: "Move twice.",
        },
        {
          name: "Mount",
          effect:
            "If mounted, the zone eel cannot take TA. When mounted, both rider and mount take damage to endurance. Unless mounted, the eel will act on instinct.",
        },
      ],
    },
    {
      name: "Agolvuz",
      description: "A giant mutated fly, carnivorous and vile, creeps up on you in guile, and dispatches you with style.",
      image: "agolvuz.png",
      stats: {
        str: 8,
        dex: 12,
        wil: 4,
        en: 122,
        av: 0,
      },
      weaknesses: ["gun", "burst", "cut", "blast", "light"],
      attacks: [
        {
          name: "Bite",
          damage: "3-3-2",
          "damage types": ["pain", "ooze"],
        },
        {
          name: "Tendrils",
          damage: "1-2-2",
          "damage types": ["pain", "stab", "cut"],
        },
      ],
      actions: [
        {
          name: "Aggressive Flight",
          effect: "Triple movement when charging, takes 1d8 more ranged damage if moving.",
        },
        {
          name: "Tendril flurry",
          effect:
            "Target a melee enemy, and attack twice per turn with tendrils. Cannot set movement plan, but follows the target to always stay in melee range. Recharges on 4.",
        },
        {
          name: "Glare",
          effect: "On failed WIL, combatant is forced to retreat, and loses their skill die",
        },
        {
          name: "Hardened regeneration",
          effect: "Gain 2 armor, regenerate 1d10 endurance per turn. Usable once.",
        },
      ],
    },
    {
      name: "Lapagerien",
      description: "A mutated and sentient Lapageria rose bush. Has a vile, meaty, rotting inside and sludges forward like a snail on this ooze.",
      image: "lapagerien.png",
      stats: {
        str: 9,
        dex: 2,
        wil: 4,
        en: 74,
        av: 0,
      },
      weaknesses: ["cut", "nuke", "light"],
      attacks: [
        {
          name: "Shoot Thorn",
          damage: "2-2-1",
          "damage types": ["gun", "stab", "ooze"],
        },
        {
          name: "Slashing vines",
          damage: "2-2-1",
          "damage types": ["pain", "cut", "ooze"],
        },
      ],
      actions: [
        {
          name: "Vine pull",
          effect: "Target an enemy at range. On a failed DEX, that enemy is pull two tiles towards the Lapagerien",
        },
        {
          name: "Radioactive Slime",
          effect:
            "Any tile the Lapagerien starts its turn on is covered by slime. Any combatant susceptile to nuke damage, take 1d6 nuke damage when starting their turn on the slime.",
        },
      ],
    },
    {
      name: "Albino Boarian",
      description:
        "A giant mutated albino boar. They are hornless, but have retractable bone spears on their front legs, which they also use as hands. They are omnivores",
      image: "boarians.jpg",
      stats: {
        str: 16,
        dex: 6,
        wil: 4,
        en: 74,
        av: 2,
      },
      weaknesses: ["cut", "light"],
      attacks: [
        {
          name: "Bone spear",
          damage: "3-2-2",
          "damage types": ["pain", "stab", "smash"],
        },
        {
          name: "Headbutt",
          damage: "2-2-2",
          "damage types": ["smash"],
        },
      ],
      actions: [
        {
          name: "Trample",
          effect:
            "Can only be used if not in melee. Cannot take action. Increases charge speed to two tiles and allows the boarian to trample enemies the run over. Trampled enemies take 6d6 smash damage.",
        },
      ],
    },
    {
      name: "Sluggan",
      description:
        "Snail people, 1.2m in height, weigh around 100kg, 125 with their shells. Has four tendrils it uses as arms. They communicate telepathically at short range.",
      image: "sluggan.png",
      stats: {
        str: 6,
        dex: 5,
        wil: 12,
        en: 38,
        av: 2,
      },
      weaknesses: ["smash", "salt*", "nuke", "light"],
      attacks: [
        {
          name: "Spear",
          damage: "2-2-1",
          "damage types": ["stab"],
        },
        {
          name: "Tendril slap",
          damage: "1-2-1",
          "damage types": ["smash", "neural"],
        },
        {
          name: "Zap",
          damage: "2-2-1",
          "damage types": ["volt", "neural"],
        },
      ],
      actions: [
        {
          name: "Vicious slappery",
          effect: "Their first melee attack, all enemies in melee make a DEX save except the original target. On fail they also take the damage.",
        },
        {
          name: "Roll shape",
          effect: "When charging or retreating, move twice per turn. Cannot take action.",
        },
        {
          name: "Mental surge",
          effect: "On failed WIL, enemy cannot assist or do ranged attack.",
        },
      ],
    },
    {
      name: "Squid",
      description:
        "Squid are large amphibious apex predators, hunting alone along coastlines and mixed-water river deltas. It has elastic tentacles which stretch unnaturally.",
      image: "amphisquid.png",
      stats: {
        str: 20,
        dex: 8,
        wil: 2,
        en: 182,
        av: 1,
      },
      weaknesses: ["cut", "volt", "nuke", "light"],
      attacks: [
        {
          name: "Slap",
          damage: "3-3-3",
          "damage types": ["smash, pain"],
        },
      ],
      actions: [
        {
          name: "Grapple",
          effect:
            "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
        },
        {
          name: "Devour",
          effect:
            "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
        },
        {
          name: "Harden",
          effect: "Gain 1 armor, and mitigate 1 weakness.",
        },
        {
          name: "Massive slappery",
          effect: "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
        },
      ],
    },
    {
      name: "Great angler",
      description:
        "Great anglers are horrible monsters, mutated anglerfish which dwell in moist, semisubmerged caverns or pits. The enjoy human flesh, and eats any who stumbles into its lair.",
      image: "angler.png",
      stats: {
        str: 20,
        dex: 8,
        wil: 2,
        en: 182,
        av: 1,
      },
      weaknesses: ["cut", "volt", "nuke", "light"],
      attacks: [
        {
          name: "Slap",
          damage: "3-3-3",
          "damage types": ["smash, pain"],
        },
      ],
      actions: [
        {
          name: "Grapple",
          effect:
            "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
        },
        {
          name: "Devour",
          effect:
            "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
        },
        {
          name: "Harden",
          effect: "Gain 1 armor, and mitigate 1 weakness.",
        },
        {
          name: "Massive slappery",
          effect: "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
        },
      ],
    },
    {
      name: "Angoliant",
      description:
        "Giant, amphibious angler fish, mutated in a manner which allows them to speak, and granting them a higher level of intelligence than most other creatures. Angoliants are considered evil by civilized folk. They enjoy human flesh, but also to toy with their prey.",
      image: "angolian.png",
      stats: {
        str: 20,
        dex: 8,
        wil: 2,
        en: 182,
        av: 1,
      },
      weaknesses: ["cut", "volt", "nuke", "light"],
      attacks: [
        {
          name: "Slap",
          damage: "3-3-3",
          "damage types": ["smash, pain"],
        },
      ],
      actions: [
        {
          name: "Grapple",
          effect:
            "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
        },
        {
          name: "Devour",
          effect:
            "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
        },
        {
          name: "Harden",
          effect: "Gain 1 armor, and mitigate 1 weakness.",
        },
        {
          name: "Massive slappery",
          effect: "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
        },
      ],
    },
    {
      name: "Massive Landwhale",
      description:
        "Landwhales exist on a different foodchain, as they are monolithic creatures. Landwhales have an unnatural fear of humans, and if startled may trample or destroy huge swathes of land.",
      image: "landwhale.png",
      stats: {
        str: 20,
        dex: 8,
        wil: 2,
        en: 182,
        av: 1,
      },
      weaknesses: ["cut", "volt", "nuke", "light"],
      attacks: [
        {
          name: "Slap",
          damage: "3-3-3",
          "damage types": ["smash, pain"],
        },
      ],
      actions: [
        {
          name: "Grapple",
          effect:
            "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
        },
        {
          name: "Devour",
          effect:
            "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
        },
        {
          name: "Harden",
          effect: "Gain 1 armor, and mitigate 1 weakness.",
        },
        {
          name: "Massive slappery",
          effect: "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
        },
      ],
    },
    {
      name: "Sky Centipede",
      description:
        "Giant flying centipedes which live up high seemingly defying gravity. The live sky centipede never lands, but crashes only as it dies. A dead sky centipede turns hollow quick as its meat rots swiftly, but its shell hardens immensely.",
      image: "skycentipede.png",
      stats: {
        str: 20,
        dex: 8,
        wil: 2,
        en: 182,
        av: 1,
      },
      weaknesses: ["cut", "volt", "nuke", "light"],
      attacks: [
        {
          name: "Slap",
          damage: "3-3-3",
          "damage types": ["smash, pain"],
        },
      ],
      actions: [
        {
          name: "Grapple",
          effect:
            "The squid can grapple an opponent at range. Each turn while grappled, the victim is pulled towards the squid, and cannot take tactical action. At the start of each round, on successful DEX, the victim slithers loose. If the squid takes critical damage, its grip loosens, and the victim escapes. The squid can only grapple one opponent. Recharges on 4",
        },
        {
          name: "Devour",
          effect:
            "The squid consumes one melee opponent which is also grappled. The devoured victim becomes unconscious, and takes 2d4 ooze damage each turn. The squid regurgitates the devoured victim if it takes critical damage.",
        },
        {
          name: "Harden",
          effect: "Gain 1 armor, and mitigate 1 weakness.",
        },
        {
          name: "Massive slappery",
          effect: "When using slap, enemies on the same tile as the target, and the target, suffer knockback on a failed STR.",
        },
      ],
    },
  ];
}
