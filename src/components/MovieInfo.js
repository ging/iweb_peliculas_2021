import {Link, useParams} from "react-router-dom";

export default function MovieInfo(props) {
	let { movieId } = useParams();
	return (<div id="main">
		<p>
		   La película <b> {props.themovies.find(({id})=>{ return id===Number(movieId)}).titulo} </b> fue 
		   dirigida por <b> {props.themovies.find(({id})=>{ return id===Number(movieId)}).director}</b>!
		</p>
		<Link to="/"><button className="index">Volver</button></Link>
	</div>)
}