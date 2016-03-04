angular.module('buscaCertificado', [])

  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  })

  .controller('DataController', function($scope, $http) {
    $scope.search = function(product, lat, lon, dist){
      var req = {
        method: 'GET',
        url: 'http://admin-certifica.herokuapp.com/search?product='+product+'&lat='+lat+'&lon='+lon+'&dist='+dist,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
      }
      $http(req)
        .success(function(data) {
          console.log(data);
          $scope.data = data;
        }).
        error(function(data) {
          $scope.data = 'Nenhum dado encontrado';
        });

    };
  });
