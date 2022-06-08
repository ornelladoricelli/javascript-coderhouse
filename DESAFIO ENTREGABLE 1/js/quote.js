const currentYear = new Date().getFullYear;

function quoteCar() {
    console.log("Cotizando ..... .... ... .... .. . .. ")
    let personAge = document.getElementById("personAge").value
    let carYear = document.getElementById("carYear").value

    if(personAge < 18 || carYear < 1980){
        alert("Either you are too young or your car is too old")
        return false;
    }

    let carBrand = document.getElementById("carBrandSelect").value;

    quoteAllPlans(carBrand, personAge, carYear)

    let quoteSection = document.getElementById("quote")
    quoteSection.style.display = "none";

    let pricingSection = document.getElementById("pricing-div")
    pricingSection.style.display = "block";

    return false;
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
