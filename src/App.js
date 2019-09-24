import './assets/global.scss'

import React, { createContext } from "react";
import {Switch, Route } from 'react-router-dom';

import { Header } from './templates/Header/Header'
import { Footer } from "./templates/Footer";
import { Auth } from "components/Auth";
import { Aside } from "templates/Aside";
import { Profile } from "components/Profile";
import { News } from "components/News";


export const App = () => (
  <div>
    <Header/>
    <main className="grid-container">
      <Aside/>
      <div className="content">
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/login" component={Auth} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/news" component={News} />
        </Switch>
      </div>
    </main>
    <Footer/>
  </div>
);