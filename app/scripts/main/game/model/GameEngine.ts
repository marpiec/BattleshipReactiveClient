/// <reference path="GameState.ts"/>
/// <reference path="../../utils/ImmutablePath.ts"/>

namespace game {

    import I = ImmutablePath;

    export class GameEngine {

        static toggleCell(state:GameState, x:number, y:number):GameState {
            if (state.gamePhase === GamePhase.initPlayerBoard) {
                const currentCellState:CellState = state.playerBoard.get(y).get(x);
                const newCellState = currentCellState === CellState.empty ? CellState.ship : CellState.empty;

                return state.setIn(I.path(I.of(state).playerBoard).concat([y, x]), newCellState);
            } else {
                throw new Error("Unsupported operation in gamePhase " + state.gamePhase);
            }
        }

        static submitBoard(state:GameState):GameState {
            if (state.gamePhase === GamePhase.initPlayerBoard) {
                return state.setIn(I.path(I.of(state).gamePhase), GamePhase.waitForSecondPlayer);
            } else {
                throw new Error("Unsupported operation in gamePhase " + state.gamePhase);
            }
        }


    }
}