$(document).ready(function () {

    // This will create alerts if the user clicks on any of the bar charts. It will tell them the bar chart data.
    $(document).on("click", "#chart-1-tasks-completed", function () {
        alert("Tasks Complete (" + home_server_site.tasks_complete_percent + "%)");
    });
    $(document).on("click", "#chart-1-tasks-not-completed", function () {
        alert("Tasks Not Complete (" + home_server_site.tasks_not_complete_percent + "%)");
    });
    $(document).on("click", "#chart-2-tasks-high", function () {
        alert("High Priority (" + home_server_site.tasks_high_percent + "%)");
    });
    $(document).on("click", "#chart-2-tasks-medium", function () {
        alert("Medium Priority (" + home_server_site.tasks_medium_percent + "%)");
    });
    $(document).on("click", "#chart-2-tasks-low", function () {
        alert("Low Priority (" + home_server_site.tasks_low_percent + "%)");
    });

});

// This function will fill in the data on the home page.
function display_all_home_data() {

    var high_priority_completed = parseInt(window.localStorage.home_server_site_high_priority_completed);
    var medium_priority_completed = parseInt(window.localStorage.home_server_site_medium_priority_completed);
    var low_priority_completed = parseInt(window.localStorage.home_server_site_low_priority_completed);

    $('#task-not-complete-count').text(home_server_site_db_tasks.length);
    $('#task-complete-count').text(window.localStorage.home_server_site_total_tasks_completed);
    $('#high-priority-complete-count').text(high_priority_completed);
    $('#medium-priority-complete-count').text(medium_priority_completed);
    $('#low-priority-complete-count').text(low_priority_completed);

    var total_completed = parseInt(window.localStorage.home_server_site_total_tasks_completed);

    var total_tasks = total_completed + home_server_site_db_tasks.length;
    var total_complete_percent = (total_completed / total_tasks) * 100;
    var total_not_complete_percent = 100 - total_complete_percent;

    if (total_completed == 0 && home_server_site_db_tasks.length == 0) {
        $("#chart-1-no-data").css("display", "block");
    } else {
        if (total_completed > 0) {
            $("#chart-1-tasks-completed").css("display", "block");
            $("#chart-1-tasks-completed-text").text("Completed (" + total_complete_percent.toFixed(0) + "%)");
            $("#chart-1-tasks-completed").css("width", total_complete_percent + "%");
        }
        if (home_server_site_db_tasks.length > 0) {
            $("#chart-1-tasks-not-completed").css("width", total_not_complete_percent + "%");
            $("#chart-1-tasks-not-completed-text").text("Not Completed (" + total_not_complete_percent.toFixed(0) + "%)");
            $("#chart-1-tasks-not-completed").css("display", "block");
        }
        $("#chart-1-no-data").css("display", "none");
    }

    var high_priority_percent = (high_priority_completed / total_completed) * 100;
    var medium_priority_percent = (medium_priority_completed / total_completed) * 100;
    var low_priority_percent = 100 - (high_priority_percent + medium_priority_percent);

    if (high_priority_completed == 0 && medium_priority_completed == 0 && low_priority_completed == 0) {
        $("#chart-2-no-data").css("display", "block");
    } else {
        if (high_priority_completed > 0) {
            $("#chart-2-tasks-high").css("width", high_priority_percent + "%");
            $("#chart-2-tasks-high-text").text("High Priority (" + high_priority_percent.toFixed(0) + "%)");
            $("#chart-2-tasks-high").css("display", "block");
        }
        if (medium_priority_completed > 0) {
            $("#chart-2-medium-text").text("Medium Priority (" + medium_priority_percent.toFixed(0) + "%)");
            $("#chart-2-tasks-medium").css("width", medium_priority_percent + "%");
            $("#chart-2-tasks-medium").css("display", "block");
        }
        if (low_priority_completed > 0) {
            $("#chart-2-low-text").text("Low Priority (" + low_priority_percent.toFixed(0) + "%)");
            $("#chart-2-tasks-low").css("width", low_priority_percent + "%");
            $("#chart-2-tasks-low").css("display", "block");
        }
        $("#chart-2-no-data").css("display", "none");
    }

    home_server_site.tasks_complete_percent = total_complete_percent.toFixed(2);
    home_server_site.tasks_not_complete_percent = total_not_complete_percent.toFixed(2);
    home_server_site.tasks_high_percent = high_priority_percent.toFixed(2);
    home_server_site.tasks_medium_percent = medium_priority_percent.toFixed(2);
    home_server_site.tasks_low_percent = low_priority_percent.toFixed(2);


}