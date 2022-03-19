/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const SignUp = (username, email, password) => {
    return auth.createUserWithEmailAndPassword(email, password).then((data) => {
      db.collection('users').add({
        id: data.user.uid,
        username,
        email,
        password,
      });
    });
  };

  const LogIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const SignOut = () => {
    auth.signOut().then(setCurrentUser(null));
  };

  const ResetPassword = async (email) => {
    await auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .get()
          .then((snapshot) => {
            const cuser = [];
            snapshot.forEach((doc) => {
              const data = {
                userId: doc.id,
                id: doc.data().id,
                username: doc.data().username,
                email: doc.data().email,
                isAdmin: doc.data().isAdmin,
              };
              if (data.id === String(user.uid)) {
                cuser.push(data);
              } else {
              }
              setCurrentUser(cuser[0]);
            });
          });
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    SignUp,
    SignOut,
    LogIn,
    ResetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
