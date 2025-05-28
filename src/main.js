window.addEventListener("DOMContentLoaded", () => {

    //variables globales
    const celcius = document.querySelector("#celcius");
    const real = document.querySelector("#real");
    const minima = document.querySelector("#min");
    const maxima = document.querySelector("#max");
    const weatherDesc = document.querySelector("#weather-desc");
    const body = document.querySelector("#body");
    //variables para la api
    const pais = "Mexico"
    const ciudad = "Monterrey"
    const estado = "Nuevo Leon"
    const key = "f3315a9684b443abffca01e37b28d6e0";
    //Cambiar fondo dependiendo de la hora/clima
    const ahora = new Date();
    const hora = ahora.getHours();

    //calls
    cambiarFondoSegunHora(hora);
    consultarAPI();

    function cambiarFondoSegunHora(hora, clima) {
        body.className = "";
        
        if (hora >= 7 && hora <= 18) {
            if (clima === "rain") {
                body.classList.add("text-white", "flex", "justify-center", "bg-linear-to-b", "h-dvh", "from-lluviaDiaUno", "via-lluviaDiaDos", "to-lluviaDiaCuatro");
            } else {
                body.classList.add("text-white", "flex", "justify-center", "bg-linear-to-b", "h-dvh", "from-diaUno", "via-diaDos", "to-diaCuatro");
            }
        } else if (hora === 19) {
            if (clima === "rain") {
                body.classList.add("text-white", "flex", "justify-center", "bg-linear-to-b", "h-dvh", "from-lluviaTardeUno", "via-lluviaTardeDos", "to-lluviaTardeCuatro");
            } else {
                body.classList.add("text-white", "flex", "justify-center", "bg-linear-to-b", "h-dvh", "from-tardeUno", "via-tardeDos", "to-tardeCuatro");
            }
        } else if ((hora >= 20 || hora <= 6)) {
            if (clima === "rain") {
                body.classList.add("text-white", "flex", "justify-center", "bg-linear-to-b", "h-dvh", "from-lluviaNocheUno", "via-lluviaNocheDos", "to-lluviaNocheCuatro");
            } else {
                body.classList.add("text-white", "flex", "justify-center", "bg-linear-to-b", "h-dvh", "from-nocheUno", "via-nocheDos", "to-nocheCuatro");
            }
        }

    }

    function consultarAPI(){

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${estado},${pais}&appid=${key}`;

        fetch(url)
        .then(respuesta => {

            return respuesta.json()

        })
        .then(resultado => {

            leerDatos(resultado);
        
        })
    }

    function leerDatos(resultado){
        const {main} = resultado;
        const [{description}] = resultado.weather;
        
        const temperatura = Math.round(main.temp - 273.15);
        const sensacionReal = Math.round(main.feels_like - 273.15);
        const tempMin = Math.round(main.temp_min - 273.15);
        const tempMax = Math.round(main.temp_max - 273.15);
        const apiDesc = description;

        celcius.textContent = `${temperatura}°C`;
        real.textContent = `Thermal sensation: ${sensacionReal}°C`;
        minima.textContent = `Minimum: ${tempMin}°C`;
        maxima.textContent = `Maximum: ${tempMax}°C`;
        weatherDesc.textContent = apiDesc;

        if(description.includes("rain")){
            cambiarFondoSegunHora(hora, "rain");
        }

        
        
    }

})
