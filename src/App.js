/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import { Route, Switch } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import QuotePage from './pages/QuotePage';
import { AnimatePresence } from 'framer-motion';
import Quotes from './pages/Quotes';
import Blog from './pages/Blog';
import SignUp from './components/forms/SignUp';
import LogIn from './components/forms/LogIn';
import ForgetPassword from './components/forms/ForgetPassword';
import UserProfile from './pages/UserProfile';
import Approvals from './pages/Approvals';
import QuoteApprovals from './pages/approvals/quoteApproval';
import BlogApprovals from './pages/approvals/BlogApprovals';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import Contact1 from './components/Contact/Contacts';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Reports from './pages/Reports';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <AnimatePresence>
      <Switch>
        <Route path="/blogs/:id" component={Blog} />
        <Route path="/quotes/:id" component={Quotes} />
        <Route path="/quotes" component={QuotePage} />
        <Route path="/blogs" component={BlogPage} />
        <Route path="/resetpassword" component={ForgetPassword} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/contact" component={Contact1} />
        <Route exact path="/" component={HomePage} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/approvals/blogs/:id" component={BlogApprovals} />
        <Route path="/approvals/quotes/:id" component={QuoteApprovals} />

        <ProtectedRoute
          path="/approvals"
          component={Approvals}
          auth={currentUser ? true : false}
        />
        <ProtectedRoute
          path="/reports"
          component={Reports}
          auth={currentUser ? true : false}
        />
        <ProtectedRoute
          path="/edituser/:id"
          component={EditProfile}
          auth={currentUser ? true : false}
        />
        <ProtectedRoute
          path="/users/:id"
          component={UserProfile}
          auth={currentUser ? true : false}
        />
      </Switch>
    </AnimatePresence>
  );
};

export default App;
