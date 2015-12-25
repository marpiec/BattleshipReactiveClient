/// <reference path="../utils/MouseDrag.ts"/>

namespace gameView {

    import PlayerShip = game.PlayerShip;
    import MouseDrag = pointer.MouseDrag;
    import DOMComponent = __React.DOMComponent;
    import HTMLAttributes = __React.HTMLAttributes;

    export class ShipsPaletteProps {
        ships: Immutable.List<PlayerShip>;
    }

    export class ShipsPaletteState {

    }

    export class PaletteShipDrag extends MouseDrag<PlayerShip> {

        constructor(model: PlayerShip) {
            super(model);
        }

        dragInit(node:JQuery, model:game.PlayerShip):XY {
            return new XY(0, 0);
        }

        dragStarted(eventPosition:XY, node:JQuery, model:game.PlayerShip):void {
            node.removeClass("animatePosition")
                .css({transitionDuration: "0s"})
                .css({top: eventPosition.y, left: eventPosition.x});
        }

        dragged(eventPosition:XY, node:JQuery, model:game.PlayerShip):void {
            node.css({top: eventPosition.y, left: eventPosition.x});

            const boardElement = $(".gameBoardComponent .board").get(0);
            const shipElement = node.get(0);
            const boardSize = nodes.getElementSize(boardElement).scale(10 / 11);
            const cellSize = boardSize.width / 10;
            const boardPosition = nodes.getElementPosition(boardElement).plusSize(boardSize.scale(1 / 10));
            const shipPosition = nodes.getElementPosition(shipElement);
            const shipSize = nodes.getElementSize(shipElement);
            const shipGridSize = shipSize.scaleFloor(1 / cellSize);

            const shipRelativePosition = shipPosition.minus(boardPosition).plus(new XY(cellSize / 2, cellSize / 2));

            const shipGridPosition = shipRelativePosition.scaleFloor(1 / cellSize);

            console.log(shipGridPosition)

            node.toggleClass("valid", shipGridPosition.x + shipGridSize.width - 1 < 10 && shipGridPosition.x >= 0
                                   && shipGridPosition.y + shipGridSize.height - 1 < 10 && shipGridPosition.y >= 0);


            console.log(shipPosition);

        }

        dragEnded(eventPosition:XY, node:JQuery, model:game.PlayerShip):void {
            const returnDistance = Math.sqrt(eventPosition.x * eventPosition.x + eventPosition.y * eventPosition.y);

            node.css({top: eventPosition.y, left: eventPosition.x})
                .addClass("animatePosition")
                .css({transitionDuration: 0.2 * returnDistance / 1000 + "s"}); //1000 pixels in 0.2s
            node.css({top: 0, left: 0});

            node.toggleClass("valid", false);
        }

    }

    export class ShipsPaletteComponent extends React.Component<ShipsPaletteProps, ShipsPaletteState> {

        constructor(props: ShipsPaletteProps) {
            super(props);
            this.state = new ShipsPaletteState();
        }

        shipMounted(ship: PlayerShip, node: DOMComponent<HTMLAttributes>) {
            $(node).handlerDrag(new PaletteShipDrag(ship));
        }

        render() {
            console.log(this.props.ships.toJS());
            return (
                <div className="shipsPalette">
                    {this.props.ships.zip(Immutable.Range(0, this.props.ships.size)).map(s => this.renderShip(s[0], s[1]))}
                </div>);
        }

        renderShip(ship: PlayerShip, index: number) {
            return (
                <div className="ship" key={index} ref={(node) => this.shipMounted(ship, node)}>
                    {Immutable.Range(0, ship.length).map(i => <div className="shipCell" key={i}></div>)}
                </div>
            );
        }

        //
    }


}