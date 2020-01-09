var inquirer = require("inquirer");
var fs = require("fs");

inquirer.prompt(
    [
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "Give a one-line introduction:",
            name: "introduction"
        },
        {
            type: "input",
            message: "Where do you stay?",
            name: "location"
        },
        {
            type: "input",
            message: "What is your dream job?",
            name: "dream_job"
        },
        {
            type: "input",
            message: "What are your hobbies?",
            name: "hobbies"
        },
        {
            type: "input",
            message: "Enter your LinkedIn URL:",
            name: "linkedin"
        },
        {
            type: "input",
            message: "Enter your Github URL:",
            name: "github"
        }
    ]
).then(function(data) {
    const portfolioHTMLStr =
    `<!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio generator</title>
        <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <header class='masthead'>
                <p id='masthead-intro'>Hi! I am</p>
                <h1 id='masthead-heading'>${data.name}</h1>
            </header>
            <section id="details">
            <h1>Introduction</h1>
            <p>${data.introduction}</p>
            <h1>Where I live</h1>
            <p>${data.location}</p>
            <h1>My dream job</h1>
            <p>${data.dream_job}</p>
            <h1>My favorite hobbies</h1>
            <p>${data.hobbies}</p>
            <h1>My LinkedIn page</h1>
            <p>${data.linkedin}</p>
            <h1>My Github page</h1>
            <p>${data.github}</p>
            </section>
            <footer id="footer">
            </footer>
            <script type="text/javascript" src="index.js"></script>
        </body>
    </html>`;

    var filename = data.name.toLowerCase().split(' ').join('') + ".html";

    fs.writeFile(filename, portfolioHTMLStr, function(err) {

        if (err) {
        return console.log(err);
        }

        console.log("Success!");
    });
});

