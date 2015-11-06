namespace game {

    import Board = game.Board;
    export class GameBoardViewProps {
        board: Board;
    }

    export class GameBoardViewState {
    }


    export class GameBoardView extends React.Component<GameBoardViewProps, GameBoardViewState> {
        constructor(props:GameBoardViewProps) {
            super(props);
            this.state = new GameBoardViewState();
        }

        render() {
            const rows = this.props.board.map((cells:Immutable.List<Cell>) => {
                const cellsElements = cells.map((cell: Cell) => {
                    return (<div className="boardCell" key={cell.x}></div>)
                });
                return (<div className="boardRow" key={cells.first().y}>{cellsElements}</div>)
            });

            return (
                <div className="gameBoard">{rows}</div>
            )
        }
    }


}