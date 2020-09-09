import React, {Component} from 'react';
import TodoList from './components/TodoList';


class App extends Component{

    //Creating a to do list dynamically.

    render(){
        return(
            <div>
                <h1>Lista de Tarefas</h1>
                <TodoList/>
            </div>
        )
    }
}

export default App;