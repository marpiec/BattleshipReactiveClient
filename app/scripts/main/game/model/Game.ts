namespace game {

    import GamePage = page.GamePage;
    import GamePageState = page.GamePageState;
    const GAME_BOARD_SIZE = 10;
    export const enum CellState {empty, miss, ship, hit}
    export type Board = Immutable.List<Immutable.List<CellState>>;

    export const enum GamePhase {initPlayerBoard, waitForSecondPlayer, playerTurn, otherPlayerTurn, gameEnded}

    export class GameState {

        private static EMPTY_BOARD = GameState.createEmptyBoard();

        playerBoard: Board;
        opponentBoard: Board;
        gamePhase: GamePhase;

        static initial = new GameState(GamePhase.initPlayerBoard, GameState.EMPTY_BOARD, GameState.EMPTY_BOARD);
        constructor(gamePhase: GamePhase, playerBoard: Board, opponentBoard: Board) {
            this.gamePhase = gamePhase;
            this.playerBoard = playerBoard;
            this.opponentBoard = opponentBoard;
        }

        setPlayerBoard(playerBoard: Board) {
            return new GameState(this.gamePhase, playerBoard, this.opponentBoard);
        }

        setOpponentBoard(opponentBoard: Board) {
            return new GameState(this.gamePhase, this.playerBoard, opponentBoard);
        }

        setGamePhase(gamePhase: GamePhase) {
            return new GameState(gamePhase, this.playerBoard, this.opponentBoard);
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


        static initial = new Game(GameState.initial, GamePhase.initPlayerBoard);
        constructor(state: GameState, phase: GamePhase) {
            this.state = state;
        }


        toggleCell(x: number, y: number) {
            if(this.state.gamePhase === GamePhase.initPlayerBoard) {
                const currentCellState:CellState = this.state.playerBoard.get(y).get(x);
                const newCellState = currentCellState === CellState.empty ? CellState.ship : CellState.empty;
                const newPlayerBoard = this.state.playerBoard.setIn([y, x], newCellState);
                this.state = this.state.setPlayerBoard(newPlayerBoard);
            } else {
                throw new Error("Unsupported operation in gamePhase " + this.state.gamePhase);
            }
        }

        submitBoard() {
            if(this.state.gamePhase === GamePhase.initPlayerBoard) {
                this.state = this.state.setGamePhase(GamePhase.waitForSecondPlayer);
            } else {
                throw new Error("Unsupported operation in gamePhase " + this.state.gamePhase);
            }
        }

    }











}