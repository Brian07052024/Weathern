import { diario } from "./diario.js";

window.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("menu-icon");
    const cityForm = document.getElementById("city-form");

    menuIcon.addEventListener("click", () => {
        cityForm.classList.toggle("hidden");
    });

    const form = document.querySelector("#city-form");
    const inputCity = document.querySelector("#input-city");
    const inputCountry = document.querySelector("#input-country");
    const headerCity = document.querySelector(".text-xl.font-bold");

    let ciudad = "Monterrey";
    let pais = "Mexico";
    const key = "f3315a9684b443abffca01e37b28d6e0";

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

    //Cambiar fondo dependiendo de la hora/clima
    const ahora = new Date();
    const hora = ahora.getHours();
    const week = document.querySelector("#week");
    //iterar horario diario
    const daily = document.querySelector("#horario-diario");
    
    //calls
    cambiarFondoSegunHora(hora);
    iterarSemana(diario)
    consultarAPI();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        ciudad = inputCity.value.trim() || "Monterrey";
        pais = inputCountry.value.trim() || "Mexico";
        consultarAPI();
        if (headerCity) headerCity.textContent = `${ciudad}, ${pais}`;
    });

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

        const videos = {
            Dia: clima => clima === "rain" ? "./assets/videos/rain.mp4" : "./assets/videos/sun.mp4",
            Tarde: clima => clima === "rain" ? "./assets/videos/rain.mp4" : "./assets/videos/sun.mp4",
            Noche: clima => clima === "rain" ? "./assets/videos/rain.mp4" : "./assets/videos/wind.mp4"
        };

        body.classList.add(
            "text-white", "flex", "justify-center", "bg-linear-to-b", "bg-no-repeat", "bg-cover", "h-full",
            ...clases[periodo]
        );

        videoHome.src = videos[periodo](clima);
        videoHome.muted = true;
        videoHome.playsInline = true;
        videoHome.autoplay = true;
        videoHome.loop = true;
        videoHome.load();
    }

    function iterarSemana(diario) {
        diario.forEach(diarioDia => {
            const { diarioHora, diarioImagen } = diarioDia;
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
    };

    async function consultarAPI() {
        // 1. Obtener datos de clima actual (incluye lat/lon correctos)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            if (!resultado.coord) {
                alert('Ciudad o país no encontrados.');
                return;
            }
            const { lat, lon } = resultado.coord;
            // 2. Usar lat/lon para el pronóstico semanal
            const urlHourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
            const respuestaHourly = await fetch(urlHourly);
            const resultadoHourly = await respuestaHourly.json();
            leerDatos(resultado, resultadoHourly);
        } catch (error) {
            console.log(error);
        };
    };

    function leerDatos(resultado, resultadoHourly) {
        const { main, wind, sys } = resultado;
        const [{ description, icon }] = resultado.weather;
        const temperatura = Math.round(main.temp - 273.15);
        const sensacionReal = Math.round(main.feels_like - 273.15);
        const tempMin = Math.round(main.temp_min - 273.15);
        const tempMax = Math.round(main.temp_max - 273.15);
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
        const formatTime = date => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        amanecer.textContent = formatTime(amanecerHora) + "am";
        atardecer.textContent = formatTime(atardecerHora) + "pm";
        const icono = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.src = icono;
        weatherIcon.alt = `Main weather icon`;
        weatherDesc.textContent = description;
        if (description.includes("rain")) {
            cambiarFondoSegunHora(hora, "rain");
        }
        //HOURLY RESULT:
        const { list } = resultadoHourly;

        week.innerHTML = ""; // <-- LIMPIA EL CONTENEDOR ANTES DE AGREGAR NUEVOS DÍAS


        const pronosticosDiarios = list.filter(dia => {
            if (dia.dt_txt.includes("12:00:00")) {
                return true;
            }
        })
        pronosticosDiarios.forEach(lista => {
            const icono = lista.weather[0].icon;
            const iconoURL = `https://openweathermap.org/img/wn/${icono}@2x.png`;
            const dia = lista.dt_txt;
            const nuevoDia = new Date(dia).toLocaleDateString('en-EN', { weekday: 'long' });
            const tempMinima = Math.round((lista.main.temp_min - 273.15));
            const tempMaxima = Math.round((lista.main.temp_max - 273.15));
            const parrafo = document.createElement("P");
            parrafo.classList.add("w-24");
            parrafo.textContent = nuevoDia;
            const divIconos = document.createElement("DIV");
            const rightImage = document.createElement("IMG");
            rightImage.classList.add("w-8")
            rightImage.src = iconoURL;
            rightImage.alt = `Night icon for ${dia}`;
            divIconos.appendChild(rightImage);
            const divTemperaturas = document.createElement("DIV");
            divTemperaturas.classList.add("flex", "gap-4")
            const leftTemp = document.createElement("P");
            leftTemp.textContent = `${tempMaxima}°C`;
            const rightTemp = document.createElement("P");
            rightTemp.textContent = `${tempMinima}°C`
            divTemperaturas.appendChild(leftTemp);
            divTemperaturas.appendChild(rightTemp);
            const divContenedor = document.createElement("DIV");
            divContenedor.classList.add("flex", "justify-between", "mx-4", "my-2", "items-center");
            divContenedor.appendChild(parrafo);
            divContenedor.appendChild(divIconos);
            divContenedor.appendChild(divTemperaturas);
            week.appendChild(divContenedor);
        });
    };
});