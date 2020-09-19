import React from 'react';
import InicioSPA from "../InicioSPA";
import SobreSPA from "../SobreSPA";
import ContatoSPA from "../ContatoSPA";
import "../../styleSPA.css";

function HomeSPA() {
    return (
        <div>
            <InicioSPA />
            <SobreSPA />
            <ContatoSPA />
        </div>
    );
}

export default HomeSPA;