import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Auth from "./pages/Auth";
import ExplorePage from "./pages/ExploreCard";
import FeedPage from "./pages/FeedPage";

import AuthRedirect from "./components/AuthRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/profile";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />

      <Routes>
        {/* Public Auth Route */}
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Auth />
            </AuthRedirect>
          }
        />

        {/* Protected Routes Group */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/home" element={<FeedPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
