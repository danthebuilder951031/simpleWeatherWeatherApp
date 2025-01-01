import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "48bb8e9e00a532b9edfed48809586416";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
let img_url = "default.png"; // Default image

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const lat = 7.207573;
  const lon = 125.395874;

  try {
    const result = await axios.get(`${API_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const weatherData = result.data.weather[0];
    const description = weatherData.description.toUpperCase();
    const temperature = Math.round((result.data.main.temp - 273.15).toFixed(2));
    const location = `${result.data.name}, ${result.data.sys.country}`;
    const main = weatherData.main;


    const weatherImages = {
        rain: "heavy-rain.png",
        snow: "snow.png",
        clouds: "cloudy.png",
        clear: "clear.png",
        thunderstorm: "thunderstorm.png",
        drizzle: "drizzle.png",
        mist: "mist.png",
        smoke: "smoke.png",
        fog: "fog.png",
        dust: "dust.png",
        tornado: "hurricane.png",
      };
      

      const img_url = weatherImages[main.toLowerCase()] || (console.log("Something went wrong"), undefined);

    res.render("index.ejs", { content: description, temp: temperature, location, main, img: img_url });
  } catch (error) {
    res.render("index.ejs", { content: "Error fetching weather data.", temp: "N/A", location: "Unknown", img: "error.png" });
  }
});

app.post("/search", async (req, res) => {
  const location = req.body.location;

  try {
    const result = await axios.get(`${API_URL}?q=${location}&appid=${apiKey}`);
    const weatherData = result.data.weather[0];
    const description = weatherData.description.toUpperCase();
    const temperature = Math.round((result.data.main.temp - 273.15).toFixed(2));
    const locName = `${result.data.name}, ${result.data.sys.country}`;
    const main = weatherData.main;

    const weatherImages = {
        rain: "heavy-rain.png",
        snow: "snow.png",
        clouds: "cloudy.png",
        clear: "clear.png",
        thunderstorm: "thunderstorm.png",
        drizzle: "drizzle.png",
        mist: "mist.png",
        smoke: "smoke.png",
        fog: "fog.png",
        dust: "dust.png",
        tornado: "hurricane.png",
      };
      

      const img_url = weatherImages[main.toLowerCase()] || (console.log("Something went wrong"), undefined);

    res.render("index.ejs", { content: description, temp: temperature, location: locName, main, img: img_url });
  } catch (error) {
    res.render("index.ejs", { content: "Error fetching weather data.", temp: "N/A", location: "Invalid location", img: "error.png" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
