/* 
This script handles everything in the nav-panel. The nav buttons will take the user to different parts of
the application.
*/

$(document).ready(function () {

    // Change the selected nav buttons color.
    $(".nav-home").click(function () {
        $(".nav-button").removeClass("nav-button-selected");
        $(".nav-panel-hamburger-modal-button").removeClass("nav-button-selected");
        $(".nav-home").addClass("nav-button-selected");
    });
    $(".nav-tasks").click(function () {
        $(".nav-button").removeClass("nav-button-selected");
        $(".nav-panel-hamburger-modal-button").removeClass("nav-button-selected");
        $(".nav-tasks").addClass("nav-button-selected");
    });
    $(".nav-settings").click(function () {
        $(".nav-button").removeClass("nav-button-selected");
        $(".nav-panel-hamburger-modal-button").removeClass("nav-button-selected");
        $(".nav-settings").addClass("nav-button-selected");
    });

    // Nav button pushed handlers -------
    $(".nav-home").click(function () {
        $("#main-window-heading-text").text("Home");
        $("#tasks-load").css("display", "none");
        $("#settings-load").css("display", "none");
        $("#task-lists-load").css("display", "none");
        $("#home-load").css("display", "block");
        $("#nav-panel-hamburger-modal").css("display", "none");

        home_server_site.change_priority_dropdown = false;
        display_all_home_data();
    });

    $(".nav-tasks").click(function () {

        $("#undo-button-modal").css("display", "none");
        set_div_text(window.localStorage.home_server_site_selected_list, "#main-window-heading-text");
        $("#settings-load").css("display", "none");
        $("#home-load").css("display", "none");
        $("#task-lists-load").css("display", "none");
        $("#tasks-load").css("display", "block");
        $("#nav-panel-hamburger-modal").css("display", "none");

        display_all_tasks();
    });

    $(".nav-task-lists").click(function () {
        $("#main-window-heading-text").text("Lists");
        $("#settings-load").css("display", "none");
        $("#home-load").css("display", "none");
        $("#tasks-load").css("display", "none");
        $("#task-lists-load").css("display", "block");
        $("#nav-panel-hamburger-modal").css("display", "none");

        home_server_site.change_priority_dropdown = false;
    });

    $(".nav-settings").click(function () {

        $("#feedback-message").text("");
        $("#main-window-heading-text").text("Settings");
        $("#home-load").css("display", "none");
        $("#tasks-load").css("display", "none");
        $("#task-lists-load").css("display", "none");
        $("#settings-load").css("display", "block");
        $("#nav-panel-hamburger-modal").css("display", "none");

        home_server_site.change_priority_dropdown = false;
    });
    // --------- End nav handler scripts ------------------

    $(document).on("click", "#main-heading-hamburger-button", function () {
        $("#nav-panel-hamburger-modal").css("display", "block");
    });
});