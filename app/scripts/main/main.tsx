/// <reference path="./tasks/TasksView.tsx"/>
/// <reference path="./hello/HelloView.tsx"/>

namespace main {


    import TasksView = tasks.TasksView;
    import HelloView = hello.HelloView;

    import Router = ReactRouter.Router;
    import Route = ReactRouter.Route;

    //declare var ReactRouter: any;
    //var Router = ReactRouter.Router;
    //var Route = ReactRouter.Route;

    //
    //React.render(
    //    <TasksView name="Marcin" startWith={6} />,
    //    document.body
    //);
    //
    //

    console.log(ReactRouter);


    ReactDOM.render((
        <Router>
            <Route path="/">
                <Route path="hello" component={HelloView}/>
                <Route path="task" component={HelloView}/>
            </Route>
        </Router>
    ), document.getElementById('main'))

}


