namespace game {

    export class ShipsCount {
        private _length:number;
        private _count:number;

        constructor(length:number, count:number) {
            this._length = length;
            this._count = count;
        }

        get length():number {
            return this._length;
        }

        get count():number {
            return this._count;
        }
    }

    export class GameRules {
        static GAME_BOARD_SIZE = 10;

        static SHIPS_SIZES: Immutable.List<ShipsCount> = Immutable.List([new ShipsCount(1, 4),
                                                new ShipsCount(2, 3),
                                                new ShipsCount(3, 2),
                                                new ShipsCount(4, 1)]);

    }


}