namespace game {

    export interface GameEvent {
        eventType: string;
        id: number;
    }

    export class JoinedGame extends Immutable.Record({
        id: undefined,
        eventType: undefined,
        gameId: undefined,
        playerId: undefined}) implements GameEvent {

        id: number;
        eventType: string;

        gameId: string;
        playerId: string;


        init(id: number, gameId: string, playerId: string): JoinedGame {
            return <JoinedGame><any>this.merge({
                id: id,
                eventType: "JoinedGame",
                gameId:gameId,
                playerId:playerId});
        }

    }


    export class PlayerBoardSubmitted extends Immutable.Record({
        id: undefined,
        eventType: undefined,
        playerBoard: undefined,
        newGamePhase: undefined}) implements GameEvent {

        id: number;
        eventType: string;

        playerBoard: GameBoard;
        newGamePhase: GamePhase;

        init(id: number, playerBoard: GameBoard, newGamePhase: GamePhase): PlayerBoardSubmitted {
            return <PlayerBoardSubmitted><any>this.merge({
                id: id,
                eventType: "PlayerBoardSubmitted",
                playerBoard:playerBoard,
                newGamePhase:newGamePhase});
        }
    }


    export class OpponentJoined extends Immutable.Record({
        id: undefined,
        eventType: undefined,
        newGamePhase: undefined}) implements GameEvent {

        id: number;
        eventType: string;

        newGamePhase: GamePhase;

        init(id: number, newGamePhase: GamePhase): OpponentJoined {
            return <OpponentJoined><any>this.merge({
                id: id,
                eventType: "OpponentJoined",
                newGamePhase:newGamePhase});
        }
    }

    export class PlayerShot extends Immutable.Record({
        id: undefined,
        eventType: undefined,
        x: undefined,
        y: undefined,
        result: undefined,
        newGamePhase: undefined}) implements GameEvent {

        id: number;
        eventType: string;

        x: number;
        y: number;
        result: ShotResult;
        newGamePhase: GamePhase;

        init(id: number, x: number, y: number, result: ShotResult, newGamePhase: GamePhase): PlayerShot {
            return <PlayerShot><any>this.merge({
                id: id,
                eventType: "PlayerShot",
                x:x,
                y:y,
                result:result,
                newGamePhase: newGamePhase});
        }
    }

    export class OpponentShot extends Immutable.Record({
        id: undefined,
        eventType: undefined,
        x: undefined,
        y: undefined,
        result: undefined,
        newGamePhase: undefined}) implements GameEvent {

        id: number;
        eventType: string;

        x: number;
        y: number;
        result: ShotResult;
        newGamePhase: GamePhase;

        init(id: number, x: number, y: number, result: ShotResult, newGamePhase: GamePhase): OpponentShot {
            return <OpponentShot><any>this.merge({
                id: id,
                eventType: "OpponentShot",
                x:x,
                y:y,
                result:result,
                newGamePhase: newGamePhase});
        }
    }

    export class PlayerWon extends Immutable.Record({
        id: undefined,
        eventType: undefined}) implements GameEvent {

        id: number;
        eventType: string;

        init(id: number): PlayerWon {
            return <PlayerWon><any>this.merge({
                id: id,
                eventType: "PlayerWon"});
        }
    }

    export class OpponentWon extends Immutable.Record({
        id: undefined,
        eventType: undefined}) implements GameEvent {

        id: number;
        eventType: string;

        init(id: number): OpponentWon {
            return <OpponentWon><any>this.merge({
                id: id,
                eventType: "OpponentWon"});
        }
    }



}