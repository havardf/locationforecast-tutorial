## Tutorial step 1: Nginx setup
Nginx setup will provide distribution of the web page, and proxy traffic between the web page and https://api.met.no. It will also cache the data from api.met.no for a while.

### Install nginx
Go to http://nginx.org/en/download.html and download the `Stable version` of nginx for windows.

Now, open a terminal/shell/windows powershell and do the folowing:
```
cd <you download directory>
```
```
unzip nginx-<version>.zip
```
```
mv nginx-<version> C:\Prog
```
```
cd C:\Prog\nginx-<version>
```

### Download the entire tutorial repository
Go to https://github.com/havardf/locationforecast-tutorial. Click on `Clone or download` and chose the option `Download ZIP`.

Now, decompress and move the tutorial repository to the correct directory:

```
cd <your download directory>
```
```
unzip locationforecast-tutorial-master.zip
```
```
mv locationforecast-tutorial-master C:\Prog\nginx-<version>
```

### Prepare nginx directories for this tutorial
Make sure your current directory are `C:\Prog\nginx-<version>` and do:

```
mkdir nginx
```
```
mkdir src
```

### Create nginx configuration
The nginx configuration handles both serving of web page files and proxying traffic to api.met.no.

Copy the config file from the locationforecast-tutorial-master repository:
```
copy locationforecast-tutorial-master\nginx\nginx.conf nginx\nginx.conf
```

### Create empty index page
Open your favourite code editor(brackets, notepad, vscode etc.) and create a new file `C:\Prog\nginx-<version>\src\index.html`. Write the below in that file, and save.

```
<html lang="en">
    <body>
        <h1>Weather in Malawi</h1>
    </body>
</html>
```

### Start/stop nginx
Make sure your terminal window is in directory `C:\Prog\nginx-<version>`
```
nginx -p .\ -c nginx\nginx.conf
```

When you have tested and wants to stop nginx again, you can type `Ctrl-C` in the terminal.

### Test nginx setup
Open your favourite browser and go to `http://localhost:9080`. If you now see a web page with the text `Weather in Malawi`, everything should be working ok so far! Great!


## [Next: Step 2 - create web page](step2-webpage.md)