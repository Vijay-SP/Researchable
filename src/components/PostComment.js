import React from 'react';

const PostComment = () => {
  return (
    <div>
      <div className='d-flex flex-column border py-3 my-3'>
        <p
          className='author ps-3 ms-3'
          style={{
            position: 'relative',
            fontWeight: 'bold',
            fontSize: '18px',
            fontFamily: 'sans-serif',
            color: '#222',
          }}
        >
          LEAVE A COMMENT
        </p>
        <form
          action='POST'
          className='p-3'
          style={{
            color: '#222',
            fontFamily: 'sans-serif',
            fontWeight: '600',
          }}
        >
          <div class='form-group py-3'>
            <label className='pb-1' for='email'>
              Email
            </label>
            <input
              type='email'
              class='form-control'
              id='email'
              aria-describedby='emailHelp'
              placeholder='Enter email'
            />
          </div>
          <div class='form-group py-3'>
            <label className='pb-1' for='name'>
              Your Name
            </label>
            <input
              type='password'
              class='form-control'
              id='name'
              placeholder='Name'
            />
          </div>
          <div class='form-group py-3'>
            <label className='pb-1' for='exampleFormControlTextarea1'>
              Comment
            </label>
            <textarea
              class='form-control'
              id='exampleFormControlTextarea1'
              rows='3'
            ></textarea>
          </div>

          <p
            className='button-author py-1'
            style={{
              width: '50%',
            }}
          >
            <button
              type='submit'
              className='btn'
              style={{ fontWeight: 'bold' }}
            >
              Post Comment
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PostComment;
