namespace Lens {

    export class PathAccumulator {
        ___rootElement: any;
        ___path: any[];
        [name: string]: any;
        constructor(rootElement: any, path: string[]) {
            this.___rootElement = rootElement;
            this.___path = path;
        }
    }

    export class MapPathAccumulator extends PathAccumulator {
        ___currentElement: Immutable.Map<any, any>;
        [name: string]: any;
        constructor(rootElement: any, currentElement: Immutable.Map<any, any>, path: string[]) {
            super(rootElement, path);
            this.___currentElement = currentElement;
        }
        get(index: number): any {
            return Lens.of(this.___currentElement.get(index), this.___path.concat([index]), this.___rootElement);
        }
    }


    export class ListPathAccumulator extends PathAccumulator {
        ___currentElement: Immutable.List<any>;
        constructor(rootElement: any, currentElement: Immutable.List<any>, path: string[]) {
            super(rootElement, path);
            this.___currentElement = currentElement;
        }

        get(index: number): any {
            return Lens.of(this.___currentElement.get(index), this.___path.concat([index]), this.___rootElement);
        }
    }

    export function of<T>(something: T, path: string[] = [], root: any = null):T {

        //console.log("of1 " + path+" "+ JSON.stringify(something)+" "+JSON.stringify(root));




        if(typeof something === "number" ||
            typeof something === "boolean" ||
            typeof something === "string") {
            return <any> new PathAccumulator(root?root:something, path);
        } else if(something instanceof Immutable.Map || something instanceof Immutable.Record) {
            const pathAccumulator = new MapPathAccumulator(root?root:something, <any>something, path);
            const anySomething: any = something;
            //console.log("of - ImmutableMap");
            const somethingMap = (<Immutable.Map<any, any>>anySomething);
            const keys = somethingMap.keySeq().toArray();
            keys.forEach(key => {
                if (typeof somethingMap.get(key) == "function") {
                    pathAccumulator[key] = Lens.of(somethingMap.get(key), path.concat([key]), root?root:something);
                } else {
                    pathAccumulator[key] = Lens.of(somethingMap.get(key), path.concat([key]), root?root:something);
                }
            });
            return <any>pathAccumulator;
        } else if(something instanceof Immutable.List) {
            const anySomething: any = something;
            return <any>new ListPathAccumulator(root?root:something, anySomething, path);
        } else {
            const pathAccumulator = new PathAccumulator(root?root:something, path);
            const anySomething: any = something;
            for (let propertyName in anySomething) {
                if (typeof anySomething[propertyName] == "function") {
                    pathAccumulator[propertyName] = Lens.of(anySomething[propertyName], path.concat([propertyName]));
                } else {
                    pathAccumulator[propertyName] = Lens.of(anySomething[propertyName], path.concat([propertyName]));
                }
            }
            return <any>pathAccumulator;
        }

    }

    export function path(somethingPath: any): any[] {
        return (<PathAccumulator>somethingPath).___path;
    }

    export function setIn<T>(container: T, value: T): any {

        if(container instanceof PathAccumulator) {
            const pathAccumulator = <PathAccumulator><any>container;
            return pathAccumulator.___rootElement.setIn(pathAccumulator.___path, value);
        } else {
            throw new Error("Container must be PathAccumulator, not " + (typeof container));
        }

    }


}



