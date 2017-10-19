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
var currentScore = 5;
var allActivities = [];

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
    //    $('*').scrollTop(0);
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
    $('#total-points').text(currentScore + myActivities.activityPoints);
}

function showActivitiesPage(allActivities) {

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

function displayAllActivities() {

    let buildActivity = "";
    $.each(myActivities, function (myActivitiesKey, myActivitiesValue) {

        buildActivity += "<div class='activityBoxes'>";
        buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
        buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
        buildActivity += "<h3 class='activityPointsValue'> "
        'Points:' + myActivitiesValue.activityPoints + "</h3><br>";

        buildActivity += "<button class='addButton' id='add-button' role='button' type='submit'>Add Category</button><br>";
        buildActivity += "</div>";
    });

    $('.activityBoxesSection').html(buildActivity);
};


function displaySelectedActivities(categoryName, categoryPoints) {

    let buildActivity = "";
    $.each(myActivities, function (myActivitiesKey, myActivitiesValue) {

        if ((categoryName !== "") && (categoryName == myActivitiesValue.activityName) && (categoryPoints !== "") && (categoryPoints == myActivitiesValue.activityPoints)) {
            buildActivity += "<div class='activityBoxes'>";
            buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
            buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
            buildActivity += "<h3 class='activityPointsValue'> "
            'Points:' + myActivitiesValue.activityPoints + "</h3><br>";
            buildActivity += "<button class='addButton' id='add-button' role='button' type='submit'>Add Category</button><br>";
            buildActivity += "</div>";
        } else if ((categoryName !== "") && (categoryName == myActivitiesValue.activityName) && (categoryPoints == "")) {
            buildActivity += "<div class='activityBoxes'>";
            buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
            buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
            buildActivity += "<h3 class='activityPointsValue'> "
            'Points:' + myActivitiesValue.activityPoints + "</h3><br>";

            buildActivity += "<button class='addButton' id='add-button' role='button' type='submit'>Add Category</button><br>";
            buildActivity += "</div>";
        } else if (((categoryName == "") && (categoryPoints !== "") && (categoryPoints == myActivitiesValue.activityPoints))) {
            buildActivity += "<div class='activityBoxes'>";
            buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
            buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
            buildActivity += "<h3 class='activityPointsValue'> "
            'Points:' + myActivitiesValue.activityPoints + "</h3><br>";

            buildActivity += "<button class='addButton' id='add-button' role='button' type='submit'>Add Category</button><br>";
            buildActivity += "</div>";
        } else {
            buildActivity += "<h3 class='activityNameValue'> Please select category name or points</h3>";
        }
    });

    $('.activityBoxesSection').html(buildActivity);
};

//Page loads to SIGN-IN PAGE
//1. User enters user name and password. Press enter to enter site
$(document).ready(function () {
    // when page first loads
    //    $('*').scrollTop(0);

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
                    console.log(loggedinUserName);
                    sustainGoals = result.goals;
                    console.log(sustainGoals);

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


    // ACTIVITIES: Show all activities.
    //allow user to pick from pull down certain activities/points
    //when user clicks Add activity button from #activities-page
    $('#js-activities').on('click', function (event) {
        event.preventDefault();
        showActivitiesPage(allActivities);
        displayAllActivities();
    });

    $('.pullDownCategories').on('click', function (event) {
        event.preventDefault();
        displaySelectedActivities();
    });

    //Activity added
    $('#js-add-activity').on('click', function (event) {
        event.preventDefault();
        const categoryCheckBox = $('.checkbox').val();
        const categoryActivityName = $('.activityNameValue').val();
        const categoryActivityImage = $('.activityImageValue').val();
        const categoryActivityPoints = $('.activityPointsValue').val();

        console.log(categoryCheckBox);
        console.log(activityDescription, categoryActivityName, categoryActivityImage, categoryActivityPoints, loggedinUserName);

        if (categoryCheckBox != 'completed') {
            alert('Must be checked');
        } else {
            const newAddedActivity = {
                activityName: categoryActivityName,
                activityImage: categoryActivityImage,
                activityPoints: categoryActivityPoints,
                username: loggedinUserName
            };
            console.log(newAddedActivity);

            $.ajax({
                    type: 'POST',
                    url: '/category/add',
                    dataType: 'json',
                    data: JSON.stringify(newAddedActivity),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    event.preventDefault();
                    alert('Congrats! You added a task');

                    function completedActivity(completeActivityArray) {

                        let buildAddedActivity = "";
                        $.each(activityArray, function (complete) {
                            buildCompletedActivity += "<div class='animated flipOutY'>";
                            buildCompletedActivity += "<h3>Congrats!</h3>"
                            buildCompletedActivity += "<p> You added " + myActivities.activityName + '!'
                            "<p>";
                            buildCompletedActivity += "</div>";
                        });
                        $('.activityBoxes').html(buildAddedActivity);
                    };
                })

                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        };
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
    $('.activityForm').on('submit', function (event) {
        event.preventDefault();
        const checkBox = $('.checkbox').val();
        const activityDescription = $('.textBox').val();
        const profileActivityName = $('.activityNameValue').val();
        const profileActivityImage = $('.activityImageValue').val();
        const profileActivityPoints = $('.activityPointsValue').val();

        //        const profileActivityName = $('.activityNameValue').val(myActivities.activityName);
        //        const profileActivityImage = $('.activityImageValue').val(myActivities.activityImage);
        //        const profileActivityPoints = $('.activityPointsValue').val(myActivities.activityPoints);

        console.log(checkBox);
        console.log(activityDescription, profileActivityName, profileActivityImage, profileActivityPoints, loggedinUserName);

        if (checkBox != 'completed') {
            alert('Must be checked');
        } else if (activityDescription.length < 10) {
            alert('Must be at least 10 characters');
        } else {
            const newActivityCompleted = {
                activityDescription: activityDescription,
                activityName: profileActivityName,
                activityImage: profileActivityImage,
                activityPoints: profileActivityPoints,
                username: loggedinUserName
            };
            console.log(newActivityCompleted);

            //            function displayResults(activityArray) {
            //
            //                console.log(activityArray);
            //                for (i = 0; i < myActivities; i++) {
            //                    let buildActivity = "";
            //                    $.each(activityArray, function (myActivities) {
            //                        buildActivity += "<div>";
            //                        buildActivity += "<img class='activityImageValue' src='" + myActivities.activityImage + "' alt='" + myActivities.category + "' category>";
            //                        buildActivity += "<h3 class='activityNameValue'> " + myActivities.activityName + "</h3><br>";
            //                        buildActivity += "<h3 class='activityPointsValue'> "
            //                        'Points:' + myActivities.activityPoints + "</h3><br>";
            //                        buildActivity += "<label for='checkbox'>Committed</label>";
            //                        buildActivity += "<input class='checkbox' type='checkbox' name='completed' value='completed'><br>";
            //                        buildActivity += "<p>Tell us about your experience</p><textarea class='textBox' name='textBox' id='text-box'></textarea>";
            //                        buildActivity += "<button class='completedActivity' role='button' type='submit'>I did it</button>";
            //                        buildActivity += "</div>";
            //                    });
            //                    $('.activityBoxes').append(buildActivity);
            //                };
            //            };

            $.ajax({
                    type: 'POST',
                    url: '/activity/add',
                    dataType: 'json',
                    data: JSON.stringify(newActivityCompleted),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    event.preventDefault();
                    alert('Congrats! You completed todays task');

                    function completedActivity(completeActivityArray) {

                        let buildCompletedActivity = "";
                        $.each(activityArray, function (complete) {
                            buildCompletedActivity += "<div class='animated flipOutY'>";
                            buildCompletedActivity += "<h3>Congrats!</h3>"
                            buildCompletedActivity += "<p> You completed " + myActivities.activityName + '!'
                            "<p>";
                            buildCompletedActivity += "</div>";
                        });
                        $('.activityBoxes').html(buildCompletedActivity);
                    };
                })

                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                });
        };
    });

    //PROFILE ACTIVITY POSTED TO FEED
    //    $('.activityForm').on('submit', function (event) {
    //        const profileActivityName = $('.activityNameValue').val();
    //        const profileActivityImage = $('.activityImageValue').val();
    //        const profileActivityPoints = $('.activityPointsValue').val();
    //
    //        console.log(activityDescription, profileActivityName, profileActivityImage, profileActivityPoints, loggedinUserName);
    //
    //        if (checkBox != 'completed') {
    //            alert('Must be checked');
    //        } else if (activityDescription.length < 10) {
    //            alert('Must be at least 10 characters');
    //        } else {
    //            const newActivityCompleted = {
    //                activityDescription: activityDescription,
    //                activityName: profileActivityName,
    //                activityImage: profileActivityImage,
    //                activityPoints: profileActivityPoints,
    //                username: loggedinUserName
    //            };
    //            console.log(newActivityCompleted);
    //
    //            function displayResults(activityArray) {
    //
    //                console.log(activityArray);
    //                for (i = 0; i < myActivities; i++) {
    //                    let buildCompletedActivity = "";
    //                    $.each(activityArray, function (myActivities) {
    //                        buildCompletedActivity += "<div>";
    //                        buildCompletedActivity += "<img class='activityImageValue' src='" + myActivities.activityImage + "' alt='" + myActivities.category + "' category>";
    //                        buildCompletedActivity += "<h3 class='activityNameValue'> " + myActivities.activityName + "</h3><br>";
    //                        buildCompletedActivity += "<h3 class='activityPointsValue'> "
    //                        'Points:' + myActivities.activityPoints + "</h3><br>";
    //                        buildCompletedActivity += "<label for='checkbox'>Committed</label>";
    //                        buildCompletedActivity += "<input class='checkbox' type='checkbox' name='completed' value='completed'><br>";
    //                        buildCompletedActivity += "<p>Tell us about your experience</p><textarea class='textBox' name='textBox' id='text-box'></textarea>";
    //                        buildCompletedActivity += "<button class='completedActivity' role='button' type='submit'>I did it</button>";
    //                        buildCompletedActivity += "</div>";
    //                    });
    //                    $('.activityBoxes').append(buildCompletedActivity);
    //                };
    //            };
    //
    //            $.ajax({
    //                    type: 'GET',
    //                    url: '/activity/show',
    //                    dataType: 'json',
    //                    data: JSON.stringify(newActivityCompleted),
    //                    contentType: 'application/json'
    //                })
    //                .done(function (result) {
    //                    event.preventDefault();
    //                    alert('Congrats! You completed todays task');
    //                })
    //                .fail(function (jqXHR, error, errorThrown) {
    //                    console.log(jqXHR);
    //                    console.log(error);
    //                    console.log(errorThrown);
    //                });
    //        };
    //    });
    // when user clicks sign-out link in header
    document.getElementById('js-signout-link').addEventListener('click', function (event) {
        location.reload();
    });

});
