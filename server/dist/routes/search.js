"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const api_key = process.env.IMDB_API_KEY;
const LRU = require("lru-cache"), options = {
    max: 500,
    maxAge: 1000 * 60 * 60
}, cache = new LRU(options);
router.get('/movie/:multiple', async (req, res) => {
    const { multiple } = req.params;
    const multipleMoviesUrl = `http://www.omdbapi.com/?apikey=${api_key}&s=${multiple}&plot=Full`;
    if (cache.get(`${multiple}`)) {
        return res.send(cache.get(`${multiple}`));
    }
    else {
        const { data } = await axios_1.default.get(multipleMoviesUrl);
        const totalResults = Number(data.totalResults);
        const pages = Math.floor(totalResults / 10);
        console.log(`total results: ${totalResults} Pages: ${pages}`);
        if (data.Response !== 'True')
            return res.send({ error: data.Error });
        const movieResult = [];
        for (let i = 0; i < data.Search.length; i++) {
            movieResult.push({
                title: data.Search[i].Title,
                img: data.Search[i].Poster,
                id: data.Search[i].imdbID
            });
        }
        cache.set(`${multiple}`, movieResult);
        return res.send({ movieResult, pages });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const url = `http://www.omdbapi.com/?apikey=${api_key}&i=${id}&plot=Full`;
    if (cache.get(id)) {
        res.send(cache.get(`${id}`));
    }
    else {
        const { data } = await axios_1.default.get(url);
        const title = data.Title;
        const rating = data.imdbRating;
        const description = data.Plot;
        const image = data.Poster;
        const actors = data.Actors;
        const genre = data.Genre;
        const published = data.Released;
        console.log('Setting the movie in cache');
        cache.set(`${id}`, { title, rating, description, image, actors, genre, published });
        res.send({ title, rating, description, image, actors, genre, published });
    }
});
module.exports = router;
//# sourceMappingURL=search.js.map