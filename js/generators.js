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
    enableDragSort('.drag-sort-enable');
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

function generateNames(nestedNames, count){
    var result = [];
    for (let i = 0; i < count; i++) {
        result = [...result, generateName(nestedNames)];
    }
    return result;
}
function generateName(container, data){
    var resultNames = [];
    var allNames = getNames();
    console.log(data);
    Object.keys(data).forEach(namesIndex => {
        if(!data[namesIndex]) return;
        var names = allNames[namesIndex];
        resultNames.push(names[Math.floor(Math.random()*names.length)]);
    });
    container.appendChild(createElement('p', resultNames.join(" ")));
}

