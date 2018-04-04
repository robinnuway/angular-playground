var app = angular.module("app", []);

app.controller("randomUserController", function($scope, $http) {
	$scope.$watch("user", function() {
		fetch();
	});

	function fetch() {
		$http({
			method: "GET",
			url:
				"https://randomuser.me/api/?results=" +
					$scope.user.results +
					"&gender=" +
					$scope.user.gender +
					"&nat=" +
					$scope.user.nat
		}).then(
			function successCallback(response) {
				$scope.users = response.data.results;
						console.log($scope.users.length);
			},
			function errorCallback(response) {
				console.log(response + " Some error occured");
			}
		);
	}

	$scope.profile = {
		picture:
			"https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/18485709_1901454053464335_8111100055084385244_n.jpg?oh=42f2f95f8efe00a73509917d9cd8367d&oe=5A099DD8",
		name: "Robin Savemark",
		email: "robin.savemark@example.com",
		dob: "1990-04-10",
		gender: "male",
		nat: "sv",
		occupation: "front-end developer",
		skills: {
			one: "html",
			two: "css",
			three: "js"
		},
		skillpoints: {
			one: "5",
			two: "4.5",
			three: "3.8"
		}
	};

	$scope.user = {
		picture: "",
		name: "",
		email: "",
		dob: "",
		password: "",
		terms: false,
		gender: "",
		nat: "",
		results: 4,
		values: 18,
		range: true
	};

	$scope.config = {
		min: 0,
		max: 100,
		step: 1
	};

	$scope.age = [
		{
			dob: 18
		},
		{
			dob: 40
		},
		{
			dob: 45
		}
	];

	$scope.range = {
		min: 18,
		max: 45
	};

	$scope.loadMore = function() {
		$scope.user.results += 4;
		fetch();
	};

	$scope.update = function() {
		$scope.user.terms;
		$scope.user.gender;
		$scope.user.nat;
		$scope.user.dob;
		fetch();
	};
});

app.filter("range", function() {
	return function(array, range) {
		return array.filter(function(item) {
			console.log(item.dob);
			return item.dob > range.min && item.dob < range.max;
		});
	};
});

app.filter("agefilter", function agefilter($filter) {
	return function(text, born, yearnow) {
		var today = new Date();
		today.getUTCFullYear();
		var agedate = new Date(text.replace(/-/g, "/"));
		yearnow = parseInt($filter("date")(today, "yyyy"));
		born = parseInt($filter("date")(agedate, "yyyy"));
		return yearnow - born;
	};
});

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind(".navigation", function() {
             if (this.pageYOffset > 100) {
                 scope.toggleClass = true;
                 console.log('Scrolled below header.');
             } else {
                 scope.toggleClass = false;
                 console.log('Header is in view.');
             }
            scope.$apply();
        });
    };
});

app.directive("slider", function() {
	return {
		restrict: "AE",
		scope: {
			config: "=config",
			min: "=min",
			max: "=max"
		},
		link: function(scope, element, attrs) {
			element.slider({
				range: true,
				values: [scope.min, scope.max],
				min: scope.config.min,
				max: scope.config.max,
				step: scope.config.step,
				slide: function(event, ui) {
					scope.$apply(function() {
						scope.min = ui.values[0];
						scope.max = ui.values[1];
					});
				}
			});

			element.bind("slide", function(event, ui) {
				scope.ngModel = ui.value;
				scope.$apply();
			});
		}
	};
});

app.controller("tabsController", [
	"$scope",
	function($scope) {
		$scope.tab = 1;

		$scope.setTab = function(newTab) {
			$scope.tab = newTab;
		};

		$scope.isSet = function(tabNum) {
			return $scope.tab === tabNum;
		};
	}
]);

app.controller("accordionController", [
	"$scope",
	function($scope) {
		$scope.isActive = false;
		$scope.accordionActive = function() {
			$scope.isActive = !$scope.isActive;
		};
	}
]);

app.controller("toggleMenuController", [
	"$scope", "$window",
	function($scope, $window) {
		$scope.isActive = false;
		$scope.isModalOpen = false;
		$scope.menuActive = function() {
			$scope.isActive = !$scope.isActive;
		};
		$scope.modalActive = function() {
			$scope.isModalOpen = !$scope.isModalOpen;
		};
		$scope.closeMenu = function() {
			if (($scope.isActive = $scope.isActive)) {
				$scope.isActive = false;
			}
		};
		$scope.closeModal = function() {
			if (($scope.isModalOpen = $scope.isModalOpen)) {
				$scope.isModalOpen = false;
			}
		};
	}
]);