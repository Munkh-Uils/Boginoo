import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const full = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = window.localStorage.getItem("credentials");
    if (credentials) {
      setUser(JSON.parse(credentials));
    } else {
      navigate("/open");
    }
  }, []);

  const login = (username, password) => {
    axios
      .post("http://localhost:4000/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        window.localStorage.setItem("credentials", JSON.stringify(res.data));
        console.log(res.data);
        setUser(res.data);
        navigate("/");
      });
  };

  const signup = (username, password) => {
    axios
      .post("http://localhost:4000/signup", {
        username: username,
        password: password,
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        navigate("/login");
      });
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("credentials");
    navigate("/open");
  };

  return (
    <AuthContext.Provider value={{ user, full, login, signup, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
