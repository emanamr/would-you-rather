import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {withRouter} from "react-router"
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";

import QuestionPage from "./QuesPage.js";
//import QuestionUnanswer from "./QuesUnanswer.js";

class Home extends Component {
  state = {
    show: "unanswered"
  };

  handleTab = (e) => {
    this.setState({
      show: e.target.id
    });
  };

  render() {
    console.log(this.props);
    const { authen, ansQueIds, unansQueIds } = this.props;
    const { show } = this.state;
    let questionIds = null;

    if (!authen) {
      return <Redirect to="/" />;
    }

    if (show === "answered") {
      questionIds = ansQueIds;
    } else {
      questionIds = unansQueIds;
    }
    console.log(this.props);
    return (
      <div>
        <ListGroup horizontal className="justify-content-center ">
          <ListGroup.Item
            id="unanswered"
            className="tab-flat"
            onClick={this.handleTab}
          >
            Unanswered Questions
          </ListGroup.Item>
          <ListGroup.Item
            id="answered"
            className="tab-flat"
            onClick={this.handleTab}
          >
            Answered Questions
          </ListGroup.Item>
        </ListGroup>
        <div>
          <QuestionPage questionIds={questionIds} show={show} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authUser, questions, users }) {
  if (authUser !== null && Object.keys(questions).length !== 0) {
    const questionIds = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );

    const ansQueIds = Object.keys(users[authUser].answers).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    const unansQueIds = questionIds.filter(
      (queid) => !ansQueIds.includes(queid)
    );

    return {
      authen: authUser !== null,
      ansQueIds,
      unansQueIds
    };
  } else {
    return {
      authen: authUser !== null,
      ansQueIds: null,
      unansQueIds: null
    };
  }
}


export default withRouter(connect(mapStateToProps)(Home));
