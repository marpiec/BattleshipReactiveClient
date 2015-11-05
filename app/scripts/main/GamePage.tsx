namespace page {


    export class GamePageParams {
        gameId: string;
    }

    export class GamePageProps {
        params: GamePageParams;
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
                    <p>Game page {this.props.params.gameId}</p>
                </div>
            )
        }
    }


}