import { Routes, Route, Link, Outlet } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";

function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <Routes>
        <Route path="/ProfileDetails" element={<ProfileDetails />} />
        <Route path="/ProfilSettings" element={<ProfileSettings />} />
      </Routes>
      <nav>
        <Link to="details">Details</Link> | <Link to="settings">Settings</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default Profile;
