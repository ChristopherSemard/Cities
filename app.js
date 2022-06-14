let selectContinent = document.querySelector("#select-continent");
let selectCountry = document.querySelector("#select-country");
let citiesList = document.querySelector(".cities-list");
let cities;
let countries;

startApp();

async function startApp() {
    selectCountry.style.display = "none";
    cities = await getCities();
    countries = getCountries(cities);
}

selectContinent.addEventListener("change", (e) => {
    injectSelect(countries, selectCountry, e.target.value);
});

selectCountry.addEventListener("change", (e) => {
    displayCities(e.target.value);
});

function injectSelect(values, select, selectedValue) {
    // Supprimer l'ancienne recherche
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    // Ajout de l'option par défaut
    let baseOption = document.createElement("option");
    baseOption.textContent = "Choose a country";
    baseOption.setAttribute("selected", true);
    select.appendChild(baseOption);
    // Ajout des pays
    for (const value of values) {
        if (selectedValue === value.continent) {
            let option = document.createElement("option");
            option.textContent = value.country;
            option.value = value.country;
            select.appendChild(option);
            select.style.display = "block";
        }
    }
}

async function getCities() {
    let returnData;
    await fetch(`./cities.json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            returnData = data;
        });
    return returnData;
}

function getCountries(cities) {
    let countries = [];
    let alreadyInCountries = [];
    for (const city of cities) {
        if (!alreadyInCountries.includes(city.countrycode.name)) {
            countries.push({
                country: city.countrycode.name,
                continent: city.countrycode.continent,
            });
            alreadyInCountries.push(city.countrycode.name);
        }
    }
    countries.sort(function (a, b) {
        return a.country.localeCompare(b.country);
    });
    return countries;
}
function displayCities(value) {
    while (citiesList.firstChild) {
        citiesList.removeChild(citiesList.firstChild);
    }
    for (const city of cities) {
        if (city.countrycode.name == value) {
            newCity = document.createElement("p");
            newCity.textContent = city.name;
            citiesList.appendChild(newCity);
        }
    }
}
