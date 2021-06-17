import React, { Component, Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import "./css/style.scss";
import { handleInitialData } from "./redux/action/showactions";

import Answered from "./components/qanswered/answered/Answered";
import Header from "./components/Header";
import Home from "./components/home/Home";
import Sign from "./components/sign/Sign";
import NewQuestion from "./components/qanswered/NewQuestion";
import Leader from "./components/leader/Leader";
import Asked from "./components/qanswered/asked/Asked";
import NotFound from "./components/NotFound"
import PrivateRoute from "./PrivateRoute"

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authUser, loading } = this.props;
    return (
      <div className="App">
       
          <Fragment>
            <LoadingBar />
            <Header  />
              <Switch>
          	<Route path="/login" component={Sign} />
            <PrivateRoute path="/home" component={Home} />
            <Redirect exact from="/" to="/home" />
            <PrivateRoute path="/add" component={NewQuestion} />
            <PrivateRoute path="/leaderboard" component={Leader} />
            <PrivateRoute path="/questions/:id" component={Asked} />
			<PrivateRoute path="/answer/:id" component={Answered} />
            <PrivateRoute path="*" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
          </Fragment>
        
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return { authUser, loading: authUser === null };
}
export default connect(mapStateToProps)(App);
