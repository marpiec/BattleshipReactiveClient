module Lens {

    export class PathAccumulator {
        ___rootElement: any;
        ___path: string[];
        [name: string]: any;
        constructor(rootElement: any, path: string[]) {
            this.___rootElement = rootElement;
            this.___path = path;
        }
    }

    export function of<T>(something: T, path: string[] = [], root: any = null):T {

        //console.log("of1 " + path+" "+ JSON.stringify(something)+" "+JSON.stringify(root));

        var pathAccumulator = new PathAccumulator(root?root:something, path);


        if(typeof something === "number" ||
            typeof something === "boolean" ||
            typeof something === "string") {
            return <any>pathAccumulator;
        } else {
            const anySomething: any = something;

            if(something instanceof Immutable.Map || something instanceof Immutable.Record) {
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
            } else {
                for (let propertyName in anySomething) {
                    if (typeof anySomething[propertyName] == "function") {
                        pathAccumulator[propertyName] = Lens.of(anySomething[propertyName], path.concat([propertyName]));
                    } else {
                        pathAccumulator[propertyName] = Lens.of(anySomething[propertyName], path.concat([propertyName]));
                    }
                }
            }


            //console.log("of returns: " + JSON.stringify(pathAccumulator));
            return <any>pathAccumulator;
        }

    }

    export function path(somethingPath: any): any[] {
        return (<PathAccumulator>somethingPath).___path;
    }

    export function setIn<T>(container: T, value: T): any {

        if(container instanceof PathAccumulator) {

            const pathAccumulator = <PathAccumulator><any>container;


            //console.log("Is map " + Immutable.Map.isMap(pathAccumulator.___rootElement));
            //if(pathAccumulator.___rootElement instanceof Immutable.Map) {
            //console.log("----- setting in " + pathAccumulator.___rootElement + " " + pathAccumulator.___path+" "+value);
            //console.log("----- got "  + (<Immutable.Map<any, any>>pathAccumulator.___rootElement).setIn(pathAccumulator.___path, value));
                return (<Immutable.Map<any, any>>pathAccumulator.___rootElement).setIn(pathAccumulator.___path, value);
            //} else if(pathAccumulator.___rootElement instanceof Immutable.List) {
            //    throw new Error("List not yet supported");
            //} else {
            //    throw new Error("Only Immutable.Map is supported, not " + (typeof pathAccumulator.___rootElement)+" "+ JSON.stringify(pathAccumulator.___rootElement));
            //}

        } else {
            throw new Error("Container must be PathAccumulator, not " + (typeof container));
        }

    }


}



