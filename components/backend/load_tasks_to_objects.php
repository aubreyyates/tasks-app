<?php  
    // Create the connection to the database
    include_once '../../backend/database_connection.php';
    // Get all of the tasks that are not completed
    $statement = $conn->prepare("SELECT * FROM task WHERE task_completion_status=?;");
    // Set $task_completion_status to 0 which is not complete
    $task_completion_status = 0;
    // Put variables in
    $statement->bind_param("i", $task_completion_status);
    // Execute the statement
    $statement->execute();
    // Put the result into $result
    $result = $statement->get_result(); 
    //create an empty array
    $data = array();
    // Go through the results
    foreach($result as $row) { 
        // Fill the array
        $data[] = array(
            // Get the task id
            'id' => $row['task_id'], 
            // Get the task description
            'description' => $row['task_description'], 
            // Get the task priority
            'priority' => $row['task_priority']
        );
    }
    // return events in json
    echo json_encode($data);
