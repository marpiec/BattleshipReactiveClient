namespace page {


    import GameService = game.GameService;
    import MockGameService = game.MockGameService;
    import GameServiceProvider = game.GameServiceProvider;

    export class MainPageProps {
    }

    export class MainPageState {
    }


    export class MainPage extends React.Component<MainPageProps, MainPageState> {

        private gameService: GameService;

        constructor(props:MainPageProps) {
            super(props);
            this.state = new MainPageState();
            this.gameService = GameServiceProvider.getGameService();
        }

        joinGame() {
            this.gameService.joinGame((gameId: string, playerId: string) => {
                window.location.href = `/#/game/${gameId}/${playerId}`;
            })
        }

        render() {
            return (
                <div className="mainPage">
                    <p>Main page</p>
                    <button onClick={this.joinGame.bind(this)}>Join game</button>
                </div>
            )
        }
    }


}