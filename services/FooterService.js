/**
 * Created by simvolice on 08.06.2017 0:15
 */


const config = require('../utils/devConfig');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Decimal128 = require('mongodb').Decimal128;
const Logger = require('mongodb').Logger;
Logger.setLevel('debug');



module.exports = {



  save: async function (text) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('footer');



      const result = await col.insertOne({text : text});


      db.close();

      return result;

    } catch (err) {
      db.close();
      return err;


    }


  },

  get: async function () {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('footer');



      const result = await col.findOne({});


      db.close();

      return result;

    } catch (err) {
      db.close();
      return err;


    }


  }




};