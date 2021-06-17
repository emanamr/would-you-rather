import React, { Component } from "react";
import { connect } from "react-redux";
import Questioncard from "./Questioncard";

class QuestionAnswer extends Component {
  render() {
    console.log(this.props);
    const { questionIds, show } = this.props;
    return (
      <div>
        <ol>
          {questionIds.map((id) => (
            <li key={id}>
              <Questioncard id={id} show={show} />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default connect()(QuestionAnswer);
