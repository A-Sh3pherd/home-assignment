import cors from 'cors';
import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());
// 
const port = process.env.PORT || 3005;
// Routes
const movieRoute = require('./routes/search');
const initMoviesRoute = require('./routes/initMoviesRoute');
//
app.use('/getInitMovies', initMoviesRoute);
app.use('/search', movieRoute);

app.listen(port, () => {
    console.log(`Server up on port ${ port }`);
});
