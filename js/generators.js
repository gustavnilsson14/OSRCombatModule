
document.onreadystatechange = function () {
    if (document.readyState != "complete") return;
    
    bindEnemiesSelect();
    var timeSpentButton = document.querySelector('#time-spent-button');
    var interval;
    timeSpentButton.addEventListener('click', function(){
        if (timeSpentButton.getAttribute('on') == "true") {
            timeSpentButton.setAttribute('on', "false");
            clearInterval(interval);
            timeSpentButton.innerHTML = "START COMBAT TIMER";
            return;
        }
        timeSpentButton.innerHTML = "STOP COMBAT TIMER";
        timeSpentButton.setAttribute('on', "true");
        var display = document.querySelector('#time-spent')
        var start = new Date();
        display.innerHTML = new Date(start.getTime() - start.getTime()).toUTCString().split(' ')[4];
        interval = setInterval(() => {
            var now = new Date();
            console.log(now.getTimezoneOffset());
            display.innerHTML = new Date(now.getTime() - start.getTime()).toUTCString().split(' ')[4];
        }, 1000);
    });
    document.querySelectorAll('generator').forEach(generator => {
        generator.querySelectorAll('controls').forEach(controls => {
            var generatorFunction = eval(generator.getAttribute('function'));
            var resultsContainer = generator.querySelector('results');
            controls.querySelector('button').addEventListener('click', () => {
                var amountInput = controls.querySelector('.amount');
                var amount = parseInt(amountInput.value) > 0 ? parseInt(amountInput.value) : 1;
                var data = {};
                controls.querySelectorAll('input:not(.amount)').forEach(input => {
                    data[input.getAttribute('name')] = getInputVal(input);
                });
                resultsContainer.innerHTML = '';
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

function bindEnemiesSelect(){
    var select = document.querySelector("#enemies_data");
    var input = document.querySelector("#enemies");
    getEnemies().forEach(enemy => {
        var option = createElement("option", enemy.name);
        option.setAttribute("name", enemy.name);
        select.appendChild(option);
    });
    input.addEventListener("click",function(){
        input.value = "";
    })
    document.querySelector("#add-enemy").addEventListener("click",function(){
        var enemy = getEnemies().find(x => x.name == input.value);
        addNewEnemy(enemy);
    });
}
function addNewEnemy(enemy){
    var template = document.querySelector("enemy-template");
    var output = Mustache.render(template.innerHTML, enemy);
    var enemyElement = createElement("enemy", output);
    if (!enemy.image) {
        enemyElement.querySelector("a").remove();
    }
    document.querySelector("enemies").appendChild(enemyElement);
    enemyElement.querySelector("button.remove").addEventListener('click',function(){
        enemyElement.remove();
    });
}

function getInputVal(input){
    if(input.getAttribute("type") == "checkbox") return input.checked;
    return input.value;
}

function generateLocation(container, data){
    var locationData = getResultDict(getLocationObject(), data);
    
    createDictDom(container, locationData);
}
function generateBattleFeature(container, data){
    var battleFeatureData = getResultDict(getBattleFeatures(), data);
    createDictDom(container, battleFeatureData);
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
    Object.keys(data).forEach(namesIndex => {
        if(!!data) if(!data[namesIndex]) return;
        var names = allNames[namesIndex];
        resultNames.push(names[Math.floor(Math.random()*names.length)]);
    });
    container.appendChild(createElement('p', resultNames.join(" ")));
}
function getRandomIndex(list){
    return getRandomNumber(0,list.length);
}
function getRandomFrom(list){
    var newList = [...list].map(value => {
        if(value instanceof WeightedValue) return Array(value.weight).fill(value.value);
        return value;
    }).flat();
    return newList[getRandomIndex(newList)];
}
function getRandomNumber(min, max){
    return Math.floor((Math.random()*Math.floor(max-min)))+min;
}
function getResultDict(data, filter){
    if (typeof(data) == "string") return data;
    if (data instanceof GeneratorArray) return data.getList();
    var result = {};
    Object.keys(data).forEach(index => {
        if(!!filter)
            if(!filter[index]) return;
        var innerData = data[index];
        result[index] = handleResultDictIndex(innerData);
    });
    return result;
}
function handleResultDictIndex(innerData){
    if(innerData instanceof GeneratorArray) return innerData;
    if(Array.isArray(innerData)) return getResultDict(getRandomFrom(innerData));
    if(typeof(innerData) == "object") return getResultDict(innerData);
    if(typeof(innerData) == "string") return innerData;
}
function createDictDom(container, data){
    var element = createElement("div");
    element.classList.add('inner');
    container.appendChild(element);
    if(data instanceof GeneratorArray){
        console.log("data instanceof GeneratorArray");
        data.getList().forEach(index => {
            element.appendChild(createElement("value", index));
        });
        return;
    }
    //console.log(data);
    if (!!!data) return;
    Object.keys(data).forEach(index => {
        var indexElement = createElement("index");
        console.log(index, data[index]);
        element.appendChild(indexElement);
        if(getValue(data[index]) != null){
            indexElement.appendChild(createElement("key", `${index[0].toUpperCase() + index.substring(1)}: `));
            indexElement.appendChild(createElement("value", getValue(data[index])));
            return;
        }
        indexElement.appendChild(createElement("key", `${index[0].toUpperCase() + index.substring(1)}`));
        createDictDom(element,data[index]);
    });
}
function createElement(type = "p", content = ""){
    const p = document.createElement(type);
    p.innerHTML = content;
    return p;
}
function getValue(val){
    if(val instanceof WeightedValue) return val.val;
    if(typeof(val) == "string") return val;
    return null;
}
class GeneratorArray{
    constructor(list){
        this.list = list;
    }
    getList(){
        return [];
    }
}
class GetAllArray extends GeneratorArray{
    constructor(list){
        super(list);
    }
    getList(){
        return this.list;
    }
}
class GetSomeArray extends GeneratorArray{
    constructor(list, amount){
        super(list);
        this.amount = amount;
    }
    getList(){
        this.list.sort(() => 0.5 - Math.random());
        return this.list.slice(0, this.amount);
    }
}
class WeightedValue{
    constructor(weight, value){
        this.weight = weight;
        this.value = value;
    }
}