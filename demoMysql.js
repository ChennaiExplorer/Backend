var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"

});
//
// con.connect(function(err) {
//   if(err) throw err;
//   console.log("Connected");
//
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE sampledb", function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });
});
