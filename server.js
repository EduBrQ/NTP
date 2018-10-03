const ntp = require('ntp2');

ntp.time(function (err, time) {
    
    time2 = String(time);
    time3 = String(time2.split('T'));
    time4 = time3.split(' ');
    console.log('HORA NTP :', time4[4]);
});

function ntp2(){
    ntp(function (err, time) {
        if (err) return console.error(err);
        console.log('The network time is :', new Date(time));
        return new Date(time);
    });
}

const server = ntp.createServer(function (msg, response) {
    console.log(msg);
    response();
}).listen(4567, function (err) {

    console.log('server is running at %s', server.address().port);
});