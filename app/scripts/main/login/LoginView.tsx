/// <reference path="../calculator/Adder.ts"/>
/// <reference path="../calculator/Multiplier.ts"/>

namespace login {

    import Adder = calculator.Adder;
    import Multiplier = calculator.Multiplier;

    export class LoginView {


        render() {
            const a = new Adder().calculate(5, 10);
            const m = new Multiplier().calculate(5, 10);


            ReactDOM.render(
                <h1>Hello, world! -{a}-|-{m}-</h1>,
                document.getElementById('main')
            );
        }


    }



}