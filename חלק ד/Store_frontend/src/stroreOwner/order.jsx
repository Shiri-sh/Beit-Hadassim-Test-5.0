import { useContext, useEffect, useState } from 'react'
import apiCall from '../ApiCalls'
//import { ContextUser } from '../contextUser'
const Order = () => {
    const [prodId, setProdId] = useState(1)
    const [sum, setSum] = useState(0)
    const [supplier, setSupplier] = useState(0)
    const [suppliers, setSuppliers] = useState([])
    const [products, setProducts] = useState([])

   // const {user,setUser}=useContext(ContextUser)
    const validateSum = async() => {
        const data=await apiCall(`Good/${Number(prodId)}/${Number(supplier)}`)
        if(data != null){
            const minAmount=data[0].minimumQuantityForOrder;
            if(sum<minAmount){
                alert(`The minimum amount is ${minAmount}`)
                return false
            }
        }
        else{
            return false
        }
        return true     
    }
    const HandleForm = async (e) => {
        e.preventDefault();
        if(!(await validateSum())){ return;};
        const updatedOrder = {
            productID: prodId,
            sumP: sum,
            oStatus: 'Open', 
            supplierID: supplier,
        };
        const response = await apiCall("Order",'POST',updatedOrder);
        if (response.status === 200) {
            alert('Order add successfully');
        }
    };
    useEffect(() => {
        async function getSuppPod() {
            const sups= await apiCall(`Supplier`)
            if(sups){
                setSuppliers(sups)
            }
            const prods= await apiCall(`Product`)
            if(prods){
                setProducts(prods)
            }
        }
        getSuppPod()
    },[])
    return (
        <div>
            <h1>Order</h1>
                <form onSubmit={HandleForm} style={{backgroundColor:"pink",padding:"30px",borderRadius:"20px"}}>
                <label>products:</label>
                <select
                value={prodId}
                onChange={(e) => setProdId(Number(e.target.value))}
                >
                {products.map((p) => (
                    <option key={p.id} value={p.id}>
                    {p.productName}
                    </option>
                ))}
                </select>
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