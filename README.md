# express-static-file-server as blog api
## uses json file for storage - no database

## Running

1. ```npm install```
2. ```node app.js```
2. ```running on localhost:3000```

routes: http://localhost:3000/posts/  --get all posts
		...'/posts/:id'  --get one; put/update
		...'/newPost'    --add
		...'/deletePost/:id'