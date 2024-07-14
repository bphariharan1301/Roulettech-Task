import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/Login/SignUp";
import AddApps from "./components/AddApps/AddApps";
import { getUser } from "./apiConfig";

// export const currentUser = await getUser();
// console.log("Current User: ", currentUser);

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-apps" element={<AddApps />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
