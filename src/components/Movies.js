import Movie from './Movie';
import {Link} from "react-router-dom";


export default function Movies(props) {
	return <div id="main">
		{Object.keys(props.themovies).map(function(key, index) {
			let pelicula = props.themovies[key];
			return <Movie 
			  key={index}
				edit={()=>props.edit(key)}
				show={()=>props.show(key)}
				delete={()=>props.delete(key)}
				id={key}
				titulo={pelicula.titulo} 
				director={pelicula.director} 
				miniatura={pelicula.miniatura} />})}
		<div className="actions">
						<Link to="/add"><button className="new">Añadir</button></Link>
            <button className="down" onClick={props.download}>Descargar</button>
            <button className="up" onClick={props.upload}>Subir</button>
            <button className="reset" onClick={props.reset}>Reiniciar</button>
    </div>
		<div>
			<ul>INFO:
				{props.downloaded ? <div className=""><li>Peliculas descargadas de {localStorage.URL} a las {props.downloaded.toString()}.</li></div>:null}
				{props.uploaded ? <div className=""><li>Peliculas subidas a {localStorage.URL} a las {props.uploaded.toString()}.</li></div>:null}
			</ul>
		</div>
	</div>
}