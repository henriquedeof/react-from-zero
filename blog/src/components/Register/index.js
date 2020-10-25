import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import firebase from "../../firebase";
import "./register.css";

class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            password: ''
        };
    }

    register = (e) => {
        e.preventDefault();
        this.onRegister();
    }

    onRegister = async() =>{
        try{
            const {nome, email, password} = this.state;

            await firebase.register(nome, email, password);
            this.props.history.replace('/dashboard');

        }catch (error) {
            alert('Falha ao registrar usuario: ' + error.message);
        }
    }

    render() {
        return(
            <div>
                <h1 className="register-h1">Novo usuario</h1>
                <form onSubmit={this.register} id="register">
                    <label>Nome: </label>
                    <input type="text" value={this.state.nome} autoFocus autoComplete="off"
                           onChange={(e) => this.setState({nome: e.target.value})}
                    />
                    <br />

                    <label>Email: </label>
                    <input type="text" value={this.state.email} autoComplete="off"
                           placeholder="teste@teste.com"
                           onChange={(e) => this.setState({email: e.target.value})}
                    />
                    <br />

                    <label>Senha: </label>
                    <input type="text" value={this.state.password} autoComplete="off"
                           onChange={(e) => this.setState({password: e.target.value})}
                    />
                    <br />

                    <button type="submit">Cadastrar</button>

                </form>
            </div>
        );
    }
}

export default withRouter(Register);