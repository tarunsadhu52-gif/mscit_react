import { createSlice } from "@reduxjs/toolkit";

const moneyslicen = createSlice({
    name:" money",
    initialState:{amount:100,count:10},

    reducers:{
        addMoney:(state,action)
    }
})