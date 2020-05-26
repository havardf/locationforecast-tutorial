# Tutorial for using https://api.met.no/weatherapi/locationforecast

## What is this?
This repositority is a tutorial for using https://api.met.no/weatherapi/locationforecast/2.0 to present a weather forecast on a web page. A diagram of the setup is shown below:

The components of this setup are:
- Locationforecast: A web service that gives you a 10-day forecast for any location on earth.
- Nginx: A proxy and a web server for static files.
- Web page: The forecast web page is made with css from https://milligram.io/ and some html and javascript.

The purpose of the tutorial is to learn how to create an application for production usage, that use locationforecast to present weather forecast information.

The next chapters are meant to be done as ordered. Please type in the configuration and code blocks instead of copy-and-paste.

## Nginx setup
Nginx setup will provide distribution of the web page, and proxy traffic between the web page and https://api.met.no. It will also cache the data from api.met.no for a while.

```

```

### Create nginx configuration

### Install nginx

### Start/stop nginx

## Web page

### Copy css

### Create index.html

### Javascript 1: Call to locationforecast

### Javascript 2: Present forecast

## Start finished setup
```
docker run --rm --name nginx-locationforecast-tutorial -p 9080:80  -v /home/havardf/git/locationforecast-tutorial/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -v /home/havardf/git/locationforecast-tutorial/src:/usr/share/nginx/html:ro nginx
```
Go to `http://localhost:9080` in your browser.
