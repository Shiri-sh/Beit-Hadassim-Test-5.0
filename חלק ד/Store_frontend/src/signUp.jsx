import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "./contextUser";
import apiCall from "./ApiCalls";

const SignUp = () => {
   
    const [products,setProducts]=useState([]);
    const { setUser } = useContext(ContextUser);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Id: "",
        CompanyName: "",
        NumberPhone: "",
        AgentName: "",
        Goods: [{ ProductID: 0, MinimumQuantityForOrder: 0, PricePerItem: 0}],
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addNewGood = () => {
        setFormData((prev) => ({
            ...prev,
            Goods: [...prev.Goods, { ProductID: 0, MinimumQuantityForOrder: 0, PricePerItem: 0  }]
        }));
    };
    const removeGood = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            Goods: prev.Goods.filter((_, index) => index !== indexToRemove)
        }));
    };
    const handleGoodChange = (index, field, value) => {
        if (value < 0) return;
        const updatedGoods = [...formData.Goods];
        updatedGoods[index] = { ...updatedGoods[index],
            [field]: ["ProductID", "MinimumQuantityForOrder", "PricePerItem"].includes(field)
            ? Number(value)
            : value
        };  
        setFormData((prev) => ({ ...prev, Goods: updatedGoods }));
    };

    const validateForm =  () => {
        let errors = [];
        
        if (formData.Goods.length == 0){ 
            errors.push("You must select at least one good.");
        }
        if (formData.Id.length !== 9){ 
            errors.push("The ID should be exactly 9 digits.");
        }
        if (formData.AgentName.length > 15 || formData.AgentName.length < 2) {
            errors.push("The name should be between 2 to 15 characters.");
        }
        if (formData.NumberPhone.length !== 10 || !/^\d+$/.test(formData.NumberPhone)) {
            errors.push("The phone number should be exactly 10 digits.");
        }
        return errors;
    }
    
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
        const supplierId = Number(formData.Id); 

        const goodsWithSupplierId = formData.Goods.map((g) => ({
            ...g,
            SupplierID: supplierId
        }));
    
        const finalFormData = {
            ...formData,
            Id: supplierId,
            Goods: goodsWithSupplierId
        };
        setUser({ id: formData.Id, bus: "supplier" });
        let data= await apiCall("Supplier", "POST", finalFormData);
        if (data) {
            navigate(`/suppliers/${formData.Id}/displayOrders`);
        }
    };
    useEffect(() => {
        async function getSuppPod() {
            const prods= await apiCall(`Product`)
            if(prods){
                setProducts(prods)
            }
        }
        getSuppPod()
    },[])

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit={handleFormSubmit} style={{ backgroundColor: "pink", padding: "30px", borderRadius: "20px" }}>
                <InputField name="Id" value={formData.Id} placeholder="Enter your ID" onChange={handleChange} />
                <InputField name="CompanyName" value={formData.CompanyName} placeholder="Enter your CompanyName" onChange={handleChange} />
                <InputField name="AgentName" value={formData.AgentName} placeholder="Enter your name" onChange={handleChange} />
                <InputField name="NumberPhone" value={formData.NumberPhone} placeholder="Enter your phone(this your password)" onChange={handleChange} />

                <h6>fill in the details of the goods you provide</h6>
                {formData.Goods.map((good, index) => (
               
                    <div key={index}>
                    <select
                    value={good.ProductID}
                    onChange={(e) => handleGoodChange(index, "ProductID", e.target.value)}
                    >
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>{product.productName}</option>
                    ))}
                    </select>
                    <br/>
                    <InputField
                        value={good.MinimumQuantityForOrder}
                        placeholder="Minimum quantity"
                        onChange={(e) => handleGoodChange(index, "MinimumQuantityForOrder", e.target.value)}
                        type="number"
                        min="0"
                    />
                    <InputField
                        value={good.PricePerItem}
                        placeholder="Price per item"
                        onChange={(e) => handleGoodChange(index, "PricePerItem", e.target.value)}
                        type="number"
                        min="0"
                    />
                    {formData.Goods.length > 1 && (
                    <button type="button" onClick={() => removeGood(index)}>
                        delete
                    </button>
                     )}
                    </div>
                    
                ))}
                <br/>
                <button type="button" onClick={addNewGood}> Add Another Good</button>
                <br />               
                <button type="submit">Submit</button>
                </form>
                <button onClick={() => navigate("/login")}>Login</button>
        
        </div>
    );
}

const InputField = ({ type = "text", name, value, placeholder, onChange,min=null }) => (
    <>
        <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} min={min} />
        <br />
    </>
);

export default SignUp;
