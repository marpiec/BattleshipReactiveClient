namespace game {

    export interface GameService {

        joinGame(onSuccess: (gameId: string) => void): void;

        submitPlayerBoard(gameId: string, playerBoard: Immutable.List<Immutable.List<CellState>>,
                          onSuccess: () => void): void;

        waitForOpponentToJoin(gameId: string,
                              onOpponentJoined: (opponentBoard: Immutable.List<Immutable.List<CellState>>, newGamePhase: GamePhase) => void,
                              onOpponentNotYetJoined: () => void): void;

        shoot(gameId: string, x: number, y: number,
              onSuccess: (shootResult: ShootResult, newGamePhase: GamePhase) => void): void;

        waitForOpponentShot(gameId: string,
                            onOpponentShot: (x: number, y: number, newGamePhase: GamePhase) => void,
                            onOpponentNotYetShot: () => void): void;


    }


    export class MockGameService implements GameService {


        joinGame(onSuccess:(gameId:string)=>void) {
            throw new Error("Not yet implemented");
        }

        submitPlayerBoard(gameId:string, playerBoard:Immutable.List<Immutable.List<game.CellState>>,
                          onSuccess:()=>void) {
            throw new Error("Not yet implemented");
        }

        waitForOpponentToJoin(gameId:string,
                              onOpponentJoined:(opponentBoard:Immutable.List<Immutable.List<game.CellState>>, newGamePhase:game.GamePhase)=>void,
                              onOpponentNotYetJoined:()=>void) {
            throw new Error("Not yet implemented");
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