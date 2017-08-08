import React, { Component } from 'react';
import style from './style';

class CommentForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      author: '',
      text: ''
    }
  }
  handleAuthorChange(e){
    this.setState({
      author: e.target.value
    });
  }
  handleTextChange(e){
    this.setState({
      text: e.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(`${this.state.author} said "${this.state.text}"`);
  }
  render(){
    return(
      <div>
        <h2>Create Comment Here!</h2>
        <form style={ style.commentForm } onSubmit={ e => this.handleSubmit(e) }>
        <input
          type='text'
          placeholder='Your name...'
          style={ style.commentFormAuthor }
          value={ this.state.author }
          onChange={e => this.handleAuthorChange(e)} />
        <input
          type='text'
          placeholder='Say something...'
          style={ style.commentFormText }
          value={ this.state.text }
          onChange={e => this.handleTextChange(e)} />
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post' />
        </form>
      </div>
    )
  }
}

export default CommentForm;
