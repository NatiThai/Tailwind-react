import React, { useState } from "react";
import { connect } from "react-redux";
import { signUpStart } from "../../redux/user/user.actions";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";

const SignUp = ({signUpStart}) => {
    const [userCrdeentials, setUserCredentials] = useState({
        displayName:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const {displayName,email,password,confirmPassword} = userCrdeentials;

    const handleSubmit = async evt => {
        evt.preventDefault();

        if(password !== confirmPassword) {
            alert("password don't match")
            return;
        }
        signUpStart({displayName,email,password});
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setUserCredentials({...userCrdeentials, [name]:value })
    }

    return (
        <div className="sign-up">
            <h2>I do not have a account</h2>
            <span> Sign up with your email and password </span>
            
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    placeholder="Display Name"
                    onChange={handleChange}
                    required
                />
                <FormInput
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
                />
                <FormInput
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                required
                />
                <FormInput
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Sign Up</button> 
            </form>
            
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCrdeentials => dispatch(signUpStart(userCrdeentials))
})

export default connect(null,mapDispatchToProps)(SignUp);