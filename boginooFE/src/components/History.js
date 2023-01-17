import styles from "./styles/History.module.css";
import logo from "./assets/logo-default.png";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AuthContext } from "./context/Auth.Provider";

export const History = () => {
  const { user } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [url, setUrl] = useState();
  const [url2, setUrl2] = useState();
  const [history, setHistory] = useState();
  const [history2, setHistory2] = useState();

  const boginoo = () => {
    setUrl2(inputValue);
    axios
      .post("http://localhost:3002", {
        url: inputValue,
      })
      .then((res) => {
        console.log(res.data._id);
        setUrl("http://localhost:3002/" + res.data._id);
        setHistory([res.data._id]);
        setHistory([...history, res.data._id]);
      });
  };

  console.log(history);

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
          {/* <div className={styles.delete} onClick={Delete}>
            Устгах
          </div> */}
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
            <div className={styles.new}>
              <div className={styles.urls}>
                {history &&
                  history.map((item, index) => {
                    return (
                      <div key={item + index}>
                        <div className={styles.olddiv}>
                          <div className={styles.oldtext}>
                            Өгөгдсөн холбоос:
                          </div>
                          <div className={styles.oldlink}>{url2}</div>
                        </div>
                        <div className={styles.newtext}>Богино холбоос:</div>
                        <div className={styles.shorts}>
                          <div className={styles.newlink}>
                            http://localhost/3002/{item}
                          </div>
                          <CopyToClipboard
                            text={url}
                            onCopy={() => setCopied(true)}
                          >
                            <div className={styles.copy}>Хуулж авах</div>
                          </CopyToClipboard>
                          {copied && (
                            <div className={styles.copied}>Хуулсан</div>
                          )}
                        </div>
                        <div className={styles.zur}></div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
