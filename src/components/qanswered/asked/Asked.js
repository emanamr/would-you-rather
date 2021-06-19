import React, { Component } from "react";
import { connect } from "react-redux";
import { Table,Form,Button,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
//import Question from "./Question";
import { AnsweredQuestion } from "../../../redux/action/questionaction";
import { addAnswerToUser } from "../../../redux/action/useractions";
import { handleSaveAnswer} from '../../../redux/action/showactions';
class Asked extends Component {
    state = {
    optionSelect: "",
    option:""
  };

  handleOptionSelect = (e) => {
    this.setState({
      optionSelect: e.target.value,
      option:e.target.id
    });
    console.log(this.state);
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { authUser, queId, question, handleSaveUserAnswer,dispatch } = this.props;
    const { optionSelect, option} = this.state;
	/*handleSaveUserAnswer({
      authUser,
      queId,
      answer
    })*/
    dispatch(AnsweredQuestion({ authUser, queId, answer:option}))
   /* dispatch(
      AnsweredQuestion({
        authUser,
        queId,
        answer: optionSelect
      })
    
    );
  console.log(AnsweredQuestion)
    dispatch(
      addAnswerToUser({
        authUser,
        queId,
        answer: optionSelect
      })
    );*/
  };
  render() {
    const { queId, name, avatarURL, optionOne, optionTwo } = this.props;
    return (
      <div>
        <br />
        <br />
        <Card>
          <Card.Body>
            <Table>
              <tbody>
                <tr>
                  <td colSpan="3">
                    <div>{name} asks:</div>
                  </td>
                </tr>
                <tr>
                  <td rowSpan="2">
                    <div className="round">
                      <img alt="" src={avatarURL} />
                    </div>
                  </td>
                  <td colSpan="2">
                       <Form onSubmit={this.handleSubmit}>
          <h4>Would you rather</h4>

          <div className="mb-3">
            <div>
              <Form.Check
                inline
                label={optionOne}
                name="group1"
                type="radio"
                id='optionOne'
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
                id='optionTwo'
                value={optionTwo}
                onClick={this.handleOptionSelect}
              />
            </div>
          </div>

        
            <Button variant="flat" onClick={this.handleSubmit}>
              submite
            </Button>
      
        </Form>
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

  const queId = params.id;
   
  const user = questions[queId].author;
  const { name, avatarURL } = users[user];
  const optionOne = questions[queId].optionOne.text;
  const optionTwo = questions[queId].optionTwo.text;
  
  const question = {
        id: '',
        optionOne: { text: '' },
        optionTwo: { text: '' },
        answerState: 0,
        answerStatitistics: {
            optionOne: 0,
            optionTwo: 0
        },
        author: {
            name: '',
            avatarURL: '',
            id: ''
        }
    }

    const isPresent = Object.keys(questions).includes(queId)
  
  return {authUser, queId, name, avatarURL, optionOne, optionTwo };
}

/*function mapDispatchToProps(dispatch) {
  return {
    handleSaveUserAnswer({ authUser, queId, answer }) {
      dispatch( handleSaveAnswer({ authUser, queId, answer }));
    }
  };
}*/
export default connect(mapStateToProps)(Asked);
