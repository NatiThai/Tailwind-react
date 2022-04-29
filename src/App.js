import React,{useEffect} from "react";
import { connect, useDispatch } from "react-redux";
import { Switch,Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import LandingPage from "./layout/LandingPage";
import ManinLayout from "./layout/MainLayout";

import HomePage from "./page/Home";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors"
import SignInAndSignUpPage from "./page/Sign-in-and-Sign-up/Sign-in-and-Sign-up";
const App = ({currentUser}) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
  },[]);  

  return (
    <div>
      <Switch>
      <Route exact path="/">
          <LandingPage heading="Hello world">
            <HomePage />
          </LandingPage>
      </Route>
      
      <Route exact path="/signin" render={() =>
        currentUser ? <Redirect to='/' /> : (
          <ManinLayout>
            <SignInAndSignUpPage />
          </ManinLayout>
        )}
      />
      
    </Switch>
    </div>
    
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);