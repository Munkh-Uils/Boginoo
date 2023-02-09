import styles from "./styles/Header.module.css";
import { signOut } from "@firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "./config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/Auth.Provider";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

export const Header = () => {
  const { user, logout, useruud } = useContext(AuthContext);
  const [verifyToken, setVerifyToken] = useState(null);
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const Login = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
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
  }, []);

  console.log(verifyToken);

  return (
    <div className={styles.container}>
      <div className={styles.how}>ХЭРХЭН АЖИЛЛАДАГ ВЭ?</div>
      {!user && (
        <button className={styles.login} onClick={Login}>
          НЭВТРЭХ
        </button>
      )}
      {user && (
        <div className={styles.dropdown}>
          <div className={styles.useremail}>
            <p>{verifyToken && verifyToken.username}</p>
            <IoIosArrowDown className={styles.arrow} />
          </div>
          <div className={styles.dropdowncontent}>
            <NavLink to="/">
              <div>Гэр</div>
            </NavLink>
            <NavLink to="/history">
              <div>Түүх</div>
            </NavLink>
            <NavLink to="/users">
              <div className={!admin ? styles.admin : `${styles.notadmin} `}>
                Хэрэглэгчид
              </div>
            </NavLink>
            <a className={styles.log} onClick={() => logout()}>
              Гарах
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
