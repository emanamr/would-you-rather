import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";



import {Table, Card} from "react-bootstrap";


class UserCard extends Component {
  render() {
    const { boardusers, userIds ,users} = this.props;

    return (
      <div>
        <Container>
          <ol>
            {boardusers.map((user) => (
              <li key={user.id}>
                <Card>
                  <Table>
                    <tbody>
                      <tr>
                        <td></td>
                        <td colSpan="5">
                          <p>
                            <strong>{user.name}</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan="2">
                          <div className="">
                            <img alt="" src={user.avatarURL} className="" />
                          </div>
                        </td>
                        <td colSpan="2">
                          <p>created questions: </p>
                        </td>
                        <td>
                          <p>{user.userquestions}</p>
                        </td>
                        <td rowSpan="2">
                          <div>
                            Score :<span> {user.userscore}</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <p>answered questions:</p>
                        </td>
                        <td>
                          <p>{user.useranswers}</p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    );
  }
}
function mapStateToProps({ users, authUser }) {
   const userIds = Object.keys(users);
  const boardusers = Object.keys(users)
    .map((authId) => {
      const name = users[authId].name;
      const id = users[authId].id;
      const avatarURL = users[authId].avatarURL;

      const useranswers = Object.keys(users[authId].answers).length;    //Object.keys(users[authId].answers)----->answer keys
      const userquestions = users[authId].questions.length;
      const userscore = useranswers + userquestions;

      return { name, id, avatarURL, userquestions, useranswers, userscore };
    })
    .sort((a, b) => b.userscore - a.userscore);

  return {
    boardusers,
    userIds
  };
}

export default connect(mapStateToProps)(UserCard);
