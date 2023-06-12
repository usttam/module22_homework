const status = document.querySelector('.status');
const buttonRes = document.querySelector('.j-btn-test1');
const buttonNav = document.querySelector('.j-btn-test2');
const sizeScr = document.querySelector('.size');
const timeZone =  document.querySelector('.time-zone');


buttonRes.addEventListener('click',()=>{
    sizeScr.textContent = getScrRes();

})

buttonNav.addEventListener('click',()=>{
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

})

const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}
  
  
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;  
    status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    fetchJSONData(latitude,longitude);
   
}
  

function getScrRes(){
    return `Ширина экрана : ${window.innerWidth} Высота экрана : ${window.innerHeight}`
}

async function fetchJSONData(latitude ='0',longitude='0') {
    const response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`);
    const jsonData = await response.json();
    timeZone.textContent = `Временная зона : ${jsonData.timezone}, Местные дата и время : ${jsonData. date_time_txt}`;
  } 