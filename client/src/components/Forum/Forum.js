import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import Posts from './Posts/Posts';
import PostForm from './PostForm/PostForm';
import Sidebar from '../Sidebar/Sidebar';

class Forum extends Component {

	componentDidMount() {
		this.props.getAllPosts()
	}

  render() {

  	const auth = localStorage.getItem('mhc-user-token');

   	if(!auth) return <Redirect to="/login" />

    return (
      <div className="container">
	      <div className="row mt-5">
		      <Sidebar userId={this.props.userId} getUserData={this.props.getUserData} username={this.props.username} avatar={this.props.avatar}/>
		      <div className="col-9">
			      <PostForm getAllPosts={this.props.getAllPosts} userId={this.props.userId} username={this.props.username} avatar={this.props.avatar}/>
						<Posts route={this.props.match.path} forums={this.props.forums} userId={this.props.userId} getAllPosts={this.props.getAllPosts} username={this.props.username} avatar={this.props.avatar}/>
		      </div>
				</div>
      </div>
    );
  }
}

export default Forum;