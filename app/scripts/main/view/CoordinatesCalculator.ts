namespace gameView {

    import GameRules = game.GameRules;
    import PlayerShip = game.PlayerShip;

    export class CoordinatesCalculator {


        static getShipBoardPosition(ship: JQuery): Optional<XY> {

            const boardElement = $(".gameBoardComponent .board");

            const boardSize = nodes.getElementSize(boardElement);
            const boardPosition = nodes.getElementPosition(boardElement);

            const shipSize = nodes.getElementSize(ship);
            const shipPosition = nodes.getElementPosition(ship);

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


        static getShipRelativePosition(ship: PlayerShip): XY {

            const boardElement = $(".gameBoardComponent .board");
            const boardSize = nodes.getElementSize(boardElement);
            const boardPosition = nodes.getElementPosition(boardElement);
            const cellSize = boardSize.width / GameRules.GAME_BOARD_SIZE;

            const shipContainerPosition = nodes.getElementPosition($(`.shipContainer${ship.id}`));

            return boardPosition.plus(new XY(ship.xy.value.x * cellSize, ship.xy.value.y * cellSize)).minus(shipContainerPosition);

        }

        static within(element: JQuery, container: JQuery): boolean {
            const elementCenter = nodes.getElementPositionAndSize(element).centerPosition;
            const containerRect = nodes.getElementPositionAndSize(container);

            return containerRect.within(elementCenter);
        }

        static withinRotateAreaCenter(element: JQuery): boolean {
            return CoordinatesCalculator.within(element, $(".rotateArea .rotateAreaCenter"));
        }

        static withinRotateArea(element: JQuery): boolean {
            return CoordinatesCalculator.within(element, $(".rotateArea"));
        }
    }

}