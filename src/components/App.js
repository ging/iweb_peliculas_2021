import React from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import { myInitialMovies } from "../constants/constants";
import {postAPI, getAPI, updateAPI} from "../api";

import es from '../lang/es.json';
import en from '../lang/en.json';

const dictionaryList = { en, es };

export const LangContext = React.createContext({userLang: 'es', dictionary: es});

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			mymovies: [],
      current: null,
      view: "MAIN",
			downloaded: null,
			uploaded: null,
			lang: 'en'
		};
	}


	render(){
		const {current, mymovies, view, downloaded, uploaded} = this.state;
		let vista = null;
    switch(view) {
      case "MAIN":
        vista = <Movies themovies={mymovies} show={this.show} edit={this.edit} newMovie={this.newm} delete={this.erase} download={this.download} upload={this.upload} reset={this.reset} downloaded={downloaded} uploaded={uploaded}/>;
        break;
      case "SHOW":
        vista = <MovieInfo themovie={mymovies[current]} main={this.main}/> ;
        break;
			case "EDIT":
				vista = <MovieForm themovie={mymovies[current]} main={this.main} update={this.update}/>;
				break;
			case "NEW":
				vista = <MovieForm themovie={{}} main={this.main} create={this.create} new/>;
				break;
      default:
        vista = <Movies themovies={mymovies} show={this.show} edit={this.edit} newMovie={this.newm} delete={this.erase} download={this.download} upload={this.upload} reset={this.reset}/>;
    }
	  	return (
	    <div className="root">
				<LangContext.Provider value={{handleLanguageChange: this.handleLanguageChange, userLang: this.state.lang, dictionary: dictionaryList[this.state.lang]}}>
	      	<Navbar/>
					{this.state.loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: vista }
				</LangContext.Provider>
	    </div>
	  );
	}

	handleLanguageChange = (event) => {
		this.setState({lang: event.target.value});
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
		this.setState({view: "MAIN", current: null, mymovies: this.state.mymovies.map((movie, index) => this.state.current === index ? updatedmovie : movie)});
	}

	erase = (indextoerase) => {
		this.setState({view: "MAIN", current: null, mymovies: this.state.mymovies.filter((movie, index) => index !== indextoerase)});
	}	

	newm = (movie) => {
		this.setState({view: "NEW", current: null});
	}	

	create = (movie)  => {
		this.setState({view: "MAIN", current: null, mymovies: [...this.state.mymovies, movie]});
	}

	download = async () => {
		let downloadedMovies = await getAPI();
		this.setState({mymovies: downloadedMovies, downloaded: new Date()});
	}

	upload = async () => {
		await updateAPI(this.state.mymovies);
		this.setState({uploaded: new Date()});
	}

	reset = () => {
		this.setState({view: "MAIN", current: null, mymovies: myInitialMovies, downloaded: null, uploaded: null});
	}

	async componentDidMount(){
		try {
			if (!localStorage.URL || localStorage.URL === "undefined") {
			  localStorage.URL = await postAPI(myInitialMovies);
				this.setState({mymovies: myInitialMovies});
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


