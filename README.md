# Tutorial for using forecast data from api.met.no

## What is this?
This repositority is a tutorial for using https://api.met.no/weatherapi/locationforecast/2.0/documentation to present a weather forecast on a web page.

The components of this application are:
- Forecast from api.met.no: A web service that gives you a 10-day forecast for any location on earth.
- Nginx: A proxy and a web server for static files.
- Web page: The forecast web page is made with css from https://milligram.io/ and some html and javascript.

A diagram of the tutorial application looks like this:

![diagram of locationforecast-tutorial](locationforecast-tutorial.svg)


## Start tutorial
Each step in the tutorial is placed in its own file, so you if want to do the tutorial over multiple sessions, you can go directly to the step where you left off.

When you run into a code block, please type in the code, instead of copy-and-paste. That way, its easier to learn what is going on.

### Index
The tutorial is meant to be done in the following order:

 - [Setting up nginx](tutorial/step1-nginx.md)
 - [Create web page](tutorial/step2-webpage.md)
 - [See results](tutorial/step3-finish.md)
