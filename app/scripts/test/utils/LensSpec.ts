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

    describe("Immutable Path Suite", function () {
        it("contains spec with an expectation", function () {

            console.log("Lens");
            console.log(Lens);
            console.log("Lens");
            const someObject = new OtherClass("123");

            const objectPath = Lens.path(Lens.of(someObject).ee[1].d);
            console.log("path: " + JSON.stringify(objectPath));

        });

        it("can mutate Immutable Map", function () {

            const someObject = new OtherClass("123");

            const newValue:OtherClass = Lens.setIn(Lens.of(someObject).c, 123);

            expect(newValue.c).toBe(123);

        });

    });
}