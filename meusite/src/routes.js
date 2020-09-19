import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Erro from './pages/Erro';
import Produto from './pages/Produto';
import Header from './components/Header';
import {autenticado} from "./auth";


const PrivateRoute = ({component: Component, ...rest}) =>(
    //'...rest' param returns all the attributes/values on my <Route path="/produto/:id" component={Produto}/> below
    //props means the properties of the page
    <Route {...rest} render={props => (
        autenticado() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}} />
        )
    )} />

    //I could write this function: const PrivateRoute = () =>{return(...)};// the result would be the same.
    //NOTES:
        //const x = () => {} // Does nothing
        //const y = () => ({}) // returns an object

);


const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sobre" component={Sobre} />

                {/*private routes*/}
                <PrivateRoute path="/produto/:id" component={Produto}/>

                {/*This route must be the last one*/}
                <Route path="*" component={Erro}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
