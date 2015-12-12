namespace game {

    export interface GameService {

        joinGame(onSuccess: (gameId: GameId) => void);

        submitPlayerBoard(gameId: GameId, playerBoard: Immutable.List<Immutable.List<CellState>>,
                          onSuccess: () => void);

        waitForOpponentToJoin(gameId: GameId,
                              onOpponentJoined: (opponentBoard: Immutable.List<Immutable.List<CellState>>, newGamePhase: GamePhase) => void,
                              onOpponentNotYetJoined: () => void);

        shoot(gameId: GameId, x: number, y: number,
              onSuccess: (shootResult: ShootResult, newGamePhase: GamePhase) => void);

        waitForOpponentShot(gameId: GameId,
                            onOpponentShot: (x: number, y: number, newGamePhase: GamePhase) => void,
                            onOpponentNotYetShot: () => void);


    }


    export class MockGameService implements GameService {


        joinGame(onSuccess:(gameId:game.GameId)=>void) {
            throw new Error("Not yet implemented");
        }

        submitPlayerBoard(gameId:game.GameId, playerBoard:Immutable.List<Immutable.List<game.CellState>>,
                          onSuccess:()=>void) {
            throw new Error("Not yet implemented");
        }

        waitForOpponentToJoin(gameId:game.GameId,
                              onOpponentJoined:(opponentBoard:Immutable.List<Immutable.List<game.CellState>>, newGamePhase:game.GamePhase)=>void,
                              onOpponentNotYetJoined:()=>void) {
            throw new Error("Not yet implemented");
        }

        shoot(gameId:game.GameId, x:number, y:number,
              onSuccess:(shootResult:game.ShootResult, newGamePhase:game.GamePhase)=>void) {
            throw new Error("Not yet implemented");
        }

        waitForOpponentShot(gameId:game.GameId,
                            onOpponentShot:(x:number, y:number, newGamePhase:game.GamePhase)=>void,
                            onOpponentNotYetShot:()=>void) {
            throw new Error("Not yet implemented");
        }
    }


}