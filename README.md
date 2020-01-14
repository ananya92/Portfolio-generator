# Portfolio-generator
A command line tool that dynamically generates PDF portfolio by taking GitHub username as input. The application can be invoked with the following command:

```sh
node index.js
```

The user will be prompted for a favorite color, which will be used as the background color for cards.

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User's location via Google Maps
  * User's GitHub profile
  * User's blog
* User's bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following the user

## Business Context

When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

## Deployed application URL

https://ananya92.github.io/Portfolio-generator/