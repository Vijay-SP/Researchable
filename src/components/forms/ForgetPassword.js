import React, { useRef, useState } from 'react';
import { auth } from '../../firebase';

const ForgetPassword = () => {
  const emailRef = useRef();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const resetpassword = async () => {
    try {
      await auth.sendPasswordResetEmail(emailRef.current.value);
      setSuccess(true);
      setError(false);
    } catch (error) {
      setSuccess(false);
      setError(true);
    }
  };

  return (
    <div>
      <div class='form-group'>
        <span>
          {success && (
            <div class='alert alert-success' role='alert'>
              Please Check your email!
            </div>
          )}
          {error && (
            <div class='alert alert-danger' role='alert'>
              something went wrong!
            </div>
          )}
        </span>
        <label for='exampleInputEmail1'>Email address</label>
        <input
          type='email'
          class='form-control'
          placeholder='Enter email'
          ref={emailRef}
        />
        <small id='emailHelp' class='form-text text-muted'>
          We'll never share your email with anyone else.
        </small>
        <button className='btn btn-primary' onClick={resetpassword}>
          ResetPassword
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
