import './LoginBtn.scss';

import React from 'react';

export const LoginBtn = (props) => (
  <button className="logout-btn" onClick={props.handleLogout}>
    {props.isLoggedIn ? 'выйти' : 'войти'}
  </button>
);