import { IssueHelper } from './../js/medical-helper.js';
import { DoctorHelper } from './../js/medical-helper.js';
var apiKey = require('./../.env').apiKey;

// Part about searching by issue
$(document).ready(function() {
  $("#searching-issue-form").submit(function(event) {
    event.preventDefault();

    let issue = $("#issue").val();
    $("#issue").val("");
    let newIssue = new IssueHelper(issue);

    $.ajax({
      //location is fixed to Seattle by providing its latitude and longitude in url
      url: `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=47.606%2C-122.332%2C100&skip=0&limit=5&user_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $(".issue-results-succes").show();
        $("#searching-issue").text(issue);
        if (response.meta.total === 0) {
          $("#responce-issue").text("We are so sorry but no doctors meet the criteria. Try again!")
        } else {
          response.data.forEach(function(doctorPractice) {
            let confirmation = "";
            let acceptedNewPatient = doctorPractice.practices[0].accepts_new_patients;
            if (acceptedNewPatient === true) {
              confirmation += "Yes"
            } else {
              confirmation += "No"
            }
            $("#responce-issue").prepend("<li>"+ doctorPractice.practices[0].name +
                                          "<ul>" +
                                            "<li>First name: " + doctorPractice.profile.first_name + "</li>" +
                                            "<li>Last name: " + doctorPractice.profile.last_name + "</li>" +
                                            "<li>Address: " + doctorPractice.practices[0].visit_address.city + ", " + doctorPractice.practices[0].visit_address.zip + ", "  + doctorPractice.practices[0].visit_address.street + "</li>" +
                                            "<li>Phone number: " + doctorPractice.practices[0].phones[0].number + "</li>" +
                                            "<li>Website: " + doctorPractice.practices[0].website + "</li>" +
                                            "<li>Accepted new patients: " + confirmation + "</li>" +
                                          "</ul>" +
                                        "</li>");
          });
        }
      },
      error: function() {
        $(".issue-results-error").show();
        $("#issue-errors").text("There was an error processing your request about issue. Please try again.");
      }
    });
  });
});


//Part about searching by doctor's name
$(document).ready(function() {
  $("#searching-name-form").submit(function(event) {
    event.preventDefault();

    let name = $("#name").val();
    $("#name").val("");
    let newDoctor = new DoctorHelper(name);

    $.ajax({
      //location is fixed to Seattle by providing its latitude and longitude in url
      url: `https://api.betterdoctor.com/2016-03-01/doctors?last_name=${name}&location=47.606%2C-122.332%2C100&skip=0&limit=5&user_key=${apiKey}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $(".name-results-succes").show();
        $("#searching-name").text(name);
        if (response.meta.total === 0) {
          $("#responce-name").text("We are so sorry but no doctors meet the criteria. Try again!")
        } else {
          response.data.forEach(function(doctorPractice) {
            let confirmation = "";
            let acceptedNewPatient = doctorPractice.practices[0].accepts_new_patients;
            if (acceptedNewPatient === true) {
              confirmation += "Yes"
            } else {
              confirmation += "No"
            }
            $("#responce-name").prepend("<li>"+ doctorPractice.practices[0].name +
                                          "<ul>" +
                                            "<li>First name: " + doctorPractice.profile.first_name + "</li>" +
                                            "<li>Last name: " + doctorPractice.profile.last_name + "</li>" +
                                            "<li>Address: " + doctorPractice.practices[0].visit_address.city + ", " + doctorPractice.practices[0].visit_address.zip + ", "  + doctorPractice.practices[0].visit_address.street + "</li>" +
                                            "<li>Website: " + doctorPractice.practices[0].website + "</li>" +
                                            "<li>Accepted new patients: " + confirmation + "</li>" +
                                          "</ul>" +
                                        "</li>");
          });
        }
      },
      error: function() {
        $(".name-results-error").show();
        $("#name-errors").text("There was an error processing your request about name. Please try again.");
      }
    });
  });
});
