/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import { db } from '../../firebase';

const QuoteApprovals = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [quote, setQuote] = useState();
  useEffect(() => {
    const single = db.collection('Quotes').doc(id);

    single
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          setQuote(data);
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }, []);

  const handleApprove = async () => {
    try {
      await db.collection('Quotes').doc(id).update({
        isApproved: true,
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
  };

  const handleNotApprove = async () => {
    try {
      await db.collection('Quotes').doc(id).delete();
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
  };

  const handleFeatured = async () => {
    try {
      await db.collection('Quotes').doc(id).update({
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
      await db.collection('Quotes').doc(id).update({
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
      {quote ? (
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
                <button className="btn btn-success m-2" onClick={handleApprove}>
                  Approve
                </button>
                <button
                  className="btn btn-danger m-2"
                  onClick={handleNotApprove}
                >
                  DisApprove
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
                  Posted on {quote.updated_on}, 2021 <br /> by{' '}
                  {quote.authorName}
                </div>
              </header>

              <section
                className="mb-5 "
                style={{ textAlign: 'justify', width: '300px' }}
              >
                <p className="fs-5 mb-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: quote.description }}
                  />
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

export default QuoteApprovals;
