angular.module('myApp.services',[])
.service('IconService',['$q',function($q)
{
	this.getIcon = function()
	{
		return [
		{id: 1, icon: '<i class="fa fa-envelope"></i>'}, // Gmail
		{id: 2, icon: '<i class="fa fa-google"></i>'}, //Google
		{id: 3, icon: '<i class="fa fa-map-marker"></i>'}, //Google Maps
		{id: 4, icon: '<i class="fa fa-youtube-square"></i>'}, //Youtube
		{id: 5, icon: '<i class="fa fa-facebook-official"></i>'}, //Facebook
		{id: 6, icon: '<i class="fa fa-google-plus"></i>'}, //Google Plus
		{id: 7, icon: '<i class="fa fa-whatsapp"></i>'}, //Whatsapp
		{id: 8, icon: '<i class="fa fa-facebook"></i>'}, //Facebook Messenger
		{id: 9, icon: '<i class="fa fa-chrome"></i>'}, //Google Chrome
		{id: 10, icon: '<i class="fa fa-gamepad"></i>'}, //Games - angrybirds; fruit ninja; temple run
		{id: 11, icon: '<i class="fa fa-skype"></i>'}, //Skype
		{id: 12, icon: '<i class="fa fa-windows"></i>'}, //Microsoft
		{id: 13, icon: '<i class="fa fa-twitter-square"></i>'}, //Twitter
		{id: 14, icon: '<i class="fa fa-street-view"></i>'}, //Google street view
		{id: 15, icon: '<i class="fa fa-microphone"></i>'}, //Voice Search
		{id: 16, icon: '<i class="fa fa-instagram"></i>'}, // Instagram
		{id: 17, icon: '<i class="fa fa-play-circle"></i>'}, //Google Play
		{id: 18, icon: '<i class="fa fa-dropbox"></i>'}, //dropbox
		{id: 19, icon: '<i class="fa fa-opera"></i>'}, //opera
		{id: 20, icon: '<i class="fa fa-globe"></i>'}, //google earth
		{id: 21, icon: '<i class="fa fa-amazon"></i>'}, //Amazon
		{id: 22, icon: '<i class="fa fa-yahoo"></i>'}, //Yahoo
		{id: 23, icon: 'href=http://plainicon.com/dboard/userprod/2805_fce53/prod_thumb/plainicon.com-39957-512px.png'}, //Netflix
		{id: 24, icon: 'href=https://cdn1.iconfinder.com/data/icons/social-black-buttons/512/snapchat-128.png'}, ///snapchat
		{id: 25, icon: '<i class="fa fa-firefox"></i>'}, //Firefox
		{id: 26, icon: '<i class="fa fa-plane"></i>'}, //Flight Radar
		

		]
	}
}]);




