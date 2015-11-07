namespace gameView {

    import Board = game.Board;
    import CellState = game.CellState;

    export class GameBoardViewProps {
        board:Board;
        gameInterface:GameInterface;
    }

    export class GameBoardViewState {
    }


    export class GameBoardView extends React.Component<GameBoardViewProps, GameBoardViewState> {
        constructor(props:GameBoardViewProps) {
            super(props);
            this.state = new GameBoardViewState();
        }

        cellClicked(x:number, y:number) {

            this.props.gameInterface.toggleCell(x, y);
            //this.setState(new TasksViewState(this.state.count + 1));
        }

        render() {
            return (
                <div className="gameBoard">
                    {this.renderRows(this.props.board)}
                </div>
            );
        }

        renderRows(board:Board) {
            return board.map((cells:Immutable.List<CellState>, y:number) => (
                <div className="boardRow" key={y}>
                    {this.renderCells(y, cells)}
                </div>
            ));
        }

        cellToClassName(cell:CellState): string {
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


        renderCells(y:number, cells:Immutable.List<CellState>) {
            return cells.map((cell:CellState, x:number) => {
                const cellClasses:string = classNames("boardCell", this.cellToClassName(cell));
                return (
                    <div className={cellClasses} key={x}
                         onClick={this.cellClicked.bind(this, x, y)}>
                    </div>
                )
            });
        }
    }

}