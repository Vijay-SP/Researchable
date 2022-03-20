import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import "./quotepage.css"
import MentorCard from '../components/Blogs/mentorCard';

const MentorPage = () => {
  const [mentorApprovals, setMentorApprovals] = useState([]);

  useEffect(() => {
    db.collection('Mentors')
      .get()
      .then((snapshot) => {
        const quotes = [];
        snapshot.forEach((doc) => {
          if (doc.data().isApproved === true) {
            const data = {
              id: doc.id,
              ...doc.data(),
            };
            quotes.push(data);
          }
        });
        setMentorApprovals(quotes);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ width: '100vw', backgroundColor: '#efefef' }}>
        <Navbar backButton={true} />
        <div className='container d-flex justify-content-center p-4'>
          <h2 style={{ fontFamily: 'Dancing Script' }}>Mentors</h2>
        </div>
        <section id="quote" class="d-flex align-items-center">
          <div
            className='container d-flex flex-direction-row flex-wrap justify-content-center my-3'
            style={{ width: '100vw' }}
          >
            {mentorApprovals.map(
              ({
                expertise,
                mentorName,
                qualification,
                requstedAt,
                socialLinks,
                isApproved,
                userId,
                image
              }) => {
                return (
                  <MentorCard
                    content={expertise}
                    title={mentorName}
                    date={requstedAt}
                    url={`/mentorProfile/${userId}`}
                    qualification={qualification}
                    isApproved={isApproved}
                    userId={userId}
                    isMentor={true}
                    imgUrl={image}
                  />
                );
              }
            )}
          </div>
        </section>
        <Footer />
      </div>
    </motion.div>
  );
};

export default MentorPage;
