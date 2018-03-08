"use strict";
var mongoose = require("mongoose");

//Route Table Schema
var rtSchema = mongoose.Schema({

  RouteID:{
    type:String,
    unique:true,
    required:true
  },
  RouteName:{
    type:String,
    unique:false,
    required:true
  },
  RouteLine:{
    type:String,
    unique:false,
    required:true
  }
});

var rtVar = module.exports = mongoose.model('ROUTETABLE',rtSchema);

//Store Route Table data
module.exports.saveOnDB = function(rt,callback){
  rtVar.create(rt,callback);
}

// Get All Route Table Data
module.exports.getRouteTableData = function(rt,callback){
  rtVar.find(rt,callback);
}
