import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class commentForm extends Component {
  constructor() {
    super();
    this.state = {
      comment: '',
      comments:[],
      commentCount: 1,
      commentId: '',
      commentAvailable: false
    }
  }

  componentDidMount() {
    this.getComment()
      
  }

  handleSubmit(e) {
    e.preventDefault();

    const forumId = this.props.id;
    const commentData = {

      avatar: this.props.avatar,
      username: this.props.username,
      comment: this.state.comment
    };

    axios.post('/forum/comment/' + forumId, commentData).then(res => {
      console.log(res)
      
      this.getComment();
      this.setState({
        comment: '',
      })
    }).catch( err => {
      console.log('error', err)
    })

    this.props.commentAdded()
  }

  getComment() {
    const forumId = this.props.id;

    axios.get('/forum/comment/' + forumId).then(response => {
      console.log('comment',response.data)
      this.setState({
        comments: response.data,
        commentAvailable: true
      })
      response.data.map(comment => {
        this.setState({
          commentId: comment.commentId
        })
      })
    })
  }

  handleComment(e) {
    this.setState({comment: e.target.value})
  }

  deleteComment() {
    const commentId = this.state.commentId

    axios.delete('/forum/comment/' + commentId).then(() => {
      this.getComment()
    })
  }

  render() {
    const uid = localStorage.getItem('mhc-user-id');

    return (
      <div>
         <div className="bg-light p-3">
        { this.state.comments.map(comment =>
          <div className="card bg-light border-0" key={comment.commentId}>
            <div className="row">
              <div className="col-11">
                <NavLink to={"profile/"+ this.props.userId} className="font-weight-bold text-dark">{comment.commentData.username}</NavLink>
                <span className="pl-2">{ comment.commentData.comment }</span>
              </div>
              <div className="col-1 d-flex justify-content-center">
                {
                  comment.commentData.uid !== uid ?
                  null
                  :  <button onClick={this.deleteComment.bind(this)} className="border-0 bg-light w-75">
                      <svg aria-hidden="true" data-prefix="far" data-icon="trash-alt"
                        className="svg-inline--fa fa-trash-alt fa-w-14" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z">
                        </path>
                      </svg>
                    </button>
                }
                
              </div>
            </div>
          </div>
          )
        }
        </div>
        <div className="border-top p-3">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="shadow rounded">
              <input type="text" id={this.props.id} className="form-control border-0" placeholder="write a comment..." onChange={ this.handleComment.bind(this) } value={ this.state.comment } />
              <input type="submit" className="d-none"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default commentForm;