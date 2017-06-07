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



  save: async function (objParams) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('clients');



      const result = await col.insertOne(objParams);


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
      const col = db.collection('clients');



      const result = await col.find({}).toArray();


      db.close();

      return result;

    } catch (err) {
      db.close();
      return err;


    }


  },


  deleteClients: async function (id) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('clients');



      const result = await col.deleteOne({_id: ObjectId(id)});


      db.close();

      return result;

    } catch (err) {
      db.close();
      return err;


    }


  },




};