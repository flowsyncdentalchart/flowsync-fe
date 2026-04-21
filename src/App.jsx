import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute>
                {/*<UserDashboard />*/}
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;