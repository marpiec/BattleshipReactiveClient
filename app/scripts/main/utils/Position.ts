class XY {

    private _x: number;
    private _y: number;

    constructor(x:number, y:number) {
        this._x = x;
        this._y = y;
    }

    get x():number {
        return this._x;
    }

    get y():number {
        return this._y;
    }

    plus(other: XY) {
        return new XY(this.x + other.x, this.y + other.y);
    }

    minus(other: XY) {
        return new XY(this.x - other.x, this.y - other.y);
    }
}


class Size {
    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}