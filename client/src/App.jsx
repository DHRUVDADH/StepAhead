import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { AuthProvider } from "./ProtectedRoutes/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute.jsx";
import EnterProfileInformation from "./pages/EnterProfileInformation.jsx";
import Profile from "./pages/Profile.jsx";
import Home2 from "./pages/Home2.jsx";
import CourseAdmin from "./pages/CourseAdmin.jsx";

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AuthProvider>
      <Router>
        <div
          className={`bg-custom-bg text-custom-text-color min-h-screen flex flex-row  overflow-x-hidden ${theme}`}
        >
          {/* <Routes>
            <Route
              path="/"
              element={<HomePage theme={theme} setTheme={setTheme} />}
            ></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes> */}
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={<HomePage theme={theme} setTheme={setTheme} />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/enterProfileInformation"
                element={<EnterProfileInformation />}
              />

              <Route path="/home" element={<Home2 />}>
                <Route path="profile" element={<Profile />} />
                <Route path="courseAdmin" element={<CourseAdmin />}></Route>
                {/* Add more nested routes here */}
              </Route>
            </Route>

            {/* Catch all */}
            <Route path="/error" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
