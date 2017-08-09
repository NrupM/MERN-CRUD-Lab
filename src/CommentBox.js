import React, { Component } from 'react';
import $ from 'jquery-ajax';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import style from './style';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }
  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      method: 'GET'
    }).then(
      res => {
        this.setState({ data: res });
      },
      err => {
        console.log('error', err);
      }
    );
  }
  handleCommentSubmit(comment) {
    $.ajax({
      url: this.props.url,
      method: 'POST',
      data: comment
    }).then(
      res => {
        this.setState({ data: res });
      },
      err => {
        console.log('post error', err);
      }
    );
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    console.log('loaded first comment');
    setInterval(() => this.loadCommentsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={style.commentBox}>
        <CommentList data={this.state.data} />
        <CommentForm
          onCommentSubmit={event => this.handleCommentSubmit(event)}
        />
      </div>
    );
  }
}

export default CommentBox;
