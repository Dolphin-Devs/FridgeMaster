import * as React from 'react';
import '../src/assets/App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './pages/Login/Login'; 
import SignUp from './pages/SignUp/SignUp';
import SignUpQustions from './pages/SignUp/SignUpQustions';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ForgotPasswordQuestions from './pages/ForgotPassword/ForgotPasswordQuestions';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import TermsConditions from './pages/Settings/termsConditions';
import Dashboard from './pages/dashboard/Dashboard'
import TermsAndConditions from './components/TermsAndConditions'


function App() {

  return (
    <div>
      <BrowserRouter> 
        <Routes>
          {/*First page is the login page*/}
          <Route path="/" element={<Login />} />
          <Route path="/termsConditions" element={<TermsConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/questions" element={<SignUpQustions/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/forgotPasswordQuestions" element={<ForgotPasswordQuestions/>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/termsAndConditions" element={<TermsAndConditions/>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
