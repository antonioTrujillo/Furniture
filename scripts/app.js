var findCategorie = function(array,id){
  for(var i = 0, m=null; i<array.length; ++i){ 
      if(array[i].id == id){ 
        return array [i];
        break;
      };
  };
};


 (function(){
  var DATA = "data/categories.json";
  var LOGO = "data/logos.json";
  var app= angular.module("myApp",["ngRoute"]);
      app.config(["$routeProvider"/*,"locationProvider"*/, function($routeProvider/*,$locationProvider*/){
        /*$locationProvider.html5Mode(true);*/
        $routeProvider.when("/",{ 
          templateUrl:"templates/home.html",
          controller:"MainCtrl",
          controllerAs:"home"
        });
        $routeProvider.when("/showCategories/:categorieId",{ 
          templateUrl:"templates/show.html",
          controller:"showController"
        });
        $routeProvider.when("/showForm",{ 
          templateUrl:"templates/form.html"
        });
      }]);
      app.directive("postDirective", function(){ 
        return{ 
            restrict:"AE",
            templateUrl:"components/card.html"
        };
      });
      app.directive("ngHeader", function(){ 
        return{ 
            restrict:"AEC",
            templateUrl:"components/header.html"
        };
      });
      app.directive("ngPartners", function(){ 
        return{ 
            restrict:"AEC",
            templateUrl:"components/partners.html"
        };
      });
      app.directive("ngFooter", function(){ 
        return{ 
            restrict:"AEC",
            templateUrl:"components/footer.html"
        };
      });
      app.directive("ngPhotos", function(){ 
        return{ 
            restrict:"AEC",
            templateUrl:"components/photos.html"        }
      })

      app.controller("MainCtrl", function($scope,$http){
        $http.get(DATA).then(function(data){ 
            $scope.categories = data.data
        });
        $http.get(LOGO).then(function(img){ 
            $scope.logos = img.data
        });
        $scope.viewLoaded=function(){
           $('.carousel ').carousel()
          }
      });
      app.controller("showController",function($scope,$routeParams,$http){ 
        $http.get(DATA).then(function(id){ 
          var Id=$routeParams.categorieId;
          var categorie= id.data;
          $scope.categorie= findCategorie (categorie,Id)
        });
      });  
  })();
  
