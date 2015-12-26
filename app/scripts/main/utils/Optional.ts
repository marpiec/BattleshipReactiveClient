/**
 * Value holder for a value that can be present or not. Based on Scala's Option or Java 8 Optional.
 */
class Optional<T> {

    private _value:T;

    constructor(value:T) {
        if(value === null) {
            this._value = undefined;
        } else {
            this._value = value;
        }

    }

    get value(): T {
        return this._value;
    }

    get isPresent(): boolean {
        return this._value !== undefined;
    }

    get isEmpty(): boolean {
        return this._value === undefined;
    }

    map<R>(converter: (value:T) => R):Optional<R> {
        if(this.isEmpty) {
            return Optional.none;
        } else {
            return new Optional<R>(converter(this.value));
        }
    }

    forEach(apply: (value: T) => void): void {
        if (this.isPresent) {
            apply(this._value);
        }
    }

    whenPresent(callback: (value:T) => void):Optional<T> {
        if (this.isPresent) {
            callback(this._value);
        }
        return this
    }

    whenNotPresent(callback: () => void):Optional<T> {
        if (!this.isPresent) {
            callback();
        }
        return this;
    }


    valueOrElse(otherValue: T): T {
        if(this.isPresent) {
            return this._value;
        } else {
            return otherValue;
        }
    }

    static some<E>(value:E) {
        return new Optional<E>(value);
    }

    static none = new Optional<any>(undefined);

}

const None = Optional.none;
const Some = Optional.some;
