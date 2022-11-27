import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from "./context";
const Movies = () => {
    const { movie } = useGlobalContext();
    return (
        <>
            <section className='movie-page'>
                <div className='container grid grid-4-col'>

                    {movie.map((currMovie) => {
                        // destructuring to get the variable values
                        const { id, original_title, poster_path, backdrop_path } = currMovie;
                        // const prefix = "https://image.tmdb.org/t/p/original";
                        // console.log(typeof (backdrop_path), 'this is the path')
                        const movieName = original_title.substring(0, 16);
                        //if the movie name is too long them cutting it of to show 16 charaters only
                        return (
                            //it's all under the navlink to make it clickable
                            //and passing the id to grab it in the single page view
                            <NavLink to={`movie/${id}`} key={id} >
                                <div className='card'>
                                    <div className='card-info'>
                                        <h2>{movieName.length > 16 ? `${movieName}...` : original_title}</h2>
                                        <img src={"https://image.tmdb.org/t/p/original" + poster_path} alt={id} />

                                    </div>
                                </div>

                            </NavLink>
                        )
                    })}
                </div>
            </section>
        </>

    )
}

export default Movies