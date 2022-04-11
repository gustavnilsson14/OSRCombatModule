
function getBattleFeatures(){
    return {
        any:[
            {
                "Name":"Toxic mist",
                "Effects":new GetAllArray([
                    "5 Tiles In center",
                    "Starting turn in the mist suffer damage and effect",
                    "Catch breath while inside means suffering double damage",
                    "Damage is 2d6 nuke damage, burning the skin",
                    "Effect is on failed STR, no action is made"
                ]),
            },
            {
                "Name":"Static cloud",
                "Effects":new GetAllArray([
                    "5 Tiles In center",
                    "Starting turn in the cloud suffer damage and effect",
                    "Damage is 2d6 volt damage",
                    "Effect is if damage is 7, suffer 1 durability damage"
                ]),
            },
            {
                "Name":"Fog",
                "Effects":new GetAllArray([
                    "5 Tiles In center",
                "Ranged damage passing the fog deals no damage dice",
                ]),
            },
            {
                "Name":"Mutagen spores",
                "Effects":new GetAllArray([
                    "5 Tiles In center",
                "Starting turn in the mist suffer damage and effect",
                "Catch breath while inside means automatic mutation and tumor",
                "Damage is 2d6 ooze damage",
                "Effect is if damage is 7, failed STR means mutation"
                ]),
            },
            {
                "Name":"Grapevine",
                "Effects":new GetAllArray([
                    "5 Tiles In center",
                "If charging through the grapes, suffer damage",
                "Damage is 2d6 blast, and pain damage as grapes explode in volatile juice"
                ]),
            },
            {
                "Name":"Pink asphalt",
                "Effects":new GetAllArray([
                     "5 Tiles In center",
                "Starting turn on the asphalt suffer damage",
                "Damage is 2d6 light"
                ]),
            },
            {
                "Name":"Stinkmud",
                "Effects":new GetAllArray([
                    "5 Tiles In center",
                "Standing ground in the stinkmud suffers effect",
                "Effect is sinking into the mud, losing the level damage die",
                "Use TA to surface"
                ]),
            },
            {
                "Name":"Lay line",
                "Effects":new GetAllArray([
                    "Get 1 free charge to put on a spell per round started here ",
                "When using cast spell on a lay line, get 2 charges instead of 1",
                ]),
            },
        ],
        wilderness:[
            
            {
                "Name":"Chasm with rickety bridge",
                "Effects":new GetAllArray([
                    "3 Tiles",
                    "Cut and light destroys the bridge",
                    "Falling ejects from combat, and suffer injury",
                ]),
            },
            {
                "Name":"Pit",
                "Effects":new GetAllArray([
                    "A fall deals 3d6 smash damage",
                    "Getting out requires tactical action",
                ]),
            },
            {
                "Name":"Brush",
                "Effects":new GetAllArray([
                    "Hide tactical action is automatic if using stand ground",
                ]),
            },
            {
                "Name":"Rain",
                "Effects":new GetAllArray([
                    "Global",
                    "Light deals no damage",
                    "No fire is possible"
                ]),
            },
            {
                "Name":"Brook",
                "Effects":new GetAllArray([
                    "2 Tiles",
                    "Stops charging or retreating"
                ]),
            },
            {
                "Name":"Mire",
                "Effects":new GetAllArray([
                     "3 Tiles",
                    "Stops charging or retreating",
                    "Requires tactical action to move if round is started in mire"
                ]),
            },
            {
                "Name":"Slippery mud",
                "Effects":new GetAllArray([
                    "2 Tiles",
                    "Charging or retreating must succeed with DEX, or to fall, and not be able to move until next round"
                ]),
            },
            {
                "Name":"Lay line",
                "Effects":new GetAllArray([
                    "Get 1 free charge to put on a spell per round started here ",
                    "When using cast spell on a lay line, get 2 charges instead of 1",
                ]),
            },
            {
                "Name":"Hunting tower",
                "Effects":new GetAllArray([
                     "Tactical action to enter",
                    "Outgoing ranged damage deals an extra 1d6 damage",
                    "Incoming ranged damage no skill die",
                    "Ejected from melee unless enemy enters"
                ]),
            },
            {
                "Name":"Cliff cover",
                "Effects":new GetAllArray([
                    "If stand ground, gain 2 armor versus ranged damage",
                ]),
            },
            {
                "Name":"Poisonous plants",
                "Effects":new GetAllArray([
                    "Once per turn, if on the same tile, take 1d8 ooze damage",
                ]),
            },
            {
                "Name":"Small shanty",
                "Effects":new GetAllArray([
                    "2 Tiles",
                    "Garrisson with TA",
                    "No ranged skill die"
                ]),
            },
            {
                "Name":"Mantis hive",
                "Effects":new GetAllArray([
                    "Rouse with TA if weapon allows",
                    "3 Tiles when roused",
                    "Deals 1d8 ooze damage at start of each turn to combatans in the tiles"
                ]),
            },
            {
                "Name":"Stampede",
                "Effects":new GetAllArray([
                    "Start of each round, roll 1d10 to select a tile from center",
                    "Combatants on that tile must use TA, or suffer 2d12 smash damage",
                    "Ladybugs, Tumbleweeds, Centipedes"
                ]),
            },

        ],
        ruins:[
            {
                "Name":"Fire barrel",
                "Effects":new GetAllArray([
                    "Can be toppled in melee",
                "When toppled, causes a fire the same, or an adjacent tile"
                ]),
            },
            {
                "Name":"Explosive barrel",
                "Effects":new GetAllArray([
                    "Can be rolled with a TA in melee",
                "Rolls 1 tile per turn when rolling",
                "Can be detonated with a TA if weapon allows using smash, burst, light, volt, or nuke",
                "Deals 2d10 blast damage to own tile, and adjacent"
                ]),
            },
            {
                "Name":"Mutagenic healing ooze pool",
                "Effects":new GetAllArray([
                    "With a TA on the same tile, or if knocked into it, restore 1d8 each turn for this and next round",
                "If healed, on failed STR get random mutation"
                ]),
            },
            {
                "Name":"Toxic barrel",
                "Effects":new GetAllArray([
                    "Can be rolled with a TA in melee",
                "Rolls 1 tile per turn when rolling",
                "Can be detonated with a TA if weapon allows using smash, burst, light, volt, or nuke",
                "Deals 2d10 blast and nuke damage to own tile, and adjacent"
                ]),
            },
            {
                "Name":"Silverfish nest",
                "Effects":new GetAllArray([
                    "Can be roused with a TA if weapon range allows",
                "When roused, hive is destroyed, and silverfish attaches to closest combatant in 5 tiles",
                "Each round, take 1d8 pain damage when attached",
                "If wounded, silverfish enters the wound, causing unconscious and an injury",
                "If not healed quickly after combat, with something that kills the fish, they kill their host"
                ]),
            },
            {
                "Name":"Construction crane",
                "Effects":new GetAllArray([
                     "Can be garrissoned with a TA",
                "When garrissoned, can use TA to pick up, or damage combatants within 7 Tiles",
                "Damage is 3d10 pain, or smash if dropped",
                "Escape is successful DEX on TA, but also if grabbed"
                ]),
            }
        ],
        cave:[
            {
                "Name":"Bottomless Chasm",
                "Effects":new GetAllArray([
                   "3 Tiles",
                    "Can be jumped on successful DEX, will fall on fail",
                    "Falling ejects from combat, and suffer 1d4 injuries",
                ]),
            },
            {
                "Name":"Giant pushable boulder",
                "Effects":new GetAllArray([
                    "Can be pushed, it starts rolling 2 tiles per turn",
                    "If rolled over, a combatant suffers 2d10 smash damage, and 1d4 durability"
                ]),
            },
            {
                "Name":"Thorny mushroom patch",
                "Effects":new GetAllArray([
                    "If pushed into, suffer damage",
                    "If walked over or on, successful DEX or suffer damage",
                    "Damage is 1d8 pain, and stab",
                    "On damage, failed STR suffers poisoned"
                ]),
            },
            {
                "Name":"Rocky rubble",
                "Effects":new GetAllArray([
                    "3 Tiles",
                    "If charging, or retreating, failed STR will stop movement",
                ]),
            },
            {
                "Name":"Murky water pool with Bitlies",
                "Effects":new GetAllArray([
                    "5 Tiles",
                    "Suffering knockback will cause combatant to fall in",
                    "If charging, or retreating, failed DEX will fall in",
                    "TA to get out, can get out on own tile, or adjacent",
                    "When falling in, suffer bitlies damage, and forfeit rest of round",
                    "When falling in, ejected from melee, and takes no damage die from ranged",
                    "Damage is 2d10 pain"
                ]),
            },
            {
                "Name":"Cave in",
                "Effects":new GetAllArray([
                     "Loose rocks by the side, 3 Tiles",
                    "Any blast or nuke damage on these tiles, or a TA with adequate weapon causes cave in",
                    "Cave in causes damage, and turn the 3 tiles into rocky rubble",
                    "Damage is 3d10 smash, and 1d4 durability"
                ]),
            }
        ],
        interior:[
            {
                "Name":"Chandelier",
                "Effects":new GetAllArray([
                    "Can be swung from, on a TA and successful DEX. On fail, lose first turn",
                    "If swung from, move two tiles, even over enemies.",
                    "Can be shot, or cut down in melee, with a TA and successful DEX",
                    "If falling, deals 3d6 smashing damage to those below"
                ]),
            },
            {
                "Name":"Ceiling fan",
                "Effects":new GetAllArray([
                    "Can be shot, or cut down in melee, with a TA and successful DEX",
                    "If falling, deals 3d6 cutting, smashing damage to those below"
                ]),
            },
            {
                "Name":"Door control panel",
                "Effects":new GetAllArray([
                    "Closes a door "
                ]),
            },
            {
                "Name":"Exposed electrical wire",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Ventilation duct",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Furniture",
                "Effects":new GetAllArray([]),
            },
        ],
        settlement:[
            {
                "Name":"Forklift",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Harpoon cannon",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Defensive tower",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Defensive tower with mounted gun",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Waist high wall",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Roachdog stand",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Outhouse",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Well",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Manhole",
                "Effects":new GetAllArray([]),
            },
        ],
        metro:[
            {
                "Name":"Nook cover",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Manhole from above",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Manhole leading down",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Service door",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Sinkhole under the tracks",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Manhole",
                "Effects":new GetAllArray([]),
            },
        ],
        zone:[
            {
                "Name":"Toxic pool",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Nuke mire",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Tentacular brush",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Freeze vent",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Mutagenic adrenaline pool",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Glowing rocks",
                "Effects":new GetAllArray([]),
            },
            {
                "Name":"Quickmud",
                "Effects":new GetAllArray([]),
            },
        ],
    };
}