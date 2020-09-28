<link rel="stylesheet" href="./components/css/home.css" />

<div id='home'>
    <div style='height:50px;'></div>
    <div id='tasks-data-area'>
        <div id='tasks-data' class='font-1'>
            <div class='tasks-data-line'>
                <div class='tasks-data-completed'>
                    <p>Total Tasks Not Completed:</p>
                </div>
                <div class='tasks-data-completed-num'>
                    <p id='task-not-complete-count'></p>
                </div>
            </div>
            <div class='tasks-data-line'>
                <div class='tasks-data-completed'>
                    <p>Total Tasks Completed:</p>
                </div>
                <div class='tasks-data-completed-num'>
                    <p id='task-complete-count'></p>
                </div>
            </div>
            <div style='height:60px;'></div>
            <div class='tasks-data-line'>
                <div class='tasks-data-completed'>
                    <p>High Priority Completed:</p>
                </div>
                <div class='tasks-data-completed-num'>
                    <p id='high-priority-complete-count'></p>
                </div>
            </div>
            <div class='tasks-data-line'>
                <div class='tasks-data-completed'>
                    <p>Medium Priority Completed:</p>
                </div>
                <div class='tasks-data-completed-num'>
                    <p id='medium-priority-complete-count'></p>
                </div>
            </div>
            <div class='tasks-data-line'>
                <div class='tasks-data-completed'>
                    <p>Low Priority Completed:</p>
                </div>
                <div class='tasks-data-completed-num'>
                    <p id='low-priority-complete-count'></p>
                </div>
            </div>
        </div>
        <div id='tasks-charts' class='font-1'>
            <div class='tasks-chart'>
                <div id='chart-1-tasks-completed' class='bar-chart'>
                    <p>Completed</p>
                </div>
                <div id='chart-1-tasks-not-completed' class='bar-chart'>
                    <p>Not Completed</p>
                </div>
            </div>
            <div style='height:20px;'></div>
            <div class='tasks-chart'>
                <div id='chart-2-tasks-high' class='bar-chart'>
                    <p>High Priority</p>
                </div>
                <div id='chart-2-tasks-medium' class='bar-chart'>
                    <p>Medium Priority</p>
                </div>
                <div id='chart-2-tasks-low' class='bar-chart'>
                    <p>Low Priority</p>
                </div>
            </div>


        </div>
    </div>
</div>