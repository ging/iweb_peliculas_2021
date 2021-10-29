import React from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import { myInitialMovies } from "../constants/constants";
import {postAPI, getAPI, updateAPI} from "../api";

import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			mymovies: [],
			downloaded: null,
			uploaded: null
		};
	}


	render(){
		const {mymovies, downloaded, uploaded} = this.state;
		
	  	return (
	    <div className="root">
	      <Navbar/>
				{this.state.loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: <Router>
					<Switch>
						<Route path="/add">
							<MovieForm themovie={{}} main={this.main} create={this.create} new/>
						</Route>
						<Route path="/edit/:movieId">
							<MovieForm themovies={mymovies} main={this.main} update={this.update}/>
						</Route>
						<Route path="/show/:movieId">
							<MovieInfo themovies={mymovies} main={this.main}/>
						</Route>
						<Route path="/">
						<Movies themovies={mymovies} show={this.show} edit={this.edit} newMovie={this.newm} delete={this.erase} download={this.download} upload={this.upload} reset={this.reset} downloaded={downloaded} uploaded={uploaded}/>
						</Route>
        	</Switch>
					</Router>}
	    </div>
	  );
	}

	update = (updatedmovie) => {
		this.setState({view: "MAIN", current: null, mymovies: this.state.mymovies.map((movie, index) => this.state.current === index ? updatedmovie : movie)});
	}

	erase = (indextoerase) => {
		this.setState({view: "MAIN", current: null, mymovies: this.state.mymovies.filter((movie, index) => index !== indextoerase)});
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


