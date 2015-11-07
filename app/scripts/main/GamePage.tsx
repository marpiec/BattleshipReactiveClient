/// <reference path="game/model/Game.ts"/>
/// <reference path="game/view/GameBoardView.tsx"/>

namespace page {

    import GameState = game.GameState;
    import GameBoardView = game.GameBoardView;
    import Game = game.Game;

    export class GamePageParams {
        gameId: string;
    }

    export class GamePageProps {
        params: GamePageParams;
    }

    export class GamePageState {
        game: Game;

        constructor(game: Game) {
            this.game = game;
        }

        setGame(game: Game) {
            return new GamePageState(game);
        }
    }


    export class GamePage extends React.Component<GamePageProps, GamePageState> {
        constructor(props:GamePageProps) {
            super(props);
            this.state = new GamePageState(Game.initial((game: Game) => {
                console.log("State updated", game);
                this.setState(this.state.setGame(game));
            }));
        }

        render() {
            return (
                <div>
                    <p>Game page</p>
                    <p>Game Phase: {this.state.game.state.gamePhase}</p>
                    <p>Game Id: {this.props.params.gameId}</p>
                    <GameBoardView board={this.state.game.state.playerBoard} game={this.state.game} />
                    <GameBoardView board={this.state.game.state.opponentBoard} game={this.state.game} />
                </div>
            )
        }
    }


}