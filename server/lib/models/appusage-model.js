'use strict';

const restful=require('node-restful');
let AppUsageSchema=require('../schemas/appusage-schema.js');

let AppUsageModel=restful.model('AppUsage', AppUsageSchema);

module.exports=AppUsageModel;
