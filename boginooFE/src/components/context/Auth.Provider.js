import { createContext, useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../config";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [shortUrl, setShortUrl] = useState();
  //   const [inputValue, setInputValue] = useState("");
  const full = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUser(user);
        const uid = user.uid;
        console.log(user);
      } else {
        setUser(null);
        navigate("/open");
        console.log("user is logged out");
      }
    });
    // axios
    //   .post("http://localhost:3002/", {
    //     url: inputValue,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     // setUrl(res.data);
    //   });
  }, []);

  return (
    <AuthContext.Provider value={{ user, full }}>
      {props.children}
    </AuthContext.Provider>
  );
};
