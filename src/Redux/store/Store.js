import { configureStore } from "@reduxjs/toolkit";
import AllActionsData from "../actions/index";


const Store=configureStore({
    reducer:AllActionsData
})


export default Store;