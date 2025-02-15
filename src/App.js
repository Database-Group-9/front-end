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
import history from './utils/history'
import Navbar from './components/header'

function App() {
    return (
        <div className = "App">
            <div className = "page-container">
                <Router history={history}>
                    <Route component={Navbar}/>
                    <Switch>
                        <Route path="/movie" component={MoviePage}/>
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

// export default App;
// function App(){
//   return (
//     <BrowserRouter>
//       <div>
//         <Switch>
//           <Route exact path='/' render={props => <Main {...props} />} />
//           <Route path='/search' render={props => <Search {...props}/>}/>
//         </Switch>
//       </div>
//     </BrowserRouter>
//   )
// }
export default App;
