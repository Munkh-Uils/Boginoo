import {Open} from "./components/Open";
import {Header} from "./components/Header";
import {Login} from "./components/Login";
import {Signup} from "./components/Signup";
import {Home} from "./components/Home"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./components/context/Auth.Provider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/open" element={<Open />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
