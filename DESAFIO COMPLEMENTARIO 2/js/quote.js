const currentYear = new Date().getFullYear;
let carBrands = ['Ford', 'Fiat', 'Renault', 'Chevrolet', 'Peugeot']

populateCarSelect();

function quoteCar() {
    console.log("Quote in progress ..... .... ... .... .. . .. ")
    let personAge = document.getElementById("personAge").value
    let carYear = document.getElementById("carYear").value

    if(personAge < 18 || carYear < 1980){
        alert("Either you are too young or your car is too old")
        return false;
    }

    let carBrand = getCarBrandValue()

    console.log(
        "Client information: \n" 
        + "age: " + personAge 
        + "\ncarYear: " + carYear
        + "\ncarBrandId: " + carBrand)

    quoteAllPlans(carBrand, personAge, carYear)

    changeDisplayByElementId("quote", "none")
    changeDisplayByElementId("pricing-div", "block")

    return false;
}

function getCarBrandValue() {
    let carBrand = document.getElementById("carBrandSelect").value;

    if (carBrand == carBrands.length + 1) {
        let otherCarBrand = document.getElementById("otherBrand").value
        if(!carBrands.includes(otherCarBrand)) {
            carBrands.push(otherCarBrand)
            console.log("New car brand added to list, output:\n" + carBrands)
        } 
        carBrand = carBrands.indexOf(otherCarBrand)
    }

    return carBrand
}

function getQuote(carBrand, personAge, carYear) {
    let price = 0;

    if (personAge > 40){
        price += 10
    } else {
        price += 20
    }

    switch (carBrand) {
        case 1:
        case 2:
            price += 2
            break;
        case 3:
            price += 4
            break;
        case 4:
        case 5:
            price += 6
            break;
        default:
            price += 8     
    }

    let carAge = currentYear - carYear;

    if(carAge > 20) {
        price = price * 1.15
    } else if (carAge <= 20 && carAge > 10) {
        price = price * 1.1
    } else {
        price = price * 1.05
    }

    return price;
}

function showPrice(price, elementId){
    document.getElementById(elementId).textContent = Math.trunc(price);
}

function quoteAllPlans(carBrand, personAge, carYear){
    let basePrice = getQuote(carBrand, personAge, carYear);
    showPrice(basePrice, "liability-price");
    let crashPrice = basePrice * 1.38;
    showPrice(crashPrice, "basic-price")
    let fullPrice = basePrice * 1.67;
    showPrice(fullPrice, "full-price")
}

function populateCarSelect(){
    let carBrandSelect = document.getElementById("carBrandSelect");
    for(i = 0; i < carBrands.length; i++){
        let carOption = new Option(carBrands[i], i+1)
        carBrandSelect.options.add(carOption)
    }
    let otherOption = new Option('Other', carBrands.length + 1)
    carBrandSelect.options.add(otherOption)
}

function evaluateSelectValue(){
    let carBrandSelect = document.getElementById("carBrandSelect");
    if(carBrandSelect.options[carBrandSelect.selectedIndex].label === 'Other'){
        changeDisplayByElementId("otherBrandDiv","block")
    } else {
        changeDisplayByElementId("otherBrandDiv","none")
    }
}

function changeDisplayByElementId(elementId, value) {
    let element = document.getElementById(elementId)
    element.style.display = value;
}
