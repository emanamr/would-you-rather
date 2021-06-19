import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import Select from "react-select";

import would from "../../css/images/would.svg";
import {authUser , handleUserLogin} from "../../redux/action/authactions";

class Sign extends Component {
  state = {
    tohome: false,
    selectedUserId: ""
  };

 
  useEffect= (() => {
    
    this.props.handleLogin()
  }, []);

  submitHandler = (e) => {
    e.preventDefault();
    const {handleAuthUser} = this.props
    handleAuthUser(this.state.selectedUserId);
    const UrlFrom =
            this.props.location !== undefined && this.props.location.state !== undefined
                ? this.props.location.state.from
                : '/home';

        this.props.history.push(`${UrlFrom}`);
    this.setState({ tohome: true });
    console.log(this.state);
  };

  handleChange = (option) => {
    this.setState({ selectedUserId: option.id });
  };
  render() {
    /*const { tohome } = this.state;
    if (tohome) return <Redirect to="/home"></Redirect>;*/

    const { userIds, users , isUserSelect, handleLogin} = this.props; 

    const options = userIds.map((id) => ({
      id,
      label: (
        <div>
          <img src={users[id].avatarURL} alt="" height="30px" width="30px" />{" "}
          <span>{users[id].name}</span>
        </div>
      )
    }));
 if(!isUserSelect){
    return (
     
      <div>
      
        <br />
        <br />
        <Card>
          <Card.Header>
            <br />
            <h6>
              Welcome to Would you rather App! Please, sign in to continue...
            </h6>
          </Card.Header>
          <Card.Body>
            <img
              alt=""
              src={would}
              width="200"
              height="150"
              className="d-inline-block align-top"
            />
            <Form onSubmit={this.submitHandler}>
              <Select options={options} onChange={this.handleChange} />

              <br />

              <Button variant="flat" type="submit">
                Sign in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );}
else{return (<Redirect to="/home" />)}
  }
}

function mapStateToProps({ users, authUser }) {
  const isUserSelect = authUser!== '' && Object.keys(users).includes(authUser)
  return {
    isUserSelect,
    authUser,
    users,
    userIds: Object.keys(users)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAuthUser(id) {
      dispatch(authUser(id));
    },
    handleLogin(){dispatch(handleUserLogin())}
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Sign);