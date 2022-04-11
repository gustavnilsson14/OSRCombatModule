var minZoom = 0.36;

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

var iconImages;
var textureImages;
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

  iconImages = getIcons();
  textureImages = getTextures();

  document.addEventListener("click", deSelectHex);
  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  bindGrabScroll();
  bindToggles();
  createDefaultGrid();
  populateImageControls();
  bindDataControls();
  bindHexDetailsControls();
  bindExpand();
  animateClouds();
  bindHexes();
  centerView();
  bindAddAssetControls();
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
  var randomness = document.querySelector("#randomness");
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
    if (Math.random() < parseFloat(randomness.value)) texture = getRandomFrom(getTextures());
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
      bindHexEvents(hex);
    });
    currentRowIndex++;
  });
}
function getFirstSelectedHex() {
  if (selectedHexes.length > 0) return selectedHexes[0];
  return null;
}
function bindHexEvents(hex) {
  var hexInner = hex.querySelector("inner");
  var hexClickLambda = (e) => {
    e.stopPropagation();
    onHexSelected(hex, e.shiftKey);
  };
  var hexMouseOverLambda = (e) => {
    e.stopPropagation();
    hex.classList.add("hover");
  };
  var hexMouseOutLambda = (e) => {
    e.stopPropagation();
    hex.classList.remove("hover");
  };
  hex.removeEventListener("click", hexClickLambda);
  hex.addEventListener("click", hexClickLambda);
  hexInner.removeEventListener("mouseover", hexMouseOverLambda);
  hexInner.addEventListener("mouseover", hexMouseOverLambda);
  hexInner.removeEventListener("mouseout", hexMouseOutLambda);
  hexInner.addEventListener("mouseout", hexMouseOutLambda);
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
  selectHexGraphicsButtons(hex);
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
  var textureButtons = document.querySelectorAll("texture:not(.template)");
  bindImageButtons(iconButtons, iconsContainer, "icon");
  bindImageButtons(textureButtons, texturesContainer, "texture");
  selectedHexContainer.querySelectorAll("[property]").forEach((p) => bindHexProperty(p));
}
function bindImageButtons(buttons, siblingsContainer, attributeToSet) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      var current = siblingsContainer.querySelector(".selected");
      if (current) current.classList.remove("selected");
      button.classList.add("selected");
      selectedHexes.forEach((hex) => {
        hex.setAttribute(attributeToSet, button.getAttribute("path"));
        renderHex(hex);
      });
    });
  });
}
function bindHexProperty(property) {
  var inputLambda = () => {
    selectedHexes.forEach((hex) => {
      hex.setAttribute(property.getAttribute("id"), property.value);
      renderHex(hex);
    });
  };
  property.removeEventListener("input", inputLambda);
  property.addEventListener("input", inputLambda);
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
  var texture = hex.querySelector("texture");
  tint.style.backgroundColor = hex.getAttribute("tile-tint");
  tint.style.opacity = hex.getAttribute("tile-tint-opacity");
  texture.style.backgroundImage = `url(${getAssetPath(hex.getAttribute("texture"))})`;
  renderIcon(hex);
}
function renderIcon(hex) {
  var iconPath = hex.getAttribute("icon");
  if (!iconPath) return;
  var icon = hex.querySelector("icon");
  var shadow = hex.querySelector("shadow");
  if (icon.style.backgroundImage.indexOf(iconPath) != -1) return;
  icon.style.backgroundImage = `url(${getAssetPath(iconPath)})`;
  shadow.style.backgroundImage = `url(${getAssetPath(iconPath)})`;
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
function populateImageControls() {
  populateControlType(iconTemplate, iconsContainer, iconImages, "icon");
  populateControlType(textureTemplate, texturesContainer, textureImages, "texture");
  bindHexDetailsControls();
}
function populateControlType(template, container, images, controlType) {
  container.innerHTML = "";
  images.forEach((image) => {
    var element = cloneTemplate(template, container);
    var path = getAssetPath(image);
    element.querySelector(`${controlType}-img`).style.backgroundImage = `url(${path})`;
    element.setAttribute("path", path);
  });
}
function getAssetPath(asset) {
  if (asset.indexOf("http") == 0) return asset;
  if (asset.indexOf("file:/") == 0) return asset;
  if (asset.indexOf("img/map/") == 0) return asset;
  return `img/map/${asset}`;
}
function bindDataControls() {
  document.querySelector("#export").addEventListener("click", exportData);
  document.querySelector("#import").addEventListener("click", importData);
}
function exportData() {
  var data = { rows: [], icons: iconImages, textures: textureImages };
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
  iconImages = data.icons;
  textureImages = data.textures;
  bindHexes();
  populateImageControls();
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
function bindAddAssetControls() {
  var assetInputField = document.querySelector("#add-asset");
  document.querySelectorAll(".add-asset").forEach((button) => {
    button.addEventListener("click", function () {
      var assetType = button.getAttribute("type");
      if (assetType == "icon") return addAsset(iconImages, assetInputField.value);
      return addAsset(textureImages, assetInputField.value);
    });
  });
}
function addAsset(list, asset) {
  list.push(asset);
  populateImageControls();
  bindHexDetailsControls();
}
function bindGrabScroll() {
  var grabbing = false;
  mapViewport.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    grabbing = true;
  });
  var zoom = 1;
  mapViewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    var multiplier = e.deltaY > 0 ? 0.95 : 1.05;
    zoom *= multiplier;
    if (zoom < minZoom) zoom = minZoom;
    mapContainer.style.transform = `scale(${zoom})`;
  });
  document.addEventListener("mouseup", () => {
    grabbing = false;
  });
  document.addEventListener("mousemove", (e) => {
    if (!grabbing) return;
    mapViewport.scrollTop -= e.movementY;
    mapViewport.scrollLeft -= e.movementX;
  });
}
window.onbeforeunload = unloadPage;
