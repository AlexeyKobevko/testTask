import './Profile.scss';

import React, {Component} from 'react';
import axios from 'axios';

import {endpoints} from "../../../endpoints";
import {Loading} from "components/Loading";
import {ucFirst} from "../../functions/ucFirst";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom"

class Profile extends Component {
  _isMounted = false;
  state = {
    isLoading: false,
    social: [],
    languages: [],
    error: false,
    errorText: '',
  };

  componentDidMount() {
    this._isMounted = true;
    this.getUser();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }



  getUser = () => {
    const { isLoading } = this.state;
    const { user } = this.props;

    this.setState({
      isLoading: !isLoading,
    });

    axios
      .get(endpoints.profile + user)
      .then(response => {
        const { data } = response;
        data.data.social = this.sortLinks(data.data.social, 'web');
        if (data.status === 'ok' && this._isMounted) {
          this.setState({
            ...data.data,
            isLoading: false,
          });
        }

        if (data.status === 'err') {
          this.setState({
            isLoading: false,
            error: true,
            errorText: ucFirst(data.message.replace(/_/g, ' ')),
          });
        }
      })

  };

  sortLinks = (arr, name) => {
    const target = arr.filter(link => link.label === name);
    const other = arr.filter(link => link.label !== name);

    return target.concat(other);
  };

  render () {
    const { isLoading, city, languages, social, error, errorText } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoading) return <Loading />;
    if (!isLoggedIn) return <Redirect to={'/'} />;
    if (error && errorText) {
      return <div className="error-field">{errorText}</div>
    }

    const langList = languages.map((lang, idx) => <li key={idx}>{lang}</li>);
    const links = social.map(
      (item, idx) =>
        <li key={idx} >
          <a href={item.link} target="_blank">
            <img src={require(`../../img/icons/${item.label}.svg`)} alt={item.label}/>
          </a>
        </li>);

    return (
      <div className="profile-wrapper">
        <div className="profile-city">
          <span>Город: </span><span>{city}</span>
        </div>
        <div className="profile-langs">
          <span>Знание языков: </span>
          <ul>
          {languages && langList}
          </ul>
        </div>
        <div className="profile-links">
          <span>Ссылки: </span>
          <ul className="links-wrapper">
            {social && links}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.id,
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
  }
}


export const ProfileContainer = connect(mapStateToProps)(Profile);