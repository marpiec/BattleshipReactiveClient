/// <reference path="game/model/Game.ts"/>
/// <reference path="game/view/GameBoardView.tsx"/>

namespace page {

    import GameState = game.GameState;
    import GameBoardView = game.GameBoardView;
    import Game = game.Game;
    import GameInterface = game.GameInterface;

    export class GamePageParams {
        gameId: string;
    }

    export class GamePageProps {
        params: GamePageParams;
    }

    export class GamePageState {
        gameState: GameState;

        constructor(gameState: GameState) {
            this.gameState = gameState;
        }

        static setGameState(other: GamePageState, gameState: GameState) {
            return new GamePageState(gameState);
        }

    }


    export class GamePage extends React.Component<GamePageProps, GamePageState> {

        gameInterface: GameInterface = {
            toggleCell: (x: number, y: number) => {
                this.setState(GamePageState.setGameState(this.state, Game.toggleCell(this.state.gameState, x, y)));
            },
            submitBoard: () => {
                this.setState(GamePageState.setGameState(this.state, Game.submitBoard(this.state.gameState)));
            }
        };

        constructor(props:GamePageProps) {
            super(props);
            this.state = new GamePageState(GameState.initial);
        }

        render() {
            return (
                <div>
                    <p>Game page</p>
                    <p>Game Phase: {this.state.gameState.gamePhase}</p>
                    <p>Game Id: {this.props.params.gameId}</p>
                    <GameBoardView board={this.state.gameState.playerBoard} gameInterface={this.gameInterface} />
                    <GameBoardView board={this.state.gameState.opponentBoard} gameInterface={this.gameInterface} />
                </div>
            )
        }
    }


}