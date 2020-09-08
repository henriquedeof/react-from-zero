import React, { Component } from 'react';
import Membro from "./components/membro/Membro";

class App extends Component {

    render() {
        return(
          <div>
              <Membro nome="Visitante"/>
          </div>
        );
    }


}
export default App;






//=============== Testing how to use state ================
// class App extends Component {
//
//     constructor(props){
//         super(props);
//
//         this.state = {
//             nome: 'Henrique',
//             contador: 0
//         };
//         //this.aumentar = this.aumentar.bind(this);
//     }
//
//     aumentar = () => {
//         this.setState({ nome: 'Felipe', contador: ++this.state.contador});
//
//         // this.setState((state, props) => ({
//         //     nome: 'Felipe',
//         //     contador: state.contador++
//         // }));
//         // console.log(this.state.nome);
//         // console.log(this.state.contador);
//
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1>Contador</h1>
//                 <h2>
//                     <button>-</button>{this.state.contador}<button onClick={this.aumentar}>+</button>
//                 </h2>
//                 {/*<h3>{this.state.nome}</h3>*/}
//
//             </div>
//         );
//     }
// }
//
// export default App;