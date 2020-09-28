/* 
This will load all of the tasks from the database into objects. It will talk to the database
through a file called load_tasks_to_objects.php.
*/


$(document).ready(function () {

    // Initialize variables
    home_server_site.change_priority_dropdown = false;
    home_server_site.remove_undo_button = null;
    home_server_site.display_all_tasks_time = null;
    home_server_site.first_new_task_click = false;
    home_server_site.sort_task = "none";

    // Get all of the tasks from the database that are not complete
    $.post('./components/backend/load_tasks_to_objects.php', function (result) {
        // Turn the result into JSON objects
        home_server_site.task = JSON.parse(result)
        home_server_site.original_task_order = [...home_server_site.task];

        if (home_server_site.sort_task == "highest_first") {
            home_server_site.task.sort((a, b) => (a.priority < b.priority) ? 1 : -1)
        }
    });





    // When the user clicks to type in the new task area, show the submit button
    // and the priority selector.
    $(document).on("focus", "#new-task-input", function () {

        $("#new-task-button").css("display", "block");
        if (home_server_site.first_new_task_click == false) {
            $("#change-priority-button").addClass("low-priority")
            home_server_site.first_new_task_click = true;
        }
    });

    // $(document).on("blur", "#new-task-input", function () {
    //     if ($("#new-task-input").val() == "") {
    //         $("#new-task-button").css("display", "none");
    //         $("#change-priority-button").css("display", "none");
    //     }
    // });

    // When the submit button is clicked on the new task. Submit the task to the database
    // with insert_new_task.php. 

    // --- FIXME --- Validate the information that is submitted.
    $(document).on("click", "#new-task-button", function () {

        var description = $("#new-task-input").val();
        var priority = $("#change-priority-button").val();

        if (description.length == 0) {
            return;
        }

        home_server_site.tasks_not_completed += 1;





        // Insert the new task into the database.
        $.post('./components/backend/insert_new_task.php', { description: description, priority: priority }, function (id) {
            home_server_site.task.push({ id: id, description: description, priority: priority });
            display_all_tasks()
        });

        $("#new-task-input").val("");

        $("#change-priority-dropdown").css("display", "none");
        home_server_site.change_priority_dropdown = false;



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

    // --- FIXME --- Get the display_all_tasks to be delayed if multiple checks are clicked.
    // Check button
    $(document).on("click", ".check-button", function () {
        var id = $(this).val()
        var completion_status = 1;
        home_server_site.tasks_completed += 1;
        home_server_site.tasks_not_completed -= 1;

        $.post('./components/backend/update_task_completion_status.php', { id: id, completion_status: completion_status })

        $("#undo-button").val(id);

        for (var i = 0; i < home_server_site.task.length; i++) {
            if (home_server_site.task[i].id == id) {
                $("#undo-button").data('description', home_server_site.task[i].description);
                $("#undo-button").data('priority', home_server_site.task[i].priority);
                if (home_server_site.task[i].priority == 2) {
                    home_server_site.high_priority_completed += 1;
                } else if (home_server_site.task[i].priority == 1) {
                    home_server_site.medium_priority_completed += 1;
                } else if (home_server_site.task[i].priority == 0) {
                    home_server_site.low_priority_completed += 1;
                }

                home_server_site.task.splice(i, 1);
            }
        }

        $("#undo-button-modal").css("display", "block");

        var task_flag_id = "#task-flag-" + id;

        $(task_flag_id).css("display", "block");

        clearTimeout(home_server_site.remove_undo_button)
        clearTimeout(home_server_site.display_all_tasks_time)

        home_server_site.display_all_tasks_time = setTimeout(function () { display_all_tasks(); }, 1000);
        home_server_site.remove_undo_button = setTimeout(function () { $("#undo-button-modal").css("display", "none"); }, 10000);
    });

    $(document).on("click", "#undo-button", function () {
        var id = $(this).val()
        var completion_status = 0;
        home_server_site.tasks_completed -= 1;
        home_server_site.tasks_not_completed += 1;

        $.post('./components/backend/update_task_completion_status.php', { id: id, completion_status: completion_status })
        $("#undo-button-modal").css("display", "none");
        var description = $("#undo-button").data('description');
        var priority = $("#undo-button").data('priority');

        if (priority == 2) {
            home_server_site.high_priority_completed -= 1;
        } else if (priority == 1) {
            home_server_site.medium_priority_completed -= 1;
        } else if (priority == 0) {
            home_server_site.low_priority_completed -= 1;
        }
        home_server_site.task.push({ id: id, description: description, priority: priority });
        display_all_tasks()


    });

});







// This function will take all of the tasks and display them by adding them to the tasks-load div.
// It will create the html needed to see the tasks and put in the values such as priority, and description.

function display_all_tasks() {

    // Clear any tasks that were there before.
    $("#tasks-load").html("");

    // Go through all task objects and add them.
    for (var i = 0; i < home_server_site.task.length; i++) {

        var priority = "low-priority";

        if (home_server_site.task[i].priority == 1) {
            priority = "medium-priority";
        } else if (home_server_site.task[i].priority == 2) {
            priority = "high-priority";
        }

        $("#tasks-load").append("\
            <div class='task'>\
                <div class='priority " + priority + "' >\
                </div>\
                <div class='task-text'>\
                    <h2 class='font-1'>" + home_server_site.task[i].description + "</h2>\
                </div>\
                <div class='check-button-area'>\
                    <button class='check-button' value='" + home_server_site.task[i].id + "' >\
                        <img style='height:46px;padding-top:2px;' src='./images/check.png' >\
                    </button>\
                </div>\
                <div id='task-flag-" + home_server_site.task[i].id + "' class='task-complete-flag'>\
                    <div style='height:56px;width:67px;padding-top:10px;margin:0 auto;'>\
                        <img style='height:56px;width:67px;' src='./images/check.png' >\
                    </div>\
                </div>\
            </div>\
        ");
    };

};