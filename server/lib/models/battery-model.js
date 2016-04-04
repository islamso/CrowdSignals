'use strict';

const restful=require('node-restful');
let BatterySchema=require('../schemas/battery-schema.js');

let BatteryModel=restful.model('Battery', BatterySchema);

module.exports=BatteryModel;
