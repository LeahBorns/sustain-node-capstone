$(document).ready(function () {
            // hide everything except logo on page load
            $('.friendsSection').hide();
            $('.overallFeed').hide();
            $('.activitiesSection').hide();
            $('.profileInfo').hide();
            $('.login').show();


            //step 1 get the input from the user
            $("#enter-site").submit(function (event) {

                //force javacript to handle the submission
                event.preventDefault();

                //get the value from the input box
                let userSearch = $("#text-box").val();



                //use the value to call the getResults function defined below
                DataFromUser(userSearch);

            })
