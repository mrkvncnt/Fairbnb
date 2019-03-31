import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';


class About extends React.Component {


  render() {

    return (
      <div className="modal-form">
        <div onClick={this.props.closeModal} className="close"><i className="fas fa-times"></i></div>
        <br></br><br></br>
        <div id="form-type">About the developer</div>
        <div className="modal-form">
            Feel free to reach out for more information
        </div>
        <button id="contact"><i className="far fa-envelope"></i>Email</button>
        <button id="contact"><i className="fab fa-github"></i> GitHub</button>
        <button id="contact"><i className="fab fa-linkedin"></i>LinkedIn</button>
      </div>
    )
  };

};



const mdp = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(null, mdp)(About);