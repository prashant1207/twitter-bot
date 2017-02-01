/*
    DEPENDENCIES
*/
const twitter = require('twitter');
const restHelper = require('request');
var CronJob = require('cron').CronJob;

/*
    API KEYS
*/
const CONSUMER_KEY = '';
const CONSUMER_SECRET = '';
const ACCESS_TOKEN_KEY = '';
const ACCESS_TOKEN_SECRET = '';
const FORISMATIC_API = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

/*
    MESSAGES
*/
const LENGTH_HUGE_ERROR_MESSAGE = 'QUOTE_LENGTH_TOO_BIG';
const TWEET_SUCCESS='TWEET_SUCCESSFULLY_POSTED';
/*
    OBJECTS
*/
var client = new twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token_key: ACCESS_TOKEN_KEY,
    access_token_secret: ACCESS_TOKEN_SECRET
});

/*
    FUNCTIONS
*/

function getNewQuoteAndTweet() {
    restHelper(FORISMATIC_API, function (error, response, body) {
        try {
            if (!error && response.statusCode == 200) {
                var qod_data = JSON.parse(body);
                var quote = qod_data.quoteText;
                var author = qod_data.quoteAuthor;
                if (author != null && author.length > 0) {
                    quote =  quote + ' - ' + author;
                }

                log(quote);
                tweet(quote);
            }
            else {
                var errorResult = JSON.stringify(error);
                log(errorResult);
            }
        }
        catch (e) {
            log(e);
        }

    });
}

function tweet(text) {
    if (text.length < 141) {
        client.post('statuses/update',
            { status: text },
            function (error, tweet, response) {
                if (!error) {
                    var tweetResult = JSON.stringify(tweet);
                    log(TWEET_SUCCESS);
                }
                else {
                    var errorResult = JSON.stringify(error);
                    log(errorResult);
                }
            });
    }
    else {
        log(LENGTH_HUGE_ERROR_MESSAGE + ': ' + text);
    }
}

function log(text) {
    var timestamp = Date();
    var logText = timestamp + ' ' + text;
    console.log(logText);
}

/*
    JOB DEFINATIONS
*/

var job = new CronJob({
    cronTime: '00 */10 * * * *',
    onTick: function () {
        getNewQuoteAndTweet();
    },
    start: false,
    timeZone: 'America/Los_Angeles'
});

job.start();