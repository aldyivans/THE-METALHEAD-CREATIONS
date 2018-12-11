import React, { Component } from 'react';
import axios from 'axios';
import {
  FacebookShareCount,
  FacebookShareButton
} from 'react-share';

class Horns extends Component {
  constructor() {
    super();
    this.horns = this.horns.bind(this);
    this.dishorns = this.dishorns.bind(this);
    this.state = {
      horns: 1,
      hornsTotal: 0,
      commentTotal: null,
      hornsDataPost: [],
      hornsId: [],
      horned: false,
      hornsUsername: null
    }
  }

  componentDidMount() {
    this.hornsToggle()
    this.getTotalHorns()
    this.getTotalComment()

  }

  horns(e) {
   // this.setState({horned: true})
 //     e.preventDefault();
 // 
 //     const forumId = this.props.id;
      var hornsTotal;
 //     const hornsData = {
 //       username: this.props.username,
 //       horns: this.state.horns
 //     };
 // 
 //     axios.post('/forum/horns/' + forumId, hornsData).then(res => {
 //       console.log(res)
        hornsTotal = this.state.hornsTotal + 1;
        this.setState({
          horned: true,
          hornsTotal: hornsTotal
        })
 //     }).catch( err => {
 //       console.log('error', err)
 //     })
  }

  dishorns(e) {
    // this.setState({horned: false})
    var hornsTotal;
    // const hornsId = this.state.hornsId;
    // axios.delete('/forum/horns/' + hornsId).then(res => {
    //   console.log('deleted', res)
       hornsTotal = this.state.hornsTotal - 1;
       this.setState({
         horned: false,
         hornsTotal: hornsTotal
       })
    // })0--------------------------------------2erdz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  }

  getTotalHorns() {
    const forumId = this.props.id;

    axios.get('/forum/horns/' + forumId).then(response => {

      this.setState({
        hornsDataPost: response.data,
        hornsTotal: response.data.length
      });
      response.data.map(res => {
        this.setState({
          hornsId: res.hornsId,
          hornsUsername: res.hornsData.username
        })
      })
    })
  }

  hornsToggle() {
    if(this.state.hornsTotal < 1) {
      this.setState({
        horned: false
      })
    }
  }

  getTotalComment() {
    const forumId = this.props.id;

    axios.get('/forum/comment/' + forumId).then(response => {
      this.setState({
        commentTotal: response.data.length
      })
    })
  }

  render() {

    const horned = this.state.horned;
    var hornsTotal = this.state.hornsTotal;
    let button;

    if (horned) {
      button =
      <button className="btn col-4 bg-white rounded-0" onClick={this.dishorns}>
        Dishorns {hornsTotal}
      </button>;
    } else {
      button =
      <button className="btn col-4 bg-white rounded-0" onClick={this.horns}>
        Horns {hornsTotal}
      </button>;

    }

    const shareUrl = 'http://github.com';
    // const shareUrl = 'url', this.props.id;
    const title = 'GitHub';

  	const auth = localStorage.getItem('mhc-user-token');
    if(!auth) return null

    return (
      <div className="border-top border-bottom">

        {button}
        <label className="btn col-4 bg-white rounded-0 m-0" htmlFor={this.props.id}>Comment {this.state.commentTotal + this.props.commentCount}</label>
        <FacebookShareButton
          url={shareUrl}
          quote={title}
           className="btn col-4 bg-white rounded-0">
          <FacebookShareCount
            url={shareUrl}>
            {count => <span>Share {count}</span>}
          </FacebookShareCount>
        </FacebookShareButton>
      </div>
    );
  }
}

export default Horns;