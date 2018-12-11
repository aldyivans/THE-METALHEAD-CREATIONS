import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import About from './About/About';
import Posts from './../Forum/Posts/Posts';

class Profile extends Component {

  componentDidMount() {
    this.props.getAllPosts()
  }

  render() {
  	const auth = localStorage.getItem('mhc-user-token');

   	if(!auth) return <Redirect to="/login" />

    return (

      <div className="container">
	      <div className="row mt-5">
          <About userId={this.props.match.params.id} />
		      <div className="col-9">
		      	<Posts route={this.props.match.path} forums={this.props.forums} getAllPosts={this.props.getAllPosts} username={this.props.username} avatar={this.props.avatar} />
		      </div>
				</div>
      </div>
    );
  }
}

export default Profile;