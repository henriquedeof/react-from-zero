import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import firebase from "../../firebase";
import './login.css';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        //Verify if there is a logged user.
        if(firebase.getCurrentUser()){
            return this.props.history.replace('/dashboard');
        }
    }

    entrar = (e) =>{
        e.preventDefault();
        this.login();
    }

    login = async () => {
        const {email, password} = this.state;

        try{
            await firebase.login(email, password)
                .then(response => {
                    //withRouter provides access to the navigation history.
                    //If login is ok, send me to the 'Dashboard' page.
                    this.props.history.replace('/dashboard');
                }).catch((error) => {
                    if(error.code === 'auth/user-not-found'){
                        alert('Usuario nao encontrado');
                        return null;
                    }else{
                        alert('Codigo de erro: ' + error.code);
                        return null;
                    }
                });

        }catch (error) {
            alert('Falha ao realizar o login: ' + error.message);
        }
    }


    render() {
        return(
            <div>
                <form onSubmit={this.entrar} id="login">
                    <label>Email: </label> <br />
                    <input type="email" autoComplete="off" onFocus
                           placeholder="teste@teste.com"
                           value={this.state.email}
                           onChange={(e) => this.setState({email: e.target.value})}
                    />
                    <br />
                    <label>Password: </label> <br />
                    <input type="password" autoComplete="off"
                           placeholder="seu password"
                           value={this.state.password}
                           onChange={(e) => this.setState({password: e.target.value})}
                    />
                    <br />
                    <button type="submit">Entrar</button>
                    <Link to="/register" >Ainda nao possui uma conta?</Link>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);