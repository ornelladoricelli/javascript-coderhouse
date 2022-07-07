const currentYear = new Date().getFullYear;
let carBrands = ['Ford', 'Fiat', 'Renault', 'Chevrolet', 'Peugeot']
populateCarSelect();

let accessibleMode = false;
setupAccessibleModeButton();
setupStartOverButton()
setupRecoverButton()

class QuoteRequest{
    constructor(personAge, carYear, carBrand){
        this.personAge = personAge;
        this.carYear = carYear;
        this.carBrand = carBrand;
    }

    isValidAge() {
        if(this.personAge < 18){
            Swal.fire({
                title: 'Error!',
                text: 'You are too young',
                icon: 'error',
                confirmButtonText: 'Review age'
            })
            return false;
        }
        return true;
    }

    isValidCarYear() {
        if(this.carYear < 1980){
            Swal.fire({
                title: 'Error!',
                text: 'Your car is too old',
                icon: 'error',
                confirmButtonText: 'Review car year'
            })
            return false;
        }
        return true;
    }

    toString(){
        return "Client information: \n" + "age: " + this.personAge + "\ncarYear: " + this.carYear + "\ncarBrandId: " + this.carBrand;
    }

}

function quoteCar() {
    console.log("Quote in progress ..... .... ... .... .. . .. ")
    let request = 
    new QuoteRequest(
        document.getElementById("personAge").value,
        document.getElementById("carYear").value,
        getCarBrandValue()
        )
    
    if(!request.isValidAge() || !request.isValidCarYear()){
        //exit method
        return false;
    }
    window.localStorage.setItem("quoteRequest", JSON.stringify(request))
    console.log(request.toString())
    
    quoteAllPlans(request, 0)

    changeDisplayByElementId("quote", "none")
    changeDisplayByElementId("header", "none")
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

function quoteAllPlans(quoteRequest, discount){
    let basePrice = getQuote(quoteRequest.carBrand, quoteRequest.personAge, quoteRequest.carYear); 
    if(discount !== 0){
      basePrice = basePrice * (1 - discount);
    }
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

function setupAccessibleModeButton(){
    let button = document.getElementById("acc-mode");
    button.onclick = () => accessibleModeAction() ;
}

function setupStartOverButton(){
    window.sessionStorage.setItem('showDiscount', true)
    let button = document.getElementById("start-over");
    button.onmouseover = () => discountAction()
    button.onclick = () => startOverAction();
}

function setupRecoverButton() {
    let button = document.getElementById("recover-quote");
    if(window.localStorage.getItem("quoteRequest") == null) {
        button.style.display = "none"
    }
    button.onclick = () => recoverAction(0);
}

function accessibleModeAction(){
    if (!accessibleMode){
        accessibleMode = true;
        document.body.style.fontSize = "1.5em"

    } else {
        accessibleMode = false;
        document.body.style.fontSize = "1em"
    }
}

function startOverAction() {
    window.localStorage.removeItem("quoteRequest");
    window.location.href = "index.html"
}

function discountAction(){
    if("true" == window.sessionStorage.getItem('showDiscount')) {
        Toastify({
            text: 'Do not lose this oportunity, buy now with 15% off in all plans. Click to apply discounts',
            duration: 5000,
            position: "center",
            gravity: "top",
            stopOnFocus: true,
            close: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)"
            },
            onClick: () => recoverAction(0.15)
        }
        ).showToast();
        window.sessionStorage.setItem('showDiscount', false)
    }
}

function recoverAction(discount) {
    let recoveredQuoteRequest = window.localStorage.getItem("quoteRequest")
    quoteAllPlans(JSON.parse(recoveredQuoteRequest), discount)
    changeDisplayByElementId("quote", "none")
    changeDisplayByElementId("header", "none")
    changeDisplayByElementId("pricing-div", "block")
}