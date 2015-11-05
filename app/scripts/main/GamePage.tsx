namespace page {

    export class CellState {
        name: string;

        constructor(name:string) {
            this.name = name;
        }

        static empty = new CellState('empty');
        static miss = new CellState('miss');
        static ship = new CellState('ship');
        static hit = new CellState('hit');
    }

    export class GameBoard {
        rows: Immutable.List<Immutable.List<CellState>>;

        constructor() {
            const emptyRow =  Immutable.Repeat<CellState>(CellState.empty, 10).toList();
            this.rows = Immutable.Repeat<Immutable.List<CellState>>(emptyRow, 10).toList();
        }
    }


    export class GamePageParams {
        gameId: string;
    }

    export class GamePageProps {
        params: GamePageParams;
    }

    export class GamePageState {
        gameBoard = new GameBoard();
    }


    export class GamePage extends React.Component<GamePageProps, GamePageState> {
        constructor(props:GamePageProps) {
            super(props);
            this.state = new GamePageState();
        }

        render() {
            const rows = this.state.gameBoard.rows.map(cells => {
               const cellsElements = cells.map(cell => {
                  return (<div className="boardCell"></div>)
               });
                return (<div className="boardRow">{cellsElements}</div>)
            });
            return (
                <div>
                    <p>Game page {this.props.params.gameId}</p>
                    <div className="gameBoard">{rows}</div>
                </div>
            )
        }
    }


}