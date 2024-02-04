"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromProductIncDec,
  removeToCart,
} from "@/Redux/CartSlice";
import toast, { Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { addToWish, removeToWish } from "@/Redux/WishSlice";
import { addToCart1, decreaseCart1, removeFromCart1 } from "@/Redux/Reduxslice";
import { addToWish1, removeFromWish1 } from "@/Redux/ReduxWishSlice";
import Image from "next/image";
import { getApiData, postWithToken } from "@/Helper/common";

const ProductItems = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState([0]);
  const [qty, setQty] = useState(1);
  const [showCartIcon, setShowCartIcon] = useState(true);
  const [productItem, setProductItem] = useState(item);

  const carts = useSelector((state) => state.allCart1.cartItems);
 
  

  
  const [loginCarts, setLoginCarts] = useState([]);
  const dispatch = useDispatch();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // const [showCartIcon, setShowCartIcon] = useState(true);
  const [showAnotherIcon, setShowAnotherIcon] = useState(false);
  const logged =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

useEffect(()=>{
  if(!logged){
    const item= carts.find((cartItem) => cartItem.variant_productid === productItem.variant_productid);
    if(item){
      setProductItem(item)
    }
      }
},[productItem])
    
       

   

  // Des add to cart api calling ...
  const AddtoCartlogin = (e) => {
    try {
      setLoading(true);
      setCount();
      dispatch(addToCart(e));
      const product = productItem;
      const item = product.variant_productid === e.variant_productid;
      if (item) {
        productItem.qty++;
      } 
      setProductItem(productItem);

      // setTimeout(() => {
      //    LatestProducts()
      // }, 1000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setShowCartIcon(false);
        setShowAnotherIcon(true);
      }, 1000);
    }
  };

  const wishList = (e) => {
    try {
      setLoading(true);

      dispatch(addToWish(e));
      const product = productItem;
      const item = product.variant_productid === e.variant_productid;
      if (item) {
        if (productItem.Wishlist === false) {
          productItem.Wishlist = true;
          toast.success("Product added in Wishlist", {
            position: "top-left",
          });
        } else if (productItem.Wishlist === true) {
          productItem.Wishlist = false;
          toast.success("Product remove from Wishlist", {
            position: "top-left",
          });
        }
      }
      setProductItem(productItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1);
    }
  };

  // add to cart calling for redux...
  const handleAddToCart11 = (product) => {
    setLoading(true);
    dispatch(addToCart1(product));
    const item = productItem.variant_productid === product.variant_productid;
    if (item) {
      const updatedProductItem = { ...productItem };
      updatedProductItem.qty++; 
      setProductItem(updatedProductItem);
    }
  
    setTimeout(() => {
      setLoading(false);
      setShowCartIcon(false);
      setShowAnotherIcon(true);
    }, 1000);
  };
  

  // clor change redux
  const [selectedItems, setSelectedItems] = useState([]);

  const addToWishLocal = (e) => {
    try {
      setLoading(true);

      dispatch(addToWish1(e));
      const product = productItem;
      const item = product.variant_productid === e.variant_productid;
      if (item) {
        if (productItem.Wishlist === false) {
          productItem.Wishlist = true;
        } else if (productItem.Wishlist === true) {
          productItem.Wishlist = false;
        }
      }
      setProductItem(productItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1);
    }
  };

  // @ login product decrement
  const afterLoginDec = async (product_id, qty) => {
    if (token) {
      qty = qty - 1;
      const apiData = JSON.stringify({
        product_id: product_id,
        qty: qty,
      });

      const product = productItem;
      const item = product.variant_productid === product_id;
      if (item) {
        productItem.qty--;
      }
      setProductItem(productItem);

      const data = await postWithToken("add-cart", apiData);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  //
  const incrementHandler1 = () => {
    setQty((item) => item + 1);
  };

  const handleDecreaseCart1 = (product) => {
    setLoading(true);
    const updatedProductItem = { ...productItem }; 
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    dispatch(decreaseCart1(product));
    const item = product.variant_productid === productItem.variant_productid;
  
    if (item && updatedProductItem.qty > 0) {
      updatedProductItem.qty--; 
      setProductItem(updatedProductItem); 
    }
  };
  

  const handleRemoveFromCart1 = (product) => {
    dispatch(removeFromCart1(product));
  };

  const handleRemoveFromWish1 = (e) => {
    dispatch(removeToWish(e));

    toast.success("Product removed from wishlist");
  };

  const handleDecrement1 = (e) => {
    dispatch(removeFromProductIncDec(e));
  };


  return (
    <div key={productItem.productid}>
      <div style={{height:"auto"}} className="col mb-30">
        <div style={{ border: "1px solid #ddd" }} className="product__items">
          <div className="product__items--thumbnail">
            <Link
              className="product__items--link"
              href={`/products/${productItem?.slug}`}
            >
              <img
                id="productimg"
                className="product__items--img product__primary--img"
                // src={productItem?.first_image}
                src={
                  item.first_image
                    ? item.first_image
                    : item.image?.length > 0
                    ? item.image[0].img
                    : ""
                }
                alt="product-img"
              />
              <img
                id="productimg"
                className="product__items--img product__secondary--img"
                // src={productItem?.first_image}
                src={
                  item.first_image
                    ? item.first_image
                    : item.image?.length > 0
                    ? item.image[0].img
                    : ""
                }
                alt="product-img"
              />
            </Link>
          </div>
          <div className="product__items--content text-center">
            <h3 className="product__items--content__title h4">
              <Link href={`/products/${productItem.slug}`}>
                {productItem.name}
              </Link>
            </h3>
            <div className="product__items--price">
              <span className="current__price">₹{productItem.offer_price}</span>
              <span className="old__price">
                {" "}
                {productItem.discount_amount > 0
                  ? `₹${productItem.sale_price}`
                  : null}
              </span>
              {/* {item.discount_amount >0? `${item.discount_amount} % off`:null } */}
              {productItem.discount_type === "2" ? (
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    paddingLeft: "10px",
                  }}
                >
                  {productItem.discount_amount} Flat
                </span>
              ) : (
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    paddingLeft: "10px",
                  }}
                >
                  {productItem.discount_amount > 0
                    ? `${productItem.discount_amount} % off`
                    : null}
                </span>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {logged ? (
                <div>
                  {productItem.stock === 0 ? (
                    <button
                      style={{ backgroundColor: "green", color: "white" }}
                      disabled={loading || productItem.stock === 0}
                      id="btnproducts"
                      className="product__items--action__cart--btn "
                    >
                      {showCartIcon && <RemoveShoppingCartIcon />}
                      {/* {showAnotherIcon && <AddIcon />} */}
                      <span className="add__to--cart__text ml-2">
                        Out of stock
                      </span>
                    </button>
                  ) : (
                    <>
                      {productItem.qty == 0 ? (
                        <button
                          onClick={() => AddtoCartlogin(productItem)}
                          id="btnproducts "
                          className="product__items--action__cart--btn primary__btn"
                        >
                          {loading && (
                            <CgSpinner
                              style={{ marginLeft: "30px" }}
                              size={30}
                              id="loaderid"
                              className="mt-1 ml-5 items-center animate-spin justify-center text-center"
                            />
                          )}
                          {showCartIcon && <ShoppingCartIcon />}
                          {showAnotherIcon && <ShoppingCartIcon />}

                          <span className="add__to--cart__text ml-2">
                            Add to cart
                          </span>
                        </button>
                      ) : (
                        <div class="quantity__box">
                          <button
                            style={{ borderRadius: "2px" }}
                            onClick={() => {
                              if (productItem.qty <= 1) {
                                handleDecrement1(productItem);
                              }

                              afterLoginDec(
                                productItem.variant_productid,
                                productItem.qty
                              );
                            }}
                            type="button"
                            className="quantity__value quickview__value--quantity decrease"
                            aria-label="quantity value"
                          >
                            -
                          </button>

                          <label
                            style={{ position: "relative", display: "block" }}
                          >
                            <input
                              type="number"
                              className="quantity__number quickview__value--number"
                              value={loading ? "" : productItem.qty}
                              disabled={loading}
                            />
                            {loading && (
                              <CgSpinner
                                style={{
                                  position: "absolute",
                                  top: "0%",
                                  left: "10%",
                                }}
                                size={30}
                                className="mt-1 items-center animate-spin justify-center text-center"
                              />
                            )}
                          </label>

                          <button
                            style={{ borderRadius: "2px" }}
                            onClick={() => {
                              AddtoCartlogin(productItem);
                              // incrementHandler1();
                            }}
                            type="button"
                            class="quantity__value quickview__value--quantity increase"
                            aria-label="quantity value"
                            value="Increase Value"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                // local handle code
                <div>
                  {productItem.stock === 0 ? (
                    <button
                      style={{ backgroundColor: "green", color: "white" }}
                      disabled={loading || productItem.stock === 0}
                      id="btnproducts"
                      className="product__items--action__cart--btn "
                    >
                      {showCartIcon && <RemoveShoppingCartIcon />}
                      {showAnotherIcon && <ShoppingCartIcon />}
                      <span className="add__to--cart__text ml-2">
                        Out of stock
                      </span>
                    </button>
                  ) : (
                    <>
                      {productItem.qty == 0 ? (
                        <button
                          onClick={() => handleAddToCart11(productItem)}
                          id="btnproducts"
                          className="product__items--action__cart--btn primary__btn"
                        >
                          {loading && (
                            <CgSpinner
                              style={{ marginLeft: "30px" }}
                              size={30}
                              className="mt-1 ml-5 items-center animate-spin justify-center text-center"
                            />
                          )}
                          {showCartIcon && <ShoppingCartIcon />}
                          {showAnotherIcon && <ShoppingCartIcon />}

                          <span className="add__to--cart__text ml-2">
                            Add to cart
                          </span>
                        </button>
                      ) : (
                        <div class="quantity__box">
                          <button
                            style={{ borderRadius: "2px" }}
                            onClick={() => {
                              handleDecreaseCart1(productItem);

                              if (productItem.qty <=1) {
                                handleRemoveFromCart1(
                                  productItem.variant_productid
                                );
                              }
                            }}
                            type="button"
                            class="quantity__value quickview__value--quantity decrease"
                            aria-label="quantity value"
                            value="Decrease Value"
                          >
                            -
                          </button>
                          <label
                            style={{ position: "relative", display: "block" }}
                          >
                            <input
                              type="number"
                              className="quantity__number quickview__value--number"
                              value={productItem.qty}
                              disabled={loading}
                            />
                            {loading && (
                              <CgSpinner
                                size={30}
                                className="mt-1 items-center animate-spin justify-center text-center"
                                style={{
                                  position: "absolute",
                                  top: "0%",
                                  left: "10%",
                                }}
                              />
                            )}
                          </label>

                          <button
                            style={{ borderRadius: "2px" }}
                            onClick={() => {
                              handleAddToCart11(productItem);
                              // incrementHandler1();
                            }}
                            type="button"
                            class="quantity__value quickview__value--quantity increase"
                            aria-label="quantity value"
                            value="Increase Value"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {/*  wishlist handle */}
              {logged ? (
                <div>
                  <button
                    key={productItem.id}
                    onClick={() => wishList(productItem)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor:
                        productItem.Wishlist == true ? "pink" : "red",
                    }}
                    className={"product__items--action__btn"}
                    id={`wishlistbtn${productItem.variant_productid}`}
                  >
                    <svg
                      style={{
                        paddingTop: "10px",
                        height: "40px",
                        paddingBottom: "10px",
                      }}
                      class={`product__items--action__btn--svg `}
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.51"
                      height="15.443"
                      viewBox="0 0 24.526 21.82"
                    >
                      <path
                        d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                        transform="translate(0 0)"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span class="visually-hidden">Wishlist</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    key={productItem.id}
                    onClick={() => addToWishLocal(productItem)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor:
                        productItem.Wishlist == true ? "pink" : "red",
                    }}
                    className="product__items--action__btn"
                  >
                    <svg
                      style={{
                        paddingTop: "10px",
                        height: "40px",
                        paddingBottom: "10px",
                      }}
                      class="product__items--action__btn--svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.51"
                      height="15.443"
                      viewBox="0 0 24.526 21.82"
                    >
                      <path
                        d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                        transform="translate(0 0)"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span class="visually-hidden">Wishlist</span>
                  </button>
                </>
              )}
            </div>

            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
