import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage";
import SignupForm from './components/Signup/SignupForm';
import LoginForm from './components/Login/LoginForm';
import ForgotPasswordForm from './components/ForgotPassword/ForgotPasswordForm';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
