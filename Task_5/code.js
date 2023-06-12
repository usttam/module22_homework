
const locGeo = document.querySelector('.sent-data__button2');
const sendM = document.querySelector('.sent-data__button1');
const form =  document.querySelector('.sent-data');
const divM = document.querySelector('.message');
const sendData = document.querySelector('.sent-data__input1');


const wsUri = 'wss://socketsbay.com/wss/v2/1/demo/';

let websocket; 
  
startWeb();

form.addEventListener("submit", (e) => {
    e.preventDefault();  //----block form action----    
    
    if (websocket.readyState === 1){
        data = sendData.value.trim();
        websocket.send(data);
        message(`sent >>>>> ${data}`,'seashell'); 
        message (`Resive<<<<: ${data}`,'#0080002b','start');  //imitation recive
    }
    else if (websocket.readyState === 3){
        startWeb();     
        alert ('waiting for connection')    
    } else {
        alert ('Server is busy'); 
    }

       
});

locGeo.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert( 'Geolocation не поддерживается вашим браузером');
    } else {
        //message ('Определение местоположения…');
        navigator.geolocation.getCurrentPosition(success, error);
      
     }

});

const error = () => {
    message('Невозможно получить ваше местоположение');
}
  
  
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;  
    
    if ( websocket.readyState === 1) {
        data = `Широта: ${latitude} °, Долгота: ${longitude} °`;
        message (`sent >>>>> ${data}`,'seashell');        
        websocket.send(data);   
        message (`Resive<<<<: ${data}`,'#0080002b;','start');  //imitation recive
    }
    else {
        alert (`webSocet is not connected, current stsatus is ${websocket.readyState}`)
    }  
  
}
  
const message = (message = '', color = '', position = 'end') =>{
    const p = document.createElement('p');
    p.style = `background : ${color} ; align-self: flex-${position};`;
    p.textContent = message;  
    divM.append(p);    
}

function startWeb(){
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        message("CONNECTED");
    };
    websocket.onclose = function(evt) {
        message("DISCONNECTED");                
    };
    websocket.onmessage = function(evt) {
        message(`Resive<<<<: ${evt.data}`,'#0080002b','start');
    };
    websocket.onerror = function(evt) {
        message(`Error: ${evt.data}`, 'red');    
    };
}

