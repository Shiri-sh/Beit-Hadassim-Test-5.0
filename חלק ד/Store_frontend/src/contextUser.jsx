import { createContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export const ContextUser = createContext();
const ContextUserProvider = ({children}) => {

    const [user, setUser] = useState({id: "", bus: "supplier"});
    // const resetUser = () => {localStorage.setItem("currentUser", ""); setUser({})};


    return (
        <ContextUser.Provider value={{user, setUser}}>
            {children}
        </ContextUser.Provider>
    );
}
 export default ContextUserProvider;