var net = require('net');
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
Reset = "\x1b[0m"
const ntp = require('ntp2');

var client = new net.Socket();
client.connect(1700, '192.168.0.125', function () {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
});

servidorNTP();

client.on('data', function (raw) {
    // console.log('DATA1: ' + raw);
    //client.destroy(); // kill client after server's response

    const nmea = require('node-nmea')

    const raww = String(raw);

    // const raw = '$GPRMC,194059,A,0716.0461,S,03553.2110,W,000.0,342.9,021018,022.2,W*6E'

    const raw2 = raww.split(',');

    const raw3 = '$GPGGA,' + raw2[1] + '.000,5058.7457,N,00647.0514,E,2,06,1.7,109.0,M,47.6,M,1.5,0000*71'

    const data = nmea.parse(raw3)



    // console.log(JSON.stringify(data, null, 2))

    data.valid // true
    data.raw // '$GPRMC,161006.425,A,7855.6020,S,13843.8900,E,154.89,84.62,110715,173.1,W,A*30'
    data.type // 'RMC'
    data.gps // true
    data.datetime // Sat Jul 11 2015 13:10:06 GMT-0300 (CLT)
    data.loc // { geojson: { type: 'Point', coordinates: [ 138.7315, -78.9267 ] }, dmm: { latitude: '7855.6020,S', longitude: '13843.8900,E' } }
    data.speed // { knots: 154.89, kmh: 286.85627999999997 }
    data.track // '84.62'
    data.magneticVariation // '173.1,W'
    data.mode // 'Autonomous'

    // console.log('Data2: ', data.datetime);
    
    ntp.time(function (err, time) {

        datetime2 = String(data.datetime);
        datetime3 = datetime2.split(' ');
        timeHMS = String(datetime3[4]);
        timeHMSD = timeHMS.split(':');

        // console.log(' ******************************')
        // console.log(' ***', 'Hora do GPS: ', timeHMS, '***');
        // console.log(' ***', 'Hora do  PC: ', getDateTime(), '***')

        time2 = time;
        time = String(time);
        time = String(time.split('T'));
        time = time.split(' ');
        //console.log(' ***', 'Hora do NTP: ', time[4], '***');
        //console.log(' ##############################')
        horaServer = ('***** GPS: ' + datetime2);
        //console.log(' ****', '- DATETIME SERVER -', '*****');
        //console.log(' *-', time2, '-*')


        //console.log(' ******************************')

        // comparaHora();
        //console.log('')

        

        
    });
    // var AlteraHora = CreateObject("WScript.Shell")

    // // 'Atribui o comando que está entre aspas em StringHora'
    // var StringHora = "net time \\192.168.0.1 /set /yes"

    // // 'Executa o objeto AlteraHora com parametro (StringHora)
    // var objexec = AlteraHora.exec(StringHora) 
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return hour + ":" + min + ":" + sec;

}


// sleep time expects milliseconds
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function comparaHora() {
    hora = getDateTime();
    hora = hora.split(':')
    // console.log(hora[1], timeHMSD[1], hora[0], timeHMSD[0])
    
    if (hora[1] != timeHMSD[1] || hora[0] != timeHMSD[0] ) {
        // console.log(FgRed, 'ATUALIZANDO HORA DO PC ...')
    } else {
        // console.log(FgGreen, 'HORA DO PC JA ESTA ATUALIZADA');
    }
    // console.log(Reset, ' ')
}

// client.on('close', function () {
//     console.log('Connection closed');
// });

function servidorNTP(){
    

    const server = ntp.createServer(function (msg, time2) {
        console.log(msg);
        time2;
    }).listen(4567, function (err, time2) {
        console.log('##### SERVIDOR NTP ##### PORTA: %s', server.address().port);
        new Date(time2);
    });
    // ntp(function (err, time2) {
    //     if (err) return console.error(err);
    //     console.log('The network time is :', new Date(time2));
    // });

    
}

