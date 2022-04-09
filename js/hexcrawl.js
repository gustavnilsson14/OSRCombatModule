var selectedHexes;

var nav;
var mapViewport;
var mapContainer;
var selectedHexContainer;
var iconsContainer;
var texturesContainer;

var rowTemplate;
var hexTemplate;
var iconTemplate;
var textureTemplate;
document.onreadystatechange = function () {
  if (document.readyState != "complete") return;
  selectedHexes = [];
  selectedHexContainer = document.querySelector("selected-hex");
  mapViewport = document.querySelector("map");
  mapContainer = document.querySelector("map-inner");
  iconsContainer = document.querySelector("icons");
  texturesContainer = document.querySelector("textures");
  rowTemplate = document.querySelector("#row-template");
  hexTemplate = document.querySelector("#hex-template");
  iconTemplate = document.querySelector("#icon-template");
  textureTemplate = document.querySelector("#texture-template");
  nav = document.querySelector("nav");

  document.addEventListener("click", deSelectHex);
  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  bindToggles();
  createDefaultGrid();
  populateIconControls();
  populateTextureControls();
  bindDataControls();
  bindHexDetailsControls();
  bindExpand();
  animateClouds();
  bindHexes();
  centerView();
};
function createDefaultGrid() {
  var firstRow = cloneTemplate(rowTemplate, mapContainer);
  var firstHex = cloneTemplate(hexTemplate, firstRow);
  firstHex.setAttribute("texture", getRandomFrom(getTextures()));
  renderHex(firstHex);
}
function animateClouds() {
  var clouds = document.querySelector("clouds");
  var x = 0;
  var y = 0;
  setInterval(function () {
    x++;
    y++;
    clouds.style.backgroundPosition = `${x}px ${y}px`;
  }, 1000 / 30);
}
function bindExpand() {
  document.querySelector("#expand").addEventListener("click", expand);
}
function expand() {
  var newHexes = [];
  var currentRows = document.querySelectorAll("map row:not(.template)");
  currentRows.forEach((row) => {
    var obj = appendAndPrepend(hexTemplate, row);
    newHexes.push(obj.top);
    newHexes.push(obj.bottom);
  });
  var rowAmount = parseInt(currentRows.length / 2);
  var newRows = appendAndPrepend(rowTemplate, mapContainer);
  var hexAmount = rowAmount + 2;
  newHexes = [...newHexes, ...appendAmount(hexTemplate, newRows.top, hexAmount)];
  newHexes = [...newHexes, ...appendAmount(hexTemplate, newRows.bottom, hexAmount)];
  bindHexes();
  centerView();
  newHexes.forEach((newHex) => {
    var parent = getNewHexParent(newHexes, newHex);
    var texture = parent.getAttribute("texture");
    if (getRandomNumber(0, 10) > 8) texture = getRandomFrom(getTextures());
    newHex.setAttribute("texture", texture);
    renderHex(newHex);
  });
}
function getNewHexParent(newHexes, newHex) {
  var pos = {
    x: parseInt(newHex.getAttribute("posx")),
    y: parseInt(newHex.getAttribute("posy")),
  };
  var neighbors = [];
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      var neighbor = document.querySelector(`hex[posx="${pos.x + x}"][posy="${pos.y + y}"]`);
      if (!neighbor) continue;
      if (neighbor == newHex) continue;
      if (newHexes.indexOf(neighbor) != -1) continue;
      neighbors.push(neighbor);
    }
  }
  return getRandomFrom(neighbors);
}
function centerView(behaviour = "auto") {
  var hex = getFirstSelectedHex();
  if (!hex) hex = document.querySelector('hex[posx="0"][posy="0"]');
  hex.scrollIntoView({
    behavior: behaviour,
    block: "center",
    inline: "center",
  });
}
function bindHexes() {
  var rows = document.querySelectorAll("map row");
  var currentRowIndex = Math.ceil(rows.length / 2) - rows.length;
  rows.forEach((row) => {
    var hexes = row.querySelectorAll("hex");
    var currentHexIndex = Math.floor(hexes.length / 2) - hexes.length;
    hexes.forEach((hex) => {
      currentHexIndex++;
      hex.setAttribute("posX", currentHexIndex);
      hex.setAttribute("posY", currentRowIndex);
      var hexLambda = (e) => {
        e.stopPropagation();
        onHexSelected(hex, e.shiftKey);
      };
      hex.removeEventListener("click", hexLambda);
      hex.addEventListener("click", hexLambda);
    });
    currentRowIndex++;
  });
}
function getFirstSelectedHex() {
  if (selectedHexes.length > 0) return selectedHexes[0];
  return null;
}
function onHexSelected(hex, multiSelect) {
  if (!multiSelect) deSelectHex();
  if (selectedHexes.indexOf(hex) != -1) return;
  selectedHexes.push(hex);
  hex.classList.add("selected");
  showHexDetails(hex);
  centerView("smooth");
}
function deSelectHex() {
  selectedHexContainer.classList.remove("visible");
  selectedHexes.forEach((hex) => {
    hex.classList.remove("selected");
  });
  selectedHexes = [];
}
function showHexDetails(hex) {
  selectedHexContainer.classList.add("visible");
  displayHexProperties(hex);
  /*var nameInput = selectedHexContainer.querySelector("input[name-input]");
  nameInput.value = hex.getAttribute("name");
  var positionField = selectedHexContainer.querySelector("pos");
  positionField.innerHTML = `${hex.getAttribute("posx")}:${hex.getAttribute("posy")}`;
  var descriptionField = selectedHexContainer.querySelector("textarea");
  descriptionField.value = hex.getAttribute("description");
  */ selectHexGraphicsButtons(hex);
}
function selectHexGraphicsButtons(hex) {
  selectedHexContainer.querySelectorAll(".selected").forEach((element) => {
    element.classList.remove("selected");
  });
  var selectedIcon = selectedHexContainer.querySelector(`icon[path="${hex.getAttribute("icon")}"]`);
  if (selectedIcon) selectedIcon.classList.add("selected");
  var selectedTexture = selectedHexContainer.querySelector(`texture[path="${hex.getAttribute("texture")}"]`);
  if (selectedTexture) selectedTexture.classList.add("selected");
}
function bindHexDetailsControls() {
  var iconButtons = document.querySelectorAll("icon:not(.template)");
  iconButtons.forEach((iconButton) => {
    iconButton.addEventListener("click", () => {
      var current = iconsContainer.querySelector(".selected");
      if (current) current.classList.remove("selected");
      iconButton.classList.add("selected");
      selectedHexes.forEach((hex) => {
        hex.setAttribute("icon", iconButton.getAttribute("path"));
        renderHex(hex);
      });
    });
  });
  var textureButtons = document.querySelectorAll("texture:not(.template)");
  textureButtons.forEach((textureButton) => {
    textureButton.addEventListener("click", () => {
      var current = texturesContainer.querySelector(".selected");
      if (current) current.classList.remove("selected");
      textureButton.classList.add("selected");
      selectedHexes.forEach((hex) => {
        hex.setAttribute("texture", textureButton.getAttribute("path"));
        renderHex(hex);
      });
    });
  });
  selectedHexContainer.querySelectorAll("[property]").forEach((p) => bindHexProperty(p));
}
function bindHexProperty(property) {
  property.addEventListener("input", () => {
    selectedHexes.forEach((hex) => {
      hex.setAttribute(property.getAttribute("id"), property.value);
      renderHex(hex);
    });
  });
}
var x;
function displayHexProperties(hex) {
  var properties = selectedHexContainer.querySelectorAll("[property]");
  properties.forEach((property) => {
    switch (property.getAttribute("display")) {
      case "innerHTML":
        property.innerHTML = hex.getAttribute(property.getAttribute("id"));
        break;
      default:
        property.value = hex.getAttribute(property.getAttribute("id"));
        break;
    }
  });
}

function renderHex(hex) {
  hex.querySelector("name").innerHTML = hex.getAttribute("tile-name");
  var tint = hex.querySelector("tint");
  tint.style.backgroundColor = hex.getAttribute("tile-tint");
  tint.style.opacity = hex.getAttribute("tile-tint-opacity");
  hex.style.backgroundImage = `url(img/map/${hex.getAttribute("texture")})`;
  renderIcon(hex);
}
function renderIcon(hex) {
  var iconPath = hex.getAttribute("icon");
  if (!iconPath) return;
  var icon = hex.querySelector("icon");
  var shadow = hex.querySelector("shadow");
  if (icon.style.backgroundImage.indexOf(iconPath) != -1) return;
  icon.style.backgroundImage = `url(img/map/${iconPath})`;
  shadow.style.backgroundImage = `url(img/map/${iconPath})`;

  icon.classList.add("animate");
  shadow.classList.add("animate");
  setTimeout(() => {
    icon.classList.remove("animate");
    shadow.classList.remove("animate");
  }, 600);
}

function appendAmount(template, container, amount) {
  var newItems = [];
  for (let i = 0; i < amount; i++) {
    var newItem = cloneTemplate(template);
    newItems.push(newItem);
    container.appendChild(newItem);
  }
  return newItems;
}
function appendAndPrepend(template, container) {
  var top = cloneTemplate(template);
  var bottom = cloneTemplate(template);
  container.appendChild(top);
  container.prepend(bottom);
  return {
    top: top,
    bottom: bottom,
  };
}
function cloneTemplate(template, container = null) {
  var newNode = template.cloneNode(true);
  newNode.removeAttribute("id", "");
  newNode.removeAttribute("class", "");
  if (container) container.appendChild(newNode);
  return newNode;
}
function unloadPage() {
  return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
}
function bindDataControls() {
  document.querySelector("#export").addEventListener("click", exportData);
  document.querySelector("#import").addEventListener("click", importData);
}
function populateIconControls() {
  getIcons().forEach((icon) => {
    var iconElement = cloneTemplate(iconTemplate, iconsContainer);
    iconElement.querySelector("icon-img").style.backgroundImage = `url(img/map/${icon})`;
    iconElement.setAttribute("path", icon);
  });
}
function populateTextureControls() {
  getTextures().forEach((texture) => {
    var textureElement = cloneTemplate(textureTemplate, texturesContainer);
    textureElement.querySelector("texture-img").style.backgroundImage = `url(img/map/${texture})`;
    textureElement.setAttribute("path", texture);
  });
}
function exportData() {
  var data = { rows: [] };
  var rows = document.querySelectorAll("map row:not(.template)");
  rows.forEach((row) => {
    var rowData = { hexes: [] };
    var hexes = row.querySelectorAll("hex");
    hexes.forEach((hex) => {
      rowData.hexes.push(getElementData(hex));
    });
    data.rows.push(rowData);
  });
  navigator.clipboard.writeText(JSON.stringify(data));
}
function importData() {
  var data = document.querySelector("#import-data").value;
  data = JSON.parse(data);
  mapContainer.innerHTML = "";

  data.rows.forEach((row) => {
    var newRow = cloneTemplate(rowTemplate);
    row.hexes.forEach((hex) => {
      var newHex = cloneTemplate(hexTemplate);
      newRow.appendChild(newHex);
      setElementData(newHex, hex);
      renderHex(newHex);
    });
    mapContainer.appendChild(newRow);
  });
  bindHexes();
}
function setElementData(element, data) {
  for (const [key, value] of Object.entries(data)) {
    element.setAttribute(key, value);
  }
  return data;
}
function getElementData(element) {
  var data = {};
  Array.from(element.attributes).forEach((attribute) => {
    data[attribute.name] = attribute.value;
  });
  return data;
}
function bindToggles() {
  document.querySelectorAll("[toggle]").forEach((toggle) => {
    var toggleClass = toggle.getAttribute("toggle");
    var toggleState = toggle.hasAttribute("on");
    if (!toggleClass) return;
    if (toggleState) toggle.classList.toggle(toggleClass);
    toggle.addEventListener("click", function () {
      toggleState = !toggleState;
      toggleClassOn(toggle, toggleState, toggleClass);
      toggleTargets(toggle, toggleState);
    });
  });
}
function toggleTargets(toggle, toggleState) {
  var targets = document.querySelectorAll(toggle.getAttribute("targets"));
  var toggleClass = toggle.getAttribute("toggle");
  targets.forEach((target) => {
    toggleClassOn(target, toggleState, toggleClass);
  });
}
function toggleClassOn(target, state, toggleClass) {
  if (state) {
    target.classList.add(toggleClass);
    return;
  }
  target.classList.remove(toggleClass);
}
window.onbeforeunload = unloadPage;
