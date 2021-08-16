import Movies from "../components/Movies";
import Search from "../components/Search";
import axios from "axios";
import { useState } from "react";
import { ErrorModal } from "../components/ErrorModal";
import { Container } from "react-bootstrap";

function Home() {
    const [ initMovies, setInitMovies ] = useState([])
    const [ movies, setMovies ] = useState([]);
    const [ searchValue, setSearchValue ] = useState('')
    // Get init Favorite Movies
    const getInitMoviesData = async () => {
        const { data } = await axios.get("http://localhost:3005/getInitMovies");
        setInitMovies(data)
        return data;
    };
    // Movie search by title
    const searchMovie = async ( value, page ) => {
        // Handle pages
        const { data } = await axios.get(`http://localhost:3005/search/movie/${ value }&page=${ page }`)
        // If error, alert the client
        if (data.error) return ErrorModal(data.error)
        // If movies already exist in Cache
        if (data.movieResult) {
            return data.movieResult
        }
        setInitMovies(null)
        return data
    }
    // Search movie by id
    const searchMovieById = async ( id ) => {
        const { data } = await axios.get(`http://localhost:3005/search/${ id }`)
        return data
    }
    return (
        <Container>
            <Search
                searchValue={ searchValue }
                setSearchValue={ setSearchValue }
                searchMovie={ searchMovie }
                setMovies={ setMovies }
            />
            <br/>
            {
                // Only if InitMovies displayed
                initMovies ? <h2>Favorite Movies</h2> : ''
            }
            <Movies
                getInitMoviesData={ getInitMoviesData }
                searchValue={ searchValue }
                searchMovie={ searchMovie }
                searchMovieById={ searchMovieById }
                movies={ movies }
                setMovies={ setMovies }
            />
        </Container>
    );
}

export default Home;
