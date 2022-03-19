/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Carausal from '../components/Carausal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import Card from '../components/Blogs/Card';

import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';

const HomePage = () => {
  const [featBlogs, setFeatBlogs] = useState([]);
  const [featuredQuotes, setFeaturedQuotes] = useState([]);

  const { currentUser } = useAuth();

  const history = useHistory();

  useEffect(() => {
    db.collection('Blogs')
      .get()
      .then((snapshot) => {
        const blogs = [];
        snapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            image: doc.data().images[0],
            categories: doc.data().categories,
            description: doc.data().description,
            authorName: doc.data().authorName,
            isFeatured: doc.data().isFeatured,
            updated_on: doc.data().updated_on,
            isApproved: doc.data().isApproved,
            userId: doc.data().userId,
          };
          if (data.isFeatured) {
            blogs.push(data);
          }
        });
        setFeatBlogs(blogs);
      });
  }, []);


  useEffect(() => {
    db.collection('Quotes')
      .get()
      .then((snapshot) => {
        const feat_quotes = [];
        snapshot.forEach((doc) => {
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
          if (data.isFeatured) {
            feat_quotes.push(data);
          }
        });
        setFeaturedQuotes(feat_quotes);
      });
  }, []);

  // if (!currentUser) {
  //   history.push('/login');
  // }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div style={{ zIndex: '1' }}>
          <Navbar backButton={false} />
        </div>
        <Carausal />
        <div style={{ zIndex: '2' }}>
          <div
            className="d-flex flex-column align-items-center justify-content-center py-5"
            style={{ width: '100vw', backgroundColor: '#EFefef' }}
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
              Featured Research Papers
            </h2>

            <div
              className="d-flex flex-column align-items-center justify-content-center py-5"
              style={{ width: '100vw', backgroundColor: '#EFefef' }}
            >
              {featBlogs.map(
                ({
                  image,
                  description,
                  title,
                  updated_on,
                  id,
                  authorName,
                  isApproved,
                  userId
                }) => {
                  return (
                    <Card
                      img={image}
                      content={description}
                      title={title}
                      date={updated_on}
                      url={`/blogs/${id}`}
                      author={authorName}
                      isApproved={isApproved}
                      userId={userId}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        <div
          className="d-flex flex-column align-items-center justify-content-center py-5"
          style={{ width: '100vw', backgroundColor: '#EFefef' }}
        >
          {/* <h2
            className="pt-3 text-dark text-capitalize font-weight-bold fs-1 p-0 m-0 "
            style={{
              paddingLeft: '20px',
              fontFamily: 'Dancing Script',
              borderBottom: '2px solid #222',
              paddingBottom: '1px',
            }}
          >
            Featured quotes
          </h2> */}

          <div
            className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
            style={{ width: '100vw' }}
          >
            {featuredQuotes.map(
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
                    url={`/quotes/${id}`}
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
        <div>
          <Footer
            style={{
              backgroundColor: '#68527b',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
