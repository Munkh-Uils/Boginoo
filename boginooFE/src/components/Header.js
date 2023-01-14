import styles from "./styles/Header.module.css";
import {signOut} from "@firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "./config";
import {useContext} from "react";
import { AuthContext } from "./context/Auth.Provider";
import { IoIosArrowDown } from "react-icons/io";

export const Header = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const Login = () => {
        signOut(auth).then(() => {
            navigate("/login");
            console.log("Signed out successfully");
        });
    };

    const logout = () => {
        signOut(auth)
            .then(() => {
                navigate("/open");
            })
            .catch((error) => {});
    }
    return (
        <div className={styles.container}>
            <div className={styles.how}>ХЭРХЭН АЖИЛЛАДАГ ВЭ?</div>
            {!user && (
                <button className={styles.login} onClick={Login}>НЭВТРЭХ</button>
            )}
            {user && (
                <div className={styles.dropdown}>
                    <div className={styles.useremail}>
                        {user && <p>{user.email}</p>}
                        <IoIosArrowDown className={styles.arrow} />
                    </div>    
                    <div className={styles.dropdowncontent}>
                        <a href="#">Түүх</a>
                        <a className={styles.log} onClick={logout}>
                        Гарах
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
};