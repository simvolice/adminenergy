/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("GetAllClients", function($resource) {
  return $resource("/getallclients");
});


angular.module('app').factory("DeleteClients", function($resource) {
  return $resource("/deleteclients");
});


