//SHOW ACTIVITY/CATEGORIES ON PROFILE PAGE
function displayProfileActivities(myActivities) {

    let buildActivity = "";
    $.each(myActivities, function (myProfileKey, myProfileValue) {

        buildActivity += '<div class="activityBoxes">';
        buildActivity += '<img class="activityImageValue" src="images/' + myProfileValue.activityImage + '" alt="' + myProfileValue.category + ' category">';
        buildActivity += '<h3 class="activityNameValueValue">' + myProfileValue.activityName + '</h3><br>';
        buildActivity += '<h3 class="activityPointsValue">Points: ' + myProfileValue.activityPoints + '</h3><br>';


        buildActivity += "<input type='hidden' class='activityImageInputValue' value='" + myProfileValue.activityImage + "' >";
        buildActivity += "<input type='hidden' class='activityNameInputValue' value='" + myProfileValue.activityName + "' >";
        buildActivity += "<input type='hidden'  class='activityPointsInputValue' value='" + myProfileValue.activityPoints + "' >";


        buildActivity += '<label for="checkbox">Committed</label>';
        buildActivity += '<input class="checkbox" type="checkbox" name="completed" value="completed"> <br>';
        buildActivity += '<p>Tell us about your experience</p><textarea class="textBox" name="textBox" id="text-box"></textarea>';
        buildActivity += '<button class="completedActivityButton" role="button">I did it</button>';

        buildActivity += "</div>";
    });
    $('.activityDetailsBoxesSection').html(buildActivity);

    getActivitiesFeedByUsername(loggedinUserName);
};

function displayProfileActivitiesByUser(myActivities, userActivities) {

    console.log(myActivities, userActivities);

    let buildActivity = "";

    //loop all activities
    $.each(myActivities, function (myProfileKey, myProfileValue) {

        //loop user selected activities
        $.each(userActivities, function (userActivitiesKey, userActivitiesValue) {

            //            if the user activity matches the name from all activities
            if (myProfileValue.activityName == userActivitiesValue.activityCategoryName) {

                buildActivity += '<div class="activityBoxes">';
                buildActivity += '<img class="activityImageValue" src="images/' + myProfileValue.activityImage + '" alt="' + myProfileValue.category + ' category">';
                buildActivity += '<h3 class="activityNameValueValue">' + myProfileValue.activityName + '</h3><br>';
                buildActivity += '<h3 class="activityPointsValue">Points: ' + myProfileValue.activityPoints + '</h3><br>';

                buildActivity += "<input type='hidden' class='activityImageInputValue' value='" + myProfileValue.activityImage + "' >";
                buildActivity += "<input type='hidden' class='activityNameInputValue' value='" + myProfileValue.activityName + "' >";
                buildActivity += "<input type='hidden'  class='activityPointsInputValue' value='" + myProfileValue.activityPoints + "' >";


                buildActivity += '<label for="checkbox">Committed</label>';
                buildActivity += '<input class="checkbox" type="checkbox" name="completed" value="completed"> <br>';
                buildActivity += '<p>Tell us about your experience</p><textarea class="textBox" name="textBox" id="text-box"></textarea>';
                buildActivity += '<button class="completedActivityButton" role="button">I did it</button>';

                buildActivity += "</div>";
            }
        });
    });
    $('.activityDetailsBoxesSection').html(buildActivity);
};

$(document).on('click', '.completedActivityButton', function (event) {
    event.preventDefault();
    const checkBox = $(this).parent().find('.checkbox').val();
    const activityDescription = $(this).parent().find('.textBox').val();
    const profileActivityName = $(this).parent().find('.activityNameInputValue').val();
    const profileActivityImage = $(this).parent().find('.activityImageInputValue').val();
    const profileActivityPoints = $(this).parent().find('.activityPointsInputValue').val();


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
        //        console.log(newActivityCompleted);
        $(this).parent().toggleClass('activityBoxeCompleted');
        $(this).parent().find('.completedActivityButton').attr("disabled", "disabled");


        $.ajax({
                type: 'POST',
                url: '/activity/add',
                dataType: 'json',
                data: JSON.stringify(newActivityCompleted),
                contentType: 'application/json'
            })
            .done(function (result) {
                alert('Congrats! You completed todays task');

                getActivitiesFeedByUsername(loggedinUserName);
            })
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });

        //        $.ajax({
        //                type: 'GET',
        //                url: '/get-category-by-username/' + loggedinUserName,
        //                dataType: 'json',
        //                contentType: 'application/json'
        //            })
        //            .done(function (result) {
        //                console.log(result);
        //                $.ajax({
        //                        type: 'POST',
        //                        url: '/activity/add',
        //                        dataType: 'json',
        //                        data: JSON.stringify(newActivityCompleted),
        //                        contentType: 'application/json'
        //                    })
        //                    .done(function (result) {
        //                        alert('Congrats! You completed todays task');
        //
        //
        //                    })
        //                    .fail(function (jqXHR, error, errorThrown) {
        //                        console.log(jqXHR);
        //                        console.log(error);
        //                        console.log(errorThrown);
        //                    });
        //            })
        //            .fail(function (jqXHR, error, errorThrown) {
        //                console.log(jqXHR);
        //                console.log(error);
        //                console.log(errorThrown);
        //            });
    };
});

/////////show feed data//////////

function getActivitiesFeedByUsername(username) {
    $.ajax({
            type: 'GET',
            url: '/activity-feed-by-username/' + username,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (activityFeed) {
            console.log(activityFeed);
            displayActivitiesFeedByUsername(activityFeed);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayActivitiesFeedByUsername(activityFeed) {
    let buildActivity = '<h2 class="pageTitle">YOUR FEED</h2>';
    $.each(activityFeed, function (myProfileKey, myProfileValue) {

        buildActivity += '<div class="currentFeed">';
        buildActivity += '<img class="proofPicture" src="images/' + myProfileValue.image + '" alt="' + myProfileValue.name + '">';

        buildActivity += '<div class="pointsEarned">';
        buildActivity += '<h2 class="points">' + myProfileValue.username + ' earned ' + myProfileValue.points + ' more points!</h2>';
        buildActivity += '<h3 class="practice">' + myProfileValue.name + '</h3>';
        buildActivity += '<p class="comment">"' + myProfileValue.description + '"</p>';
        buildActivity += '</div>';
        buildActivity += '</div>';

    });
    $('.indivFeed').html(buildActivity);
}