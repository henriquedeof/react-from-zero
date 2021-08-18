import React, {Component} from 'react';
import './estilo.css'

class App extends Component{

    //Biscoito da sorte project.

    constructor(props){
        super(props);
        this.state = {
            textoFrase: 'alo voce'
        };
    }

}

class Botao extends Component{
    render(){
        return(
            <div>
                <button onClick={this.props.acaoBtn} >{this.props.nome}</button>
            </div>
        );
    }
}



export default App;