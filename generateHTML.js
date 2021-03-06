const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

function generateHTML(data, res, stars) {

  var locationStr = getLocationParameterStr(res.data.location);
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
      <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
      <title>Portfolio</title>
      <style>
          @page {
            margin: 0;
          }
          *,
          *::after,
          *::before {
          box-sizing: border-box;
          }
          html, body {
          padding: 0;
          margin: 0;
          }
          html, body, .wrapper {
          height: 100%;
          }
          .wrapper {
          background-color: ${colors[data.color].wrapperBackground};
          padding-top: 100px;
          }
          body {
          background-color: white;
          -webkit-print-color-adjust: exact !important;
          font-family: 'Cabin', sans-serif;
          }
          main {
          background-color: #E9EDEE;
          height: auto;
          padding-top: 30px;
          }
          h1, h2, h3, h4, h5, h6 {
          font-family: 'BioRhyme', serif;
          margin: 0;
          }
          h1 {
          font-size: 3em;
          }
          h2 {
          font-size: 2.5em;
          }
          h3 {
          font-size: 2em;
          }
          h4 {
          font-size: 1.5em;
          }
          h5 {
          font-size: 1.3em;
          }
          h6 {
          font-size: 1.2em;
          }
          .photo-header {
          position: relative;
          margin: 0 auto;
          margin-bottom: -50px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          background-color: ${colors[data.color].headerBackground};
          color: ${colors[data.color].headerColor};
          padding: 10px;
          width: 95%;
          border-radius: 6px;
          }
          .photo-header img {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          margin-top: -75px;
          border: 6px solid ${colors[data.color].photoBorderColor};
          box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
          }
          .photo-header h1, .photo-header h2 {
          width: 100%;
          text-align: center;
          }
          .photo-header h1 {
          margin-top: 10px;
          }
          .links-nav {
          width: 100%;
          text-align: center;
          padding: 20px 0;
          font-size: 1.1em;
          }
          .nav-link {
          display: inline-block;
          margin: 5px 10px;
          }
          .workExp-date {
          font-style: italic;
          font-size: .7em;
          text-align: right;
          margin-top: 10px;
          }
          .container {
          padding: 50px;
          padding-left: 30px;
          padding-right: 30px;
          }
  
          .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 20px;
          }
  
          .card {
            padding: 20px;
            border-radius: 6px;
            background-color: ${colors[data.color].headerBackground};
            color: ${colors[data.color].headerColor};
            margin: 20px;
          }
          
          .col {
          flex: 3;
          text-align: center;
          }
  
          a, a:hover {
          text-decoration: none;
          color: inherit;
          font-weight: bold;
          display: block;
          }
  
          @media print { 
            body { 
              zoom: .75; 
            } 
          }
          footer {
            background-color: ${colors[data.color].wrapperBackground};
            height: 150px;
            margin: 0 -100px -50px -100px;
          }
      </style>
    </head>
    <body>
    <div class="wrapper">
      <div class="container">
        <div class="photo-header">
          <img src=${res.data.avatar_url}>
          <div class="row">
            <div class="col">
              <h1>Hi!</h1>
              <h1>My name is ${res.data.name}!</h1>
              <h6>Currently @ ${res.data.company}</h6>
            </div>
          </div>
          <div class="row" style="width:100%">
            <div class="col">
              <a href="https://www.google.com/maps/search/?api=1&query=${locationStr}"><i class="fas fa-location-arrow"></i> ${res.data.location}</a>
            </div>
            <div class="col">
              <a href="https://github.com/${res.data.login}"><i class="fab fa-github-alt"></i> Github</a>
            </div>
            <div class="col">
              <a href=${res.data.blog}><i class="fas fa-rss"></i> Blog</a>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row" style="margin-top:30px;">
            <div class="col">
              <h5>${res.data.bio}</h5>
            </div>
          </div>
          <div class="row">
            <div class="col card">
              <h4>Public Repositories</h4>
              <h4>${res.data.public_repos}</h4>
            </div>
            <div class="col card">
              <h4>Followers</h4>
              <h4>${res.data.followers}</h4>
            </div>
          </div>
          <div class="row">
            <div class="col card">
              <h4>Github Stars</h4>
              <h4>${stars}</h4>
            </div>
            <div class="col card">
              <h4>Following</h4>
              <h4>${res.data.following}</h4>
            </div>
          </div>
        </div>
        <footer>
        </footer>
      </div>
    </div>
  </body>
  </html>`
}

//Function to construct the location parameter for google map
// Example: "City Hall, New York, NY" should be converted to City+Hall%2C+New+York%2C+NY
function getLocationParameterStr(locationStr) {
  var arr = locationStr.split("");
  var newArr = [];
  for(const val of arr) {
    if(val === " ") {
      newArr.push("+");
    }
    else if(val === ",") {
      newArr.push("%2C");
    }
    else {
      newArr.push(val);
    }
  }
  return newArr.join("");
}
module.exports.generateHTML = generateHTML;
