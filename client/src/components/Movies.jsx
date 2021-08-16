import { useEffect, useState } from 'react';
import { Col, Pagination, Row } from "react-bootstrap";
import { MovieModal } from "./MovieModal";

const Movies = ( {
                     searchValue,
                     getInitMoviesData,
                     searchMovieById,
                     movies,
                     setMovies,
                     searchMovie,
                 } ) => {
        const [ currentPage, setCurrentPage ] = useState(1)
        // Search movie by ID
        const handleMovieSearch = async ( id ) => {
            const movie = await searchMovieById(id);
            console.log(movie)
            MovieModal(movie.title, movie.rating, movie.image, movie.description, movie.actors, movie.published)
        }
        // Get 10 popular Movies onload
        useEffect(() => {
            getInitMoviesData()
                .then(moviesData => {
                    console.log(moviesData)
                    setMovies(moviesData)
                })
                .catch(e => console.log(e))
        }, []);

        return (
            <>
                <Row>
                    { movies && movies.map(movie => (
                        <Col key={ movie.id }>
                            <img
                                src={ movie.img }
                                alt={ movie.id }
                                className='mb-4'
                                style={ {
                                    width: 300,
                                    height: 400,
                                } }
                                onClick={ async () => handleMovieSearch(movie.id) }
                            />
                        </Col>
                    ))
                    }
                </Row>
                {/* Handling Pagination */ }
                { movies && <Pagination className='d-flex justify-content-center mt-5'>
                    <Pagination.Prev onClick={ async () => {
                        const previousMovies = await searchMovie(searchValue, currentPage - 1)
                        setCurrentPage(currentPage - 1)
                        setMovies(previousMovies)
                    }
                    }/>
                    <Pagination.Item active>{ currentPage }</Pagination.Item>
                    <Pagination.Next onClick={ async () => {
                        const nextPage = await searchMovie(searchValue, currentPage + 1)
                        setCurrentPage(currentPage + 1)
                        setMovies(nextPage)
                    }
                    }/>
                </Pagination> }
            </>
        );
    }
;

export default Movies;
