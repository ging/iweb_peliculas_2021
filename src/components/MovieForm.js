import {Link} from "react-router-dom";
import { useParams } from "react-router";
import { useState } from "react";

export default function MovieForm(props) {
	const params = useParams();

	let defaultstate = props.new ? {titulo: "", director: "", miniatura: ""}:{...props.themovies.find(({id})=>{ return id===Number(params.movieId)})};
	const [movie, setMovie] = useState(defaultstate);
	
		return <div id="main">
 				<h2>Editar Película </h2>
				<div className="field">
					Título <br/>
					<input  type="text" id="titulo" placeholder="Título" value={movie.titulo} onChange={e=>setMovie({...movie, titulo: e.target.value})}></input>
				</div>
				<div className="field">
					Director <br/>
					<input  type="text" id="director" placeholder="Director" value={movie.director} onChange={e=>setMovie({...movie, director: e.target.value})}></input>
				</div>
				<div className="field">
					Miniatura <br/>
					<input  type="text" id="miniatura" placeholder="URL de la miniatura" value={movie.miniatura} onChange={e=>setMovie({...movie, miniatura: e.target.value})}></input>
				</div>
				<div className="actions">
					{props.new ?
						<button className="new" onClick={()=>props.create(movie)}>
						Crear
					</button> :
					<button className="update" onClick={()=>props.update(movie)}>
						Actualizar
					</button>}
					<Link to="/"><button className="index">Volver</button></Link>
				</div>
			</div>
}
