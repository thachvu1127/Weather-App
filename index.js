import express from "express";
import bodyParser from "body-parser";
import axios from "axios";



const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("http://api.weatherapi.com/v1/current.json?key=31d4fd31058e4e319d2212521240110&q=London&aqi=no");
        const result = response.data;
        res.render("index.ejs");
    } catch (error) {
        console.log("Failed to make request:", error.message);
    }
})

app.listen(port, () => {
    console.log("Listening on port " + port);
})