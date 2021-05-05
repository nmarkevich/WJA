// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));


// Setup Server
const port = 5500;

const server = app.listen(port, () => {console.log(`server running on localhost ${port}`);});

//GET route that returns the projectData object
app.get("/", function(req, res) {
  res.send(projectData);
});

//POST route that adds incoming data to projectData
app.post("/", addData);

function addData (req, res){
  let newData = req.body;
  let newEntry = {
    temperature: newData.temperature,
    date: newData.date,
    userResponse: newData.userResponse
  }
  projectData.push(newEntry);
}