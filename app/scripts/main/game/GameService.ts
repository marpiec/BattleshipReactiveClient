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

            setTimeout(() => this.opponentJoin(playerBoard), 2000); //wait 2 seconds for opponent to join
        }


        shoot(gameId:string, x:number, y:number,
              onSuccess:(shootResult:game.ShotResult, newGamePhase:game.GamePhase)=>void) {
            const cellState = this.opponentBoard.rows.get(y).get(x);
            if(cellState === CellState.ship) {
                onSuccess(ShotResult.hit, GamePhase.opponentTurn);
                setTimeout(() => this.opponentTurn(), 2000); //wait 2 seconds for opponent turn
            } else {
                onSuccess(ShotResult.miss, GamePhase.opponentTurn);
                setTimeout(() => this.opponentTurn(), 2000); //wait 2 seconds for opponent turn
            }
        }

        private opponentJoin(opponentBoard: GameBoard) {
            this.opponentBoard = opponentBoard;
            const newPhase = [GamePhase.playerTurn, GamePhase.opponentTurn][Math.floor(Math.random() * 2)];
            this.onServerEvent(new OpponentJoined().init(this.eventsCounter++, newPhase));
            if(newPhase === GamePhase.opponentTurn) {
                setTimeout(() => this.opponentTurn(), 2000); //wait 2 seconds for opponent turn
            }
        }


        private opponentTurn() {
            const y = Math.floor(Math.random() * GameRules.GAME_BOARD_SIZE);
            const x = Math.floor(Math.random() * GameRules.GAME_BOARD_SIZE);
            const cellState = this.playerBoard.rows.get(y).get(x);
            if(cellState === CellState.ship) {
                this.onServerEvent(new OpponentShot().init(this.eventsCounter++, x, y, ShotResult.hit, GamePhase.playerTurn));
            } else {
                this.onServerEvent(new OpponentShot().init(this.eventsCounter++, x, y, ShotResult.miss, GamePhase.playerTurn));
            }

        }
    }


}