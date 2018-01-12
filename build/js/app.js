(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "fcda610b41741d22e7507e3b5688da76";

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IssueHelper = exports.IssueHelper = function IssueHelper(issue) {
  _classCallCheck(this, IssueHelper);

  this.issue = issue;
};

var DoctorHelper = exports.DoctorHelper = function DoctorHelper(name) {
  _classCallCheck(this, DoctorHelper);

  this.name = name;
};

},{}],3:[function(require,module,exports){
'use strict';

var _medicalHelper = require('./../js/medical-helper.js');

var apiKey = require('./../.env').apiKey;

// Part about searching by issue
$(document).ready(function () {
  $("#searching-issue-form").submit(function (event) {
    event.preventDefault();

    var issue = $("#issue").val();
    $("#issue").val("");
    var newIssue = new _medicalHelper.IssueHelper(issue);

    $.ajax({
      //location is fixed to Seattle by providing its latitude and longitude in url
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?query=' + issue + '&location=47.606%2C-122.332%2C100&skip=0&limit=10&user_key=' + apiKey,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function success(response) {
        $(".issue-results-succes").show();
        $("#searching-issue").text(issue);
        if (response.meta.total === 0) {
          $("#responce-name").text("We are so sorry but no doctors meet the criteria. Try again!");
        } else {
          response.data.forEach(function (doctorPractice) {
            var confirmation = "";
            var acceptedNewPatient = doctorPractice.practices[0].accepts_new_patients;
            if (acceptedNewPatient === true) {
              confirmation += "Yes";
            } else {
              confirmation += "No";
            }
            $("#responce-issue").prepend("<li>" + doctorPractice.practices[0].name + "<ul>" + "<li>First name: " + doctorPractice.profile.first_name + "</li>" + "<li>Last name: " + doctorPractice.profile.last_name + "</li>" + "<li>Address: " + doctorPractice.practices[0].visit_address.city + ", " + doctorPractice.practices[0].visit_address.zip + ", " + doctorPractice.practices[0].visit_address.street + "</li>" + "<li>Phone number: " + doctorPractice.practices[0].phones[0].number + "</li>" + "<li>Website: " + doctorPractice.practices[0].website + "</li>" + "<li>Accepted new patients: " + confirmation + "</li>" + "</ul>" + "</li>");
          });
        }
      },
      error: function error() {
        $(".issue-results-error").show();
        $("#issue-errors").text("There was an error processing your request about issue. Please try again.");
      }
    });
  });
});

//Part about searching by doctor's name
$(document).ready(function () {
  $("#searching-name-form").submit(function (event) {
    event.preventDefault();

    var name = $("#name").val();
    $("#name").val("");
    var newDoctor = new _medicalHelper.DoctorHelper(name);

    $.ajax({
      //location is fixed to Seattle by providing its latitude and longitude in url
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?last_name=' + name + '&location=47.606%2C-122.332%2C100&skip=0&limit=10&user_key=' + apiKey,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function success(response) {
        $(".name-results-succes").show();
        $("#searching-name").text(name);
        if (response.meta.total === 0) {
          $("#responce-name").text("We are so sorry but no doctors meet the criteria. Try again!");
        } else {
          response.data.forEach(function (doctorPractice) {
            var confirmation = "";
            var acceptedNewPatient = doctorPractice.practices[0].accepts_new_patients;
            if (acceptedNewPatient === true) {
              confirmation += "Yes";
            } else {
              confirmation += "No";
            }
            $("#responce-name").prepend("<li>" + doctorPractice.practices[0].name + "<ul>" + "<li>First name: " + doctorPractice.profile.first_name + "</li>" + "<li>Last name: " + doctorPractice.profile.last_name + "</li>" + "<li>Address: " + doctorPractice.practices[0].visit_address.city + ", " + doctorPractice.practices[0].visit_address.zip + ", " + doctorPractice.practices[0].visit_address.street + "</li>" + "<li>Website: " + doctorPractice.practices[0].website + "</li>" + "<li>Accepted new patients: " + confirmation + "</li>" + "</ul>" + "</li>");
          });
        }
      },
      error: function error() {
        $(".name-results-error").show();
        $("#name-errors").text("There was an error processing your request about name. Please try again.");
      }
    });
  });
});

},{"./../.env":1,"./../js/medical-helper.js":2}]},{},[3]);
