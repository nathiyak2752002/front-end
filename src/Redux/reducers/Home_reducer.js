import { createSlice } from '@reduxjs/toolkit';
const initialStateValue={
    allUserData:[],
}
const Home_reducer=createSlice({
    name:"Home",
    initialState:initialStateValue,
    reducers:{
        GetActionHome:(state,action)=>{
            state.allUserData.push(action.payload);
        }
    }
})
export const {GetActionHome}=Home_reducer.actions;
export default Home_reducer.reducer;