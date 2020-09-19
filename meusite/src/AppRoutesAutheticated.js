import React, {Component} from 'react';
import Routes from './routes';


class App extends Component{

    //Using ROUTES project and also adding authenticated routes.

     render(){
        return(
            <div>
                <Routes/>
            </div>         
        );
    }
}

export default App;