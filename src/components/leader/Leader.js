import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router";
import UserCard from "./UserCard";

class Leader extends Component {
  render() {
    return (
      <div>
        <UserCard userIds={this.props.userIds} users={this.props.users} />
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    users,
    userIds: Object.keys(users)
  };
}
export default connect(mapStateToProps)(Leader);
