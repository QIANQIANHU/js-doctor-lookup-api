import { IssueHelper } from './../js/medical-helper.js';
import { DoctorHelper } from './../js/medical-helper.js';
var apiKey = require('./../.env').apiKey;


$(document).ready(function() {
  $("#searching-issue-form").submit(function(event) {
    event.preventDefault();

    let issue = $("#issue").val();
    $("#issue").val("");
    let newIssue = new IssueHelper(issue);

    // $.ajax({
    //   url: `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${apiUserName} `,
    //   type: 'GET',
    //   data: {
    //     format: 'json'
    //   },
    //   success: function(response) {
    //     $(".issue-results-succes").show();
    //     $("#searching-issue").text(issue);
    //     $('#').text(response.);
    //
    //   },
    //
    //   error: function() {
    //     $(".issue-results-error").show();
    //     $("#issue-errors").text("There was an error processing your request about issue. Please try again.");
    //   }
    // });
  });
});
