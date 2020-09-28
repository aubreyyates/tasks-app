<?php

    // Create the connection to the database
    include_once '../../backend/database_connection.php';
    // Get the task id
    $id = $_POST['id'];
    // Get the task completion status
    $completion_status = $_POST['completion_status'];
    // Create a prepare statement
    $statement = $conn->prepare("UPDATE task SET task_completion_status = ? WHERE task_id = ?;");
    // Put things into prepared statement
    $statement->bind_param("ii",$completion_status,$id);
    // Execute prepared statement
    $statement->execute();