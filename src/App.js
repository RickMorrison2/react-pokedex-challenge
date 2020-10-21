import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Container from './SearchAndListContainer';
import Home from './Home';

function App() {
  return (
    <div className="App">
       <Switch>
          <Route path="/search" component={Container} />
          <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;
