import React, {Component} from 'react';

class CommentList extends Components {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment author={ comment.author } key={ comment.id } text={ comment.text }>
        </Comment>
      )
    })
    return (
      <div style={ style.commentList }>
          { commentNodes }
      </div>
    )
  }
}

export default CommentList;
