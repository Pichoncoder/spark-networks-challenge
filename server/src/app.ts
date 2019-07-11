import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());

app.use(morgan('tiny'));

app.get("/", (req, res) => {
    res.send("Spark Networks API");
});

export default app;