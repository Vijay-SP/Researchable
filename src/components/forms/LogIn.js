/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import writer from '../../images/writer.png';
import './Login.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { LogIn } = useAuth();
  const { currentUser } = useAuth();
  const history = useHistory();

  if (currentUser) {
    history.push('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await LogIn(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(console.log(error.message));
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar />
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-xl-5 mx-auto">
            <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden no-hover">
              <div class="card-body p-4 p-sm-5">
                <div>
                  <p
                    class="card-title text-center mb-5"
                    style={{ fontFamily: 'Dancing Script', fontSize: '30px' }}
                  >
                    <span className="p-2">
                      <img src={writer} alt="" width="55" height="50" />
                    </span>
                    Researchable
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                      ref={emailRef}
                      style={{
                        borderStyle: 'none',
                        borderRadius: '0px',
                        borderBottom: '1px solid grey',
                      }}
                    />
                    <label for="floatingInputEmail">Email address</label>
                  </div>

                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      ref={passwordRef}
                      style={{
                        borderStyle: 'none',
                        borderRadius: '0px',
                        borderBottom: '1px solid grey',
                      }}
                    />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div class="d-grid mb-2">
                    <button
                      class="btn btn-lg btn-secondary btn-login fw-bold text-uppercase"
                      type="submit"
                      style={{ fontFamily: 'Dancing Script' }}
                    >
                      Sign in
                    </button>
                  </div>

                  <Link class="d-block text-center mt-2 small" to="/signup">
                    Dont have an account? Register
                  </Link>

                  <Link
                    class="d-block text-center mt-2 small"
                    to="resetpassword"
                  >
                    Forgot password ?
                  </Link>

                  <hr class="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
