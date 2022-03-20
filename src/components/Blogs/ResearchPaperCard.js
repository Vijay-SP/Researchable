import React from 'react';
import './Blogs.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { Trash } from 'react-bootstrap-icons';

const ResearchPaperCard = ({
  img,
  content,
  title,
  date,
  url,
  author,
  id,
  isApproved,
  deleteOption,
  collection,
  removeData,
  isFeatured,
  userId,
  isMentor,
  approvalRequest
}) => {
  const deletePost = async () => {
    try {
      await db.collection(`${collection}`).doc(id).delete();
      removeData(id);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="card card-single shadow mx-4 my-3 single-card blog-card p-2 flex-1"
      style={{ width: '350px' }}
    >
      {img && (
        <div
          className="img-container d-flex"
          style={{ maxHeight: '150px', minHeight: '150px' }}
        >
          {/* <img
            src={img}
            className="card-img-top"
            alt="..."
            style={{ objectFit: 'cover' }}
          /> */}
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
          className="card-text content py-1 mt-0 mb-4 pt-0 text-dark"
          style={{ maxHeight: '70px', minHeight: '100px', fontSize: '17px' }}
        >
          <div dangerouslySetInnerHTML={{ __html: content.substring(0, 120)}} />
        </p>
        <div className="links d-flex justify-content-between align-items-center m-0 p-1  ">
          <p className="small pb-0 pt-1 m-0" style={{ fontWeight: '700' }}>
            <Link to={`/user/${userId}`}>{author}</Link>
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer"className="py-0 text-decoration-none">
            {approvalRequest ? "Actions" : "View Paper"}
          </a>
        </div>
        <div className="d-flex justify-content-between">
          {!isApproved && <p className="text-danger"> Awaiting approval</p>}

          {!isMentor ?
            isFeatured === true ? (<p className="text-success">Featured</p>) : (<p className="text-danger"> Not Featured</p>)
            : 
            null
          }
          {deleteOption && (
            <Trash onClick={deletePost} fontSize={25} color="red" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchPaperCard;
