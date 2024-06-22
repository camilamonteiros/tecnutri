import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      
      const response = await AuthService.loginUser({ email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/product");
    } catch (error) {
      console.log("aqui")
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Email:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </>
  );
};
export default LoginPage;
