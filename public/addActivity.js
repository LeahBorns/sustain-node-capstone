//SHOW ACTIVITY/CATEGORIES
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

function displayAllActivitiesByUser(myActivities, userCategoryActivities) {

    console.log(myActivities, userCategoryActivities);

    let buildActivity = "";

    //loop all activities
    $.each(myActivities, function (myCategoryActivityKey, myCategoryActivityValue) {

        //loop user selected activities
        $.each(userCategoryActivities, function (userCategoryActivitiesKey, userCategoryActivitiesValue) {

            //            if the user activity matches the name from all activities
            if (userCategoryActivitiesValue.activityName == userCategoryActivitiesValue.activityCategoryName) {

                buildActivity += "<div class='activityBoxes'>";
                buildActivity += "<img class='activityImageValue' src='images/" + myActivitiesValue.activityImage + "' alt='" + myActivitiesValue.category + "category' >";
                buildActivity += "<input type='hidden' class='activityImageInputValue' value='" + myActivitiesValue.activityImage + "' >";
                buildActivity += "<h3 class='activityNameValue'> " + myActivitiesValue.activityName + "</h3><br>";
                buildActivity += "<input type='hidden' class='activityCategoryNameInputValue' value='" + myActivitiesValue.activityName + "' >";

                buildActivity += "<h3 class='activityPointsValue'> Points:" + myActivitiesValue.activityPoints + "</h3><br>";
                buildActivity += "<input type='hidden'  class='activityCategoryPointsInputValue' value='" + myActivitiesValue.activityPoints + "' >";
                buildActivity += "<button class='addCategoryButton' id='activityAddButton' role='submit' type='button'>Add Category</button><br>";

                buildActivity += "</div>";
            }
        });
    });
    $('.activityDetailsBoxesSection').html(buildActivity);
};
$(document).on('click', '.addCategoryButton', function (event) {
    console.log("completed button clicked");
    event.preventDefault();

    //grabbing the card by using 'this'
    const activityTrigger = $('#activityAddButton');
    const image = $(this).parent().find('.activityImageInputValue').val();
    const name = $(this).parent().find('.activityCategoryNameInputValue').val();
    const points = $(this).parent().find('.activityCategoryPointsInputValue').val();

    const newActivityCategoryObject = {
        username: loggedinUserName,
        image: image,
        name: name,
        points: points
    };

    $(this).parent().toggleClass('activityBoxAdded');
    //make ajax request to endpoint on server (POST)
    //    $.ajax({
    //            type: 'POST',
    //            url: '/activity/card',
    //            dataType: 'json',
    //            data: JSON.stringify(newActivityCategoryObject),
    //            contentType: 'application/json'
    //        })
    //        .done(function (result) {
    //            event.preventDefault();
    //        })
    //
    //        .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });


    //POST to call activities
    $.ajax({
            type: 'POST',
            url: '/category/add',
            dataType: 'json',
            data: JSON.stringify(newActivityCategoryObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
        })

        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

    //Sending data over to profile page

    //On server code express endpoint (POST)
    //activity.find finding data for


    //    $.ajax({
    //            type: 'GET',
    //            url: '/activity/add/' + loggedinUserName,
    //            dataType: 'json',
    //            contentType: 'application/json'
    //        })
    //        .done(function (result) {
    //            console.log(result);
    //            event.preventDefault();
    //            displayProfileActivitiesByUser(myActivities);
    //
    //        })
    //
    //        .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });
});
