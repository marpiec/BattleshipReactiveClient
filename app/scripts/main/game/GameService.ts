namespace game {

    export class GameServiceProvider {
        static getGameService() {
            return new MockGameService();
        }
    }

    export interface GameService {

        listenOnServerEvents(gameId: string, onEvent: (event: GameEvent) => void): void;

        joinGame(onSuccess: (gameId: string, playerId: string) => void): void;

        submitPlayerBoard(gameId: string, playerBoard: GameBoard,
                          onSuccess: () => void, onFailure: (errors: string[]) => void): void;

        shoot(gameId: string, x: number, y: number,
              onSuccess: (shootResult: ShotResult, newGamePhase: GamePhase) => void): void;


    }


    export class MockGameService implements GameService {

        private playerBoard: GameBoard;
        private opponentBoard: GameBoard;

        private eventsCounter = 1;
        private onServerEvent: (event: GameEvent) => void = (event: GameEvent) => {}; //ignore by default

        listenOnServerEvents(gameId: string, onEvent: (event: GameEvent) => void) {
            this.onServerEvent = onEvent;
        }

        joinGame(onSuccess:(gameId:string, playerId: string)=>void) {
            onSuccess("someGameId", "somePlayerId");
            this.onServerEvent(new JoinedGame().init(this.eventsCounter++, "someGameId", "somePlayerId"));
        }

        submitPlayerBoard(gameId:string, playerBoard:GameBoard,
                          onSuccess:()=>void, onFailure: (errors: string[]) => void) {
            this.playerBoard = playerBoard;
            onSuccess();
            this.onServerEvent(new PlayerBoardSubmitted().init(this.eventsCounter++, playerBoard, GamePhase.waitForSecondPlayer));

            setTimeout(() => {
                const newPhase = [GamePhase.playerTurn, GamePhase.opponentTurn][Math.floor(Math.random() * 2)];
                this.onServerEvent(new OpponentJoined().init(this.eventsCounter++, newPhase));
            }, 5000); //wait 5 seconds for opponent to join
        }

        shoot(gameId:string, x:number, y:number,
              onSuccess:(shootResult:game.ShotResult, newGamePhase:game.GamePhase)=>void) {
            throw new Error("Not yet implemented");
        }

    }


}