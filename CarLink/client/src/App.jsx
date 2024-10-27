import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Carlistting from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import ForgotPasswordForm from "./components/ForgotPassword/ForgotPasswordForm";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AddCar from "../pages/AddCar";
import DashboardAdmin from "../pages/DashboardAdmin";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Cars" element={<Carlistting />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
