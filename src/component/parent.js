import React,{useState} from "react";
import React from "react";
import childA from "./ChildA";
import { Provider } from "react-redux";
import {store} from "./store"

const Parent = () => {
    const [money,setMoney] = useState(1000);
    return(
        <>
        <h1>parent Componenet</h1>
        <Provider store={store}>
            <childA/>
        </Provider>
        
        </>
    )
};
export default Parent;