window.addEventListener("DOMContentLoaded", () => {

    //section 1
    const celcius = document.querySelector("#celcius");
    const real = document.querySelector("#real");
    const videoHome = document.querySelector("#video-home");

    //section 2
    const minima = document.querySelector("#min");
    const maxima = document.querySelector("#max");

    //section 3
    const humedad = document.querySelector("#humedad");
    //section 4
    const aire = document.querySelector("#aire");
    //section 5
    const sea = document.querySelector("#sea");
    //section 6
    const ground = document.querySelector("#ground");
    //section 7
    const weatherDesc = document.querySelector("#weather-desc");
    //section 8
    const amanecer = document.querySelector("#amanecer");
    //section 9
    const atardecer = document.querySelector("#atardecer");

    const body = document.querySelector("#body");
    const weatherIcon = document.querySelector("#weather-icon");

    //variables para la api
    const pais = "Mexico"
    const ciudad = "Monterrey"
    const estado = "Nuevo Leon"
    const key = "f3315a9684b443abffca01e37b28d6e0";

    //Cambiar fondo dependiendo de la hora/clima
    const ahora = new Date();
    const hora = ahora.getHours();

    //iterar dias de la semana
    const week = document.querySelector("#week");

    //iterar horario diario
    const daily = document.querySelector("#horario-diario");

    const semana = [
        {dia: "Monday", iconoDia: "./assets/SVG/sunny.svg", iconoNoche: "./assets/SVG/moon.svg", tempDia: "29°C", tempNoche: "24°C"},
        {dia: "Tuesday", iconoDia: "./assets/SVG/sunny.svg", iconoNoche: "./assets/SVG/moon.svg", tempDia: "29°C", tempNoche: "24°C"},
        {dia: "Wednesday", iconoDia: "./assets/SVG/sunny.svg", iconoNoche: "./assets/SVG/moon.svg", tempDia: "29°C", tempNoche: "24°C"},
        {dia: "Thursday", iconoDia: "./assets/SVG/sunny.svg", iconoNoche: "./assets/SVG/moon.svg", tempDia: "29°C", tempNoche: "24°C"},
        {dia: "Friday", iconoDia: "./assets/SVG/sunny.svg", iconoNoche: "./assets/SVG/moon.svg", tempDia: "29°C", tempNoche: "24°C"},
        {dia: "Saturday", iconoDia: "./assets/SVG/sunny.svg", iconoNoche: "./assets/SVG/moon.svg", tempDia: "29°C", tempNoche: "24°C"},
        {dia: "Sunday", iconoDia: "./assets/SVG/sunny.svg", iconoNoche: "./assets/SVG/moon.svg", tempDia: "29°C", tempNoche: "24°C"}
    ];

    const diario = [
        {diarioHora: "00:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "01:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "02:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "03:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "04:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "05:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "06:00", diarioImagen: "./assets/SVG/sunrise-fill.svg"},
        {diarioHora: "07:00", diarioImagen: "./assets/SVG/sunrise-fill.svg"},
        {diarioHora: "08:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "09:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "10:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "11:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "12:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "13:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "14:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "15:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "16:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "17:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "18:00", diarioImagen: "./assets/SVG/fat_sunny.svg"},
        {diarioHora: "19:00", diarioImagen: "./assets/SVG/sunset.svg"},
        {diarioHora: "20:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "21:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "22:00", diarioImagen: "./assets/SVG/moon.svg"},
        {diarioHora: "23:00", diarioImagen: "./assets/SVG/moon.svg"},
    ];

    //calls
    cambiarFondoSegunHora(hora);
    iterarSemana(semana, diario)
    consultarAPI();

    function cambiarFondoSegunHora(hora, clima) {
        body.className = "";

        const esDia = hora >= 7 && hora <= 18;
        const esTarde = hora === 19;
        const esNoche = hora >= 20 || hora <= 6;

        let periodo = "";

        if (esDia) periodo = "Dia";
        else if (esTarde) periodo = "Tarde";
        else if (esNoche) periodo = "Noche";

        const esLluvia = clima === "rain";

        const clases = {
            Dia: esLluvia
                ? ["from-lluviaDiaUno", "via-lluviaDiaDos", "to-lluviaDiaCuatro"]
                : ["from-diaUno", "via-diaDos", "to-diaCuatro"],
            Tarde: esLluvia
                ? ["from-lluviaTardeUno", "via-lluviaTardeDos", "to-lluviaTardeCuatro"]
                : ["from-tardeUno", "via-tardeDos", "to-tardeCuatro"],
            Noche: esLluvia
                ? ["from-lluviaNocheUno", "via-lluviaNocheDos", "to-lluviaNocheCuatro"]
                : ["from-nocheUno", "via-nocheDos", "to-nocheCuatro"],
        };

        const iconos = {
            Dia: esLluvia ? "./assets/SVG/rain.svg" : "./assets/SVG/sunny.svg",
            Tarde: esLluvia ? "./assets/SVG/rain.svg" : "./assets/SVG/sunset.svg",
            Noche: esLluvia ? "./assets/SVG/rain.svg" : "./assets/SVG/moon.svg",
        };

        const videos = {
            Dia: clima => clima === "rain" ? "./assets/videos/rain.mp4" : "./assets/videos/sun.mp4",
            Tarde: clima => clima === "rain" ? "./assets/videos/rain.mp4" : "./assets/videos/sun.mp4",
            Noche: clima => clima === "rain" ? "./assets/videos/rain.mp4" : "./assets/videos/wind.mp4"
        };


        body.classList.add(
            "text-white", "flex", "justify-center", "bg-linear-to-b", "bg-no-repeat",  "bg-cover", "h-full",
            ...clases[periodo]
        );

        weatherIcon.src = iconos[periodo];
        weatherIcon.alt = `Main weather icon for ${periodo}`;

        videoHome.src = videos[periodo](clima);
        videoHome.muted = true;
        videoHome.playsInline = true;  // nota la camelCase
        videoHome.autoplay = true;
        videoHome.loop = true;
        videoHome.load(); // Reinicia el video correctamente
        

    }


    function iterarSemana(semana, diario){
        semana.forEach(diaSemana => {
            const {dia, iconoDia, iconoNoche, tempDia, tempNoche} = diaSemana;

            const parrafo = document.createElement("P");
            parrafo.classList.add("w-24");
            parrafo.textContent = dia;

            const divIconos = document.createElement("DIV");
            divIconos.classList.add("flex", "gap-4")

            const leftImage = document.createElement("IMG");
            leftImage.src = iconoDia;
            leftImage.alt = `Day icon for ${dia}`;

            const rightImage = document.createElement("IMG");
            rightImage.src = iconoNoche;
            rightImage.alt = `Night icon for ${dia}`;

            divIconos.appendChild(leftImage);
            divIconos.appendChild(rightImage);

            const divTemperaturas = document.createElement("DIV");
            divTemperaturas.classList.add("flex", "gap-4")
            const leftTemp = document.createElement("P");
            leftTemp.textContent = tempDia
            const rightTemp = document.createElement("P");
            rightTemp.textContent = tempNoche
            divTemperaturas.appendChild(leftTemp);
            divTemperaturas.appendChild(rightTemp);
            
            const divContenedor = document.createElement("DIV");
            divContenedor.classList.add("flex", "justify-between", "mx-4", "my-2");
            
            divContenedor.appendChild(parrafo);
            divContenedor.appendChild(divIconos);
            divContenedor.appendChild(divTemperaturas);

            week.appendChild(divContenedor);
        });

        diario.forEach(diarioDia => {
            const {diarioHora, diarioImagen} = diarioDia;

            const parrafoDiario = document.createElement("P");
            parrafoDiario.textContent = diarioHora;

            const imagenDiario = document.createElement("IMG");
            imagenDiario.src = diarioImagen;
            imagenDiario.alt = `Weather icon at ${diarioHora}`;

            const diarioContenedor = document.createElement("DIV");

            diarioContenedor.classList.add("flex", "flex-col", "items-center", "py-2");
            diarioContenedor.appendChild(parrafoDiario);
            diarioContenedor.appendChild(imagenDiario);

            daily.appendChild(diarioContenedor);
        });
    }

    function consultarAPI(){

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${estado},${pais}&appid=${key}`;

        fetch(url)
        .then(respuesta => {

            return respuesta.json()
        })
        .then(resultado => {

            leerDatos(resultado);
            // console.log(resultado);
        })
    }

    function leerDatos(resultado){
        const {main, wind, sys} = resultado;
        const [{description}] = resultado.weather;
        
        const temperatura = Math.round(main.temp - 273.15);
        const sensacionReal = Math.round(main.feels_like - 273.15);
        const tempMin = Math.round(main.temp_min - 273.15);
        const tempMax = Math.round(main.temp_max - 273.15);
        const apiDesc = description;

        const amanecerHora = new Date(sys.sunrise * 1000)
        

        const atardecerHora = new Date(sys.sunset * 1000)
        
        

        real.textContent = `Thermal sensation: ${sensacionReal}°C`;
        celcius.textContent = `${temperatura}°C`;
        
        minima.textContent = `Minimum: ${tempMin}°C`;
        maxima.textContent = `Maximum: ${tempMax}°C`;

        humedad.textContent = `${main.humidity}%`;
        aire.textContent = `${wind.speed}m/s`;

        sea.textContent = `${main.sea_level} hPa`;
        ground.textContent = `${main.grnd_level} m s. n. m.`;

        amanecer.textContent = `${amanecerHora.getHours()}:${amanecerHora.getMinutes()}am`
        atardecer.textContent = `${atardecerHora.getHours()}:${atardecerHora.getMinutes()}pm`



        weatherDesc.textContent = apiDesc;

        if(description.includes("rain")){
            cambiarFondoSegunHora(hora, "rain");
        }   
    }
})
