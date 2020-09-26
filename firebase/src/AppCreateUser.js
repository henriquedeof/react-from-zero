import React, {Component} from 'react';
import firebase from "./fireConnection";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
            nome: ''
        }

        firebase.auth().signOut();

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref('usuarios').child(user.uid).set({
                    nome: this.state.nome //The nome passed through the form will be used to set the value of 'nome' which is a database field.
                })
                .then(() => {
                    this.setState({email: '', senha: '', nome: ''});
                });
            }
        })

    }

    cadastrar = (e) => {
        e.preventDefault();//Do not reload the page when form submitted

        //createUserWithEmailAndPassword() returns a 'promise', so I can use then/catch in this case.
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
            .catch((error) => {
                alert('Codigo do erro: ' + error.code);
            });
    }

    logar = (e) => {
        //createUserWithEmailAndPassword() returns a 'promise', so I can use then/catch in this case.
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
            .catch((error) => {
                if(error.code === 'auth/wrong-password'){
                    alert('Senha invalida');
                } else {
                    alert('Codigo do erro: ' + error.code);
                }
            });

        e.preventDefault();//Do not reload the page when form submitted
    }

    sair = (e) =>{
        e.preventDefault();

        firebase.auth().signOut()
            .catch((error) => {
                alert('Erro ao tentar desolgar: ' + error.code);
            });

        alert('Usuario deslogado com sucesso');
    }

    render() {
        return (
            <div>
                {/*onSubmit passes a anonymous function to avoid */}
                <form onSubmit={(e) => this.cadastrar(e)}>
                    <label>Nome: </label>
                    <input type="text" value={this.state.nome} onChange={e => this.setState({nome: e.target.value})} />
                    <br />
                    <label>Email: </label>
                    <input type="text" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                    <br />
                    <label>Senha: </label>
                    <input type="text" value={this.state.senha} onChange={e => this.setState({senha: e.target.value})} />
                    <br />
                    <button type="submit">Logar</button>
                    <button type="submit" onClick={this.sair}>deslogar</button>
                </form>
            </div>
        );
    }
}

export default App;