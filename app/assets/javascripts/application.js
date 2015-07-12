// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require form2js-bower/src/form2js.js
//= require turbolinks
//= require D3/d3.min.js
//= require angular/angular.min.js
//= require angular-resource/angular-resource.min.js
//= require angular-route/angular-route.min.js
//= require angular-animate/angular-animate.min.js
//= require angular-bootstrap/ui-bootstrap-tpls.min.js




//JUST IN CASE

var ChartApp = angular.module("ChartApp", ["ngRoute", "ui.bootstrap"]);

ChartApp.config(function($routeProvider) {

	$routeProvider
		.when('/',{
			templateUrl: '/index.html'
		})
		.when('/charts/:id', {
			controller: 'ChartCtrl'
		});

});

ChartApp.config(["$httpProvider", function($httpProvider) {
    $httpProvider.
        defaults.headers.common["X-CSRF"] = $("meta[name=csrf-token]").attr("content");
}]);

ChartApp.factory('Chart', function ($http, $q) {
	var Chart = {};

	Chart.get = function() {
		var deferred = $q.defer()

		$http
			.get("/charts/8.json")
			.success(function(response) {
				deferred.resolve(response);
			})
			.error(function(rejection) {
				deferred.reject(rejection);
			});
		return deferred.promise;
	}
	return Chart;
});



ChartApp.controller("ChartCtrl", function ($scope, $http, Chart) {

	$scope.current_chart = null;
	

	var regenerate = function() {
		Chart.get().then(
			function(response){

				$scope.current_chart = response[0];
				$scope.current_chart.allchild = null;
				$scope.current_chart.layer_1 = [];
				$scope.current_chart.layer_2 = [];
				$scope.current_chart.layer_3 = [];
				$scope.current_chart.layer_4 = [];
				$scope.current_chart.layer_5 = [];
				$scope.current_chart.layer_6 = [];
				$scope.current_chart.layer_1_names = [];
				$scope.current_chart.layer_2_names = [];
				$scope.current_chart.layer_3_names = [];
				$scope.current_chart.layer_4_names = [];
				$scope.current_chart.layer_5_names = [];
				$scope.current_chart.layer_6_names = [];

				var chart_children = [];
				var start_seconds = new Date().getTime() / 1000;


				function regen_layer_loop() {

					if ($scope.current_chart.children !== undefined) {
						$scope.current_chart.layer_1 = $scope.current_chart.children
						$scope.current_chart.children.forEach(function(v1,i) {
							//console.log('top layer ', v1.name);
							chart_children.push(v1.name);
							$scope.current_chart.layer_1_names.push(v1.name);
							if (v1.children !== undefined && v1.children.length !== 0 ) {
								$scope.current_chart.layer_2 = v1.children;
								//console.log($scope.current_chart.layer_2, "h");
								v1.children.forEach(function(v2,ii) {
									chart_children.push(v2.name);
									$scope.current_chart.layer_2_names.push(v2.name);
									//console.log('2nd layer ', v2.name);
									if (v2.children !== undefined && v2.children.length !== 0 ) {
										$scope.current_chart.layer_3 = v2.children;
										v2.children.forEach(function(v3,iii) {
											chart_children.push(v3.name);
											$scope.current_chart.layer_3_names.push(v3.name);
											//console.log('3rd layer ', v3.name );
											if (v3.children !== undefined && v3.children.length !== 0 ) {
												$scope.current_chart.layer_4 = v3.children;
												v3.children.forEach(function(v4,iiii) {
													chart_children.push(v4.name);
													$scope.current_chart.layer_4_names.push(v4.name);
													//console.log('4th layer ', v4.name);
													if (v4.children !== undefined && v4.children.length !== 0) {
														$scope.current_chart.layer_5 = v4.children;
														v4.children.forEach(function(v5, i5) {
															chart_children.push(v5.name);
															$scope.current_chart.layer_5_names.push(v5.name);
															//console.log('5th layer ', v5.name);
															if (v5.children !== undefined && v5.children.length !== 0) {
																$scope.current_chart.layer_6 = v5.children;
																v5.children.forEach(function(v6, i6) {
																	chart_children.push(v6.name);
																	$scope.current_chart.layer_6_names.push(v6.name);
																	//console.log('in bottom ', v6.name);
																})
															}
														});
													}
												});
											}
										});	
									}
								});
							}
						});
					}
			}
			//END regen_layer_loop


			regen_layer_loop();
			console.log('yo names ', $scope.current_chart.layer_6_names)
			
			var end_seconds = new Date().getTime() / 1000;
			var total_seconds = end_seconds - start_seconds;
			console.log(total_seconds + " seconds for loop");
			$scope.current_chart.allchild = chart_children;











				console.log($scope.current_chart);
			},
			function(rejection){
				console.log(rejection);
			}
		);
	}

	$scope.counter = 0;
	$scope.change = function() {
	  $scope.counter++;
	};





	//Initiate the page
	regenerate();

	var ingredient_field = angular.element("#ingredient_field");
	$scope.second_field = angular.element("#2ndingredient");










	  $scope.selected1 = undefined;
	  $scope.selected2 = undefined;
	  $scope.selected3 = undefined;
	  $scope.selected4 = undefined;
	  $scope.selected5 = undefined;
	  $scope.selected6 = undefined;
	  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
	  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
	  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 
	  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 
	  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 
	  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
	








});



