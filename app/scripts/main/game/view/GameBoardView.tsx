namespace game {

    import Board = game.Board;
    import Game = game.Game;

    export class GameBoardViewProps {
        board:Board;
        game: Game;
    }

    export class GameBoardViewState {
    }


    export class GameBoardView extends React.Component<GameBoardViewProps, GameBoardViewState> {
        constructor(props:GameBoardViewProps) {
            super(props);
            this.state = new GameBoardViewState();
        }

        cellClicked(x:number, y:number) {

            this.props.game.toggleCell(x, y);
            //this.setState(new TasksViewState(this.state.count + 1));
        }

        render() {
            return (
                <div className="gameBoard">
                    {this.renderRows(this.props.board)}
                </div>
            );
        }

        renderRows(board:Board){
          return board.map((cells:Immutable.List<CellState>, y:number) => (
              <div className="boardRow" key={y}>
                  {this.renderCells(y, cells)}
              </div>
          ));
        }


        renderCells(y:number, cells:Immutable.List<CellState>) {
            return cells.map((cell:CellState, x:number) => (
                <div className="boardCell" key={x}
                     onClick={this.cellClicked.bind(this, x, y)}>
                    {cell}
                </div>
            ));
        }
    }

}