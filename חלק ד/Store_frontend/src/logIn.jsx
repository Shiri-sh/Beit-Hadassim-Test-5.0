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
        console.log(password);
        if (password === "") {
            alert("Please enter your password");
            return false;
        }
        const sup = await apiCall(`Supplier/${password}`);
        if (!sup) {
            alert("wrong password");
            return false;
        }
        setUser((prevUser) => ({
            ...prevUser,
            id: sup.id, 
        }));
        console.log(sup);
        return sup.id;
    };

    const handleRequest = async (e) => {
        e.preventDefault(); // עוצר את הפעולה ברירת המחדל של הטופס
        if (user.bus === "supplier") {
            const supId=await validateSupplier();
            if (!supId) {
                return;
            } else {
                console.log(supId);
                navigate(`/suppliers/${supId}/displayOrders`);
            }
        } else {
            navigate(`/storeOwner/displayOrders`);
        }
    };

    console.log("user:", user);

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
                        bus: e.target.value, // מעדכנת רק את bus ומשאירה את שאר הנתונים
                    }));
                    console.log("Selected value:", e.target.value);
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
