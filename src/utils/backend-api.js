import Axios from 'axios';

const base_url = 'http://localhost:3001/';
const API = {
    getMovieList: () => {
        return fake;
    },

    getGreetings: () => {
        return Axios.get(base_url);
    },

    getMovies: (page) => {
        // console.log(base_url + 'movies/?page='+page)
        return Axios.get(base_url + 'movies/?page='+page)
    },

    getFake: () => {
        return fake;
    },

    getSingleMovie: () => {
        return Axios.get(base_url + 'movie')
    },

    getNumberOfPage: () => {
        return Axios.get(base_url + 'totalRows')
    },

    getGenre: () => {
        return genre;
    }
}


export default API;

const genre= [
    {
        genreid:1,
        genre: 'Adventure',
    },
    {
        genreid:2,
        genre:'Romance',
    }
]
const fake = [
    {
        movieid: 1,
        title: 'Fake Movie 1',
        year: '1995',
        rating: '6.9',
        genres: ['Adventure', 'Action', 'Comedy'],
        tags: ['nice', 'Brad Pitt']
    },
    {
        movieid: 2,
        title: 'Fake Movie 2',
        year: '1995',
        rating: '4.2',
        genres: ['Adventure', 'Action'],
        tags: ['bad', 'Arm Pitt']
    },
    {
        movieid: 3,
        title: 'Fake Movie 3',
        year: '1995',
        rating: '7.9',
        genres: ['Thriller', 'Comedy'],
        tags: ['scary', 'Sand Pitt']
    },
    {
        movieid: 4,
        title: 'Fake Movie 4',
        year: '1995',
        rating: '6.8',
        genres: ['Drama', 'Children'],
        tags: ['kid', 'Tough Brad']
    },
    {
        movieid: 5,
        title: 'Fake Movie 5',
        year: '1995',
        rating: '9.3',
        genres: ['Drama', 'Action', 'Romance'],
        tags: ['rap', 'Pitt Bull']
    }
]