import './assets/global.scss'

import React, { Component } from "react";
import {Switch, Route } from 'react-router-dom';
import { Header } from './templates/Header/Header'
import { Footer } from "./templates/Footer";
import { Auth } from "components/Auth";
import { Aside } from "templates/Aside";
import { Profile } from "components/Profile";
import {NewsContainer} from "components/News/News";


export class App extends Component {

  render() {

    return (
      <div>
      <Header/>
        <main className="grid-container">
          <Aside/>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/news" component={NewsContainer} />
            </Switch>
          </div>
        </main>
        <Footer/>
      </div>
    )
  }
}