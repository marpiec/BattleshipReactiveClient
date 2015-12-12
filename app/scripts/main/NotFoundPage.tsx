namespace page {


    export class NotFoundPageProps {
    }

    export class NotFoundPageState {
    }


    export class NotFoundPage extends React.Component<NotFoundPageProps, NotFoundPageState> {
        constructor(props:NotFoundPageProps) {
            super(props);
            this.state = new NotFoundPageState();
        }

        render() {
            return (
                <div className="notFoundPage">
                    <p>This is not the page you are looking for.</p>
                </div>
            )
        }
    }


}