import Routes from "./routes";
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import './styles.css';


function App() {
    return (
        <div className="app">
            <Routes />
            <ToastContainer autoClose={3000} /> {/* Todo container do Toast vai ter o timeout de 3s*/}
        </div>
    );
}

export default App;
