/// <reference path="GameRules.ts"/>

namespace game {



    export const enum ShotResult {hit, miss, invalid}

    export const enum CellState {empty, miss, ship, hit}

    export const enum GamePhase {initPlayerBoard, waitForSecondPlayer, playerTurn, opponentTurn, playerWon, opponentWon}

    export const enum ShipDirection {vertical, horizontal}


    export class PlayerShip extends Immutable.Record({
        id: undefined,
        xy: undefined,
        shipLength: undefined,
        direction: undefined}) {

        id: number;
        xy: Optional<XY>;
        shipLength: number;
        direction: ShipDirection;

        init(id: number, xy: Optional<XY>, shipLength: number, direction: ShipDirection): PlayerShip {
            return <PlayerShip><any>this.merge({
                id: id, xy: xy, shipLength: shipLength, direction: direction});
        }

        isVertical():boolean {
            return this.direction === ShipDirection.vertical;
        }

        isHorizontal():boolean {
            return this.direction === ShipDirection.horizontal;
        }

        setPosition(position: XY, direction: ShipDirection): PlayerShip {
            return new PlayerShip().init(this.id, Some(position), this.shipLength, direction);
        }

        removePosition(): PlayerShip {
            return new PlayerShip().init(this.id, None, this.shipLength, ShipDirection.vertical);
        }
    }



    export class GameBoard extends Immutable.Record({
        rows: undefined}) {
        rows: Immutable.List<Immutable.List<CellState>>;

        static EMPTY = GameBoard.createEmptyBoard();

        static createEmptyBoard() {
            const rows = Immutable.Range(0, GameRules.GAME_BOARD_SIZE).map(y =>
                Immutable.Range(0, GameRules.GAME_BOARD_SIZE).map(x =>
                    CellState.empty).toList()
            ).toList();
            return new GameBoard().init(rows);
        }

        init(rows: Immutable.List<Immutable.List<CellState>>): GameBoard {
            return <GameBoard><any>this.merge({
                rows: rows});
        }

        placeShips(shipsPositions: Immutable.List<PlayerShip>): GameBoard {

            let currentBoard: GameBoard = this;

            shipsPositions.forEach(position => {
                Immutable.Range(0, position.shipLength).forEach(cell => {
                    let x = position.xy.value.x;
                    let y = position.xy.value.y;
                    if(position.isVertical()) {
                        y += cell;
                    }
                    if(position.isHorizontal()) {
                        x += cell;
                    }

                    currentBoard = Lens.setIn(Lens.of(this).rows.get(y).get(x), CellState.ship);
                });
            });

            return currentBoard;

        }

    }


    export class GameState extends Immutable.Record({
        gameId:undefined,
        playerId:undefined,
        gamePhase:undefined,
        playerShips: undefined,
        playerBoard:undefined,
        opponentBoard:undefined}) {

        gameId: string;
        playerId: string;
        gamePhase: GamePhase;

        playerShips: Immutable.List<PlayerShip>;

        playerBoard: GameBoard;
        opponentBoard: GameBoard;

        static initial(gameId: string, playerId: string) {

            let shipId = 0;
            const initialShips = GameRules.SHIPS_SIZES.map((sc: ShipsCount) => Immutable.Range(0, sc.count).map(s => {
                return new PlayerShip().init(shipId++, None, sc.length, ShipDirection.vertical)
            })).flatten(1).toList();

            console.log("initialShips", initialShips.toJS());

           return new GameState().init(gameId, playerId, GamePhase.initPlayerBoard, initialShips, GameBoard.EMPTY, GameBoard.EMPTY);
        }

        init(gameId: string, playerId: string, gamePhase: GamePhase,
             playerShips: Immutable.List<PlayerShip>,
             playerBoard: GameBoard, opponentBoard: GameBoard): GameState {
            return <GameState><any>this.merge({
                gameId: gameId,
                playerId: playerId,
                gamePhase:gamePhase,
                playerShips:playerShips,
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