import React from 'react';
import Movie from '../components/movie';
import extractSearchTerm from '../utils/extract-search-term';


export default class MoviePage extends React.Component {
    render() {
        return( 
        <div className="page">
            <Movie movieId={extractSearchTerm(this.props.location.search, 'movieid')}/>
        </div>
        )
    }
}