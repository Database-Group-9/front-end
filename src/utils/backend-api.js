import Axios from 'axios';

const API = {
    getMovieList: () => {
        return fake;
    }
}


export default API;

const fake = [
    {
        name: 'Fake Movie 1',
        rating: '6.9',
        genres: ['Adventure', 'Action', 'Comedy'],
        tags: ['nice', 'Brad Pitt']
    },
    {
        name: 'Fake Movie 2',
        rating: '4.2',
        genres: ['Adventure', 'Action'],
        tags: ['bad', 'Arm Pitt']
    },
    {
        name: 'Fake Movie 3',
        rating: '7.9',
        genres: ['Thriller', 'Comedy'],
        tags: ['scary', 'Sand Pitt']
    },
    {
        name: 'Fake Movie 4',
        rating: '6.8',
        genres: ['Drama', 'Children'],
        tags: ['kid', 'Tough Brad']
    },
    {
        name: 'Fake Movie 5',
        rating: '9.3',
        genres: ['Drama', 'Action', 'Romance'],
        tags: ['rap', 'Pitt Bull']
    }
]