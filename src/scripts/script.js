function clearSearch(){
    let val = document.querySelector('.search').value;
    if (val == 'Search Here' || 'search here' || 'искать здесь'){
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

function changeLanguage(){
    let hash = window.location.hash;
    hash = hash.substr(1);
    if (!allLang.includes(hash)){
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select.value = hash;
    document.querySelector('.menu-1').innerHTML = langArr['menu-1'][hash];
    for (let key in langArr){
        let elem = document.querySelector('.'+ key);
        if(elem.classList.contains('search')) {
            elem.value = langArr[key][hash];
        } else {
            elem.innerHTML = langArr[key][hash];
        }
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Bishkek,kg&appid=5c32ce994c3668d65bb55ab967a0bf2c&units=metric&lang=${hash}`)
    .then(function(resp) { return resp.json() }) // Получает от fetch строку и преобразует в массив
    .then(function (data){
        console.log(data);
        if (data.weather[0]['icon'] == "01d"){
            document.querySelector('.card .icon').innerHTML = `<img src="img/ClearSky.png">`;
        } else if (data.weather[0]['icon'] == "02d"){

        }
        
        document.querySelector('.card .city_info').innerHTML = data.name;
        document.querySelector('.card .temp').innerHTML = data.main.temp + `&deg;`;
        if (hash == 'en') {
            document.querySelector('.wind_speed').innerHTML ='Wind Speed : ' + data.wind.speed + ' m/s';
            document.querySelector('.weather_type').innerHTML = data.weather[0].description;
        } else {
            document.querySelector('.wind_speed').innerHTML ='Скорость ветра : ' + data.wind.speed + ' м/с';
            document.querySelector('.weather_type').innerHTML = data.weather[0].description;
        }
        document.querySelector('.time').innerHTML = `GTM : +${data.timezone / 3600}`;
    })
    .catch(function (){
        // catch any errors
    }) 
}

changeLanguage();





function search(){

}
