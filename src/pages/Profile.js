/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import 'react-quill/dist/quill.snow.css';
import './UserProfile.css';
import Card from '../components/Blogs/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Profile = () => {
    const { id } = useParams();
    const [userShayris, setUserShayris] = useState([]);
    const [userBlogs, setUserBlogs] = useState([]);
    const [userKavitas, setUserKavitas] = useState([]);
    const [userQuotes, setUserQuotes] = useState([]);
    const [userData, setUserdata] = useState([]);


    useEffect(() => {
        if (id) {
            db.collection('Shayris')
                .get()
                .then((snapshot) => {
                    const usershayris = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().userId === id) {
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
                            usershayris.push(data);
                        }
                    });
                    setUserShayris(usershayris);
                    console.log(usershayris);
                });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            db.collection('Blogs')
                .get()
                .then((snapshot) => {
                    const logs = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().userId === id) {
                            const data = {
                                id: doc.id,
                                title: doc.data().title,
                                image: doc.data().images[0],
                                categories: doc.data().categories,
                                description: doc.data().description,
                                authorName: doc.data().authorName,
                                isApproved: doc.data().isApproved,
                                isFeatured: doc.data().isFeatured,
                                updated_on: doc.data().updated_on,
                                userId: doc.data().userId,
                            };
                            logs.push(data);
                        }
                    });
                    setUserBlogs(logs);
                });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            db.collection('Poems')
                .get()
                .then((snapshot) => {
                    const kavitas = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().userId === id) {
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
                    setUserKavitas(kavitas);
                });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            db.collection('Quotes')
                .get()
                .then((snapshot) => {
                    const quotes = [];
                    snapshot.forEach((doc) => {
                        if (doc.data().userId === id) {
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
                    setUserQuotes(quotes);
                });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            db.collection('users')
                .get()
                .then((snapshot) => {
                    const userdata = [];
                    snapshot.forEach((doc) => {
                        if (doc.id === id) {
                            const data = {
                                description: doc.data().description,
                                image: doc.data().image,
                                email: doc.data().email,
                                username: doc.data().username,
                            };
                            userdata.push(data);
                            console.log(userdata);
                        }
                    });
                    setUserdata(userdata);
                });
        }
    }, [id]);

    return (
        <div>
            <Navbar />
            <div class="container mt-5">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-7">
                        {userData.map((user) => {
                            return (
                                <div class="card p-3 py-4">
                                    <div class="text-center"> <img src={user.image || "https://i.imgur.com/bDLhJiP.jpg"} width="100" class="rounded-circle" /> </div>
                                    <div class="text-center mt-3">
                                        <h5 class="mt-2 mb-0">{user.username}</h5>
                                        <div class="px-4 mt-1">
                                            <p class="fonts">{user.description || "No Description"}</p>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
                <div className="pt-5">
                    <div className="container d-flex justify-content-center p-4">
                        <h2 style={{ fontFamily: 'Dancing Script' }}>User's Shayris</h2>
                    </div>
                    <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
                        {userShayris.length > 0 ? (
                            userShayris.map(
                                ({ id, description, title, authorName, isApproved, isFeatured, updated_on, userId }) => {
                                    return (

                                        <Card
                                            content={description}
                                            title={title}
                                            author={authorName}
                                            date={updated_on}
                                            isApproved={isApproved}
                                            isFeatured={isFeatured}
                                            url={`/shayaris/${id}`}
                                            collection={'Shayaris'}
                                            id={id}
                                            userId={userId}
                                        />
                                    );
                                }
                            )
                        ) : (
                            <div className="d-flex justify-content-center">No posts yet</div>
                        )}
                    </div>
                </div>
                <div className="pt-5">
                    <div className="container d-flex justify-content-center p-4">

                        <h2 style={{ fontFamily: 'Dancing Script' }}>User's Blogs</h2>
                    </div>
                    <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
                        {userBlogs.length > 0 ? (
                            userBlogs.map(
                                ({ id, image, description, title, authorName, isApproved, isFeatured, updated_on, userId }) => {
                                    return (

                                        <Card
                                            img={image}
                                            content={description}
                                            title={title}
                                            author={authorName}
                                            date={updated_on}
                                            isApproved={isApproved}
                                            isFeatured={isFeatured}
                                            url={`/blogs/${id}`}
                                            collection={'Blogs'}
                                            id={id}
                                            userId={userId}
                                        />
                                    );
                                }
                            )
                        ) : (
                            <div className="d-flex justify-content-center">No posts yet</div>
                        )}
                    </div>
                </div>
                <div className="pt-5">
                    <div className="container d-flex justify-content-center p-4">
                        <h2 style={{ fontFamily: 'Dancing Script' }}>User's Kavitas</h2>
                    </div>
                    <div className=" d-flex flex-direction-row flex-wrap justify-content-center my-3">
                        {userKavitas.length > 0 ? (
                            userKavitas.map(
                                ({ img, description, title, updated_on, id, isApproved, isFeatured, authorName, userId }) => {
                                    return (
                                        <Card
                                            img={img}
                                            content={description}
                                            title={title}
                                            date={updated_on}
                                            isApproved={isApproved}
                                            isFeatured={isFeatured}
                                            url={`/kavitas/${id}`}
                                            author={authorName}
                                            collection={'Poems'}
                                            id={id}
                                            userId={userId}
                                        />
                                    );
                                }
                            )
                        ) : (
                            <div className="d-flex justify-content-center">No posts yet</div>
                        )}
                    </div>
                </div>
                <div className="pt-5">
                    <div className="container d-flex justify-content-center p-4">
                        <h2 style={{ fontFamily: 'Dancing Script' }}>User's Quotes</h2>
                    </div>
                    <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
                        {userQuotes.length > 0 ? (
                            userQuotes.map(
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
                                            id={id}
                                            content={description}
                                            title={title}
                                            date={updated_on}
                                            url={`/quotes/${id}`}
                                            author={authorName}
                                            isApproved={isApproved}
                                            isFeatured={isFeatured}
                                            collection={'Quotes'}
                                            userId={userId}
                                        />
                                    );
                                }
                            )
                        ) : (
                            <div className="d-flex justify-content-center pb-5">
                                No posts yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
