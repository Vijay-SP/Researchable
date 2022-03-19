/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import { db } from '../../firebase';

const BlogApprovals = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [blog, setBlog] = useState();
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
  }, []);

  const handleApprove = async () => {
    try {
      await db.collection('Blogs').doc(id).update({
        isApproved: true,
      });
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleNotApprove = async () => {
    try {
      await db.collection('Blogs').doc(id).delete();
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleFeatured = async () => {
    try {
      await db.collection('Blogs').doc(id).update({
        isFeatured: true,
      });
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }

  const handleNotFeatured = async () => {
    try {
      await db.collection('Blogs').doc(id).update({
        isFeatured: false,
      });
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar />
      {blog ? (
        <div className="container mt-5">
          <figure className="mb-4">
            <img
              className="img-fluid rounded"
              src={blog.images[0]}
              alt="hello"
              style={{ height: '520px', width: '800px' }}
            />
          </figure>
          <div>
            <article>
              {success && (
                <div class="alert alert-success" role="alert">
                  Success!
                </div>
              )}
              {error && (
                <div class="alert alert-danger" role="alert">
                  Opps something went wrong
                </div>
              )}
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{blog.title}</h1>
                <button className="btn btn-success" onClick={handleApprove}>
                  Approve
                </button>

                <button className="btn btn-danger" onClick={handleNotApprove}>
                  Disapprove
                </button>
                <button className="btn btn-success ms-3" onClick={handleFeatured}>
                  Feature
                </button>
                <button
                  className="btn btn-danger ms-3"
                  onClick={handleNotFeatured}
                >
                  Not Feature
                </button>
                <div className="text-muted fst-italic mb-2">
                  Posted on {blog.updated_on}, 2021 <br /> by {blog.authorName}
                </div>
              </header>

              <section
                className="mb-5 "
                style={{ textAlign: 'justify', width: '800px' }}
              >
                <p className="fs-5 mb-4">
                  <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                </p>
              </section>
            </article>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default BlogApprovals;
