var app = angular.module('jainApp', ['ngAnimate', 'ngGrid']);

app.service('getInfo', function($http, $q) {
  var persons;

  return {
    getPersonsJSON: function() {
      if (angular.isUndefined(persons)) {
        persons = {};
        /* CDN is for production, and is cached for long time. For dev/testing, use rawgit directly.
        var personsJSONFile = 'https://cdn.rawgit.com/abhijithda/jaina/master/json/persons.json';
        */
        var personsJSONFile = 'https://rawgit.com/abhijithda/jaina/master/json/persons.json';
        // personsJSONFile = 'json/persons.json';
        return $http.get(personsJSONFile).success(
          function(data, status, headers, config){
            persons["Persons"] = data["Persons"];
          }
        /*
        ).error(
          function(data, status, headers, config){
            return $http.get('json/persons.json').success(
              function(data, status, headers, config){
                console.log("Retrieving JSON from local copy");
                persons["Persons"] = data["Persons"];
                console.log("Persons from local copy");
                console.log(persons);
              }
            );
          }
        */
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
        $scope.references = result.data.References;
        console.log("then Success callback - References");
        console.log($scope.references);
        $scope.allPersons = result.data.Person;
        console.log("then Success callback - All Persons");
        console.log($scope.allPersons);
      /*
      },
      // Error Callback
      function(result) {
        $scope.allPersons = result.data.Persons;
        console.log("then Error callback - All Persons");
        console.log($scope.allPersons);
      */
      }
    );

    var nameTemplate = "<div ng-if='row.entity.Images.Name == null'> {{row.entity.Name}} </div>" +
      "<div ng-if='row.entity.Images.Name != null'> " +
        "<a href='' ng-click='showImage=showImage?0:1' ng-init='showImage=1'> " +
          "{{row.entity.Name}} " +
        "</a>" +
        "<div ng-if='showImage==1'>" +
          "<img ng-src={{row.entity.Images.Name}} width='300' height='300' frameborder='0' scrolling='no'> </img>" +
        // Hyper link only:
        // "<div ng-if='row.entity.Images.Name != null'> <a href='{{row.entity.Images.Name}}'> {{row.entity.Name}} </a> </div> ";
        "</div>" +
      "</div> ";


    $scope.columnDefs = [{
        field: 'Name',
        displayName: 'Name',
        cellTemplate: nameTemplate,
        width: 300
      }, {
        field: 'Type',
        displayName: 'Type',
      }, {
        field: 'Number',
        displayName: 'Number',
        width: '50px'
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
      rowHeight: 300,
      showColumnMenu: true,
      showFilter: true,
      sortInfo: {fields:['Type', 'Number'], directions:['asc']},
      virtualizationThreshold: 100
    };

  });
