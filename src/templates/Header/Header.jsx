import './Header.scss';
import React, { Component } from "react";
import {LoginBtn} from "components/LoginBtn";
import { logout} from "actions/user";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";


class Header extends Component {

  handleLogout = () => {
    const { logout, isLoggedIn } = this.props;
    if (isLoggedIn) {
      logout();
    }
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <header>
        <div>LOGO</div>
        <div>
          <LoginBtn handleLogout={this.handleLogout} isLoggedIn={isLoggedIn}/>
          {/*<button className="logout-btn" onClick={this.handleLogout}>*/}
          {/*  {isLoggedIn ? 'sign out' : 'sign in'}*/}
          {/*</button>*/}
        </div>
      </header>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.id,
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    logout: () => dispatch(logout()),
  }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);