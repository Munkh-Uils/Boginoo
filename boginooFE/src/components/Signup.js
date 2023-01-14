import styles from "./styles/Login.module.css";
import logo from "./assets/logo-default.png"
import {NavLink, useNavigate, Link} from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import {useContext, useState} from "react";
import { AuthContext } from "./context/Auth.Provider";
import {auth} from "./config";

export const Signup = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.big}>
                <div className={styles.logodiv}>
                    <img className={styles.logo} src={logo}></img>
                </div>
                <div className={styles.logindiv}>
                    <div className={styles.login}>Бүртгүүлэх</div>
                </div>
                <div className={styles.email}>
                    <label className={styles.emtext} htmlFor="email-address">
                        Цахим хаяг
                    </label>
                    <input
                        className={styles.eminput}
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email address"
                    />
                </div>
                <div className={styles.pass}>
                    <label className={styles.patext} htmlFor="password">
                        Нууц үг
                    </label>
                    <input
                        className={styles.painput}
                        type="password"
                        label="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />                   
                </div>
                <button className={styles.switch} type="submit" onClick={signup}>БҮРТГҮҮЛЭХ</button>
                <NavLink to="/login">
                    <div className={styles.signup}>Бүртгэлтэй бол энд дарна уу!</div>
                </NavLink>
            </div>
        </div>
    )
}