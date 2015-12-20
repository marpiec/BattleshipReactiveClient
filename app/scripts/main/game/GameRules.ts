namespace game {

    export class ShipsCount {
        private _size:number;
        private _count:number;

        constructor(size:number, count:number) {
            this._size = size;
            this._count = count;
        }

        get size():number {
            return this._size;
        }

        get count():number {
            return this._count;
        }
    }

    export class GameRules {
        static GAME_BOARD_SIZE = 10;

        static SHIPS_SIZES = [new ShipsCount(1, 4),
                              new ShipsCount(2, 3),
                              new ShipsCount(3, 2),
                              new ShipsCount(4, 1)];

    }


}