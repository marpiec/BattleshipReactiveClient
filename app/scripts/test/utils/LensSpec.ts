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

            const someMap = Immutable.Map<string, string>().set("hello", "world");



            const someRecord = new SomeRecord().init(123, 456);

            console.log("Phase 0 " + JSON.stringify(someMap));
            console.log("Phase 0 " + (<any>someMap).hello+" "+someRecord.z);

            console.log("Phase I");
            console.log("someRecord " + JSON.stringify(someRecord)+" "+Immutable.Map.isMap(someRecord));
            console.log(Lens.of(someRecord).z);

            console.log("Phase II");
            const newValue: SomeRecord = Lens.setIn(Lens.of(someRecord).z, 111);

            console.log("---- " + newValue+" "+ newValue.get("z")+ " "+newValue.z);
            expect(newValue.get("z")).toBe(111);
            expect(newValue.get("y")).toBe(456);

        });

    });
}