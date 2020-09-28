
<link rel="stylesheet" href="./components/css/tasks.css" />

<div id='tasks'>

    <div style='height:50px;'></div>

    <div id='new-task'>
        <div id='change-priority-dropdown'>
            <div>
                <button id='change-to-low-button' class='change-priority-selection' style='border-radius:14px 14px 0px 0px' value='0'></button>
            </div>
            <div>
                <button id='change-to-medium-button' class='change-priority-selection'  value='1'></button>
            </div>
            <div>
                <button id='change-to-high-button' class='change-priority-selection' style='border-radius:0px 0px 14px 14px'  value='2'></button>
            </div>
        </div>
    
        <div id='new-priority' >
            <button id='change-priority-button' value="0"></button>
        </div>
        <div id='new-task-input-area'>
            <input id='new-task-input' placeholder='+ Add Task'>
        </div>
        <div id='new-task-button-area'>
            <button id='new-task-button' class='font-1'>
                Submit
            </button>
        </div>     
    </div>



    <div id='tasks-load'></div>


    <?php
        include_once "undo-button-modal.php";
    ?>


</div>