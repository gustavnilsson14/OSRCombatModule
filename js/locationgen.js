document.onreadystatechange = function () {
    if (document.readyState != "complete") return;
    document.querySelectorAll('generator').forEach(generator => {
        generator.querySelectorAll('controls').forEach(controls => {
            var generatorFunction = eval(generator.getAttribute('function'));
            var resultsContainer = generator.querySelector('results');
            controls.querySelector('button').addEventListener('click', () => {
                resultsContainer.innerHTML = '';
                var amountInput = controls.querySelector('.amount');
                var amount = parseInt(amountInput.value) > 0 ? parseInt(amountInput.value) : 1;
                var data = {};
                controls.querySelectorAll('input:not(.amount)').forEach(input => {
                    data[input.getAttribute('id')] = getInputVal(input);
                });
                for (let i = 0; i < amount; i++) {
                    setTimeout(function(){
                        generatorFunction(resultsContainer, data);
                    },100*i);
                }
            });
        });
    });
};
function getInputVal(input){
    if(input.getAttribute("type") == "checkbox") return input.checked;
    return input.value;
}

function createElement(type = "p", content = ""){
    const p = document.createElement(type);
    p.innerHTML = content;
    return p;
}
function generateLocation(container, data){
    var text = getNewLocation(getLocationObject());
    var newElement = createElement("p",text);
    container.appendChild(newElement);
}
function getNewLocation(dict){
    var originalTypes = Object.keys(dict.originalBuildings);
    var currentUsages = Object.keys(dict.currentUsage);
    
    var original = originalTypes[getRandomIndex(originalTypes)];
    var current = currentUsages[getRandomIndex(currentUsages)];
    
    var originalSpecificTypes = dict.originalBuildings[original];
    var currentSpecificTypes = dict.currentUsage[current];

    var originalSpecific = originalSpecificTypes[getRandomIndex(originalSpecificTypes)];
    var currentSpecific = currentSpecificTypes[getRandomIndex(currentSpecificTypes)];
    
    original = original[0] == "!" ? "" : ` ${original}`;

    return `The building was originally a ${originalSpecific}${original}.
    Since the fall, it is now ${current} ${currentSpecific}`;
}
function getRandomIndex(list){
    return getRandomNumber(0,list.length);
}
function getRandomNumber(min, max){
    return Math.floor((Math.random()*Math.floor(max-min)))+min;
}
function generateBattleFeature(container, data){
    var dict = getBattleFeatures();
    var result = {};
    Object.keys(dict).forEach(key => {
        if (!data[key]) return;
        if (result[key] == null) result[key] = {};
        var feature = Object.keys(dict[key])[getRandomIndex(Object.keys(dict[key]))];
        console.log(feature);
        result[key][feature] = dict[key][feature];
    });
    Object.keys(result).forEach(key => {
        console.log(result);
        var header = "Tile";
        var rules = [];
        Object.keys(result[key]).forEach(feature => {
            header =`${header} ${getRandomNumber(1,14)} ${key}: ${feature}`;
            rules = result[key][feature];
        });
        container.appendChild(createElement('p', header));
        var ul = createElement('ul');
        container.appendChild(ul);
        rules.forEach(rule => {
            ul.appendChild(createElement('li',rule));
        });
    });
}

function getBattleFeatures(){
    return {
        any:{
            "Toxic mist":[
                "5 Tiles In center",
                "Starting turn in the mist suffer damage and effect",
                "Catch breath while inside means suffering double damage",
                "Damage is 2d6 nuke damage, burning the skin",
                "Effect is on failed STR, no action is made"
            ],
            "Static cloud":[
                "5 Tiles In center",
                "Starting turn in the cloud suffer damage and effect",
                "Damage is 2d6 volt damage",
                "Effect is if damage is 7, suffer 1 durability damage"
            ],
            "Fog": [
                "5 Tiles In center",
                "Ranged damage passing the fog deals no damage dice",
            ],
            "Mutagen spores":[
                "5 Tiles In center",
                "Starting turn in the mist suffer damage and effect",
                "Catch breath while inside means automatic mutation and tumor",
                "Damage is 2d6 ooze damage",
                "Effect is if damage is 7, failed STR means mutation"
            ],
            "Grapevine":[
                "5 Tiles In center",
                "If charging through the grapes, suffer damage",
                "Damage is 2d6 blast, and pain damage as grapes explode in volatile juice"
            ],
            "Pink asphalt":[
                "5 Tiles In center",
                "Starting turn on the asphalt suffer damage",
                "Damage is 2d6 light"
            ],
            "Stinkmud":[
                "5 Tiles In center",
                "Standing ground in the stinkmud suffers effect",
                "Effect is sinking into the mud, losing the level damage die",
                "Use TA to surface"
            ],
            "Lay line": [
                "Get 1 free charge to put on a spell per round started here ",
                "When using cast spell on a lay line, get 2 charges instead of 1",
            ],
        },
        wilderness:{
            "Chasm with rickety bridge": [
                "3 Tiles",
                "Cut and light destroys the bridge",
                "Falling ejects from combat, and suffer injury",
            ],
            "Pit": [
                "A fall deals 3d6 smash damage",
                "Getting out requires tactical action",
            ],
            "Brush": [
                "Hide tactical action is automatic if using stand ground",
            ],
            "Rain": [
                "Global",
                "Light deals no damage",
                "No fire is possible"
            ],
            "Brook": [
                "2 Tiles",
                "Stops charging or retreating"
            ],
            "Mire": [
                "3 Tiles",
                "Stops charging or retreating",
                "Requires tactical action to move if round is started in mire"
            ],
            "Slippery mud": [
                "2 Tiles",
                "Charging or retreating must succeed with DEX, or to fall, and not be able to move until next round"
            ],
            "Hunting tower": [
                "Tactical action to enter",
                "Outgoing ranged damage deals an extra 1d6 damage",
                "Incoming ranged damage no skill die",
                "Ejected from melee unless enemy enters"
            ],
            "Cliff cover": [
                "If stand ground, gain 2 armor versus ranged damage",
            ],
            "Poisonous plants": [
                "Once per turn, if on the same tile, take 1d8 ooze damage",
            ],
            "Small shanty": [
                "2 Tiles",
                "Garrisson with TA",
                "No ranged skill die"
            ],
            "Mantis hive": [
                "Rouse with TA if weapon allows",
                "3 Tiles when roused",
                "Deals 1d8 ooze damage at start of each turn to combatans in the tiles"
            ],
            "Stampede": [
                "Start of each round, roll 1d10 to select a tile from center",
                "Combatants on that tile must use TA, or suffer 2d12 smash damage",
                "Ladybugs, Tumbleweeds, Centipedes"
            ],
        },
        ruins:{
            "Fire barrel":[
                "Can be toppled in melee",
                "When toppled, causes a fire the same, or an adjacent tile"
            ],
            "Explosive barrel":[
                "Can be rolled with a TA in melee",
                "Rolls 1 tile per turn when rolling",
                "Can be detonated with a TA if weapon allows using smash, burst, light, volt, or nuke",
                "Deals 2d10 blast damage to own tile, and adjacent"
            ],
            "Mutagenic healing ooze pool":[
                "With a TA on the same tile, or if knocked into it, restore 1d8 each turn for this and next round",
                "If healed, on failed STR get random mutation"
            ],
            "Toxic barrel":[
                "Can be rolled with a TA in melee",
                "Rolls 1 tile per turn when rolling",
                "Can be detonated with a TA if weapon allows using smash, burst, light, volt, or nuke",
                "Deals 2d10 blast and nuke damage to own tile, and adjacent"
            ],
            "Silverfish nest":[
                "Can be roused with a TA if weapon range allows",
                "When roused, hive is destroyed, and silverfish attaches to closest combatant in 5 tiles",
                "Each round, take 1d8 pain damage when attached",
                "If wounded, silverfish enters the wound, causing unconscious and an injury",
                "If not healed quickly after combat, with something that kills the fish, they kill their host"
            ],
            "Construction crane":[
                "Can be garrissoned with a TA",
                "When garrissoned, can use TA to pick up, or damage combatants within 7 Tiles",
                "Damage is 3d10 pain, or smash if dropped",
                "Escape is successful DEX on TA, but also if grabbed"
            ],
        },
        cave:{
            "Bottomless Chasm":[
                "3 Tiles",
                "Can be jumped on successful DEX, will fall on fail",
                "Falling ejects from combat, and suffer 1d4 injuries",
            ],
            "Giant pushable boulder":[
                "Can be pushed, it starts rolling 2 tiles per turn",
                "If rolled over, a combatant suffers 2d10 smash damage, and 1d4 durability"
            ],
            "Thorny mushroom patch":[
                "If pushed into, suffer damage",
                "If walked over or on, successful DEX or suffer damage",
                "Damage is 1d8 pain, and stab",
                "On damage, failed STR suffers poisoned"
            ],
            "Rocky rubble":[
                "3 Tiles",
                "If charging, or retreating, failed STR will stop movement",
            ],
            "Murky water pool with Bitlies":[
                "5 Tiles",
                "Suffering knockback will cause combatant to fall in",
                "If charging, or retreating, failed DEX will fall in",
                "TA to get out, can get out on own tile, or adjacent",
                "When falling in, suffer bitlies damage, and forfeit rest of round",
                "When falling in, ejected from melee, and takes no damage die from ranged",
                "Damage is 2d10 pain"
            ],
            "Cave in":[
                "Loose rocks by the side, 3 Tiles",
                "Any blast or nuke damage on these tiles, or a TA with adequate weapon causes cave in",
                "Cave in causes damage, and turn the 3 tiles into rocky rubble",
                "Damage is 3d10 smash, and 1d4 durability"
            ],
        },
        interior:{
            "Chandelier":[],
            "Ceiling fan":[],
            "Door control panel":[],
            "Exposed electrical wire":[],
            "Ventilation duct":[],
            "Furniture":[],
        },
        settlement:{
            "Forklift":[],
            "Harpoon cannon":[],
            "Defensive tower":[],
            "Defensive tower with mounted gun":[],
            "Waist high wall":[],
            "Roachdog stand":[],
            "Outhouse":[],
            "Well":[],
            "Manhole":[],
        },
        metro:{
            "Nook cover":[],
            "Manhole from above":[],
            "Manhole leading down":[],
            "Service door":[],
            "Sinkhole under the tracks":[],
            "Manhole":[],
        },
        zone:{
            "Toxic pool":[],
            "Nuke mire":[],
            "Tentacular brush":[],
            "Freeze vent":[],
            "Mutagenic adrenaline pool":[],
            "Glowing rocks":[],
            "Quickmud":[],
        }
    };
}
function getLocationObject(){
    return{
        originalBuildings:{
            "!Residential":[
                "Apartments",
                "Hotel",
                "Villa",
                "Mansion",
            ],
            "Shop":[
                "Food",
                "Clothing",
                "Construction",
                "Pet",
                "Electronics",
                "Cosmetics",
            ],
            "!Institute":[
                "Post office",
                "Town hall",
                "Prison",
                "Police station",
                "Army base",
                "Hospital",
                "University",
                "Museum",
                "Research",
                "Courthouse",
                "Church",
            ],
            "Industry":[
                "Power plant",
                "Water treatment",
                "Oil and gas",
                "Chemical",
                "Medtech",
                "Explosives",
                "Manufacturing",
                "Consumer goods",
                "Weapons",
                "Electronics",
                "Furniture",
                "Food processing",
            ],
            "!Business":[
                "Offices",
                "Stock exchange",
                "Bank",
                "Parking Garage",
                "Gas Station",
                "Mechanics shop",
            ],
            "!Recreation":[
                "Cinema",
                "Lasertag",
                "Sports arena",
                "Bar",
                "Restaurant",
                "Brothel",
                "Night club",
                "Park",
                "Pool house",
                "Theater",
                "Zoo",  
            ],
        },
        currentUsage:{
            "Abandoned":[
                "Crater",
                "Radiated",
                "Ooze infested",
                "Dormant androids",
            ],
            "a Mutant den":[
                "for Saurian/Cacti/Gator/Weirdo",
                "for Bears/Stilt striders/Kelp/Test dummies",
            ],
            "an Animal barrow":[
                "for Roach/Antlion/Crayfish/Eel",
                "for Dogs",
                "for Carcrab/Shellslug/Tick/Radscorpions",
            ],
            "a Tavern":[
                "and rest stop",
                "and inn",
                "and hotel",
                "and karaoke bar",
            ],
            "a Settlement":[
                "of mixed professions",
                "and Fruit farm",
                "of canned food scavengers",
                "of hunters",
                "of ranchers",
                "of tinkerers",
                "processing water",
                "running a church",
                "with a bustling trade post",
                "of artifact scavengers",
            ],
            "an Outlaw hideout":[
                "of raiders",
                "of brigands",
                "of cultists",
                "for a gogo gang",
                "for roller thugs",
                "cooking drugs",
            ],
        }
    }
}