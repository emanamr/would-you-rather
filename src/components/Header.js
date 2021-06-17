import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink, Link } from "react-router-dom";
import {withRouter} from "react-router"


import would from "../css/images/would.svg";
import log from "../css/images/log-out.svg";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { authUser, authLogout ,handleUserLogout} from "../redux/action/authactions";

class Header extends Component {
  state = {
    toLogin: false
  };

  handleout = () => {
    console.log(this.props);
    const {handleLogout, } = this.props;
    //this.setState({ toLogin: true });
    handleLogout()
  };
	
  render() {
    /*const { toLogin } = this.state;
   if (toLogin) return <Redirect to="/login"></Redirect>;*/

    const { authUser, users } = this.props;
	
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Container size="lg">
            <Navbar.Brand to="/home">
              <img
                alt=""
                src={would}
                width="150"
                height="60"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-center"
            >
              <Nav className="mr-auto">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/add">New Question</NavLink>
                <NavLink to="/leaderboard">Leader Board</NavLink>
              </Nav>
            </Navbar.Collapse>

			{authUser ? (
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>Hello,{users[authUser].name}</Navbar.Text>
               
                  <img
                    alt=""
                    src={users[authUser].avatarURL}
                    width="60"
                    height="60"
                    className="round-small"
                  />{" "}
                
                <Nav.Link>
                  <img
                    alt=""
                    src={log}
                    width="30"
                    height="30"
                    onClick={this.handleout}
                  />{" "}
                </Nav.Link>
              </Navbar.Collapse>
				 ) : (
              <Redirect to="/login"/>
            )}
          </Container>
        </Navbar>
      </div>
    );
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
    handleLogout(id) {
      dispatch(authLogout());
      dispatch(handleUserLogout())
    }
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));