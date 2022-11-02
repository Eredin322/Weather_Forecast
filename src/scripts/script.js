//Очистка поиска при нажатии
let defaultSearchValue = document.querySelector('.search').value;
function clearSearch(){
    let val = document.querySelector('.search').value;
    if (val == 'search here' || val == 'искать здесь'){
        document.querySelector('.search').value = '';
    };
}

document.querySelector('.search').onclick = clearSearch;

//Наполнение пустого поиска
function fillSearch(){
    let val = document.querySelector('.search').value;
    if (val == ''){
        document.querySelector('.search').value = defaultSearchValue;
    };
}

document.querySelector('.search').addEventListener("focusout", fillSearch);

// Логика появления крестика
let crossCount = 0;
function crossAppearAndAlarmDissappear(){
    if (crossCount ==  0){
        document.querySelector('.cross').classList.toggle('zeroOpt');
        crossCount++;
    }
    document.querySelector('.alarm').classList.add('zeroOpt');
}

document.querySelector('.search').oninput = crossAppearAndAlarmDissappear;


// Логика работы крестика
function crossClear(){
    document.querySelector('.search').value = '';
    document.querySelector('.cross').classList.toggle('zeroOpt');    
    crossCount--;
}
    
document.querySelector('.cross').onclick = crossClear;

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
// document.querySelector('#weather').onfocus = rotateLangArrow4;
// document.querySelector('#weather').onblur = rotateLangArrow4;


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

let selectedCities = [];
let CityCount = 0;
function getCityWeather(){
    let val = document.querySelector('.search').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=5c32ce994c3668d65bb55ab967a0bf2c&units=metric&lang=${hash}`)
    .then(function(resp) { return resp.json() }) // Получает от fetch строку и преобразует в массив
    .then(function (data){
        selectedCities.push([]);
        selectedCities[CityCount].push(data.name);
        selectedCities[CityCount].push(data.main.temp);
        selectedCities[CityCount].push(data.wind.speed);
        selectedCities[CityCount].push(data.weather[0].description);
        selectedCities[CityCount].push(data.timezone);
        if(selectedCities[CityCount] == undefined){
            document.querySelector('.alarm').classList.remove('zeroOpt');
        } else {
            document.createElement('div').classList.add(`card${CityCount}`);
            console.log(document.createElement('div').classList.add('card'));
            // newCard.innerHTML = '<div class="icon"></div><div class="icon_eclipse"></div><div class="main_info"><span class="city_info"></span><span class="temp"></span></div><div class="wind_speed"></div><div class="time"></div><div class="weather_type"></div>';
            // document.querySelector('.card__container').appendChild(newCard);
        }
        CityCount++;
    })
    console.log(selectedCities);
}
document.querySelector('.search__btn').onclick = getCityWeather;

// Кнопка регистрации
const toggleModal = () => {
    const { classList } = document.body;
    if (classList.contains('open')){
        classList.remove('open');
        classList.add('closed');
    } else {
        classList.remove('closed');
        classList.add('open');
    }
}

document.querySelector('.modal-background').onclick = toggleModal;
document.querySelector('.sign_up').onclick = toggleModal;


function setTheCard(index){

    if (selectedCities[index][3] == "clear sky"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/ClearSky.png">`;
    } else if (selectedCities[index][3] == "few clouds" || selectedCities[index][3] == "scattered clouds" || selectedCities[index][3] == "broken clouds"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/Clouds.png">`;
    } else if (selectedCities[index][3] == "thunderstorm"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/Thunder.png">`;
    } else if (selectedCities[index][3] == "rain"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/Rain.png">`;
    } else if (selectedCities[index][3] == "shower rain"){
        document.querySelector('.card .icon').innerHTML = `<img src="img/ShowerRain.png">`;
    } else {
        document.querySelector('.card .icon').innerHTML = `<img src="img/aFewClouds.png">`;
    }
    
    document.querySelector('.card1 .city_info').innerHTML = selectedCities[index][0];
    document.querySelector('.card1 .temp').innerHTML = selectedCities[index][1] + ' ' + `&deg;С`;
    if (hash == 'en') {
        document.querySelector('.card1 .wind_speed').innerHTML ='Wind Speed : ' + selectedCities[index][2] + ' m/s';
        document.querySelector('.card1 .weather_type').innerHTML = selectedCities[index][3];
    } else if (hash == 'ru') {
        document.querySelector('.card1 .wind_speed').innerHTML ='Скорость ветра : ' + selectedCities[index][2] + ' м/с';
        document.querySelector('.card1 .weather_type').innerHTML = selectedCities[index][3];
    }
    document.querySelector('.time').innerHTML = `GTM : +${selectedCities[index][4] / 3600}`;
}