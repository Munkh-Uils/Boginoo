import styles from "./styles/History.module.css";
import logo from "./assets/logo-default.png";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AuthContext } from "./context/Auth.Provider";

export const History = () => {
  const { user } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState();
  const [url2, setUrl2] = useState();
  const [history, setHistory] = useState();

  const boginoo = () => {
    setUrl2(inputValue);
    axios
      .post("http://localhost:3002", {
        url: inputValue,
      })
      .then((res) => {
        console.log(res.data._id);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:4000/url", {}).then((res) => {
      console.log(res.data);
      setHistory(res.data);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);
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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className={styles.bogi} onClick={boginoo}>
            БОГИНОСГОХ
          </button>
        </div>
        <div className={styles.gib}>
          <div className={styles.newdiv}>
            <div className={styles.new}></div>
          </div>
        </div>
        <div className={styles.text}>Түүх</div>
        <div className={styles.histories}>
          <div className={styles.history}>
            <div className={styles.long}>
              <div className={styles.oldtext}>Өгөгдсөн холбоос:</div>
              <div className={styles.oldlink}>
                https://nest-attendance-app.web.app/
              </div>
            </div>
            <div className={styles.short}>
              <div className={styles.newtext}>Богино холбоос:</div>
              <div className={styles.new}>
                <div className={styles.newlink}>
                  http://localhost:3000/history
                </div>
                <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
                  <div className={styles.copy}>Хуулж авах</div>
                </CopyToClipboard>
                {copied && <div className={styles.copied}>Хуулсан</div>}
              </div>
            </div>
          </div>
          {history &&
            history.map((item, index) => {
              return (
                <div key={item.name + index}>
                  <div className={styles.songname}>{item.url}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
