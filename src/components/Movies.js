import Movie from './Movie';


export default function Movies(props) {
	return <div id="main">
		{props.themovies.map((pelicula,index)=>
			<Movie 
				edit={()=>props.edit(index)}
				show={()=>props.show(index)}
				delete={()=>props.delete(index)}
				titulo={pelicula.titulo} 
				director={pelicula.director} 
				miniatura={pelicula.miniatura} />)}
		<div className="actions">
            <button className="new" onClick={props.newMovie}>Añadir</button>
            <button className="down" onClick={props.download}>Download</button>
            <button className="up" onClick={props.upload}>Upload</button>
            <button className="reset" onClick={props.reset}>Reset</button>
    </div>
		<div>
			<ul>INFO:
				{props.downloaded ? <div className=""><li>Peliculas descargadas de {localStorage.URL} a las {props.downloaded.toString()}.</li></div>:null}
				{props.uploaded ? <div className=""><li>Peliculas subidas a {localStorage.URL} a las {props.uploaded.toString()}.</li></div>:null}
			</ul>
		</div>
	</div>
}