import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";



import {Table, Card} from "react-bootstrap";


class UserCard extends Component {
  render() {
    const { boardusers, userIds } = this.props;

    return (
      <div>
        <Container>
          <ol>
            {boardusers.map((users) => (
              <li key={users.id}>
                <Card>
                  <Table>
                    <tbody>
                      <tr>
                        <td></td>
                        <td colSpan="5">
                          <p>
                            <strong>{users.name}</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan="2">
                          <div className="">
                            <img alt="" src={users.avatarURL} className="" />
                          </div>
                        </td>
                        <td colSpan="2">
                          <p>created questions: </p>
                        </td>
                        <td>
                          <p>{users.userquestions}</p>
                        </td>
                        <td rowSpan="2">
                          <div>
                            Score :<span> {users.userscore}</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <p>answered questions:</p>
                        </td>
                        <td>
                          <p>{users.useranswers}</p>
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
