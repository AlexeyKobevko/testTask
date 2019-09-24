import './assets/global.scss'

import React from "react";
import {Switch, Route } from 'react-router-dom';

import { HeaderContainer} from 'templates/Header/Header'
import { Footer } from "templates/Footer";
import { Aside } from "templates/Aside";
import {NewsContainer} from "controllers/News/News";
import {AuthContainer} from "controllers/Auth/Auth";
import {ProfileContainer} from "controllers/Profile/Profile";


export const App = () => (
  <div>
    <HeaderContainer/>
    <main className="grid-container">
      <Aside/>
      <div className="content">
        <Switch>
          <Route exact path="/" component={AuthContainer} />
          <Route exact path="/login" component={AuthContainer} />
          <Route exact path="/profile" component={ProfileContainer} />
          <Route exact path="/news" component={NewsContainer} />
        </Switch>
      </div>
    </main>
    <Footer/>
  </div>
);