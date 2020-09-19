import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Erro from './pages/Erro';
import HomeSPA from "./pages/HomeSPA";
import HeaderSPA from "./pages/HeaderSPA";


const RoutesSPA = () => {
    return(
        <BrowserRouter>
            <HeaderSPA />
            <Switch>
                <Route exact path="/" component={HomeSPA} />
                <Route path="*" component={Erro}/>
            </Switch>
        </BrowserRouter>
    );
}

export default RoutesSPA;
