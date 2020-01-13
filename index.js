var inquirer = require("inquirer");
var fs = require("fs");
const axios = require("axios");
var generateHTML = require("./generateHTML");

var queryURL = `https://www.google.com/maps/search/?api=1&query=`;

inquirer.prompt(
    [
        {
            type: "input",
            message: "Enter your GitHub username:",
            name: "github"
        },
        {
            type: "list",
            message: "Enter your favorite color:",
            name: "color",
            choices: [
                "green",
                "blue",
                "pink",
                "red"
            ]
        }
    ]).then(function(data) {
        const queryUrl = `https://api.github.com/users/${data.github}`;

        axios.get(queryUrl).then(function(res) {

            axios.get(`https://api.github.com/users/${res.data.login}/starred`).then(function(starsResult) {
                const portfolioHTMLStr = generateHTML.generateHTML(data, res, starsResult.data.length);
                var filename = data.github + ".html";
                writeToFile(filename, portfolioHTMLStr);
            });
        });
    });

    function writeToFile(fName, data) {
        fs.writeFile(fName, data, function(err) {
            if (err) {
            return console.log(err);
            }
            console.log("Success!");
        });
    }