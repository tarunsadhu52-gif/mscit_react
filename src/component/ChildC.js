import React,{useContext} from "react";
import { moneyContext } from "./Moneycontext";
import { useSelector,useDispatch } from "react-redux";
import { addMoney,reduemoney } from "./Moneyslie"

const ChildC = () => {
        const money = useSelector((state)=>state.money.amount)
        const count = useSelector((state)=>state.money.count)
        const dispatch = useDispatch()
        const handaladdMoney = () =>{

        
        dispatch(addmoney  (1000));

        }
        const handalreduceMoney =() => {
            dispatch(reduemoney(20))
        }
    

    return(
        <>
             <h1>Parent Component</h1>
            <MoneyContext.Provider value={{money, setMoney}}>
                <ChildA2 />
            </MoneyContext.Provider>
        </>

    )

};
export default ChildC;