import React from 'react'
import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav"
import Pokemon from "./components/Pokemon"
import Pokedex from "./components/Pokedex"
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

class App extends React.Component{
render() {

  return (
    <div className="App">
      <header>
        <Router>
          <Nav />
          <Route path="/pokedex" component={Pokedex} />
          <Route path="/pokemon/:id" component={Pokemon} />
        </Router>
      </header>  
    </div>
  );
}
}


export default App;
