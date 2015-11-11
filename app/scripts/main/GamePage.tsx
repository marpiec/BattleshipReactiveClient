/// <reference path="game/model/GameState.ts"/>
/// <reference path="game/model/GameEngine.ts"/>
/// <reference path="game/view/GameBoardView.tsx"/>

namespace gameView {

    import GameState = game.GameState;
    import GameEngine = game.GameEngine;

    export class GamePageParams {
        gameId: string;
    }

    export class GamePageProps {
        params: GamePageParams;
    }

    export class GamePageState {
        gameState: GameState;

        constructor(gameState: GameState) {
            this.gameState = gameState;
        }

    }

    export interface GameInterface {
        toggleCell(x: number, y: number): void;
        submitBoard(): void;
    }

    export class GamePage extends React.Component<GamePageProps, GamePageState> {

        gameInterface: GameInterface = {
            toggleCell: (x: number, y: number) => {
                this.setState(new GamePageState(GameEngine.getPhaseHandler(this.state.gameState).toggleCell(this.state.gameState, x, y)));
            },
            submitBoard: () => {
                this.setState(new GamePageState(GameEngine.getPhaseHandler(this.state.gameState).submitBoard(this.state.gameState)));
            }
        };

        constructor(props:GamePageProps) {
            super(props);
            this.state = new GamePageState(GameState.initial);
        }

        render() {
            return (
                <div>
                    <p>Game page</p>
                    <p>Game Phase: {this.state.gameState.gamePhase}</p>
                    <p>Game Id: {this.props.params.gameId}</p>
                    <GameBoardView board={this.state.gameState.playerBoard} gameInterface={this.gameInterface} active={this.state.gameState.playerBoardActive} />
                    <GameBoardView board={this.state.gameState.opponentBoard} gameInterface={this.gameInterface} active={this.state.gameState.opponentBoardActive} />
                </div>
            )
        }
    }


}