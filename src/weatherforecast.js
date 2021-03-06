let places = [
    {
        name: "Lilongwe",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-13.9833&lon=33.7833"
    },
    {
        name: "Blantyre",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-15.786111&lon=35.005833"
    },
    {
        name: "Mzuzu",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-11.45807&lon=34.015131"
    }
];

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


function weatherForecast(place) {
    let url = places[place].forecastURL;
    fetch(url)
        .then( response => {
            if (! response.ok){
                throw new Error("Request failed with status code " + response.status);
            }
            return response.json();
        })
        .then( forecast => {
            createTable(places[place].name, forecast)
        })
        .catch( err => {
            console.log("Request for " + url + "failed.", err)
        });
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
