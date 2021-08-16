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
}, cache = new LRU(options), otherCache = new LRU(10);
router.get('/', async (_req, res) => {
    const initMoviesIds = [
        'tt4448662',
        'tt7286456',
        'tt2179136',
        'tt0960144',
        'tt0460745',
        'tt2357129',
        'tt2872732',
        'tt0361748',
        'tt6334354',
        'tt1219289',
    ];
    if (cache.get('initMovies')) {
        return res.send(cache.get('initMovies'));
    }
    let movieResults = [];
    for (const id of initMoviesIds) {
        const initMoviesUrl = `http://www.omdbapi.com/?apikey=${api_key}&i=${id}`;
        const { data } = await axios_1.default.get(initMoviesUrl);
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
});
module.exports = router;
//# sourceMappingURL=initMoviesRoute.js.map