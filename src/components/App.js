import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Movies from "./Movies";
import MovieInfo from "./MovieInfo";
import MovieForm from "./MovieForm";
import { myInitialMovies } from "../constants/constants";
import {postAPI, getAPI, updateAPI} from "../api";

import { Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";


export default function App() {
	const [loading, setLoading] = useState(true);
	const [mymovies, setMymovies] = useState([]);
	const [nextid, setNextid] = useState(3);
	const [downloaded, setDownloaded] = useState(null);
	const [uploaded, setUploaded] = useState(null);

	const navigate = useNavigate();

	const update = (updatedmovie) => {
		setMymovies(mymovies.map((movie, index) => updatedmovie.id === movie.id ? updatedmovie : movie));
		navigate('/');
	}

	const erase = (idtoerase) => {
		setMymovies(mymovies.filter((movie) => movie.id !== idtoerase));
		navigate('/');
	}	

	const create = (movie)  => {
		movie.id = nextid;
		setMymovies([...mymovies, movie]);
		setNextid(nextid + 1);
		navigate('/');
	}

	const download = async () => {
		let downloadedMovies = await getAPI();
		setMymovies(downloadedMovies);
		setDownloaded(new Date());
	}

	const upload = async () => {
		await updateAPI(mymovies);
		setUploaded( new Date());
	}

	const reset = () => {
		setMymovies(myInitialMovies);
		setDownloaded(null);
		setUploaded(null);
		navigate('/');
	}

	useEffect(() => {
    async function fetchData() {
      try {
				if (!localStorage.URL || localStorage.URL === "undefined") {
					localStorage.URL = await postAPI(myInitialMovies);
					setMymovies(myInitialMovies);
				} else {
					await download();
				}
				setTimeout(()=>{
					setLoading(false);
				},500);	
				
			} catch(e) {
				alert("ERROR");
			}
    }

    fetchData();
  }, []);
	
	  	return (
					<div className="root">
						<Navbar/>
						{loading ? <img src={process.env.PUBLIC_URL + "/spinner.gif"} className="spinner" alt="spinner" />: <Routes>
								<Route path="/add" element={<MovieForm themovie={{}} create={create} new/>}/>
								<Route path="/edit/:movieId"element={<MovieForm themovies={mymovies} update={update}/>}/>
								<Route path="/show/:movieId" element={<MovieInfo themovies={mymovies} />}/>
								<Route path="/"element={<Movies themovies={mymovies} delete={erase} download={download} upload={upload} reset={reset} downloaded={downloaded} uploaded={uploaded}/>}/>
							</Routes>}
					</div>
	  );
	}


