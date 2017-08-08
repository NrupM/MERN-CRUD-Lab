import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import style from './style';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
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
  handleCommetSubmit(comment) {}
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={style.commentBox}>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    );
  }
}

export default CommentBox;

//get comments from DB using AJAX and update the comment list with that data
