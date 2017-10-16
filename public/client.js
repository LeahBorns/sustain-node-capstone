"use strict";





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
//var achievementId = undefined;
//var dateFormat = 'eu';
//var editToggle = false;
//var backWarnToggle = false;
//var backToLandingPageToggle = false;
//var newUserToggle = false;
//var backToHomePageToggle = true;

function submitNewUser(user) {
    event.preventDefault();
    backWarnToggle = false;
    // AJAX call to send the form data up to the server/DB
    // take values from form inputs
    const signUpEmail = $('input[id="email"]').val();
    //    var achHow = [];
    //    // add all the cb values to the array achHow
    //    var cbElements = $('input[type=checkbox]');
    //    for (let i=0; i < cbElements.length; i++) {
    //        if ($(cbElements[i]).is(':checked')) {
    //            achHow.push(cbElements[i].value);
    //        };
};
/*var achWhen = $('input[id="datepicker"]').val();
    achWhen = Date.parse(achWhen);
    const achWhy = $('input[id="achieve-why"]').val();
    const newAchObject = {
        user: user,
        achieveWhat: achWhat,
        achieveHow: achHow,
        achieveWhen: achWhen,
        achieveWhy: achWhy
    };
    if (editToggle === false) {
        $.ajax({
            type: 'POST',
            url: 'new/create',
            dataType: 'json',
            data: JSON.stringify(newAchObject),
            contentType: 'application/json'
        })
            .done(function (result) {
            showTimeline();
        })
            .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    } else if (editToggle === true) {
        $.ajax({
            type: 'PUT',
            url: 'achievement/' + achievementId,
            dataType: 'json',
            data: JSON.stringify(newAchObject),
            contentType: 'application/json'
        })
            .done(function (result) {
            showTimeline();
            editToggle = false;
        })
            .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    };
}

// can't seem to use--asynchronicity is ruining the world
function getUserAchievements(user) {
    // console.log('user is ' + user);
    // let achArray = [];
    // $.getJSON('achievements', function(res) {
    //     for (let i=0; i<res.achievements.length; i++) {
    //         if (res.achievements[i].user === user) {
    //             achArray.push(res.achievements[i]);
    //         };
    //     };
    // });
    // console.log(achArray);
    // if (achArray.length === 0) {
    //     newUserToggle = true;
    //     return achArray;
    // } else {
    //     return achArray;
    // }
}

function goBack() {
    if (backToLandingPageToggle === true) {
        location.reload();
    } else if (backWarnToggle === true) {
        event.preventDefault();
        if (confirm('Are you sure you want to go back? Your changes will not be saved.') == true) {
            if (backToHomePageToggle === true) {
                showHomePage();
            } else {
                showTimeline();
            }
            backWarnToggle = false;
        }
    } else {
        showHomePage();
    };
}
*/
function showSignInPage() {
    //    backToLandingPageToggle = true;
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

function showProfilePage(loggedinUserName) {
    //    backToHomePageToggle = true;
    $('#friends-page').hide();
    $('#feed-page').hide();
    $('#activities-page').hide();
    $('#profile-page').show();
    $('#register-page').hide();
    $('#login-page').hide();
    $('#js-signout-link').show();
    $('#js-signout-link').text("Sign out " + loggedinUserName);
    $('#nav-links').show();
    $('.profileDescription').text(loggedinUserName);

}

function showActivitiesPage() {
    //    backWarnToggle = false;
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
    //    backWarnToggle = false;
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
    //    backWarnToggle = false;
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
    //    backToLandingPageToggle = false;
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
                    // show the signout link in header as soon as user is signed in
                    $('#js-signout-link').show();
                    //                    if (newUserToggle === true) {
                    showProfilePage(loggedinUserName);
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
        if (pw !== confirmPw) {
            event.preventDefault();
            alert('Passwords must match!');
        } else {
            event.preventDefault();
            const newUserObject = {
                username: uname,
                password: pw,
                email: email
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
        const activityNameValue = $('.activityNameValue').val();
        const activityImageValue = $('.activityImageValue').val();
        const activityPointsValue = $('.activityPointsValue').val();

        console.log(checkBox);
        console.log(textBox, activityNameValue, activityImageValue, activityPointsValue);

        if (checkBox != 'completed') {
            alert('Must be checked');
        } else if (textBox.length < 10) {
            alert('Must be at least 10 characters');
        } else {
            const newActivityCompleted = {
                activityDescription: textBox,
                activityName: activityNameValue,
                activityImage: activityImageValue,
                activityPoints: activityPointsValue,
                username: loggedinUserName
            };
            $.ajax({
                    type: 'POST',
                    url: '/profile/commit',
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
