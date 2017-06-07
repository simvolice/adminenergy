/**
 * Created by simvolice on 27.02.2017 22:09
 */



module.exports = {

    checkProps: function (body, propName) {




      const lenghtMax = 1000;





        if (!body.hasOwnProperty(propName)) {



          return false;


        } else if (body[propName] === null) {



          return false;


        } else if (body[propName] === undefined) {


          return false;


        } else if (body[propName] >= lenghtMax) {


          return false;


        } else {


          return true;


        }



















    }











};