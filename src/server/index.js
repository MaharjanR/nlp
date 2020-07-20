const path = require("path");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// create the Express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Enable All CORS Requests
app.use(cors());

// Will use the dist folder as root
app.use(express.static("dist"));

dotenv.config();

let news;

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

console.log(news);

app.post("/title", async (req, res) => {
    try {
        const allTitle = await axios
            .get("https://api.aylien.com/news/stories", {
                params: {
                    title: req.body.title,
                },
                headers: {
                    "X-AYLIEN-NewsAPI-Application-ID": process.env.API_ID,
                    "X-AYLIEN-NewsAPI-Application-Key": process.env.API_KEY,
                },
            })
            .then((data) => {
                let dataSet = data.data.stories; //array of objects
                console.log(dataSet.length);
                return dataSet.map((data) => data.title);
            })
            .catch((e) => {
                console.log(e);
            });

        news = allTitle;
        console.log(news);
        res.end("It worked!");
    } catch (e) {
        console.log(e);
    }
});

app.get("/title", (req, res) => {
    console.log("Get news");
    console.log(news);
    res.send(news);
});

const port = 8081;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
