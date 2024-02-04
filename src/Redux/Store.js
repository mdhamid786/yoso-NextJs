import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import WishReducer from "./WishSlice";
import cartReducer1 from "./Reduxslice";
import wishReducer1 from "./ReduxWishSlice";

const store =configureStore({
    reducer:{
        allCart:cartReducer,
        allWish:WishReducer,
        allCart1:cartReducer1,
        allWish1:wishReducer1,
    }
})

export default store;