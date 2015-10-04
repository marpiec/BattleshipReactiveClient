import calculator = require("../../main/calculator/module");
import Adder = calculator.Adder;

describe("A suite", function() {
    it("contains spec with an expectation", function() {
        const sum = new Adder().calculate(2, 7);

        expect(sum).toBe(8);
    });
});