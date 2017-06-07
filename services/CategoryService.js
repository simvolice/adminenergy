/**
 * Created by simvolice on 20.05.2017 13:57
 */




const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Decimal128 = require('mongodb').Decimal128;
const Logger = require('mongodb').Logger;
Logger.setLevel('debug');



/*
 Получить рандомное целое число
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}




module.exports = {


  saveCategory: async function () {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('category');


      const result = await col.insertMany([{



        name: "Винтовые компрессоры",


        description: "В диапазоне До 15 кВт мы дополнительно прeдлагаeм компрессорные станции, в виде компрессоров, размешенных на ресиверах , а так же компрессорные станции в виде компрессоров со встроенными рефрижераторными осушителями, установленными на ресиверы. Все оборудованы элeктронным управлeниeм и циклонным сепаратором масла с внешним расположением для простоты тeхобслуживания. Максимальная производительность и длительный срок службы за лучшую цену!",



        textMainPage: "Высокопроизводительные промышленные компрессоры",

        imgForMainPage: config.domainName + "wp-content/uploads/2013/05/solidscrew-category.jpg",


        subcategory: [{id: getRandomInt(1, 1000000), name: "Компрессорные установки на ресивере", img: config.domainName + "subcategory/" + "solidscrew-kkt-chelyabinsk-1-300x300.jpg", category: "Винтовые компрессоры"},

          {id: getRandomInt(1, 1000000), name: "Компрессорные установки на ресивере, с осушителем и фильтрами", img: config.domainName + "subcategory/" + "solidscrew-rd-300x300.jpg", category: "Винтовые компрессоры"},
          {id: getRandomInt(1, 1000000), name: "Компрессоры до 75кВт", img: config.domainName + "subcategory/" + "solidscrew-22s-300x300.jpg", category: "Винтовые компрессоры"}

        ]




      },



        {



          name: "Поршневые компрессоры",


          description: "Поршневые компрессоры серии SOLIDdrive используются для небольших производств. Серия SOLIDbase в основном применяется в промышленном секторе.SOLIDair это второй бренд BOGE Group немецкого производителя компрессорной техники.",


          textMainPage: "Компрессоры для небольших предприятий и автомастерских",

          imgForMainPage: config.domainName + "wp-content/uploads/2013/05/soliddrive-category.jpg",




          subcategory: [{id: getRandomInt(1, 1000000), name: "Для промышленных предприятий (производительность 300 - 1075 л/мин, до 7.5кВт)", img: config.domainName + "subcategory/" + "SOLIDbase_580-300x300.jpg", category: "Поршневые компрессоры"},

            {id: getRandomInt(1, 1000000), name: "Малой мощности (производительность 68 - 155 л/мин, до 1.8кВт)", img: config.domainName + "subcategory/" + "SOLIDdrive_100_Leonardo-300x300.jpg", category: "Поршневые компрессоры"},
            {id: getRandomInt(1, 1000000), name: "Средней мощности (производительность 140 - 377 л/мин, до 3кВт)", img: config.domainName + "subcategory/" + "SOLIDair_DRIVE_380_WS-300x300.jpg", category: "Поршневые компрессоры"}

          ]



        },




        {



          name: "Стоматологические компрессоры",


          description: "Безмасляные компрессоры серии SOLIDdent применяются в стоматологии, медицине, там где повышенные требования к качеству подаваемого воздуха. SOLIDair это второй бренд BOGE Group немецкого производителя компрессорной техники.",


          textMainPage: "Полностью безмасляный воздух, передовые технологии",

          imgForMainPage: config.domainName + "wp-content/uploads/2013/05/soliddental-category.jpg",





          subcategory: null

        },





        {



          name: "Осушители сжатого воздуха",
          description: null,
          subcategory: null


          },




      ]);


      db.close();

      return result;

    } catch (err) {
      db.close();
      return err;


    }


  },


  getAllCategory: async function () {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('category');



      const result = await col.find({}).toArray();


      db.close();

      return result;

    } catch (err) {
      db.close();
      return err;


    }


  },




  getCategoryById: async function (id) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('category');



      const result = await col.findOne({_id: ObjectId(id)});


      db.close();

      return result;

    } catch (err) {
      db.close();
      return err;


    }


  },





  };