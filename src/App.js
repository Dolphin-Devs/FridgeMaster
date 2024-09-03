import './App.css';
import { BrowserRouter, Routes,Router,Route } from 'react-router-dom';
import Login from './pages/Login'; // 확장자 추가
import SignUp from './pages/SignUp';
import SignUpQustions from './pages/SignUpQustions';
import Test from './pages/test';
import TermsConditions from './pages/termsConditions';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
