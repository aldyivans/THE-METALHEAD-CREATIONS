import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

class PostForm extends Component {

	constructor() {
		super();
		this.state = {
			topic: ''
		}
	}

	handleTopic(event) {
		this.setState({topic: event.target.value})
	}

	handleSubmit(e) {
		e.preventDefault();

		const forumData = {
			userId: this.props.userId,
			avatar: this.props.avatar,
      username: this.props.username,
      topic: this.state.topic
    };

    axios.post('/forum', forumData).then(response => {
      this.props.getAllPosts();
      this.setState({
      	topic: ''
      })
    }).catch( err => {
      console.log('error', err)
    })
	}

  render() {

  	const auth = localStorage.getItem('mhc-user-token');

   	if(!auth) return <Redirect to="/login" />

    return (
      <div className="card border-0 rounded-0 shadow mb-4">
        <form onSubmit={ this.handleSubmit.bind(this) }>
			    <textarea type="text" className="textareaField" placeholder="Write Some Bullshit..."  onChange={ this.handleTopic.bind(this) } value={ this.state.topic }/>
			    <div className="bg-light border-top d-flex justify-content-between">
					  <button type="submit" className="btn btn-primary rounded-0">Post</button>
					  <label htmlFor="uploadPic" className="btn m-0">attach a picture</label>
						<input type="file" className="d-none" id="uploadPic" />
			    </div>
				</form>
      </div>
    );
  }
}

export default PostForm;