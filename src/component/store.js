import { configureStore } from "@reduxjs/toolkit";
import moneyReducer from './Moneyslie'

export  const store = configureStore({
    reducer:{
        money : moneyReducer,
    }
})