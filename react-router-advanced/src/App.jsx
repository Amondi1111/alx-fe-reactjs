import { Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Profile from "./components/Profile.jsx";
import ProfileDetails from "./pages/ProfileDetails.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import User from "./pages/User.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BlogPost from "./pages/BlogPost.jsx";

function App() {
  const isAuthenticated = true;

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/user/123">User 123</Link> |{" "}
        <Link to="/blog/1">Blog Post 1</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

      
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuth={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

      
        <Route path="/user/:id" element={<User />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
