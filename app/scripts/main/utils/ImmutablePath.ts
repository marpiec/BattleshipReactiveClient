class PathAccumulator {
    path: string[];
    constructor(path: string[]) {
        this.path = path;
    }

    add(element: string) {
        return new PathAccumulator(this.path.concat([element]));
    }
}

class ImmutablePath {


    private static innerMethods = ["event_bus_priv_getMethods", "on",
        "unsubscribe", "event_bus_priv_Handler",
        "subscribe", "constructor", "init"];

    private callbacks: {[methodName: string]: Callback[]} = {};
    private handlers: Handler[] = [];


    static getPath<T>(something: T):T {


            return null;
    }

    static toPath(somethingPath: any): string[] {
        return [];
    }

    init<T extends EventBus>(): T {
        var methods: string[] = this.event_bus_priv_getMethods(this);



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
    private event_bus_priv_getMethods(obj: any) {
        var res: any[] = [];
        for (var m in obj) {
            if (typeof obj[m] == "function") {
                res.push(m)
            }
        }
        return res;
    }

}




namespace test {

    class OtherClass {
        b: SomeClass;
    }

    class SomeClass {
        a: string;
    }

    describe("Immutable Path Suite", function () {
        it("contains spec with an expectation", function () {

            const other = new OtherClass();

            const path = ImmutablePath.toPath(ImmutablePath.getPath(other).b.a)


        });
    });
}