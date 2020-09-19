import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Home extends Component{
     render(){
        return(
            <div>
               <h2>Bem-vindo a pagina Home. A ideia eh estudar Rotas autenticadas</h2> <br/>
               <Link to="/sobre" >Ir para Sobre</Link>  <br/>
               <Link to="/produto/123" >Ir para Produto</Link>
            </div>
        );
    }
}

export default Home;