import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";

function Search( { searchValue, setSearchValue, searchMovie, setMovies } ) {

    // useEffect(() => {
    //     console.log(searchValue);
    // }, [ searchValue ]);

    return (
        <Row className="mt-5 ">
            <Col lg={ "12" } sm={ "12" } md={ "12" } className="d-flex justify-content-center">
                <ButtonGroup>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        onChange={ ( e ) => setSearchValue(e.target.value) }
                    />
                    <Button type='button' onClick={ async () => {
                        const movies = await searchMovie(searchValue, 1)
                        movies && setMovies(movies)
                    }
                    }>
                        Search
                    </Button>
                </ButtonGroup>
            </Col>
        </Row>
    );
}

export default Search;
