import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { formatQuestion } from "../../../Utils/_DATA";
class Question extends Component {
  state = {
    optionSelect: ""
  };

  handleOptionSelect = (e) => {
    this.setState({
      optionSelect: e.target.value
    });
    console.log("o", e.target.value);
  };


  render() {
    const { optionOne, optionTwo, queId,question } = this.props;
  

    //const optionSelect = this.state;
    return (
      <div>
        <Form>
          <h4>Would you rather</h4>

          <div className="mb-3">
            <div>
              <Form.Check
                inline
                label={optionOne}
                name="group1"
                type="radio"
                id={`inline-radio-1`}
                value={optionOne}
                onClick={this.handleOptionSelect}
              />
            </div>
            <div>
              <Form.Check
                inline
                label={optionTwo}
                name="group1"
                type="radio"
                id={`inline-radio-2`}
                value={optionTwo}
                onClick={this.handleOptionSelect}
              />
            </div>
          </div>

          <Link to={`/answer/${queId}`}>
            <Button variant="flat" onClick={this.handleSubmit}>
              submite
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}
function mapStateToProps({ authUser, users, questions }, ownProps) {
  const queId = ownProps.quesId;
  const optionOne = ownProps.option1;
  const optionTwo = ownProps.option2;
  const question = ownProps.question;
  console.log("/",authUser, queId, ownProps);
  return {
  	authUser,
    queId,
    optionOne,
    optionTwo,
    question: question
      ? formatQuestion(question, users[question.author])
      : null
  };
}
/*const mapDispatchToProps = (dispatch) => ({
  answerQues: ({ authUser, queId, selectedOption }) =>
    dispatch(AnsweredQuestion({ authUser, queId, selectedOption })) 
});*/
export default connect(mapStateToProps)(Question);
