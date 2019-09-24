import './News.scss';

import React, { Component } from 'react';

import { Loading } from "components/Loading";
import {ucFirst} from "../../functions/ucFirst";
import { connect } from 'react-redux';
import { load } from 'actions/news';

class News extends Component {

  componentDidMount() {
    const { loadNews } = this.props;
    loadNews();
  }

  render () {
    const { news, loading, error, errorText } = this.props;

    if (loading) return <Loading />;
    if (error && errorText) {
      return <div className="error-field">{ucFirst(errorText).replace(/_/g, ' ')}</div>
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

function mapStateToProps(state, props) {
  return {
    news: state.news.entries,
    loading: state.news.loading,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    loadNews: () => dispatch(load()),
  }
}

export const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(News);