$(document).on('click', '.addCategoryButton', function (event) {
    console.log("completed button clicked");
    event.preventDefault();

    //grabbing the card by using 'this'
    //make ajax request to endpoint on server (POST)
    //Sending data over to profile page
    //On server code express endpoint (POST) change names in server
    //activity.find finding data for

    activity.find({
        username: req.body.username
    }, (err, activity) => {

        if (err) {
            res.send(err)
        }

        res.json(activity)
    })

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
