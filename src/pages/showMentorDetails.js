/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import { db } from '../../firebase';

const MentorApproval = () => {
    const { id } = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [mentor, setMentor] = useState();
    useEffect(() => {
        const single = db.collection('Mentors').doc(id);

        single
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    let data = doc.data();
                    setMentor(data);
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error);
            });
    }, []);


    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Navbar />
            {mentor ? (
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

                            <section
                                className="mb-5 "
                                style={{ textAlign: 'justify', width: '800px' }}
                            >
                                <p className="fs-5 mb-4">
                                    <div dangerouslySetInnerHTML={{ __html: mentor.expertise }} />
                                </p>
                                <p className="fs-5 mb-4">
                                    <div dangerouslySetInnerHTML={{ __html: mentor.qualification }} />
                                </p>

                                <img
                                className="img-fluid"
                                    // style={{ height: 'w-1/2' }}
                                    src={mentor.image}
                                    alt="proof"
                                />
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

export default MentorApproval;
