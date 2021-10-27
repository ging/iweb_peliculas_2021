import React from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import { misPeliculasIniciales } from "../constants/constants";
import {postAPI, getAPI, updateAPI} from "../api";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			peliculas: [],
      current: null,
      view: "MAIN"
		};
	}


	render(){
		const {current, peliculas, view} = this.state;
		const peliculaSeleccionada = (typeof current === "number") && current >= 0;

	  	return (
	    <div className="root">
	      <Navbar/>
	      {this.state.loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: <div>
		      {(!peliculaSeleccionada && view === "MAIN") ?  
		      	<Movies peliculas={peliculas} show={this.show} edit={this.edit} newMovie={this.newm} delete={this.erase} download={this.download} upload={this.upload} reset={this.reset}/> : null}
		      {( peliculaSeleccionada && view === "SHOW") ? 
		      	<MovieInfo pelicula={peliculas[current]} main={this.main}/> : null}
		   	  {( peliculaSeleccionada && view === "EDIT") ? 
		   	  	<MovieForm pelicula={peliculas[current]} main={this.main} update={this.update}/> : null}
		   	  {(!peliculaSeleccionada && view === "NEW")  ? 
		   	  	<MovieForm pelicula={{}} main={this.main} create={this.create} new/> : null}
		   	 </div>}
	    </div>
	  );
	}

	show = (index) => {
		this.setState({view: "SHOW", current: index});
	}

	main = () => {
		this.setState({view: "MAIN", current: null});
	}

	edit = (index) => {
		this.setState({view: "EDIT", current: index});
	}

	update = (updatedmovie) => {
		this.setState({view: "MAIN", current: null, peliculas: this.state.peliculas.map((movie, index) => this.state.current === index ? updatedmovie : movie)});
	}

	erase = (indextoerase) => {
		this.setState({view: "MAIN", current: null, peliculas: this.state.peliculas.filter((movie, index) => index !== indextoerase)});
	}	

	newm = (movie) => {
		this.setState({view: "NEW", current: null});
	}	

	create = (movie)  => {
		this.setState({view: "MAIN", current: null, peliculas: [...this.state.peliculas, movie]});
	}

	download = async () => {
		let peliculas = await getAPI();
		this.setState({peliculas: peliculas});
	}

	upload = async () => {
		await updateAPI(this.state.peliculas);
	}

	reset = () => {
		this.setState({view: "MAIN", current: null, peliculas: misPeliculasIniciales});
	}

	async componentDidMount(){
		try {
			if (!localStorage.URL || localStorage.URL === "undefined") {
			  localStorage.URL = await postAPI(misPeliculasIniciales);
				this.setState({peliculas: misPeliculasIniciales});
			} else {
				await this.download();
			}
			setTimeout(()=>{
				this.setState({loading: false});
			},500);	
			
		} catch(e) {
			alert("ERROR");
		}

	}

}


