/// <reference path="game/model/Game.ts"/>
/// <reference path="game/view/GameBoardView.tsx"/>

namespace page {

    import GameState = game.GameState;
    import GameBoardView = game.GameBoardView;

    export class GamePageParams {
        gameId: string;
    }

    export class GamePageProps {
        params: GamePageParams;
    }

    export class GamePageState {
        gameState = GameState.initial;
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
                    <p>{this.props.params.gameId}</p>
                    <GameBoardView board={this.state.gameState.boardA} />
                    <GameBoardView board={this.state.gameState.boardB} />
                </div>
            )
        }
    }


}