"use client";
import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
};

const storedCartItems = typeof window !== 'undefined' ? localStorage.getItem("cartItems") : null;

if (storedCartItems) {
  initialState.cartItems = JSON.parse(storedCartItems);
}

const cart1Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart1(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.variant_productid === action.payload.variant_productid
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          qty: state.cartItems[existingIndex].qty + 1,
        };
      
      } else {
        let tempProductItem = { ...action.payload, qty: 1 };
        state.cartItems.push(tempProductItem);
        
        toast.success("Product successfully added into cart",{
          position:"top-left"
        });
       
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decreaseCart1(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productid === action.payload.productid
      );

      if (state.cartItems[itemIndex]?.qty > 1) {
        state.cartItems[itemIndex].qty -= 1;

        // toast.success("Decreased product quantity");
      } else if (state.cartItems[itemIndex]?.qty === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.productid
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart",{
          position:"top-left"
        });
      }

      if (typeof window !== 'undefined') {
        // Set item in local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart1(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.variant_productid === action.payload) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.variant_productid !== cartItem.variant_productid
          );
          state.cartItems = nextCartItems;

          // toast.success("Product removed from cart",{
          //   position:"top-left"
          // });
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
        return state;
      });
    },

    removelocalcartLogin(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.variant_productid === action.payload) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.variant_productid !== cartItem.variant_productid
          );
          state.cartItems = nextCartItems;

          toast.success("Product removed from cart",{
            position:"top-left"
          });
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, qty } = cartItem;
          const itemTotal = price * qty;

          cartTotal.total += itemTotal;
          cartTotal.quantity += qty;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearCart(state, action) {
      state.cartItems = [];
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      if (typeof window !== 'undefined') {
        // Set item in local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      toast.error("Cart cleared",{
        position:"top-left"
      });
    },

    //
    addToCart1111(state, action) {
      let tempProductItem = { ...action.payload, qty: 1 };
      state.cartItems.push(tempProductItem);
      toast.success("Product added to cart");
      dispatch(removeFromWish1(action.payload.productid));
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },  


    addToCartFromProductDetails(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.variant_productid === action.payload.variant_productid
      );
     
 
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          qty: state.cartItems[existingIndex].qty + 1,
        };
        setTimeout(() => {
          toast.success("Increased product quantity",{
            position:"top-left"
          }); 
        }, 3000);
       
      } else {
        let tempProductItem = { ...action.payload, qty: action.payload.qty };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart",{
          position:"top-left"
        });
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const {
  addToCart1,
  decreaseCart1,
  removeFromCart1,
  getTotals,
  clearCart,
  addToCart1111,
  addToCartFromProductDetails,
} = cart1Slice.actions;

export default cart1Slice.reducer;
