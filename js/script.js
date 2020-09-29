// Initialize variables

// This is the application object to prevent pollution of the global name space.
home_server_site = {};

home_server_site_db_tasks = [];
home_server_site_task_lists = [{ id: 0, name: "Tasks", color_id: 0, tasks_created: 0, tasks_completed: 0 }];

try {
    if (window.localStorage.getItem("home_server_site_db_tasks") != null) {
        // Get tasks from local storage
        home_server_site_db_tasks = JSON.parse(window.localStorage.getItem("home_server_site_db_tasks"));

        if (window.localStorage.getItem("home_server_site_task_lists") != null) {
            // Get task lists from the local storage
            home_server_site_task_lists = JSON.parse(window.localStorage.getItem("home_server_site_task_lists"));

        } else {
            string_for_storage = JSON.stringify(home_server_site_task_lists);
            window.localStorage.home_server_site_task_lists = string_for_storage;
        }



    } else {

        if (window.localStorage.length == 0) {
            reset_data();
        }

    }

    if (window.localStorage.getItem("home_server_site_task_lists") != null) {
        // Get task lists from the local storage
        home_server_site_task_lists = JSON.parse(window.localStorage.getItem("home_server_site_task_lists"));

    } else {
        string_for_storage = JSON.stringify(home_server_site_task_lists);
        window.localStorage.home_server_site_task_lists = string_for_storage;
    }


}
catch (err) {
    alert("Error occurred. Data was reset.");

    reset_data();
    window.localStorage.removeItem("home_server_site_db_tasks");
    window.localStorage.removeItem("home_server_site_task_lists");
    home_server_site_db_tasks = [];
}


$(document).ready(function () {

    $("#nav-panel-load").load("./components/nav-panel.html", function () {
        // Code not used for this version of the app.
        // set_div_text(window.localStorage.home_server_site_selected_list, "#nav-tasks");
    });
    $("#main-window-load").load("./components/main-window.html", function () {
        $("#main-window-heading-load").load("./components/main-window-heading.html");
        $("#home-load").load("./components/home.html", function () {
            display_all_home_data();
        });
        $("#tasks-load").load("./components/tasks.html", function () {
            $("#undo-button-modal-load").load("./components/undo-button-modal.html");
        });
        $("#task-lists-load").load("./components/task-lists.html", function () {
            display_all_lists();
        });
        $("#settings-load").load("./components/settings.html", function () {
            set_settings();
        });

    });



    check_browser();

});

// Check to make sure the user isn't using Internet Explorer.
function check_browser() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, display modal to tell them they need a different browser.
    {
        $("#browser-check-modal-overlay").css("display", "block");
    }
}

function store_data() {
    var string_for_storage = JSON.stringify(home_server_site_db_tasks);
    // Store in database.
    window.localStorage.setItem("home_server_site_db_tasks", string_for_storage);
}

function store_data_lists() {

    var string_for_storage = JSON.stringify(home_server_site_task_lists);
    // Store in database
    window.localStorage.home_server_site_task_lists = string_for_storage

}

function reset_data() {
    // // Set the default settings.
    home_server_site_task_lists = [{ id: 0, name: "Tasks", color_id: 0 }];
    window.localStorage.home_server_site_total_lists_created = 1;
    string_for_storage = JSON.stringify(home_server_site_task_lists);
    window.localStorage.home_server_site_task_lists = string_for_storage;
    window.localStorage.home_server_site_selected_list = 0;
    window.localStorage.home_server_site_settings_sort = "false";
    window.localStorage.home_server_site_settings_multiple_tasks = "false";
    window.localStorage.home_server_site_settings_due_dates = "false";
    window.localStorage.home_server_site_total_tasks_created = 0;
    window.localStorage.home_server_site_total_tasks_completed = 0;
    window.localStorage.home_server_site_high_priority_completed = 0;
    window.localStorage.home_server_site_medium_priority_completed = 0;
    window.localStorage.home_server_site_low_priority_completed = 0;
}

function set_div_text(id, div_id) {
    for (i = 0; i < home_server_site_task_lists.length; i++) {
        if (home_server_site_task_lists[i].id == id) {
            $(div_id).text(home_server_site_task_lists[i].name);
            return;
        }
    }
}
