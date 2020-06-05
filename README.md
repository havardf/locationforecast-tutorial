# Tutorial for using forecast data from api.met.no

## What is this?
This repositority is a tutorial for using https://api.met.no/weatherapi/locationforecast/2.0/documentation to present a weather forecast on a web page. A diagram of the setup is shown below:

The components of this setup are:
- Locationforecast: A web service that gives you a 10-day forecast for any location on earth.
- Nginx: A proxy and a web server for static files.
- Web page: The forecast web page is made with css from https://milligram.io/ and some html and javascript.

The purpose of the tutorial is to learn how to create an application for production usage, that use locationforecast to present weather forecast information.

The next chapters are meant to be done as ordered. Please type in the configuration and code blocks instead of copy-and-paste.

A network diagram of what we are creating here looks like this:

![diagram of locationforecast-tutorial](locationforecast-tutorial.svg)

## Tools needed before starting with the tutorial

### Install git
You will need git to download this repository.

Follow the instructions from here: https://git-scm.com/downloads.


## Start tutorial
Each step in the tutorial has its own markdown file, so you if want to do the tutorial over multiple sessions, you can go directly to the step where you left off.

### Index
 - [Setting up nginx](tutorial/step1-nginx.md)
 - [Create web page](tutorial/step2-webpage.md)
 - [See results](tutorial/step3-finish.md)
