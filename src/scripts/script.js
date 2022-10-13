//Очистка поиска при нажатии
function clearSearch(){
    let val = document.querySelector('.search').value;
    if (val == 'search here' || val == 'искать здесь'){
        document.querySelector('.search').value = '';
    };
}

document.querySelector('.search').onclick = clearSearch;

//Смена языка
const select = document.querySelector('select');
const allLang = ['en', 'ru'];

select.addEventListener('change', changeUrlLanguage);

function changeUrlLanguage(){
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

//Вертим стрелочки в Select
let arrow = document.querySelectorAll('.arrow');

function rotateLangArrow1 (){
    if (arrow[0].classList.contains('rotate')){
        arrow[0].classList.remove('rotate');
    } else {
        arrow[0].classList.add('rotate');
    }
}
function rotateLangArrow2 (){
    if (arrow[1].classList.contains('rotate')){
        arrow[1].classList.remove('rotate');
    } else {
        arrow[1].classList.add('rotate');
    }
}
function rotateLangArrow3 (){
    if (arrow[2].classList.contains('rotate')){
        arrow[2].classList.remove('rotate');
    } else {
        arrow[2].classList.add('rotate');
    }
}
function rotateLangArrow4 (){
    if (arrow[3].classList.contains('rotate')){
        arrow[3].classList.remove('rotate');
    } else {
        arrow[3].classList.add('rotate');
    }
}

document.querySelector('.change_lang').onfocus = rotateLangArrow1;
document.querySelector('.change_lang').onblur = rotateLangArrow1;
document.querySelector('#coldest-warmest').onfocus = rotateLangArrow2;
document.querySelector('#coldest-warmest').onblur = rotateLangArrow2;
document.querySelector('#temp').onfocus = rotateLangArrow3;
document.querySelector('#temp').onblur = rotateLangArrow3;
document.querySelector('#weather').onfocus = rotateLangArrow4;
document.querySelector('#weather').onblur = rotateLangArrow4;


// Меняет язык сайта 
let hash = window.location.hash;
hash = hash.substr(1);
if (!allLang.includes(hash)){
    location.href = window.location.pathname + '#en';
    location.reload();
}
select.value = hash;

function changeLanguage(){
    for (let key in langArr){
        let elem = document.querySelector('.'+ key);
        if(elem.classList.contains('search')) {
            elem.value = langArr[key][hash];
        } else {
            elem.innerHTML = langArr[key][hash];
        }
    }
}
changeLanguage();

function getAllCitiesWeather(){
    // Получаем язык на котором будем выводить

    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=Bishkek&appid=5c32ce994c3668d65bb55ab967a0bf2c&units=metric&lang=${hash}`)
    // .then(function(resp) { return resp.json() }) // Получает от fetch строку и преобразует в массив
    // .then(function (data){
    //     console.log(data);
    //     if (data.weather[0]['icon'] == "01d"){
    //         document.querySelector('.card .icon').innerHTML = `<img src="img/ClearSky.png">`;
    //     } else {
    //         document.querySelector('.card .icon').innerHTML = `<img src="img/Clouds.png">`;
    //     }
        
    //     document.querySelector('.card .city_info').innerHTML = data.name;
    //     document.querySelector('.card .temp').innerHTML = data.main.temp + `&deg;`;
    //     if (hash == 'en') {
    //         document.querySelector('.wind_speed').innerHTML ='Wind Speed : ' + data.wind.speed + ' m/s';
    //         document.querySelector('.weather_type').innerHTML = data.weather[0].description;
    //     } else {
    //         document.querySelector('.wind_speed').innerHTML ='Скорость ветра : ' + data.wind.speed + ' м/с';
    //         document.querySelector('.weather_type').innerHTML = data.weather[0].description;
    //     }
    //     document.querySelector('.time').innerHTML = `GTM : +${data.timezone / 3600}`;
    // })
    // Создаем массив со всеми городами
        for (let i = 0; i < cities.length; i++){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=5c32ce994c3668d65bb55ab967a0bf2c&units=metric&lang=${hash}`)
        .then(function(resp) { return resp.json() }) // Получает от fetch строку и преобразует в массив
        .then(function (data){
            allCities.push([]);
            allCities[i].push(data.name);
            allCities[i].push(data.main.temp);
            allCities[i].push(data.wind.speed);
            allCities[i].push(data.weather[0].description);
            allCities[i].push(data.timezone);
        })
    }
}

console.log(allCities);

getAllCitiesWeather();


function setTheCard1(index){

    if (allCities[index][3] == "clear sky"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/ClearSky.png">`;
    } else if (allCities[index][3] == "few clouds" || allCities[index][3] == "scattered clouds" || allCities[index][3] == "broken clouds"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/Clouds.png">`;
    } else if (allCities[index][3] == "thunderstorm"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/Thunder.png">`;
    } else if (allCities[index][3] == "rain"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/Rain.png">`;
    } else if (allCities[index][3] == "shower rain"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/ShowerRain.png">`;
    } else {
        document.querySelector('.card .icon').innerHTML = `<img src="img/aFewClouds.png">`;
    }
    
    document.querySelector('.card1 .city_info').innerHTML = allCities[index][0];
    document.querySelector('.card1 .temp').innerHTML = allCities[index][1] + ' ' + `&deg;С`;
    if (hash == 'en') {
        document.querySelector('.card1 .wind_speed').innerHTML ='Wind Speed : ' + allCities[index][2] + ' m/s';
        document.querySelector('.card1 .weather_type').innerHTML = allCities[index][3];
    } else if (hash == 'ru') {
        document.querySelector('.card1 .wind_speed').innerHTML ='Скорость ветра : ' + allCities[index][2] + ' м/с';
        document.querySelector('.card1 .weather_type').innerHTML = allCities[index][3];
    }
    document.querySelector('.time').innerHTML = `GTM : +${allCities[index][4] / 3600}`;
}

function searchHere(){
    let searchValue = document.querySelector('.search').value;
    let filteredCities = [];
    for(let i = 0; i < allCities.length; i++){
        if(allCities[i][0] == searchValue ){
            setTheCard1(i);
        }
    }
}
document.querySelector('.search').oninput = searchHere;