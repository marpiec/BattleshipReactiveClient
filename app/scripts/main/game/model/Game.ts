namespace game {

    const GAME_BOARD_SIZE = 10;
    export const enum CellState {empty, miss, ship, hit}
    export type Board = Immutable.List<Immutable.List<CellState>>;

    export const enum GamePhase {initPlayerBoard, waitForSecondPlayer, playerTurn, otherPlayerTurn, gameEnded}

    export class GameStateSimple {

        private static EMPTY_BOARD = GameStateSimple.createEmptyBoard();

        playerBoard:Board;
        opponentBoard:Board;
        gamePhase:GamePhase;

        static initial = new GameStateSimple(GamePhase.initPlayerBoard, GameStateSimple.EMPTY_BOARD, GameStateSimple.EMPTY_BOARD);

        constructor(gamePhase:GamePhase, playerBoard:Board, opponentBoard:Board) {
            this.gamePhase = gamePhase;
            this.playerBoard = playerBoard;
            this.opponentBoard = opponentBoard;
        }

        setPlayerBoard(playerBoard:Board) {
            return new GameStateSimple(this.gamePhase, playerBoard, this.opponentBoard);
        }

        setOpponentBoard(opponentBoard:Board) {
            return new GameStateSimple(this.gamePhase, this.playerBoard, opponentBoard);
        }

        setGamePhase(gamePhase:GamePhase) {
            return new GameStateSimple(gamePhase, this.playerBoard, this.opponentBoard);
        }

        private static createEmptyBoard():Board {
            return Immutable.Range(0, GAME_BOARD_SIZE).map(y =>
                Immutable.Range(0, GAME_BOARD_SIZE).map(x =>
                    CellState.empty).toList()
            ).toList();

        }
    }

    export class GameState {

        private static EMPTY_BOARD = GameState.createEmptyBoard();
        private static createEmptyBoard():Board {
            return Immutable.Range(0, GAME_BOARD_SIZE).map(y =>
                Immutable.Range(0, GAME_BOARD_SIZE).map(x =>
                    CellState.empty).toList()
            ).toList();

        }

        private _record: Immutable.Map<String, any>;

        static initial = new GameState(Immutable.Map({
            gamePhase: GamePhase.initPlayerBoard,
            playerBoard: GameState.EMPTY_BOARD,
            opponentBoard: GameState.EMPTY_BOARD,
        }));


        constructor(record: Immutable.Map<String, any>) {
            this._record = record;
        }

        get playerBoard():Board {
            return this._record.get("playerBoard");
        }

        get opponentBoard():Board {
            return this._record.get("opponentBoard");
        }

        get gamePhase():GamePhase {
            return this._record.get("gamePhase");
        }

        setPlayerBoard(playerBoard:Board) {
            return new GameState(this._record.set("playerBoard", playerBoard));
        }

        setOpponentBoard(opponentBoard:Board) {
            return new GameState(this._record.set("opponentBoard", opponentBoard));
        }

        setGamePhase(gamePhase:GamePhase) {
            return new GameState(this._record.set("gamePhase", gamePhase));
        }


    }


    export class GameEngine {

        static toggleCell(state:GameState, x:number, y:number):GameState {
            if (state.gamePhase === GamePhase.initPlayerBoard) {
                const currentCellState:CellState = state.playerBoard.get(y).get(x);
                const newCellState = currentCellState === CellState.empty ? CellState.ship : CellState.empty;
                const newPlayerBoard = state.playerBoard.setIn([y, x], newCellState);
                return state.setPlayerBoard(newPlayerBoard);
            } else {
                throw new Error("Unsupported operation in gamePhase " + state.gamePhase);
            }
        }

        static submitBoard(state:GameState):GameState {
            if (state.gamePhase === GamePhase.initPlayerBoard) {
                return state.setGamePhase(GamePhase.waitForSecondPlayer);
            } else {
                throw new Error("Unsupported operation in gamePhase " + state.gamePhase);
            }
        }


    }


}