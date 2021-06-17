import React, { Component } from "react";
import { connect } from "react-redux";
import {Card ,Form ,Button} from "react-bootstrap";
import {Link , Redirect} from "react-router-dom";

import { handleCreateQuestion } from "../../redux/action/questionaction";
import { handleSaveQuestion } from "../../redux/action/showactions"


class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: ""
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log("state****",this.state)
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
	console.log("option****",optionOne, optionTwo )
    const {authUser, handleSaveUserQuestion} = this.props;
    handleSaveUserQuestion(optionOne, optionTwo)
    
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    return (
      <div>
        <br />
        <br />
        <Card>
          <Card.Header>
            <br />
            <h6>Create New Question</h6>
          </Card.Header>
          <Card.Body>
            <form onSubmit={this.submitHandler}>
              <p>Complete the question</p>
              <h5>Would you rather...</h5>
              <br />
              <Form.Control
                type="text"
                name="optionOne"
                placeholder="Enter option 1"
                value={optionOne}
                onChange={this.handleChange}
              />
              <br />
              OR
              <br />
              <Form.Control
                type="text"
                name="optionTwo"
                placeholder="Enter option 2"
                value={optionTwo}
                onChange={this.handleChange}
              />
              <br />
			
              <Button variant="flat" onClick={this.submitHandler}>
                submit
              </Button>
		
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser
  };
}
function mapDispatchToProps(dispatch,history) {
  return {
    handleSaveUserQuestion( optionOne, optionTwo ) {
      dispatch(handleSaveQuestion (optionOne, optionTwo)).then(() => {
           <Redirect to={"/home"} />
        });
    }
  };
}
export default connect(mapStateToProps , mapDispatchToProps)(NewQuestion);
