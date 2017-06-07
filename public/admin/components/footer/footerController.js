/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('footerCtrl', function ($mdToast, $cookies, $http, Getfooter, Savefooter) {




  var self = this;

  self.title = "Работа с футером";

  self.titlefooter = "";



  Getfooter.get(function (result) {

    self.titlefooter = result.resultFromDb.text;


  });




  self.saveFooter = function () {
    var objSave = {

      text: self.titlefooter,
      tokenCSRF : $cookies.get('tokenCSRF'),
      sessionToken : $cookies.get('sessionToken')
    };


    Savefooter.save(objSave, function (result) {

      if (result.code === "ok"){


        $mdToast.show(
            $mdToast.simple()
                .textContent('Вы успешно сохранили.')
                .position('right top')
                .hideDelay(3000)
        );


      }else {


        $mdToast.show(
            $mdToast.simple()
                .textContent('Произошла ошибка.')
                .position('right top')
                .hideDelay(3000)
        );


      }




    });


  };









});

