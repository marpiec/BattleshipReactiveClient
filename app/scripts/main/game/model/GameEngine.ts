/// <reference path="GameState.ts"/>
/// <reference path="../../utils/Lens.ts"/>

namespace game {

    export abstract class PhaseHandler {

        abstract getPhase(): GamePhase;

        toggleCell(state:GameState, x:number, y:number):GameState {
            throw "Method not allowed in this phase";
        }
        submitBoard(state:GameState):GameState {
            throw "Method not allowed in this phase";
        }
    }


    export class InitPlayerBoardHandler extends PhaseHandler {

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
            return Lens.setIn(Lens.of(state).gamePhase, GamePhase.waitForSecondPlayer);
        }
    }


    export class GameEngine {

        private static phaseHandlers = GameEngine.initPhaseHandlers(new InitPlayerBoardHandler());

        private static initPhaseHandlers(...handlers: PhaseHandler[]): {[phase: number]: PhaseHandler} {
            const phaseHandlers:{[phase: number]: PhaseHandler} = {};

            handlers.forEach((handler:PhaseHandler) => {
                phaseHandlers[handler.getPhase()] = handler;
            });

            return phaseHandlers;
        }

        static getPhaseHandler(state:GameState): PhaseHandler {
            return GameEngine.phaseHandlers[state.gamePhase];
        }



    }
}