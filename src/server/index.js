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

// runs the function when post title is called from client
app.post("/title", async (req, res) => {
    try {
        // calls the api by passing API key, type i.e URL or word and the text which is url or word
        const result = await axios.post(
            `http://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&${req.body.type}=${req.body.title}`
        );

        // stores the result of the call in data
        const { data } = result;
        const { code } = data.status;

        // status code 200 is failed so runs following if not failed
        if (code !== "200") {
            // stores the below field in its own variable
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
        } else {
            // if error occurs then change the response to false
            sentiment = false;
        }
        res.end("It worked!");
    } catch (e) {
        console.log(`Error = ${e}`);
    }
});

// calls the function on get sentiment method
app.get("/sentiment", (req, res) => {
    // sends the sentiment variable
    res.send(sentiment);
});

// setting up the port in 3000 if no .env.port present in .env file
const port = process.env.port || 3000;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log("Example app listening on port " + port);
});
