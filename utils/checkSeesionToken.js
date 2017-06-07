/**
 * Created by simvolice on 20.04.2017 17:57
 */


const config = require('../utils/devConfig');
const AuthService = require('../services/Auth');
const jsonwebtoken = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;

module.exports = {



  checkSeesionToken: function(req, res, next) {






  let SeesionToken = req.body.sessionToken || req.get('sessionToken');


  let userId = jsonwebtoken.verify(SeesionToken, config.SECRETJSONWEBTOKEN);


  AuthService.checkUserById(userId).then(function (result) {





    if (result === null) {

      res.json({"code": "userNotFound"});

    } else {


      next();



    }


  });





}



};