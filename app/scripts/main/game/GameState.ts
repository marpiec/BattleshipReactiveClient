namespace game {

    const GAME_BOARD_SIZE = 10;

    export const enum ShootResult {hit, miss, invalid}

    export const enum CellState {empty, miss, ship, hit}

    export const enum GamePhase {initPlayerBoard, waitForSecondPlayer, playerTurn, opponentTurn, playerWon, opponentWon}


    export class GameBoard extends Immutable.Record({
        rows: undefined}) {
        rows: Immutable.List<Immutable.List<CellState>>;

        static EMPTY = GameBoard.createEmptyBoard();

        static createEmptyBoard() {
            const rows = Immutable.Range(0, GAME_BOARD_SIZE).map(y =>
                Immutable.Range(0, GAME_BOARD_SIZE).map(x =>
                    CellState.empty).toList()
            ).toList();
            return new GameBoard().init(rows);
        }

        init(rows: Immutable.List<Immutable.List<CellState>>): GameBoard {
            return <GameBoard><any>this.merge({
                rows: rows});
        }

        getShipsCount() {
            const shipsInRows = this.rows.map(row => row.count(cell => cell === CellState.ship));
            return shipsInRows.reduce((acc: number, el: number) => acc + el);
        }

    }


    export class GameState extends Immutable.Record({
        gameId:undefined,
        playerId:undefined,
        gamePhase:undefined,
        playerBoard:undefined,
        opponentBoard:undefined}) {

        gameId: string;
        playerId: string;
        gamePhase: GamePhase;
        playerBoard: GameBoard;
        opponentBoard: GameBoard;

        static initial(gameId: string, playerId: string) {
           return new GameState().init(gameId, playerId, GamePhase.initPlayerBoard, GameBoard.EMPTY, GameBoard.EMPTY);
        }

        init(gameId: string, playerId: string, gamePhase: GamePhase, playerBoard: GameBoard, opponentBoard: GameBoard): GameState {
            return <GameState><any>this.merge({
                gameId: gameId,
                playerId: playerId,
                gamePhase:gamePhase,
                playerBoard:playerBoard,
                opponentBoard:opponentBoard});
        }

        get playerBoardActive() {
            return this.gamePhase === GamePhase.initPlayerBoard;
        }

        get opponentBoardActive() {
            return this.gamePhase === GamePhase.playerTurn;
        }



        setIn(keyPath: Array<any>, value: any): GameState;
        setIn(keyPath: Immutable.Iterable<any, any>, value: any): GameState;
        setIn(keyPath: any, value: any): GameState {
            return <GameState><any>super.setIn(keyPath, value);
        }

        set(key: string, value: any): GameState {
            return <GameState><any>super.set(key, value);
        }


    }


}