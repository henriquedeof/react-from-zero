

import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';


//O parametro component eh a propriedade que vem do Routes (chamador desta funcao) e Component eh o nome (variavel) que estou dando a este.
//Os componentes podem ser SignIn, SignUp, Dashboard, etc.

//isPrivate eh um boolean que vou passar quando chamar este componente

//...rest eh o spread operator. Algumas das informacoes contidas sao:
  // location (path), meta informacoes, etc.
export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){
  const { signed, loading } = useContext(AuthContext);



  if(loading){
    return(
      <div></div>
    )
  }

  //isPrivate indica se uma pagina eh privada (dentro do sistema) ou nao (pagina publica acessivel por qualquer usuario).
  if(!signed && isPrivate){
    return <Redirect to="/" />
  }

  if(signed && !isPrivate){
    return <Redirect to="/dashboard" />
  }

  //Realiza a renderizacao do componente que foi passado pelo Routes
  return(
      //props contem as informacoes de: history, location, match (contem informacoes de URL, Path e isExact
    <Route
      {...rest}
      render={ props => (
        <Component {...props} />
      )}
    />
  )
}