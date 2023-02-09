import styles from "./styles/Users.module.css";
import logo from "./assets/logo-default.png";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./context/Auth.Provider";

export const Users = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/users", {
        headers: {
          authorization:
            window.localStorage.getItem("credentials") &&
            JSON.parse(window.localStorage.getItem("credentials")),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const deleteUser = (_id) => {
  //   axios
  //     .delete("http://localhost:4000/users/" + _id)
  //     .then(() => {
  //       axios.get("http://localhost:4000/users/").then((res) => {
  //         setUsers(res.data);
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className={styles.container}>
      <div className={styles.big}>
        <div className={styles.logodiv}>
          <img className={styles.logo} src={logo}></img>
        </div>
        <div className={styles.bigdiv}>
          <div className={styles.text}>Хэрэглэгчид</div>
          <div className={styles.users}>
            {users &&
              users.map((item, index) => {
                return (
                  <div key={index}>
                    <div className={styles.user}>
                      <div className={styles.name}>
                        <div className={styles.oldtext}>Хэрэглэгчийн нэр:</div>
                        <div className={styles.oldlink}>{item.username}</div>
                      </div>
                      <div className={styles.id}>
                        <div className={styles.newtext}>Хэрэглэгчийн ID:</div>
                        <div className={styles.newlink}>{item._id}</div>
                      </div>
                      <div className={styles.role}>
                        <div className={styles.newtext}>
                          Хэрэглэгчийн төрөл:
                        </div>
                        <div className={styles.newlink}>{item.roles}</div>
                      </div>
                      {/* <div
                        className={styles.delete}
                        onClick={() => {
                          deleteUser(item._id);
                        }}
                      >
                        Устгах
                      </div> */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
