function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var redis = require("redis");
var client = redis.createClient(7001,'172.30.40.76');

client.on('connect',function() {
  console.log('connected');
})

//client.set('normal','key');

client.scard('caskers', function(err,reply){
  console.log(reply);

})

function getit(typeofprocess, callback) {
	client.scard(typeofprocess, function(err,reply){
  console.log(reply);
  return callback(reply);
});
  
}
	//sleep(2000);
  //var mashers = '';
  //var distillers = '';
  //  mashers = getit('masher_active_sets')
   // distillers = getit('current_managers');
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
       { titles: ['mashers', 'distillers']
       , data: [1, 1]})
   screen.key(['escape', 'q', 'C-c'], function(ch, key) {
     return process.exit(0);
   });
var mashh = '' 
function fillBar() {  
    getit('testers',function(response){
    // Here you have access to your variable
    console.log(response)
    mashh = response;
        bar.setData(
       { titles: ['mashers', 'distillers']
       , data: [mashh, mashh]})
        screen.render()
      
    })
  }
setInterval(fillBar, 2000)
screen.render()
