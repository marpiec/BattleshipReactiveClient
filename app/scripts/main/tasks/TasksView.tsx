namespace tasks {


    export class TasksViewProps {
        name:string;
        startWith:number;
    }

    export class TasksViewState {
        count:number;

        constructor(count:number) {
            this.count = count;
        }
    }


    export class TasksView extends React.Component<TasksViewProps, TasksViewState> {
        constructor(props:TasksViewProps) {
            super(props);
            this.state = new TasksViewState(props.startWith);
        }

        tick() {
            this.setState(new TasksViewState(this.state.count + 1));
        }

        render() {
            return (
                <div>
                    <p>Hello {this.props.name}</p>
                    <div onClick={this.tick.bind(this)}>
                        Clicks: {this.state.count}
                    </div>
                    <span className="label label-success">Success <i className="fa fa-arrow-circle-o-left" /></span>
                </div>
            )
        }
    }


}