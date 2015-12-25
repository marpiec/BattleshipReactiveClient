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
        dragInit(node:JQuery, model:game.PlayerShip):XY {
            return new XY(0, 0);
        }

        dragStarted(eventPosition:XY, node:JQuery, model:game.PlayerShip):void {
            node.removeClass("animatePosition")
                .css({top: eventPosition.y, left: eventPosition.x});
        }

        dragged(eventPosition:XY, node:JQuery, model:game.PlayerShip):void {
            node.css({top: eventPosition.y, left: eventPosition.x});
        }

        dragEnded(eventPosition:XY, node:JQuery, model:game.PlayerShip):void {
            node.addClass("animatePosition")
                .css({top: 0, left: 0});
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