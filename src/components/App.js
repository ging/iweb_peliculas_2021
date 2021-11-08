import React from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import { myInitialMovies } from "../constants/constants";
import {postAPI, getAPI, updateAPI} from "../api";

import { Switch, Route} from "react-router-dom";
import { withRouter } from "react-router";


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			mymovies: [],
			nextid: 3,
			downloaded: null,
			uploaded: null
		};
	}


	render(){
		const {mymovies, downloaded, uploaded} = this.state;
		
	  	return (
					<div className="root">
						<Navbar/>
						{this.state.loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: <Switch>
								<Route path="/add">
									<MovieForm themovie={{}} create={this.create} new/>
								</Route>
								<Route path="/edit/:movieId">
									<MovieForm themovies={mymovies} update={this.update}/>
								</Route>
								<Route path="/show/:movieId">
									<MovieInfo themovies={mymovies} />
								</Route>
								<Route path="/">
								<Movies themovies={mymovies} delete={this.erase} download={this.download} upload={this.upload} reset={this.reset} downloaded={downloaded} uploaded={uploaded}/>
								</Route>
							</Switch>}
					</div>
	  );
	}

	update = (updatedmovie) => {
		this.setState({mymovies: this.state.mymovies.map((movie, index) => updatedmovie.id === movie.id ? updatedmovie : movie)});
		this.props.history.push('/');
	}

	erase = (idtoerase) => {
		this.setState({mymovies: this.state.mymovies.filter((movie) => movie.id !== idtoerase)});
		this.props.history.push('/');
	}	

	create = (movie)  => {
		movie.id = this.state.nextid;
		this.setState({mymovies: [...this.state.mymovies, movie], nextid: this.state.nextid + 1});
		this.props.history.push('/');
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
		this.setState({mymovies: myInitialMovies, downloaded: null, uploaded: null});
		this.props.history.push('/');
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

export default withRouter(App);