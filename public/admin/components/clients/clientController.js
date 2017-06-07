/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('ClientCtrl', function ($cookies, $http, GetAllClients, $mdToast, DeleteClients) {





  var self = this;

  self.title = "Работа с клиентами";

  self.titleclient = "";



  self.selected = [];
  self.options = {
    rowSelection: true
  };
  self.data = [];


  GetAllClients.get(function (result) {

    self.data = result.resultFromDb;


  });


  self.btnTab = function () {

    GetAllClients.get(function (result) {

      self.data = result.resultFromDb;


    });


  };


  self.delete = function (selected) {




    var objDelete = {

      arrid: selected,
      tokenCSRF : $cookies.get('tokenCSRF'),
      sessionToken : $cookies.get('sessionToken')
    };


    DeleteClients.save(objDelete, function (result) {

      if (result.code === "ok"){

        GetAllClients.get(function (result) {


          self.selected = [];
          self.data = result.resultFromDb;


        });


      }else {


        alert("Произошла ошибка, обновите страницу");


      }




    });



  };




  var formdata = new FormData();
  self.getTheFiles = function ($files) {
    angular.forEach($files, function (value, key) {
      formdata.append(key, value);
    });
  };




  self.uploadFiles = function () {



    formdata.append('title', self.titleclient);












    var request = {
      method: 'POST',
      url: '/addclients',
      data: formdata,
      headers: {
        'Content-Type': undefined,
        'tokenCSRF' : $cookies.get('tokenCSRF'),
        'sessionToken' : $cookies.get('sessionToken')
      }
    };

    // SEND THE FILES.
    $http(request)
        .then(function successCallback(response) {


          formdata = new FormData();
          document.getElementById("file").value = null;

          console.log(response);

          $mdToast.show(
              $mdToast.simple()
                  .textContent('Вы успешно сохранили.')
                  .position('right top')
                  .hideDelay(3000)
          );



        }, function errorCallback(response) {
          document.getElementById("file").value = null;


          formdata = new FormData();
          alert(response);
        });
  };






});

