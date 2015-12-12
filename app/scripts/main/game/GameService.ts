namespace game {

    export class GameServiceProvider {
        static getGameService() {
            return new MockGameService();
        }
    }

    export interface GameService {

        joinGame(onSuccess: (gameId: string, playerId: string) => void): void;

        submitPlayerBoard(gameId: string, playerBoard: Immutable.List<Immutable.List<CellState>>,
                          onSuccess: () => void, onFailure: (errors: string[]) => void): void;

        waitForOpponentToJoin(gameId: string,
                              onOpponentJoined: (newGamePhase: GamePhase) => void,
                              onOpponentNotYetJoined: () => void): void;

        shoot(gameId: string, x: number, y: number,
              onSuccess: (shootResult: ShootResult, newGamePhase: GamePhase) => void): void;

        waitForOpponentShot(gameId: string,
                            onOpponentShot: (x: number, y: number, newGamePhase: GamePhase) => void,
                            onOpponentNotYetShot: () => void): void;


    }


    export class MockGameService implements GameService {

        private playerBoard: Immutable.List<Immutable.List<game.CellState>>;
        private opponentBoard: Immutable.List<Immutable.List<game.CellState>>;


        joinGame(onSuccess:(gameId:string, playerId: string)=>void) {
            onSuccess("someGameId", "somePlayerId");
        }

        submitPlayerBoard(gameId:string, playerBoard:Immutable.List<Immutable.List<game.CellState>>,
                          onSuccess:()=>void, onFailure: (errors: string[]) => void) {
            this.playerBoard = playerBoard;
            onSuccess();
        }

        waitForOpponentToJoin(gameId:string,
                              onOpponentJoined:(newGamePhase:game.GamePhase)=>void,
                              onOpponentNotYetJoined:()=>void) {
            this.opponentBoard = this.playerBoard;

            const newPhase = [GamePhase.playerTurn, GamePhase.opponentTurn][Math.floor(Math.random() * 2)];

            onOpponentJoined(newPhase);
        }

        shoot(gameId:string, x:number, y:number,
              onSuccess:(shootResult:game.ShootResult, newGamePhase:game.GamePhase)=>void) {
            throw new Error("Not yet implemented");
        }

        waitForOpponentShot(gameId:string,
                            onOpponentShot:(x:number, y:number, newGamePhase:game.GamePhase)=>void,
                            onOpponentNotYetShot:()=>void) {
            throw new Error("Not yet implemented");
        }
    }


}