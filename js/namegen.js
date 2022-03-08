function generateNames(nestedNames, count){
    var result = [];
    for (let i = 0; i < count; i++) {
        result = [...result, generateName(nestedNames)];
    }
    return result;
}
function generateName(nestedNames){
    var resultNames = [];
    nestedNames.forEach(names => {
        resultNames.push(names[Math.floor(Math.random()*names.length)]);
    });
    return resultNames.join(" ");
}

var maleFirstNames = getMaleNames();
var femaleFirstNames = getFemaleNames();
var lastNames = getLastNames();
var nickNames = [];
var titles = [
    "Professor",
    "Admiral",
    "Captain",
    "Ms.",
    "Mr.",
    "Private",
    "Major",
    "Doctor",
    "Boss",
    "Arbiter",
    "Chief",
    "Sheriff",
    "Master",
    "Lord",
    "Duke",
    "Archon"
];

var banditNames = getBanditNames();
var hipsterNames = [
    "Barista",
    "Barber",
    "Beret",
    "Retro",
    "Mustache",
    "Chilies",
    "Irony",
    "Indie",
    "Jazz",
    "Chic",
    "Underground",
    "Coldbrew",
    "Dadbod",
    "Lumberjack",
    "Alternative",
    "Postrock",
    "Subcult",
];
var conclaveNouns = [];
var scavNouns = [];
var swampNouns = [];
var wastesNouns = [];
var androidNouns = [];
var synthNouns = [];