import React from 'react';
import ReportedMovieList from '../components/reportedMovieList';
import extractSearchTerm from '../utils/extract-search-term';

export default class PopularMoviesPage extends React.Component{
    render(){
        if (extractSearchTerm(this.props.location.search, 'page') !== undefined){
            return <div className="page">
                <ReportedMovieList 
                    settings='popular'
                    path={this.props.location.pathname} 
                    page={extractSearchTerm(this.props.location.search, 'page')}/>
            </div>;
        }
        else {
                return <div className="page">
                    <ReportedMovieList 
                    settings='popular'
                    path={this.props.location.pathname}
                    page={1}/>
                    </div>
        }
    }
}