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
    res.sendFile(path.normalize(__dirname + '/posts.json'))
})

var fs = require('fs');
var postsJson;

// Read the file and send to the callback
fs.readFile('./posts.json', handleFile)

//callback function
function handleFile(err, data) {
    if (err) throw err
    postsJson = JSON.parse(data)
    return postsJson;
}

app.get('/posts/:id', function(req , res){
	var postFound = postsJson.filter(function(item) {
    	return item.id == req.params.id;
	});
  res.send(JSON.stringify(postFound[0]));
});

app.post('/newPost', function(req, res) {
	var currentPosts = require('./posts.json');
    var title = req.body.title;
    var categories = req.body.categories;
    var content = req.body.content;
    var newestPost = {"id": Math.floor((Math.random()*10000) + 1), "title": title, "categories": categories, "content":content};

	currentPosts.push(newestPost);

	fs.writeFile('./posts.json', JSON.stringify(currentPosts), function (err) {
	  if(err){console.log(err)};
	});
	    res.send("posted");
});

app.delete('/deletePost/:id', function(req , res){
	var currentPosts = require('./posts.json');
	var shortenedPosts = currentPosts.filter(function(item){ 
		return item.id != req.params.id; 
	});
	fs.unlink('./posts.json', function(err) {
	   if (err) {
	       return console.error(err);
	   }
	});

	fs.writeFile('./posts.json', JSON.stringify(shortenedPosts), function (err) {
	    if(err){console.log(err)};
	});
  res.send("deleted");
});


// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});


