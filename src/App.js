import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './views/Main.js';
import Search from './views/Search.js';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' render={props => <Main {...props} />} />
          <Route path='/search' render={props => <Search {...props}/>}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}
export default App;
