'use strict'

//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./models/comment');

//create instances
let app = express();
let router = express.Router();

// set port to env or 3000
let port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://localhost/mern-comment-box');

//config API to use bodyParser and look for JSON in req.body
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

//adding the /comments route to our /api router
router.get('/comments', function(req, res) {
  Comment.find(function(err, comments) {
    if (err)
      res.send(err)
    res.json(comments)
  });
})

router.post('/comments', function(req, res) {
  let newComment = {
    author: req.body.author,
    text: req.body.text
  };
  Comment.create(newComment, function(err, comment) {
    if(err)
      res.send(err)
    res.json(comment)
  })
})

// delete all comments
router.route('/nuke').get(function(req,res){
  Comment.remove(function(err,succ){
  res.json(succ);
  });
});

//use router config when we call /API
app.use('/api', router);

//start server
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
