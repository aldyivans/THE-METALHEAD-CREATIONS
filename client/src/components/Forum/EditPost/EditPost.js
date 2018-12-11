import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class EditPost extends Component {
	constructor(props) {
    super(props);
    this.state = {
      modal: false,
      editedTopic: this.props.topic
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


	deletePost(e) {
		e.preventDefault();

		const forumId = this.props.id;

		axios.delete('/forum/' + forumId).then(res => {
			console.log('deleted')
			this.props.getAllPosts()
		})
	}

	editMenuDown() {
		console.log("edit menu", this.refs.editMenu)
		var x = this.refs.editMenu;

		if (x.style.display === "block") {
			x.style.display = "none"
		} else {
			x.style.display = "block"
		}
	}

	handleEditTopic(e) {
		this.setState({
			editedTopic: e.target.value
		})
	}

	handleSubmit() {
		console.log(this.state.editedTopic)

		const editedTopic = {
			editedTopic: this.state.editedTopic
		}

		const forumId = this.props.id;

		axios.put('/forum/' + forumId, editedTopic).then(res => {
			this.props.getAllPosts()
			this.setState({
	      modal: !this.state.modal
	    })
		})
	}

  render() {
  	const uid = localStorage.getItem('mhc-user-id');

    if(this.props.uid !== uid) return null

    return (
      <div className="position-relative">
	      <div>
	      	<button type="button" className="bg-white border-0" onClick={this.editMenuDown.bind(this)}>
	      		<svg style={{width: "8px"}} aria-hidden="true" data-prefix="fas" data-icon="ellipsis-v" className="svg-inline--fa fa-ellipsis-v fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>
	      	</button>
	      </div>
	      <div className="menu" ref="editMenu">
	      	<ul>
	      		<li>
							<div>
				        <Button className="btn bg-white w-100 border-0 text-dark" onClick={this.toggle}>Edit Post</Button>
				        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
				          <ModalHeader toggle={this.toggle}>Edit Post</ModalHeader>
				          <ModalBody className="p-0">
				            <textarea type="text" className="textareaField" onChange={this.handleEditTopic.bind(this)} value={this.state.editedTopic}></textarea>
				          </ModalBody>
				          <ModalFooter className="p-0">
				            <Button color="primary" className="m-0 rounded-0" onClick={this.handleSubmit.bind(this)}>Save</Button>{' '}
				            <Button color="secondary" className="m-0 rounded-0" onClick={this.toggle}>Cancel</Button>
				          </ModalFooter>
				        </Modal>
				      </div>
						</li>
			      <li><button type="button" className="btn bg-white text-dark" onClick={this.deletePost.bind(this)}>Delete Post</button></li>
	      	</ul>
	      </div>

	      
			</div>
    );
  }
}

export default EditPost;