/// <reference path="game/model/GameState.ts"/>
/// <reference path="game/model/GameEngine.ts"/>
/// <reference path="game/view/GameBoardView.tsx"/>

namespace gameView {

    import GameState = game.GameState;
    import GameEngine = game.GameEngine;
    import GamePhase = game.GamePhase;

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

    }

    export interface GameInterface {
        toggleCell(x: number, y: number): void;
        submitBoard(): void;
    }

    export class GamePage extends React.Component<GamePageProps, GamePageState> {

        gameInterface: GameInterface = {
            toggleCell: (x: number, y: number) => {
                const gameState = GameEngine.getPhaseHandler(this.state.gameState).toggleCell(this.state.gameState, x, y);
                this.setState(new GamePageState(gameState));
            },
            submitBoard: () => {
                const gameState = GameEngine.getPhaseHandler(this.state.gameState).submitBoard(this.state.gameState);
                this.setState(new GamePageState(gameState));
            }
        };

        phaseNames = Immutable.Map<GamePhase, string>([[GamePhase.initPlayerBoard, "Place your ships."],
                                                       [GamePhase.waitForSecondPlayer, "Please wait for second player."],
                                                       [GamePhase.playerTurn, "Your turn."],
                                                       [GamePhase.otherPlayerTurn, "Opponent's turn."],
                                                       [GamePhase.gameEnded, "End of game"]]);



        constructor(props:GamePageProps) {
            super(props);
            this.state = new GamePageState(GameState.initial);
        }

        submitBoardClicked() {
            this.gameInterface.submitBoard();
        }

        render() {
            return (
                <div>
                    <p>Game page</p>
                    <p>Game Phase: <span>{this.phaseNames.get(this.state.gameState.gamePhase)}</span></p>
                    <p>Game Id: <span>{this.props.params.gameId}</span></p>
                    <GameBoardView board={this.state.gameState.playerBoard} gameInterface={this.gameInterface} active={this.state.gameState.playerBoardActive} />
                    <GameBoardView board={this.state.gameState.opponentBoard} gameInterface={this.gameInterface} active={this.state.gameState.opponentBoardActive} />
                    {this.renderSubmitButton()}
                </div>
            )
        }

        renderSubmitButton() {
            if(this.state.gameState.gamePhase === GamePhase.initPlayerBoard) {
                return <button onClick={this.submitBoardClicked.bind(this)}>Join game</button>
            }
        }
    }


}