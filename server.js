const path = require("path");
const express = require("express");
var createError = require("http-errors");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRouter);
app.use("/", indexRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.render("NotFound.ejs");
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.render("NotFound.ejs");
});

module.exports = app;
