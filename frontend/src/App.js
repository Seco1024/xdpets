import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import ResetPassword from "./pages/ResetPassword";
import PetDetails from "./pages/PetDetails";
import Match from "./pages/Match";
import SendAdoption from "./pages/SendAdoption";
import SentAdoptionInfo from "./pages/SentAdoptionInfo";
import EditSentAdoptionInfo from "./pages/EditSentAdoptionInfo";
import Admin from "./pages/Admin";
import User from "./pages/User";
import { UidProvider } from "./components/UidContext";

function App() {
  return (
    <UidProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/pets/:petId" element={<PetDetails />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/match" element={<Match />} />
          <Route path="/sendadoption" element={<SendAdoption />} />
          <Route path="/sentadoptioninfo" element={<SentAdoptionInfo />} />
          <Route
            path="/editsentadoptioninfo/:petId"
            element={<EditSentAdoptionInfo />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </UidProvider>
  );
}

export default App;
