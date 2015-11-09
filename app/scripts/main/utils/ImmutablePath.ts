class PathAccumulator {
    path: string[];
    original: any;
    constructor(path: string[], original: any) {
        this.path = path;
        this.original = original;
    }

    add(element: string, orginal: any) {
        return new PathAccumulator(this.path.concat([element]), orginal);
    }
}

class ImmutablePath {


    private static innerMethods = ["event_bus_priv_getMethods", "on",
        "unsubscribe", "event_bus_priv_Handler",
        "subscribe", "constructor", "init"];

    private callbacks: {[methodName: string]: Callback[]} = {};
    private handlers: Handler[] = [];



    static getPath<T>(something: T):T {

        const anySomething: any = something;

        const mock: any = {};

        for (var propertyName in anySomething) {
            if (typeof anySomething[propertyName] == "function") {
                mock[propertyName] = new PathAccumulator([propertyName], anySomething[propertyName]);
            } else {
                mock[propertyName] = new PathAccumulator([propertyName], anySomething[propertyName]);
            }
        }

        return mock;
    }

    static toPath(somethingPath: any): string[] {
        return [];
    }

    init<T extends EventBus>(): T {



        return null;

        //for (var i = 0; i < methods.length; i++) {
        //    const methodName = methods[i];
        //    if (EventBus.innerMethods.indexOf(methodName) < 0) {
        //        var handler: any;
        //        eval(`handler = function() { this.event_bus_priv_Handler("${methodName}", arguments); }`);
        //        (<any>this)[methodName] = handler;
        //        this.callbacks[methodName] = [];
        //        this.handlers.push(new Handler(methodName, handler));
        //
        //    }
        //}
        //return <any>this;
    }

    // It uses queue to preserve order of function calls
    private static event_bus_priv_getMethods(obj: any) {
        console.log("============ " + JSON.stringify(obj));
        var res: any[] = [];
        for (var m in obj) {
            if (typeof obj[m] == "function") {
                res.push(m)
            } else {

            }
        }
        return res;
    }

}




namespace test {

    class OtherClass {
        b: SomeClass;
        c: number;
        constructor(text: string) {
            this.b = new SomeClass(text);
            this.c = 1;
        }
    }

    class SomeClass {
        a: string;

        constructor(a: string) {
            this.a = a;
        }
    }

    describe("Immutable Path Suite", function () {
        it("contains spec with an expectation", function () {

            const other = new OtherClass("123");

            try {
                console.log("1 " + JSON.stringify(ImmutablePath.getPath(other)));
                console.log("2 " + JSON.stringify(ImmutablePath.getPath(other).b));
                console.log("3 " + JSON.stringify(ImmutablePath.getPath(other).b.a));
                const path = ImmutablePath.toPath(ImmutablePath.getPath(other).b.a)
            } catch (e) {
                console.log(e);
            }
            console.log("Finish");

        });
    });
}