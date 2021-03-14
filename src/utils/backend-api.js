import Axios from 'axios';

const base_url = 'http://localhost:3001/';
const API = {

    getGreetings: () => {
        return Axios.get(base_url);
    },

    getMovies: (page) => {
        // if(filterBy === 'title'){
        //     console.log(base_url + + 'movies?filterBy='+filterBy+'&filter='+title)
        //     return Axios.get(base_url + `movies?filterBy=${filterBy}&filter=${title}`)
        // }
        // if (page ===undefined){
        //     page =1
        // }
        console.log(base_url + 'movies'+page)
        return Axios.get(base_url + 'movies'+page)
    },

    getFiltered: (q) =>{
        console.log(base_url+ 'movies/filtered'+q)
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

    getYear: () => {
        return Axios.get(base_url + 'years')
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