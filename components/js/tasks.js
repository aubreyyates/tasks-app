$(document).ready(function () {

    // Initialize variables
    home_server_site.change_priority_dropdown = false;
    home_server_site.remove_undo_button = null;
    home_server_site.display_all_tasks_time = null;
    home_server_site.first_new_task_click = false;

    // When the user clicks to type in the new task area, show the submit button
    // and the priority selector.
    $(document).on("focus", "#new-task-input", function () {

        $("#new-task-button").css("display", "block");
        if (home_server_site.first_new_task_click == false) {
            $("#change-priority-button").addClass("low-priority")
            home_server_site.first_new_task_click = true;
        }
    });

    $(document).on("keypress", "#new-task-input", function (event) {
        if (event.keyCode == 13) {
            $('#new-task-button').click();
        }
    });

    $(document).on("click", "#new-task-button", function () {

        var description = $("#new-task-input").val();
        var priority = $("#change-priority-button").val();

        // Make sure the user entered a value.
        if (description.length == 0) {
            return;
        }

        //home_server_site.tasks_not_completed += 1;

        var id = window.localStorage.home_server_site_total_tasks_created;
        window.localStorage.home_server_site_total_tasks_created += 1;

        home_server_site_db_tasks.push({ id: id, description: description, priority: priority, list: window.localStorage.home_server_site_selected_list });
        // home_server_site_task_lists[0].tasks_created += 1;
        // alert(home_server_site_task_lists[0].tasks_created);

        display_all_tasks()

        $("#new-task-input").val("");

        $("#change-priority-dropdown").css("display", "none");
        home_server_site.change_priority_dropdown = false;

        store_data_lists();
        store_data();

    });

    // When the box that shows the priority color is clicked on the new task line,
    // show a dropdown of different priority options.
    $(document).on("click", "#change-priority-button", function () {
        home_server_site.first_new_task_click = true;
        if (home_server_site.change_priority_dropdown == false) {
            $("#change-priority-dropdown").css("display", "block");
            home_server_site.change_priority_dropdown = true;
        } else {
            $("#change-priority-dropdown").css("display", "none");
            home_server_site.change_priority_dropdown = false;
        }
    });

    //
    $(document).on("click", ".change-priority-selection", function () {
        $("#change-priority-dropdown").css("display", "none");
        home_server_site.change_priority_dropdown = false;
        var new_priority = $(this).val();
        $("#change-priority-button").val(new_priority);

        $("#change-priority-button").removeClass("low-priority")
        $("#change-priority-button").removeClass("medium-priority")
        $("#change-priority-button").removeClass("high-priority")

        if (new_priority == 0) {
            $("#change-priority-button").addClass("low-priority")
        } else if (new_priority == 1) {
            $("#change-priority-button").addClass("medium-priority")
        } else {
            $("#change-priority-button").addClass("high-priority")
        }

    });

    // Check button
    $(document).on("click", ".check-button", function () {
        var id = $(this).val()
        var completion_status = 1;

        window.localStorage.home_server_site_total_tasks_completed = parseInt(localStorage.home_server_site_total_tasks_completed) + 1;

        //$.post('./components/backend/update_task_completion_status.php', { id: id, completion_status: completion_status })

        $("#undo-button").val(id);

        for (var i = 0; i < home_server_site_db_tasks.length; i++) {
            if (home_server_site_db_tasks[i].id == id) {
                $("#undo-button").data('description', home_server_site_db_tasks[i].description);
                $("#undo-button").data('priority', home_server_site_db_tasks[i].priority);
                if (home_server_site_db_tasks[i].priority == 2) {
                    window.localStorage.home_server_site_high_priority_completed = parseInt(window.localStorage.home_server_site_high_priority_completed) + 1;
                } else if (home_server_site_db_tasks[i].priority == 1) {
                    window.localStorage.home_server_site_medium_priority_completed = parseInt(window.localStorage.home_server_site_medium_priority_completed) + 1;
                } else if (home_server_site_db_tasks[i].priority == 0) {
                    window.localStorage.home_server_site_low_priority_completed = parseInt(window.localStorage.home_server_site_low_priority_completed) + 1;
                }

                home_server_site_db_tasks.splice(i, 1);
            }
        }

        $("#undo-button-modal").css("display", "block");

        var task_flag_id = "#task-flag-" + id;

        $(task_flag_id).css("display", "block");

        clearTimeout(home_server_site.remove_undo_button)
        clearTimeout(home_server_site.display_all_tasks_time)

        home_server_site.display_all_tasks_time = setTimeout(function () { display_all_tasks(); }, 1000);
        home_server_site.remove_undo_button = setTimeout(function () { $("#undo-button-modal").css("display", "none"); }, 10000);

        store_data();

    });

    // This will handle what happens when you click the undo button.
    $(document).on("click", "#undo-button", function () {
        var id = $(this).val()
        var completion_status = 0;
        window.localStorage.home_server_site_total_tasks_completed = parseInt(localStorage.home_server_site_total_tasks_completed) - 1;

        $("#undo-button-modal").css("display", "none");
        var description = $("#undo-button").data('description');
        var priority = $("#undo-button").data('priority');

        if (priority == 2) {
            window.localStorage.home_server_site_high_priority_completed = parseInt(window.localStorage.home_server_site_high_priority_completed) - 1;
        } else if (priority == 1) {
            window.localStorage.home_server_site_medium_priority_completed = parseInt(window.localStorage.home_server_site_medium_priority_completed) - 1;
        } else if (priority == 0) {
            window.localStorage.home_server_site_low_priority_completed = parseInt(window.localStorage.home_server_site_low_priority_completed) - 1;
        }

        home_server_site_db_tasks.push({ id: id, description: description, priority: priority, list: window.localStorage.home_server_site_selected_list });

        display_all_tasks()

        store_data();

    });

});







// This function will take all of the tasks and display them by adding them to the tasks-list-load div.
// It will get the html needed from the create_task_html function.

function display_all_tasks() {

    // Clear any tasks that were there before.
    $("#tasks-list-load").html("");

    if (window.localStorage.home_server_site_settings_sort == "true") {
        var tasks_to_render = [...home_server_site_db_tasks];
        tasks_to_render.sort((a, b) => (a.priority < b.priority) ? 1 : -1);
    } else {
        var tasks_to_render = home_server_site_db_tasks;
    }

    // Go through all task objects and add them.
    tasks_to_render.filter(is_in_selected_list).forEach((x) => create_task_html(x));

};

function is_in_selected_list(task) {
    return task.list == window.localStorage.home_server_site_selected_list;
}

function create_task_html(task_item) {

    const { id, priority, description } = task_item;

    var priority_class = "low-priority";

    if (priority == 1) {
        priority_class = "medium-priority";
    } else if (priority == 2) {
        priority_class = "high-priority";
    }

    let html =
        `
        <div class='task'>
            <div class='priority ${priority_class}' >
            </div>
            <div class='task-text'>
                <h2 class='font-1'>${description}</h2>
            </div>
            <div class='check-button-area'>
                <button class='check-button' value='${id}' >
                    <img class='task-check-image' src='./images/check.png' >
                </button>
            </div>
            <div id='task-flag-${id}' class='task-complete-flag'>
                <div style='height:56px;width:67px;padding-top:10px;margin:0 auto;'>
                    <img style='height:56px;width:67px;' src='./images/check.png' >
                </div>
            </div>
        </div>
        `;

    $("#tasks-list-load").append(html);

}