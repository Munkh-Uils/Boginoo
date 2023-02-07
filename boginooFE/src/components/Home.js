import styles from "./styles/Home.module.css";
import logo from "./assets/logo-default.png";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AuthContext } from "./context/Auth.Provider";

export const Home = () => {
  const { user, verifyToken } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState();
  const [url2, setUrl2] = useState();

  console.log(verifyToken);

  const boginoo = () => {
    setUrl2(inputValue);
    axios
      .post("http://localhost:4000/url/", {
        url: inputValue,
        author_id: verifyToken._id,
      })
      .then((res) => {
        setUrl("http://localhost:4000/url/" + res.data.short);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={styles.bogi} onClick={boginoo}>
            БОГИНОСГОХ
          </button>
        </div>
        <div className={styles.gib}>
          <div className={styles.olddiv}>
            <div className={styles.oldtext}>Өгөгдсөн холбоос:</div>
            <div className={styles.oldlink}>{url2}</div>
          </div>
          <div className={styles.newdiv}>
            <div className={styles.newtext}>Богино холбоос:</div>
            <div className={styles.new}>
              <div className={styles.newlink}>{url}</div>
              <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                <div className={styles.copy}>Хуулж авах</div>
              </CopyToClipboard>
              {copied && <div className={styles.copied}>Хуулсан</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
