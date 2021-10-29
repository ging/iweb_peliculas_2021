import React from 'react';
import { LangContext } from "./App";

export default class Movie extends React.Component {
	render(){
		return <div className="movie">
			<div className="movie-img">
				<img className="show" src={process.env.PUBLIC_URL + "/" +this.props.miniatura} alt="miniatura de la película"/>
			</div>
			<div className="title">
			 	{this.props.titulo || <em>Sin título</em>}
			</div>
			<LangContext.Consumer>
				{(context) => {
					return <div className="actions">
									<button className="show" onClick={this.props.show}>{context.dictionary["view"]}</button>
									<button className="edit" onClick={this.props.edit}>{context.dictionary["edit"]}</button>
									<button className="delete" onClick={this.props.delete}>{context.dictionary["delete"]}</button>
								</div>
					}
				}		
			</LangContext.Consumer>			
		</div>

	}
}