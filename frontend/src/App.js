import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NavBar from "./components/Header/Navbar";
import UserList from "./pages/UserList/UserList";
import ProtectedRoute from "./helpers/protectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}> 
          <Route element={<UserList/>} path="/users"/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
