/**
 * Created by simvolice on 20.04.2017 18:05
 */


const config = require('../utils/devConfig');
const express = require('express');
const router = express.Router();
const MarketService = require('../services/MarketService');
const CategoryService = require('../services/CategoryService');
const FooterService = require('../services/FooterService');
const ClientsService = require('../services/ClientsService');
const checkSeesionToken = require('../utils/checkSeesionToken').checkSeesionToken;

const BusboyAsync = require('async-busboy');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const Decimal128 = require('mongodb').Decimal128;
const ObjectId = require('mongodb').ObjectId;
const Int32 = require('mongodb').Int32;
const xlsxToJS = require('../utils/xlsxToJS');

/*
 Получить рандомное целое число
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}






router.post('/addproduct', checkSeesionToken, async (req, res, next) =>{








  let resultFromClient = await BusboyAsync(req);



  let objParams = {

    title : resultFromClient.fields.title,
    description : resultFromClient.fields.textHtml,
    descriptionDelta : JSON.parse(resultFromClient.fields.textDelta),
    categorys: ObjectId(resultFromClient.fields.category),
    subcategory: Int32(resultFromClient.fields.subcategory),
    rate: Decimal128.fromString(resultFromClient.fields.rate + ".00"),




    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )


  };


  resultFromClient.files.forEach(function (item) {
    if (path.extname(item.path)  === ".pdf") {



      fsExtra.moveSync(item.path, path.join(__dirname, "../public/uploads/" + path.basename(item.path)));


      objParams.pdf = req.protocol + '://' + req.get('host') + "/uploads/" + path.basename(item.path);


    } else if(path.extname(item.path)  === ".xlsx" || path.extname(item.path)  === ".xls") {





      let columnsRaw = xlsxToJS.parseXLSX(item.path);


      let columnsForArr = columnsRaw[1];

      objParams.column = Object.keys(columnsRaw[1]);
      objParams.units = Object.values(columnsRaw[0]);
      objParams.valueForColumn = Object.values(columnsRaw[1]);



      let ArrTemp = [];


      for (let prop in columnsForArr) {


        ArrTemp.push({[prop]: columnsForArr[prop]});


      }


      ArrTemp.splice(4, Number.MAX_VALUE);




      objParams.fourProduct = ArrTemp;


    } else if(path.extname(item.path)  === ".jpg" || path.extname(item.path)  === ".png"){

      fsExtra.moveSync(item.path, path.join(__dirname, "../public/uploads/" + path.basename(item.path)));


      objParams.img = req.protocol + '://' + req.get('host') + "/uploads/" + path.basename(item.path);

    }
  });

 let resultFromDB = MarketService.saveProduct(objParams);


 res.json({"code": "ok", "resultFromDb": resultFromDB});







});


router.post('/update', checkSeesionToken, async (req, res, next) =>{





  let resultFromClient = await BusboyAsync(req);







 let id = resultFromClient.fields.id;

  let objParams = {



    title : resultFromClient.fields.title,
    description : resultFromClient.fields.textHtml,
    descriptionDelta : JSON.parse(resultFromClient.fields.textDelta),
    categorys: ObjectId(resultFromClient.fields.category),
    subcategory: Int32(resultFromClient.fields.subcategory),
    rate: Decimal128.fromString(resultFromClient.fields.rate),
    updateAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )



  };


  resultFromClient.files.forEach(function (item) {
    if (path.extname(item.path)  === ".pdf") {



      fsExtra.moveSync(item.path, path.join(__dirname, "../public/uploads/" + path.basename(item.path)));


      objParams.pdf = req.protocol + '://' + req.get('host') + "/uploads/" + path.basename(item.path);


    } else if(path.extname(item.path)  === ".xlsx" || path.extname(item.path)  === ".xls") {


      let columnsRaw = xlsxToJS.parseXLSX(item.path);


      let columnsForArr = columnsRaw[1];

      objParams.column = Object.keys(columnsRaw[1]);
      objParams.units = Object.values(columnsRaw[0]);
      objParams.valueForColumn = Object.values(columnsRaw[1]);


      let ArrTemp = [];


      for (let prop in columnsForArr) {


        ArrTemp.push({[prop]: columnsForArr[prop]});


      }


      ArrTemp.splice(4, Number.MAX_VALUE);




      objParams.fourProduct = ArrTemp;



    } else if(path.extname(item.path)  === ".jpg" || path.extname(item.path)  === ".png"){

      fsExtra.moveSync(item.path, path.join(__dirname, "../public/uploads/" + path.basename(item.path)));


      objParams.img = req.protocol + '://' + req.get('host') + "/uploads/" + path.basename(item.path);

    }
  });






 let resultFromDB = MarketService.updProduct(id, objParams);


  res.json({"code": "ok", "resultFromDb": resultFromDB});


















});





router.post('/deleteproduct', checkSeesionToken, async (req, res, next) =>{




  for (let obj of req.body.arrid) {
    await MarketService.deleteProduct(obj._id);
  }


  res.json({"code": "ok"});



});






router.get('/products', async (req, res, next) =>{



  let result = await MarketService.getAllProduct();

  res.json({"code": "ok", "resultFromDb": result});





});


router.get('/getcateg', async (req, res, next) =>{


  let result = await CategoryService.getAllCategory();


  for (let item of result) {
    if (item.subcategory !== null) {

      for (let itemSubID of item.subcategory) {


        itemSubID.category = item._id;


      }


    }

  }




    res.json({"code": "ok", "resultFromDb": result});



});




router.post('/savefooter', checkSeesionToken, async (req, res, next) =>{

  await FooterService.save(req.body.text);

  res.json({"code": "ok"});



});

router.get('/getfooter', async (req, res, next) =>{

  let result = await FooterService.get();

  res.json({"code": "ok", "resultFromDb": result});

});



router.post('/addclients', checkSeesionToken, async (req, res, next) =>{


  let resultFromClient = await BusboyAsync(req);



  let objParams = {

    title : resultFromClient.fields.title,

    createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )


  };


  resultFromClient.files.forEach(function (item) {
     if(path.extname(item.path)  === ".jpg" || path.extname(item.path)  === ".png" || path.extname(item.path)  === ".jpeg"){

      fsExtra.moveSync(item.path, path.join(__dirname, "../public/uploads/" + path.basename(item.path)));


      objParams.img = req.protocol + '://' + req.get('host') + "/uploads/" + path.basename(item.path);

    }
  });

  let resultFromDB = ClientsService.save(objParams);


  res.json({"code": "ok", "resultFromDb": resultFromDB});








});




router.get('/getallclients', async (req, res, next) =>{

  let result = await ClientsService.get();

  res.json({"code": "ok", "resultFromDb": result});


});



router.post('/deleteclients', checkSeesionToken,  async (req, res, next) =>{


  for (let obj of req.body.arrid) {
    await ClientsService.deleteClients(obj._id);
  }


  res.json({"code": "ok"});

});






module.exports = router;