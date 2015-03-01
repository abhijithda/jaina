var app = angular.module('jainApp', ['ngGrid']);

app.service('getInfo', function($http, $q) {
  var persons;

  return {
    getPersonsJSON: function() {
      if (angular.isUndefined(persons)) {
        persons = {};
            return $http.get('json/persons.json').success(
          function(data, status, headers, config){
            persons["Persons"] = data["Persons"];
          }
        ).error(
          function(data, status, headers, config){
        return $http.get('https://cdn.rawgit.com/abhijithda/jain-gods/master/json/persons.json').success(
              function(data, status, headers, config){
                console.log("Retrieving JSON from local copy");
                persons["Persons"] = data["Persons"];
                console.log("Persons from local copy");
                console.log(persons);
              }
            );
          }
        );
      } else {
        return $q.when(persons);
      }
    }
  };
});


app.controller('displayGodsController',
  function($scope, getInfo) {

    getInfo.getPersonsJSON().then(
      // Success Callback
      function(result) {
        $scope.allPersons = result.data.Person;
        console.log("then Success callback - All Persons");
        console.log($scope.allPersons);
      }, 
      // Error Callback
      function(result) {
        $scope.allPersons = result.data.Persons;
        console.log("then Error callback - All Persons");
        console.log($scope.allPersons);
      }
    );

    $scope.columnDefs = [{
        field: 'Name',
        displayName: 'Name'
      }, {
        field: 'Type',
        displayName: 'Type',
      }, {
        field: 'Number',
        displayName: 'Number',
      }, {
        field: 'Color',
        displayName: 'Color',
      }, {
        field: 'Emblem',
        displayName: 'Emblem',
      }, {
        field: 'Father',
        displayName: 'Father',
      }, {
        field: 'Mother',
        displayName: 'Mother',
      }, {
        field: 'Yaksha',
        displayName: 'Yaksha',
      }, {
        field: 'Yakshi',
        displayName: 'Yakshi',
      }];

    $scope.gridPerson = {
      data: 'allPersons',
      columnDefs: 'columnDefs',
      enableCellSelection: false,
      enableColumnResize: true,
      sortInfo: {fields:['Type', 'Number'], directions:['asc']}
    };

  });
