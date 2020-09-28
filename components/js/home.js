/* 
This will load all of the tasks from the database into objects. It will talk to the database
through a file called load_tasks_to_objects.php.
*/


$(document).ready(function () {

    // Initialize variables
    home_server_site.tasks_completed = 0;

    // Get all of the tasks from the database that are not complete
    $.post('./components/backend/load_home_data.php', function (result) {
        // Turn the result into JSON objects
        result = JSON.parse(result);

        home_server_site.tasks_completed = result[0];
        home_server_site.tasks_not_completed = result[1];
        home_server_site.high_priority_completed = result[2];
        home_server_site.medium_priority_completed = result[3];
        home_server_site.low_priority_completed = result[4];


        display_all_home_data()
    });


});

function display_all_home_data() {
    $('#task-not-complete-count').text(home_server_site.tasks_not_completed);
    $('#task-complete-count').text(home_server_site.tasks_completed);
    $('#high-priority-complete-count').text(home_server_site.high_priority_completed);
    $('#medium-priority-complete-count').text(home_server_site.medium_priority_completed);
    $('#low-priority-complete-count').text(home_server_site.low_priority_completed);

    var total_tasks = home_server_site.tasks_completed + home_server_site.tasks_not_completed;
    var total_complete_percent = (home_server_site.tasks_completed / total_tasks) * 100;
    var total_not_complete_percent = 100 - total_complete_percent;

    $("#chart-1-tasks-completed").css("width", total_complete_percent + "%");
    $("#chart-1-tasks-not-completed").css("width", total_not_complete_percent + "%");

    var high_priority_percent = (home_server_site.high_priority_completed / home_server_site.tasks_completed) * 100;
    var medium_priority_percent = (home_server_site.medium_priority_completed / home_server_site.tasks_completed) * 100;
    var low_priority_percent = 100 - (high_priority_percent + medium_priority_percent);


    $("#chart-2-tasks-high").css("width", high_priority_percent + "%");
    $("#chart-2-tasks-medium").css("width", medium_priority_percent + "%");
    $("#chart-2-tasks-low").css("width", low_priority_percent + "%");
}