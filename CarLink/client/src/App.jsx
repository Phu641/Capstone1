import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "../pages/HomePage";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Carlistting from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import ForgotPasswordForm from "./components/ForgotPassword/ForgotPasswordForm";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import AddCar from "../pages/AddCar";
import DashboardAdmin from "../pages/DashboardAdmin";
import DashboardOwner from "../pages/DashboardOwner";
import VehicleDetailsPage from "../pages/VehicleDetailsPage";
import VehicleApprovalPage from "../pages/VehicleApprovalPage";
import UserList from "../pages/UserList";
import BookingForm from "./components/UI/BookingForm.jsx";
import Payment from "./components/UI/PaymentMethod.jsx";
import Favorites from "./components/Favorite/Favorite.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";
import EditProfile from "./components/UserProfile/EditProfile.jsx";
import OwnerReportsPage from "../pages/OwnerReportsPage";
import ReportHistoryPage from "../pages/ReportHistoryPage";
//owner
import ManageVehiclesPage from "../pages/ManageVehiclesPage";
import UpdateVehiclePage from "../pages/UpdateVehiclePage";
import Report from "../pages/Report";
import WithdrawApprovalPage from "../pages/WithdrawApprovalPage";
import { ToastContainer } from "react-toastify";
import Chatbot from "./components/Chatbot/chatbot.jsx";
//import Chatbot from "./components/Chatbot/chatbot.jsx";

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/Cars" element={<Carlistting />} />
        <Route path="/cars/:carID" element={<CarDetails />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/DashboardOwner" element={<DashboardOwner />} />
        <Route path="/manage-vehicles" element={<ManageVehiclesPage />} />
        <Route path="/update-vehicle/:carID" element={<UpdateVehiclePage />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/vehicle/:id" element={<VehicleDetailsPage />} />
        <Route path="/vehicle-approval" element={<VehicleApprovalPage />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/report/:bookingID" element={<Report />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/owner-reports" element={<OwnerReportsPage />} />
        <Route path="/report-history" element={<ReportHistoryPage />} />
        <Route path="/withdraw-approval" element={<WithdrawApprovalPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
      <Chatbot/>
    </Router>
  );
}

export default App;
