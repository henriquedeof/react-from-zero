import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Favoritos from "./pages/favoritos"; //O nome da pasta deveria ser maiusculo
import Erro from './pages/Erro'

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>  {/*switch eh um componente apenas por pagina*/}
                <Route exact path="/" component={Home} />
                <Route exact path="/filme/:id" component={Filme} />
                <Route exact path="/favoritos" component={Favoritos} />
                <Route exact path="*" component={Erro} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;