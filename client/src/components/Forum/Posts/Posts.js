import React, { Component } from 'react';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import CommentForm from '../CommentForm/CommentForm';
import PeopleReactCounter from '../PeopleReactCounter/PeopleReactCounter';
import EditPost from '../EditPost/EditPost';
import TimeAgo from 'react-timeago';
import EnStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
 
const formatter = buildFormatter(EnStrings)

class Posts extends Component {

	constructor() {
		super();
		this.state = {
			commentCount: 0,
			dataForums: []
		}
	}

	componentDidMount() {
	  if(this.props.route === "/") {
	  	console.log("home")
	  } else if(this.props.route === "/profile:id") {
	  	console.log("profile")
	  }
	}

	commentAdded() {
		this.setState({
			commentCount: 1
		})
	}

  render() {

  	const auth = localStorage.getItem('mhc-user-token');

   	if(!auth) return <Redirect to="/login" />

    return (
			<div className="mb-5 pb-5">
				{this.props.forums.map(forum =>
						<div className="bg-white shadow mb-4" key={forum.id}>
							<div className="navbar border-bottom d-flex align-items-center p-3">
								<div className="profile-link">
									<NavLink to={"profile/"+ forum.data.userId}>
										<div className="ava">
											<img src={forum.data.avatar} alt="User Avatar"/>
										</div>
										<div className="ml-2">
											<p className="font-weight-bold m-0">{forum.data.username}</p>
											<small className="m-0 text-muted">
												<TimeAgo
											  date={forum.data.timestamp._seconds*1000} formatter={formatter} />
										  </small>
										</div>
									</NavLink>
								</div>
								<EditPost topic={forum.data.topic} getAllPosts={this.props.getAllPosts} id={forum.id} uid={forum.data.userId}/>
							</div>
							<div className="card border-0 p-3">
								<p className="m-0">{forum.data.topic}</p>
							</div>
							<div>
								<PeopleReactCounter commentCount={this.state.commentCount} id={forum.id} username={this.props.username} avatar={this.props.avatar}/>
								<CommentForm commentAdded={this.commentAdded.bind(this)} userId={forum.data.userId} id={forum.id} username={this.props.username} avatar={this.props.avatar}/>
							</div>
						</div>
					) 
				}
			</div>
    );
  }
}

export default Posts;