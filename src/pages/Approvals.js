/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { db } from '../firebase';
import Card from '../components/Blogs/Card';

const Approvals = () => {
  const [kavitaApprovals, setKavitaApprovals] = useState([]);
  const [shayriApprovals, setShayriApprovals] = useState([]);
  const [blogApprovals, setBlogApprovals] = useState([]);
  const [quoteApprovals, setQuoteApprovals] = useState([]);

  useEffect(() => {
    db.collection('Poems')
      .get()
      .then((snapshot) => {
        const kavitas = [];
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
            kavitas.push(data);
          }
        });
        setKavitaApprovals(kavitas);
      });
  }, []);

  useEffect(() => {
    db.collection('Blogs')
      .get()
      .then((snapshot) => {
        const blogs = [];
        snapshot.forEach((doc) => {
          if (doc.data().isApproved === false || doc.data().isFeatured === false || doc.data().isFeatured === true) {
            const data = {
              id: doc.id,
              image: doc.data().images[0],
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
        setBlogApprovals(blogs);
      });
  }, []);

  useEffect(() => {
    db.collection('Shayris')
      .get()
      .then((snapshot) => {
        const shyris = [];
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
            shyris.push(data);
          }
        });
        setShayriApprovals(shyris);
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
        {blogApprovals.length > 0 && (
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
                {blogApprovals.map(
                  ({
                    image,
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
                        img={image}
                        content={description}
                        title={title}
                        date={updated_on}
                        url={`/approvals/blogs/${id}`}
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
        {shayriApprovals.length > 0 && (
          <div>
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
                Approve Shayris
              </h2>

              <div
                className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
                style={{ width: '100vw' }}
              >
                {shayriApprovals.map(
                  ({
                    img,
                    description,
                    title,
                    updated_on,
                    id,
                    authorName,
                    isApproved,
                    isFeatured,
                    userId
                  }) => {
                    return (
                      <Card
                        img={img}
                        content={description}
                        title={title}
                        date={updated_on}
                        url={`/approvals/shayris/${id}`}
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
        {kavitaApprovals.length > 0 && (
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
              approve kavitas
            </h2>

            <div
              className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
              style={{ width: '100vw' }}
            >
              {kavitaApprovals.map(
                ({
                  img,
                  description,
                  title,
                  updated_on,
                  id,
                  authorName,
                  isApproved,
                  isFeatured,
                  userId
                }) => {
                  return (
                    <Card
                      img={img}
                      content={description}
                      title={title}
                      date={updated_on}
                      url={`/approvals/kavitas/${id}`}
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
