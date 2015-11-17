var request = require('request'),
    cheerio = require('cheerio'),
    location = "pomona-ca-us",
    start_date = "20151116",
    end_date = "20151122",
    titles = [],
    infos = [],
    times = [],
    type = [],
    venues = [],
    cities = [],
    descs = [],
    json = '{\"events\":[';

request('http://www.yelp.com/events/'+location+'/browse?start_date='+start_date+'&end_date='+end_date, function(err, resp, body){
	var $ = cheerio.load(body);
	$('h2.title', '#main_events_list').each(function(){
		var title = $(this).children().children().text();
		var info = $(this).next().text();
		var desc = $(this).next().next().text();
		titles.push(title);
		infos.push(info);
		descs.push(desc.replace(/\r\n|\n|\r/gm,"").trim());
	})
	for(i = 0; i < infos.length; i++){
		var elements = infos[i].split("\n");
		for(j = 0; j < elements.length; j++){
			elements[j] = elements[j].trim();
		}
		for(k = 0; k < elements.length; k++){
			if(elements[k] != ''){
				if(k == 2) {
					times.push(elements[k]);
				}
				else if(k == 4){
					type.push(elements[k]);
				}
				else if(k == 7){
					venues.push(elements[k]);
				}
				else if(k == 8){
					cities.push(elements[k]);
				}
			}
		}
	}
	for(i = 0; i < titles.length; i++) {
		//if(i == titles.length) {
			//json += '{\"title\":\"'+titles[i]+
			        //'\", \"time\":\"'+times[i]+
			        //'\", \"type\":\"'+type[i]+
			        //'\", \"venue\":\"'+venues[i]+
			        //'\", \"city\":\"'+cities[i]+
			        //'\", \"description\":\"'+descs[i]+'}]}';
		//}
		//else {
			//json += '{\"title\":\"'+titles[i]+
			        //'\", \"time\":\"'+times[i]+
			        //'\", \"type\":\"'+type[i]+
			        //'\", \"venue\":\"'+venues[i]+
			        //'\", \"city\":\"'+cities[i]+
			        //'\", \"description\":\"'+descs[i]+'}, ';
		//}
		console.log(titles[i]);
		console.log(times[i]);
		console.log(type[i]);
		console.log(venues[i]);
		console.log(cities[i]);
		console.log(descs[i]);
		console.log("-------------------------------------------------");
	}
	//var jsonObj = JSON.parse(json);
	//console.log(jsonObj);
});
