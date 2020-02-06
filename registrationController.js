angular
  .module('App', [])
  .directive("formatPhone", function () {
        return {	
            restrict: 'A',
            require: 'ngModel',
			link: function (scope, elem, attrs, ctrl, ngModel) {
				elem.add(attrs.id).on('keyup', function () {
					var input = elem.val();
					// Strip all characters from the input except digits
					input = input.replace(/\D/g, '');

					// Trim the remaining input to ten characters, to preserve phone number format
					input = input.substring(0, 10);

					// Based upon the length of the string, we add formatting as necessary
					var size = input.length;
					if (size == 0) {
						input = input;
					} else if (size < 4) {
						input = '(' + input;
					} else if (size < 7) {
						input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
					} else {
						input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
					}
					jQuery("#"+attrs.id).val(input);
				});
			}
		};
    })
  .controller('main',['$location','$scope', '$http', '$timeout', function($location, $scope, $http, $timeout){
	  $scope.server = location.origin + '/';
	  $scope.formData;
	  $scope.states;
	    
	  $scope.load = function() {
		  $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json')
	        .success(function (data, status, headers, config) {
	        	$scope.states = data;
	        });
	  };
	  
	  $scope.submit = function() {
		  var data = $scope.formData;
		  var config = {};
		  console.log($scope.formData);
//		  $http.post($scope.server+'api/registration/submit', data, config)
//	        .success(function (data, status, headers, config) {
//	        	if(data.isSuccess)console.log('success');
//	        });
	  }
  }]);
