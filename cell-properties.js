// Storage
let collectedSheetDB = []; // Contains all sheetDB
 let sheetDB = [];
 {
    let addSheetBtn = document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
    
 }
// for(let i = 0; i < rows; i++){
//     let sheetRow = [];
//     for(let j  =0 ; j < cols ; j++){
//         let cellProp = {
//             bold : false,
//             italic:false,
//             underline:false,
//             alignment:"left",
//             fontFamily: "monospace",
//             fontSize: "14",
//             fontColor:"#000000",
//             BGcolor : "#000000", // just for indication purpose
//             value: "",
//             formula:"",
//             children: [],

//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }

//Selector for cell properties

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];


let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//application of twoway binding
//Attach property listeners

bold.addEventListener("click", (e) => {
   let address = addressBar.value;
   let [cell, cellProp] = getCellAndCellProp(address);
   //Modification
    cellProp.bold = !cellProp.bold; // data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";//ui change
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
})
italic.addEventListener("click", (e) => {
   let address = addressBar.value;
   let [cell, cellProp] = getCellAndCellProp(address);
   //Modification
    cellProp.italic = !cellProp.italic; // data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";//ui change
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
})
underline.addEventListener("click", (e) => {
   let address = addressBar.value;
   let [cell, cellProp] = getCellAndCellProp(address);
   //Modification
    cellProp.underline = !cellProp.underline; // data change
    cell.style.textDecoration  = cellProp.underline ? "underline" : "none";//ui change
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
})

fontSize.addEventListener("change", (e) => {
   let address = addressBar.value;
   let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontSize = fontSize.value; //data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})
fontFamily.addEventListener("change", (e) => {
   let address = addressBar.value;
   let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontFamily = fontFamily.value; //data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;
})
fontColor.addEventListener("change", (e) => {
   let address = addressBar.value;
   let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value; //data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
})
BGColor.addEventListener("change", (e) => {
   let address = addressBar.value;
   let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.BGColor = BGColor.value; //data change
    cell.style.backgroundColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; //Data change

        cell.style.textAlign = cellProp.alignment;
        switch(alignValue){ // ui change 
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        
    })
})

let allCells = document.querySelectorAll(".cell");
for(let i =0 ; i < allCells.length ; i++){
    addListenerToAttachCellProperties(allCells[i]);
}
function addListenerToAttachCellProperties(cell){
    //
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRIDCIDFromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // Apply cell properties
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.textDecoration  = cellProp.underline ? "underline" : "none";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGColor;
        cell.style.textAlign = cellProp.alignment;
        
         
        //Apply Properties on UI Props container
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp;
        fontColor.value = cellProp.fontColor;
        BGColor.value = cellProp.BGColor;// == "#000000" ? "transparent": cellProp.BGcolor
        fontSize.value = cellProp.fontSize;
        fontFamily.value = cellProp.fontFamily;

        switch(cellProp.alignment){ // ui change 
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }
        
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    
    
    })
}

 
function getCellAndCellProp(address){
   let [rid, cid] = decodeRIDCIDFromAddress(address);    
    // Access cell and storage
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address){
    // address -> A1
    let rid = Number(address.slice(1)-1); // "1" -> 0
    let cid = Number(address.charCodeAt(0)) - 65 ; // "A" -> 65
    return [rid, cid];
}