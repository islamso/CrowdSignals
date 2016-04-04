'use strict';

const restful=require('node-restful');
let LocationSchema=require('../schemas/location-schema.js');

let LocationModel=restful.model('Location', LocationSchema);

module.exports=LocationModel;
