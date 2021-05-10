/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=24e0a7665603ae3e0a0ffba9db7fe6bd&units=imperial";
let zipCode;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+"."+ d.getDate()+"."+ d.getFullYear();

//Event listener for 'Generate' button
document.getElementById("generate").addEventListener("click", generateWeather);

//Callback function for event listener
function generateWeather(){
  const zipCode = document.getElementById("zip").value;
  const userRes = document.getElementById("feelings").value;
  if (zipCode == '') {
    document.getElementById("zipError").innerHTML = "Zip code field is required";
  } else {
    document.getElementById("zipError").innerHTML = "";
    getWeather(baseURL, zipCode, apiKey)
      .then(function(data) {
        return postData("/addWeather", {temperature: data.main.temp, date: d, userResponse: userRes});
      })
      .then(updateUI);
  }
};

//GET request to the OpenWeatherMap api
const getWeather = async (bURL, zip, key) => {
  const res = await fetch(bURL+zip+key);

  try{
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", console.error);
  }
}

//POST requests to add the data (from api and from a user) to the app
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

//Showing the info to a user
const updateUI = async () => {
  const request = await fetch("/recentData");

  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("date").innerHTML = allData.currentDate;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.userResponse;
  } catch (error) {
    console.log("error", error);
  }
}