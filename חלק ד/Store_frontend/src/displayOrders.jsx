import { useEffect, useState } from "react";
import apiCall from "./ApiCalls";
import { useContext } from "react";
import { ContextUser } from "./contextUser";
import { Link, Outlet, useParams } from 'react-router-dom'
import { use } from "react";

const DisplayOrders = () => {
    const [orders, setOrders] = useState([]);
    const {user,setUser}=useContext(ContextUser)
    const changeStatus=async(id)=>{
        let newStatus = user.bus==="supplier" ? "Process" : "Approve" ;
        const data = await apiCall(`Order/${id}`, "PUT", newStatus);
        if (data) {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id ===id ? { ...order, oStatus: newStatus } : order
                )
            );
        }
    }
    const canApprove = (order) => {
        if (user.bus === "supplier" && order.oStatus === "Open") return true;
        if (user.bus === "store_owner" && order.oStatus === "Process") return true;
        return false;
    };
    useEffect(() => {
        async function getOrders() {
            let data;
            console.log(user)
            if(user.id!==''){
                 data= await apiCall(`Order/${user.id}`) 
            }
            else{
                 data= await apiCall("Order") 
            }
            if (data){
                setOrders(data);
                console.log("display:"+ orders);
            }
        }
        
        getOrders();
    }, [user]);
    
    console.log("orders:", orders)
    console.log("user:", user)


    return (
        <>
            {orders.map(order => {
                return(
                <div  key={order.id}>
                <div style={{ border: "1px solid black", padding: "10px" }}>
                    {canApprove(order) && <button onClick={() => changeStatus(order.id)}>approve Order</button>}
                    <p>ID: {order.id}</p>
                    <p>name: {order.productName}</p>
                    <p>supplier: {order.supplierCompanyName}</p>
                    <p>Status: {order.oStatus}</p>
                    <p>quantity: {order.sumP}</p>
                </div>
                <br />
                </div>
                )
            })}
        </>
    )
}

export default DisplayOrders