import axios from "axios";
import 'dotenv/config';
import express from 'express';
import { Movie } from "../models/Movie";

const router = express.Router();
const api_key = process.env.IMDB_API_KEY;

const LRU = require("lru-cache")
    , options = {
        max: 500
        , maxAge: 1000 * 60 * 60
    }
    , cache = new LRU(options)
    // @ts-ignore
    , otherCache = new LRU(10); // sets just the max size
// Get data for multiple movies by specified title from the client
router.get('/', async (_req, res) => {
        const initMoviesIds = [
            'tt4448662', //'Mr bean Funeral'
            'tt7286456', //'Joker'
            'tt2179136', //'american sniper'
            'tt0960144', //'You Don't Mess with the Zohan'
            'tt0460745', //'Chaos Theory'
            'tt2357129', //'Jobs'
            'tt2872732', //'Lucy'
            'tt0361748', //'Inglourious Basterds'
            'tt6334354', //'The Suicide Squad'
            'tt1219289', //'Limitless'
        ];

        // If movies exist in cache
        if (cache.get('initMovies')) {
            return res.send(cache.get('initMovies'));
        }
        // If not in cache, get them
        let movieResults = [];
        for (const id of initMoviesIds) {
            const initMoviesUrl = `http://www.omdbapi.com/?apikey=${ api_key }&i=${ id }`;

            const { data }: Movie = await axios.get(initMoviesUrl);
            const title = data.Title;
            const img = data.Poster;

            movieResults.push({
                title,
                img,
                id
            });
        }
        cache.set('initMovies', movieResults);
        return res.send(movieResults);
    }
);

module.exports = router;