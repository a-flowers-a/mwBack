//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

const port = 3030;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// parse application/json
app.use(bodyParser.json())

/*SINCE REACT IS ON PORT 3000, WE MUST PROVIDE ACCESS FROM ANOTHER 'SITE'*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");//,Content-Length, X-Foo, X-Bar
  res.header("Access-Control-Allow-Methods", "GET, DELETE, POST");
  next();
});

/*
Since there will be many routes, they will have their
own file so this one isn't full of code
*/

const DictionaryRoute = require('./DictionaryRoute');
app.use("/word", DictionaryRoute);
const UsersRoute = require("./UsersRoute");
app.use("/user", UsersRoute);

/*app.post("/search", function(req, res){
	console.log("la word");
	console.log(req.body.word);
	
  res.json({
    //success: true,
    prueba: 'la prueba',  
    jala: 'a ver si jala'
  }); 
  //res.end(JSON.stringify(response));
});*/

app.listen(port, function() {
  console.log("Server started on port "+port);
});
