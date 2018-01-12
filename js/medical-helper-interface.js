import { IssueHelper } from './../js/medical-helper.js';
import { DoctorHelper } from './../js/medical-helper.js';
var apiKey = require('./../.env').apiKey;


$(document).ready(function() {
  $("#searching-issue-form").submit(function(event) {
    event.preventDefault();

    let issue = $("#issue").val();
    $("#issue").val("");
    let newIssue = new IssueHelper(issue);

    $.ajax({
      //location is fixed to Seattle by providing its latitude and longitude in url
      url: `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=37.773%2C-122.413%2C100&skip=0&limit=10&user_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $(".issue-results-succes").show();
        $("#searching-issue").text(issue);
        response.data.forEach(function(doctorPractice) {
          $("#last-name").prepend("<li>" + doctorPractice.practices[0].name + "</li>");
        });
      },

      error: function() {
        $(".issue-results-error").show();
        $("#issue-errors").text("There was an error processing your request about issue. Please try again.");
      }
    });
  });
});
