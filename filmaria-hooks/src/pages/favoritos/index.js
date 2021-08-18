import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';

import './favoritos.css';

export default function Favoritos() {

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function handleDelete(id) {
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id);
        })

        setFilmes(filtroFilmes); //Atualiza state
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes)); //Atualiza storage
        toast.success('Filme excluido com sucesso');
    }

    return(
        <div id="meus-filmes">
            <h1>Meus filmes</h1>
            {filmes.length === 0 && <span>Voce nao possui nenhum filme favoritado</span>}


            <ul>
                {filmes.map((filme) => {
                    return(
                        <li key={filme.id}>
                            <span>{filme.id}</span>

                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => handleDelete(filme.id)}>Excluir</button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </div>
    );
}