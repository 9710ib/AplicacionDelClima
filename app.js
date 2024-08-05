const urlClima= `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = '94c09ac3d46e1f91e6b5e7d548ad285b';
const conversionKelvin = 273.15

document.getElementById('buscar').addEventListener('click',() => {
    const ciudad = document.getElementById('ciudad').value;
    if(ciudad){
        fetchWeather(ciudad)
    
    } else {
        // alert('Ingrese un nombre de ciudad');
        error();
    }
})

function fetchWeather(ciudad) {
    fetch(`${urlClima}?q=${ciudad}&appid=${API_KEY}&lang=es`)
     .then(data => data.json())
     .then(data => mostrarDatosDelClima(data))
}

function mostrarDatosDelClima(data){
    const divRes = document.getElementById('res');
    divRes.innerHTML = '';

    const nombreCiudad = data.name;
    const nombrePais = data.sys.country;
    const temperatura = data.main.temp;
    const humedad = data.main.humidity;
    const descripcionClima = data.weather[0].description;
    const icono = data.weather[0].icon;

    const informacionCiudad= document.createElement('h2');
    informacionCiudad.textContent = `Clima de ${nombreCiudad}, ${nombrePais}`;

    const tempInfo  = document.createElement('p');
     tempInfo.textContent = `Temperatura: ${Math.floor(temperatura - conversionKelvin)}°C`;

     const humedadInfo = document.createElement('p');
     humedadInfo.textContent = `Humedad: ${humedad}%`;

     const iconInfo = document.createElement('img');
     iconInfo.src =`https://openweathermap.org/img/wn/${icono}@2x.png`//ver como poner imagen

     const descriptionInfo= document.createElement('p');
     descriptionInfo.textContent = `Descripción del clima: ${descripcionClima}`;


     divRes.appendChild(informacionCiudad);
     divRes.appendChild(tempInfo);
     divRes.appendChild(humedadInfo);
     divRes.appendChild(iconInfo);
     divRes.appendChild(descriptionInfo);

}


function error (data){
    console.error('Error:', data);
    const divRes = document.getElementById('res');
    divRes.classList.add('error');
     divRes.innerHTML = 'Hubo un error al obtener la información del clima';
}