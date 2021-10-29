import React from 'react';
import {Link} from "react-router-dom";
import { withRouter } from "react-router";

class MovieForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {...this.props.themovies[props.match.params.movieId]}
	}
	render(){
		return <div id="main">
 				<h2>Editar Película </h2>
				<div className="field">
					Título <br/>
					<input  type="text" id="titulo" placeholder="Título" value={this.state.titulo} onChange={e=>this.setState({titulo: e.target.value})}></input>
				</div>
				<div className="field">
					Director <br/>
					<input  type="text" id="director" placeholder="Director" value={this.state.director} onChange={e=>this.setState({director: e.target.value})}></input>
				</div>
				<div className="field">
					Miniatura <br/>
					<input  type="text" id="miniatura" placeholder="URL de la miniatura" value={this.state.miniatura} onChange={e=>this.setState({miniatura: e.target.value})}></input>
				</div>
				<div className="actions">
					{this.props.new ?
						<button className="new" onClick={()=>this.props.create(this.state)}>
						Crear
					</button> :
					<button className="update" onClick={()=>this.props.update(this.state)}>
						Actualizar
					</button>}
					<Link to="/"><button className="index">Volver</button></Link>
				</div>
			</div>

	}
}

export default withRouter(MovieForm);
