/**
 * Created by Admin on 29.09.2016.
 */




angular.module('app').factory("Savefooter", function($resource) {
  return $resource("/savefooter");
});


angular.module('app').factory("Getfooter", function($resource) {
  return $resource("/getfooter");
});




