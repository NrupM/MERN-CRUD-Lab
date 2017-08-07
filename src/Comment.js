import React, { Component } from 'react';
import style from './style';

class Comment extends Component {
  render() {
      return (
          <div style={ style.comment }>
            <h3>{this.props.author}</h3>
            <span>{this.props.text}</span>
          </div>
      )
  }
}

export default Comment;
