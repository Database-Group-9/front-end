import React from 'react';
import MovieList from '../components/movieList';
import extractSearchTerm from '../utils/extract-search-term';

export default class MovieListPage extends React.Component {

    render() {
        if (extractSearchTerm(this.props.location.search, 'page') !== undefined){
            return <div className="page">
                <MovieList 
                    path={this.props.location.pathname} 
                    page={extractSearchTerm(this.props.location.search, 'page')}/>
            </div>;
        }
        else {
                return <div className="page">
                    <MovieList 
                    path={this.props.location.pathname}
                    page={1}/>
                    </div>
        }
    }
}
