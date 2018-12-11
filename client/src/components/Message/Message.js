import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

class Messages extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			messages: [],
			message: ""
		}
	}

	componentDidMount() {
		this.getAllMessages()
		this.getAllUsers();
	}

	getAllMessages() {
		var messageData = []
		axios.get('/message').then(response => {
			response.data.map(result => {
				if(result.data.userId === this.props.userId || result.data.recieverId === this.props.userId) {
					this.setState({
						messages: response.data
					})
				}
			})
		})
	}

	getAllUsers() {
    axios.get('/user').then(response => {
    	this.setState({
    		users: response.data
    	})
    })
  }

	handleMessage(e) {
		this.setState({
			message: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault()

		const messageData = {
			userId: this.props.userId,
			avatar: this.props.avatar,
      username: this.props.username,
      message: this.state.message
    };

    axios.post('/message', messageData).then(response => {
      console.log(response)
      this.getAllMessages()
    }).catch( err => {
      console.log('error', err)
    })
	}

  render() {
  	const auth = localStorage.getItem('mhc-user-token');

   	if(!auth) return <Redirect to="/login" />

    return (
      <div className="container-fluid">
	      <div className="row">
	      	<div className="col-3">
			      <div className="pb-4 border-bottom">
			      	<form>
				        <input type="text" className="form-control" placeholder="Search..." />
				        <input type="submit" className="d-none" />
			      	</form>
			      </div>
			      <NavLink to="/message/:id">
				      <div className="card w-100 p-2 mt-4">
					      <div className="d-flex align-items-center">
					      	<img src={this.props.avatar} className="ava" alt="avatar"/>
					      	<div className="ml-2">
						      	<span className="d-block font-weight-bold">{this.props.username}</span>
					      		<span className="text-muted">New Message</span>
					      	</div>
					      </div>
				      </div>
			      </NavLink>
	      	</div>
	      	<div className="col-9">
		      	{
		      		this.state.messages.map(res =>
		      			<div className="card">
			      			<p>{res.data.message}</p>
		      			</div>
		      		)
		      	}
	      		<form onSubmit={this.handleSubmit.bind(this)}>
	      			<textarea type="text" className="form-control" onChange={this.handleMessage.bind(this)} value={this.state.message}></textarea>
	      			<button type="submit" className="btn btn-primary">SEND</button>
	      		</form>
	      	</div>
	      </div>
      </div>
    );
  }
}

export default Messages;