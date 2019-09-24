import './Auth.scss';

import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import { checkUser } from 'actions/user';
import { BtnSpinner } from "components/BtnSpiner";

export class Auth extends Component {

  state = {
    email: '',
    password: '',
    error: false,
    errorText: this.props.errorText ? this.props.errorText : '',
    isValid: false,
  };

  componentDidMount() {

  }

  componentWillUnmount() {

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
    const { email, password, errorText } = this.state;
    const { error, isLoggedIn, loading } = this.props;

    if (isLoggedIn) {
      return <Redirect to={'/profile'}/>
    }

    return (
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input onChange={this.handleTextChange} name="email" type="email" placeholder="email" value={email} required/>
            <input onChange={this.handleTextChange} name="password" type="password" placeholder="password" value={password} required />
            {
              !loading ? <button className="btn login-btn" onClick={this.handleSignIn} >
              sign in
              </button> : <BtnSpinner/>
            }
          </div>
        </div>
        {(error || this.state.error) && <div className="error-field">
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
    checkUser: (email, pass) => dispatch(checkUser(email, pass)),
  }
}

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(Auth);