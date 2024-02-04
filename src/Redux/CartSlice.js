"use client";
import { postWithToken } from "@/Helper/common";
import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

const initialState = {
  carts: [],
};

const storedCartItems =
  typeof window !== "undefined" ? localStorage.getItem("carts") : null;

if (storedCartItems) {
  initialState.carts = JSON.parse(storedCartItems);
}

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
     addToCart(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      var qty = 1;
      // increment cart data
      const ItemIndex = state.carts.findIndex(
        (iteam) => iteam.variant_productid === action.payload.variant_productid
      );
      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qty += 1;
        qty = qty + 1;
      } else {
        const temp = { ...action.payload, qty: 1 };
        state.carts = [...state.carts, temp];
      }
      if (userToken) {
        const apiData = JSON.stringify({
          product_id: action.payload.variant_productid,
          qty: qty,
        });
       
        const data =  postWithToken("add-cart", apiData);
        if (typeof window !== "undefined") {
          localStorage.setItem("carts", JSON.stringify(state.carts));
        }
      }
    },
    removeToCart(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      if (userToken) {
        const apiData = JSON.stringify({ id: action.payload.id }); // id tha 
      
        const data = postWithToken("delete-cart", apiData);
       
        state.carts.map((carts) => {
         
          if (carts.variant_productid === action.payload.product_id) {
            const nextCartItems = state.carts.filter(
              (item) => item.variant_productid !== carts.variant_productid
            );
            state.carts = nextCartItems;
          }

          const updatedCarts = state.carts.filter((item) => item.qty > 0);

            state.carts = updatedCarts;
          if (typeof window !== "undefined") {
            localStorage.setItem("carts", JSON.stringify(state.carts));
          }
          return state;
        });
      }
    },


    removeFromProductIncDec(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      if (userToken) {
        const apiData = JSON.stringify({ id: action.payload.variant_productid }); // id tha 
        const data = postWithToken("delete-cart", apiData);
        state.carts.map((carts) => {
          if (carts.variant_productid === action.payload.variant_productid) {
            const nextCartItems = state.carts.filter(
              (item) => item.variant_productid !== carts.variant_productid
            );
            state.carts = nextCartItems;
          }

          const updatedCarts = state.carts.filter((item) => item.qty > 0);

            state.carts = updatedCarts;
          if (typeof window !== "undefined") {
            localStorage.setItem("carts", JSON.stringify(state.carts));
          }
          return state;
        });
      }
    },
    //   decrement product from cart
    removeSingleItems: (state, action) => {
      const IteamIndex_dec = state.carts.findIndex(
        (iteam) => iteam.id === action.payload
      );
      if (state.carts[IteamIndex_dec].qty >= 1) {
        state.carts[IteamIndex_dec].qty -= 1;
      }
    },

    //   decrement product from cart
    removeSingleproduct: (state, action) => {
      var qty = action.payload.qty;
      const IteamIndex_dec = state.carts.findIndex(
        (iteam) => iteam.product_id === action.payload
      );
      if (state.carts[IteamIndex_dec].qty >= 1) {
        state.carts[IteamIndex_dec].qty -= 1;
      }
    },

    cartIncrement(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      var qty = action.payload.qty;
      const ItemIndex = state.carts.findIndex(
        (iteam) => iteam.product_id === action.payload.product_id
      );

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qty += 1;
        qty = state.carts[ItemIndex].qty;
      } else {
        const temp = { ...action.payload, qty: qty };
        state.carts = [...state.carts, temp];
      }
    },

    ProductInc(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      var cartQty = action.payload.cartQty;
      const ItemIndex = state.carts.findIndex(
        (iteam) => iteam.productid === action.payload.productid
      );

      if (ItemIndex >= 0) {
        state.carts[ItemIndex].cartQty += 1;
        cartQty = state.carts[ItemIndex].cartQty;
      } else {
        const temp = { ...action.payload, cartQty: cartQty };
        state.carts = [...state.carts, temp];
      }
    },
    emptyCartItem: (state, action) => {
      state.carts = [];
    },

    wishToCart(state, action) {
      // const userToken = localStorage.getItem("token");
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (userToken) {
        const apiData = JSON.stringify({
          wishlistid: action.payload.wishlistid,
        });
        const data = postWithToken("add-cart", apiData);
      }
    },

    productsDetailsToCart(state, action) {
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      var qty = 1;
      const ItemIndex = state.carts.findIndex(
        (iteam) => iteam.variant_productid === action.payload.variant_productid
      );
      if (ItemIndex >= 0) {
        state.carts[ItemIndex].qty += 1;
        qty = qty + 1;
      } else {
        const temp = { ...action.payload, qty: 1 };
        state.carts = [...state.carts, temp];
      }

      if (userToken) {
        const apiData = JSON.stringify({
          product_id: action.payload.variant_productid,
          qty: action.payload.qty,
        });
        const data = postWithToken("add-cart", apiData);

        if (typeof window !== "undefined") {
          // Set item in local storage
          localStorage.setItem("carts", JSON.stringify(state.carts));
        }
      }
    },

    productsDetailsToCartQty(state, action) {
      // const userToken = localStorage.getItem("token");
      const userToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      // increment cart data
      const ItemIndex = state.carts.findIndex(
        (iteam) => iteam.product_id === action.payload.product_id
      );
      if (userToken) {
        const apiData = JSON.stringify({
          product_id: action.payload.product_id,
          qty: action.payload.qty,
        });
        const data = postWithToken("add-cart", apiData);

        state.carts;
      }
    },

    decreseQtyProductsDetails: (state, action) => {
      const IteamIndex_dec = state.carts.findIndex(
        (iteam) => iteam.id === action.payload
      );
      if (state.carts[IteamIndex_dec].qty >= 1) {
        state.carts[IteamIndex_dec].qty -= 1;
      }
    },

  
  },
});

export const {
  addToCart,
  removeToCart,
  removeSingleItems,
  emptyCartItem,
  cartIncrement,
  ProductInc,
  wishToCart,
  productsDetailsToCart,
  removeSingleproduct,
  productsDetailsToCartQty,
  removeFromProductIncDec
} = cartSlice.actions;
export default cartSlice.reducer;
