/**
 * Created by simvolice on 20.05.2017 17:52
 */


const request = require('async-request');
const parseString = require('xml2js').parseString;



async function xml2json(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, function (err, json) {
      if (err)
        reject(err);
      else
        resolve(json);
    });

  });
}

module.exports = {




   getExchangeRateRUBNow: async function () {



     try {



      let response = await request('http://api.fixer.io/latest?symbols=RUB');



      if (response.statusCode === 200) {

        return JSON.parse(response.body);

      } else {


        return false;


      }






     } catch (err) {


       return err;

     }









   }




};







