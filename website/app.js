/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=24e0a7665603ae3e0a0ffba9db7fe6bd";
let zipCode;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+"."+ d.getDate()+"."+ d.getFullYear();

document.getElementById("generate").addEventListener("click", generateWeather);

function generateWeather(){
  const zipCode = document.getElementById("zip").value;
  const userRes = document.getElementById("feelings").value;
  getWeather(baseURL, zipCode, apiKey)
  .then(function(data) {
    postData("/addWeather", {temperature: data.main.temp, date: d, userResponse: userRes});
  });
};

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