import React, { Component } from 'react';
import style from './style';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tobeUpdated: false,
      author: '',
      text: ''
    };
    //bind
  }
  updateComment(e) {
    e.preventDefault();
    this.setState({ toBeUpdate: !this.state.toBeUpdated });
  }
  handleCommentUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if author or text changed, set it. otherwise, leave null so POST request will ignore it
    let author = this.state.author ? this.state.author : null;
    let text = this.state.text ? this.state.text : null;
    let comment = { author: author, text: text };
    this.props.onCommentUpdate(id, comment);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      author: '',
      text: ''
    });
  }
  deleteComment(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onCommentDelete(id);
    console.log('oops deleted');
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }
  render() {
    return (
      <div style={style.comment}>
        <h3>
          {this.props.author}
        </h3>
        <span>
          {this.props.text}
        </span>
        <a
          style={style.updateLink}
          href="#"
          onClick={event => this.updateComment(event)}
        >
          update
        </a>
        <a
          style={style.deleteLink}
          href="#"
          onClick={event => this.deleteComment(event)}
        >
          delete
        </a>
        {this.state.toBeUpdated
          ? <form onSubmit={event => this.handleCommentUpdate(event)}>
              <input
                type="text"
                placeholder="Update name..."
                style={style.commentFormAuthor}
                value={this.state.author}
                onChange={event => this.handleAuthorChange(event)}
              />
              <input
                type="text"
                placeholder="Update your comment..."
                style={style.commentFormText}
                value={this.state.text}
                onChange={event => this.handleTextChange(event)}
              />
              <input
                type="submit"
                style={style.commentFormPost}
                value="Update"
              />
            </form>
          : null}
      </div>
    );
  }
}

export default Comment;
