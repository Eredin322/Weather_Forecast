let crossCount = 0;
const select = document.querySelector('select');
const allLang = ['en', 'ru'];
let arrow = document.querySelectorAll('.arrow');
let hash = window.location.hash;
let selectedCities = [];
let CityCount = 0;

//Очистка поиска при нажатии
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
        document.querySelector('.search').value = langArr.search[window.location.hash.substr(1)];
    };
}

document.querySelector('.search').addEventListener("focusout", fillSearch);

// Логика появления крестика

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
    document.querySelector('.search').focus();
    crossCount--;
}
    
document.querySelector('.cross').onclick = crossClear;

//Смена языка
select.addEventListener('change', changeUrlLanguage);

function changeUrlLanguage(){
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

//Вертим стрелочки в Select


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


// Меняет язык сайта 

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


function getCityWeatherAndAlarmIfWrongCity(){
    let val = document.querySelector('.search').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=5c32ce994c3668d65bb55ab967a0bf2c&units=metric&lang=${hash}`)
    .then(function(resp) { return resp.json() }) // Получает от fetch строку и преобразует в массив
    .then(function (data){
        try{
            console.log(data);
            selectedCities.push([]);
            selectedCities[CityCount].push(data.name);
            selectedCities[CityCount].push(data.main.temp);
            selectedCities[CityCount].push(data.wind.speed);
            selectedCities[CityCount].push(data.weather[0].description);
            selectedCities[CityCount].push(data.timezone);
            cardCreation()
        } catch {
            document.querySelector('.alarm').classList.remove('zeroOpt');
        } finally {
            CityCount++;
        }
    })
    console.log(selectedCities);
}

function cardCreation(){
    let card = document.createElement('div');
    let icon = document.createElement('div');
    let icon_eclipse = document.createElement('div');
    let main_info = document.createElement('div');
    let city_info = document.createElement('div');
    let temp = document.createElement('div');
    let wind_speed = document.createElement('div');
    let weather_type = document.createElement('div');
    let time = document.createElement('div');
    let GTM = document.createElement('div');

    card.classList.add('card');
    icon.classList.add('icon');
    icon_eclipse.classList.add('icon_eclipse');
    main_info.classList.add('main_info');
    city_info.classList.add('city_info');
    temp.classList.add('temp');
    wind_speed.classList.add('wind_speed');
    weather_type.classList.add('weather_type');
    time.classList.add('time');
    GTM.classList.add('GTM');

    card.appendChild(icon);
    card.appendChild(icon_eclipse);
    card.appendChild(main_info);
    main_info.appendChild(city_info);
    main_info.appendChild(temp);
    card.appendChild(wind_speed);
    card.appendChild(weather_type);
    card.appendChild(time);
    card.appendChild(GTM);

    document.querySelector('.card__container').prepend(card);
    fillTheCard(CityCount);
}
document.querySelector('.search__btn').onclick = getCityWeatherAndAlarmIfWrongCity;

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


function fillTheCard(index){
    let today = new Date();
    const hours = today.getUTCHours();
    const minutes = today.getUTCMinutes();
    const seconds = today.getUTCSeconds();
    if(hours + (selectedCities[index][4] / 3600) > 19){
        if (selectedCities[index][3] == "clear sky"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/ClearNight.png">`;
        } else if (selectedCities[index][3] == "overcast clouds" || selectedCities[index][3] == "broken clouds"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/CloudyNight.png">`;
        } else if (selectedCities[index][3] == "few clouds" || selectedCities[index][3] == "scattered clouds"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/FewCloudsNight.png">`;
        } else if (selectedCities[index][3] == "mist"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/MistNight.png">`;
        } else if (selectedCities[index][3] == "rain"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/RainNight.png">`;
        } else if (selectedCities[index][3] == "shower rain"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/ShowerRainNight.png">`;
        } else if (selectedCities[index][3] == "snow"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/snowNight.png">`;
        } else if (selectedCities[index][3] == "thunderstorm"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/ThunderstormNight.png">`;
        } else if (selectedCities[index][3] == "tornado"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/Tornado.png">`;
        } else{
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/AnythingElse.png">`;
        }
    } else {
        if (selectedCities[index][3] == "clear sky"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/ClearDay.png">`;
        } else if (selectedCities[index][3] == "overcast clouds" || selectedCities[index][3] == "broken clouds"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/CloudyDay.png">`;
        } else if (selectedCities[index][3] == "few clouds" || selectedCities[index][3] == "scattered clouds"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/FewCloudsDay.png">`;
        } else if (selectedCities[index][3] == "mist"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/MistDay.png">`;
        } else if (selectedCities[index][3] == "rain"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/RainDay.png">`;
        } else if (selectedCities[index][3] == "shower rain"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/ShowerRainDay.png">`;
        } else if (selectedCities[index][3] == "snow"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/snowDay.png">`;
        } else if (selectedCities[index][3] == "thunderstorm"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/ThunderstormDay.png">`;
        } else if (selectedCities[index][3] == "tornado"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/Tornado.png">`;
        } else{
            document.querySelector('.card .icon').innerHTML = `<img src="img/icons/AnythingElse.png">`;
        }
    }
    
    
    document.querySelector('.card .city_info').innerHTML = selectedCities[index][0];
    document.querySelector('.card .temp').innerHTML = selectedCities[index][1] + ' ' + `&deg;С`;
    if (hash === 'en'){
        document.querySelector('.card .wind_speed').innerHTML = 'Wind Speed : ' + selectedCities[index][2] + ' m/s';
        document.querySelector('.card .time').innerHTML = `Local time: ${hours + (selectedCities[index][4] / 3600)}:${minutes}:${seconds}`;
    } else if (hash === 'ru'){
        document.querySelector('.card .wind_speed').innerHTML = 'Скорость ветра : ' + selectedCities[index][2] + ' m/s';
        document.querySelector('.card .time').innerHTML = `Местное время: ${hours + (selectedCities[index][4] / 3600)}:${minutes}:${seconds}`;
    }
    document.querySelector('.card .weather_type').innerHTML = selectedCities[index][3];

    if (selectedCities[index][4] / 3600 > 0){
        document.querySelector('.GTM').innerHTML = `GTM : +${selectedCities[index][4] / 3600}`;
    } else {
        document.querySelector('.GTM').innerHTML = `GTM : ${selectedCities[index][4] / 3600}`;
    }

}