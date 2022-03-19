/* eslint-disable no-unused-vars */
import React from 'react';
import { MenuDown } from 'react-bootstrap-icons';
import { PersonFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import writer from '../images/writer.png';
import { useAuth } from '../context/AuthContext';
import { MusicNoteBeamed } from 'react-bootstrap-icons';
import { useHistory } from 'react-router';
import { Button } from 'bootstrap';
import './Nav.css';

const Navbar = ({ backButton }) => {
  const { currentUser, SignOut } = useAuth();
  const history = useHistory();

  return (
    <div className="" style={{ width: '100vw' }}>
      <nav
        class="navbar navbar-expand-md sticky-top navbar-light bg-light"
        style={{ height: '70px' }}
      >
        <div class="container-fluid">
          <span className="p-2 align-items-center">
            <img src={writer} alt="" width="50" height="45" />
          </span>
          <Link
            className="navbar-brand d-flex align-items-center"
            to="/"
            style={{ fontFamily: 'Dancing Script', fontSize: '24px' }}
          >
            Researchable
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <MenuDown />
            </span>
          </button>
          <div class="collapse navbar-collapse bg-light" id="navbarNav">
            <ul
              class="navbar-nav ml-auto justify-content-start"
              style={{ fontSize: '16px' }}
            >
              <li class="navbar-brand">
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li class="navbar-brand">
                <Link
                  class="nav-link"
                  to="/blogs"
                  smooth={true}
                  duration={500}
                >
                  Collab Requests
                </Link>
              </li>
              <li class="navbar-brand">
                <Link class="nav-link" to="/quotes">
                  Mentors
                </Link>
              </li>
              <li class="navbar-brand">
                <Link class="nav-link" to="/contact">
                  Contact
                </Link>
              </li>

            </ul>
          </div>


          <div class="collapse navbar-collapse  bg-light" id="navbarNav">
            <ul class="navbar-nav ml-auto" style={{ fontSize: '16px' }}>
              {currentUser && currentUser.username ? (
                <>
                  <li class="navbar-brand">
                    <button
                      className="btn btn-light"
                      onClick={() =>
                        history.push(`/users/${currentUser.username}`)
                      }
                    >
                      <PersonFill fontSize="25" className="mr-2" />{' '}
                      {currentUser.username}
                    </button>
                  </li>
                  <li class="navbar-brand">
                    <button
                      className="btn btn-light"
                      onClick={() => {
                        SignOut();
                        history.push('/login');
                      }}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li class="navbar-brand">
                  <button
                    className="btn btn-light"
                    onClick={() => history.push('/login')}
                  >
                    Sign in
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;