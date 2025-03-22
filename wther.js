const fs= require('fs');
const axios = require('axios');

const API_KEY = '5ef4907143a310904b9d4fca4fc55ed0';  // Replace with your actual API Key
const CITY = 'London';

async function whatsW() {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`
    );
    fs.writeFileSync('/storage/emulated/0/web2/weather app/data.json',JSON.stringify(response.data,null,2));
    console.log(response.data);
  } catch (error) {
    console.error('Could not get data:', error.response ? error.response.data : error.message);
  }
}

whatsW();
