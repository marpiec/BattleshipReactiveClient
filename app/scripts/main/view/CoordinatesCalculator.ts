namespace gameView {

    import GameRules = game.GameRules;
    export class CoordinatesCalculator {


        static getShipBoardPosition(ship: JQuery): Optional<XY> {

            const boardElement = $(".gameBoardComponent .board").get(0);
            const shipElement = ship.get(0);

            const boardSize = nodes.getElementSize(boardElement);
            const boardPosition = nodes.getElementPosition(boardElement);

            const shipSize = nodes.getElementSize(shipElement);
            const shipPosition = nodes.getElementPosition(shipElement);

            const cellSize = boardSize.width / GameRules.GAME_BOARD_SIZE;
            const shipGridSize = shipSize.scaleFloor(1 / cellSize);

            const shipRelativePosition = shipPosition.minus(boardPosition).plus(new XY(cellSize / 2, cellSize / 2));

            const shipGridPosition = shipRelativePosition.scaleFloor(1 / cellSize);

            const valid = shipGridPosition.x + shipGridSize.width - 1 < GameRules.GAME_BOARD_SIZE && shipGridPosition.x >= 0
                       && shipGridPosition.y + shipGridSize.height - 1 < GameRules.GAME_BOARD_SIZE && shipGridPosition.y >= 0;

            if(valid) {
                return Some(shipGridPosition);
            } else {
                return None;
            }
        }


    }

}