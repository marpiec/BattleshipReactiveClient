/// <reference path="../utils/MouseDrag.ts"/>

namespace gameView {

    import PlayerShipPosition = game.PlayerShip;
    import MouseDrag = pointer.MouseDrag;
    import DOMComponent = __React.DOMComponent;
    import HTMLAttributes = __React.HTMLAttributes;
    import ShipDirection = game.ShipDirection;
    import PlayerShip = game.PlayerShip;

    export class ShipsPaletteProps {
        ships: Immutable.List<PlayerShipPosition>;
        gameInterface: GameInterface;
    }

    export class ShipsPaletteState {

    }

    export class PaletteShipDrag extends MouseDrag<PlayerShipPosition> {

        private gameInterface: GameInterface;

        constructor(model: PlayerShipPosition, gameInterface: GameInterface) {
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

            if(shipBoardPosition.isPresent) {

                const shipMock = $(".gameBoardComponent .board .shipMock").first();
                shipMock.css({width: 10 + "%", height: model.shipLength * 10 + "%", top: shipBoardPosition.value.y * 10 + "%", left: shipBoardPosition.value.x * 10 + "%"});
                shipMock.removeClass("hidden");

                //this.gameInterface.shipIsBeingDragged(new PlayerShip().init(shipBoardPosition.value.x, shipBoardPosition.value.y, model, ShipDirection.vertical));
            } else {
                const shipMock = $(".gameBoardComponent .board .shipMock").first();
                shipMock.addClass("hidden");
            }

        }

        dragEnded(eventPosition:XY, draggedNode:JQuery, model:game.PlayerShip):void {

            const shipBoardPosition = CoordinatesCalculator.getShipBoardPosition(draggedNode);
            if(shipBoardPosition.isPresent) {
                draggedNode
                    .removeClass("dragged")
                    .css({top: 0, left: 0});

                this.gameInterface.shipPutOnBoard(model.id, shipBoardPosition.value, model.direction);
            } else {
                const returnDistance = Math.sqrt(eventPosition.x * eventPosition.x + eventPosition.y * eventPosition.y);

                draggedNode.css({top: eventPosition.y, left: eventPosition.x})
                    .removeClass("dragged")
                    .addClass("animatePosition")
                    .css({transitionDuration: 0.2 * returnDistance / 1000 + "s"}); //1000 pixels in 0.2s
                draggedNode.css({top: 0, left: 0});

                draggedNode.toggleClass("valid", false);

                this.gameInterface.shipRemoveFromBoard(model.id);
            }



        }

    }

    export class ShipsPaletteComponent extends React.Component<ShipsPaletteProps, ShipsPaletteState> {

        private shipsElements: [PlayerShip, DOMComponent<HTMLAttributes>][] = [];

        private initialized = false;

        constructor(props: ShipsPaletteProps) {
            super(props);
            this.state = new ShipsPaletteState();
        }

        shipMounted(ship: PlayerShipPosition, node: DOMComponent<HTMLAttributes>) {
            if(!this.initialized) {
                this.shipsElements.push([ship, node])
            }

        }

        componentDidMount(): void {
            this.updateShipsPosition();

            this.shipsElements.forEach(se => {
                $(se[1]).handlerDrag(new PaletteShipDrag(se[0], this.props.gameInterface));
            });
            this.initialized = true;

        }

        componentDidUpdate(prevPros: ShipsPaletteProps, prevState: ShipsPaletteState): void {
            this.updateShipsPosition();
        }

        updateShipsPosition():void {
            this.shipsElements.forEach(se => {
               const ship = this.props.ships.find(s => s.id === se[0].id);
                if(ship.xy.isPresent) {
                    $(se[1]).addClass("placed");
                } else {
                    $(se[1]).removeClass("placed");
                }
            });
        }

        render() {
            return (
                <div className="shipsPalette">
                    {this.props.ships.zip(Immutable.Range(0, this.props.ships.size)).map(s => this.renderShip(s[0], s[1]))}
                </div>);
        }

        renderShip(ship: PlayerShipPosition, index: number) {
            return (
                <div className="shipContainer" key={index}>
                    <div className="ship" ref={(node) => this.shipMounted(ship, node)}>
                        {Immutable.Range(0, ship.shipLength).map(i => <div className="shipCell" key={i}></div>)}
                    </div>
                </div>
            );
        }

    }


}