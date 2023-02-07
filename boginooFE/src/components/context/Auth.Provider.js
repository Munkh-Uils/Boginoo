import { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [verifyToken, setVerifyToken] = useState(null);
  const [users, setUsers] = useState("");
  const full = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const credentials = window.localStorage.getItem("credentials");
    if (credentials) {
      setUser(JSON.parse(credentials));
    } else {
      navigate("/open");
    }

    verify();
  }, []);

  const signup = (username, password) => {
    axios
      .post("http://localhost:4000/signup", {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      });
  };

  const login = (username, password) => {
    axios
      .post("http://localhost:4000/login", {
        username,
        password,
      })
      .then((res) => {
        navigate("/");
        verify();
        window.localStorage.setItem("credentials", JSON.stringify(res.data));
        console.log(res.data);
        window.location.reload();
      });
  };

  const verify = () => {
    axios
      .get("http://localhost:4000/verify", {
        headers: {
          authorization:
            window.localStorage.getItem("credentials") &&
            JSON.parse(window.localStorage.getItem("credentials")),
        },
      })
      .then((res) => {
        setVerifyToken(res.data.token.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(verifyToken);

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("credentials");
    navigate("/open");
  };

  return (
    <AuthContext.Provider
      value={{ user, full, verifyToken, users, login, signup, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
