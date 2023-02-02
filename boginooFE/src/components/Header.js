import styles from "./styles/Header.module.css";
import { signOut } from "@firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "./config";
import { useContext } from "react";
import { AuthContext } from "./context/Auth.Provider";
import { IoIosArrowDown } from "react-icons/io";

export const Header = () => {
  const { verifyToken, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const Login = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

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
            {verifyToken && <p>{verifyToken && verifyToken.username}</p>}
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
              <div>Хэрэглэгч</div>
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
