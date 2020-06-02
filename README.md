# Tutorial for using https://api.met.no/weatherapi/locationforecast

## What is this?
This repositority is a tutorial for using https://api.met.no/weatherapi/locationforecast/2.0 to present a weather forecast on a web page. A diagram of the setup is shown below:

The components of this setup are:
- Locationforecast: A web service that gives you a 10-day forecast for any location on earth.
- Nginx: A proxy and a web server for static files.
- Web page: The forecast web page is made with css from https://milligram.io/ and some html and javascript.

The purpose of the tutorial is to learn how to create an application for production usage, that use locationforecast to present weather forecast information.

The next chapters are meant to be done as ordered. Please type in the configuration and code blocks instead of copy-and-paste.

## Tools needed before starting with the tutorial
### Install git
You will need git to download this repository.

Follow the instructions from here: https://git-scm.com/downloads.

## Tutorial step 1: Nginx setup
Nginx setup will provide distribution of the web page, and proxy traffic between the web page and https://api.met.no. It will also cache the data from api.met.no for a while.

### Install nginx
Download nginx for windows from this link: `http://nginx.org/download/nginx-1.18.0.zip`

Open a shell and go to the download directory and do the following:
```
unzip nginx-1.18.0.zip
cd nginx-1.18.0
```

### Prepare nginx directories for this tutorial
```
mkdir tutorial
cd tutorial
mkdir conf
mkdir src
```

### Create nginx configuration
Open your favourite editor and create a new file: `conf/nginx.conf`.

Write the following block into that file. The `#` lines are comments meant to explain the purpose of each block of configuration. 

Please do not copy-paste, as its easier to understand when writing yourself.

```
http {
  include /etc/nginx/mime.types;

  proxy_cache_path /var/tmp/nginx-cache levels=1:2 keys_zone=api_met_no:10m max_size=200m 
                 inactive=120m use_temp_path=off;

  # Configuration needed for requesting data from api.met.no. Used later in the 'location /weatherapi' block.
  upstream api.met.no {
    keepalive 3;

    server api.met.no:443 max_fails=2;
  }
  
  server {
    # Listen for connections on port 9080, e.g http://localhost:9080.
    listen       9080;
    server_name  localhost;
  
    # Index page, e.g http://localhost:9080.
    location / {
        root html/;
        index index.html;
    }

    # Serve static files. All the html, javascript and css we are going to add in this tutorial.
    location ~* \.(js|css)$ {
      root    /usr/share/nginx/html/;
    }

    # Proxy requests for forecasts to api.met.no. All forecast data seen on the tutorial web page gets requested through the following setup.
    location /weatherapi {
      proxy_cache api_met_no;
      proxy_set_header User-Agent "github.com/havardf/locationforecast-tutorial/0.1 nginx-proxy";
      proxy_set_header Connection "";

      proxy_ssl_session_reuse on;

      proxy_pass      https://api.met.no;
    }
  }
}
```

### Create empty index page
Create a new file: src/index.html. Write the below in that file, and save.

```
<html lang="en">
    <body>
        <h1>Weather in Malawi</h1>
    </body>
</html>
```

### Start/stop nginx
```
start nginx -p ./ -c ./nginx/nginx.conf
```

### Test nginx setup
Open your favourite browser and go to `http://localhost:9080`. If you now see a web page with the text `Weather in Malawi`, everything should be working ok so far! Great!

## Tutorial step 2: Web page
Now we are going to create a simple web page that presents weather forecast from a few cities in Malawi. The forecast comes from the web service https://api.met.no/weatherapi/locationforecast/2.0.

### Download the entire tutorial repository
```
git clone https://github.com/havardf/locationforecast-tutorial.git
```

### Copy css
This stylesheet setup styles the web page we are going to make. The CSS comes from the following framework: https://milligram.io/.

```
mkdir src/css
copy locationforecast-tutorial/src/css/* src/css/
```

### Create index.html
Now, we are going to create the actual index.html for our forecast web page.

Again, open the src/index.html file in your editor. Delete everyting there, and write in the following:
```
<html lang="en">
    <head>
        <meta charset="utf-8">
        
        <link rel="stylesheet" type="text/css" href="css/normalize.css" />       
        <link rel="stylesheet" type="text/css" href="css/milligram.min.css" />
        <script src="createHTMLTable.js"></script>
        <script src="weatherforecast.js"></script>
        <title>Weather in Lilongwe</title>
    </head>
    <body>
        <h1>Weather in Malawi</h1>
        <div id="places"></div>
        <div id="weatherForecast"></div>
    </body>
</html>
```

Now, save that file.

### Javascript 1: Web page createion
Now, it will be the job of the javascript code to generate the forecast presented on the web page. We will not go into the details of the actual HTML generation,
so please just copy over the file that handles all that:
```
copy locationforecast-tutorial/src/createHTMLTable.js src/
``` 

### Javascript 2: Call to locationforecast


### Javascript 2: Present forecast

## Start finished setup
```
docker run --rm --name nginx-locationforecast-tutorial -p 9080:80  -v /home/havardf/git/locationforecast-tutorial/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -v /home/havardf/git/locationforecast-tutorial/src:/usr/share/nginx/html:ro nginx
```
Go to `http://localhost:9080` in your browser.
