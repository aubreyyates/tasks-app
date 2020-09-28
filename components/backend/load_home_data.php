<?php  
    // Create the connection to the database
    include_once '../../backend/database_connection.php';

    // Get all of the tasks that are not completed
    $statement = $conn->prepare("SELECT * FROM task WHERE task_completion_status = ?;");
    // Set $task_completion_status to 0 which is not complete
    $task_completion_status = 0;
    // Put variables in
    $statement->bind_param("i", $task_completion_status);
    // Execute the statement
    $statement->execute();
    // Put the result into $result
    $result = $statement->get_result(); 
    // Get the number of rows
    $num_rums_total_not_completed = mysqli_num_rows($result);

    
    // Get all of the tasks that are completed
    $statement = $conn->prepare("SELECT * FROM task WHERE task_completion_status = ?;");
    // Set $task_completion_status to 1 which is complete
    $task_completion_status = 1;
    // Put variables in
    $statement->bind_param("i", $task_completion_status);
    // Execute the statement
    $statement->execute();
    // Put the result into $result
    $result = $statement->get_result(); 
    // Get the number of rows
    $num_rums_total_completed = mysqli_num_rows($result);



    // Get all of the tasks that are completed and have priority of 2
    $statement = $conn->prepare("SELECT * FROM task WHERE task_completion_status = ? AND task_priority = ?;");
    // Set the task priority
    $task_priority = 2;
    // Put variables in
    $statement->bind_param("ii", $task_completion_status, $task_priority);
    // Execute the statement
    $statement->execute();
    // Put the result into $result
    $result = $statement->get_result(); 
    // Get the number of rows
    $num_rums_high_priority = mysqli_num_rows($result);


    // Get all of the tasks that are completed and have priority of 1
    $statement = $conn->prepare("SELECT * FROM task WHERE task_completion_status = ? AND task_priority = ?;");
    // Set the task priority
    $task_priority = 1;
    // Put variables in
    $statement->bind_param("ii", $task_completion_status, $task_priority);
    // Execute the statement
    $statement->execute();
    // Put the result into $result
    $result = $statement->get_result(); 
    // Get the number of rows
    $num_rums_med_priority = mysqli_num_rows($result);


    // Get all of the tasks that are completed and have priority of 0
    $statement = $conn->prepare("SELECT * FROM task WHERE task_completion_status = ? AND task_priority = ?;");
    // Set the task priority
    $task_priority = 0;
    // Put variables in
    $statement->bind_param("ii", $task_completion_status, $task_priority);
    // Execute the statement
    $statement->execute();
    // Put the result into $result
    $result = $statement->get_result(); 
    // Get the number of rows
    $num_rums_low_priority = mysqli_num_rows($result);

    // Create an array for the data
    $data = array($num_rums_total_completed, $num_rums_total_not_completed, $num_rums_high_priority, $num_rums_med_priority, $num_rums_low_priority);
    // Send back the data
    echo json_encode($data);

    // Close the connection.
    mysql_close($conn);


