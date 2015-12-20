namespace gameView {

    import PlayerShip = game.PlayerShip;

    export class ShipsPaletteProps {
        ships: Immutable.List<PlayerShip>;
    }

    export class ShipsPaletteState {

    }

    export class ShipsPaletteComponent extends React.Component<ShipsPaletteProps, ShipsPaletteState> {

        constructor(props: ShipsPaletteProps) {
            super(props);
            this.state = new ShipsPaletteState();
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
                <div className="ship" key={index}>
                    {Immutable.Range(0, ship.length).map(i => <div className="shipCell" key={i}></div>)}
                </div>
            );
        }

        //
    }


}