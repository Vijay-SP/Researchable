/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Reports = () => {
    const [reportData, setReportData] = useState([]);
    useEffect(() => {
        db.collection('Reports')
            .get()
            .then((snapshot) => {
                const reports = [];
                snapshot.forEach((doc) => {
                    const data = {
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        reason: doc.data().reason,
                        userId: doc.data().userId,
                        url: doc.data().url,
                        created_at: doc.data().created_at,
                    };
                    reports.push(data);
                }
                );
                setReportData(reports);
            });
    }, []);


    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <Navbar />
            <div>
                {reportData.length > 0 && (
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
                            Reported Content
                        </h2>

                        <div
                            className="container d-flex flex-direction-row flex-wrap justify-content-center my-5"
                            style={{ width: '100vw' }}
                        >
                            {reportData.map(
                                ({ id, name, email, url, reason, created_at, userId }) => {
                                    return (
                                        <>

                                            <div
                                                className="card card-single shadow mx-4 my-3 single-card blog-card p-2 flex-1"
                                                style={{ width: '350px' }}
                                            >

                                                <div className="card-body p-2">
                                                    <p
                                                        className="card-title text-dark"
                                                        style={{ fontSize: '17px', fontWeight: '600' }}
                                                    >
                                                        {email}
                                                    </p>
                                                    <div className="d-fles justify-content-between m-2">
                                                        <p className="small text-dark"> {created_at}</p>
                                                    </div>
                                                    <p
                                                        className="card-text content py-1 mt-0 mb-4 pt-0 text-dark"
                                                        style={{ maxHeight: '70px', minHeight: '70px', fontSize: '17px' }}
                                                    >
                                                        <div dangerouslySetInnerHTML={{ __html: reason }} />
                                                    </p>
                                                    <div className="links d-flex justify-content-between align-items-center m-0 p-1  ">
                                                        <p className="small pb-0 pt-1 m-0" style={{ fontWeight: '700' }}>
                                                            <Link to={`/user/${userId}`}>{name}</Link>
                                                        </p>
                                                        <Link to={url} className="py-0 text-decoration-none">
                                                            View Content
                                                        </Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
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

export default Reports;
