import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import {  } from 'react-spring';
import { Row, Column } from 'simple-flexbox';
import { NavBar } from "./sidebar";
import { News } from "./content";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Row>
        <Column>
          <NavBar/>
        </Column>
        <Column>
          <Route exact path="/" render={() => <Redirect to="/usnews"/>}/>
          <Route path="/:source" component={News} />          
        </Column>
      </Row>
      </div>
    );
  }
}

export default App;


// TODO : footer, transitions
