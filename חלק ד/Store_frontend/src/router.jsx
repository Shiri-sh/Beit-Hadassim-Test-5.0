import SignUp from "./signUp";
import Login from "./logIn";
import { createBrowserRouter, Navigate } from "react-router-dom";
import OwnerZone from "./stroreOwner/ownerZone";
import SuppliersZone from "./suppliers.jsx/suppliersZone";
import Order from "./stroreOwner/order";
import DisplayOrders from "./displayOrders";
import ContextUserProvider from "./contextUser";
//import SUSignUp from "./stroreOwner/signUp";
import App from "./App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ContextUserProvider> <App /> </ContextUserProvider>    ,
        children: [
            { path: '/', element: <Navigate to="/login" replace /> },
            { path: 'login', element: <Login /> },
            {
                path: 'signUp', element: <SignUp />
            },
            {
                path: 'suppliers/:id/', element: <SuppliersZone />,children: [
                {path:'displayOrders',element:<DisplayOrders/>}
                ]
            },
            {path:'storeOwner', element:<OwnerZone/>,children:[
                {path:'order',element:<Order/>},
                {path:'displayOrders',element:<DisplayOrders/>}
            ]},
            {path:'*', element:<Navigate to="/login"/>}
        ]
    }
]);
export default router;