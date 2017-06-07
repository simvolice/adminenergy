/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', 'ui.router', 'oc.lazyLoad', 'md.data.table', 'ngMessages', 'ngResource', 'ngCookies' ]).config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    debug: true
  });




}]);


app.directive('ngFiles', ['$parse', function ($parse) {

  function fn_link(scope, element, attrs) {
    var onChange = $parse(attrs.ngFiles);
    element.on('change', function (event) {
      onChange(scope, { $files: event.target.files });
    });
  };

  return {
    link: fn_link
  }
} ]);



app.controller('MainCtrl', function ($scope, $location) {





  var path = $location.path();





  $scope.datalists = [

    { "name": "Продукция", "icon": "add_shopping_cart", "href": "marketplace", path: "/marketplace"},
    { "name": "Футер", "icon": "add_shopping_cart", "href": "footer", path: "/footer"},
    { "name": "Наши клиенты", "icon": "add_shopping_cart", "href": "clients", path: "/clients"}


  ];

  $scope.select= function(item) {


    $scope.selected = item;
  };

  $scope.isActive = function(item) {
    return $scope.selected === item;
  };




  $scope.datalists.forEach(function (item, index) {
    if (path === item.path) {


      $scope.select($scope.datalists[index]);

    }

  });





















});


