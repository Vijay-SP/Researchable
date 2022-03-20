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

    const handleApprove = async () => {
        try {
            await db.collection('Mentors').doc(id).update({
                isApproved: true,
            });
            await db.collection('users').doc(id).update({
                mentorStatus: "Approved",
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
            await db.collection('Mentors').doc(id).delete();
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
                            <header className="mb-4">
                                <h1 className="fw-bolder mb-1">{mentor.mentorName}</h1>
                                <button className="btn btn-success" onClick={handleApprove}>
                                    Approve
                                </button>

                                <button className="btn btn-danger ms-3" onClick={handleNotApprove}>
                                    Disapprove
                                </button>
                                <div className="text-muted fst-italic mb-2">
                                    Requested approval on {mentor.requstedAt}
                                </div>
                            </header>

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
