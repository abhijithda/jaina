var app = angular.module('jainApp', ['ngGrid']);

app.service('getInfo', function($http, $q) {
  var items;

  return {
    getGodsJSON: function() {
      if (angular.isUndefined(items)) {
        items = {};
        // return $http.get('gods.json').success(function(jsonData) {
        return $http.get('https://cdn.rawgit.com/abhijithda/jain-gods/master/gods.json').success(function(jsonData) {
          items["Gods"] = jsonData["Gods"];
        });
      } else {
        return $q.when(items);
      }
    }
  };
});


app.controller('displayGodsController',
  function($scope, getInfo) {

    getInfo.getGodsJSON().then(function(result) {
      $scope.allGods = result.data.Gods;
      console.log("All Gods");
      console.log($scope.allGods);
    });

    var columnDefs = [{
        field: 'Name',
        displayName: 'Name'
      }, {
        field: 'Type',
        displayName: 'Type',
      }, {
        field: 'Color',
        displayName: 'Color',
      }, {
        field: 'Emblem',
        displayName: 'Emblem',
      }, {
        field: 'Yaksha',
        displayName: 'Yaksha',
      }, {
        field: 'Yakshi',
        displayName: 'Yakshi',
      }];

    $scope.gridOptions = {
      data: 'allGods',
      columnDefs: 'columnDefs',
      enableCellSelection: false,
      enableColumnResize: true
    };

  });
