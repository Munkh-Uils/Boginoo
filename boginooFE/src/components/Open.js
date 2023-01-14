import styles from "./styles/Open.module.css";
import logo from "./assets/logo-default.png";
import {useState} from "react";

export const Open = () => {
    const [pleaseLogin, setPleaseLogin] = useState("");
    const boginoo = () => {
        setPleaseLogin("Та заавал нэвтэрч орно уу!")
    }
    return (
        <div className={styles.container}>
            <div className={styles.big}>
                <div className={styles.logodiv}>
                    <img className={styles.logo} src={logo}></img>
                </div>
                <div className={styles.indiv}>
                    <input className={styles.input} placeholder="https://www.web-huudas.mn"/>
                    <button className={styles.bogi} onClick={boginoo}>БОГИНОСГОХ</button>
                </div>
                <div className={styles.please}>{pleaseLogin}</div>
            </div>
        </div>
    )
}