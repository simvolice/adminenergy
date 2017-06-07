/**
 * Created by simvolice on 20.04.2017 15:22
 */




const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Decimal128 = require('mongodb').Decimal128;
const Int32 = require('mongodb').Int32;
const Logger = require('mongodb').Logger;
Logger.setLevel('debug');

module.exports = {



  saveProduct: async function (objParams) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {





      // Get the collection
      const col = db.collection('markets');



      const result = await col.insertOne(objParams);



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }



  },

  updProduct: async function (id, objParams) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('markets');



      const result = await col.updateOne(
          { _id : ObjectId(id) },
          {
              $set: objParams


          }
      );



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }



  },





  deleteProduct: async function (id) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('markets');



      const result = await col.deleteOne({_id: ObjectId(id)});



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }



  },


  getAllProduct: async function () {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('markets');



      const result = await col.find({}).toArray();



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }



  },




  getProductByCatIdSubId: async function (objParams) {


    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('markets');








      const result = await col.find({categorys: ObjectId(objParams.catid), subcategory:  parseInt(objParams.subid)}).toArray();



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }



  },




  getProductById: async function (id) {



    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('markets');



      const result = await col.findOne({_id: ObjectId(id)});



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }






  },





  getProductBySearch: async function (q) {



    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('markets');



      const result = await col.find({'$text': {'$search' : q}}).toArray();



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }








  },




  getProductByCategID: async function (id) {



    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('markets');



      const result = await col.find({categorys: ObjectId(id)}).toArray();



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }











  }




};