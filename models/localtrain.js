"use strict";
var mongoose = require("mongoose");
var mysql = require('mysql');

// Local Train Timings(LTT) schema
var LTTSchema = mongoose.Schema({

    routeID:{
      type:String,
      unique:false,
      required:true,
    },
    deptStn:{
      type:String,
      unique:false,
      required:true
    },
    deptTimeWeekDay:{
      type:String,
      unique:false,
      required:true
    },
    deptTimeWeekEnd:{
      type:String,
      unique:false,
      required:true
    },
    arrStn:{
      type:String,
      unique:false,
      required:true
    },
    arrTimeWeekDay:{
      type:String,
      unique:false,
      required:true
    },
    arrTimeWeekEnd:{
      type:String,
      unique:false,
      required:true
    },
    fastOrSlow:{
      type:String,
      unique:false,
      required:true
    },
    arrPF:{
      type:String,
      unique:false,
      required:true
    },
    depPF:{
      type:String,
      unique:false,
      required:true
    },
    kms:{
      type:String,
      unique:false,
      required:true
    }

});

var LTT = module.exports = mongoose.model('stationroute',LTTSchema);

// Store train data
module.exports.saveOnDB = function(ltt,callback){
  LTT.create(ltt,callback);
}

// Get All stations
module.exports.getTrainData = function(callback,limit){
    LTT.find(callback).limit(limit);

}

module.exports.depArr = function(ltt,callback){

}

// future use
// module.exports.checkAndCreateCollName = function(db,callback,limit){
//   var colName = db.collection('LTT');
//   console.log(colName);
// //   db.listCollections().toArray(function(err, collInfos) {
// //     // collInfos is an array of collection info objects that look like:
// //     // { name: 'test', options: {} }
// // });
//   //console.log(db.connection.listCollections)
//   // mongoose.db.listCollections(function(err, collections){
//   //       console.log(collections);
//   //   });
//
//
// //   db.listCollections().toArray(function(err, collections){
// //
// //   console.log(
// //     collections.map(function(x) {
// //       return x.name.replace(/^([^.]*)./,"");
// //     })
// //   );
// //
// // });
// //
// //   // const collections = db.getCollectionsNames();
// //   //  if (!collections.map(c => c.s.name).includes('LTT')) {
// //   //    db.createCollection(collName);
// //   //     console.log("Collection is Created");
// //   // }
//
// }




/* mongoose.createCollection("LTT",function(err,res){
  console.log("Collection is Created");
  if(err) throw err;
}) */
