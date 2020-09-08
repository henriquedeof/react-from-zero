import React, {Component} from 'react';

class Membro extends Component {
    constructor(props) {
        super(props);

        //I do not need to add: this.props.name because it is inside of this.state
        this.state = {
            nome: props.nome
        }
    }

    entrar = () => {//Using arrow function this way, I do not need bind it explicitly.
        this.setState({nome: 'Henrique'});
    }

    sair = () => {
        this.setState({nome: 'Visitante'});
    }

    render() {
        return (
            <div>
                <h2>Bem vindo {this.state.nome}</h2>
                <button onClick={this.entrar}>Entrar como Henrique</button>
                <button onClick={this.sair}>Sair</button>
                {/*<button onClick={() => this.sair('Visitante')}>Sair</button>*/}
                {/*<button onClick={ () => this.setState({nome: 'Visitante'})}>Sair</button>*/}
            </div>
        );
    }
}

export default Membro;