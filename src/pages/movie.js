import React from 'react';
import Movie from '../components/movie';

export default class MoviePage extends React.Component {
    render() {
        return <div className="page">
        <Movie/>
    </div>;
    }
}