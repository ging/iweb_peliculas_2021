import Movie from './Movie';


export default function Movies(props) {
	return <div id="main">
		{props.peliculas.map((pelicula,index)=>
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
	</div>
}