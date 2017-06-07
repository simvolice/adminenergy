/**
 * Created by Admin on 06.01.2017.
 */
const config = require('../utils/devConfig');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;



const Logger = require('mongodb').Logger;
Logger.setLevel('debug');






module.exports = {






    saveCsrfToken: async function (tokencsrf) {




            // Connection URL
            const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

            try {






            // Get the collection
            const col = db.collection('tokencsrf');



            const result = await col.insertOne({tokencsrf: tokencsrf, createAt: new Date( new Date().getTime() -  ( new Date().getTimezoneOffset() * 60000 ) )});



            db.close();

            return result;

    }catch(err) {
                db.close();
                return err;


            }



    },

    getCsrfToken: async function (tokencsrf) {
// Connection URL
        const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

        try {




            // Get the collection
            const col = db.collection('tokencsrf');



            const result = await col.findOne({tokencsrf: tokencsrf});



            db.close();

            return result;


        }catch(err) {


            db.close();

            return err;


        }


    },


    testConnection: async function(){




        try {



            const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

            db.close();
            return db;

        }catch (err){

            return err;


        }





    },


    createUser: async function (pass) {




    // Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {






      // Get the collection
      const col = db.collection('users');



      const result = await col.insertOne({login: "admin", pass: pass});



      db.close();

      return result;

    }catch(err) {
      db.close();
      return err;


    }



  },


    login: async function (login) {
// Connection URL
    const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

    try {




      // Get the collection
      const col = db.collection('users');



      const result = await col.findOne({login: login});



      db.close();

      return result;


    }catch(err) {


      db.close();

      return err;


    }


  },



    checkUserById: async function (id) {
// Connection URL
      const db = await MongoClient.connect(config.urlToMongoDBLocalhost);

      try {




        // Get the collection
        const col = db.collection('users');




        const result = await col.findOne({_id: ObjectId(id)});



        db.close();

        return result;


      }catch(err) {


        db.close();

        return err;


      }


    },


};