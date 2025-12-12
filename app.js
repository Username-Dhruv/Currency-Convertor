const Base_URL = "https://api.frankfurter.app/latest?";

const Selects = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");

const FromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");

for(let each of Selects) {
    for (let CurrCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = CurrCode;
        newOption.value = CurrCode;
        if (each.name === "from" && CurrCode === "USD") {
            newOption.selected = "selected";
        } else if (each.name === "to" && CurrCode === "INR") {
            newOption.selected = "selected";
        }
        each.append(newOption);
    }
    each.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let CurrCode = element.value;
    let CountryCode = countryList[CurrCode];
    let newsrc = `https://flagsapi.com/${CountryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async () => { 
    let amount = document.querySelector(".amount input");
    let AmtValue = amount.value;
    if (AmtValue === "" || AmtValue < 1) {
        AmtValue = 1;
        amount.value = 1;
    }
    const URL = `${Base_URL}amount=${AmtValue}&from=${FromCurr.value}&to=${ToCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[ToCurr.value]/AmtValue;
    
    let FinalValue = (AmtValue * rate).toFixed(2)
    msg.innerText = `${AmtValue} ${FromCurr.value} = ${FinalValue} ${ToCurr.value}`;
};

window.addEventListener("load", ()=> {
    updateExchangeRate();
});
