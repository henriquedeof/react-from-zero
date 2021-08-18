import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

import './filme-info.css'
import api from "../../services/api";

export default function Filme() {
    /*A ordem de execucao eh:
        1. Carregue as variaveis.
        2. Verifica se o estado loading eh true e retorna JSX do loading.
            - Quando um JSX eh retornado, o React entende que a pagina foi carregada (eh o ponto final).
        3. Entra no useEffect pois o ID foi carregado/atualizado.
            - Informacoes do filme sao carregadas (assincronamente).
            - Loading eh setado como false, ou seja, pagina principal (JSX) pode ser carregada.
        4. Carrega pagina principal (JSX principal)
     */

    const { id } = useParams(); //Pegando o ID do filme que vem da URL na requisicao GET.
    const [filme, setFilme] = useState([]);
    const history = useHistory();
    const [loading, setLoading] = useState(true);//Quando valor eh 'true', significa que esta pagina ainda esta no modo loading.

    useEffect(() => {
        async function loadFilme() {
            //O await faz com que a chamada get() "PARE" neste ponto esperando a resposta, porem o restnte da aplicacao (fora da funcao loadFilme()) continue sendo executada.
            //Assim que o get() eh retornado, o restante da funcao loadFilme() continua a execucao, que significa executar setFilme(response); e assim por diante.
            const response = await api.get(`r-api/?api=filmes/${id}`);

            //Se response eh vazio, ou seja, nao tem informacao para o ID informado, redirecione para pagina inicial.
            if(response.data.length === 0){
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);//Filme carregado, entao nao preciso mais de informacao de loading
        }

        loadFilme(); //Chamando o async function loadFilme(). Caso nao tivesse essa linha, o async function loadFilme() {...} nunca seria executado.

        //Desmontando componente
        return () => {
            console.log('COMPONENTE DESMONTADO');
        }

    }, [history, id]);

    function salvaFilme() {
        const minhaLista = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(minhaLista) || [];//Converting JSON String into an Object. If doesnt exist, filmesSalvos is converted into [].

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
        if(hasFilme)   {
            toast.info('Voce ja possui esse filme salvo');
            return;
        }

        filmesSalvos.push(filme); //Adicionando filme da pagina atual no array.
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos)); //Adicionando array atualizado como novo filme no Local Storage.

        toast.success('Filme salvo com sucesso');
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando seu filme</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome} />

            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )

}