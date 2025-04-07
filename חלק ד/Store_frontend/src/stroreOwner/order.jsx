import { useContext, useEffect, useState } from 'react'
import apiCall from '../ApiCalls'
//import { ContextUser } from '../contextUser'
const Order = () => {
    const [name, setName] = useState("")
    const [sum, setSum] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [suppliers, setSuppliers] = useState([])
   // const {user,setUser}=useContext(ContextUser)
    const validateSum = async(sum) => {
        const data=await apiCall(`Good/${encodeURIComponent(name)}/${Number(supplier)}`)
        if(data){
            console.log(data);
            const minAmount=data[0].MinimumQuantityForOrder;
            if(sum<minAmount){
                alert(`The minimum amount of ${name} is ${minAmount}`)
                return false
            }
        }
        return true     
    }
    const HandleForm = async () => {
        //if(!(await validateSum(sum))){ return;};
        const updatedOrder = {
            oStatus: 'Open', 
            productName: name,
            sumP: sum,
            supplierID: supplier,
        };
        const response = await apiCall("Order",'POST',updatedOrder);
        if (response) {
            alert('Order add successfully');
        }
    };
    useEffect(() => {
        async function getSuppliers() {
            const data= await apiCall(`Supplier`)
            if(data){
                setSuppliers(data)
            }
        }
        getSuppliers()
    },[])
    return (
        <div>
            <h1>Order</h1>
                <form onSubmit={HandleForm} style={{backgroundColor:"pink",padding:"30px",borderRadius:"20px"}}>
                <input
                type="text" 
                value={name}
                placeholder='product:'
                onChange={(e) => setName(e.target.value)}
                />
                <br/>
                <input
                type="number" 
                value={sum}
                placeholder='how many?:'
                min={0}
                onChange={(e) => setSum(Number(e.target.value))}
                />
                <br></br>
                <label>Supplier:</label>
                <select
                value={supplier}
                onChange={(e) => setSupplier(Number(e.target.value))}
                >
                {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                    {supplier.companyName}
                    </option>
                ))}
                </select>
                <br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Order