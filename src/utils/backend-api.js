import Axios from 'axios';

const base_url = 'http://localhost:3001/';
const API = {

    getGreetings: () => {
        return Axios.get(base_url);
    },

    getMovies: (page) => {
        if (page ===undefined){
            page ='?page=1'
        }
        return Axios.get(base_url + 'movies'+page)
    },

    getFiltered: (q) =>{
        // console.log(base_url+ 'movies/filtered'+q)
        return Axios.get(base_url + 'movies/filtered'+q)
    },

    getSingleMovie: (movieId) => {
        return Axios.get(base_url + 'movie?movieId=' + movieId)
    },

    getNumberOfPage: () => {
        return Axios.get(base_url + 'totalRows')
    },

    getGenre: () => {
        return Axios.get(base_url + 'genres')
    },

    getTags: () => {
        return Axios.get(base_url + 'tags')
    },

    getYear: () => {
        return Axios.get(base_url + 'years')
    },

    getRatingPredictions: (data) =>{
        return Axios.get(base_url + 'predict/ratings?' + data)
    },

    getPersonalityPredictions: (data) =>{
        return Axios.get(base_url + 'predict/personality?' + data)
    },

    getPopularMovies: (page) => {
        if (page ===undefined){
            page =1
        }
        return Axios.get(base_url + 'movies/popular?page='+page)
    },

    getPolarisingMovies: (page) => {
        if (page ===undefined){
            page =1
        }
        return Axios.get(base_url + 'movies/polarising?page='+page)
    }
}


export default API;