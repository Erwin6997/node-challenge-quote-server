// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

//lodash.js
const lodash = require('lodash');
app.get("/quick" , (req , res) =>{
  lodash.sample(quotes)
  res.send(lodash.sample(quotes));
});

var cors = require('cors')
app.use(cors())

app.get('/foo', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*')
})
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server! Ask me for! for random quote : /quotes/random or /quick , for all quotes : /quotes , for search quotes : /quotes/search ! ");
});

//START OF YOUR CODE...
app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.get("/quotes/random" , (req, res) =>{
  res.send(pickFromArray(quotes));
})
// search 

app.get('/quotes/search', (req, res) => {
  const term = req.query;
  const search = quotes.filter((element) => {
    element.quote.toLowerCase().includes(term.term.toLowerCase()) ||
    element.author.toLowerCase().includes(term.term.toLowerCase())
  })
  res.send(lodash.sample(search));
});

app.get('/two', function(req, res) {
  res.send("You asked for route /two")
});


//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
const port = process.env.PORT || 3000;
//Start our server so that it listens for HTTP requests!
const listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
