import React from "react";
import SignIn from "../../components/Sign-in/sign-in.component";
import SignUp from "../../components/Sign-up/sign-up.component";
import "./sing-in-and-Sign-up.styles.scss"

const SignInAndSignUpPage = () => {
    return(
    <div className="sign-in-and-sign-up">
        <SignUp />
        <SignIn />
    </div>
    );
};

export default SignInAndSignUpPage;