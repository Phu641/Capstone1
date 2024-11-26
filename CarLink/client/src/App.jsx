import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
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
import VehicleDetailsPage from "../pages/VehicleDetailsPage";
import VehicleApprovalPage from "../pages/VehicleApprovalPage";
import UserList from "../pages/UserList";
import BookingForm from "./components/UI/BookingForm.jsx";
import Payment from "./components/UI/PaymentMethod.jsx";
import Favorites from "./components/Favorite/Favorite.jsx";

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Cars" element={<Carlistting />} />
        <Route path="/cars/:carID" element={<CarDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
        <Route path="/vehicle-approval" element={<VehicleApprovalPage />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/booking-form" element={<BookingForm />} />  
        <Route path="/payment" element={<Payment />} />
        <Route path="/favorites" element={<Favorites />} /> 
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
