angular.module('myApp.services')
.service('MarkerService',['LocationService',function(LocationService)
{
	this.filter={};
	this.stat={};
	this.parse=parse;
	this.filter.location=filterLocation;
	this.filter.user=filterUser;
	this.stat.speed=statSpeed;
	/**
	 * MarkerService.parse
	 * @return
	 * 	markers array
	 * @params
	 * 	rawData -  raw location data from server
	 */
	function parse(rawData)
	{
		var markers=[]
			  count=0;
		//rawData is a single object
		if(rawData.length == undefined)
		{
			for (var j = rawData.longitude.length - 1; j >= 0; j--) {
				var marker={
					id:count++,
					userId:rawData["user_id"],
					device:
					{
						"id":rawData["device_id"],
						"type":rawData["device_type"]
					},
					latitude:rawData.latitude[j],
					longitude:rawData.longitude[j],
					locationProvider:rawData.provider[j],
					speed: rawData.speed[j],
					timestamp: new Date(rawData.timestamps[j]/1000000)
				}
			}
		}

		//rawData is an array
		for (var i = rawData.length - 1; i >= 0; i--) {
			for (var j = rawData[i].longitude.length - 1; j >= 0; j--) {
				var marker={
					id:count++,
					userId:rawData[i]["user_id"],
					device:
					{
						"id":rawData[i]["device_id"],
						"type":rawData[i]["device_type"]
					},
					latitude:rawData[i].latitude[j],
					longitude:rawData[i].longitude[j],
					locationProvider:rawData[i].provider[j],
					speed: rawData[i].speed[j],
					timestamp: new Date(rawData[i].timestamps[j]/1000000)
				}
				markers.push(marker);
			}
		}
		return markers;
	}

	/**
	 * MarkerService.filter.location 
	 * @return
	 * 	filtered marker array by location with latitude and longitude properties
	 * @params
	 * markers -  single marker or an array of markers
	 * coords - Object with latitude and longitude properties
	 * threshold - max threshold distance from specified location
	 */
	function filterLocation(markers, coords, threshold)
	{
		threshold = threshold || 0;
		
		//markers is a single object
		if(markers.length == undefined)
		{
			return (LocationService.distance(markers, coords)*100000 <  threshold);
		}

		//markers is an array	
		return markers.filter(function(marker)
		{
        	return (LocationService.distance(marker, coords)*100000 <  threshold)
		});
	}

	function filterUser(markers, userId)
	{
		console.log(userId)
		return markers.filter(function(marker)
        {
        	console.log(marker.userId)
            return marker.userId == userId;
        });
	}

	/**
	 * MarkerService.stat.speed 
	 * @return
	 * 	Average speed of markers
	 * @params
	 * 	markers -  single marker or an array of markers
	 */
	function statSpeed(markers)
	{
		var count=0,
			speed=0;
		for (var i = markers.length - 1; i >= 0; i--) {
			count++;
			speed+=markers[i].speed;
		}
		return speed/count;
	}


	return this;
}]);