namespace game {

    export class GameBoardViewProps {
    }

    export class GameBoardViewState {
    }


    export class GameBoardView extends React.Component<GameBoardViewProps, GameBoardViewState> {
        constructor(props:GameBoardViewProps) {
            super(props);
            this.state = new GameBoardViewState();
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