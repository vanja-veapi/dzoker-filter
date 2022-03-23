const BASE_URL = "./data";
let countriesArr = [];
let citiesArr = [];
let technologiesArr = [];
let usersArr = [];

// cb - Checkbox
let cbCountry = [];
let cbCity = [];
let cbTechnology = [];

window.addEventListener("load", function () {
    fetchData("/countries.json", renderCountries);
});

function fetchData(url, callback, method = "GET") {
    $.ajax({
        url: BASE_URL + url,
        method,
        dataType: "json",
        success: function (data) {
            callback(data);
        }, error: function (xhr) {
            console.log(xhr);
        }
    })
}

function makeInput(item, className) {
    return `<li>
        <input type="checkbox" class="${className}" value="${item.id}"/>
        ${item.name}
    </li>`
}

function renderCountries(countries) {
    const countriesId = document.querySelector("#countries");
    let html = "";
    countriesArr = countries;

    for (let country of countries) {
        html += makeInput(country, "country");
    }

    countriesId.innerHTML = html;
    fetchData("/cities.json", renderCities);
}

function renderCities(cities) {
    const citiesId = document.querySelector("#cities");
    let html = "";
    citiesArr = cities;

    for (let city of cities) {
        html += makeInput(city, "city");
    }

    citiesId.innerHTML = html;
    fetchData("/technologies.json", renderTechnologies);
}
function renderTechnologies(technologies) {
    const technologiesId = document.querySelector("#technologies");
    let html = "";
    technologiesArr = technologies;

    for (let technology of technologies) {
        html += makeInput(technology, "technology");
    }

    technologiesId.innerHTML = html;
    fetchData("/users.json", renderUsers);
}




function makeUser(user) {
    const country = countriesArr.find(country => country.id === user.countryId).name;
    const city = citiesArr.find(city => city.id === user.cityId).name;
    const technology = technologiesArr.find(technology => technology.id === user.technologyId).name;
    return `<div class="user">
        <h2>${user.name}</h2>
        <p>${country}</p>
        <p>${city}</p>
        <p>${technology}</p>
    </div><br/><br/>`
}

function addUser(users) {
    const usersId = document.querySelector("#users");
    let html = "";

    for (let user of users) {
        html += makeUser(user);
    }

    usersId.innerHTML = html;
}

function renderUsers(users) {
    usersArr = users;

    const filteredArray = filtered(usersArr, cbCity, cbCountry, cbTechnology);

    const countries = document.querySelectorAll(".country");
    const cities = document.querySelectorAll(".city");
    const technologies = document.querySelectorAll(".technology");

    //Inital dispaly
    addUser(filteredArray);

    countries.forEach(country => {
        country.addEventListener("change", function () {
            if (this.checked) {
                cbCountry.push(Number(this.value));
            } else {
                let index = cbCountry.indexOf(Number(this.value));
                cbCountry.splice(index, 1);
            }

            const filteredArray = filtered(usersArr, cbCity, cbCountry, cbTechnology);
            addUser(filteredArray)
        })
    })

    cities.forEach(city => {
        city.addEventListener("change", function () {
            if (this.checked) {
                cbCity.push(Number(this.value));
            } else {
                let index = cbCountry.indexOf(Number(this.value));
                cbCity.splice(index, 1);
            }

            const filteredArray = filtered(usersArr, cbCity, cbCountry, cbTechnology);
            addUser(filteredArray)
        })
    })

    technologies.forEach(technology => {
        technology.addEventListener("change", function () {
            if (this.checked) {
                cbTechnology.push(Number(this.value));
            } else {
                let index = cbCountry.indexOf(Number(this.value));
                cbTechnology.splice(index, 1);
            }

            const filteredArray = filtered(usersArr, cbCity, cbCountry, cbTechnology);
            addUser(filteredArray)
        })
    })

}
function filtered(data, cityArr, countryArr, technologyArr) {
    let filtered = data;
    if (countryArr.length !== 0) {
        filtered = filtered.filter(e => countryArr.includes(e.countryId));
    }
    if (cityArr.length !== 0) {
        filtered = filtered.filter(e => cityArr.includes(e.cityId));
    }
    if (technologyArr.length !== 0) {
        filtered = filtered.filter(e => technologyArr.includes(e.technologyId))
    }

    return filtered;
}