var app1 = angular.module("myApp", []);
app1.controller("AppCtrl", function($scope, $http) {
  //this function updated the list of contact which we see with the current list of contacts in db
  function refresh() {
    //get Request
    $http.get("/contactlist").success(function(response) {
      $scope.contactList = response;
      $scope.contact = "";
    });
  }
  refresh();
 
  //post Request to server
  $scope.addContact = function() {
    $http.post("/contactlist", $scope.contact).success(function(response) {
      refresh();
    });
  };
 
  //delete Request to server
  $scope.remove = function(id) {
    console.log(id);
    $http.delete("/contactlist/" + id).success(function(response) {
      refresh();
    });
  };
  
  //edit Request to server
  $scope.edit = function(id) {
    $http.get("/contactlist/" + id).success(function(response) {
      $scope.contact = response;
    });
  };
  
  //update Request to server
  $scope.update = function() {
    $http
      .put("/contactlist/" + $scope.contact._id, $scope.contact)
      .success(function(response) {
        refresh();
      });
  };

  $scope.clear = function() {
    $scope.contact = "";
  };
});
