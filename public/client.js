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
        activityName: 'If yellow let it mellow',
        activityImage: 'water-drop.png',
        activityPoints: 2
    },
    {
        category: 'Water',
        activityName: 'Shorten your shower',
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
        activityName: 'Keep house temp at 68F',
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
        activityName: 'Write down 3 things you are grateful for',
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
var loggedinPassword = '';
var sustainGoals = '';
var currentScore = 5;
var allActivities = [];

function displayError(message) {
    $("#messageBox span").html(message);
    $("#messageBox").fadeIn();
    $("#messageBox").fadeOut(10000);
};

///////////////////////////////REGISTER AND SIGN UP////////////////////////////
function showSignInPage() {
    $('#friends-page').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').show();
    $('#js-signout-link').hide();
    $('#nav-links').hide();
    $('.addedCategoryCard').hide();
    $('.nav-form').show();
}

//function showNewUserPage() {
//    //    $('*').scrollTop(0);
//    $('#friends-page').hide();
//    $('#feed-page').hide();
//    $('#activities-page').hide();
//    $('#profile-page').hide();
//    $('#register-page').show();
//    $('#js-signout-link').hide();
//    $('#login-page').hide();
//    $('#nav-links').hide();
//    $('.addedCategoryCard').hide();
//}

////////////////////////////PROFILE PAGE FUNCTIONS////////////////////////////////

// SHOW PROFILE PAGE
function showProfilePage(loggedinUserName, sustainGoals) {

    $('#friends-page').hide();
    $('.addedCategoryCard').hide();
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
    displayProfileActivities(myActivities);
    $('.nav-form').hide();
    //        $('.profileActivityBoxesSection').text(displayProfileActivities(myActivities));
}

///////////////////////////////ACTIVITY OR CATEGORY PAGE FUNCTIONS/////////////////////////
//SHOW ACTIVTY/CATEGORY PAGE
function showActivitiesPage(allActivities) {

    $('#friends-page').hide();
    $('.addedCategoryCard').hide();
    $('#feed-page').hide();
    $('#activities-page').show();
    $('#profile-page').hide();
    $('#register-page').hide();
    $('#login-page').hide();
    $('#js-signout-link').show();
    $('#js-signout-link').text("Sign out " + loggedinUserName);
    $('#nav-links').show();
    $('.nav-form').hide();
}

//FUNCTION TO SHOW ALL ACTIVITIES IN 'CARD' FORM
function displayAllActivities(myActivities) {

    let buildActivity = "";
    $.each(myActivities, function (myActivitiesKey, myActivitiesValue) {

        buildActivity += "<div class='activityBoxes'>";
        buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
        buildActivity += "<input type='hidden' class='activityImageInputValue' value='" + myActivitiesValue.activityImage + "' >";
        buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
        buildActivity += "<input type='hidden' class='activityCategoryNameInputValue' value='" + myActivitiesValue.activityName + "' >";

        buildActivity += "<h3 class='activityPointsValue'> Points:" + myActivitiesValue.activityPoints + "</h3><br>";
        buildActivity += "<input type='hidden'  class='activityCategoryPointsInputValue' value='" + myActivitiesValue.activityPoints + "' >";
        buildActivity += "<button class='addCategoryButton' id='activityAddButton' role='submit' type='button'>Add Category</button><br>";

        buildActivity += "</div>";
    });

    $('.activityBoxesSection').html(buildActivity);
};



//PULL DOWN MENU CONDITIONAL
function displaySelectedActivities(categoryName, categoryPoints) {
    // console.log(categoryName, categoryPoints);
    let buildActivity = "";
    let emptyActivities = 0;
    let numberOfActivities = 0;

    $.each(myActivities, function (myActivitiesKey, myActivitiesValue) {

        if ((categoryName !== "") && (categoryName == myActivitiesValue.category) && (categoryPoints !== "") && (categoryPoints == myActivitiesValue.activityPoints)) {
            buildActivity += "<div class='activityBoxes'>";
            buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
            buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
            buildActivity += "<h3 class='activityPointsValue'> Points:" + myActivitiesValue.activityPoints + "</h3><br>";

            buildActivity += "<input type='hidden' class='activityImageInputValue' value='" + myActivitiesValue.activityImage + "' >";
            buildActivity += "<input type='hidden' class='activityCategoryNameInputValue' value='" + myActivitiesValue.activityName + "' >";
            buildActivity += "<input type='hidden'  class='activityCategoryPointsInputValue' value='" + myActivitiesValue.activityPoints + "' >";

            buildActivity += "<button class='addCategoryButton' id='activityAddButton' role='button' type='submit'>Add Category</button><br>";
            buildActivity += "</div>";
            numberOfActivities++;
        } else if ((categoryName !== "") && (categoryName == myActivitiesValue.category) && (categoryPoints == "")) {
            buildActivity += "<div class='activityBoxes'>";
            buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
            buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
            buildActivity += "<h3 class='activityPointsValue'> Points:" + myActivitiesValue.activityPoints + "</h3><br>";

            buildActivity += "<input type='hidden' class='activityImageInputValue' value='" + myActivitiesValue.activityImage + "' >";
            buildActivity += "<input type='hidden' class='activityCategoryNameInputValue' value='" + myActivitiesValue.activityName + "' >";
            buildActivity += "<input type='hidden'  class='activityCategoryPointsInputValue' value='" + myActivitiesValue.activityPoints + "' >";

            buildActivity += "<button class='addCategoryButton' id='activityAddButton' role='button' type='submit'>Add Category</button><br>";
            buildActivity += "</div>";
            numberOfActivities++;
        } else if (((categoryName == "") && (categoryPoints !== "") && (categoryPoints == myActivitiesValue.activityPoints))) {
            buildActivity += "<div class='activityBoxes'>";
            buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
            buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
            buildActivity += "<h3 class='activityPointsValue'> Points:" + myActivitiesValue.activityPoints + "</h3><br>";

            buildActivity += "<input type='hidden' class='activityImageInputValue' value='" + myActivitiesValue.activityImage + "' >";
            buildActivity += "<input type='hidden' class='activityCategoryNameInputValue' value='" + myActivitiesValue.activityName + "' >";
            buildActivity += "<input type='hidden'  class='activityCategoryPointsInputValue' value='" + myActivitiesValue.activityPoints + "' >";

            buildActivity += "<button class='addCategoryButton' id='activityAddButton' role='button' type='submit'>Add Category</button><br>";
            buildActivity += "</div>";
            numberOfActivities++;
        } else if ((categoryName == "") && (categoryPoints == "")) {
            emptyActivities++;
        }
    });
    if (emptyActivities > 0) {
        displayError('Please select category name or points');
    }
    if (numberOfActivities == 0) {
        displayError('No categories found. Please change your selection');
    }

    $('.activityBoxesSection').html(buildActivity);
};


///////////////////////////////////////////SIGN-IN TRIGGERS///////////////////////////////////////////////
//Page loads to SIGN-IN PAGE
//1. User enters user name and password. Press enter to enter site
$(document).ready(function () {
    // when page first loads
    //    $('*').scrollTop(0);

    $('.sustain-logo').on('click', function (event) {
        showSignInPage();
    })



    $('#friends-page').hide();
    $('.addedCategoryCard').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').hide();
//    $('#register-page').hide();
    $('#login-page').show();
    $('#js-signout-link').hide();
    $('#nav-links').hide();
    $("#messageBox").hide();

    // USER WITH ACCOUNT SIGNS IN

    $('#js-signin-button').on('click', function (event) {
        event.preventDefault();

        // AJAX call to validate login info and sign user in
        const inputUname = $('#username').val();
        const inputPw = $('#password').val();

        console.log(inputUname, inputPw);
//        const inputUname = $('input[name="signin-username"]').val();
//        const inputPw = $('input[name="signin-pw"]').val();
        // check for spaces, empty, undefined
        if ((!inputUname) || (inputUname.length < 1) || (inputUname.indexOf(' ') > 0)) {

            displayError('Invalid username');
            console.log('invalid username');
            //            alert('Invalid username');
        } else if ((!inputPw) || (inputPw.length < 1) || (inputPw.indexOf(' ') > 0)) {
            displayError('Invalid password');
            //            alert('Invalid password');
            console.log('invalid password');
        } else {
            const unamePwObject = {
                username: inputUname,
                password: inputPw
            };
            user = inputUname;


            $.ajax({
                    type: "POST",
                    url: "/signin/",
                    dataType: 'json',
                    data: JSON.stringify(unamePwObject),
                    contentType: 'application/json'
                })
                .done(function (result) {
                    // console.log(result);
                    loggedinUserName = result.username;
                    loggedinPassword = result.password;

                    // show the signout link in header as soon as user is signed in
                    $('#js-signout-link').show();

                    showActivitiesPage(allActivities);
                    displayAllActivities(myActivities);
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                    displayError('Invalid username and password combination. Please check your username and password and try again.');
                    //                    alert('Invalid username and password combination. Pleae check your username and password and try again.');
                });
        };
    });
    //
    ///////////////////////////////////////////REGISTER PAGE TRIGGERS///////////////////////////////////////////////
    //2. Visitor wants to create an account. Clicks create an account
    //Add username, email, password and verify password. Submit
    //and brought back to sign in page to sign in
//    $('#js-signup-button').on('click', function (event) {
//        showNewUserPage();
//    });
    $('#js-signup-button').on('click', function (event) {
        event.preventDefault();
        const form = document.body.querySelector('#new-user-form');

        const uname = $('#username-signup').val();
        const pw = $('#password-signup').val();
        const confirmPw = $('#verify-password').val();

        if (uname == "") {
            displayError('Please add an username');
        }else if (pw == "") {
            displayError('Please add a password');
        } else if (pw !== confirmPw) {
            displayError('Passwords must match!');
        } else {
            event.preventDefault();
            const newUserObject = {
                username: uname,
                password: pw
//                email: email,
                //                goals: goals
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
                    //                    alert('Thanks for signing up! You may now sign in with your username and password.');
                    displayError('Thanks for signing up! You may now sign in with your username and password.');
                    showSignInPage();
                })
                .fail(function (jqXHR, error, errorThrown) {
                    console.log(jqXHR);
                    console.log(error);
                    console.log(errorThrown);
                    displayError('All fields must be complete before submitting.');
                });
        };
    });

    ///////////////////////////////////////////ACTIVITY PAGE TRIGGERS///////////////////////////////////////////////
    //Show all activities.

    //when user clicks Activity Categories from menu
    $('#js-activities').on('click', function (event) {
        event.preventDefault();
        showActivitiesPage(allActivities);
        displayAllActivities(myActivities);
    });

    //allow user to pick from pull down certain activities/points
    $('.pullDownCategories').on('click', function (event) {
        event.preventDefault();
        const categoryName = $('.sustainCategories').val();
        const categoryPoints = $('.sustainPoints').val();
        displaySelectedActivities(categoryName, categoryPoints);
    });


    // when user clicks sign-out link in header
    document.getElementById('js-signout-link').addEventListener('click', function (event) {
        location.reload();
    });

});

///////////////////////////////////////////PROFILE PAGE TRIGGERS///////////////////////////////////////////////
//PROFILE PAGE from image in nav


//1. If box is checked and textbox is filled in.
//2. "I did it" button is pressed.
//3. 'Card' spins around and says completed.
//4. information from card shows up in feed


$(document).on("click", '#js-profile ', function (event) {
    showProfilePage(loggedinUserName, sustainGoals);



    $.ajax({
            type: 'GET',
            url: '/category/show/' + loggedinUserName,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            //console.log(result.categoryOutput);

            displayProfileActivitiesByUser(myActivities, result.categoryOutput);
        })

        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on("click", "#hideBtn", function () {
    $("#messageBox").fadeOut();
});
