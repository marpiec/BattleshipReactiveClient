/// <reference path="./GamePage.tsx"/>
/// <reference path="./MainPage.tsx"/>
/// <reference path="./NotFoundPage.tsx"/>

namespace main {

    import NotFoundPage = page.NotFoundPage;
    import MainPage = page.MainPage;
    import GamePage = page.GamePage;

    import Router = ReactRouter.Router;
    import Route = ReactRouter.Route;
    import IndexRoute = ReactRouter.IndexRoute;

    ReactDOM.render((
        <Router>
            <Route path="/">
                <IndexRoute component={MainPage} />
                <Route path="game" component={GamePage}/>
                <Route path="*" component={NotFoundPage}/>
            </Route>
        </Router>
    ), document.getElementById('main'))

}


