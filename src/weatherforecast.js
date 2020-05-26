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
        tableName: "Temperature",
        forecastName: "air_temperature"
    },
    {
        tableName: "Wind Speed",
        forecastName: "wind_speed"
    }
];

// 
function weatherForecast(place) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 203) {
            let forecast = JSON.parse(this.responseText);

            weatherTable(places[place].name, forecast);
        }
    };
    xmlhttp.open("GET", places[place].forecastURL, true);
    xmlhttp.send();
}

function weatherTable(place, forecast) {
    let oldweatherForecast = document.getElementById('weatherForecast');
    let weatherForecast = document.createElement("div");
    weatherForecast.setAttribute("id", "weatherForecast");

    let forecastTitle = document.createElement('h2');
    forecastTitle.appendChild(document.createTextNode(place));
    weatherForecast.appendChild(forecastTitle);

    let weatherTable = document.createElement("table");
    let tableHeader = document.createElement('thead');
    tableHeader.appendChild(weatherTableHeaders(forecastParameters));
    weatherTable.appendChild(tableHeader);

    weatherTable.appendChild(weatherTableRows(forecastParameters, forecast));
    weatherForecast.appendChild(weatherTable);
    
    oldweatherForecast.replaceWith(weatherForecast);
}

function weatherTableHeaders(parameters) {
    let tableHeaders = document.createElement('tr');
    let th = document.createElement('th');
    th.appendChild(document.createTextNode("Time in UTC"));
    tableHeaders.appendChild(th);

    parameters.forEach((parameter) => {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(parameter.tableName));
        tableHeaders.appendChild(th);
    })

    return tableHeaders
}

function weatherTableRows(parameters, forecast) {
    let tableBody = document.createElement('tbody');
    forecast.properties.timeseries.forEach((time) => {
        let forecastValues = document.createElement('tr');

        let td = document.createElement('td');
        td.appendChild(document.createTextNode(formatTime(time.time)));
        forecastValues.appendChild(td);

        parameters.forEach((parameter) => {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(time.data.instant.details[parameter.forecastName]));
            forecastValues.appendChild(td);
        });
        tableBody.appendChild(forecastValues)
    });

    return tableBody;
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