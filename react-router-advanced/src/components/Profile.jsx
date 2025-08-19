import { Routes, Route, Link, Outlet } from "react-router-dom";
import ProfileDetails from "../pages/ProfileDetails.jsx";
import ProfileSettings from "../pages/ProfileSettings.jsx";

export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <Link to="details">Details</Link> | <Link to="settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>

      
    </div>
  );
}
