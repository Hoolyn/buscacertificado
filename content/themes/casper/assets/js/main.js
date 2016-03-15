angular.module('buscaCertificado', [])

  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  })

  .controller('DataController', function($scope, $http) {
    $scope.search = function(zipcode, product){
      var req = {
        method: 'GET',
        url: 'http://admin-certifica.herokuapp.com/search?product='+product+'&zipcode='+zipcode,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
      }

      $scope.loading = true;

      $http(req)
        .success(function(data) {
          $scope.loading = false;
          $scope.data = data;
        }).
        error(function(data) {
          $scope.loading = false;
          $scope.data = 'Nenhum dado encontrado';
        });

    };
  });
