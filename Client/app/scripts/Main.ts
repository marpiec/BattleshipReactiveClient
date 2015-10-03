
import calculator = require("calculator/module");
import Adder = calculator.Adder;

namespace main {
    export class Main {
        hello() {
            alert("Hello!");

            alert(new Adder().calculate(1, 2));
        }
    }
}
