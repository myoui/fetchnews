import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { Row, Column } from 'simple-flexbox';
import { isMobile } from 'is-mobile';

import { NavBar } from "./sidebar";
import { News } from "./content";

import './App.css';

class App extends Component {
  render() {
    if (isMobile.isMobile()) {
      return (
        <div className="App">
            <NavBar/>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/usnews"/>}/>
              <Route path="/:source" component={News} />
            </Switch>
        </div>)
    } else {
      return (
        <div className="App">
        <Row>
          <Column>
            <NavBar/>
          </Column>
          <Column>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/usnews"/>}/>
              <Route path="/:source" component={News} />
            </Switch>
          </Column>
        </Row>
        </div>
      );
    }
  }
}

export default App;


// TODO : footer, transitions
