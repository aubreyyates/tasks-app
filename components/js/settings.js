$(document).ready(function () {




    $(document).on("change", "#toggle-high-priority-sorting", function () {
        if (home_server_site.sort_task == "none") {
            home_server_site.sort_task = "highest_first";
            home_server_site.task.sort((a, b) => (a.priority < b.priority) ? 1 : -1)
        } else {
            home_server_site.sort_task = "none";
            home_server_site.task = [...home_server_site.original_task_order];
        }
    });


});

function set_settings() {
    if (home_server_site.sort_task == "highest_first") {
        $('#toggle-high-priority-sorting').prop('checked', true);
    }
}