let number = 6
let element = document.getElementById("description");
for (let i = 0; i < number; i++) {
    var child = i + 1
    console.log("Adding child paragraph " + child)
    const paragraph = document.createElement("p");
    if(child === number) {
        paragraph.innerText = "Este es el último párrafo agregado con JavaScript";
    } else {
        paragraph.innerText = "Este es un párrafo agregado con JavaScript - " + child + "/" + number;
    }
    element.appendChild(paragraph)
}