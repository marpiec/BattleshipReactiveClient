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
        return new XY(this._x + other._x, this._y + other._y);
    }

    plusXY(x: number, y: number) {
        return new XY(this._x + x, this._y + y);
    }

    minus(other: XY) {
        return new XY(this._x - other._x, this._y - other._y);
    }

    minusXY(x: number, y: number) {
        return new XY(this._x - x, this._y - y);
    }

    plusSize(size: Size) {
        return new XY(this._x + size.width, this._y + size.height);
    }

    scaleFloor(scale: number) {
        return new XY(Math.floor(this._x * scale), Math.floor(this._y * scale));
    }

    transpose() {
        return new XY(this._y, this._x);
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

    scale(scale: number): Size {
        return new Size(this._width * scale, this._height * scale);
    }

    scaleFloor(scale: number) {
        return new Size(Math.floor(this._width * scale), Math.floor(this._height * scale));
    }
}

class Rect {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }


    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get centerPosition(): XY {
        return new XY(this._x + this._width / 2, this._y + this.height / 2);
    }

    get size(): Size {
        return new Size(this._width, this._height);
    }

    get position(): XY {
        return new XY(this._x, this._y);
    }

    contains(point: XY): boolean {
        return point.x > this._x && point.x < this._x + this._width
            && point.y > this._y && point.y < this._y + this._height;
    }
}