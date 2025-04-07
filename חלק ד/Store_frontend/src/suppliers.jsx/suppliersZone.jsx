
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { ContextUser } from "../contextUser";
import { useNavigate } from "react-router-dom";
const DisplayOrders = () => {  
    const {setUser,user}=useContext(ContextUser)
    const navigate = useNavigate();
    function logout() {
        setUser((prevUser) => ({
            ...prevUser,
            id: '', // מעדכנת רק את bus ומשאירה את שאר הנתונים
        }));
    navigate("/login", { replace: true });
    }

    return (
        <>
             <h1>supplier</h1>
             <button onClick={logout}>log out</button>
             <Outlet/>
        </>
    )
}

export default DisplayOrders