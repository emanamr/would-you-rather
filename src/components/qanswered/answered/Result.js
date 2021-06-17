import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

class Result extends Component {
  render() {
    return (
      <div>
        <Card border="secondary" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Text>Would you rather..option 1?...</Card.Text>
            <ProgressBar animated now={60} variant="success" />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Result;
