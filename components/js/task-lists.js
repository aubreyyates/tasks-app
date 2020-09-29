
$(document).ready(function () {

    $(document).on("click", "#new-list-header", function () {
        $("#new-list-editor").attr("placeholder", "");
        $("#new-list-editor").focus()
        $("#plus-image-container").animate({ paddingTop: "30px" });
        $(".plus-path").css("stroke", "black");
        $("#create-list-words").animate({ opacity: 1, }, 500);
        $("#background-new-list-body").animate({ opacity: 1, }, 500);
        $("#new-list-header").css("cursor", "default");
        $("#new-list-editor").css("cursor", "default");
    });

    $(document).on("click", "#new-list-body", function () {
        if (!$("#new-list-editor").val()) {
            $("#new-list-editor").attr("placeholder", "");
            $("#new-list-editor").focus()
            $("#plus-image-container").animate({ paddingTop: "30px" });
            $(".plus-path").css("stroke", "black");
            $("#create-list-words").animate({ opacity: 1, }, 500);
            $("#background-new-list-body").animate({ opacity: 1, }, 500);
            $("#new-list-header").css("cursor", "default");
            $("#new-list-editor").css("cursor", "default");
        } else {

            let id = parseInt(window.localStorage.home_server_site_total_lists_created);

            let color_id = id % 10;

            new_list = { id: id, name: $("#new-list-editor").val(), color_id: color_id, tasks_created: 0, tasks_completed: 0 };
            window.localStorage.home_server_site_total_lists_created = parseInt(window.localStorage.home_server_site_total_lists_created) + 1;
            home_server_site_task_lists.push(new_list);
            store_data_lists();
            display_all_lists();
            $("#new-list-editor").val("")
            document.activeElement.blur();
            reset_new_list_button();

        }
    });

    $(document).on("keypress", "#new-list-editor", function (event) {
        if (event.keyCode == 13 && $(this).val()) {

            let id = parseInt(window.localStorage.home_server_site_total_lists_created);

            let color_id = id % 10;

            new_list = { id: id, name: $("#new-list-editor").val(), color_id: color_id };
            window.localStorage.home_server_site_total_lists_created = parseInt(window.localStorage.home_server_site_total_lists_created) + 1;
            home_server_site_task_lists.push(new_list);
            store_data_lists();
            display_all_lists();
            $("#new-list-editor").val("")
            document.activeElement.blur();
            reset_new_list_button();
        }
    });

    $(document).on("blur", "#new-list-editor", function () {
        $("#new-list-editor").attr("placeholder", "New Task List");
        document.activeElement.blur();
        if (!$(this).val()) {
            reset_new_list_button();
        }
    });

    $(document).on("blur", ".list-editor", function () {
        if ($(this).val()) {

            let id = $(this).data("id");
            $(this).data("last-value", $(this).val());
            home_server_site_task_lists.forEach(x => {
                if (x.id == id) {
                    x.name = $(this).val();
                }
            });

            if (id == window.localStorage.home_server_site_selected_list) {
                set_div_text(window.localStorage.home_server_site_selected_list, "#nav-tasks");
            }

            store_data_lists();
        } else {
            $(this).val($(this).data("last-value"));
        }
    });

    $(document).on("keypress", ".list-editor", function (event) {
        if (event.keyCode == 13) {
            if ($(this).val()) {
                document.activeElement.blur();
            }
        }
    });

    $(document).on("click", ".delete-list-button", function () {

        if (home_server_site_task_lists.length > 1) {
            let result = confirm("This will delete the list permanently. Are you sure you want to do this?");

            if (result == true) {
                let id = $(this).data("id");
                home_server_site_task_lists.forEach(x => {

                    if (x.id == id) {
                        home_server_site_task_lists.splice(home_server_site_task_lists.indexOf(x), 1);
                        return;
                    }
                });
                // Check if the user just deleted the list that they currently have selected.
                if (id == window.localStorage.home_server_site_selected_list) {
                    // Set the new selected list to the first in the array of lists.
                    window.localStorage.home_server_site_selected_list = home_server_site_task_lists[0].id;
                    set_div_text(window.localStorage.home_server_site_selected_list, "#nav-tasks");
                }

                store_data_lists();
                display_all_lists();
            }
        } else {
            alert("You must have at least 1 list. You can't delete your last list.")
        }

    });

    $(document).on("click", ".select-list-button", function () {

        let id = $(this).data("id");
        window.localStorage.home_server_site_selected_list = id;
        set_div_text(window.localStorage.home_server_site_selected_list, "#nav-tasks");


    });


});

function reset_new_list_button() {
    $("#new-list-header").css("cursor", "pointer");
    $("#new-list-editor").css("cursor", "pointer");
    $("#plus-image-container").stop();
    $("#create-list-words").stop();
    $("#background-new-list-body").stop();
    $(".plus-path").css("stroke", "#e8e8e8");
    $("#plus-image-container").css("padding-top", "62px");
    $("#create-list-words").css("opacity", "0");
    $("#background-new-list-body").css("opacity", "0");
}

function display_all_lists() {

    $("#task-lists-append-load").html("");
    // Go through all lists and add html to page.
    home_server_site_task_lists.forEach((x) => create_list_html(x));
}

function create_list_html(list_item) {

    const { id, name, color_id } = list_item;
    html = `
    <div class='list-area'>
        <div class='list-section'>
            <div class='list'>
                <div class='list-header font-1 color-id-${color_id}'>


                <div class='list-header-words'>
                    <input id='list-editor' value='${name}' data-last-value='${name}' data-id='${id}' class='list-name-editor list-editor font-1'>
                </div>


                </div>
                <div class='list-body'>
                    <div class='list-stats-area'>

                        <div class='list-tasks-data-heading font-1'>
                            Task Complete Percentages
                        </div>
                        <div class='list-tasks-chart font-1'>
                            <div class='list-tasks-completed list-chart'>
                                <p id='chart-1-tasks-completed-text'></p>
                            </div>
                            <div class='list-tasks-not-completed list-chart'>
                                <p id='chart-1-tasks-not-completed-text'></p>
                            </div>
                            <div class='list-bar-chart-no-data'>
                                <p>No Data</p>
                            </div>
                        </div>
                    </div>
                    <div class='delete-button-container'>
                        <button class='select-list-button font-1' data-id='${id}' >Select List</button>
                        <button class='delete-list-button font-1' data-id='${id}' >Delete List</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    display_html(html)

}

function display_html(html) {

    $("#task-lists-append-load").append(html);

}