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

$(document).ready(function () {
  $("#searching-issue-form").submit(function (event) {
    event.preventDefault();

    var issue = $("#issue").val();
    $("#issue").val("");
    var newIssue = new _medicalHelper.IssueHelper(issue);

    $.ajax({
      //location is fixed to Seattle by providing its latitude and longitude in url
      url: 'https://api.betterdoctor.com/2016-03-01/doctors?query=' + issue + '&location=37.773%2C-122.413%2C100&skip=0&limit=10&user_key=' + apiKey,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function success(response) {
        $(".issue-results-succes").show();
        $("#searching-issue").text(issue);
        response.data.forEach(function (doctorPractice) {
          $("#last-name").prepend("<li>" + doctorPractice.practices[0].name + "</li>");
        });
      },

      error: function error() {
        $(".issue-results-error").show();
        $("#issue-errors").text("There was an error processing your request about issue. Please try again.");
      }
    });
  });
});

},{"./../.env":1,"./../js/medical-helper.js":2}]},{},[3]);
