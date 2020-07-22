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

let sentiment;

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

app.post("/title", async (req, res) => {
    try {
        console.log(
            `api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${req.body.title}`
        );
        const result = await axios.post(
            `http://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${req.body.title}`
        );

        const { data } = result;

        console.log(data);

        const { score_tag } = data;
        const { agreement } = data;
        const { subjectivity } = data;
        const { confidence } = data;
        const { irony } = data;

        // storing the api response
        sentiment = {
            score_tag,
            agreement,
            subjectivity,
            confidence,
            irony,
        };

        res.end("It worked!");
    } catch (e) {
        console.log(`Error = ${e}`);
    }
});

app.get("/sentiment", (req, res) => {
    console.log("Get Request");
    res.send(sentiment);
});

const port = process.env.port || 3000;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
