# Here I will be giving a step by step tour on how to get the our online impact index tool running on your own computer.

## This will be a step by step process for going from our source code to testing the application.

## Step 1:

## Install NodeJS

[https://nodejs.org/en/](https://nodejs.org/en/)

Download it, run the installer and on to the next step.

Our server is written in Node JS so this step is required.

## Step 2:

## Grab the source code from our github

Download here: Github: [https://github.com/447578/SSS\_impact\_index\_tool](https://github.com/447578/SSS_impact_index_tool)

Download the master branch and extract the archive.



## Step 3:

## Install Postman or similar software that allows you to send HTTP calls.

[https://www.getpostman.com/](https://www.getpostman.com/)

Install and open it up, requires a google account login.

This step can be skipped if you only wish to open the website version of the tool.

## Step 4:

## Maneuver your command line to the extracted github files then the node\_server folder

Type cd to change directory, example: cd &quot;C:/cool\_files/SSS\_impact\_index\_tool/node\_server&quot; changes directory to node\_server in the folder SSS\_impact\_index\_tool in the folder cool\_files on your C drive.

(use &quot;D:&quot; on a new line to switch to D drive).

## Step 5:

## Type &quot;NPM install&quot; into your command line.

This will install a bunch of NPM packages that are depended on by the server.

If this fails: attempt npm install --global --production windows-build-tools --vs2015

When that also fails: npm install--no-optional

## Step 6:

## Type &quot;NPM run dev&quot; into your command line.

This will run our development script and starts the server.

You can now message with the server and should see &quot;now listening on port 8080 in the command line&quot;

## Step 7:

## Use Postman (or similar) to get the cities in the database.

Send a get call to [http://localhost:8080/api/cities](http://localhost:8080/api/cities) (This can be done through postman or by opening this URL in your browser)

If it has no cities you may instead add a city to the database using postman by sending a POST call to [http://localhost:8080/api/cities/](http://localhost:8080/api/cities/) with a raw JSON body of Amsterdam which will be listed at the end of this guide.

## Step 8:

## Frontend included

Open an insecure chrome window (this is because I cannot get a verified SSL key in time from google and google blocks unverified requests), to do this:

 ![](data:image/*;base64,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)

Copy pasta:

chrome.exe --user-data-dir=&quot;C://Chrome dev session&quot; --disable-web-security

(The website might work on different browsers without this, untested)

## Step 9:

## Opening the website

Navigate to your where you stored the github files locally, open the &#39;web&#39; folder then open the index.html file in the insecure chrome window.

## Amsterdam JSON:
 # Here I will be giving a step by step tour on how to get the our online impact index tool running on your own computer.

## This will be a step by step process for going from our source code to testing the application.

## Step 1:

## Install NodeJS

[https://nodejs.org/en/](https://nodejs.org/en/)

Download it, run the installer and on to the next step.

Our server is written in Node JS so this step is required.

## Step 2:

## Grab the source code from our github

Download here: Github: [https://github.com/447578/SSS\_impact\_index\_tool](https://github.com/447578/SSS_impact_index_tool)

Download the master branch and extract the archive.



## Step 3:

## Install Postman or similar software that allows you to send HTTP calls.

[https://www.getpostman.com/](https://www.getpostman.com/)

Install and open it up, requires a google account login.

This step can be skipped if you only wish to open the website version of the tool.

## Step 4:

## Maneuver your command line to the extracted github files then the node\_server folder

Type cd to change directory, example: cd &quot;C:/cool\_files/SSS\_impact\_index\_tool/node\_server&quot; changes directory to node\_server in the folder SSS\_impact\_index\_tool in the folder cool\_files on your C drive.

(use &quot;D:&quot; on a new line to switch to D drive).

## Step 5:

## Type &quot;NPM install&quot; into your command line.

This will install a bunch of NPM packages that are depended on by the server.

If this fails: attempt npm install --global --production windows-build-tools --vs2015

When that also fails: npm install--no-optional

## Step 6:

## Type &quot;NPM run dev&quot; into your command line.

This will run our development script and starts the server.

You can now message with the server and should see &quot;now listening on port 8080 in the command line&quot;

## Step 7:

## Use Postman (or similar) to get the cities in the database.

Send a get call to [http://localhost:8080/api/cities](http://localhost:8080/api/cities) (This can be done through postman or by opening this URL in your browser)

If it has no cities you may instead add a city to the database using postman by sending a POST call to [http://localhost:8080/api/cities/](http://localhost:8080/api/cities/) with a raw JSON body of Amsterdam which will be listed at the end of this guide.

## Step 8:

## Frontend included

Open an insecure chrome window (this is because I cannot get a verified SSL key in time from google and google blocks unverified requests), to do this:

Copy pasta:

chrome.exe --user-data-dir=&quot;C://Chrome dev session&quot; --disable-web-security

(The website might work on different browsers without this, untested)

## Step 9:

## Opening the website

Navigate to your where you stored the github files locally, open the &#39;web&#39; folder then open the index.html file in the insecure chrome window.

## Amsterdam JSON:


