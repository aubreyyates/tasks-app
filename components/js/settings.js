$(document).ready(function () {

    $(document).on("change", "#toggle-high-priority-sorting", function () {
        if (window.localStorage.home_server_site_settings_sort == "false") {
            window.localStorage.home_server_site_settings_sort = "true";
            //home_server_site_db_tasks.sort((a, b) => (a.priority < b.priority) ? 1 : -1)
        } else {
            window.localStorage.home_server_site_settings_sort = "false";
            // home_server_site.task = [...home_server_site.original_task_order];
        }
    });

    $(document).on("change", "#toggle-multiple-task-lists", function () {
        if (window.localStorage.home_server_site_settings_multiple_tasks == "false") {
            window.localStorage.home_server_site_settings_multiple_tasks = "true";
            $('#nav-task-lists').css('display', 'block');
        } else {
            window.localStorage.home_server_site_settings_multiple_tasks = "false";
            $('#nav-task-lists').css('display', 'none');
        }
    });

    $(document).on("change", "#toggle-due-dates", function () {
        if (window.localStorage.home_server_site_settings_due_dates == "false") {
            window.localStorage.home_server_site_settings_due_dates = "true";
        } else {
            window.localStorage.home_server_site_settings_due_dates = "false";
        }
    });



    $(document).on("click", "#reset-data", function () {
        let result = confirm("This will reset all data. All tasks, settings, and data will be deleted and reset. Are you sure you want to do this?");
        if (result == true) {
            reset_data();
            window.localStorage.removeItem("home_server_site_db_tasks");
            display_all_lists();
            home_server_site_db_tasks = [];

            $('#nav-task-lists').css('display', 'none');
            $(".bar-chart").css("display", "none");
            $("#toggle-high-priority-sorting").prop("checked", false);
            $("#toggle-multiple-task-lists").prop("checked", false);
            $("#toggle-due-dates").prop("checked", false);
            $("#feedback-message").text("Data Reset.")


        }
    });

});

function set_settings() {
    if (window.localStorage.home_server_site_settings_sort == "true") {
        $('#toggle-high-priority-sorting').prop('checked', true);
    }
    if (window.localStorage.home_server_site_settings_multiple_tasks == "true") {
        $('#toggle-multiple-task-lists').prop('checked', true);
        $('#nav-task-lists').css('display', 'block');
    }
    if (window.localStorage.home_server_site_settings_due_dates == "true") {
        $('#toggle-due-dates').prop('checked', true);
    }
}