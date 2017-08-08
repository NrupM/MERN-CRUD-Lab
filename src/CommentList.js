import React, { Component } from 'react';
import style from './style';
import Comment from './Comment';

class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment
          author={comment.author}
          key={comment['_id']}
          text={comment.text}
        />
      );
    });
    return (
      <div style={style.commentList}>
        {commentNodes}
      </div>
    );
  }
}

export default CommentList;
