import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { API_KEY } from './context';
const MovieDetails = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);


    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data.results);
            // console.log(res.status, "this is the status")
            if (res.status === 200) {
                setIsLoading(false);
                setMovie(data);
                // console.log(data)
            }
        } catch (error) {
            console.log(error);
        }

    }
    //to display the the movies that are present
    // useEffect(() => {
    //     let timeOut = setTimeout(() => {
    //         getMovies(`${SEARCH_URL}&query=${query}`);

    //     }, 800);
    //     return () => clearTimeout(timeOut);
    // }, [query])
    //Retrieving data according to the id 
    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMovies(`https://api.themoviedb.org/3/movie/${id}${API_KEY}`);

        }, 800);
        return () => clearTimeout(timeOut);
    }, [id]);
    //conditional statement to show the loading screen 
    if (isLoading) {
        return (
            <div className='movie-section'>
                <div className='loading'>Loading...</div>

            </div>
        );
    }
    return (
        <>
            <section className='movie-section'>
                <div className='movie-card'>
                    <figure>
                        <img src={'https://image.tmdb.org/t/p/original' + movie.backdrop_path} />
                    </figure>
                    <div className='card-content'>
                        <p className='title'>{movie.original_title}</p>
                        <p className='card-text tag-line'>{movie.tagline}</p>
                        <p className='card-text'>Ratings : {movie.vote_average}/10</p>
                        <p className='card-text'>Vote Count : {movie.vote_count}</p>
                        <p className='card-text'>Release Date : {movie.release_date}</p>

                        <NavLink to="/" className='back-btn'>Go Back</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MovieDetails