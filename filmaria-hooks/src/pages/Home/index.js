import {useEffect, useState} from 'react';
import api from "../../services/api";
import {Link} from "react-router-dom";

import './home.css';

export default function Home() {

    const [filmes, setFilmes] = useState([]);//State filme starts empty

    useEffect(() => {
        //async - a funcao eh assincrona
        //await espera a realizacao da requisicao
        async function loadFilmes() {
            const response = await api.get('r-api/?api=filmes');
            setFilmes(response.data);
        }

        loadFilmes();
        
    }, [])


    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map(filme => {
                    //usando retorno pq estou escrevendo html (jsx)
                    return(
                        <article key={filme.id}>
                            <strong>{filme.nome}</strong>
                            <img src={filme.foto} alt={filme.nome} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}