import React, {Component} from 'react';
import Index from "./components/feed";

class App extends Component {

    //working with child component
    constructor() {
        super();
        this.state = {
            feed: [
                {id: 1, username: 'Henrique', curtidas: 1, comentarios: 0},
                {id: 2, username: 'Felipe', curtidas: 92, comentarios: 220},
                {id: 3, username: 'Angelica', curtidas: 300, comentarios: 90},
            ]
        };
    }

    render() {
        return(
          <div>

              {this.state.feed.map((item) => {
                  return(
              //         this.props.id}>
              // <h3>{this.props.username}</h3>
              //     <a>{this.props.curtidas} curtidas / {this.props.comentarios
                      <Index key={item.id} username={item.username} curtidas={item.curtidas} comentarios={item.comentarios}/>
                  );
              })};

          </div>
        );
    }


}
export default App;
