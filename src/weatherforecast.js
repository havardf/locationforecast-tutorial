let places = {
    "lilongwe": {
        name: "Lilongwe",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-13.9833&lon=33.7833"
    },
    "blantyre": {
        name: "Blantyre",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-15.786111&lon=35.005833"
    },
    "mzuzu": {
        name: "Mzuzu",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-11.45807&lon=34.015131"
    }
};

let forecastParameters = [
    {
        tableName: "Temperature (C)",
        valueFunction: airTemperature
    },
    {
        tableName: "Wind Speed (m/s)",
        valueFunction: windSpeed
    },
    {
        tableName: "Precipitation (mm)",
        valueFunction: precipitation 
    }
];

// 
function weatherForecast(place) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 203) {
            let forecast = JSON.parse(this.responseText);

            createTable(places[place].name, forecast);
        }
    };
    xmlhttp.open("GET", places[place].forecastURL, true);
    xmlhttp.send();
}

function airTemperature(forecastTime) {
    return forecastTime.data.instant.details.air_temperature;
}

function precipitation(forecastTime) {
    if (forecastTime.data.next_1_hours != undefined) {
        return forecastTime.data.next_1_hours.details.precipitation_amount;
    }
    else if (forecastTime.data.next_6_hours != undefined) {
        return forecastTime.data.next_6_hours.details.precipitation_amount;
    }
    else {
        return "";
    }
}

function windSpeed(forecastTime) {
    return forecastTime.data.instant.details.wind_speed;
}

function formatTime(timestamp) {
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    let time = new Date(timestamp);
    let hourOfDay = time.getHours() > 9 ? "" + time.getHours() + ":00": "0" + time.getHours() + ":00"; 
    let formattedTime = "" + daysOfWeek[time.getDay()] + ", " +
        time.getDate() + " " + monthNames[time.getMonth()] + ",  " + hourOfDay;

    return formattedTime;
}
