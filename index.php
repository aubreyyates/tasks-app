<!DOCTYPE html>
<html>
<head>
    
<meta charset="UTF-8">
<title>Home Server App</title>
<!-- Style Sheets -->
<link rel="stylesheet" href="css/style.css" />
<!-- Google Font Links -->
<link href="https://fonts.googleapis.com/css?family=Questrial|Quicksand:500&display=swap" rel="stylesheet">
<!-- JQuery Library -->
<script src='./js/jquery-3.4.1.min.js'></script>

</head>

<body>

    <div id='main-section'>
        <?php
            include_once "./components/nav-panel.php";
            include_once "./components/main-window.php";
        ?>
    </div>


    <script src='./js/script.js'></script> 
    <!-- 
    The js for the components are put here so that the don't 
    execute everytime one gets loaded into the load div.
    -->
    <script src='./components/js/home.js'></script> 
    <script src='./components/js/tasks.js'></script> 
    <script src='./components/js/settings.js'></script> 

</body>

</html>