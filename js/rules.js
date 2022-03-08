document.onreadystatechange = function () {
    if (document.readyState != "complete") return;
    document.querySelectorAll("info-list:not(.no-roll)").forEach(list => {
        const row = list.querySelector('info-row:first-child');
        const rows = list.querySelectorAll('info-row');
        const button = document.createElement("button");
        const buttonContent = document.createTextNode("Roll");
        button.appendChild(buttonContent);
        row.appendChild(button);
        button.onclick = () => {
            rollList(rows);
        } 
    });
    const bgRows = document.querySelectorAll('.backgrounds-container info-row');
    const bgButton = document.querySelector("#bg-roll");
    bgButton.onclick = () => {
        rollList(bgRows);
    } 
};
function rollList(rows){
    rows.forEach(r => {
        r.classList.remove("result");
    });
    const dieRoll = Math.floor(Math.random() * rows.length);
    rows[dieRoll].classList.add("result");
    rows[dieRoll].scrollIntoView({
        behavior: 'smooth', // Defines the transition animation. default: auto
        block: 'center', // Defines vertical alignment. default: start
    });
}