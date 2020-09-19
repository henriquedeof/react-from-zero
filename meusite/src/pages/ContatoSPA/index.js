import React from 'react';
import {HashLink as Link} from "react-router-hash-link";

function ContatoSPA() {
    return (
        <div className="home" id="contato">
            <h1>Entre em contato</h1>
            <h2>Telefone para contato 9 XXXX-XXXX</h2>
            <h3>Rua dos bobos, numero 0</h3>
            <Link smooth to="#home" style={{color: '#FFF'}}>Ir para home</Link>
        </div>
    );
}

export default ContatoSPA;