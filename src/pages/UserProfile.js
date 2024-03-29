/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { useHistory } from 'react-router';
import Card from '../components/Blogs/Card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './UserProfile.css';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-bootstrap-icons';
import Footer from '../components/Footer';
import { Line } from 'rc-progress';
import ResearchPaperCard from '../components/Blogs/ResearchPaperCard';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [showcollabForm, setShowcollabForm] = useState(false);
  const [showPaperForm, setShowPaperForm] = useState(false);
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [usercollabs, setUsercollabs] = useState([]);
  const [userPapers, setUserPapers] = useState([]);
  const [Mentor, setMentor] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [done, setDone] = useState(0);
  const history = useHistory();

  const [collabContent, setcollabContent] = useState('');
  const [collabHelpContent, setcollabHelpContent] = useState('');
  const [quoteContent, setQuoteContent] = useState('');
  const collabTitle = useRef();
  const collabCategories = useRef();
  const collabSocialLink = useRef();
  const status = useRef();
  const blogSocialLink = useRef();
  const [proof, setProof] = useState();
  const MQualification = useRef();
  const MExpertise = useRef();

  const PaperTitle = useRef();
  const [paperAbstract, setPaperAbstract] = useState('');
  const [paperImg, setPaperImg] = useState();


  useEffect(() => {
    if (currentUser && currentUser.userId) {
      db.collection('Collabs')
        .get()
        .then((snapshot) => {
          const logs = [];
          snapshot.forEach((doc) => {
            if (doc.data().userId === currentUser.userId) {
              const data = {
                id: doc.id,
                ...doc.data(),
              };
              logs.push(data);
            }
          });
          setUsercollabs(logs);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.userId) {
      db.collection('Research Papers')
        .get()
        .then((snapshot) => {
          const logs = [];
          snapshot.forEach((doc) => {
            if (doc.data().userId === currentUser.userId) {
              const data = {
                id: doc.id,
                ...doc.data(),
              };
              logs.push(data);
            }
          });
          setUserPapers(logs);
        });
    }
  }, [currentUser]);

  const addResearchPaper = async (e) => {

    e.preventDefault();
    setShowProgress(true);
    setDone(55);
    try {
      const firebaseData = {
        title: PaperTitle.current.value,
        authorName: currentUser.username,
        isFeatured: false,
        isApproved: false,
        abstract: paperAbstract,
        addedOn: new Date().toString(),
        userId: currentUser.userId,
      };

      const data = new FormData();
      data.append('file', paperImg);
      data.append('upload_preset', 'research_paper');
      data.append('cloud_name', 'cloudyyyy');
      await fetch(
        'https://api.cloudinary.com/v1_1/cloudyyyy/image/upload',
        {
          method: 'post',
          body: data,
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          var doc = db.collection('Research Papers').doc();
          await db.collection('Research Papers').doc(doc.id).set({
            ...firebaseData,
            paperId: doc.id,
            fileURL: data.url
          });
        });

      setDone(100);
      setUserPapers([firebaseData, ...userPapers]);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setShowProgress(false);
        setDone(0);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const addcollab = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    setDone(55);
    try {
      const data = {
        authorName: currentUser.username,
        isFeatured: false,
        isApproved: false,
        title: collabTitle.current.value,
        description: collabContent,
        help: collabHelpContent,
        categories: collabCategories.current.value.split(','),
        social_link: collabSocialLink.current.value,
        updated_on: new Date().toString(),
        userId: currentUser.userId,
        status: status.current.value,
      };
      await db.collection('Collabs').add(data);
      setDone(100);
      setUsercollabs([data, ...usercollabs]);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setShowProgress(false);
        setDone(0);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };


  const addMentor = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    setDone(55);
    try {
      const data = new FormData();
      data.append('file', proof);
      data.append('upload_preset', 'collab_req');
      data.append('cloud_name', 'cloudyyyy');
      await fetch(
        'https://api.cloudinary.com/v1_1/cloudyyyy/image/upload',
        {
          method: 'post',
          body: data,
        }
      )
        .then((res) => res.json())
        .then(async (data) => {
          const firebaseData = {
            mentorName: currentUser.username,
            isApproved: false,
            qualification: MQualification.current.value,
            expertise: MExpertise.current.value,
            socialLinks: blogSocialLink.current.value,
            requstedAt: new Date().toString(),
            userId: currentUser.userId,
            image: data.url,
          };
          await db.collection('Mentors').doc(currentUser.userId).set(firebaseData);
          await db.collection('users').doc(currentUser.userId).update({
            mentorStatus: "Under Approval",
          });
        });

      setShowMentorForm(false);
      setDone(100);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setShowProgress(false);
        setDone(0);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };


  const removecollab = (id) => {
    setUsercollabs(usercollabs.filter((collab) => collab.id !== id));
  };

  const removePaper = (id) => {
    setUsercollabs(userPapers.filter((paper) => paper.id !== id));
  };



  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar />
      <div className="container">
        <div>
          {currentUser && currentUser.username && currentUser.email && (
            <div className="ms-3">
              <div className="container d-flex justify-content-center align-items-center">
                <div className="card mt-5" style={{ width: '800px' }}>
                  <div className="user text-center text-dark">
                    <div>
                      {' '}
                      <Avatar name={currentUser.username} round="50px" />
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <h4
                      className="mb-0 text-dark"
                      style={{ fontSize: '32px', fontFamily: 'Dancing Script' }}
                    >
                      {currentUser.username}
                    </h4>{' '}
                    <span
                      className="text-muted d-block mb-2"
                      style={{ fontSize: '22px' }}
                    >
                      {currentUser.email}
                    </span>{' '}
                    <br />
                    <button
                      className="btn btn-info"
                    ><Link to={`/edituser/${currentUser.userId}`} className='text-decoration-none'> <b>Edit Profile</b> </Link></button>
                    <br /><br />
                    <button
                      className="btn btn-warning"
                    >
                      <Link to={`/user/${currentUser.userId}`} className='text-decoration-none'><b> View Profile</b> </Link></button>
                    <div className="container d-flex  justify-content-center mt-4 px-4">
                      <div className="stats">
                        <h6
                          class="mb-0 text-dark"
                          style={{
                            fontSize: '28px',
                            fontFamily: 'Dancing Script',
                          }}
                        >
                          Create Collab Request
                          <div>
                            <PlusCircle
                              fontSize={20}
                              color="green"
                              onClick={() => {
                                if (showcollabForm) {
                                  setShowcollabForm(false);
                                } else {
                                  setShowcollabForm(true);
                                }
                              }}
                            />
                          </div>
                        </h6>{' '}
                        <span className="fs-5">{usercollabs.length}</span>
                      </div>


                      <div className="stats">
                        <h6
                          class="mb-0 text-dark"
                          style={{
                            fontSize: '28px',
                            fontFamily: 'Dancing Script',
                            marginLeft: '22px',
                          }}
                        >
                          Mentor Status <br />
                          {currentUser.mentorStatus === "Not Applied" ?
                            <>
                              Apply as Mentor
                              <div>
                                <PlusCircle
                                  fontSize={20}
                                  color="green"
                                  onClick={() => {
                                    if (showMentorForm) {
                                      setShowMentorForm(false);
                                    } else {
                                      setShowMentorForm(true);
                                    }
                                  }}
                                />
                              </div>
                            </>
                            : currentUser.mentorStatus
                          }
                        </h6>{' '}

                      </div>



                      <div
                        class="stats text-dark"
                        style={{ marginLeft: '22px' }}
                      >
                        <h6
                          class="mb-0"
                          style={{
                            fontSize: '28px',
                            fontFamily: 'Dancing Script',
                          }}
                        >
                          My Research Papers
                          <div>
                            <PlusCircle
                              fontSize={20}
                              color="green"
                              onClick={() => {
                                if (showPaperForm) {
                                  setShowPaperForm(false);
                                } else {
                                  setShowPaperForm(true);
                                }
                              }}
                            />
                          </div>
                        </h6>{' '}
                        <span className="fs-5">{userPapers.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <div className="container d-flex flex-row justify-content-center">
                {currentUser.isAdmin && (
                  <>
                    <button
                      className="btn btn-primary ms-3 mt-2"
                      onClick={() => {
                        history.push('/approvals');
                      }}
                    >
                      Approved / Featured
                    </button>
                    <br />
                    <button
                      className="btn btn-primary ms-3 mt-2"
                      onClick={() => {
                        history.push('/reports');
                      }}
                    >
                      Reported Content
                    </button>
                  </>

                )}

              </div>
              <div>
                {showcollabForm && (
                  <form onSubmit={addcollab}>
                    <h3 className="mt-5">Make a Collaboration Request</h3>
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Success! , your collab request will be posted once the admin
                        approves it
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
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Title"
                        ref={collabTitle}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Categories"
                        ref={collabCategories}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Social media links"
                        ref={collabSocialLink}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>

                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter the status"
                        ref={status}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Please provide the few portion of your research paper"
                        style={{ height: '207px' }}
                        value={collabContent}
                        onChange={(value) => setcollabContent(value)}
                      />
                    </div>
                    <br />
                    <div class="form-group">
                      <br />
                      <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Mention the help you need / guidance you need"
                        style={{ height: '207px' }}
                        value={collabHelpContent}
                        onChange={(value) => setcollabHelpContent(value)}
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
                )}

                {showMentorForm && (
                  <form onSubmit={addMentor}>
                    <h3 className="mt-5">Apply for being a Mentor</h3>
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Success! , your will be listed as mentor once the admin
                        approves.
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

                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Area Of Expertise"
                        ref={MExpertise}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div>
                      <label for="exampleInputEmail1"></label>
                      <input
                        className="p-3"
                        type="file"
                        onChange={(e) => setProof(e.target.files[0])}
                      />{' '}
                      {proof && (
                        <img
                          style={{ height: '120px' }}
                          src={URL.createObjectURL(proof)}
                          alt="error"
                        />
                      )}
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Your Qualification"
                        ref={MQualification}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="social media links"
                        ref={blogSocialLink}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      {/* <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="blog"
                        style={{ height: '207px' }}
                        value={blogContent}
                        onChange={(value) => setBlogContent(value)}
                      /> */}
                    </div>

                    <button
                      type="submit"
                      class="btn btn-secondary mt-5"
                      style={{ fontFamily: 'Dancing Script' }}
                    >
                      Submit
                    </button>
                  </form>
                )}


                {showPaperForm && (

                  <form onSubmit={addResearchPaper}>
                    <h3 className="mt-5">Research Paper Upload</h3>
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Success! , your will be listed as mentor once the admin
                        approves.
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

                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Research Paper Title"
                        ref={PaperTitle}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div>
                      <label for="exampleInputEmail1"></label>
                      <p>Upload your Research Paper</p>
                      <input
                        className="p-3"
                        type="file"
                        onChange={(e) => setPaperImg(e.target.files[0])}
                      />{' '}
                      {proof && (
                        <img
                          style={{ height: '120px' }}
                          src={URL.createObjectURL(proof)}
                          alt="error"
                        />
                      )}
                    </div>
                    <div class="form-group">
                      <br />
                      <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Abstract of your Research Paper"
                        style={{ height: '207px' }}
                        value={paperAbstract}
                        onChange={(value) => setPaperAbstract(value)}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      {/* <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="blog"
                        style={{ height: '207px' }}
                        value={blogContent}
                        onChange={(value) => setBlogContent(value)}
                      /> */}
                    </div>

                    <button
                      type="submit"
                      class="btn btn-secondary mt-5"
                      style={{ fontFamily: 'Dancing Script' }}
                    >
                      Submit
                    </button>
                  </form>
                )}


              </div>
            </div>
          )}
        </div>
        <div className="pt-5">
          <div className="container d-flex justify-content-center p-4">
            <h2 style={{ fontFamily: 'Dancing Script' }}>My Collab Requests</h2>
          </div>
          <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
            {usercollabs.length > 0 ? (
              usercollabs.map(
                ({ id, description, img, title, authorName, isApproved, isFeatured, updated_on, userId }) => {
                  return (
                    <Card
                      content={description}
                      title={title}
                      img={img}
                      author={authorName}
                      date={updated_on}
                      isApproved={isApproved}
                      isFeatured={isFeatured}
                      url={`/collabsuser/${id}`}
                      deleteOption={true}
                      userId={userId}
                      collection={'collabs'}
                      id={id}
                      removeData={(id) => removecollab(id)}
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
            <h2 style={{ fontFamily: 'Dancing Script' }}>My Research Papers</h2>
          </div>
          <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
            {userPapers.length > 0 ? (
              userPapers.map(
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
                      deleteOption={true}
                      userId={userId}
                      id={userId}
                      removeData={(id) => removePaper(id)}
                    />
                  );
                }
              )
            ) : (
              <div className="d-flex justify-content-center">No posts yet</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
