import React from 'react';
import './Blogs.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { Trash } from 'react-bootstrap-icons';

const MentorCard = ({
    content,
    title,
    date,
    qualification,
    isApproved,
    userId,
    isMentor,
    imgUrl
}) => {

    return (
        <div
            className="card card-single shadow mx-4 my-3 single-card blog-card p-2 flex-1"
            style={{ width: '350px' }}
        >
            {imgUrl && (
                <div
                    className="img-container d-flex"
                    style={{ maxHeight: '150px', minHeight: '150px' }}
                >
                    <img
                        src={imgUrl}
                        className="card-img-top"
                        alt="..."
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            )}
            <div className="card-body p-2">
                <p
                    className="card-title text-capitalize text-dark"
                    style={{ fontSize: '17px', fontWeight: '600' }}
                >
                    {title}
                </p>
                <div className="d-fles justify-content-between m-2">
                    <p className="small text-dark"> {date}</p>
                </div>
                <p
                    className="card-text content text-dark"
                    style={{ maxHeight: '70px', fontSize: '17px' }}
                >
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </p>
                <p
                    className="card-text content text-dark"
                    style={{ maxHeight: '70px', fontSize: '17px' }}
                >
                    <div dangerouslySetInnerHTML={{ __html: qualification }} />
                </p>
                <div className="links d-flex justify-content-between align-items-center m-0 p-1  ">
                    <Link to={`/user/${userId}`} className="py-0 text-decoration-none">
                        View Profile
                    </Link>
                </div>
                {/* <div className="d-flex justify-content-between">
          {!isApproved && <p className="text-danger"> Awaiting approval</p>}

          {!isMentor ?
            isFeatured === true ? (<p className="text-success">Featured</p>) : (<p className="text-danger"> Not Featured</p>)
            : 
            null
          }
          {deleteOption && (
            <Trash onClick={deletePost} fontSize={25} color="red" />
          )}
        </div> */}
                <div className="d-fles justify-content-between m-2">
                    <p className="small text-dark"> {date}</p>
                </div>
            </div>
        </div>
    );
};

export default MentorCard;
