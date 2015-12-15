/// <reference path="game/GameEvents.ts"/>
/// <reference path="game/GameState.ts"/>
/// <reference path="game/GameService.ts"/>
/// <reference path="game/GameEngine.ts"/>
/// <reference path="view/GameBoardComponent.tsx"/>

namespace gameView {

    import GameState = game.GameState;
    import GameEngine = game.GameEngine;
    import GamePhase = game.GamePhase;
    import MockGameService = game.MockGameService;
    import GameServiceProvider = game.GameServiceProvider;
    import GameService = game.GameService;
    import GameEvent = game.GameEvent;
    import JoinedGame = game.JoinedGame;
    import PlayerBoardSubmitted = game.PlayerBoardSubmitted;
    import OpponentShot = game.OpponentShot;
    import PlayerShot = game.PlayerShot;
    import OpponentJoined = game.OpponentJoined;

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

        private gameService: GameService;
        private gameEngine: GameEngine;

        private gameInterface: GameInterface = {
            toggleCell: (x: number, y: number) => {
                const gameState = this.gameEngine.getPhaseHandler(this.state.gameState).toggleCell(this.state.gameState, x, y);
                this.setState(new GamePageState(gameState));
            },
            submitBoard: () => {
                this.gameService.submitPlayerBoard(this.state.gameState.gameId, this.state.gameState.playerBoard, () => {
                   console.log("Handle submitPlayerBoard success");
                }, () => {
                    console.log("Handle submitPlayerBoard failure");
                });
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
            this.gameService = GameServiceProvider.getGameService();
            this.gameEngine = new GameEngine();

            this.gameService.listenOnServerEvents(props.params.gameId, (event: GameEvent) => {
                console.log("Event received " + event.eventType, event);
               if(JoinedGame.is(event)) {
                 // ignore
               } else if (PlayerBoardSubmitted.is(event)) {
                   const gameState = this.gameEngine.getPhaseHandler(this.state.gameState).playerBoardSubmitted(this.state.gameState, event.playerBoard, event.newGamePhase);
                   this.setState(new GamePageState(gameState));
               } else if (OpponentJoined.is(event)) {
                 const gameState = this.gameEngine.getPhaseHandler(this.state.gameState).opponentBoardSubmitted(this.state.gameState, event.newGamePhase);
                 this.setState(new GamePageState(gameState));
               } else if (PlayerShot.is(event)) {
                   const gameState = this.gameEngine.getPhaseHandler(this.state.gameState).playerShot(this.state.gameState, event.x, event.y, event.result, event.newGamePhase);
                   this.setState(new GamePageState(gameState));
               } else if (OpponentShot.is(event)) {
                   const gameState = this.gameEngine.getPhaseHandler(this.state.gameState).opponentShot(this.state.gameState, event.x, event.y, event.result, event.newGamePhase);
                   this.setState(new GamePageState(gameState));
               } else {
                   throw new Error("Unsupported event type " + JSON.stringify(event));
               }

            });

        }

        submitBoard() {
            this.gameInterface.submitBoard();
        }

        render() {
//{this.renderRemainingShips()}
            return (
                <div className="gamePage">
                    <p>Game page</p>
                    <p>Game Phase: <span>{this.phaseNames.get(this.state.gameState.gamePhase)}</span></p>
                    <p>Game Id: <span>{this.props.params.gameId}</span></p>
                    {this.isInitPlayerBoardPhase() &&
                        this.renderRemainingShips()}
                    <GameBoardComponent label={"Your board"} board={this.state.gameState.playerBoard} gameInterface={this.gameInterface} active={this.state.gameState.playerBoardActive} />
                    <GameBoardComponent label={"Opponents board"} board={this.state.gameState.opponentBoard} gameInterface={this.gameInterface} active={this.state.gameState.opponentBoardActive} />
                    {this.isInitPlayerBoardPhase() &&
                        <button onClick={this.submitBoard.bind(this)}>Submit your board</button>}
                </div>
            )
        }

        renderRemainingShips() {
            const remainingShips = 10 - this.state.gameState.playerBoard.getShipsCount();
            return (
                <div className="remainingShips">
                    <p>Ships to place left {remainingShips}</p>
                    {Immutable.Range(0, remainingShips).map(i =>
                        <div className="remainingShip"></div>
                    )}
                </div>
            );
        }

        isInitPlayerBoardPhase() {
            return this.state.gameState.gamePhase === GamePhase.initPlayerBoard;
        }
    }


}