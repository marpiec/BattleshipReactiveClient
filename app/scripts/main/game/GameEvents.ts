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

        static is(event: GameEvent):event is JoinedGame {
            return event.eventType === "JoinedGame";
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

        static is(event: GameEvent):event is PlayerBoardSubmitted {
            return event.eventType === "PlayerBoardSubmitted";
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

        static is(event: GameEvent): event is OpponentJoined {
            return event.eventType === "OpponentJoined";
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

        static is(event: GameEvent): event is PlayerShot {
            return event.eventType === "PlayerShot";
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

        static is(event: GameEvent): event is OpponentShot {
            return event.eventType === "OpponentShot";
        }
    }




}