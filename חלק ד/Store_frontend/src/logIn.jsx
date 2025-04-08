import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { ContextUser } from './contextUser';
import apiCall from './ApiCalls';
import './App.css';

const LogIn = () => {
    const { user, setUser } = useContext(ContextUser);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateSupplier = async () => {
        if (password === "") {
            alert("Please enter your password");
            return false;
        }
        const sup = await apiCall(`Supplier/${password}`);
        if (sup === null) {
            return false;
        }
        setUser((prevUser) => ({
            ...prevUser,
            id: sup.id, 
        }));
        return sup.id;
    };

    const handleRequest = async (e) => {
        e.preventDefault(); 
        if (user.bus === "supplier") {
            const supId=await validateSupplier();
            if (!supId) {
                return;
            } else {
                navigate(`/suppliers/${supId}/displayOrders`);
            }
        }
         else {
            navigate(`/storeOwner/displayOrders`);
        }
    };


    return (
        <div style={{ backgroundColor: "skyblue", padding: "30px", borderRadius: "20px" }}>
            <form onSubmit={handleRequest}>
                <h1>Log In</h1>
                <input
                    type="text"
                    value={password}
                    placeholder='Enter your password:'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <select value={user.bus} onChange={(e) => {
                    setUser((prevUser) => ({
                        ...prevUser,
                        bus: e.target.value, 
                    }));
                }} >
                    <option value="supplier">supplier</option>
                    <option value="store_owner">store_owner</option>
                </select>
                <br />
                <button type='submit'>submit</button>
            </form>
            <br />
            <button onClick={() => navigate("/signUp")}>
                sign-Up
            </button>
        </div>
    );
};

export default LogIn;
