/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import { Route, Switch } from 'react-router-dom';
import CollabPage from './pages/CollabPage';
import QuotePage from './pages/QuotePage';
import { AnimatePresence } from 'framer-motion';
import Quotes from './pages/Quotes';
import Blog from './pages/Collab';
import SignUp from './components/forms/SignUp';
import LogIn from './components/forms/LogIn';
import ForgetPassword from './components/forms/ForgetPassword';
import UserProfile from './pages/UserProfile';
import Approvals from './pages/Approvals';
import QuoteApprovals from './pages/approvals/quoteApproval';
import CollabApprovals from './pages/approvals/CollabApprovals';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import Contact1 from './components/Contact/Contacts';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Reports from './pages/Reports';
import UserCollab from './pages/UserCollab';

const App = () => {
  const { currentUser } = useAuth();

  return (
    <AnimatePresence>
      <Switch>
        <Route path="/collabs/:id" component={Blog} />
        <Route path="/collabsuser/:id" component={UserCollab} />
        <Route path="/quotes/:id" component={Quotes} />
        <Route path="/quotes" component={QuotePage} />
        <Route path="/collabs" component={CollabPage} />
        <Route path="/resetpassword" component={ForgetPassword} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/contact" component={Contact1} />
        <Route exact path="/" component={HomePage} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/approvals/collabs/:id" component={CollabApprovals} />
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
