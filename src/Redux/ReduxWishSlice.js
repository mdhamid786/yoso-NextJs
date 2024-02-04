"use client";
import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  wishItems: [],
  cartTotalQuantity: 0,
};

const storedwishItems =
  typeof window !== "undefined" ? localStorage.getItem("wishItems") : null;

if (storedwishItems) {
  initialState.wishItems = JSON.parse(storedwishItems);
}

const wish1Slice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWish1(state, action) {
      const existingIndex = state.wishItems.findIndex(
        (item) => item.productid === action.payload.productid
      );
    
      if (existingIndex >= 0) {
        state.wishItems[existingIndex] = {
          ...state.wishItems[existingIndex],
          wishQuantity: state.wishItems[existingIndex].wishQuantity + 1,
        };
    
        const nextWishItems = state.wishItems.filter(
          (item) => item.productid !== action.payload.productid
        );
    
        state.wishItems = nextWishItems;
    
        toast.success("Product removed from wishlist!", {
          position: "top-left",
        });
    
        if (typeof window !== "undefined") { 
          localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
        }
      } else {
        let tempProductItem = { ...action.payload, wishQuantity: 1 };
        state.wishItems.push(tempProductItem);
        toast.success("Product added to wishlist", {
          position: "top-left",
        });
      }
    
      if (typeof window !== "undefined") {
        localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
      }
    },
    

    removeFromWish1(state, action) {
      state.wishItems.map((cartItem) => {
        if (cartItem.productid === action.payload) {
          const nextwishItems = state.wishItems.filter(
            (item) => item.productid !== cartItem.productid
          );

          state.wishItems = nextwishItems;

          toast.success("Product removed from wishlist!", {
            position: "top-left",
          });
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
        }
        return state;
      });
    },

    removeFromWishAfterAdd(state, action) {
      state.wishItems.map((cartItem) => {
        if (cartItem.productid === action.payload) {
          const nextwishItems = state.wishItems.filter(
            (item) => item.productid !== cartItem.productid
          );

          state.wishItems = nextwishItems;
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("wishItems", JSON.stringify(state.wishItems));
        }
        return state;
      });
    },
  },
});

export const { addToWish1, removeFromWish1, removeFromWishAfterAdd } =
  wish1Slice.actions;

export default wish1Slice.reducer;
