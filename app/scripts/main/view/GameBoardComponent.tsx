/// <reference path="../utils/Optional.ts"/>

namespace gameView {

    import CellState = game.CellState;
    import GameBoard = game.GameBoard;
    import PlayerShipPosition = game.PlayerShipPosition;

    export class BoardXY {
        private _x: number;
        private _y: number;

        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }


        get x(): number {
            return this._x;
        }

        get y(): number {
            return this._y;
        }
    }

    export class GameBoardProps {
        active: boolean;
        label: string;
        board: GameBoard;
        gameInterface: GameInterface;
    }

    export class GameBoardState {
        cellDown: Optional<BoardXY>;

        constructor(cellDown: Optional<BoardXY>) {
            this.cellDown = cellDown;
        }
    }


    export abstract class GameBoardComponent extends React.Component<GameBoardProps, GameBoardState> {

        private static COLUMN_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        private static ROWS_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

        constructor(props: GameBoardProps) {
            super(props);
            this.state = new GameBoardState(None);
        }

        abstract cellClicked(x: number, y: number): void;

        render() {
            const boardClasses = classNames("gameBoardComponent", {active: this.props.active, inactive: !this.props.active});
            return (
                <div className={boardClasses}>
                    <div className="boardLabel">{this.props.label}</div>
                    <div className="boardWithHeaders">
                        {this.renderColumnsHeader()}
                        {this.renderRowsHeader()}
                        <div className="board">
                            <div className="shipMock hidden"></div>
                            {this.renderRows(this.props.board.rows)}
                        </div>
                    </div>
                </div>
            );
        }

        renderColumnsHeader() {
            return (
                <div className="boardColumnsHeader">
                    {Immutable.Range(0, GameBoardComponent.COLUMN_LABELS.length).map(i =>
                    <div className="columnHeader" key={i}>{GameBoardComponent.COLUMN_LABELS[i]}</div>)}
                </div>);
        }

        renderRowsHeader() {
            return (
                <div className="boardRowsHeader">
                    {Immutable.Range(0, GameBoardComponent.ROWS_LABELS.length).map(i =>
                    <div className="rowHeader" key={i}>{GameBoardComponent.ROWS_LABELS[i]}</div>)}
                </div>);
        }

        renderRows(board: Immutable.List<Immutable.List<CellState>>) {
            return board.map((cells: Immutable.List<CellState>, y: number) => (
                <div className="boardRow" key={y}>
                    {this.renderCells(y, cells)}
                </div>
            ));
        }

        cellToClassName(cell: CellState): string {
            switch (cell) {
                case CellState.empty:
                    return "empty";
                case CellState.hit:
                    return "hit";
                case CellState.miss:
                    return "miss";
                case CellState.ship:
                    return "ship";
                default:
                    throw new Error("Unsupported cell type");
            }
        }


        renderCells(y: number, cells: Immutable.List<CellState>) {
            return cells.map((cell: CellState, x: number) => {
                const cellClasses: string = classNames("boardCell", this.cellToClassName(cell));
                return (
                    <div className={cellClasses} key={x}
                         onClick={this.cellClicked.bind(this, x, y)}>
                    </div>
                )
            });
        }
    }

}