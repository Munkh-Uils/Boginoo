import { Open } from "./components/Open";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { History } from "./components/History";
import { Users } from "./components/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/Auth.Provider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/open" element={<Open />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<History />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
