document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        createPlaces(places);
    }
};

function createPlaces(places) {
    let placeButtons = document.getElementById('places');

    places.forEach((place, index) => {
        let placeButton = document.createElement('button');
        placeButton.classname = "button";
        placeButton.onclick = function () { weatherForecast(index) };
        placeButton.appendChild(document.createTextNode(place.name));

        placeButtons.appendChild(placeButton);
    })
}

function createTable(place, forecast) {
    let oldweatherForecast = document.getElementById('weatherForecast');
    let weatherForecast = document.createElement("div");
    weatherForecast.setAttribute("id", "weatherForecast");

    let forecastTitle = document.createElement('h2');
    forecastTitle.appendChild(document.createTextNode(place));
    weatherForecast.appendChild(forecastTitle);

    let weatherTable = document.createElement("table");
    let tableHeader = document.createElement('thead');
    tableHeader.appendChild(tableHeaders(forecastParameters));
    weatherTable.appendChild(tableHeader);

    weatherTable.appendChild(tableRows(forecastParameters, forecast));
    weatherForecast.appendChild(weatherTable);
    
    oldweatherForecast.replaceWith(weatherForecast);
}

function tableHeaders(parameters) {
    let tableHeaders = document.createElement('tr');
    let th = document.createElement('th');
    th.appendChild(document.createTextNode("Time (UTC)"));
    tableHeaders.appendChild(th);

    parameters.forEach((parameter) => {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(parameter.tableName));
        tableHeaders.appendChild(th);
    })

    return tableHeaders
}

function tableRows(parameters, forecast) {
    let tableBody = document.createElement('tbody');
    forecast.properties.timeseries.forEach((time) => {
        let forecastValues = document.createElement('tr');

        let td = document.createElement('td');
        td.appendChild(document.createTextNode(formatTime(time.time)));
        forecastValues.appendChild(td);

        parameters.forEach((parameter) => {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(parameter.valueFunction(time)));
            forecastValues.appendChild(td);
        });
        tableBody.appendChild(forecastValues)
    });

    return tableBody;
}
