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
            const rows = this.props.board.map((cells:Immutable.List<CellState>, y: number) => {
                const cellsElements = cells.map((cell: CellState, x: number) => {
                    return (<div className="boardCell" key={x}></div>)
                });
                return (<div className="boardRow" key={y}>{cellsElements}</div>)
            });

            return (
                <div className="gameBoard">{rows}</div>
            )
        }
    }


}