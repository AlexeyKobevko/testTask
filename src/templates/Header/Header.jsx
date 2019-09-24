import './Header.scss';
import React, { Component } from "react";
import {LoginBtn} from "components/LoginBtn";
import { logout} from "actions/user";
import {connect} from "react-redux";


class Header extends Component {

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { isLoggedIn } = this.props;
    return (
      <header>
        <div>LOGO</div>
        <div>
          <LoginBtn handleLogout={this.handleLogout} isLoggedIn={isLoggedIn}/>
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