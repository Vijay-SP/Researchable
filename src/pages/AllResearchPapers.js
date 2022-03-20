/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Blogs/Card';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import './collabpage.css';

import { db } from '../firebase';
import ResearchPaperCard from '../components/Blogs/ResearchPaperCard';

const AllResearchPapers = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        db.collection('Research Papers')
            .get()
            .then((snapshot) => {
                const logs = [];
                snapshot.forEach((doc) => {
                    if (doc.data().isApproved === true) {
                        const data = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        logs.push(data);
                    }
                });
                setPapers(logs);
                console.log(papers);
            });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div
                style={{
                    minHight: '100vh',
                    width: '100vw',
                    backgroundColor: '#EFefef',
                }}
            >
                <Navbar backButton={true} />
                <div className="container d-flex justify-content-center p-4">
                    <h1 style={{ fontFamily: 'Dancing Script' }}>Research Papers Conference</h1>
                </div>
                <section id="zero" class="d-flex align-items-center">
                    <div
                        className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
                        style={{ width: '100vw' }}
                    >
                        {papers.length > 0 ? (
                            papers.map(
                                ({ abstract, title, authorName, isApproved, isFeatured, addedOn, userId, paperId, fileURL }) => {
                                    return (
                                        <ResearchPaperCard
                                            content={abstract}
                                            title={title}
                                            author={authorName}
                                            date={addedOn}
                                            isApproved={isApproved}
                                            isFeatured={isFeatured}
                                            url={fileURL}
                                            userId={userId}
                                            id={userId}
                                        />
                                    );
                                }
                            )
                        ) : (
                            <div className="d-flex justify-content-center">No posts yet</div>
                        )}
                    </div>
                </section>
                <Footer />
            </div>
        </motion.div>
    );
};

export default AllResearchPapers;
