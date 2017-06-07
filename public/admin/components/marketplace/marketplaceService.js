/**
 * Created by Admin on 29.09.2016.
 */




angular.module('app').factory("DeleteProduct", function($resource) {
  return $resource("/deleteproduct");
});


angular.module('app').factory("GetAllProduct", function($resource) {
  return $resource("/products");
});



angular.module('app').factory("GetAllCateg", function($resource) {
  return $resource("/getcateg");
});


