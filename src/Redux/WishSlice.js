"use client";
import { postWithToken } from "@/Helper/common";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  wish: [],
  cartTotalQuantity: 0,
};

const storedwish =
  typeof window !== "undefined" ? localStorage.getItem("wish") : null;
if (storedwish) {
  initialState.wish = JSON.parse(storedwish);
}

const wishSlice = createSlice({
  name: "Wish",
  initialState,
  reducers: {
    addToWish(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const ItemIndex = state.wish.findIndex(
        (iteam) => iteam.variant_productid === action.payload.variant_productid
      );

      if (ItemIndex >= 0) {
        const nextWishItems = state.wish.filter(
          (item) => item.productid !== action.payload.productid
        );
    
        state.wish = nextWishItems;
    
        // toast.success("Product removed from wishlist!", {
        //   position: "top-left",
        // });
      } else {
        const temp = { ...action.payload, qty: 1 };

        state.wish = [...state.wish, temp];
      }

      if (userToken) {
        const apiData = JSON.stringify({
          product_id: action.payload.variant_productid,
        });
        const data = postWithToken("wishlist-product", apiData);
        if (typeof window !== "undefined") {
          localStorage.setItem("wish", JSON.stringify(state.wish));
        }
      }
    },

    addToWishProductsDetails(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (userToken) {
        const apiData = JSON.stringify({
          product_id: action.payload.variant_productid,
        });
        const data = postWithToken("wishlist-product", apiData);
        if (typeof window !== "undefined") {
          localStorage.setItem("wish", JSON.stringify(state.wish));
        }
      }
    },

    removeToWish(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
      if (userToken) {
        const apiData = JSON.stringify({
          wishlist_id: action.payload.wishlistid,
        });
        const data = postWithToken("delete-wishlist-product", apiData);
        //  local
        state.wish.map((wish) => {
          if (wish.variant_productid === action.payload.variant_productid) {
            const nextwish = state.wish.filter(
              (item) => item.variant_productid !== wish.variant_productid
            );
            state.wish = nextwish;
          }
          if (typeof window !== "undefined") {
            localStorage.setItem("wish", JSON.stringify(state.wish));
          }
          return state;
        });
      }
    },
  },
});

export const { addToWish, removeToWish, addToWishProductsDetails } =
  wishSlice.actions;
export default wishSlice.reducer;
