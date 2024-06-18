import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:{},
}
const UserSlice = createSlice({
    name:"userDetails",
    initialState,
    reducers:{
        addUserDetails(state,action){
            const{id,...credentials} = action.payload; ///a type of javascript map
            state.user[id] = credentials;
        },
        removeUserDetails(state,action){
            delete state.user[action.payload];
        }
    }
})

export default UserSlice.reducer;
export const{addUserDetails,removeUserDetails,updateUserDetails} = UserSlice.actions;