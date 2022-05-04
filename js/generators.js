document.onreadystatechange = function () {
  if (document.readyState != "complete") return;
  bindEnemiesSelect();
  bindGenerators();
  enableDragSort(".drag-sort-enable");
};
function bindGenerators() {
  document.querySelectorAll("generator").forEach((generator) => {
    generator.querySelectorAll("controls").forEach((controls) => {
      var functionName = generator.getAttribute("function");
      var generatorFunction = eval(functionName);
      try {
        eval(`${functionName}Populate`)(generator, controls);
      } catch (e) {}

      var resultsContainer = generator.querySelector("results");
      controls.querySelector("button").addEventListener("click", () => {
        var amountInput = controls.querySelector(".amount");
        var amount = 1;
        if (amountInput) amount = parseInt(amountInput.value) > 0 ? parseInt(amountInput.value) : 1;
        var data = {};
        controls.querySelectorAll("input").forEach((input) => {
          data[input.getAttribute("name")] = getInputVal(input);
        });
        resultsContainer.innerHTML = "";
        for (let i = 0; i < amount; i++) {
          setTimeout(function () {
            generatorFunction(resultsContainer, data);
          }, 100 * i);
        }
      });
    });
  });
}
function combatTimer(timeSpentButton) {
  if (timeSpentButton.getAttribute("on") == "true") {
    timeSpentButton.setAttribute("on", "false");
    clearInterval(timeSpentButton.interval);
    timeSpentButton.innerHTML = "START COMBAT TIMER";
    return;
  }
  timeSpentButton.innerHTML = "STOP COMBAT TIMER";
  timeSpentButton.setAttribute("on", "true");
  var display = document.querySelector("#time-spent");
  var start = new Date();
  display.innerHTML = new Date(start.getTime() - start.getTime()).toUTCString().split(" ")[4];

  timeSpentButton.interval = setInterval(() => {
    var now = new Date();
    display.innerHTML = new Date(now.getTime() - start.getTime()).toUTCString().split(" ")[4];
  }, 1000);
}

function bindEnemiesSelect() {
  var select = document.querySelector("#enemies_data");
  var input = document.querySelector("#enemies");
  getEnemies().forEach((enemy) => {
    var option = createTag("option", enemy.name);
    option.setAttribute("name", enemy.name);
    select.appendChild(option);
  });
  input.addEventListener("click", function () {
    input.value = "";
  });
  document.querySelector("#add-enemy").addEventListener("click", function () {
    var enemy = getEnemies().find((x) => x.name == input.value);
    addNewEnemy(enemy);
  });
}
function addNewEnemy(enemy) {
  var template = document.querySelector("enemy-template");
  var output = Mustache.render(template.innerHTML, enemy);
  var enemyElement = createTag("enemy", output);
  if (!enemy.image) {
    enemyElement.querySelector("a").remove();
  }
  document.querySelector("enemies").appendChild(enemyElement);
  enemyElement.querySelector("button.remove").addEventListener("click", function () {
    enemyElement.remove();
  });
}

function getInputVal(input) {
  if (input.getAttribute("type") == "checkbox") return input.checked;
  if (input.getAttribute("type") == "number") return parseInt(input.value);
  return input.value;
}

function generateLocation(container, data) {
  var locationData = getResultDict(getLocationObject(), data);
  createDictDom(container, locationData);
}
function generateBattleFeature(container, data) {
  var battleFeatureData = getResultDict(getBattleFeatures(), data);
  createDictDom(container, battleFeatureData);
}

function generateNames(nestedNames, count) {
  var result = [];
  for (let i = 0; i < count; i++) {
    result = [...result, generateName(nestedNames)];
  }
  return result;
}
function generateName(container, data) {
  var resultNames = [];
  var allNames = getNames();
  console.log(data);
  Object.keys(data).forEach((namesIndex) => {
    if (!!data) if (!data[namesIndex]) return;
    var names = allNames[namesIndex];
    if (!names) return;
    console.log(names, namesIndex);
    resultNames.push(names[Math.floor(Math.random() * names.length)]);
  });
  container.appendChild(createTag("p", resultNames.join(" ")));
}
function createDictDom(container, data) {
  var element = createTag("div");
  element.classList.add("inner");
  container.appendChild(element);
  if (data instanceof GeneratorArray) {
    data.getList().forEach((index) => {
      element.appendChild(createTag("value", index));
    });
    return;
  }
  if (!data) return;
  Object.keys(data).forEach((index) => {
    var indexElement = createTag("index");
    element.appendChild(indexElement);
    if (getValue(data[index]) != null) {
      indexElement.appendChild(createTag("key", `${index[0].toUpperCase() + index.substring(1)}: `));
      indexElement.appendChild(createTag("value", getValue(data[index])));
      return;
    }
    indexElement.appendChild(createTag("key", `${index[0].toUpperCase() + index.substring(1)}`));
    createDictDom(element, data[index]);
  });
  return element;
}
function generateLoot(container, data) {
  var totalValue = data.total_value;
  var items = getItems().filter((x) => data[x.type] == true);
  var template = document.querySelector("slot-template");
  while (totalValue > 0) {
    items = items.filter((item) => getItemValue(item) <= totalValue);
    if (items.length == 0) break;
    var item = getRandomFrom(items);
    totalValue -= getItemValue(item);

    var slot = applyToTemplate(template, item);
    console.log(slot);
    container.appendChild(slot);
    /*
    totalValue -= getItemValue(item);
    itemData = {};
    itemData[item.name] = {
      type: item.type,
      quality: item.usage.filter((x) => x == "QUALITY").length,
      effect: item.usage.filter((x) => x == "EFFECT").length,
      durability: item.usage.filter((x) => x == "DURABILITY").length,
      damageTypes: item.damageTypes,
    };
    var element = createDictDom(container, itemData);
    var image = createTag("img");
    image.style.backgroundImage = `url(${item.image})`;
    element.appendChild(image);
    */
  }
}
function generateLootPopulate(generator, controls) {
  var lootTypes = [...new Set(getItems().map((x) => x.type))];
  var checkboxTemplate = document.querySelector("checkbox-template");
  var inputTemplate = document.querySelector("input-template");
  var button = generator.querySelector("button");
  lootTypes.forEach((lootType) => {
    var checkbox = applyToTemplate(checkboxTemplate, {
      generator: "loot",
      label: lootType,
    });
    button.before(checkbox);
  });
}
