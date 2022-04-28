var minZoom = 0.36;

var selectedHexes;

var nav, mapViewport, mapContainer, selectedHexContainer, iconsContainer, waterIconsContainer, texturesContainer;

var rowTemplate, hexTemplate, iconTemplate, textureTemplate;

var iconImages, waterIconImages, textureImages, clusterBuildingImages, clusterForestImages;
var hexPositions = {
  "-1_-1": [-0.66, -1],
  "1_-1": [0.66, -1],
  "-2_0": [-1, 0],
  "2_0": [1, 0],
  "-1_1": [-0.66, 1],
  "1_1": [0.66, 1],
};

document.onreadystatechange = function () {
  if (document.readyState != "complete") return;
  selectedHexes = [];
  selectedHexContainer = document.querySelector("selected-hex");
  mapViewport = document.querySelector("map");
  mapContainer = document.querySelector("map-inner");
  iconsContainer = document.querySelector("icons");
  waterIconsContainer = document.querySelector("water-icons");
  texturesContainer = document.querySelector("textures");
  rowTemplate = document.querySelector("#row-template");
  hexTemplate = document.querySelector("#hex-template");
  iconTemplate = document.querySelector("#icon-template");
  textureTemplate = document.querySelector("#texture-template");
  nav = document.querySelector("nav");

  iconImages = getIcons().sort();
  waterIconImages = getWaterIcons().sort();
  textureImages = getTextures().sort();
  clusterBuildingImages = getCityBuildings();
  clusterForestImages = getTrees();

  document.addEventListener("click", deSelectHex);
  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  bindGrabScroll();
  bindToggles();
  animateClouds();
  setup();
};
function setup() {
  createDefaultGrid();
  populateImageControls();
  bindExpand();
  bindHexes();
  centerView();
  bindAddAssetControls();
}
function createDefaultGrid() {
  var firstRow = cloneTemplate(rowTemplate, mapContainer);
  var firstHex = cloneTemplate(hexTemplate, firstRow);
  firstHex.setAttribute("texture", getAssetPath(getRandomFrom(getTextures())));
  setHexPositions();
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
  setHexPositions();
  newHexes.forEach((newHex) => {
    var parent = getNewHexParent(newHexes, newHex);
    var texture = parent.getAttribute("texture");
    if (Math.random() < parseFloat(randomness.value)) texture = getRandomFrom(getTextures());
    newHex.setAttribute("texture", texture);
    renderHex(newHex);
  });
  bindHexes();
  centerView();
}
function getHexNeighbors(hex) {
  var pos = getHexPosition(hex);
  return [
    document.querySelector(`hex[posx="${pos.x - 1}"][posy="${pos.y - 1}"]`),
    document.querySelector(`hex[posx="${pos.x + 1}"][posy="${pos.y - 1}"]`),
    document.querySelector(`hex[posx="${pos.x - 2}"][posy="${pos.y}"]`),
    document.querySelector(`hex[posx="${pos.x + 2}"][posy="${pos.y}"]`),
    document.querySelector(`hex[posx="${pos.x - 1}"][posy="${pos.y + 1}"]`),
    document.querySelector(`hex[posx="${pos.x + 1}"][posy="${pos.y + 1}"]`),
  ].filter((x) => x != null);
}
function getHexNeighborPositions(hex) {
  var pos = getHexPosition(hex);
  return [
    {
      x: pos.x - 1,
      y: pos.y - 1,
    },
    {
      x: pos.x + 1,
      y: pos.y - 1,
    },
    {
      x: pos.x - 2,
      y: pos.y,
    },
    {
      x: pos.x + 2,
      y: pos.y,
    },
    {
      x: pos.x - 1,
      y: pos.y + 1,
    },
    {
      x: pos.x + 1,
      y: pos.y + 1,
    },
  ].filter((x) => x != null);
}
function getHexPosition(hex) {
  return {
    x: parseInt(hex.getAttribute("posx")),
    y: parseInt(hex.getAttribute("posy")),
  };
}
function getNewHexParent(newHexes, newHex) {
  neighbors = getHexNeighbors(newHex).filter((neighbor) => {
    if (newHexes.indexOf(neighbor) != -1) return false;
    return true;
  });
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
function setHexPositions() {
  var rows = document.querySelectorAll("map row");
  var posY = Math.ceil(rows.length / 2) - rows.length;
  rows.forEach((row) => {
    var hexes = row.querySelectorAll("hex");
    var posX = getCorrectedHexStartX(posY, hexes);
    hexes.forEach((hex) => {
      hex.setAttribute("posX", posX);
      hex.setAttribute("posY", posY);
      posX += 2;
    });
    posY++;
  });
}
function bindHexes() {
  document.querySelectorAll("map hex").forEach((hex) => {
    setNeighborClasses(hex);
    bindHexEvents(hex);
  });
}
function getCorrectedHexStartX(posY, hexes) {
  if (posY % 2 == 0) return -(hexes.length - 1);
  return -hexes.length + 1;
}
function setNeighborClasses(hex) {
  getHexNeighborPositions(hex).forEach((neighborPos) => {
    if (!neighborPos) return;
    var hexPos = getHexPosition(hex);
    var posDiff = {
      x: neighborPos.x - hexPos.x,
      y: neighborPos.y - hexPos.y,
    };
    var neighbor = document.querySelector(`hex[posx="${neighborPos.x}"][posy="${neighborPos.y}"]`);
    hex.setAttribute(`n${posDiff.x}_${posDiff.y}`, 1);
    if (!neighbor) return;
    if (matchTileType(hex, neighbor)) return;
    hex.removeAttribute(`n${posDiff.x}_${posDiff.y}`);
  });
}
function matchTileType(hex, neighbor) {
  if (!neighbor.hasAttribute("tile-type")) return false;
  return neighbor.getAttribute("tile-type") == hex.getAttribute("tile-type");
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
  var iconButtons = document.querySelectorAll("icons icon");
  var waterIconButtons = document.querySelectorAll("water-icons icon");
  var textureButtons = document.querySelectorAll("textures texture");
  bindImageButtons(iconButtons, iconsContainer, "icon");
  bindImageButtons(waterIconButtons, waterIconsContainer, "water-icon");
  bindImageButtons(textureButtons, texturesContainer, "texture", false);
  bindHexProperties();
}
function bindImageButtons(buttons, siblingsContainer, attributeToSet, canDeselect = true) {
  buttons.forEach((button) => {
    var buttonClickLambda = () => {
      handleImageButtonSelection(button, siblingsContainer, canDeselect);
      selectedHexes.forEach((hex) => {
        var path = button.getAttribute("path");
        if (!button.classList.contains("selected")) path = "";
        hexAttributeChanged(hex, attributeToSet, path);
        renderHex(hex);
      });
    };
    button.removeEventListener("click", buttonClickLambda);
    button.addEventListener("click", buttonClickLambda);
  });
}
function handleImageButtonSelection(button, siblingsContainer, canDeselect) {
  var current = siblingsContainer.querySelector(".selected");
  if (!current) {
    button.classList.add("selected");
    return;
  }
  if (current) current.classList.remove("selected");
  if (current == button && canDeselect) return;
  button.classList.add("selected");
}
function bindHexProperties() {
  selectedHexContainer.querySelectorAll("[property]").forEach((p) => bindHexProperty(p));
}
function bindHexProperty(property) {
  var inputLambda = () => {
    selectedHexes.forEach((hex) => {
      hexAttributeChanged(hex, getPropertyKey(property), getPropertyValue(property));
      renderHex(hex);
    });
  };
  property.removeEventListener("input", inputLambda);
  property.addEventListener("input", inputLambda);
}
function hexAttributeChanged(hex, key, value) {
  hex.setAttribute(key, value);
  if (key != "tile-type") return;
  displayTileTypeOptionControls(hex);
}
function displayTileTypeOptionControls(hex) {
  var tileType = hex.getAttribute("tile-type");
  selectedHexContainer.querySelectorAll("tile-type-options box").forEach((options) => {
    options.style.display = "none";
    if (!options.hasAttribute(tileType)) return;
    options.style.display = "flex";
  });
}
function getPropertyKey(property) {
  if (property.getAttribute("type") == "radio") return property.getAttribute("name");
  return property.getAttribute("id");
}
function getPropertyValue(property) {
  if (property.getAttribute("type") == "checkbox") return property.checked;
  if (property.getAttribute("type") == "radio") return property.getAttribute("val");
  return property.value;
}
function displayHexProperties(hex) {
  var properties = selectedHexContainer.querySelectorAll("[property]");
  properties.forEach((property) => {
    switch (property.getAttribute("display")) {
      case "innerHTML":
        property.innerHTML = hex.getAttribute(property.getAttribute("id"));
        break;
      case "checkbox":
        property.checked = hex.getAttribute(property.getAttribute("id"));
        break;
      case "radio":
        property.checked = hex.getAttribute(property.getAttribute("name")) == property.getAttribute("val");
        break;
      default:
        property.value = hex.getAttribute(property.getAttribute("id"));
        break;
    }
  });
  displayTileTypeOptionControls(hex);
}

function renderHex(hex) {
  hex.querySelector("name").innerHTML = hex.getAttribute("tile-name");
  var pos = getHexPosition(hex);
  hex.style.left = `${pos.x * 72}px`;
  hex.style.top = `${pos.y * 90}px`;
  var tint = hex.querySelector("tint");
  var texture = hex.querySelector("texture");
  tint.style.backgroundColor = hex.getAttribute("tile-tint");
  tint.style.opacity = hex.getAttribute("tile-tint-opacity");
  texture.style.backgroundImage = `url(${getAssetPath(hex.getAttribute("texture"))})`;
  renderIcon(hex, "icon");
  renderIcon(hex, "water-icon");
  renderCluster(hex);
  setNeighborClasses(hex);
  getHexNeighbors(hex).forEach((neighbor) => {
    setNeighborClasses(neighbor);
  });
}
function renderIcon(hex, iconType) {
  var iconPath = hex.getAttribute(iconType);
  var icon = hex.querySelector(iconType);
  var shadow = hex.querySelector(`${iconType}-shadow`);
  if (!iconPath) return setImageUrlValue(icon, shadow, iconPath);
  if (icon.style.backgroundImage.indexOf(iconPath) != -1) return;
  setImageUrlValue(icon, shadow, iconPath);
  icon.classList.add("animate");
  shadow.classList.add("animate");
  setTimeout(() => {
    icon.classList.remove("animate");
    shadow.classList.remove("animate");
  }, 600);
}
function setImageUrlValue(icon, shadow, path) {
  var value = "";
  if (path) value = `url(${getAssetPath(path)})`;
  icon.style.backgroundImage = value;
  shadow.style.backgroundImage = value;
}
function renderCluster(hex) {
  if (!handleClusterVisibility(hex)) return;
  hex.querySelectorAll("cluster-image").forEach((clusterImage) => {
    var image = getClusterImageByType(hex.getAttribute("tile-type"));
    clusterImage.style.backgroundImage = `url(${image})`;
  });
}
function handleClusterVisibility(hex) {
  if (!hex.hasAttribute("tile-type")) return false;
  var clusterType = hex.getAttribute("tile-type");
  if (clusterType == "city") {
    hex.querySelector("cluster").style.display = "block";
    return true;
  }
  if (clusterType == "forest") {
    hex.querySelector("cluster").style.display = "block";
    return true;
  }
  hex.querySelector("cluster").style.display = "none";
  return false;
}
function getClusterImageByType(type) {
  if (type == "city") return getAssetPath(getRandomFrom(clusterBuildingImages));
  if (type == "forest") return getAssetPath(getRandomFrom(clusterForestImages));
  return "";
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
  populateControlType(iconTemplate, waterIconsContainer, waterIconImages, "icon");
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
async function exportData(button) {
  var dataString = JSON.stringify(getData());
  navigator.clipboard.writeText(dataString);
  await buttonFeedback(button);
}
async function importData(button) {
  var data = await navigator.clipboard.readText();
  try {
    data = JSON.parse(data);
  } catch (e) {
    await buttonFeedback(button, "warning", 1500);
    return;
  }
  mapContainer.innerHTML = "";
  parseData(data);
  await buttonFeedback(button);
}
async function save(button) {
  window.localStorage.map = JSON.stringify(getData());
  await buttonFeedback(button);
}
async function load(button) {
  var data;
  try {
    data = JSON.parse(window.localStorage.map);
  } catch (e) {
    await buttonFeedback(button, "warning", 1500);
    return;
  }
  mapContainer.innerHTML = "";
  parseData(data);
  await buttonFeedback(button);
}
async function clearData(button) {
  if (button.classList.contains("commit-to-clear")) {
    button.classList.remove("commit-to-clear");
    button.innerText = "CLEAR";
    window.localStorage.map = "";
    mapContainer.innerHTML = "";
    setup();
    return;
  }
  button.classList.add("commit-to-clear");
  button.innerText = "REALLY CLEAR YOUR DATA?";
  await sleep(3000);
  if (button.classList.contains("commit-to-clear")) {
    button.classList.remove("commit-to-clear");
    button.innerText = "CLEAR";
  }
}
function parseData(data) {
  iconImages = [...new Set([...data.icons, ...getIcons()])].sort();
  textureImages = [...new Set([...data.textures, ...getTextures()])].sort();

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
  populateImageControls();
}
async function buttonFeedback(button, className = "success", timeout = 500) {
  button.classList.add(`btn-${className}`);
  await sleep(timeout);
  button.classList.remove(`btn-${className}`);
}
function getData() {
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
  return data;
}
function getDataAttributeKeyVal(attribute) {
  if (attribute.name == "class") return [];
  if (attribute.name == "style") return [];
  if (attribute.name == "texture") return [attribute.name, getImageIndex(attribute.value, textureImages)];
  if (attribute.name == "icon") return [attribute.name, getImageIndex(attribute.value, iconImages)];
  return [attribute.name, attribute.value];
}
function setElementData(element, data) {
  for (const [key, value] of Object.entries(data)) {
    if (key == "texture") {
      element.setAttribute(key, textureImages[parseInt(value)]);
      continue;
    }
    if (key == "icon") {
      element.setAttribute(key, iconImages[parseInt(value)]);
      continue;
    }
    element.setAttribute(key, value);
  }
  return data;
}
function getElementData(element) {
  var data = {};
  Array.from(element.attributes).forEach((attribute) => {
    var [key, val] = getDataAttributeKeyVal(attribute);
    if (!key) return;
    data[key] = val;
  });
  return data;
}
function getImageIndex(path, images) {
  return images.indexOf(images.find((x) => path.indexOf(x) != -1));
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
      addAsset(assetInputField.value, assetType);
      populateImageControls();
      bindHexDetailsControls();
    });
  });
}
function addAsset(asset, assetType) {
  if (assetType == "icon") iconImages = [...iconImages, asset].sort();
  if (assetType == "texture") textureImages = [...textureImages, asset].sort();
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
