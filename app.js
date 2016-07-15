var express = require('express');
var path = require('path');
var app = express();
var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Define the port to run on
app.set('port', 3000);


app.get('/posts',function(req,res){
	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
    res.send(currentPosts);
})

var fs = require('fs');

app.get('/posts/:id', function(req , res){
 	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
	var foundPost = currentPosts.filter(function(item){ 
		return item.id == req.params.id; 
	});
	res.send(foundPost[0]);
});

app.post('/newPost', function(req, res) {
	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
    var title = req.body.title;
    var categories = req.body.categories;
    var content = req.body.content;
    var newestPost = {"id": Math.floor((Math.random()*10000) + 1), "title": title, "categories": categories, "content":content};

	currentPosts.push(newestPost);

	fs.writeFile('./posts.json', JSON.stringify(currentPosts), function (err) {
	  if(err){console.log(err)};
	});
 res.send(newestPost);    
});

app.delete('/deletePost/:id', function(req , res){
	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
	var shortenedPosts = currentPosts.filter(function(item){ 
		return item.id != req.params.id; 
	});

	fs.writeFile('./posts.json', JSON.stringify(shortenedPosts), function (err) {
	    if(err){console.log(err)};
	});
  res.send("deleted");
});

app.put('/posts/:id', function(req , res){
 	var requireNew = require('require-new');
	var currentPosts = requireNew('./posts.json');
	var otherPosts = currentPosts.filter(function(item){ 
		return item.id != req.params.id; 
	});
	var title = req.body.title;
    var categories = req.body.categories;
    var content = req.body.content;
    var updatedPost = {"id": parseInt(req.params.id), "title": title, "categories": categories, "content":content};

	otherPosts.push(updatedPost);
	fs.writeFile('./posts.json', JSON.stringify(otherPosts), function (err) {
	    if(err){console.log(err)};
	});

	res.send(updatedPost);
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});


