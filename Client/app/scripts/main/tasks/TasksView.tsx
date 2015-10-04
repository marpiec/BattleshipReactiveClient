namespace tasks {



    export class TasksViewProps {
        name: string;
    }

    export class TasksViewState {

    }


    export class TasksView2 extends React.Component<TasksViewProps, TasksViewState> {
        render() {return <p>
                    Hello {this.props.name}, <input type="text" placeholder="Your name here" />!
                    It is now
                  </p>}

    }




}