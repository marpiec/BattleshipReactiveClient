namespace page {


    export class GamePageProps {
    }

    export class GamePageState {
    }


    export class GamePage extends React.Component<GamePageProps, GamePageState> {
        constructor(props:GamePageProps) {
            super(props);
            this.state = new GamePageState();
        }

        render() {
            return (
                <div>
                    <p>Game page</p>
                </div>
            )
        }
    }


}