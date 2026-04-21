import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import Logo from "../../assets/logo.jsx";
import  "./Login.css";
import Button from "../../components/buttons/Button.jsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { login, checkAuthStatus } = useAuth();

  const from = location.state?.from?.pathname || "/user/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      await checkAuthStatus();
      navigate(from, { replace: true });
    } catch (err) {
      console.log("error: " + err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
          <Logo />
          <div className="logo-subtext">Welcome back to</div>
          <div className="login-text">FlowSync</div>
          </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <input
              type="text"
              id="username"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <input
              className="login-input"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button">
            <Button type="submit">Login</Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;