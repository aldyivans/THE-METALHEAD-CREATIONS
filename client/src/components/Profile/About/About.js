import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class About extends Component {

	constructor() {
    super();
    this.state = {
      modal: false,
      avatar: 'https://pbs.twimg.com/profile_images/716487122224439296/HWPluyjs_400x400.jpg',
      fullname: ''
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    const userId = this.props.userId;

    axios.get('/user/' + userId).then(res => {
      console.log('data user bos di ABOUT',res.data)
      this.setState({
        avatar: res.data.userData.avatar,
        about: res.data.userData.about,
        fullname: res.data.userData.fullname,
        profession: res.data.userData.profession,
        company: res.data.userData.avatar,
        birthday: res.data.userData.birthday,
        gender: res.data.userData.gender,
        email: res.data.userData.email,
        website: res.data.userData.website,
        phone: res.data.userData.phone,
        favoriteBand: res.data.userData.favoriteBand,
        favoriteGenre: res.data.userData.favoriteGenre,
        favoriteArtist: res.data.userData.favoriteArtist,
      })
    })
  }

  render() {

  	const auth = localStorage.getItem('mhc-user-token');
    if(!auth) return null

    return (
      <div className="col-3">
	      <div className="card border-0 rounded-0 shadow p-3">
	      	<div className="d-flex justify-content-center mb-3">
		      	<div className="ava-profile">
							<img src={this.state.avatar} alt="User Avatar"/>
						</div>
	      	</div>
					<div>
						<p className="font-weight-bold m-0">Full Name:</p>
						<p>{this.state.fullname}</p>
						<p className="font-weight-bold m-0">About:</p>
						<p>-</p>
					</div>
					<div>
						<button className="btn w-100" onClick={this.toggle}>Edit Profile</button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
              <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
              <ModalBody className="p-0">
                <form>
                  <div className="form-group">
                    <label for="avatar">Upload Your Avatar</label>
                    <input type="file" className="form-control d-none" id="avatar" />
                  </div>
                  <div className="form-group">
                    <label for="fullname">Fullname</label>
                    <input type="text" className="form-control" id="fullname" value={this.state} />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="p-0">
                <Button color="primary" className="m-0 rounded-0">Save</Button>{' '}
                <Button color="secondary" className="m-0 rounded-0">Cancel</Button>
              </ModalFooter>
            </Modal>
					</div>
	      </div>
	      <div className="copy">
		      <span>&copy; 2018 THE METALHEAD CREATIONS</span>
	      </div>
			</div>
    );
  }
}

export default About;