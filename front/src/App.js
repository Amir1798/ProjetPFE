import "./App.css";
import Usersinistres from "./pages/UserSinistres";
import SinistreDetails from './pages/SinistreDetails';
import AdminNavbar from "./components/AdminNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/navbar";
import Join from "./pages/join";
import Forget from "./pages/Forget";
import ResetPassword from "./pages/ResetPassword";
import Loggedinnav from "./components/Loggedinnav";
import Profile from "./pages/Profile";
import EditProfile from "./pages/Editprofile";
import { useState, useEffect } from "react";
import Sub from "./pages/SubscriptionPage";
import Voit from "./pages/Voiture";
import Habit from "./pages/Habitation";
import Proj from "./pages/Projet";
import San from "./pages/sante";
import UserInsurances from "./pages/UserInsurances";
import Sini from "./pages/sinistre";
import InsuranceDetails from "./pages/InsuranceDetails";
import AdminDashboard from "./pages/Admindashboard";
import RetraiteForm from "./pages/RetirementInsurance";
import UserList from './pages/userList';
import AdminLayout from './pages/AdminLayout';
import InsuranceList from './pages/InsuranceList'
import SinistresList from "./pages/SinistresList";
import TicketsList from "./pages/TicketsList";
import AdminInsuranceDetails from "./pages/AdminInsuranceDetails"
import AdminSinistreDetails from "./pages/AdminSinistreDetails"
import AdminTicketDetails from "./pages/AdminTicketDetails"
import UploadContractForm from "./pages/UploadContractForm"
import CotisationForm from "./pages/CotisationForm";
import PaymentForm from "./pages/PaymentForm";
import RemboursementForm from "./pages/remboursementForm";
import UserDetails from "./pages/userDetails";
import About from "./pages/About";
import Statistics from "./pages/Stats";
import TicketDetails from './pages/TicketDetails';
import UserTicketDetails from "./pages/UserTicketDetails";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setrole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedRole = localStorage.getItem('userRole');

    if (token) {
      setIsAuthenticated(true);
      setrole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    console.log("Attempting to logout...");
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');

    setIsAuthenticated(false);
    setrole('')
  };
  console.log("Rendering App, isAuthenticated:", isAuthenticated, "Role:", role);


  return (
    <BrowserRouter>
      <div className="App c">

        {(isAuthenticated && role === "CLIENT") ? <Loggedinnav onLogoutClick={handleLogout} /> :
          (isAuthenticated && role === "ADMIN") ? <AdminNavbar /> :
            <Navbar />}
        <Routes>
        {isAuthenticated && role === "ADMIN" && (
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/userList" element={<UserList />} />
              <Route path="/InsuranceList" element={<InsuranceList />} />
              <Route path="/" element={<Home />} />
              <Route path="/SinistresList" element={<SinistresList />} />
              <Route path="/TicketsList" element={<TicketsList />} />
<Route path="/Remboursement/:iduser/:idsinistre" element={<RemboursementForm />} />
              <Route path="/BackOfficeInsurance/:id" element={<AdminInsuranceDetails />} />
              <Route path="/BackOfficeSinistre/:id" element={<AdminSinistreDetails />} />
              <Route path="/BackOfficeTicket/:id" element={<AdminTicketDetails />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="/userDetails/:id" element={<UserDetails />} />
              <Route path="/Statistics" element={<Statistics />} />

              <Route path="/ticket/:id" element={<TicketDetails />} />

            </Route>
          )}

          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          {!isAuthenticated && <Route path="join" element={<Join setIsAuthenticated={setIsAuthenticated} setrole={setrole} />} />}
          <Route path="forget" element={<Forget />} />
          <Route exact path="/reset-password/:token" element={<ResetPassword />} />
          {isAuthenticated && <Route path="Profile" element={<Profile />} />}
          {isAuthenticated && <Route path="EditProfile" element={<EditProfile />} />}
          <Route path="subscription" element={<Sub />} />
          <Route path="Voiture" element={<Voit />} />
          <Route path="Habitation" element={<Habit />} />
          <Route path="Projet" element={<Proj />} />
          <Route path="Sante" element={<San />} />
          {isAuthenticated && <Route path="/userInsurances" element={<UserInsurances />} />}
          <Route path="/insurance/:id" element={<InsuranceDetails />} />
          <Route path="/user-sinistres" element={<Usersinistres />} />
          <Route path="/sinistre/:id" element={<SinistreDetails />} />
          {isAuthenticated && role === 'CLIENT' && <Route path="sinistre" element={<Sini />} />}
          <Route path="/retraite" element={<RetraiteForm />} />
          {(isAuthenticated && role === 'CLIENT')? <Route path="/UploadContractForm/:id" element={<UploadContractForm  />} /> : null}

          <Route path="/cotisation/:id" element={<CotisationForm />} />
          <Route path="/paymentForm/:id/:amount" element={<PaymentForm />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/userticketdetails/:id" element={<UserTicketDetails />} />


          
        </Routes>
        {isAuthenticated && role === "ADMIN" ? null : <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
