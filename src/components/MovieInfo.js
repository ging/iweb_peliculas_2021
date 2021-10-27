
export default function MovieInfo(props) {
	return (<div id="main">
		<p>
		   La película <b> {props.pelicula.titulo} </b> fue 
		   dirigida por <b> {props.pelicula.director}</b>!
		</p>
		<button className="index" onClick={props.main}>Volver</button>`
	</div>)
}