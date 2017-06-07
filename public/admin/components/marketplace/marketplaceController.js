/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('MarketplaceCtrl', function ($scope, $ocLazyLoad, $cookies, $http, GetAllProduct, DeleteProduct, GetAllCateg, $mdToast, $mdDialog, $rootScope) {



  $ocLazyLoad.load('../admin/assets/css/quill.snow.css');
  $ocLazyLoad.load('../admin/assets/js/quill.min.js');



  function load_js()
  {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= '../admin/assets/js/quilInit.js';
    head.appendChild(script);
  }

  setTimeout(function () {


    load_js();



  }, 1000);






  var self = this;

  self.title = "Работа с продукцией";

  self.titleproduct = "";












    self.userCategory = '';
  self.categorys = [];



  self.userSubCategory = '';
  self.subCategory = [];





  GetAllCateg.get(function (result) {

    self.categorys = result.resultFromDb;

    result.resultFromDb.forEach(function (item) {


      if (item.subcategory !== null) {


        item.subcategory.forEach(function (itemSub) {
          self.subCategory.push(itemSub);
        });

      }


    });

  });



  self.rate = 0;

  $rootScope.selected = [];
  self.options = {
    rowSelection: true
  };





  $rootScope.data = [];


  GetAllProduct.get(function (result) {

    $rootScope.data = result.resultFromDb;


  });


  self.btnTab = function () {







    GetAllProduct.get(function (result) {

      $rootScope.data = result.resultFromDb;


    });


  };



  self.delete = function (selected) {




    var objDelete = {

      arrid: selected,
      tokenCSRF : $cookies.get('tokenCSRF'),
      sessionToken : $cookies.get('sessionToken')
    };


    DeleteProduct.save(objDelete, function (result) {

      if (result.code === "ok"){

        GetAllProduct.get(function (result) {


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



  // NOW UPLOAD THE FILES.
  self.uploadFiles = function () {



    formdata.append('title', self.titleproduct);
    formdata.append('text', quill.root.outerHTML);
    formdata.append('category', self.userCategory);
    formdata.append('subcategory', self.userSubCategory);
    formdata.append('rate', self.rate);
















    var request = {
      method: 'POST',
      url: '/addproduct',
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
                  .textContent('Вы успешно загрузили новый товар')
                  .position('right top')
                  .hideDelay(3000)
          );



        }, function errorCallback(response) {
          document.getElementById("file").value = null;

          console.log(response);
          formdata = new FormData();
          alert(response);
        });
  };




  self.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      locals:{dataToPass: $rootScope.selected, categorys: self.categorys, subCategory: self.subCategory},
      templateUrl: 'components/marketplace/dialog_template.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    });
  };

  function DialogController($scope, $mdDialog, dataToPass, categorys, subCategory, $cookies, $http, $mdToast, $rootScope, GetAllProduct) {





    $scope.subCategory = subCategory;
    $scope.categorys = categorys;


    $scope.userSubCategory = dataToPass[0].subcategory;

    $scope.userCategory = dataToPass[0].categorys;


    $scope.titleproduct = dataToPass[0].title;
    $scope.textproduct = dataToPass[0].description;




    $scope.rate = dataToPass[0].rate.$numberDecimal;
    $scope.img = dataToPass[0].img;
    $scope.pdf = dataToPass[0].pdf;
    $scope.id = dataToPass[0]._id;


    $scope.column = dataToPass[0].column;
    $scope.valueForColumn = dataToPass[0].valueForColumn;
    $scope.fourProduct = dataToPass[0].fourProduct;







    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
      angular.forEach($files, function (value, key) {
        formdata.append(key, value);
      });
    };



    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {



      formdata.append('id', $scope.id );
      formdata.append('title', $scope.titleproduct);
      formdata.append('text', $scope.textproduct);
      formdata.append('category', $scope.userCategory);
      formdata.append('subcategory', $scope.userSubCategory);
      formdata.append('rate', $scope.rate);




      var request = {
        method: 'POST',
        url: '/update',
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
                    .textContent('Вы успешно обновили товар')
                    .position('right top')
                    .hideDelay(3000)
            );



          }, function errorCallback(response) {
            document.getElementById("file").value = null;

            formdata = new FormData();
            alert(response);
          });
    };















    $scope.closeDialog = function () {


      $scope = null;
      $mdDialog.hide();



      GetAllProduct.get(function (result) {

        $rootScope.selected = [];
        $rootScope.data = result.resultFromDb;


      });



    };




  }


});

