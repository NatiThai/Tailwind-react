import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { googleProvider,signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) =>  {
  const [userCredentials, setCredentials ] = useState({ email:"", password:"" })

  const { email, password } = userCredentials;
  const handleSubmit = async event => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;

    setCredentials({...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          placeholder="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          placeholder="password"
          required
        />
        <div className="buttons">
          <button type="submit"> Sign in </button>
          <button type="button" onClick={signInWithGoogle} isgooglesigninstart="true">
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}


const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null,mapDispatchToProps)(SignIn);