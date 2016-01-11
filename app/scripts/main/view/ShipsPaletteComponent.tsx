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

        private rotated = false;

        private leftTopCornerShift: XY;

        constructor(model: PlayerShipPosition, gameInterface: GameInterface) {
            super(model);
            this.gameInterface = gameInterface;
        }

        updateModel(model: PlayerShipPosition) {
            this.internalChangeModel(model);
        }

        dragInit(pointerPosition: XY, node:JQuery, model:game.PlayerShip):XY {

            const elementPosition = nodes.getElementPosition(node);

            const elementSize = nodes.getElementSize(node);

            this.leftTopCornerShift = new XY(pointerPosition.x - elementPosition.x, pointerPosition.y - elementPosition.y);

            return this.leftTopCornerShift;

        }

        dragStarted(eventPosition:XY, draggedNode:JQuery, model:game.PlayerShip):void {

            draggedNode
                .removeClass("animatePosition")
                .addClass("dragged")
                .css({transitionDuration: "0s"})
                .css({ left: eventPosition.x - this.leftTopCornerShift.x, top: eventPosition.y - this.leftTopCornerShift.y});

        }

        dragged(eventPosition:XY, draggedNode:JQuery, model:game.PlayerShip):void {
            const elementSize = nodes.getElementSize(draggedNode);

            draggedNode
                .css({ left: eventPosition.x - this.leftTopCornerShift.x, top: eventPosition.y - this.leftTopCornerShift.y});

            const shipBoardPosition = CoordinatesCalculator.getShipBoardPosition(draggedNode);

            if(shipBoardPosition.isPresent) {

                const shipMock = $(".gameBoardComponent .board .shipMock").first();

                if(model.direction === ShipDirection.horizontal) {
                    shipMock.css({width: model.shipLength * 10 + "%", height: 10 + "%", top: shipBoardPosition.value.y * 10 + "%", left: shipBoardPosition.value.x * 10 + "%"});
                } else {
                    shipMock.css({width: 10 + "%", height: model.shipLength * 10 + "%", top: shipBoardPosition.value.y * 10 + "%", left: shipBoardPosition.value.x * 10 + "%"});
                }


                shipMock.removeClass("hidden");

            } else {
                const shipMock = $(".gameBoardComponent .board .shipMock").first();
                shipMock.addClass("hidden");
            }

            const draggedPoint = nodes.getElementPositionAndSize(draggedNode).position.plus(this.leftTopCornerShift);

            if(CoordinatesCalculator.withinRotateArea(draggedPoint)) {
                if(CoordinatesCalculator.withinRotateAreaCenter(draggedPoint) && !this.rotated) {

                    let newDirection: ShipDirection;
                    if(model.direction === ShipDirection.horizontal) {
                        newDirection = ShipDirection.vertical;
                    } else {
                        newDirection = ShipDirection.horizontal;
                    }

                    this.gameInterface.shipDirectionChanged(model.id, newDirection);

                    this.leftTopCornerShift = this.leftTopCornerShift.transpose();

                    draggedNode
                        .addClass("dragged") // calling game interface clears classes
                        .css({ left: eventPosition.x - this.leftTopCornerShift.x, top: eventPosition.y - this.leftTopCornerShift.y});
                    this.rotated = true;
                }
            } else {
                this.rotated = false;
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

                //this.direction = ShipDirection.vertical;
                //draggedNode.toggleClass("horizontal", this.direction === ShipDirection.horizontal);
                //draggedNode.toggleClass("vertical", this.direction === ShipDirection.vertical);

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

        private dragHandlers: {[shipId: number]: PaletteShipDrag} = {};

        constructor(props: ShipsPaletteProps) {
            super(props);
            this.state = new ShipsPaletteState();
        }

        componentDidMount(): void {
            this.updateShipsPosition();

            this.props.ships.forEach(ship => {
                const dragHandler = new PaletteShipDrag(ship, this.props.gameInterface);
                this.dragHandlers[ship.id] = dragHandler;
                $(`.shipContainer${ship.id} .ship`).handlerDrag(dragHandler)
            });
        }

        componentDidUpdate(prevPros: ShipsPaletteProps, prevState: ShipsPaletteState): void {
            this.props.ships.forEach(ship => {
               this.dragHandlers[ship.id].updateModel(ship);
            });
            this.updateShipsPosition();
        }

        updateShipsPosition():void {

            this.props.ships.forEach(ship => {
                if(ship.xy.isPresent) {
                    const xy = CoordinatesCalculator.getShipRelativePosition(ship);
                    $(`.shipContainer${ship.id} .ship`).css({top: xy.y, left: xy.x});
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
            const shipClassNames = classNames("ship",
                {"horizontal": ship.direction === ShipDirection.horizontal,
                "vertical": ship.direction === ShipDirection.vertical});
            return (
                <div className={"shipContainer shipContainer" + ship.id} key={index}>
                    <div className={shipClassNames}>
                        {Immutable.Range(0, ship.shipLength).map(i => <div className="shipCell" key={i}></div>)}
                    </div>
                </div>
            );
        }

    }


}