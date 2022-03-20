/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import { db } from '../../firebase';

const CollabApprovals = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [collab, setcollab] = useState();
  useEffect(() => {
    const single = db.collection('Collabs').doc(id);

    single
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          setcollab(data);
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }, []);

  const handleApprove = async () => {
    try {
      await db.collection('Collabs').doc(id).update({
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
      await db.collection('Collabs').doc(id).delete();
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
      await db.collection('Collabs').doc(id).update({
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
      await db.collection('Collabs').doc(id).update({
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
      {collab ? (
        <div className="container mt-5">
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
                <h1 className="fw-bolder mb-1">{collab.title}</h1>
                <button className="btn btn-success ms-3" onClick={handleApprove}>
                  Approve
                </button>

                <button className="btn btn-danger ms-3" onClick={handleNotApprove}>
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
                  Posted on {collab.updated_on}, 2021 <br /> by {collab.authorName}
                </div>
              </header>

              <section
                className="mb-5 "
                style={{ textAlign: 'justify', width: '800px' }}
              >
                <p className="fs-5 mb-4">
                  <div dangerouslySetInnerHTML={{ __html: collab.description }} />
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

export default CollabApprovals;
