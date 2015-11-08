/// <reference path="GameState.ts"/>

namespace game {

    export class GameEngine {

        static toggleCell(state:GameState, x:number, y:number):GameState {
            if (state.gamePhase === GamePhase.initPlayerBoard) {
                const currentCellState:CellState = state.playerBoard.get(y).get(x);
                const newCellState = currentCellState === CellState.empty ? CellState.ship : CellState.empty;

                return state.setIn([GameState.playerBoard, y, x], newCellState);
            } else {
                throw new Error("Unsupported operation in gamePhase " + state.gamePhase);
            }
        }

        static submitBoard(state:GameState):GameState {
            if (state.gamePhase === GamePhase.initPlayerBoard) {
                return state.set(GameState.gamePhase, GamePhase.waitForSecondPlayer);
            } else {
                throw new Error("Unsupported operation in gamePhase " + state.gamePhase);
            }
        }


    }
}