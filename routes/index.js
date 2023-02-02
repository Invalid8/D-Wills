var express = require("express");
var router = express.Router();
const { v4: uuid } = require("uuid");
const students = require("../model/students");

const User = {
    username: "daniel fadamitan",
    role: "admin",
};

let page = "";

router.get("/", function (req, res) {
    page = "home";
    console.log(students);
    res.render("index.ejs", { User, page });
});

router.get("/dashboards", function (req, res) {
    page = "dashboards";
    res.render("index.ejs", { User, page, students });
});

router.post("/add-data", (req, res, next) => {
    const { firstName, lastName, gender, Pnumber } = req.body;
    const data = {
        id: uuid(),
        firstName,
        lastName,
        gender,
        Pnumber,
    };
    students.push(data);
    console.log(students);
    page = "dashboards";
});

router.get("/daily-feeds", function (req, res) {
    page = "daily-feeds";
    res.render("index.ejs", { User, page, students });
});

router.get("/favorites", function (req, res) {
    page = "favorites";
    res.render("index.ejs", { User, page, students });
});

router.get("/notes", function (req, res) {
    page = "notes";
    res.render("index.ejs", { User, page, students });
});

router.get("/settings", function (req, res) {
    page = "settings";
    res.render("index.ejs", { User, page, students });
});

module.exports = router;
