var app = angular.module('app', ['ngI18n']);

app.config(function(I18NProvider) 
{
		var i18nConfig = {
			langsDir: 'lang/',
			langs: [{
				locale: 'en-us',
				flag: 'us',
				name: 'English'
			}, {
				locale: 'es-es',
				flag: 'es',
				name: 'Español'
			}]
		};
		I18NProvider.config(i18nConfig);
});


app.controller('widgetsController', function($scope, I18N,$http) 
{
	$scope.languages = I18N.getLangs();	
    $scope.changeLang =  function(lang) 
	{		
		I18N.setCurrent(lang.locale, function() 
		{
		});
	};
	
	$http.get("json/DataTransfer.json")
	.then(function(response)
	{
		Morris.Donut({
		element: 'demo-morris-color-donut',
		data: response.data,
		colors: ['#e86741', '#FAC552', '#4daf7b', '#f4ede7'],
		resize:false,
		formatter: function (value, data) { return value + 'GB'; }
		});
		
	})
	
	$http.get("json/DataTransfer-misc.json")
	.then(function(response)
	{			
		$scope.audio = response.data.audio;
		$scope.video = response.data.video;
		$scope.photo = response.data.photo;
	});
	
	$http.get("json/profile-data.json")
	.then(function(response)
	{			
		$scope.views = response.data.views;
		$scope.comments = response.data.comments;
		$scope.likes = response.data.likes;
	})
	
});