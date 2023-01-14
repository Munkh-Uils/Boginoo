import {createContext, useState, useEffect} from "react";
import {onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {auth} from "../config";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [url, setUrl] = useState();
    const [shortUrl, setShortUrl] = useState();
    const [inputValue, setInputValue] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                setUser(user);
                const uid = user.uid;
                console.log(user);
            } else {
                setUser(null);
                navigate("/open");
                console.log("user is logged out")
            }
        })
        axios.get("http://localhost:3001/63c160a49e21f4b9c535bf42").then((res) => {
            console.log(res.data);
            setUrl(res.data);
        })
    }, []);
    
    return (
        <AuthContext.Provider value={{user, setUser, inputValue, setInputValue, url}}>
            {props.children}
        </AuthContext.Provider>
    )
}