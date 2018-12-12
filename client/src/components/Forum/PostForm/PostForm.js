import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

class PostForm extends Component {

	constructor() {
		super();
		this.state = {
			picture: [],
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
      picture: this.state.picture,
      topic: this.state.topic
    };

    axios.post('/forum', forumData).then(response => {
      this.props.getAllPosts();
      this.setState({
      	topic: '',
      	picture: []
      })
      this.refs.uploadList.style.display = "none"
    }).catch( err => {
      console.log('error', err)
    })
	}

	onFileSelected(e) {
		if(this.refs.uploadList.style.display === "block") {
			this.refs.uploadList.style.display = "none"
		} else {
			this.refs.uploadList.style.display = "block"
		}

		var pictures = []

		console.log(e.target.files[0])
		e.preventDefault()
    const formData = new FormData();
    formData.append('picture', e.target.files[0])
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    console.log(formData)

		axios.post('/forum/upload', formData, config).then(res => {
			console.log("file selected", res)
			pictures.push(res.data.imageUrl)
			this.setState({
				picture: pictures
			})
			console.log("bosquk",pictures)
		})
  }

  render() {

  	const auth = localStorage.getItem('mhc-user-token');

   	if(!auth) return <Redirect to="/login" />

    return (
      <div className="card border-0 rounded-0 shadow mb-4">
        <form onSubmit={ this.handleSubmit.bind(this) }>
			    <textarea type="text" className="textareaField" placeholder="Write Some Bullshit..."  onChange={ this.handleTopic.bind(this) } value={ this.state.topic }/>
			    <div ref="uploadList" className="pic-list">
				    <div className="d-inline-flex">
							<div className="picture">
								<img src={this.state.picture} />
								<svg aria-hidden="true" data-prefix="fas" data-icon="spinner" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-spinner fa-w-16 fa-2x fa-spin"><path fill="currentColor" d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path></svg>
							</div>
				    </div>
			    </div>
			    <div className="bg-light border-top d-flex justify-content-between">
					  <button type="submit" className="btn btn-primary rounded-0">Post</button>
					  <label htmlFor="uploadPic" className="btn m-0">attach a picture</label>
						<input type="file" className="d-none" id="uploadPic" onChange={this.onFileSelected.bind(this)}/>
			    </div>
				</form>
      </div>
    );
  }
}

export default PostForm;