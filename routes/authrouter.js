const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const url = require('url');
const config = require('../utils/devConfig');
const validator = require('../utils/validator');

const AuthService = require('../services/Auth');





const uuidV4 = require('uuid/v4');


/**
 * тестируем коннект к базе
 */
router.use(function (req, res, next) {

    AuthService.testConnection().then(function (result) {

        if (result.name === "MongoError") {


            res.json(result);


        } else {


            next();


        }


    });


});




/**
 * Идет проверка по токену. Берем из базы и сверяем его.
 */
router.use(function (req, res, next) {


  if (req.method === "GET") {


    next();


  } else {


    let tokenFromClient = req.body.tokenCSRF || req.get('tokenCSRF') || req.query.tokenCSRF;


    AuthService.getCsrfToken(tokenFromClient).then(function (result) {



      if (result !== null && result.tokencsrf === tokenFromClient) {


        next();

      } else {


        res.json({"code": 1});

      }

    });


  }





});



/*
Апи для сохранения токена в базу, он будет дествителен ровно на сутки
для этого в базе надо создать индекс по полю "createAt", и установить
у него "Expire" на 86400 секунд - 1 сутки,
 */
router.get('/gettokencsrf', function(req, res, next){




    AuthService.saveCsrfToken(uuidV4()).then(function (result) {

        res.json({"code": "ok", "tokenCSRF": result.ops[0].tokencsrf});

    });

});





router.post('/login', function (req, res, next) {






 if (validator.checkProps(req.body, "login")) {





   AuthService.login(req.body.login).then(function (result) {




     if (result !== null && bcrypt.compareSync(req.body.pass, result.pass)) {

       res.json({"code": "ok", "sessionToken": jsonwebtoken.sign(result._id.toString(), config.SECRETJSONWEBTOKEN)});


     } else {


       res.json({"code": 1});


     }






   });



 } else {


   res.json({"code": 1});



 }














});









module.exports = router;
