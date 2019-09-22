import './Auth.scss';

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

import { endpoints } from "../../../endpoints";
import { ucFirst } from "../../functions/ucFirst"

export class Auth extends Component {
  _isMounted = false;
  state = {
    email: '',
    password: '',
    error: false,
    errorText: '',
    isLoading: false,
    isValid: false,
    isLogin: false,
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
    const { email, password, isLoading, isLogin } = this.state;

    if (!this.validateForm(email)) return;

    this.setState({
      isLoading: !isLoading,
    });

    axios
      .post(endpoints.auth, {
        email: email,
        password: password
      })
      .then(response => {
        const { data } = response;

        if (data.status === 'err') {
          this.setState({
            password: '',
            error: true,
            errorText: ucFirst(data.message.replace(/_/g, ' ')),
          });
        }

        if (data.status === 'ok' && this._isMounted) {
          this.setState({
            isLogin: !isLogin,
          });
        }

        this.setState({ isLoading: !isLoading });



      })
      .catch(err => {
        this.setState({
          error: true,
          errorText: 'Сервер временно недоступен',
        });
    });
};

  handleTextChange = ({ target: { name, value } }) => {
    if (this._isMounted) {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    const { email, password, error, errorText, isLogin } = this.state;

    if (isLogin) {
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