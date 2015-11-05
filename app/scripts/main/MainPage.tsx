namespace page {


    export class MainPageProps {
    }

    export class MainPageState {
    }


    export class MainPage extends React.Component<MainPageProps, MainPageState> {
        constructor(props:MainPageProps) {
            super(props);
            this.state = new MainPageState();
        }

        render() {
            return (
                <div>
                    <p>Main page</p>
                </div>
            )
        }
    }


}