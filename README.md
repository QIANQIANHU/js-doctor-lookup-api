# Doctor Lookup

#### It's an application where user may search for help about a specific medical issue.

#### By Malgorzata Haniszewska

## Description
Everybody needs to see a doctor sometimes. But finding a doctor that provides the services you need nearby can be time consuming. This website allows users to enter a medical issue (ie: “sore throat”, "rash", etc.) into a form, submit it, and receive a list of doctors in Seattle who can treat their medical issue. It uses API request from to following webpage:
* https://developer.betterdoctor.com/

## Setup/Installation Requirements

* Clone GitHub repository to your personal device using terminal command $ git clone https://github.com/yetka/s-doctor-lookup-api
* go to root directory of this project
* run $ npm install
* run $ bower install
* in root directory of this project create .env file using command $ touch .env
* go to https://developer.betterdoctor.com/ and apply for your apiKey, then implement it to .env file:
  exports.apiKey = "[yourApiKeyHere]";
* run $ gulp build
* run $ gulp serve

## Support and contact details

Contact email: gosia.haniszewska@gmail.com

## Technologies Used

* HTML
* CSS
* Javascript
* Node
* Jasmine and Karma
* ES6
* AJAX

### License

This project is licensed under the MIT License.
