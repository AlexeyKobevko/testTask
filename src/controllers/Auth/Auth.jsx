import './Auth.scss';

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import {addError, checkUser} from 'actions/user';
import { BtnSpinner } from "components/BtnSpiner";

export class Auth extends Component {

  state = {
    email: '',
    password: '',
    error: false,
    errorText: '',
    isValid: false,
  };

  validateForm = (str) => {
    const { isValid } = this.state;
    const { addError } = this.props;
    const regExp = /(^\w.*@\w+\.\w)/;

    if (str && regExp.test(str)) {
      this.setState({
        isValid: !isValid,
      });
      return true;
    }

    if (!str) {
      addError('Заполните поле email');
      return false;
    }

    if (str && !regExp.test(str)) {
      addError('Неверно заполненно поле email');
      return false;
    }
  };

  handleSignIn = () => {
    const { email, password } = this.state;
    const { checkUser, loading } = this.props;

    if (!this.validateForm(email)) return;

    if (!loading) {
      checkUser(email, password);
    }
};

  handleTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, password } = this.state;
    const {isLoggedIn, loading, errorText, error } = this.props;

    if (isLoggedIn) {
      return <Redirect to={'/profile'}/>
    }

    return (
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input onChange={this.handleTextChange} autoFocus name="email" type="email" placeholder="email" value={email} required/>
            <input onChange={this.handleTextChange} name="password" type="password" placeholder="password" value={password} required />
            {
              !loading ? <button className="btn login-btn" onClick={this.handleSignIn} >
              sign in
              </button> : <BtnSpinner/>
            }
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

function mapStateToProps(state) {
  return {
    user: state.user.id,
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    error: state.user.error,
    errorText: state.user.errorText,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkUser: (email, pass) => dispatch(checkUser(email, pass)),
    addError: (errorText) => dispatch(addError(errorText)),
  }
}

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);