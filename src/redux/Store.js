import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import secureLocalStorage from 'react-secure-storage';



const loadState = () =>{

    try{
        const serializedState = secureLocalStorage.getItem('reduxState');
        if(serializedState==null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch(e){
        return undefined;
    }
} 

const saveState = (state) =>{
    try{
        const serializedState = JSON.stringify(state);
        secureLocalStorage.setItem("reduxState",serializedState);
    }
    catch(e){
        console.log(e);
    }
}


const store = configureStore({
    reducer:{
        userItems:UserSlice
    },
    preloadedState:loadState()
});

store.subscribe(() =>{
    saveState(store.getState());
})


export default store;