import React from 'react';
import {Link} from "react-router-dom";

export default class Movie extends React.Component {
	render(){
		return <div className="movie">
			<div className="movie-img">
				<img className="show" src={process.env.PUBLIC_URL + "/" +this.props.miniatura} alt="miniatura de la película"/>
			</div>
			<div className="title">
			 	{this.props.titulo || <em>Sin título</em>}
			</div>
			<div className="actions">
				<Link to={"/show/"+this.props.id}><button className="show">ver</button></Link>
				<Link to={"/edit/"+this.props.id}><button className="edit">editar</button></Link>
				<button className="delete" onClick={this.props.delete}>borrar</button>
			</div>
		</div>

	}
}