namespace hello {


    export class HelloViewProps {
    }

    export class HelloViewState {
    }


    export class HelloView extends React.Component<HelloViewProps, HelloViewState> {
        constructor(props:HelloViewProps) {
            super(props);
            this.state = new HelloViewState();
        }

        render() {
            return (
                <div>
                    <p>Hello You!</p>
                </div>
            )
        }
    }


}