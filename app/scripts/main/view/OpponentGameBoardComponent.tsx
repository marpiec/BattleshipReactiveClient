/// <reference path="GameBoardComponent.tsx"/>

namespace gameView {

    export class OpponentGameBoardComponent extends GameBoardComponent {

        constructor(props: GameBoardProps) {
            super(props);
        }

        cellClicked(x: number, y: number) {
            if (this.props.active) {
                this.props.gameInterface.shoot(x, y);
            }
        }
    }
}