import styles from "./styles/History.module.css";
import logo from "./assets/logo-default.png";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AuthContext } from "./context/Auth.Provider";

export const History = () => {
  const { user, verifyToken } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState();
  const [local, setLocal] = useState();
  const [history, setHistory] = useState();

  useEffect(() => {
    axios.get("http://localhost:4000/url", {}).then((res) => {
      setHistory(res.data);
      setLocal("http://localhost:4000/url/");
    });
  }, []);
  console.log(history);

  const deleteUrl = (_id) => {
    axios
      .delete("http://localhost:4000/url/" + _id)
      .then(() => {
        axios.get("http://localhost:4000/url/").then((res) => {
          setHistory(res.data);
          setLocal("http://localhost:4000/url/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.big}>
        <div className={styles.logodiv}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <div className={styles.gib}>
          <div className={styles.newdiv}>
            <div className={styles.new}></div>
          </div>
        </div>
        <div className={styles.text}>Түүх</div>
        <div className={styles.histories}>
          {history &&
            history.map((item, index) => {
              if (item.author_id === verifyToken._id) {
                return (
                  <div key={index}>
                    <div className={styles.history}>
                      <div className={styles.long}>
                        <div className={styles.oldtext}>Өгөгдсөн холбоос:</div>
                        <div className={styles.oldlink}>
                          {item.url.length > 30 &&
                            item.url.slice(0, 30) + "..."}
                          {item.url.length < 30 && item.url}
                        </div>
                      </div>
                      <div className={styles.short}>
                        <div className={styles.newtext}>Богино холбоос:</div>
                        <div className={styles.new}>
                          <div className={styles.newlink}>
                            http://localhost:4000/url/{item.short}
                          </div>
                          <CopyToClipboard
                            text={local + item.short}
                            onCopy={() => setCopied(true)}
                          >
                            <div className={styles.copy}>Хуулж авах</div>
                          </CopyToClipboard>
                          <div
                            className={styles.delete}
                            onClick={() => {
                              deleteUrl(item._id);
                            }}
                          >
                            Устгах
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};
