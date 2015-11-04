/// <reference path="./tasks/TasksView.tsx"/>

namespace main {

    const TasksView = tasks.TasksView;

    React.render(
        <TasksView name="Marcin" startWith={6} />,
        document.getElementById('main')
    );

}


