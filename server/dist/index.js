"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
const port = process.env.PORT || 3005;
const movieRoute = require('./routes/search');
const initMoviesRoute = require('./routes/initMoviesRoute');
app.use('/getInitMovies', initMoviesRoute);
app.use('/search', movieRoute);
app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});
//# sourceMappingURL=index.js.map