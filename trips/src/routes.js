import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './pages/Home';
import Reservas from './pages/Reservas';

export default function Routes(){
  return(
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/reservas" component={Reservas} />
    </Switch>
  );
}