/**
 * Created by simvolice on 20.05.2017 16:26
 */



const express = require('express');
const router = express.Router();
const CategoryService = require('../services/CategoryService');
const MarketService = require('../services/MarketService');
const ClientsService = require('../services/ClientsService');
const FooterService = require('../services/FooterService');
const convertCurrency = require('../utils/convertCurrency');
const config = require('../utils/devConfig');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(config.smtpServer);


async function getRateRub(resultProduct) {



  let resultExchangeRate = await convertCurrency.getExchangeRateRUBNow();




  if (resultExchangeRate.ValCurs !== undefined) {



    for (let i of resultExchangeRate.ValCurs.Valute) {


      if (i.CharCode[0] === "EUR" && Array.isArray(resultProduct)) {


        for (let itemProduct of resultProduct) {

          itemProduct.rateRUB = itemProduct.rate * parseFloat(i.Value[0]);
        }


      } else {


        resultProduct.rateRUB = resultProduct.rate * parseFloat(i.Value[0]);
        resultProduct.dateRate = resultExchangeRate.ValCurs.$.Date;


      }


    }


  } else {



    for (let itemProduct of resultProduct) {

      itemProduct.rateRUB = "Нет курса по EUR";
    }



  }


}



router.get('/', async (req, res, next) =>{


  let allClients = await ClientsService.get();

  let categoryResult = await CategoryService.getAllCategory();


  categoryResult.pop();

  let resultProduct = await MarketService.getAllProduct();

  await getRateRub(resultProduct);



  let copyText = await FooterService.get();
  res.locals.yearCopyright = new Date().getFullYear();
  res.locals.footer = copyText.text;

  res.locals.titleSite = "Компрессоры SOLIDair - продажа, монтаж, обслуживание";
  res.locals.descriptionSite = "Официальный представитель SOLIDair в России, безмасляные компрессоры для стоматологий, небольших предприятий и заводов по низкой цене.";
  res.locals.canonicalUrl = req.protocol + "://" + req.get("host");
  res.locals.ogImg = req.protocol + "://" + req.get("host") + "/wp-content/uploads/logo.png";

  res.render('home', {category: categoryResult, product: resultProduct, stomatologLink: categoryResult[2], clients: allClients});


});



router.get('/contact', async (req, res, next) =>{

  let copyText = await FooterService.get();
  res.locals.yearCopyright = new Date().getFullYear();
  res.locals.footer = copyText.text;

  res.locals.titleSite = "Компрессоры SOLIDair - продажа, монтаж, обслуживание";
  res.locals.descriptionSite = "Официальный представитель SOLIDair в России, безмасляные компрессоры для стоматологий, небольших предприятий и заводов по низкой цене.";
  res.locals.canonicalUrl = req.protocol + "://" + req.get("host");
  res.locals.ogImg = req.protocol + "://" + req.get("host") + "/wp-content/uploads/logo.png";

  res.render('contact');

});







router.get('/category', async (req, res, next) =>{



  let categoryResultById = await CategoryService.getCategoryById(req.query.id);

  if (categoryResultById.subcategory !== null) {


    for (let itemSubID of categoryResultById.subcategory) {

      let objParamsCount = {
        catid: categoryResultById._id,
        subid: itemSubID.id


      };
      let resultCountProductByCategory = await MarketService.getProductByCatIdSubId(objParamsCount);

      itemSubID.count = resultCountProductByCategory.length;


      itemSubID.category = categoryResultById._id;


    }


    let copyText = await FooterService.get();
    res.locals.yearCopyright = new Date().getFullYear();
    res.locals.footer = copyText.text;

    res.locals.titleSite = categoryResultById.name;
    res.locals.descriptionSite = categoryResultById.description;
    res.locals.canonicalUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    res.locals.ogImg = categoryResultById.imgForMainPage;



    res.render('category', {data: categoryResultById, subcat: 1});

  } else {


    let objParams = {

      catid: req.query.id,
      subid: 0

    };


    let resultProduct = await MarketService.getProductByCatIdSubId(objParams);

    await getRateRub(resultProduct);


    let copyText = await FooterService.get();
    res.locals.yearCopyright = new Date().getFullYear();
    res.locals.footer = copyText.text;

    res.locals.titleSite = categoryResultById.name;
    res.locals.descriptionSite = categoryResultById.description;
    res.locals.canonicalUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    res.locals.ogImg = categoryResultById.imgForMainPage;





    res.render('category', {data: categoryResultById, product: resultProduct, subcat: null});




  }


});





router.get('/grid', async (req, res, next) =>{


 let resultCat = await CategoryService.getCategoryById(req.query.catid);
 let objParams = {
      catid: req.query.catid,
      subid: req.query.id
 };

  for (let item of resultCat.subcategory) {
    if (item.id === parseInt(req.query.id)) {

      resultCat.subcategory = item;

      let copyText = await FooterService.get();
      res.locals.yearCopyright = new Date().getFullYear();
      res.locals.footer = copyText.text;

      res.locals.titleSite = item.name;
      res.locals.descriptionSite = resultCat.description;
      res.locals.canonicalUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
      res.locals.ogImg = item.img;




    }
  }


  let result = await MarketService.getProductByCatIdSubId(objParams);


  await getRateRub(result);




  res.render('grid', {product: result, headerBreadCrumb: resultCat});



});








router.get('/product', async (req, res, next) =>{


  let result = await MarketService.getProductById(req.query.id);

  let resultCateg = await CategoryService.getCategoryById(result.categorys);

  result.categName = resultCateg.name;


  for (let item of resultCateg.subcategory) {
    if (item.id === result.subcategory) {

      result.subCategName = item.name;



    }
  }



  await getRateRub(result);




  let allProductByCategID = await MarketService.getProductByCategID(result.categorys);


  await getRateRub(allProductByCategID);


  let copyText = await FooterService.get();
  res.locals.yearCopyright = new Date().getFullYear();
  res.locals.footer = copyText.text;

  res.locals.titleSite = result.title;
  res.locals.descriptionSite = result.description;
  res.locals.canonicalUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.locals.ogImg = result.img;




  res.render('product', {data: result, product: allProductByCategID});









});



router.get('/orderfromsite', function(req, res, next){


  let mail = {
    from: "simvolice@gmail.com",
    to: "2518743@mail.ru",
    subject: "Заявка с сайта energotechnica.ru",

    html: '<h4>Имя: '+ req.query.name +'</h4> <br> <h4>Email: '+ req.query.email +'</h4> <br> <h4>Организация: '+ req.query.org +'</h4> <br> <h4>Телефон: '+  req.query.tel +'</h4> <br> <h4>Наименование продукции: '+ req.query.nameprod +'</h4> <br> <h4>Текст: '+ req.query.text +'</h4> <br>'
  };

  transporter.sendMail(mail);


  res.json({"code": "ok"});

});


router.get('/search', async (req, res, next) =>{


  let resultSearch = await MarketService.getProductBySearch(req.query.s);


  let copyText = await FooterService.get();
  res.locals.yearCopyright = new Date().getFullYear();
  res.locals.footer = copyText.text;

  res.locals.titleSite = "Вы искали " + req.query.s + " | Компания Энерготехника";
  res.locals.descriptionSite = "Официальный представитель SOLIDair в России, безмасляные компрессоры для стоматологий, небольших предприятий и заводов по низкой цене.";
  res.locals.canonicalUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.locals.ogImg = req.protocol + "://" + req.get("host") + "/wp-content/uploads/logo.png";


  res.render('search', {q: req.query.s, data: resultSearch});




});

router.get('/about', async (req, res, next) =>{
  let copyText = await FooterService.get();
  res.locals.yearCopyright = new Date().getFullYear();
  res.locals.footer = copyText.text;

  res.locals.titleSite = "Компрессоры SOLIDair - продажа, монтаж, обслуживание";
  res.locals.descriptionSite = "Официальный представитель SOLIDair в России, безмасляные компрессоры для стоматологий, небольших предприятий и заводов по низкой цене.";
  res.locals.canonicalUrl = req.protocol + "://" + req.get("host");
  res.locals.ogImg = req.protocol + "://" + req.get("host") + "/wp-content/uploads/logo.png";

  res.render('about');



});

module.exports = router;