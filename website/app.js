/* Global Variables */
let baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=24e0a7665603ae3e0a0ffba9db7fe6bd";
let zipCode;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+"."+ d.getDate()+"."+ d.getFullYear();