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

    export class GameStateInner {

        private static EMPTY_BOARD = GameStateInner.createEmptyBoard();
        private static createEmptyBoard():Board {
            return Immutable.Range(0, GAME_BOARD_SIZE).map(y =>
                Immutable.Range(0, GAME_BOARD_SIZE).map(x =>
                    CellState.empty).toList()
            ).toList();

        }

        private _record: Immutable.Map<String, any>;

        static initial = new GameStateInner(Immutable.Map({
            gamePhase: GamePhase.initPlayerBoard,
            playerBoard: GameStateInner.EMPTY_BOARD,
            opponentBoard: GameStateInner.EMPTY_BOARD,
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
            return new GameStateInner(this._record.set("playerBoard", playerBoard));
        }

        setOpponentBoard(opponentBoard:Board) {
            return new GameStateInner(this._record.set("opponentBoard", opponentBoard));
        }

        setGamePhase(gamePhase:GamePhase) {
            return new GameStateInner(this._record.set("gamePhase", gamePhase));
        }


    }

    export class GameStateRecord extends Immutable.Record({
        gamePhase:undefined,
        playerBoard:undefined,
        opponentBoard:undefined}) {}

    export class GameState extends GameStateRecord {

        private static EMPTY_BOARD = GameState.createEmptyBoard();
        private static createEmptyBoard():Board {
            return Immutable.Range(0, GAME_BOARD_SIZE).map(y =>
                Immutable.Range(0, GAME_BOARD_SIZE).map(x =>
                    CellState.empty).toList()
            ).toList();

        }

        gamePhase: GamePhase;
        playerBoard: Board;
        opponentBoard: Board;

        static initial = new GameState().init(GamePhase.initPlayerBoard, GameState.EMPTY_BOARD, GameState.EMPTY_BOARD);

        init(gamePhase: GamePhase, playerBoard: Board, opponentBoard: Board): GameState {
            return <GameState>this.merge({
                gamePhase:gamePhase,
                playerBoard:playerBoard,
                opponentBoard:opponentBoard});
        }

        setPlayerBoard(playerBoard:Board) {
            return <GameState>this.set("playerBoard", playerBoard);
        }

        setOpponentBoard(opponentBoard:Board) {
            return <GameState>this.set("opponentBoard", opponentBoard);
        }

        setGamePhase(gamePhase:GamePhase) {
            return <GameState>this.set("gamePhase", gamePhase);
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