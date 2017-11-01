$(document).on('click', '.addCategoryButton', function (event) {
    console.log("completed button clicked");
    event.preventDefault();

    //grabbing the card by using 'this'

    const image = $(this).parent().find('.activityImageInputValue').val();
    const name = $(this).parent().find('.activityCategoryNameInputValue').val();
    const points = $(this).parent().find('.activityCategoryPointsInputValue').val();

    //make ajax request to endpoint on server (POST)
    $.ajax({
            type: 'POST',
            url: '/category/add',
            dataType: 'json',
            data: JSON.stringify(newActivityCategoryObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            event.preventDefault();
            addedActivity(myActivities);
        })

        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

    //Sending data over to profile page
    $.ajax({
            type: 'GET',
            url: '/activity/add/' + loggedinUserName,
            dataType: 'json',
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log(result);
            event.preventDefault();
            displayProfileActivities(myActivities);

        })

        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
    //On server code express endpoint (POST)
    //activity.find finding data for


    //        $.ajax({
    //            type: 'GET',
    //            url: '/activity/add/' + loggedinUserName,
    //            dataType: 'json',
    //            contentType: 'application/json'
    //        })
    //            .done(function (result) {
    //            console.log(result);
    //            event.preventDefault();
    //            displayProfileActivities(myActivities);
    //
    //        })
    //
    //            .fail(function (jqXHR, error, errorThrown) {
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });
});
