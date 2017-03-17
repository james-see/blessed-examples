var Promise = require('bluebird');
var redis = require("redis");
Promise.promisifyAll(require("redis"));
var client = redis.createClient(7001,'172.30.40.76');

client.on('connect',function() {
  console.log('connected');
})

// gets the scard of a redis set
var count = function getCount(pset) {
  return client.scardAsync(pset);
}

// mapping of psets onto count function, async
function getCounts() {
  var psets = ["mashers","distillers","caskers","bottlers"]
  var actions = psets.map(count); // run the function over all items.

  // we now have a promises array and we want to wait for it

  var results = Promise.all(actions); // pass array of promises

  results.then(counts =>
      setData(counts)
  );
}

// function to set bar data
function setData(counts) {
  bar.setData({titles: ["mashers","distillers","caskers","bottlers"], data: counts});
  screen.render();
}

// init blessed
var blessed = require('blessed')
 , contrib = require('blessed-contrib')
 , screen = blessed.screen()
, bar = contrib.bar(
   { label: 'EPIC INFO (%)'
   , barWidth: 4
   , barSpacing: 10
   , xOffset: 0
   , maxHeight: 50})
screen.append(bar) //must append before setting data
bar.setData(
   { titles: ["mashers","distillers","caskers","bottlers"]
   , data: [0, 0, 0, 0]})
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
 return process.exit(0);
});

//set interval for updating bar
setInterval(getCounts, 2000)
screen.render()
