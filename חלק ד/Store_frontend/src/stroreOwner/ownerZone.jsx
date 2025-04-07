import { useContext, useEffect } from "react";
import './../App.css'
import { Outlet } from 'react-router-dom'
import { ContextUser } from "./../contextUser";
import { useNavigate } from "react-router-dom"


const OwnerZone = () => {
    const navigate = useNavigate();

    const { user, setUser} = useContext(ContextUser);
   
    function logout() {
        setUser((prevUser) => ({
            id: '',
            bus: 'supplier', // מעדכנת רק את bus ומשאירה את שאר הנתונים
        }));
        navigate("/login", { replace: true });
    }
    return (
        <>
        <div>
            <h1>My Zone</h1>
            <button  onClick={() => navigate(`order`)}>order a delivery</button>
            <button  onClick={() => navigate(`displayOrders`)}>show my orders</button>
            <button onClick={logout}>log out</button>
        </div>
        <Outlet />
        </>
    )
}

export default OwnerZone