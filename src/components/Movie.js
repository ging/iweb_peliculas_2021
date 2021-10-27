import React from 'react';

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
				<button className="show" onClick={this.props.show}>ver</button>
				<button className="edit" onClick={this.props.edit}>editar</button>
				<button className="delete" onClick={this.props.delete}>borrar</button>
			</div>
		</div>

	}
}