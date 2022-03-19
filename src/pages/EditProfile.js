/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react';
import { db } from '../firebase';
import { useParams } from 'react-router';
import 'react-quill/dist/quill.snow.css';
import './UserProfile.css';
import { Line } from 'rc-progress';


const EditProfile = () => {

    const { id } = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [showProgress, setShowProgress] = useState(false);
    const [done, setDone] = useState(0);
    const [profileImg, setprofileImg] = useState();
    const userdescrip = useRef();
    const userSocialLink = useRef();


    const updateProfile = async (e) => {
        e.preventDefault();
        setShowProgress(true);
        setDone(55);
        try {
            if (!profileImg) {
                await db.collection('users').doc(id).update({
                    description: userdescrip.current.value,
                    social_link: userSocialLink.current.value,
                    updated_on: new Date().toString(),
                });
                setDone(100);
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                    setSuccess(false);
                    setShowProgress(false);
                    setDone(0);
                }, 3000);
            } else {
                const data = new FormData();
                data.append('file', profileImg);
                data.append('upload_preset', 'blog_img_store');
                data.append('cloud_name', 'writers-hub');
                await fetch(
                    'https://api.cloudinary.com/v1_1/writers-hub/image/upload',
                    {
                        method: 'post',
                        body: data,
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        db.collection('users').doc(id).update({
                            description: userdescrip.current.value,
                            social_link: userSocialLink.current.value,
                            image: data.url,
                            updated_on: new Date().toString(),
                        });
                    });
                setDone(100);
                setSuccess(true);
                setError(false);
                setTimeout(() => {
                    setSuccess(false);
                    setShowProgress(false);
                    setDone(0);
                }, 3000);
            }
        } catch (error) {
            setError(true);
            setSuccess(false);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    };


    return (
        <div>
            <form onSubmit={updateProfile}>
                {success && (
                    <div class="alert alert-success" role="alert">
                        Success! , your profile is updated
                    </div>
                )}
                {error && (
                    <div class="alert alert-error" role="alert">
                        opps something went wrong!
                    </div>
                )}
                {showProgress && (
                    <div className="d-flex">
                        <Line
                            percent={done}
                            strokeWidth="2"
                            strokeColor="green"
                        />
                        <span>{done}%</span>
                    </div>
                )}
                <div>
                    <label for="exampleInputEmail1">image:</label>
                    <input
                        className="p-3"
                        type="file"
                        onChange={(e) => setprofileImg(e.target.files[0])}
                    />{' '}
                    {profileImg && (
                        <img
                            style={{ height: '120px' }}
                            src={URL.createObjectURL(profileImg)}
                            alt="error"
                        />
                    )}
                </div>
                <div class="form-group">
                    <br />
                    <textarea
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter your description"
                        ref={userdescrip}
                        style={{
                            borderStyle: 'none',
                            borderRadius: '0px',
                            borderBottom: '1px solid grey',
                        }}
                    ></textarea>
                </div>
                <div class="form-group">
                    <br />
                    <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="social media links"
                        ref={userSocialLink}
                        style={{
                            borderStyle: 'none',
                            borderRadius: '0px',
                            borderBottom: '1px solid grey',
                        }}
                    />
                </div>


                <button
                    type="submit"
                    class="btn btn-secondary mt-5"
                    style={{ fontFamily: 'Dancing Script' }}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditProfile;