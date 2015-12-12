/// <reference path="game/GameState.ts"/>
/// <reference path="game/GameService.ts"/>
/// <reference path="game/GameEngine.ts"/>
/// <reference path="view/GameBoardView.tsx"/>

namespace gameView {

    import GameState = game.GameState;
    import GameEngine = game.GameEngine;
    import GamePhase = game.GamePhase;
    import MockGameService = game.MockGameService;
    import GameServiceProvider = game.GameServiceProvider;

    export class GamePageParams {
        gameId: string;
        playerId: string;
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

        private gameEngine: GameEngine;

        private gameInterface: GameInterface = {
            toggleCell: (x: number, y: number) => {
                const gameState = this.gameEngine.getPhaseHandler(this.state.gameState).toggleCell(this.state.gameState, x, y);
                this.setState(new GamePageState(gameState));
            },
            submitBoard: () => {
                const gameState = this.gameEngine.getPhaseHandler(this.state.gameState).submitBoard(this.state.gameState);
                this.setState(new GamePageState(gameState));
            }
        };

        private phaseNames = Immutable.Map<GamePhase, string>([[GamePhase.initPlayerBoard, "Place your ships."],
                                                               [GamePhase.waitForSecondPlayer, "Please wait for second player."],
                                                               [GamePhase.playerTurn, "Your turn."],
                                                               [GamePhase.opponentTurn, "Opponent's turn."],
                                                               [GamePhase.playerWon, "Player Won!"],
                                                               [GamePhase.opponentWon, "Opponent Won!"]]);



        constructor(props:GamePageProps) {
            super(props);
            this.state = new GamePageState(GameState.initial(props.params.gameId, props.params.playerId));
            this.gameEngine = new GameEngine(GameServiceProvider.getGameService());
        }

        submitBoard() {
            this.gameInterface.submitBoard();
        }

        render() {
            return (
                <div>
                    <p>Game page</p>
                    <p>Game Phase: <span>{this.phaseNames.get(this.state.gameState.gamePhase)}</span></p>
                    <p>Game Id: <span>{this.props.params.gameId}</span></p>
                    {this.isInitPlayerBoardPhase() &&
                        <p>Ships to place left {10 - this.state.gameState.playerBoard.getShipsCount()}</p>}
                    <GameBoardView board={this.state.gameState.playerBoard} gameInterface={this.gameInterface} active={this.state.gameState.playerBoardActive} />
                    <GameBoardView board={this.state.gameState.opponentBoard} gameInterface={this.gameInterface} active={this.state.gameState.opponentBoardActive} />
                    {this.isInitPlayerBoardPhase() &&
                        <button onClick={this.submitBoard.bind(this)}>Submit your board</button>}
                </div>
            )
        }

        isInitPlayerBoardPhase() {
            return this.state.gameState.gamePhase === GamePhase.initPlayerBoard;
        }
    }


}