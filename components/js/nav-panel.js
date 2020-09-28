/* 
This script handles everything in the nav-panel. The nav buttons will take the user to different parts of
the application. It will do this by loading new html into the load div.
*/

$(document).ready(function () {

    // Change the selected nav buttons color.
    $(".nav-button").click(function () {
        $(".nav-button").removeClass("nav-button-selected");
        $(this).addClass("nav-button-selected");
    });


    // The following load components into the load div -----
    $("#nav-home").click(function () {
        $("#main-window-heading-text").text("Home");
        $("#load").html("");
        $("#load").load("./components/home.php", function () {
            display_all_home_data()
        });
    });

    $("#nav-tasks").click(function () {
        $("#main-window-heading-text").text("Tasks");
        $("#load").html("");
        $("#load").load("./components/tasks.php", function () {
            display_all_tasks();
            home_server_site.first_new_task_click = false;
        });
    });

    $("#nav-profiles").click(function () {
        $("#main-window-heading-text").text("Profiles");
        $("#load").html("");
        $("#load").load("./components/profiles.php");
    });

    $("#nav-settings").click(function () {
        $("#main-window-heading-text").text("Settings");
        $("#load").html("");
        $("#load").load("./components/settings.php", function () {
            set_settings();
        });
    });
    // --------- End load div scripts ------------------




});