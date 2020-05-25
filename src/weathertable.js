var places = {
    "lilongwe": {
        name: "Lilongwe",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-13.9833&lon=33.7833"
        },
    "blantyre": {
        name: "Blantyre",
        forecastURL: "/weatherapi/locationforecast/2.0?lat=-15.786111&lon=35.005833"
        }
    }

function weatherForecast(place) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 203) {
            var forecast = JSON.parse(this.responseText);
    
            weatherTable(places[place].name, forecast);
        }
    };
    xmlhttp.open("GET", places[place].forecastURL, true);
    xmlhttp.send();
}

function weatherTable(place, forecast) {
    var initalweatherTable = document.getElementById('weatherTable');
    var weatherTable = document.createElement("table");
    weatherTable.setAttribute("id", "weatherTable");

    var tableCaption = document.createElement('caption');
    tableCaption.appendChild(document.createTextNode(place));
    weatherTable.appendChild(tableCaption);

    var parameters = [
        {
            tableName: "Temperature",
            forecastName: "air_temperature"
        },
        {
            tableName: "Wind Speed",
            forecastName: "wind_speed"
        }
    ];

    var tableHeader = document.createElement('thead');
    tableHeader.appendChild(weatherTableHeaders(parameters));
    weatherTable.appendChild(tableHeader);

    weatherTable.appendChild(weatherTableRows(parameters, forecast));

    initalweatherTable.replaceWith(weatherTable);
}

function weatherTableHeaders(parameters) {
    var tableHeaders = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode("Time"));
    tableHeaders.appendChild(th);

    parameters.forEach((parameter) => {
        var th = document.createElement('th');
        th.appendChild(document.createTextNode(parameter.tableName));
        tableHeaders.appendChild(th);
    })

    return tableHeaders
}

function weatherTableRows(parameters, forecast) {
    var tableBody = document.createElement('tbody');
    forecast.properties.timeseries.forEach((time) => {
        var forecastValues = document.createElement('tr');
 
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(formatTime(time.time)));
        forecastValues.appendChild(td);
        
        parameters.forEach((parameter) => {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(time.data.instant.details[parameter.forecastName]));
            forecastValues.appendChild(td);
        });
        tableBody.appendChild(forecastValues)
    });

    return tableBody;
}


function formatTime(timestamp) {
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
      ];
    
    var time = new Date(timestamp);

    var formattedTime = "" + daysOfWeek[time.getDay()] + ", " + 
                        time.getDate() + " " +  monthNames[time.getMonth()] + ",  " + time.getHours();

    return formattedTime;
}