import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './pages/Login/Login'; 
import SignUp from './pages/SignUp/SignUp';
import SignUpQustions from './pages/SignUp/SignUpQustions';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ForgotPasswordQuestions from './pages/ForgotPassword/ForgotPasswordQuestions';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import Test from './pages/test';
import TermsConditions from './pages/Settings/termsConditions';

function App() {

  return (
    <div>
      <BrowserRouter> 
        <Routes>
          {/*첫 화면과 /login 추가 시 Login 화면*/}
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/termsConditions" element={<TermsConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/questions" element={<SignUpQustions/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/forgotPasswordQuestions" element={<ForgotPasswordQuestions/>} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
