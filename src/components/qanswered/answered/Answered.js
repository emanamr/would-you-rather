import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Card, ProgressBar } from "react-bootstrap";

import Result from "./Result";
//import avater2 from "../../../css/images/avater2.png";

class Answered extends Component {
  render() {
    const {
      name,
      avatarURL,
      quesId,
      questions,
      optionOneVotes,
      optionTwoVotes,
      optionOneP,
      optionTwoP,
      totalAnswers
    } = this.props;
    return (
      <div>
        <br />
        <br />
        <Card>
          <Card.Header>
            <br />
          </Card.Header>
          <Card.Body>
            <Table>
              <tbody>
                <tr>
                  <td colSpan="3">
                    <div>Result for {name}'s question :</div>
                  </td>
                </tr>
                <tr>
                  <td rowSpan="4">
                    <div className="round">
                      <img alt="" src={avatarURL} />
                    </div>
                  </td>
                  <td colSpan="2">
                    <Card border="secondary" style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Text>
                          Would you rather..{questions[quesId].optionOne.text}
                          ?...
                        </Card.Text>
                        <ProgressBar
                          id="op1"
                          animated
                          now={`${optionOneP}`}
                          variant=""
                        />
                        <p>{optionOneP}%</p>
                      </Card.Body>
                      <Card.Footer>
                        <strong>{optionOneVotes}</strong> out of{" "}
                        <strong>{totalAnswers}</strong>
                      </Card.Footer>
                    </Card>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <Card border="secondary" style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Text>
                          Would you rather..{questions[quesId].optionTwo.text}
                          ?...
                        </Card.Text>
                        <ProgressBar
                          id="op2"
                          animated
                          now={`${optionTwoP}`}
                          variant=""
                        />
                        <p>{optionTwoP}%</p>
                      </Card.Body>
                      <Card.Footer>
                        <strong>{optionTwoVotes}</strong> out of{" "}
                        <strong>{totalAnswers}</strong>
                      </Card.Footer>
                    </Card>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
function mapStateToProps(
  { authUser, users, questions },
  { match: { params } }
) {
  const quesId = params.id;
  const user = questions[quesId].author;
  const { name, avatarURL } = users[user];

  const optionOneVotes = questions[quesId].optionOne.votes.length;
  const optionTwoVotes = questions[quesId].optionTwo.votes.length;

  console.log(optionOneVotes);
  const totalAnswers = optionOneVotes + optionTwoVotes;

  const optionOneP = (100 * optionOneVotes) / totalAnswers;
  const optionTwoP = (100 * optionTwoVotes) / totalAnswers;
  return {
    quesId,
    name,
    questions,
    avatarURL,
    optionOneVotes,
    optionTwoVotes,
    optionOneP,
    optionTwoP,
    totalAnswers
  };
}
export default connect(mapStateToProps)(Answered);
