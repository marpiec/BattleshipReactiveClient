namespace LensSpec {

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


    class SomeRecord extends Immutable.Record({z: undefined, y: undefined}) {
        z: number;
        y: number;

        init(z: number, y: number): SomeRecord {
            return <SomeRecord><any>this.merge({
                z:z,
                y:y});
        }

    }


    describe("Immutable Path Suite", function () {
        //it("contains spec with an expectation", function () {
        //
        //    console.log("Lens");
        //    console.log(Lens);
        //    console.log("Lens");
        //    const someObject = new OtherClass("123");
        //
        //    const objectPath = Lens.path(Lens.of(someObject).ee[1].d);
        //    console.log("path: " + JSON.stringify(objectPath));
        //
        //});

        it("can mutate Immutable Map", function () {

            const someMap = Immutable.Map<string, string>([["hello", "world"]]);

            const newMap: Immutable.Map<string, string> = Lens.setIn(Lens.of(someMap).get("hello"), "Mars");

            expect(newMap.get("hello")).toBe("Mars");

        });

        it("can mutate Immutable Record", function () {

            const someRecord = new SomeRecord().init(123, 456);

            const newValue: SomeRecord = Lens.setIn(Lens.of(someRecord).z, 111);

            expect(newValue.z).toBe(111);
            expect(newValue.y).toBe(456);

        });

        it("can mutate Immutable List", function () {

            const someList = Immutable.List<string>(["hello", "world"]);

            console.log(Lens.of(someList));
            console.log(Lens.of(someList).get(1));

            const newList: Immutable.List<string> = Lens.setIn(Lens.of(someList).get(1), "Mars");

            expect(newList.get(0)).toBe("hello");
            expect(newList.get(1)).toBe("Mars");
            expect(newList.size).toBe(2);

        });

    });
}