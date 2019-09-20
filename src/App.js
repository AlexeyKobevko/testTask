import './assets/global.scss'

import React, { Component, Fragment } from "react";
import { Header } from './templates/Header/Header'
import { Footer } from "./templates/Footer";
import {Auth} from "components/Auth";


export class App extends Component {

  render() {

    return (
      <Fragment>
        <Header />
        <div className="content">
          <Auth/>
        </div>
        <Footer />
      </Fragment>
    )
  }
}