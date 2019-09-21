import './Aside.scss';

import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { menu } from "../../menu";

export const Aside = () => {

  const nav = menu.map(
    (item, idx) => <li key={idx}><NavLink to={item.path} activeClassName="selected">{item.name}</NavLink></li>
  );

  return (
    <aside>
      <nav>
        <ul>
          {nav}
        </ul>
      </nav>
    </aside>
  );
};