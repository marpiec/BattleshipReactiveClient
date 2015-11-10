class PathAccumulator {
    ___path: string[];
    [name: string]: any;
    constructor(path: string[]) {
        this.___path = path;
    }
}

class ImmutablePath {

    static of<T>(something: T, path: string[] = []):T {

        var pathAccumulator = new PathAccumulator(path);

        if(typeof something === "number" ||
            typeof something === "boolean" ||
            typeof something === "string") {
            return <any>pathAccumulator;
        } else {
            const anySomething: any = something;

            for (var propertyName in anySomething) {
                if (typeof anySomething[propertyName] == "function") {
                    pathAccumulator[propertyName] = ImmutablePath.of(anySomething[propertyName], path.concat([propertyName]));
                } else {
                    pathAccumulator[propertyName] = ImmutablePath.of(anySomething[propertyName], path.concat([propertyName]));
                }
            }

            return <any>pathAccumulator;
        }

    }

    static path(somethingPath: any): string[] {
        return (<PathAccumulator>somethingPath).___path;
    }


}




namespace test {

    class OtherClass {
        b: SomeClass;
        c: number;
        ee: SomeClass[];
        constructor(text: string) {
            this.b = new SomeClass(text);
            this.c = 1;
            this.ee = [new SomeClass("ee1"), new SomeClass("ee2")];
        }
    }

    class SomeClass {
        a: string;
        d: string;

        constructor(a: string) {
            this.a = a;
            this.d = undefined;
        }
    }

    describe("Immutable Path Suite", function () {
        it("contains spec with an expectation", function () {
            const I = ImmutablePath;

            const someObject = new OtherClass("123");

            try {

                const objectPath = I.path(I.of(someObject).ee[1].a);
                console.log("path: " + JSON.stringify(objectPath));
            } catch (e) {
                console.log(e);
            }
            console.log("Finish");

        });
    });
}