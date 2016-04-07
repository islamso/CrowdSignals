angular.module('myApp.services')
.service('IconService',[function()
{
	this.getIconClass = function(appName)
	{
		var iconMap={"gmail":"fa fa-envelope", "Google":"fa fa-google", "Google Maps":"fa fa-map-marker", "Youtube":"fa fa-youtube-square", "Facebook":"fa fa-facebook-official", "Google Plus":"fa fa-google-plus", "Whatsapp":"fa fa-whatsapp", "Facebook Messenger":"fa fa-facebook", "Google Chrome":"fa fa-chrome", "Games":"fa fa-gamepad", "Skype":"fa fa-skype", "Microsoft":"fa fa-windows", "Twitter":"fa fa-twitter-square", "Google Street View":"fa fa-street-view", "Voice Search":"fa fa-microphone", "Instagram":"fa fa-instagram", "Google Play":"fa fa-play-circle", "dropbox":"fa fa-dropbox", "opera":"fa fa-opera", "google earth":"fa fa-globe", "Amazon":"fa fa-amazon", "Yahoo":"fa fa-yahoo", "Firefox":"fa fa-firefox", "Flight Radar":"fa fa-plane"};
		return iconMap[appName];
	}
}]);




