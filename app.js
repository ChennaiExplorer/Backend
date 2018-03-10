"use strict";
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//var mongoose = require("mongoose");
var mysql = require('mysql');
var LTT;
var RT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

LTT = require('./models/localtrain.js');
RT = require('./models/RouteSelection.js');

// Connect to mongoose
// mongoose.connect('mongodb://localhost/chennaiexplorer');
// var db = mongoose.connection;

var con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   port: 3306,
//   database: "chennaiexplorer"
// });

con.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log("Connected");

});

// retrive all staions
app.get('/allstations', function(req, res) {
  con.query('select * from STATIONTABLE', function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

app.get('/allstations/:stnName', function(req, res) {
  con.query('select * from STATIONTABLE where STATIONNAME=?', [req.params.stnName], function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//create new record into mysql database
app.post('/addStations', function(req, res) {
  var postData = req.body;
  con.query('INSERT INTO STATIONTABLE  SET ?', postData, function(error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//get all details between entered stations
app.get('/getFromToStations', function(req, res) {
  var fromStn = req.query.fromStn;
  var toStn = req.query.toStn;
  console.log(fromStn, toStn);
  var fromRouteID, toRouteID, viaRoute, fromStnID, toStnID;
  con.query('select ROUTEID,STATIONID from STATIONTABLE where STATIONNAME=?', [fromStn],
    function(error, results, fields) {
      if (error) {
        console.log('error ', error);
        throw error;
      }
      fromRouteID = results[1];
      fromStnID = results[2]
    });

  con.query('select ROUTEID,STATIONID from STATIONTABLE where STATIONNAME=?', [toStn],
    function(error, results, fields) {
      if (error) {
        console.log('error ', error);
        throw error;
        toRouteID = results[1];
        toStnID = results[2]
      }
    });

  if (fromRouteID == toRouteID) {
    if (fromStnID > toStnID) {
      con.query('select DownRoute,routeline from routetale where routeid=?', [toStn],
        function(error, results, fields) {
          if (error) {
            console.log('error ', error);
            throw error;
            viaRoute = results[1];
            rouetLine = results[2];
          }
        });
    }
  }
  res.end("test");
});


app.post('/', function(req, res) {
  res.send("Welcome to Chennai Explorer");
});

// Add LTT timings
// app.post('/api/localtraindata', function(req, res) {
//   var ltt = req.body
//   LTT.saveOnDB(ltt, function(err, ltt) {
//     if (err)
//       throw err;
//     res.json(ltt);
//
//   });
// });
//
//
// // Add Route Table data
// app.post('/api/routetabledata', function(req, res) {
//   console.log("test");
//   var rt = req.body
//   RT.saveOnDB(rt, function(err, rt) {
//     if (err)
//       throw err;
//     res.json(rt);
//
//   });
// });
//
//
// // Get Train data
// app.get('/api/traindata', function(req, res) {
//   LTT.getTrainData(function(err, ltt) {
//     if (err)
//       throw err
//     res.json(ltt);
//   })
// });
//
// // Get Route Table Tata
// app.get('/api/getRouteTableData', function(req, res) {
//   RT.getRouteTableData(function(err, rt) {
//     if (err)
//       throw err
//     res.json(rt);
//   });
// })
//
// // Source and Destination
//
// app.post('/api/depArr', function(req, res) {
//   console.log("Got response", res.stausCode)
//   var ltt = req.body
//   // LTT.depArr(ltt,function(err,ltt){
//   //   if(err)
//   //     throw err;
//   res.json(ltt);
//   //
//   // });
// });

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));
console.log("Running on port", app.get('port'));
