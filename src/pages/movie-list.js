import React from 'react';
import MovieList from '../components/movieList';
import extractSearchTerm from '../utils/extract-search-term';

export default class MovieListPage extends React.Component {

    render() {
        if(this.props.location.pathname === '/filter'){
            // console.log('filteredByGenre?' + this.props.location.search.split('&').slice(1).join('&'))
            return <MovieList 
            path={this.props.location.pathname} 
            page={extractSearchTerm(this.props.location.search, 'page')} 
            genres={extractGenres(this.props.location.search)}
            actualreq = {this.props.location.search}
            req={checkgenre(this.props.location.search,extractGenres(this.props.location.search))}/>
        }
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

function extractGenres(str){
    const arr = str.split('?')[1].split('&')
    var genres = []
    for (let i = 0; i < arr.length;i++){
        const a = arr[i].split('=')
        if (a[0] === 'genre'){
            genres.push(a[1])
        }
    }
    return genres
}

function checkgenre(str,arr){
    if (arr.length == 0){
        console.log(str.split('&').slice(1).join('&'))
        return str
    }
    console.log('filteredByGenre?' + str.split('&').slice(1).join('&'))
    return 'filteredByGenre?' + str.split('&').slice(1).join('&')
}
