"use strict";

const myActivities = [
    {
        category: 'Food',
        activityName: 'Buy locally',
        activityImage: 'food.png',
        activityPoints: 4
    },
    {
        category: 'Food',
        activityName: 'Eat less meat',
        activityImage: 'food.png',
        activityPoints: 6
    },
    {
        category: 'Transportation',
        activityName: 'Pedal Power',
        activityImage: 'bike.png',
        activityPoints: 8
    },
    {
        category: 'Transportation',
        activityName: 'Look into carbon offsets',
        activityImage: 'bike.png',
        activityPoints: 10
    },
    {
        category: 'Water',
        activityName: "If it's yellow let it mellow",
        activityImage: 'water-drop.png',
        activityPoints: 2
    },
    {
        category: 'Water',
        activityName: 'Shorter you shower',
        activityImage: 'water-drop.png',
        activityPoints: 4
    },
    {
        category: 'Energy',
        activityName: 'Change bulbs to LED',
        activityImage: 'lightbulb.png',
        activityPoints: 10
    },
    {
        category: 'Energy',
        activityName: 'Keep house temp at 68&deg;F',
        activityImage: 'lightbulb.png',
        activityPoints: 6
    },
    {
        category: 'Waste',
        activityName: 'Use reuseable water bottle',
        activityImage: 'recycle.png',
        activityPoints: 4
    },
    {
        category: 'Waste',
        activityName: 'Avoid anything disposable',
        activityImage: 'recycle.png',
        activityPoints: 8
    },
    {
        category: 'Nature',
        activityName: 'Go outside for 30 minutes',
        activityImage: 'nature.png',
        activityPoints: 8
    },
    {
        category: 'Nature',
        activityName: 'Remove self from tech for 30 minutes',
        activityImage: 'nature.png',
        activityPoints: 6
    },
    {
        category: 'Health',
        activityName: 'Exercise 3x a week',
        activityImage: 'exercise.png',
        activityPoints: 8
    },
    {
        category: 'Health',
        activityName: 'Eat mindfully',
        activityImage: 'exercise.png',
        activityPoints: 6
    }
    ];



//PROFILE PAGE
//3.Brought to profile page. Fill out expereince click commited and click button
//button flips and says it was finished. Points added to user feed

//ACTIVITY PAGE
//4.Choose from practices. Select box and click add button.
//block will rotate to say activity added.
//5. Activties added to feed as done

//FRIENDS PAGE
//6. Points updated as friends commit. Search for friends.

// Function and object definitions
var user = undefined;
var loggedinUserName = '';
var sustainGoals = '';


function showSignInPage() {
    $('#friends-page').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').show();
    $('#js-signout-link').hide();
    $('#nav-links').hide();
}

function showNewUserPage() {
    $('*').scrollTop(0);
    $('#friends-page').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').hide();
    $('#register-page').show();
    $('#js-signout-link').hide();
    $('#login-page').hide();
    $('#nav-links').hide();
}

function showProfilePage(loggedinUserName, sustainGoals) {

    $('#friends-page').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').show();
    $('#register-page').hide();
    $('#login-page').hide();
    $('#js-signout-link').show();
    $('#js-signout-link').text("Sign out " + loggedinUserName);
    $('#nav-links').show();
    $('.profileUsername').text(loggedinUserName);
    $('.profileDescription').text(sustainGoals);
}

function showActivitiesPage() {

    $('#friends-page').hide();
    $('#feed-page').hide();
    $('#activities-page').show();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').hide();
    $('#js-signout-link').show();
    $('#nav-links').show();
}

function showOverallFeedPage() {

    $('#friends-page').hide();
    $('#feed-page').show();
    $('#activities-page').hide();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').hide();
    $('#js-signout-link').show();
    $('#nav-links').show();
}

function showFriendsPage() {

    $('#friends-page').show();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').hide();
    $('#js-signout-link').show();
    $('#nav-links').show();
}


//Page loads to SIGN-IN PAGE
//1. User enters user name and password. Press enter to enter site
$(document).ready(function () {
    // when page first loads
    $('*').scrollTop(0);

    $('#friends-page').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').show();
    $('#js-signout-link').hide();
    $('#nav-links').hide();

    // USER WITH ACCOUNT SIGNS IN

    $('#js-signin-button').on('click', function (event) {
        event.preventDefault();

        //        backToLandingPageToggle = false;
        // AJAX call to validate login info and sign user in
        const inputUname = $('input[name="signin-username"]').val();
        const inputPw = $('input[name="signin-pw"]').val();
        // check for spaces, empty, undefined
        if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {
            alert('Invalid username');
        } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
            alert('Invalid password');
        } else {
            const unamePwObject = {
                username: inputUname,
                password: inputPw
            };
            user = inputUname;


            $.ajax({
                    type: "POST",
                    url: "/signin",
                    dataType: 'json',
                    data: JSON.stringify(unamePwObject),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    console.log(result);
                    loggedinUserName = result.username;
                    sustainGoals = result.goals;

                    // show the signout link in header as soon as user is signed in
                    $('#js-signout-link').show();
                    //                    if (newUserToggle === true) {
                    showProfilePage(loggedinUserName, sustainGoals);
                    //                    } else {
                    //                        showProfilePage();
                    //                    }
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                    alert('Invalid username and password combination. Pleae check your username and password and try again.');
                });
        };
    });
    //
    //REGISTER PAGE
    //2. Visitor wants to create an account. Clicks create an account
    //Add username, email, password and verify password. Submit
    //and brought back to sign in page to sign in
    $('#js-new-account').on('click', function (event) {
        showNewUserPage();
    });
    $('#signup-button').on('click', function (event) {
        const form = document.body.querySelector('#new-user-form');
        if (form.checkValidity && !form.checkValidity()) {
            return;
        }
        const uname = $('input[name="username"]').val();
        const email = $('input[name="email"]').val();
        const pw = $('input[name="pw"]').val();
        const confirmPw = $('input[name="confirm-pw"]').val();
        const goals = $('input[name="goals"]').val();
        if (pw !== confirmPw) {
            event.preventDefault();
            alert('Passwords must match!');
        } else {
            event.preventDefault();
            const newUserObject = {
                username: uname,
                password: pw,
                email: email,
                goals: goals
            };
            // will assign a value to variable 'user' in signin step below
            // AJAX call to send form data up to server/DB and create new user
            $.ajax({
                    type: 'POST',
                    url: '/signup',
                    dataType: 'json',
                    data: JSON.stringify(newUserObject),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    event.preventDefault();
                    //                    newUserToggle = true;
                    alert('Thanks for signing up! You may now sign in with your username and password.');
                    showSignInPage();
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        };
    });


    // ACTIVITIES: when user clicks Add activity button from #activities-page
    $('#js-activities').on('click', function (event) {
        showActivitiesPage();
    });

    $('#js-add-activity').on('click', function (event) {
        event.preventDefault();
        // console.log('user is ' + user);
        //        backWarnToggle = true;
        //create an empty variable to store a new list item for each result
        let buildAddedActivity = "";

        $.each(addedActivity, function (addedActivityKey, addedActivityValue) {
            buildAddedActivity += "<div class='activityBoxes animated flipOutY'>";
            buildAddedActivity += "<h1>"
            'Added' + addedActivityKey.name + "</h1>";
            buildAddedActivity += "</div>";
        });


        // when user clicks I Did This button from #profile-page
        document.getElementById('js-submit-activity').addEventListener('click', function (event) {
            $.each(addedActivity, function (addedActivityKey, addedActivityValue) {
                buildAddedActivity += "<div class='activityBoxes animated flipOutY'>";
                buildAddedActivity += "<h1>" +
                    addedActivityKey.name + 'completed'
                "</h1>";
                buildAddedActivity += "</div>";
            });
            submitFinishedActivity(user);
            newUserToggle = false;
        });
    });

    //FEED PAGE from nav menu
    $('#js-feed').on('click', function (event) {
        showOverallFeedPage();
    });
    //    $.ajax({
    //            type: 'POST',
    //            url: '/feed/post',
    //            dataType: 'json',
    //            data: JSON.stringify(newUserObject),
    //            contentType: 'application/json'
    //        })
    //        .done(function (result) {
    //            event.preventDefault();
    //            alert('Congrats! You completed todays task');
    //        })
    //        .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });

    //FRIENDS PAGE from search icon on nav
    $('#js-search-friends').on('click', function (event) {
        showFriendsPage();
    });

    //PROFILE PAGE from image in nav
    $('#js-profile').on('click', function (event) {
        showProfilePage();
    });

    //1. If box is checked and textbox is filled in.
    //2. "I did it" button is pressed.
    //3. 'Card' spins around and says completed.
    //4. information from card shows up in feed
    $('.completedActivity').on('click', function (event) {
        const checkBox = $('.checkbox').val();
        const textBox = $('.textBox').val();
        const profileActivityName = $('activityNameValue').val(myActivities.activityName);
        const profileActivityImage = $('activityImageValue').val(myActivities.activityImage);
        const profileActivityPoints = $('activityPointsValue').val(myActivities.activityPoints);

        console.log(checkBox);
        console.log(textBox, profileActivityName, profileActivityImage, profileActivityPoints);

        if (checkBox != 'completed') {
            alert('Must be checked');
        } else if (textBox.length < 10) {
            alert('Must be at least 10 characters');
        } else {
            const newActivityCompleted = {
                activityDescription: textBox,
                activityName: profileActivityName,
                activityImage: profileActivityImage,
                activityPoints: profileActivityPoints,
                username: loggedinUserName
            };
            console.log(newActivityCompleted);
            $.ajax({
                    type: 'POST',
                    url: '/profile/:activity',
                    dataType: 'json',
                    data: JSON.stringify(newActivityCompleted),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    event.preventDefault();
                    alert('Congrats! You completed todays task');
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        };
    });

    // when user clicks sign-out link in header
    document.getElementById('js-signout-link').addEventListener('click', function (event) {
        location.reload();
    });

});
