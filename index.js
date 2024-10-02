import express from "express";
import bodyParser from "body-parser";
import axios from "axios";



const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded( {extended: true }));

app.get("/", async (req, res) => {
    try {
        res.render("index.ejs");
    } catch (error) {
        console.log("Failed to make request:", error.message);
    }
})

app.post("/submit", async (req, res) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    

    
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=31d4fd31058e4e319d2212521240110&q=${req.body.location}&aqi=no`);
        const data = response.data;
        const splitDate = data.location.localtime.split(" ")[0];
        const splitTime = data.location.localtime.split(" ")[1];
        const d = new Date(splitDate);
        const curentDay = days[d.getUTCDay()]

        res.render("index.ejs", {
            temp: `${data.current.temp_f}° F`,
            city: data.location.name,
            condition: data.current.condition.text,
            date: `${splitDate} ${curentDay} ${splitTime}`
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
    }

});

app.listen(port, () => {
    console.log("Listening on port " + port);
})