import styles from "./styles/Login.module.css";
import logo from "./assets/logo-default.png"
import {NavLink, useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "@firebase/auth";
import {useContext, useState} from "react";
import { AuthContext } from "./context/Auth.Provider";
import {auth} from "./config";

export const Login = () => {
    const {user} = useContext(AuthContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message
                console.log(errorCode, errorMessage);
            })
    };

    return (
        <div className={styles.container}>
            <div className={styles.big}>
                <div className={styles.logodiv}>
                    <img className={styles.logo} src={logo}></img>
                </div>
                <div className={styles.logindiv}>
                    <div className={styles.login}>Нэвтрэх</div>
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
                <div className={styles.nemelt}>
                    <div className={styles.remember}>
                        <div>
                            <input className={styles.check} type="checkbox" />
                            Намайг сана
                        </div>
                        <Link>
                            <div className={styles.forgot}>Нууц үгээ мартсан</div>
                        </Link>
                    </div>
                </div>
                <button className={styles.switch} type="submit" onClick={login}>НЭВТРЭХ</button>
                <NavLink to="/signup">
                    <div className={styles.signup}>Шинэ хэрэглэгч бол энд дарна уу!</div>
                </NavLink>
            </div>
        </div>
    )
}