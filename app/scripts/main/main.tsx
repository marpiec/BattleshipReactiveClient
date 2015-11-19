/// <reference path="./GamePage.tsx"/>
/// <reference path="./MainPage.tsx"/>
/// <reference path="./NotFoundPage.tsx"/>

namespace main {

    import NotFoundPage = page.NotFoundPage;
    import MainPage = page.MainPage;
    import GamePage = gameView.GamePage;

    import Router = ReactRouter.Router;
    import Route = ReactRouter.Route;
    import IndexRoute = ReactRouter.IndexRoute;
    import AppTemplate = page.AppTemplate;

    ReactDOM.render((
        <Router>
            <Route path="/" component={AppTemplate}>
                <IndexRoute component={MainPage} />
                <Route path="game/:gameId" component={GamePage}/>
                <Route path="*" component={NotFoundPage}/>
            </Route>
        </Router>
    ), document.getElementById('main'))

}


