import './Auth.scss';

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { load } from 'actions/user';
import { ucFirst } from "../../functions/ucFirst"

export class Auth extends Component {
  _isMounted = false;
  state = {
    email: '',
    password: '',
    // error: false,
    // errorText: '',
    // isLoading: false,
    isValid: false,
    // isLogin: false,
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  validateForm = (str) => {
    const { isValid } = this.state;
    const regExp = /(^\w.*@\w+\.\w)/;

    if (str && regExp.test(str)) {
      this.setState({
        isValid: !isValid,
      });
      return true;
    }

    if (!str) {
      this.setState({
        error: true,
        errorText: 'Заполните поле email',
      });
      return false;
    }

    if (str && !regExp.test(str)) {
      this.setState({
        error: true,
        errorText: 'Неверно заполненно поле email',
      });
      return false;
    }
  };

  handleSignIn = () => {
    const { email, password } = this.state;
    const { checkUser } = this.props;

    if (!this.validateForm(email)) return;

    checkUser(email, password);
};

  handleTextChange = ({ target: { name, value } }) => {
    if (this._isMounted) {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    const { email, password } = this.state;
    const { error, errorText, isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to={'/profile'}/>
    }

    return (
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input onChange={this.handleTextChange} name="email" type="email" placeholder="email" value={email} required/>
            <input onChange={this.handleTextChange} name="password" type="password" placeholder="password" value={password} required />
            <button className="btn login-btn" onClick={this.handleSignIn} >
              sign in
            </button>
          </div>
        </div>
        {error && <div className="error-field">
          {errorText}
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: state.user.id,
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    error: state.user.error,
    errorText: state.user.errorText,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    checkUser: (email, password) => dispatch(load(email, password)),
  }
}

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);