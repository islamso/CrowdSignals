'use strict';

const restful=require('node-restful');
let UserSchema=require('../schemas/user-schema.js');

let UserModel=restful.model('User', UserSchema);

module.exports=UserModel;
