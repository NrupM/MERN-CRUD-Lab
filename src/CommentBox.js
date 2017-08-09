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
  handleCommentDelete(id){
    $.ajax({
      url: `${this.props.url}/${id}`
      method: 'DELETE'
    })
    .then((res) => {
      console.log('Comment deleted');
    }, (err) => {
      console.log(err);
    });
  }
  handleCommentUpdate(id, comment) {
    //sends the comment id and new author/text to api
    $.ajx({
      url: `${this.props.url}/${id}`,
      method: 'put'
      data: comment
    })
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    console.log('loaded first comment');
    setInterval(() => this.loadCommentsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={style.commentBox}>
        <CommentList
          onCommentDelete={event => this.handleCommentDelete(event)}
          onCommentUpdate={event => this.handleCommentUpdate(event)}
          data={this.state.data}
        />
        <CommentForm
          onCommentSubmit={event => this.handleCommentSubmit(event)}
        />
      </div>
    );
  }
}

export default CommentBox;
