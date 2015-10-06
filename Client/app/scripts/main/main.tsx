import login = require("./login/module");
import tasks = require("./tasks/module");

const TasksView = tasks.TasksView;

React.render(
    <TasksView name="Marcin" startWith={6} />,
    document.getElementById('main')
);

