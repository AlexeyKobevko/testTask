import './assets/global.scss'

import React from "react";
import {Switch, Route } from 'react-router-dom';

import { Header } from './templates/Header/Header'
import { Footer } from "./templates/Footer";
import { Aside } from "templates/Aside";
import { Profile } from "components/Profile";
import {NewsContainer} from "components/News/News";
import {AuthContainer} from "components/Auth/Auth";


export const App = () => (
  <div>
    <Header/>
    <main className="grid-container">
      <Aside/>
      <div className="content">
        <Switch>
          <Route exact path="/" component={AuthContainer} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/news" component={NewsContainer} />
        </Switch>
      </div>
    </main>
    <Footer/>
  </div>
);