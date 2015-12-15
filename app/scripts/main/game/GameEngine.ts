/// <reference path="GameState.ts"/>
/// <reference path="../utils/Lens.ts"/>

namespace game {

    export abstract class PhaseHandler {

        abstract getPhase(): GamePhase;

        private static NotAllowed = new Error("Method not allowed in this phase");

        toggleCell(state:GameState, x:number, y:number):GameState {
            throw PhaseHandler.NotAllowed;
        }
        playerBoardSubmitted(state:GameState, playerBoard: GameBoard, newPhase: GamePhase):GameState {
            throw PhaseHandler.NotAllowed;
        }
        opponentBoardSubmitted(state: GameState, newPhase: GamePhase):GameState {
            throw PhaseHandler.NotAllowed;
        }
        playerShot(state: GameState, x: number, y: number, result: ShotResult, newPhase: GamePhase):GameState {
            throw PhaseHandler.NotAllowed;
        }
        opponentShot(state: GameState, x: number, y: number, result: ShotResult, newPhase: GamePhase):GameState {
            throw PhaseHandler.NotAllowed;
        }
    }


    export class InitPlayerBoardHandler extends PhaseHandler {

        getPhase() {
            return GamePhase.initPlayerBoard;
        }

        toggleCell(state: game.GameState, x: number, y: number): game.GameState {
            const currentCellState:CellState = state.playerBoard.rows.get(y).get(x);
            const newCellState = currentCellState === CellState.empty ? CellState.ship : CellState.empty;

            return Lens.setIn(Lens.of(state).playerBoard.rows.get(y).get(x), newCellState);
        }

        playerBoardSubmitted(state:GameState, playerBoard: GameBoard, newPhase: GamePhase): game.GameState {
           return Lens.setIn(Lens.of(state).gamePhase, newPhase);
        }

    }


    export class WaitForSecondPlayerHandler extends PhaseHandler {

        getPhase() {
            return GamePhase.waitForSecondPlayer;
        }

        opponentBoardSubmitted(state:game.GameState, newPhase: GamePhase):GameState {
            return Lens.setIn(Lens.of(state).gamePhase, newPhase);
        }
    }

    export class PlayerTurnHandler extends PhaseHandler {

        getPhase() {
            return GamePhase.playerTurn;
        }

        playerShot(state: GameState, x: number, y: number, result: ShotResult, newPhase: GamePhase):GameState {
            return Lens.setIn(Lens.of(state).gamePhase, newPhase);
        }
    }

    export class OpponentTurnHandler extends PhaseHandler {

        getPhase() {
            return GamePhase.opponentTurn;
        }

        opponentShot(state: GameState, x: number, y: number, result: ShotResult, newPhase: GamePhase):GameState {
            return Lens.setIn(Lens.of(state).gamePhase, newPhase);
        }
    }

    export class GameEngine {

        private phaseHandlers: {[phase: number]: PhaseHandler};

        constructor() {
            this.phaseHandlers = this.initPhaseHandlers(new InitPlayerBoardHandler(), new WaitForSecondPlayerHandler(),
                new PlayerTurnHandler(), new OpponentTurnHandler());
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