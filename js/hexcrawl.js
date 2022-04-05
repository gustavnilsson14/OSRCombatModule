var selectedHex;

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
    selectedHexContainer = document.querySelector('selected-hex');
    mapViewport = document.querySelector('map');
    mapContainer = document.querySelector('map-inner');
    iconsContainer = document.querySelector('icons');
    texturesContainer = document.querySelector('textures');
    rowTemplate = document.querySelector("#row-template");
    hexTemplate = document.querySelector("#hex-template");
    iconTemplate = document.querySelector("#icon-template");
    textureTemplate = document.querySelector("#texture-template");
    nav = document.querySelector("nav");

    document.addEventListener('click', deSelectHex);
    nav.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    populateIconControls();
    populateTextureControls();
    bindDataControls();
    bindHexDetailsControls();
    bindExpand();
    animateClouds();
    bindHexes();
    centerView();
}
function animateClouds(){
    var clouds = document.querySelector('clouds');
    var x = 0;
    var y = 0;
    setInterval(function(){
        x++;
        y++;
        clouds.style.backgroundPosition = `${x}px ${y}px`;
    },1000/30);
}
function bindExpand(){
    document.querySelector('#expand').addEventListener('click',function(){
        var currentRows = document.querySelectorAll('row:not(.template)');
        currentRows.forEach(row => {
            appendAndPrepend(hexTemplate, row);
        });
        var rowAmount = parseInt(currentRows.length/2)
        var newRows = appendAndPrepend(rowTemplate, mapContainer);
        var hexAmount = rowAmount+2;
        appendAmount(hexTemplate, newRows.top, hexAmount);
        appendAmount(hexTemplate, newRows.bottom, hexAmount);
        bindHexes();
        centerView();
    });
}
function centerView(behaviour = "auto"){
    var hex = selectedHex;
    if(!hex) hex = document.querySelector('hex[posx="0"][posy="0"]');
    hex.scrollIntoView({
        behavior: behaviour,
        block: 'center',
        inline: 'center'
    });
}
function bindHexes(){
    var rows = document.querySelectorAll('row');
    var currentRowIndex = Math.floor(rows.length/2) - rows.length;
    rows.forEach(row => {
        var hexes = row.querySelectorAll('hex');
        var currentHexIndex = Math.floor(hexes.length/2) - hexes.length;
        hexes.forEach(hex => {
            currentHexIndex++;
            hex.setAttribute("posX", currentHexIndex);
            hex.setAttribute("posY", currentRowIndex);
            var hexLambda = (e) => {
                e.stopPropagation();
                onHexSelected(hex);
            };
            hex.removeEventListener('click', hexLambda);
            hex.addEventListener('click', hexLambda);
        }); 
        currentRowIndex++;
    });
}
function onHexSelected(hex){
    deSelectHex();
    selectedHex = hex;
    selectedHex.classList.add("selected");
    showHexDetails(hex);
    centerView('smooth');
}
function deSelectHex(){
    if(!selectedHex) return;
    selectedHexContainer.classList.remove('visible');
    selectedHex.classList.remove("selected");
}
function showHexDetails(hex){
    selectedHexContainer.classList.add('visible');
    var nameInput = selectedHexContainer.querySelector('input[name-input]');
    nameInput.value = hex.getAttribute('name');
    var positionField = selectedHexContainer.querySelector('pos');
    positionField.innerHTML = `${hex.getAttribute('posx')}:${hex.getAttribute('posy')}`;
}
function bindHexDetailsControls(){
    var iconButtons = document.querySelectorAll('icon-img:not(.template)');
    iconButtons.forEach(iconButton => {
        iconButton.addEventListener('click',() => {
            if(!selectedHex) return;
            console.log(iconButton.style);
            selectedHex.setAttribute('icon', iconButton.style.backgroundImage);
            renderHex(selectedHex);   
        });
    });
    var textureButtons = document.querySelectorAll('texture-img:not(.template)');
    textureButtons.forEach(textureButton => {
        textureButton.addEventListener('click',() => {
            if(!selectedHex) return;
            console.log(textureButton.style);
            selectedHex.setAttribute('texture', textureButton.style.backgroundImage);
            renderHex(selectedHex);   
        });
    });
    var nameInput = document.querySelector('input[name-input]');
    nameInput.addEventListener('input',() => {
        if(!selectedHex) return;
        selectedHex.setAttribute('name', nameInput.value);
        renderHex(selectedHex);
    });
}

function renderHex(hex){
    hex.querySelector('name').innerHTML = hex.getAttribute('name');
    renderIcon(hex);
    hex.style.backgroundImage = hex.getAttribute('texture');
}
function renderIcon(hex){
    var icon = hex.getAttribute('icon');
    if (!icon) return;
    var iconContainer = hex.querySelector('icon');
    var shadowContainer = hex.querySelector('shadow');
    iconContainer.style.backgroundImage = icon;
    shadowContainer.style.backgroundImage = icon;
}

function appendAmount(template, container, amount){
    for (let i = 0; i < amount; i++) {
        container.appendChild(cloneTemplate(template));
    }
}
function appendAndPrepend(template, container){
    var top = cloneTemplate(template);
    var bottom = cloneTemplate(template);
    container.appendChild(top);
    container.prepend(bottom);
    return {
        'top':top,
        'bottom':bottom
    }
}
function cloneTemplate(template, container = null){
    var newNode = template.cloneNode(true);
    newNode.removeAttribute("id", "");
    newNode.removeAttribute("class", "");
    if(container) container.appendChild(newNode);
    return newNode;
}
function unloadPage(){ 
    return "You have unsaved changes on this page. Do you want to leave this page and discard your changes or stay on this page?";
}
function bindDataControls(){
    document.querySelector("#export").addEventListener('click', exportData);
    document.querySelector("#import").addEventListener('click', importData);
}
function populateIconControls(){
    getIcons().forEach(icon => {
        var iconElement = cloneTemplate(iconTemplate,iconsContainer);
        iconElement.querySelector("icon-img").style.backgroundImage = `url(img/map/${icon})`;
    });
}
function populateTextureControls(){
    getTextures().forEach(texture => {
        var textureElement = cloneTemplate(textureTemplate,texturesContainer);
        textureElement.querySelector("texture-img").style.backgroundImage = `url(img/map/${texture})`;
    });
}
function exportData(){
    var data = {rows:[]};
    var rows = document.querySelectorAll('row:not(.template)');
    rows.forEach(row => {
        var rowData = {hexes:[]};
        var hexes = row.querySelectorAll('hex');
        hexes.forEach(hex => {
            rowData.hexes.push(getElementData(hex));
        });
        data.rows.push(rowData);
    });
    navigator.clipboard.writeText(JSON.stringify(data));
}
function importData(){
    var data = document.querySelector('#import-data').value;
    data = JSON.parse(data);
    mapContainer.innerHTML = "";
    
    data.rows.forEach(row => {
        var newRow = cloneTemplate(rowTemplate);
        row.hexes.forEach(hex => {
            var newHex = cloneTemplate(hexTemplate);
            newRow.appendChild(newHex);
            setElementData(newHex, hex);
            renderHex(newHex);
        });
        mapContainer.appendChild(newRow);
    });
    bindHexes();
}
function setElementData(element, data){
    for (const [key, value] of Object.entries(data)) {
        element.setAttribute(key,value);
    };
    return data;
}
function getElementData(element){
    var data = {};
    Array.from(element.attributes).forEach(attribute => {
        data[attribute.name] = attribute.value;
    });
    return data;
}
window.onbeforeunload = unloadPage;