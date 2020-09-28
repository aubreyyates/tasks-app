<?php 

    // Create the connection to the database
    include_once '../../backend/database_connection.php';
    // Get the task description
    $description = $_POST['description'];
    // Get the task priority
    $priority = $_POST['priority'];
    // Removes any html elements, such as dangerous script tags, before they get submitted to the database.
    $description_clean = filter_var($description, FILTER_SANITIZE_STRING);
    $priority_clean = filter_var($priority, FILTER_SANITIZE_STRING);
    // Create a prepare statement
    $statement = $conn->prepare("INSERT INTO task (task_description, task_priority) VALUES (?,?);");
    // Put things into prepared statement
    $statement->bind_param("si",$description_clean,$priority_clean);
    // Execute prepared statement
    $statement->execute();
    // Get the last inserted id
    $last_insert_id = $conn->insert_id;
    // Send back the inserted id
    echo $last_insert_id;