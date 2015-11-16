namespace game {

    const GAME_BOARD_SIZE = 10;
    export const enum CellState {empty, miss, ship, hit}

    export const enum GamePhase {initPlayerBoard, waitForSecondPlayer, playerTurn, otherPlayerTurn, gameEnded}

    const EMPTY_BOARD = createEmptyBoard();
    function createEmptyBoard():Immutable.List<Immutable.List<CellState>> {
        return Immutable.Range(0, GAME_BOARD_SIZE).map(y =>
            Immutable.Range(0, GAME_BOARD_SIZE).map(x =>
                CellState.empty).toList()
        ).toList();
    }



    export class GameState extends Immutable.Record({
        gamePhase:undefined,
        playerBoard:undefined,
        opponentBoard:undefined}) {

        gamePhase: GamePhase;
        playerBoard: Immutable.List<Immutable.List<CellState>>;
        opponentBoard: Immutable.List<Immutable.List<CellState>>;

        static initial = new GameState().init(GamePhase.initPlayerBoard, EMPTY_BOARD, EMPTY_BOARD);

        init(gamePhase: GamePhase, playerBoard: Immutable.List<Immutable.List<CellState>>, opponentBoard: Immutable.List<Immutable.List<CellState>>): GameState {
            return <GameState><any>this.merge({
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