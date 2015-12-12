/// <reference path="GameState.ts"/>
/// <reference path="../utils/Lens.ts"/>

namespace game {

    export abstract class PhaseHandler {

        abstract getPhase(): GamePhase;

        private static NotAllowed = new Error("Method not allowed in this phase");

        toggleCell(state:GameState, x:number, y:number):GameState {
            throw PhaseHandler.NotAllowed;
        }
        submitBoard(state:GameState):GameState {
            throw PhaseHandler.NotAllowed;
        }
        opponentBoardSubmitted(state: GameState, opponentBoard: Immutable.List<Immutable.List<CellState>>, newPhase: GamePhase):GameState {
            throw PhaseHandler.NotAllowed;
        }
        playerShoot(state: GameState, x: number, y: number):GameState {
            throw PhaseHandler.NotAllowed;
        }
        opponentShoot(state: GameState, x: number, y: number):GameState {
            throw PhaseHandler.NotAllowed;
        }
    }


    export class InitPlayerBoardHandler extends PhaseHandler {

        private gameService: GameService;

        constructor(gameService:game.GameService) {
            super();
            this.gameService = gameService;
        }

        getPhase() {
            return GamePhase.initPlayerBoard;
        }

        toggleCell(state: game.GameState, x: number, y: number): game.GameState {
            console.log(" playerBoard "+state.playerBoard);
            const currentCellState:CellState = state.playerBoard.get(y).get(x);
            const newCellState = currentCellState === CellState.empty ? CellState.ship : CellState.empty;

            return Lens.setIn(Lens.of(state).playerBoard.get(y).get(x), newCellState);
        }

        submitBoard(state: game.GameState): game.GameState {

            const ships = this.countShipsInBoard(state.playerBoard);

            if(ships === 10) {
                return Lens.setIn(Lens.of(state).gamePhase, GamePhase.waitForSecondPlayer);
            } else {
                alert("Invalid number of ships " + ships);
                return state;
            }
        }

        private countShipsInBoard(board: Immutable.List<Immutable.List<CellState>>): number {
            const shipsInRows = board.map(row => row.count(cell => cell === CellState.ship));
            return shipsInRows.reduce((acc: number, el: number) => acc + el);
        };
    }


    export class WaitForSecondPlayerHandler extends PhaseHandler {

        private gameService: GameService;

        constructor(gameService:game.GameService) {
            super();
            this.gameService = gameService;
        }

        getPhase() {
            return GamePhase.initPlayerBoard;
        }

        opponentBoardSubmitted(state:game.GameState, opponentBoard:Immutable.List<Immutable.List<game.CellState>>, newPhase: GamePhase):GameState {
            const withBoard = Lens.setIn(Lens.of(state).opponentBoard, opponentBoard);
            return Lens.setIn(Lens.of(withBoard).gamePhase, newPhase);
        }
    }

    export class PlayerTurnHandler extends PhaseHandler {

        private gameService: GameService;

        constructor(gameService:game.GameService) {
            super();
            this.gameService = gameService;
        }

        getPhase() {
            return GamePhase.playerTurn;
        }

        playerShoot(state:game.GameState, x:number, y:number):GameState {
            return state;
        }
    }

    export class OpponentTurnHandler extends PhaseHandler {

        private gameService: GameService;

        constructor(gameService:game.GameService) {
            super();
            this.gameService = gameService;
        }

        getPhase() {
            return GamePhase.opponentTurn;
        }

        opponentShoot(state:game.GameState, x:number, y:number):GameState {
            return state;
        }
    }

    export class GameEngine {

        private gameService: GameService;

        private phaseHandlers: {[phase: number]: PhaseHandler};


        constructor(gameService:game.GameService) {
            this.gameService = gameService;
            this.phaseHandlers = this.initPhaseHandlers(new InitPlayerBoardHandler(gameService), new WaitForSecondPlayerHandler(gameService),
                new PlayerTurnHandler(gameService), new OpponentTurnHandler(gameService));
        }

        private initPhaseHandlers(...handlers: PhaseHandler[]): {[phase: number]: PhaseHandler} {
            const phaseHandlers:{[phase: number]: PhaseHandler} = {};

            handlers.forEach((handler:PhaseHandler) => {
                phaseHandlers[handler.getPhase()] = handler;
            });

            return phaseHandlers;
        }

        getPhaseHandler(state:GameState): PhaseHandler {
            return this.phaseHandlers[state.gamePhase];
        }



    }
}