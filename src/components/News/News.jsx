import './News.scss';

import React, { Component } from 'react';
import axios from 'axios';

import {endpoints} from "../../../endpoints";
import { Loading } from "components/Loading";
import {ucFirst} from "../../functions/ucFirst";

export class News extends Component {
  _isMounted = false;
  state = {
    isLoading: false,
    error: false,
    errorText: '',
    news: [],
  };

  componentDidMount() {
    this._isMounted = true;
    this.getNews();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getNews = () => {
    const { isLoading } = this.state;
    this.setState({
      isLoading: !isLoading,
    });

    axios
      .get(endpoints.news)
      .then(response => {
        const { data } = response;

        if (data.status === 'ok' && this._isMounted) {
          this.setState({
            news: data.data,
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
        console.log(data);
      })

  };

  render () {
    const { isLoading, error, errorText, news } = this.state;

    if (isLoading) return <Loading />;
    if (error && errorText) {
      return <div className="error-field">{errorText}</div>
    }

    const newsList = news.map(
      (item) => {
        return <li className="news-list-item" key={item.id}>
          <article>
            <div className="news-header">{item.title}</div>
            <p className="news-text">{item.text}</p>
          </article>
        </li>
      }
    );

    return (
      <div>
        <ul>
          {news && newsList}
        </ul>
        <div>Всего новостей: <span>{news && news.length}</span></div>
      </div>
    )
  }
}