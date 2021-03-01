import React from 'react';
import MovieList from '../components/movieList';

export default class MovieListPage extends React.Component {
    render() {
        return <div className="page">
        <MovieList/>
    </div>;
    }
}