var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
		{name: "Salmon Creek", image: "http://www.californiasbestcamping.com/photos5/salmon_creek_camp.jpg"},
		{name: "Grant Village", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/39/fc/d7/grant-village-campground.jpg"},
		{name: "Dry River Campsite", image: "https://www.reserveamerica.com/webphotos/NH/pid270015/0/180x120.jpg"}
	];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.post("/campgrounds",function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.imageURL;

	var newCampground = { name: name, image: image}
	campgrounds.push(newCampground);
	console.log("New Campground Successfully Added");
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

app.listen(8000, function(){
	console.log("Server started on 8000");
});