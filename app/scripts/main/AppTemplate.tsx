namespace page {


    export class AppTemplateProps {
        children: React.Component<any, any>[];
    }

    export class AppTemplateState {
    }


    export class AppTemplate extends React.Component<AppTemplateProps, AppTemplateState> {
        constructor(props:AppTemplateProps) {
            super(props);
            this.state = new AppTemplateState();
        }

        render() {
            return (
                <div className="appTemplate">
                    <p>Ships battle</p>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }


}