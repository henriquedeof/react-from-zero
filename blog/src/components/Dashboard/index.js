import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import firebase from "../../firebase";
import "./dashboard.css";

class Dashboard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            nome: localStorage.nome
        };
    }

    //Executed when the component is mounted
    async componentDidMount() {
        if(!firebase.getCurrentUser()){
            this.props.history.replace('/login');
            return null;
        }

        //Passing info (callback) as a param and it will be set and returned with 'nome' in it.
        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            this.setState({nome: localStorage.nome});
        });

    }

    logout = async () => {
        await firebase.logout()
            .catch(error => {
                console.log(error);
            });

        localStorage.removeItem("nome");//If I do not put this line, the old name may appear on the system before updating for the new user.
        this.props.history.push('/');
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Ola {this.state.nome}</h1>
                    <Link to="/dashboard/new">Novo Link</Link>
                </div>
                <p>Logado com: {firebase.getCurrentUser()}</p>
                <button onClick={this.logout}>Deslogar</button>
            </div>
        );
    }
}

export default withRouter(Dashboard);