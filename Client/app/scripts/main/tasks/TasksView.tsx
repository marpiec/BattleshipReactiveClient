namespace tasks {



    export class TasksViewProps {
        name: string;
    }

    export class TasksViewState {
        count: number;

        constructor(count:number) {
            this.count = count;
        }
    }


    export class TasksView2 extends React.Component<TasksViewProps, TasksViewState> {
        constructor(props: TasksViewProps) {
            super(props);
            this.state = new TasksViewState(0);
        }

        tick() {
            this.setState(new TasksViewState(this.state.count + 1));
        }

       render() {return (
            <div onClick={this.tick.bind(this)}>
                Clicks: {this.state.count}
            </div>
    )}
}




}