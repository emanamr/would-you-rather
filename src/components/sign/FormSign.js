import React, { Component } from "react";
import { connect } from "react-redux";
import {Form, Button} from "react-bootstrap/";
import { withRouter } from 'react-router';




import Select from "react-select";
import { setauthUser } from "../../redux/action/authactions";

class FormSign extends Component {
  state = {
    selectedUserId: ""
  };

 /* submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.handleAuthUser(this.state.selectedUserId);
  };*/
  
    handleSubmit = e => {
    e.preventDefault();
    let id = '';
    const { selectedUserId } = this.state;
    const { userIds, handleAuthUser } = this.props;
    
    userIds.map(userId => {
      if (userId === selectedUserId) {
        id = userId;
      }
    });
    const from =
      this.props.location !== undefined && this.props.location.state !== undefined
        ? this.props.location.state.from
        : '/home';

   	handleAuthUser(selectedUserId)
    this.props.history.push(`${from}`);
  };

  handleChange = (option) => {
    this.setState({ selectedUserId: option.id });
  };
  render() {
    const { userIds, users } = this.props;
    const options = userIds.map((id) => ({
      id,
      label: (
        <div>
          <img src={users[id].avatarURL} alt="" height="30px" width="30px" />{" "}
          <span>{users[id].name}</span>
        </div>
      )
    }));

    return (
      <div>
        <Form onSubmit={this.submitHandler}>
          <Select options={options} onChange={this.handleChange} />

          <br />

          <Button variant="flat" type="submit">
            Sign in
          </Button>
        </Form>
      </div>
    );
  }
}
function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
    userIds: Object.keys(users)
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleAuthUser(id) {
      dispatch(setauthUser(id));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormSign));
