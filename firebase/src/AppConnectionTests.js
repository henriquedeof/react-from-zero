import React, {Component} from 'react';
import firebase from "./fireConnection";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenInput: '',
            nomeInput: '',
            idadeInput: '',
            lista: [],
            token: 'Sem valor',
            nome: '',
            idade: ''
        }

        //Executing select on Firebase
        firebase.database().ref('usuarios').on('value', (snapshot) => {
            /*
            This way I can use the whole 'state' object instead of creating just one variable for 'lista' as I did below
            let state = this.state;
            state.lista = []; //Emptying this list, otherwise it will contain older information.
            */

            let listaAux = this.state.lista;
            listaAux = []; //Emptying this list, otherwise it will contain older information.

            snapshot.forEach((childItem) => {
                listaAux.push({
                    key: childItem.key,
                    nome: childItem.val().nome,
                    idade: childItem.val().idade
                });
            });

            //this.setState(state);
            this.setState({lista: listaAux});

        });

        /*
        //Function on() works as an observer and every time the value 'token' changes, the application will capture and display it immediately.
        firebase.database().ref('token').on('value', (snapshot) => {
            //A different way to do the same
            //let state = this.state;
            //state.token = snapshot.val();
            //this.setState(state);

            this.setState({token: snapshot.val()});
        });
        */

        //Function once() will capture the value of 'token' only once. If the value changes, the page needs to refreshed in order to display it.
        firebase.database().ref('token').once('value').then(snapshot => {
            this.setState({token: snapshot.val()});
        });

        //Function on() as an observer
        firebase.database().ref('usuarios').child('1').on('value', (snapshot) => {
            this.setState({nome: snapshot.val().nome});
            this.setState({idade: snapshot.val().idade});
        });

    }

    cadastrar = (e) => {
        //creating/updating a new token. It works this way when there are not children involved, only one field.
        //firebase.database().ref('token').set(this.state.tokenInput);

        //firebase.database().ref('usuarios').child(1).child('idade').set(this.state.tokenInput);//Updating the field idade of usuarios at position 1.
        //firebase.database().ref('usuarios').child(1).child('cargo').set(this.state.tokenInput);//creating/updating the field cargo.
        //firebase.database().ref('usuarios').child(1).child('cargo').remove();//Removing field cargo from usuarios on position 1.

        //Creating a new usuario
        let usuarios = firebase.database().ref('usuarios');
        let chave = usuarios.push().key;
        usuarios.child(chave).set({
            nome: this.state.nomeInput,
            idade: this.state.idadeInput
        });

        e.preventDefault();
    }

    render() {
        const {token, nome, idade} = this.state;
        return (
            <div>

                {this.state.lista.map((item) => {
                    return(
                        <div>
                            <h1>Ola {item.nome} com ID: {item.key}</h1>
                            <h2>Idade: {item.idade}</h2>
                        </div>
                    );
                })}

                <hr />
                <hr />

                <form onSubmit={this.cadastrar}>
                    <input type="text" value={this.state.nomeInput} onChange={e => this.setState({nomeInput: e.target.value})} />
                    <br/>
                    <input type="text" value={this.state.idadeInput} onChange={e => this.setState({idadeInput: e.target.value})} />
                    <br />
                    <button>Cadastrar</button>
                </form>

              <h1>Token: {token}</h1>
              <h1>Nome: {nome}</h1>
              <h1>Idade: {idade}</h1>
            </div>
        );
    }
}

export default App;