var inquirer = require("inquirer");
var fs = require("fs");
const axios = require("axios");
const puppeteer = require('puppeteer');
const path = require('path');
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
                writeToFile(data.github, filename, portfolioHTMLStr);
            });
        });
    });

function writeToFile(username, fName, data) {
        
    fs.writeFile(fName, data, function(err) {
        if (err) {
        return console.log(err);
        }
      });

    const printPdf = async () => {
        const buildPathHTML = path.resolve(`./${fName}`);
        console.log('Starting: Generating PDF Process, Kindly wait ..');
        /** Launch a headleass browser */
        const browser = await puppeteer.launch();
        /* 1- Ccreate a newPage() object. It is created in default browser context. */
        const page = await browser.newPage();
        /* 2- Will open our generated `.html` file in the new Page instance. */
        await page.goto(buildPathHTML, { waitUntil: 'networkidle0' });
        /* 3- Take a snapshot of the PDF */
        const pdf = await page.pdf({
            format: 'A4',
            margin: {
                top: '10px',
                right: '10px',
                bottom: '10px',
                left: '10px'
            }
        });
        /* 4- Cleanup: close browser. */
        await browser.close();
        console.log('Ending: Generating PDF Process');
        return pdf;
    };
    
    const init = async () => {
        try {
            const pdf = await printPdf();
            let buildPathPdf = getPdfPath();
          
            fs.writeFileSync(buildPathPdf, pdf);
            console.log('Succesfully generated PDF');
        } catch (error) {
            console.log('Error generating PDF', error);
        }
    };
    //Function to increment the version of the PDF file and save as another file if the person's portfolio already exists
    function getPdfPath() {
        let buildPathPdf = path.resolve(`./${username}.pdf`);
        //Remove the .pdf extension using slice()
        buildPathPdf = buildPathPdf.slice(0,-4);
        var count = 1;
        while(fs.existsSync(buildPathPdf + ".pdf")) {
            if(count == 1)
                buildPathPdf += `_${count}`;
            else if(count < 10) {
                buildPathPdf = buildPathPdf.slice(0,-2);
                buildPathPdf += `_${count}`;
            }
            else if(count > 9) {
                buildPathPdf = buildPathPdf.slice(0,-3);
                buildPathPdf += `_${count}`;
            }
            count++;
        }
        buildPathPdf += ".pdf";
        return buildPathPdf;
    }
    init();
}
