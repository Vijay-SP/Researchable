import React, { useContext } from 'react';
import { db } from '../firebase';

const LikeContext = React.createContext();

export const useLike = () => {
  return useContext(LikeContext);
};

export const LikeProvider = ({ children }) => {
  const LikeKavita = (postId, userId) => {
    db.collection('Poems').doc(`/${postId}/like/${userId}`).set({
      like: 1,
    });
  };
  const value = {
    LikeKavita,
  };
  return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
};
