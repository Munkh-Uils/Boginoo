import styles from "./styles/Home.module.css";
import logo from "./assets/logo-default.png";
import {useState, useContext, useEffect} from "react";
import axios from "axios";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { AuthContext } from "./context/Auth.Provider";

export const Home = () => {
    const {user, setInputValue, inputValue, url} = useContext(AuthContext);
    const [copied, setCopied] = useState(false);
    const [shortenLink, setShortenLink] = useState("");
    const [value, setValue] = useState("");
    const [copyValue, setCopyValue] = useState("");

    const boginoo = () => {
        setInputValue(value);
        setValue("");
        setCopyValue(value)
    }

    const getData = () => {
        axios.get(`https://api.shrtco.de/v2/shorten?url=${inputValue}`).then((res) => {
            setShortenLink(res.data.result.full_short_link)
            console.log(res.data.result.full_short_link)
        });
    }
    
    console.log(shortenLink);

    useEffect (() => {
        if(inputValue.length) {
            getData();
        }
    }, [inputValue]);   

    useEffect (() => {
        const timer = setTimeout (() => {
            setCopied(false);
        }, 2000);
        return () => clearTimeout(timer);  
    }, [copied])
    console.log(url);

    return (
        <div className={styles.container}>
            <div className={styles.big}>
                <div className={styles.logodiv}>
                    <img className={styles.logo} src={logo}></img>
                </div>
                <div className={styles.indiv}>
                    <input 
                        className={styles.input} 
                        type="text"
                        placeholder="https://www.web-huudas.mn"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button className={styles.bogi} onClick={boginoo}>БОГИНОСГОХ</button>
                </div>
                <div className={styles.gib}>
                    <div className={styles.olddiv}>
                        <div className={styles.oldtext}>Өгөгдсөн холбоос:</div>
                        <div className={styles.oldlink}>{copyValue}</div>
                    </div>
                    <div className={styles.newdiv}>
                        <div className={styles.newtext}>Богино холбоос:</div>
                        <div className={styles.new}>
                            <div className={styles.newlink}>{shortenLink}</div>
                            <CopyToClipboard 
                                text={shortenLink}
                                onCopy={() => setCopied(true)}
                            >
                                <div className={styles.copy}>Хуулж авах</div>
                            </CopyToClipboard>
                            {copied && (
                                <div className={styles.copied}>Copied</div>
                            )}
                        </div>
                    </div>
                    <div>{url}</div>
                </div>
            </div>
        </div>
    )
}