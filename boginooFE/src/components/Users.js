import styles from "./styles/History.module.css";
import logo from "./assets/logo-default.png";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./context/Auth.Provider";

export const Users = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      window.localStorage.setItem("credentials", JSON.stringify(res.data));
      setUsers(res.data);
      console.log(res.data);
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.big}>
        <div className={styles.logodiv}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <div className={styles.gib}>
          <div className={styles.newdiv}>
            <div className={styles.new}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
