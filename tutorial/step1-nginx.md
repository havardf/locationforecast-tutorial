## Tutorial step 1: Nginx setup
Nginx setup will provide distribution of the web page, and proxy traffic between the web page and https://api.met.no. It will also cache the data from api.met.no for a while.

### Install nginx
Go to http://nginx.org/en/download.html and download the `Stable version` of nginx for windows.

Open a shell and go to your download directory and do the following:
```
unzip nginx-1.18.0.zip
cd nginx-1.18.0
```

### Download the entire tutorial repository
```
git clone https://github.com/havardf/locationforecast-tutorial.git
```

### Prepare nginx directories for this tutorial
```
mkdir nginx
mkdir src
```

### Create nginx configuration
The nginx configuration handles both serving of web page files and proxying traffic to api.met.no.

Copy the config file from the locationforecast-tutorial repository:
```
copy locationforecast-tutorial/nginx/nginx.conf nginx/nginx.conf
```

### Create empty index page
Create a new file: `src/index.html`. Write the below in that file, and save.

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


## [Next: Step 2 - create web page](step2-webpage.md)