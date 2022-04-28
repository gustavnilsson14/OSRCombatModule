function createTag(type = "p", content = "") {
  const p = document.createElement(type);
  p.innerHTML = content;
  return p;
}

function getRandomIndex(list) {
  return getRandomNumber(0, list.length);
}
function getRandomFrom(list) {
  var newList = [...list]
    .map((value) => {
      if (value instanceof WeightedValue) return Array(value.weight).fill(value.value);
      return value;
    })
    .flat();
  return newList[getRandomIndex(newList)];
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
}
function getResultDict(data, filter) {
  if (typeof data == "string") return data;
  if (data instanceof GeneratorArray) return data.getList();
  var result = {};
  Object.keys(data).forEach((index) => {
    if (!!filter) if (!filter[index]) return;
    var innerData = data[index];
    result[index] = handleResultDictIndex(innerData);
  });
  return result;
}
function handleResultDictIndex(innerData) {
  if (innerData instanceof GeneratorArray) return innerData;
  if (Array.isArray(innerData)) return getResultDict(getRandomFrom(innerData));
  if (typeof innerData == "object") return getResultDict(innerData);
  if (typeof innerData == "string") return innerData;
}
function getValue(val) {
  if (val instanceof WeightedValue) return val.val;
  if (typeof val == "string") return val;
  return null;
}
function applyToTemplate(template, data) {
  return Mustache.render(template.innerHTML, data);
}
async function sleep(timeout) {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, timeout)
  );
}
class GeneratorArray {
  constructor(list) {
    this.list = list;
  }
  getList() {
    return [];
  }
}
class GetAllArray extends GeneratorArray {
  constructor(list) {
    super(list);
  }
  getList() {
    return this.list;
  }
}
class GetSomeArray extends GeneratorArray {
  constructor(list, amount) {
    super(list);
    this.amount = amount;
  }
  getList() {
    this.list.sort(() => 0.5 - Math.random());
    return this.list.slice(0, this.amount);
  }
}
class WeightedValue {
  constructor(weight, value) {
    this.weight = weight;
    this.value = value;
  }
}
