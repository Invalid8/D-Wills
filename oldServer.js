const path = require("path");
const { logger, logEvents } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorhandler");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3600;
const cors = require("cors");

// custom middleware logger
app.use(logger);

//contain all the domain that will access the back end
const whitelist = [
    "https://www.yoursite.com",
    "http://127.0.0.1:5500",
    "http://localhost:3600",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionSuccessStatus: 200,
};

//apply cors - cross origin resource sharing
// app.use(cors());
app.use(cors(corsOptions));

//middlewares -or form data
app.use(express.urlencoded({ extended: false }));

//middleware for json
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname });
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "/new-page.html"); //302 by default
});
//Route Handlers

app.get(
    "/hello(.html)?",
    (req, res, next) => {
        console.log("attempted to load hello.html");
        next();
    },
    (req, res) => {
        res.send("Hello World");
    }
);

const one = (req, res, next) => {
    console.log("one");
    next();
};

const two = (req, res, next) => {
    console.log("two");
    next();
};

const three = (req, res, next) => {
    console.log("three");
    res.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);

// app.use('/')

//apply to all http methods
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errHandler);

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
