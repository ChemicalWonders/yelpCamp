var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Salmon Creek",
// 		image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"
// 	}, function(err, campground) {
// 		if(err) {
// 			console.log(err);
// 		}
// 		else {
// 			console.log("Newly created campground: ");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res){
	res.render("index");
});

app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
	
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.post("/campgrounds",function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.imageURL;

	var newCampground = { name: name, image: image}
	//Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreatedCampground){
		if(err){
			console.log(err);
		} else {
			console.log("New Campground Successfully Added");
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});

app.listen(8000, function(){
	console.log("Server started on 8000");
});