import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
//import ToastContainer from "react-bootstrap/esm/ToastContainer";
class QuestionCard extends Component {
  render() {
    const { text, name, avatarURL, id, time, showing } = this.props;
    let qurl = "";
    if (showing === "unanswered") {
      qurl = "questions";
    } else {
      qurl = "answer";
    }

    return (
      <div>
        <Toast className="p-1 card">
          <Toast.Header closeButton={false}>
            <img
              alt=""
              src={avatarURL}
              className="rounded me-3"
              width="50"
              height="50"
            />
            <h3>
              <strong className="me-auto">{name} askes: </strong>
            </h3>
          </Toast.Header>
          <Toast.Body>
            {" "}
            <Card className="cardIn">
              <Card.Body>
                <Moment format="YYYY/MM/DD HH:mm">{time}</Moment>
                <br />
                <Card.Title className="">Would you rather..</Card.Title>

                <Card.Text className="">{text}</Card.Text>
                <Link to={`/${qurl}/${id}`} >
                  <Button variant="flat">view poll</Button>
                </Link>
              </Card.Body>
            </Card>
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}

const mapStateToProps = ({ users, questions }, { id, show }) => {
  const { author, optionOne } = questions[id];
  const { name, avatarURL } = users[author];
  //console.log(author,name);
  const time = questions[id].timestamp;
  const showing = show;

  return {
    text: `...${optionOne.text.slice(0, optionOne.text.length - 2)}...`,
    name,
    avatarURL,
    time,
    showing
  };
};

export default connect(mapStateToProps)(QuestionCard);
