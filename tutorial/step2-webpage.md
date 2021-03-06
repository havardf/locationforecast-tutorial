
## Tutorial step 2: Web page
Now we are going to create a simple web page that presents weather forecast from a few cities in Malawi. The forecast comes from the web service https://api.met.no/weatherapi/locationforecast/2.0.


### Copy css
This stylesheet setup styles the web page we are going to make. The CSS comes from the following framework: https://milligram.io/.

Go to `C:\Prog\nginx-<version>` your terminal and run the following commands:
```
cd src
```
```
mkdir css
```
```
cd ..
```
```
copy locationforecast-tutorial-master\src\css\* src\css\
```

### Create index.html
Now, we are going to create the actual index.html for our forecast web page.

Again, open the `src\index.html` file in your editor. Delete everyting thats already in there, and write in the following:
```
<html lang="en">
    <head>
        <meta charset="utf-8">
        
        <link rel="stylesheet" type="text/css" href="css/normalize.css" />       
        <link rel="stylesheet" type="text/css" href="css/milligram.min.css" />
        <script src="createHTMLTable.js"></script>
        <script src="weatherforecast.js"></script>
        <title>Weather in Malawi</title>
    </head>
    <body>
        <h1>Weather in Malawi</h1>
        <div id="places"></div>
        <div id="weatherForecast"></div>
    </body>
</html>
```

Now, save that file.

### Javascript 1: Web page creation
Now, it will be the job of the javascript code to generate the forecast presented on the web page. We will not go into the details of the actual HTML generation,
so please just copy over the file that handles all that:
```
copy locationforecast-tutorial-master\src\createHTMLTable.js src\
``` 

### Javascript 2: Call to locationforecast
So, now we are going to create the javascript code that actually requests data from locationforecast and extracts forecast values from the response.

Open your favourite editor, and create a new file `src\weatherforecast.js`.

First thing to do is to create the objects defining the places we want forecast for. Look at the following block and type it into the top of the file `src\weatherforecast.js`.
```js
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
```

Then, we need to define the parameters we want to display in our forecast. Add the following block:
```js
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
```
`tableName` specifies the human readable text for that parameter. `valueFunction` refers to a function responsible for returning the forecast value for that parameter. We will define those value functions soon.

Now its time to add the function that is responsible for calling the web service and getting back the forecast response. Actually, the function will first contact the nginx proxy and the proxy will send the request on to api.met.no.

```js
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
```
So, this function calls the web service to get a forecast for the given place, and then it will call a function to present that forecast on the web page. But, this will not work unless we first implement the value functions mentioned earlier.

Lets do that now. Each forecast parameter will have its own function. Each function is small, all its doing is finding the value for its parameter inside the forecast json document.

To be a bit more specific, each function is finding a parameter value for a specific time. The forecast is a timeseries. The timeseries consists of an array of forecast times. Each forecast time has all the parameter values for that time.

If you want to look at an example of a complete forecast json respons, you can take a look here: https://api.met.no/weatherapi/locationforecast/2.0?lat=-13.9833&lon=33.7833.

Now, add the following block to your javascript file:
```js
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
```
So, now your `src\weatherforecast.js` file is complete, save and close it and you are ready to run the setup. But before we go and do that, read on for a bit of explanation of how the code extracts values from the forecast json document.

So, e.g, `airTemperature` function simply finds the correct value for a given time by accessing values in a json object. The below block is NOT something you should put into the file, its a snippet of the json response from the forecast, showing how the forecast timeseries is structured:
```json
{
        "time": "2020-06-02T11:00:00Z",
        "data": {
          "instant": {
            "details": {
              "air_pressure_at_sea_level": 1019.5,
              "air_temperature": 24.2,
              "cloud_area_fraction": 0.0,
              "cloud_area_fraction_high": 0.0,
              "cloud_area_fraction_low": 0.0,
              "cloud_area_fraction_medium": 0.0,
              "dew_point_temperature": 8.3,
              "fog_area_fraction": 0.0,
              "relative_humidity": 36.6,
              "ultraviolet_index_clear_sky": 7.4,
              "wind_from_direction": 156.6,
              "wind_speed": 1.9
            }
          },
          "next_1_hours": {
            "summary": {
              "symbol_code": "clearsky_day"
            },
            "details": {
              "precipitation_amount": 0.0
            }
          },
          "next_6_hours": {
            "summary": {
              "symbol_code": "clearsky_day"
            },
            "details": {
              "air_temperature_max": 24.5,
              "air_temperature_min": 17.8,
              "precipitation_amount": 0.0
            }
          }
        }
      }
```

Finally, precipication is handled specially, since the values for precipitation are not for a time instant, but for a period. The period (1 hour, 6 hour) are specified explicitly in the json structure, e.g `next_1_hours`. When the time resolution for the timeseries switches from 1 hour to 6 hour, we must also switch the name of the json attribute we use. If that is not done, you will not get any precipitation values for the second half of the timeseries.

## [Next: Step 3 - see results](step3-finish.md)
## [Previous: Step 1 - setting up nginx](step1-nginx.md)