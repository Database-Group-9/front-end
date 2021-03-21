import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';
// import Main from './views/Main.js';
// import Search from './views/Search.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MoviePage from './pages/movie';
import MovieListPage from './pages/movie-list';
import PopularMoviesPage from './pages/popular-movies';
import PolarisingMoviesPage from './pages/polarising-movies';
import history from './utils/history'
import Navbar from './components/header'
import filteredPage from './pages/filtered'
import PredictPage from './pages/predict'

function App() {
    return (
        <div className = "App">
            <div className = "page-container">
                <Router history={history}>
                    <Route component={Navbar}/>
                    <Switch>
                        <Route path="/polarising" component={PolarisingMoviesPage}/>
                        <Route path="/predict" component={PredictPage}/>
                        <Route path="/popular" component={PopularMoviesPage}/>
                        <Route path="/movie" component={MoviePage}/>
                        <Route path="/filtered" component={filteredPage}/>
                        <Route path="/" component={MovieListPage}/>
                        <Route>
                            {/* Error */}
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
