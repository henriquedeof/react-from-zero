import React, {Component} from 'react';

class Index extends Component {

    render() {
        return (
            <div>
                {/*The key={item.id} instruction is needed to indicate that every child of this list has a unique key.*/}
                <div key={this.props.id}>
                    <h3>{this.props.username}</h3>
                    <a>{ this.props.curtidas > 1 ? this.props.curtidas + ' curtidas' : this.props.curtidas + ' curtida'} /
                        {this.props.comentarios > 1 ? this.props.comentarios + ' comentarios' : this.props.comentarios + ' comentario'}
                    </a>
                </div>
            </div>
        );
    }

}

export default Index;