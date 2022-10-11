fetch('https://api.openweathermap.org/data/2.5/weather?q=Bishkek,kg&appid=5c32ce994c3668d65bb55ab967a0bf2c&units=metric')
    .then(function(resp) { return resp.json() }) // Получает от fetch строку и преобразует в массив
    .then(function (data){
        console.log(data);
        document.querySelector('.card .icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
        document.querySelector('.card .city_info').innerHTML = data.name + ' ' + data.main.temp + `&deg;`;
        document.querySelector('.wind_speed').innerHTML ='wind speed : ' + data.wind.speed + ' m/s';
        document.querySelector('.time').innerHTML = `GTM : +${data.timezone / 3600}`;
        document.querySelector('.weather_type').innerHTML = data.weather[0].main;
    })
    .catch(function (){
        // catch any errors
    }) 


function clearSearch(){
    let val = document.querySelector('.search').value;
    if (val == 'Search Here'){
        document.querySelector('.search').value = '';
    };
}

document.querySelector('.search').onclick = clearSearch;