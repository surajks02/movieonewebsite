
import React, { useContext, useEffect, useState } from "react";

export const API_KEY = `?api_key=55903b004b65252bf433fb4218601d2c`
export const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc&page=1`
export const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc&page=1&vote_average.gte=8.4`

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    //To display an error when the movie does not load
    const [isError, setIsError] = useState({ show: "false", msg: "" });
    const [query, setQuery] = useState('');

    useEffect(() => {
        let timeOut = setTimeout(() => {
            displayMovies(query);

        }, 800);
        //debouncing waiting before making an api call and if the user
        //comes back clearing the return function before the call
        return () => clearTimeout(timeOut);
    }, [query])



    // useEffect(() => {
    //     let timeOut = setTimeout(() => {
    //         getMovies(`${SEARCH_URL}&query=${query}`);

    //     }, 800);
    //     /
    //     return () => clearTimeout(timeOut);
    // }, [query])

    // this is to load the default page for the first time
     const displayMovies = async (query) => {
        if (query) {
            const url = `${SEARCH_URL}${query}`
            const res = await fetch(url)
            const data = await res.json()
            setMovie(data.results)
        }
        else {
            const url = `${API_URL}`
            const res = await fetch(url)
            const data = await res.json()
            setMovie(data.results)
        }

    }


    // We are passing the variable to all the children where we can access and update them
    return (<AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
        {children}
    </AppContext.Provider>);

};

//will be using this global context to access variables
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext }