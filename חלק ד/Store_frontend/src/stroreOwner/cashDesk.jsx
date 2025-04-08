import { useState } from "react";
import { useEffect } from "react";
import apiCall from "../ApiCalls";

const CashDesk = () => {
    const [data,setData]=useState([])
    const [shop, setShop] = useState([{productId:1,quantity:0}])
    const HandleForm= async(e)=>{
        e.preventDefault();
        const soldItems = shop.reduce((acc,item) => {
              acc[item.productId] = item.quantity;
            return acc;
          }, {});
          (soldItems);
        const response = await apiCall("StoreOwnerInventory",'PUT',soldItems);
        if (response != null) {
            alert('suplly updated successfully');
        }
    }
    const addNewProd = () => {
        setShop((prev) => (
         [...prev, { ProductId: 1, quantity: 0 }]
        ));
    };
    const removeProd = (indexToRemove) => {
        setShop((prev) => prev.filter((_, index) => index !== indexToRemove));
    };
    useEffect(() => {
        async function getSupply() {
           let invetory=await apiCall(`StoreOwnerInventory`) 
            if(invetory){
                 (invetory);
                setData(invetory)
            }
        }
        getSupply();
    }, []);

    return (
        <>
    <form onSubmit={HandleForm} style={{backgroundColor:"pink",padding:"30px",borderRadius:"20px"}}>
        {shop.map((merch, index) => (
                    <>
                     <input
                    type="number" 
                    value={merch.quantity}
                    placeholder='how many?:'
                    min={0}
                    onChange={(e) =>
                        setShop((prev) => {
                            const updated = [...prev];
                            updated[index].quantity = Number(e.target.value);
                            return updated;
                        })
                    }
                    />
                    <select
                    value={merch.productId}
                    onChange={(e) =>
                        setShop((prev) => {
                            const updated = [...prev];
                            updated[index].productId = Number(e.target.value);
                            return updated;
                        })
                    }
                    >
                    {data.map((merch) => (
                        <option key={merch.id} value={merch.id}>
                        {merch.productName}
                        </option>
                    ))}
                    </select>
                    <br/>
                    {shop.length > 1 && (
                    <button type="button" onClick={() => removeProd(index)}>
                        delete
                    </button>
                     )}
                     <br/>
                    </>
        ))}
        <br/>
        <button type="button" onClick={addNewProd}> Add Another product</button>
        <br/>
        <button type="submit">Submit</button>   
                
    </form>
    </>
   );
};

export default CashDesk