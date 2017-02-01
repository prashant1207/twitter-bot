#Simple Twitter Bot
NodeJS based cron job application which post on twitter with periodic execution.


Architecturally App first pulls the text, which is to be tweeted, from respective service, which can be DB or REST based API service. Currently we are using [Forismatic](http://forismatic.com/en/), which serves random quotes on every call.

Following are the npm packages which we use in this project,

###request
- Used for calling REST API service, within the node app.
- Works perfectly for GET and POST request

```
npm install request --save 
```
- More at [Github/Request](https://github.com/request/request).

###cron
- Similar to CronTab in UNIX, this to run schedule task for in node environment.
- Supports mulitple type of scheduling configuration.

```
npm install cron --save
```
- More at [Github/Node-Cron](https://github.com/kelektiv/node-cron).

###twitter
- Wrapper client for simplest implementation for twitter in nodejs.
- Easy to use and initilize.

```
npm isntall twitter --save
```
- More at [Github/Twitter](https://github.com/desmondmorris/node-twitter).


##Usage

Restore all the dependencies using,

```
npm install
```
Run the app.js using node.

```
node app.js
```
Preferrably you can also use 'Forever' to run the script on background. Also it respawns the script if incase it crashes and shutdown.

```
forever start app.js
```
--
Connect with me
[@prashant1207](https://twitter.com/prashant1207).