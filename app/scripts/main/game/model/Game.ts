namespace game {

    import GamePageState = page.GamePageState;
    import GamePage = page.GamePage;
    const GAME_BOARD_SIZE = 10;
    export const enum CellState {empty, miss, ship, hit}
    export type Board = Immutable.List<Immutable.List<CellState>>;

    export const enum GamePhase {initBothPlayers, initPlayerA, initPlayerB, moveA, moveB, finished}

    export class GameState {

        private static EMPTY_BOARD = GameState.createEmptyBoard();

        boardA: Board;
        boardB: Board;

        static initial = new GameState(GameState.EMPTY_BOARD, GameState.EMPTY_BOARD);
        constructor(boardA: Board, boardB: Board) {
            this.boardA = boardA;
            this.boardB = boardB;
        }

        setBoardA(boardA: Board) {
            return new GameState(boardA, this.boardB);
        }

        setBoardB(boardB: Board) {
            return new GameState(this.boardA, boardB);
        }


        private static createEmptyBoard(): Board {
            return Immutable.Range(0, GAME_BOARD_SIZE).map(y =>
                Immutable.Range(0, GAME_BOARD_SIZE).map(x =>
                    CellState.empty).toList()
            ).toList();

        }
    }

    export class Game {

        state: GameState;
        phase: GamePhase;

        static initial = new Game(GameState.initial, GamePhase.initBothPlayers);
        constructor(state: GameState, phase: GamePhase) {
            this.state = state;
            this.phase = phase;
        }

        setBoardA(boardA: Board): Game {
            if (this.phase === GamePhase.initBothPlayers) {
                return new Game(this.state.setBoardA(boardA), GamePhase.initPlayerB);
            } else if(this.phase === GamePhase.initPlayerA) {
                return new Game(this.state, GamePhase.moveA);
            } else {
                throw new Error("Unsupported operation in phase " + this.phase);
            }
        }

        setBoardB(boardB: Board): Game {
            if (this.phase === GamePhase.initBothPlayers) {
                return new Game(this.state.setBoardB(boardB), GamePhase.initPlayerA);
            } else if(this.phase === GamePhase.initPlayerB) {
                return new Game(this.state, GamePhase.moveA);
            } else {
                throw new Error("Unsupported operation in phase " + this.phase);
            }
        }
    }











}