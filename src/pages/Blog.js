/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import './Blog.css';

import Comments from '../components/Comments/Comments';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';

const Blog = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState();
  const [comment, setComment] = useState('');
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [reposuccess, setrepoSuccess] = useState(false);
  const [repoerror, setrepoError] = useState(false);
  const [tlikes, setTlikes] = useState([]);
  const history = useHistory();

  const { currentUser } = useAuth();
  useEffect(() => {
    const single = db.collection('Blogs').doc(id);

    single
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          setBlog(data);
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });

    db.collection('Blogs')
      .doc(id)
      .collection('comment')
      .get()
      .then((snapshot) => {
        const comm = [];
        snapshot.forEach((doc) => {
          comm.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            comment: doc.data().comment,
            created_at: doc.data().created_at,
          });
        });
        setComments(comm);
      });
  }, [id]);

  useState(() => {
    db.collection('Blogs')
      .doc(id)
      .collection('like')
      .get()
      .then((snapshot) => {
        const dat = [];
        snapshot.forEach((doc) => {
          dat.push(doc.data());
        });
        setTlikes(dat);
      });
  },
    []);


  const addComment = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      history.push('/login');
      setSuccess(false);
      setError(true);
    } else {
      const commentData = {
        userId: currentUser.id,
        name: currentUser.username,
        email: currentUser.email,
        comment: comment,
        created_at: new Date().toString(),
      };
      try {
        await db.collection('Blogs').doc(id).collection('comment').add({
          name: currentUser.username,
          email: currentUser.email,
          comment: comment,
          userId:currentUser.id,
          created_at: new Date().toString(),
        });
        setError(false);
        setSuccess(true);
        setComments([commentData, ...comments]);
      } catch (error) {
        setSuccess(false);
        setError(true);
      }
    }
  };

  const reportBlog = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      history.push('/login');
      setrepoSuccess(false);
      setrepoError(true);
    } else {
      try {
        await db.collection('Reports').doc().set({
          name: currentUser.username,
          email: currentUser.email,
          reason: reason,
          url: `/blogs/${id}`,
          created_at: new Date().toString(),
        });
        setrepoError(false);
        setrepoSuccess(true);
      } catch (error) {
        setrepoSuccess(false);
        setrepoError(true);
      }
    }
  };

  const AddLike = async (e) => {
    if (!currentUser) {
      history.push('/login');
    } else {
      await db.collection('Blogs').doc(`/${id}/like/${currentUser.id}`).set({
        like: 1,
      });
      db.collection('Blogs')
        .doc(id)
        .collection('like')
        .get()
        .then((snapshot) => {
          const dat = [];
          snapshot.forEach((doc) => {
            dat.push(doc.data());
          });
          setTlikes(dat);
        });
    }
  };

  const Unlike = async (e) => {
    if (!currentUser) {
      history.push('/login');
    } else {
      await db
        .collection('Blogs')
        .doc(`/${id}/like/${currentUser.id}`)
        .delete();
      db.collection('Blogs')
        .doc(id)
        .collection('like')
        .get()
        .then((snapshot) => {
          const dat = [];
          snapshot.forEach((doc) => {
            dat.push(doc.data());
          });
          setTlikes(dat);
        });
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      {blog ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8">
              <article>
                <header className="mb-4">
                  <h1 className="fw-bolder mb-1">{blog.title}</h1>

                  <div className="text-muted fst-italic mb-2">
                    Posted on {blog.updated_on}, 2021 by {blog.authorName}
                  </div>

                  <div>
                    <div>
                      <button className="btn btn-light" onClick={AddLike}>
                        <HandThumbsUpFill />
                      </button>

                      {tlikes && (
                        <span class="badge rounded-pill bg-secondary">
                          {tlikes.length}
                        </span>
                      )}
                      <button className="btn btn-light" onClick={Unlike}>
                        <HandThumbsDownFill />
                      </button>
                    </div>
                  </div>

                  {blog.categories &&
                    blog.categories.map((c) => (
                      <p
                        className="badge bg-secondary text-decoration-none link-light fs-6 mt-3"
                        style={{ marginRight: '5px' }}
                        href="#!"
                      >
                        {c}
                      </p>
                    ))}
                </header>
                <figure className="mb-4">
                  <img
                    className="img-fluid rounded"
                    src={blog.images[0]}
                    alt="hello"
                    style={{ height: '520px', width: '800px' }}
                  />
                </figure>

                <section className="mb-5 " style={{ textAlign: 'justify' }}>
                  <p className="fs-5 mb-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    />
                  </p>
                </section>
                <Comments comments={comments} />
              </article>
            </div>

            <div className="col-lg-4">
              {/* author details, adding dynamic images and social media links */}
              <div className="author-details d-flex flex-column border py-3">
                <p
                  className="author ps-3 ms-3 "
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  AUTHOR WIDGETS
                </p>
                <figure className="mb-4 d-flex justify-content-center">
                  <img
                    className="img-fluid author-img"
                    src="https://images.unsplash.com/photo-1579293676244-953f569610cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGF1dGhvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="hello"
                    style={{
                      height: '300px',
                      width: '300px',
                    }}
                  />
                </figure>

                <div className="d-flex justify-content-center flex-column align-items-center pb-5">
                  <p><Link to={`/user/${blog.userId}`}>{blog.authorName}</Link></p>
                </div>
                <div className="py-4">
                  <p
                    className="author ps-3 ms-3"
                    style={{
                      position: 'relative',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      fontFamily: 'sans-serif',
                      color: '#222',
                    }}
                  >
                    SOCIAL SHARE
                  </p>
                  <ul className="d-flex" style={{ listStyle: 'none' }}>
                    <li className="px-1">
                      <TwitterShareButton
                        url={window.location.href}
                        quote={blog.title}
                      >
                        <TwitterIcon
                          logoFillColor="white"
                          size="53"
                          round={true}
                        ></TwitterIcon>
                      </TwitterShareButton>
                    </li>
                    <li className="px-1">
                      <FacebookShareButton
                        url={window.location.href}
                        quote={blog.title}
                      >
                        <FacebookIcon
                          logoFillColor="white"
                          size="53"
                          round={true}
                        ></FacebookIcon>
                      </FacebookShareButton>
                    </li>
                    <li className="px-1">
                      <WhatsappShareButton
                        url={window.location.href}
                        quote={blog.title}
                      >
                        <WhatsappIcon
                          logoFillColor="white"
                          size="53"
                          round={true}
                        ></WhatsappIcon>
                      </WhatsappShareButton>
                    </li>

                    <li className="px-1">
                      <TelegramShareButton
                        url={window.location.href}
                        quote={blog.title}
                      >
                        <TelegramIcon
                          logoFillColor="white"
                          size="53"
                          round={true}
                        ></TelegramIcon>
                      </TelegramShareButton>
                    </li>
                  </ul>
                </div>
                <div className="popular-posts py-4">
                  <p
                    className="author ps-3 ms-3 "
                    style={{
                      position: 'relative',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      fontFamily: 'sans-serif',
                      color: '#222',
                    }}
                  >
                    POPULAR POSTS
                  </p>

                  {/* add dynamic data and link to correct blog */}
                  <div className="post ps-3 ">
                    {/* blog1 */}
                    <div className="d-flex flex-row single-post">
                      <Link to="/blogs" style={{ textDecoration: 'none' }}>
                        <figure className="mb-4">
                          <img
                            className="img-fluid"
                            src={blog.images[0]}
                            alt="hello"
                            style={{
                              height: '100px',
                              width: '100px',
                              borderRadius: '5%',
                            }}
                          />
                        </figure>
                      </Link>
                      <div className="p-3">
                        <p className="popular-blog-title">{blog.title}</p>
                        <p className="popular-blog-comment">
                          BY - &nbsp;
                          <span style={{ fontWeight: 'bold' }}>
                            {blog.authorName}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* blog2 */}
                    <div className="d-flex flex-row single-post">
                      <Link to="/blogs" style={{ textDecoration: 'none' }}>
                        <figure className="mb-4">
                          <img
                            className="img-fluid"
                            src={blog.images[0]}
                            alt="hello"
                            style={{
                              height: '100px',
                              width: '100px',
                              borderRadius: '5%',
                            }}
                          />
                        </figure>
                      </Link>
                      <div className="p-3">
                        <p className="popular-blog-title">{blog.title}</p>
                        <p className="popular-blog-comment">
                          BY - &nbsp;
                          <span style={{ fontWeight: 'bold' }}>
                            {blog.authorName}
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* blog3  */}
                    <div className="d-flex flex-row single-post">
                      <Link to="/blogs" style={{ textDecoration: 'none' }}>
                        <figure className="mb-4">
                          <img
                            className="img-fluid"
                            src={blog.images[0]}
                            alt="hello"
                            style={{
                              height: '100px',
                              width: '100px',
                              borderRadius: '5%',
                            }}
                          />
                        </figure>
                      </Link>
                      <div className="p-3">
                        <p className="popular-blog-title">{blog.title}</p>
                        <p className="popular-blog-comment">
                          BY - &nbsp;
                          <span style={{ fontWeight: 'bold' }}>
                            {blog.authorName}
                          </span>
                        </p>
                      </div>
                    </div>
                    {/* blog4 */}
                    <div className="d-flex flex-row single-post">
                      <Link to="/blogs" style={{ textDecoration: 'none' }}>
                        <figure className="mb-4">
                          <img
                            className="img-fluid"
                            src={blog.images[0]}
                            alt="hello"
                            style={{
                              height: '100px',
                              width: '100px',
                              borderRadius: '5%',
                            }}
                          />
                        </figure>
                      </Link>
                      <div className="p-3">
                        <p className="popular-blog-title">{blog.title}</p>
                        <p className="popular-blog-comment">
                          BY - &nbsp;
                          <span style={{ fontWeight: 'bold' }}>
                            {blog.authorName}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column border py-3 my-3">
                <p
                  className="author ps-3 ms-3"
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  MORE
                </p>
                <div className="card-body">
                  <div className="col-12">
                    <ul className="list-unstyled d-flex flex-wrap justify-content-start flex-row">
                      <li className="px-2">
                        <Link to="/blogs" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Blogs</p>
                        </Link>
                      </li>
                      <li className="px-2">
                        <Link to="/shayaris" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Shayaris</p>
                        </Link>
                      </li>

                      <li className="px-2">
                        <Link to="/kavitas" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Kavitas</p>
                        </Link>
                      </li>
                      <li className="px-2">
                        <Link to="/quotes" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Quotes</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column border py-3 my-3">
                <p
                  className="author ps-3 ms-3"
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  LEAVE A COMMENT
                </p>
                {success && (
                  <span>
                    <div class="alert alert-success" role="alert">
                      Comment posted
                    </div>
                  </span>
                )}
                {error && (
                  <span>
                    <div class="alert alert-danger" role="alert">
                      oops something went wrong!
                    </div>
                  </span>
                )}
                <form
                  action="POST"
                  className="p-3"
                  style={{
                    color: '#222',
                    fontFamily: 'sans-serif',
                    fontWeight: '600',
                  }}
                  onSubmit={addComment}
                >
                  <div class="form-group py-3">
                    <label className="pb-1" for="exampleFormControlTextarea1">
                      Comment
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <p
                    className="button-author py-1"
                    style={{
                      width: '50%',
                    }}
                  >
                    <button
                      type="submit"
                      className="btn"
                      style={{ fontWeight: 'bold' }}
                    >
                      Post Comment
                    </button>
                  </p>
                </form>
              </div>


              <div className="d-flex flex-column border py-3 my-3">
                <p
                  className="author ps-3 ms-3"
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  REPORT THE BLOG
                </p>
                {reposuccess && (
                  <span>
                    <div class="alert alert-success" role="alert">
                      Report posted
                    </div>
                  </span>
                )}
                {repoerror && (
                  <span>
                    <div class="alert alert-danger" role="alert">
                      oops something went wrong!
                    </div>
                  </span>
                )}
                <form
                  action="POST"
                  className="p-3"
                  style={{
                    color: '#222',
                    fontFamily: 'sans-serif',
                    fontWeight: '600',
                  }}
                  onSubmit={reportBlog}
                >
                  <div class="form-group py-3">
                    <label className="pb-1" for="exampleFormControlTextarea1">
                      Report Reason
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      required
                      onChange={(e) => setReason(e.target.value)}
                    ></textarea>
                  </div>

                  <p
                    className="button-author py-1"
                    style={{
                      width: '50%',
                    }}
                  >
                    <button
                      type="submit"
                      className="btn"
                      style={{ fontWeight: 'bold' }}
                    >
                      Report
                    </button>
                  </p>
                </form>
              </div>


            </div>
          </div>
        </div>




      ) : (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Blog;
