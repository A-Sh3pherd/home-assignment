import axios from 'axios';
import 'dotenv/config';
import express from 'express';
import { Movie, MovieSearch } from '../models/Movie';

const router = express.Router();
const api_key = process.env.IMDB_API_KEY;
// Cache stuff
const LRU = require("lru-cache")
    , options = {
    max: 500
    , maxAge: 1000 * 60 * 60
}
    , cache = new LRU(options);
// Get data for multiple movies by specified title from the client
router.get('/movie/:multiple', async (req, res) => {
    const { multiple } = req.params;
    const multipleMoviesUrl = `http://www.omdbapi.com/?apikey=${ api_key }&s=${ multiple }&plot=Full`;
    // Checking if its in the searched movies are in the cache
    if (cache.get(`${ multiple }`)) {
        // Get current page
        return res.send(cache.get(`${ multiple }`));
    } else {
        //  If not in cache, send a request and set desired movies in the cache
        const { data }: MovieSearch = await axios.get(multipleMoviesUrl);
        // Calculate amount of pages to display
        const totalResults = Number(data.totalResults);
        const pages = Math.floor(totalResults / 10);
        console.log(`total results: ${ totalResults } Pages: ${ pages }`);
        // If error, send client the message
        if (data.Response !== 'True') return res.send({ error: data.Error });
        // Loop through movies and get desired data
        const movieResult = [];
        for (let i = 0; i < data.Search.length; i++) {
            movieResult.push({
                title: data.Search[i].Title,
                img: data.Search[i].Poster,
                id: data.Search[i].imdbID
            });
        }
        cache.set(`${ multiple }`, movieResult);
        return res.send({ movieResult, pages });
    }
});

// Find movie by specific id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const url = `http://www.omdbapi.com/?apikey=${ api_key }&i=${ id }&plot=Full`;
    // Check if movie is already in the cache
    if (cache.get(id)) {
        res.send(cache.get(`${ id }`));
    } else {
        //  If not in cache, send a request and set desired movie and store in the cache
        const { data }: Movie = await axios.get(url);
        // send wanted data
        const title = data.Title;
        const rating = data.imdbRating;
        const description = data.Plot;
        const image = data.Poster;
        const actors = data.Actors;
        const genre = data.Genre;
        const published = data.Released;
        console.log('Setting the movie in cache');
        cache.set(`${ id }`, { title, rating, description, image, actors, genre, published });
        res.send({ title, rating, description, image, actors, genre, published });
    }
});

module.exports = router;