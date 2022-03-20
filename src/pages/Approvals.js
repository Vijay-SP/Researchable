/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { db } from '../firebase';
import Card from '../components/Blogs/Card';

const Approvals = () => {
  const [collabApprovals, setCollabApprovals] = useState([]);
  const [quoteApprovals, setQuoteApprovals] = useState([]);


  useEffect(() => {
    db.collection('Collabs')
      .get()
      .then((snapshot) => {
        const blogs = [];
        snapshot.forEach((doc) => {
          if (doc.data().isApproved === false || doc.data().isFeatured === false || doc.data().isFeatured === true) {
            const data = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              authorName: doc.data().authorName,
              isFeatured: doc.data().isFeatured,
              updated_on: doc.data().updated_on,
              isApproved: doc.data().isApproved,
              userId: doc.data().userId,
            };
            blogs.push(data);
          }
        });
        setCollabApprovals(blogs);
      });
  }, []);


  useEffect(() => {
    db.collection('Quotes')
      .get()
      .then((snapshot) => {
        const quotes = [];
        snapshot.forEach((doc) => {
          if (doc.data().isApproved === false || doc.data().isFeatured === false || doc.data().isFeatured === true) {
            const data = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              authorName: doc.data().authorName,
              isFeatured: doc.data().isFeatured,
              updated_on: doc.data().updated_on,
              isApproved: doc.data().isApproved,
              userId: doc.data().userId,
            };
            quotes.push(data);
          }
        });
        setQuoteApprovals(quotes);
      });
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar />
      <div>
        {collabApprovals.length > 0 && (
          <div style={{ zIndex: '2' }}>
            <div
              className="d-flex flex-column align-items-center justify-content-center py-5"
              style={{ width: '100vw', backgroundColor: 'white' }}
            >
              <h2
                className="pt-3 text-dark text-capitalize font-weight-bold fs-1 p-0 m-0 "
                style={{
                  paddingLeft: '20px',
                  fontFamily: 'Dancing Script',
                  borderBottom: '2px solid #222',
                  paddingBottom: '1px',
                }}
              >
                Approve Blogs
              </h2>

              <div
                className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
                style={{ width: '100vw' }}
              >
                {collabApprovals.map(
                  ({
                    description,
                    title,
                    updated_on,
                    id,
                    authorName,
                    isFeatured,
                    isApproved,
                    userId
                  }) => {
                    return (
                      <Card
                        content={description}
                        title={title}
                        date={updated_on}
                        url={`/approvals/collabs/${id}`}
                        author={authorName}
                        isApproved={isApproved}
                        isFeatured={isFeatured}
                        userId={userId}
                      />
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}


        {quoteApprovals.length > 0 && (
          <div
            className="d-flex flex-column align-items-center justify-content-center py-5"
            style={{ width: '100vw', backgroundColor: 'white' }}
          >
            <h2
              className="pt-3 text-dark text-capitalize font-weight-bold fs-1 p-0 m-0 "
              style={{
                paddingLeft: '20px',
                fontFamily: 'Dancing Script',
                borderBottom: '2px solid #222',
                paddingBottom: '1px',
              }}
            >
              approve quotes
            </h2>

            <div
              className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
              style={{ width: '100vw' }}
            >
              {quoteApprovals.map(
                ({ img, description, title, updated_on, id, authorName, isApproved, isFeatured, userId }) => {
                  return (
                    <Card
                      img={img}
                      content={description}
                      title={title}
                      date={updated_on}
                      url={`/approvals/quotes/${id}`}
                      author={authorName}
                      isApproved={isApproved}
                      isFeatured={isFeatured}
                      userId={userId}
                    />
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;
