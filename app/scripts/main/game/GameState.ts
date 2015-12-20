/// <reference path="GameRules.ts"/>

namespace game {



    export const enum ShotResult {hit, miss, invalid}

    export const enum CellState {empty, miss, ship, hit}

    export const enum GamePhase {initPlayerBoard, waitForSecondPlayer, playerTurn, opponentTurn, playerWon, opponentWon}

    export const enum ShipDirection {south, east}

    export class PlayerShip extends Immutable.Record({
        length: undefined}) {

        length: number;

        init(length: number): PlayerShip {
            return <PlayerShip><any>this.merge({
                length: length});
        }

    }

    export class PlayerShipPosition extends Immutable.Record({
        x: undefined,
        y: undefined,
        ship: PlayerShip,
        direction: undefined}) {

        x: number;
        y: number;
        ship: PlayerShip;
        direction: ShipDirection;

        init(x: number, y: number, ship: PlayerShip, direction: ShipDirection): PlayerShipPosition {
            return <PlayerShipPosition><any>this.merge({
                x: x, y: y, ship: ship, direction: direction});
        }

        isSouth():boolean {
            return this.direction === ShipDirection.south;
        }

        isEast():boolean {
            return this.direction === ShipDirection.east;8
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

        placeShips(shipsPositions: Immutable.List<PlayerShipPosition>): GameBoard {

            let currentBoard: GameBoard = this;

            shipsPositions.forEach(position => {
                Immutable.Range(0, position.ship.length).forEach(cell => {
                    let x = position.x;
                    let y = position.y;
                    if(position.isSouth()) {
                        y += cell;
                    }
                    if(position.isEast()) {
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
        shipsPalette:undefined,
        playerShips: undefined,
        playerBoard:undefined,
        opponentBoard:undefined}) {

        gameId: string;
        playerId: string;
        gamePhase: GamePhase;

        shipsPalette: Immutable.List<PlayerShip>;
        playerShips: Immutable.List<PlayerShipPosition>;

        playerBoard: GameBoard;
        opponentBoard: GameBoard;

        static initial(gameId: string, playerId: string) {

            const initialShips = GameRules.SHIPS_SIZES.map((sc: ShipsCount) => Immutable.Range(0, sc.count).map(s => new PlayerShip().init(sc.length))).flatten(1).toList();

            console.log("initialShips", initialShips.toJS());

           return new GameState().init(gameId, playerId, GamePhase.initPlayerBoard, initialShips, Immutable.List<PlayerShipPosition>(), GameBoard.EMPTY, GameBoard.EMPTY);
        }

        init(gameId: string, playerId: string, gamePhase: GamePhase,
             shipsPalette: Immutable.List<PlayerShip>, playerShips: Immutable.List<PlayerShipPosition>,
             playerBoard: GameBoard, opponentBoard: GameBoard): GameState {
            return <GameState><any>this.merge({
                gameId: gameId,
                playerId: playerId,
                gamePhase:gamePhase,
                shipsPalette:shipsPalette,
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