import React from 'react';
import MovieList from '../components/movieList';
import extractSearchTerm from '../utils/extract-search-term';

export default class MovieListPage extends React.Component {

    render() {
        if (extractSearchTerm(this.props.location.search, 'page') !== undefined){
            return <div className="page">
                <MovieList 
                    path={this.props.location.pathname} 
                    page={extractSearchTerm(this.props.location.search, 'page')}
                    title={extractTitle(this.props.location.search)}
                    req = {this.props.location.search}/>
            </div>;
        }
        else {
                return <div className="page">
                    <MovieList 
                    path={this.props.location.pathname}
                    title={extractTitle(this.props.location.search)}
                    page={1}/>
                    </div>
        }
    }
}

function extractTitle(str){
    const arr = str.split('?')[1].split('&')
    for (let i = 0; i < arr.length; i++){
        const left = arr[i].split('=')[0]
        if (left === 'filterBy'){
            return 1
        }
    }
    return 0
}