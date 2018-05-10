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
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Salmon Creek",
// 		image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
// 		description: "Famous Salmon have been seen over here in this campground."

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
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if (err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: allCampgrounds});
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
	var description = req.body.description;
	var newCampground = { name: name, image: image, description: description};
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

// SHOW - shows more info about a campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			//render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
	
	
});

app.listen(8000, function(){
	console.log("Server started on 8000");
});