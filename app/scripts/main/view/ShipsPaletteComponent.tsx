/// <reference path="../utils/MouseDrag.ts"/>

namespace gameView {

    import PlayerShipPosition = game.PlayerShipPosition;
    import PlayerShip = game.PlayerShip;
    import MouseDrag = pointer.MouseDrag;
    import DOMComponent = __React.DOMComponent;
    import HTMLAttributes = __React.HTMLAttributes;
    import ShipDirection = game.ShipDirection;

    export class ShipsPaletteProps {
        ships: Immutable.List<PlayerShip>;
        gameInterface: GameInterface;
    }

    export class ShipsPaletteState {

    }

    export class PaletteShipDrag extends MouseDrag<PlayerShip> {

        private gameInterface: GameInterface;

        constructor(model: PlayerShip, gameInterface: GameInterface) {
            super(model);
            this.gameInterface = gameInterface;
        }

        dragInit(node:JQuery, model:game.PlayerShip):XY {
            return new XY(0, 0);
        }

        dragStarted(eventPosition:XY, draggedNode:JQuery, model:game.PlayerShip):void {
            draggedNode
                .removeClass("animatePosition")
                .addClass("dragged")
                .css({transitionDuration: "0s"})
                .css({top: eventPosition.y, left: eventPosition.x});
        }

        dragged(eventPosition:XY, draggedNode:JQuery, model:game.PlayerShip):void {
            draggedNode.css({top: eventPosition.y, left: eventPosition.x});

            const shipBoardPosition = CoordinatesCalculator.getShipBoardPosition(draggedNode);
            draggedNode.toggleClass("valid", shipBoardPosition.isPresent);

            if(shipBoardPosition.isPresent) {
                //this.gameInterface.shipIsBeingDragged(new PlayerShipPosition().init(shipBoardPosition.value.x, shipBoardPosition.value.y, model, ShipDirection.vertical));
            }

        }

        dragEnded(eventPosition:XY, draggedNode:JQuery, model:game.PlayerShip):void {
            const returnDistance = Math.sqrt(eventPosition.x * eventPosition.x + eventPosition.y * eventPosition.y);

            draggedNode.css({top: eventPosition.y, left: eventPosition.x})
                .removeClass("dragged")
                .addClass("animatePosition")
                .css({transitionDuration: 0.2 * returnDistance / 1000 + "s"}); //1000 pixels in 0.2s
            draggedNode.css({top: 0, left: 0});

            draggedNode.toggleClass("valid", false);
        }

    }

    export class ShipsPaletteComponent extends React.Component<ShipsPaletteProps, ShipsPaletteState> {

        constructor(props: ShipsPaletteProps) {
            super(props);
            this.state = new ShipsPaletteState();
        }

        shipMounted(ship: PlayerShip, node: DOMComponent<HTMLAttributes>) {
            $(node).handlerDrag(new PaletteShipDrag(ship, this.props.gameInterface));
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