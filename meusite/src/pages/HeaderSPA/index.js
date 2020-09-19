import React from 'react';
import {HashLink as Link} from "react-router-hash-link";

function HeaderSPA() {
    return (
        <header id="home">
            <div className="menu">
                <nav>
                    <ul>
                        <li><Link smooth to="#home">Home</Link></li>
                        <li><Link smooth to="#sobre">Sobre</Link></li>
                        <li><Link smooth to="#contato">Contato</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default HeaderSPA;