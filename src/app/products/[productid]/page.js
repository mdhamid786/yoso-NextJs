"use client";
import { getApiData, postApiData, postWithToken } from "@/Helper/common";
import ProductTab from "@/components/ProductTab";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import BottomSlider from "../../../components/BottomSlider";
import toast, { Toaster } from "react-hot-toast";

import { addToCart, productsDetailsToCart, removeFromProductIncDec, removeToCart } from "@/Redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToWish, addToWishProductsDetails } from "@/Redux/WishSlice";
import {
  addToCart1,
  addToCartFromProductDetails,
  decreaseCart1,
} from "@/Redux/Reduxslice";
import { addToWish1 } from "@/Redux/ReduxWishSlice";
import ProductSlider from "@/components/ProductSlider";

const Page = () => {
  // State variables using React hooks
  const params = useParams();
  const [ProductDetail, setProductDetail] = useState([]);
  const [productItem, setProductItem] = useState([]); //useState({});
  const [varientDetail, setVarientProductDetail] = useState([]);
  const [product_id, setProduct_id] = useState();
  const [ProductImage, setProductImage] = useState([]);
  const hasClicked = useRef(false);
  const [loading, setLoading] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const logged =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const carts = useSelector((state) => state.allCart1.cartItems);




  useEffect(() => {
    if (!logged) {
      const item = carts.find(
        (cartItem) =>
          cartItem.variant_productid === productItem.variant_productid
      );
  
      if (item) {
      
        const updatedProductItem = { ...productItem, qty: item.qty };
        if (updatedProductItem.qty !== productItem.qty) {
          setProductItem(updatedProductItem);
        }
      }
    }
  }, [productItem]);
  
  

  // Function to handle checkout
  const checkout = (e) => {
    const newKey = {
      qty: qty,
    };
    const mergedObject = Object.assign({}, e, newKey);
    dispatch(productsDetailsToCart(mergedObject));
    toast.success("Product added to cart", {
      position: "top-left",
    });
    router.push("/cart");
  };

  // Function to fetch product details from the API
  const userData =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userObject = JSON.parse(userData);
  const userId = userObject?.id;
  const ProductsDetails = async () => {
    const product_id = params.productid;
    const apiData = JSON.stringify({ product_id, userId });
    try {
      const data = await postApiData(`product-detail`, apiData);
      if (data.error == false) {
        setProductDetail(data.result);
        setProduct_id(data.result.product_id);
        setProductImage(data.result.image);
        setProductItem(data.result);
        setLoading(false);
        setQty(data.result.qty);
      } else {
        setProductDetail([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Function to get variant details

  const ProductVarient = async (value) => {
    try {
      const data = await getApiData(
        `getVariantSlug?value=${value}&product_id=${product_id}&userId=${userId}`
      );
      if (data.error == false) {
        setVarientProductDetail(data.result);
        setProductDetail(data.result);
        setProductItem(data.result);
        setProduct_id(data.result.product_id);
        setProductImage(data.result.image);
        setLoading(false);
      } else {
        setVarientProductDetail([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

 

  // login add to cart
  const AddCart = (e) => {
    try {
      setLoading(true);
      dispatch(addToCart(e));
      const product = productItem;
      const item = product.variant_productid === e.variant_productid;
      if (item) {
        productItem.qty++;
      } else {
        productItem.qty = 1;
      }
      setProductItem(productItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        // setShowCartIcon(false);
      }, 1);
    }
  };

  //  login qty decrement
  const afterLoginDec = async (product_id, qty) => {
    if (token) {
      qty = qty - 1;
      const apiData = JSON.stringify({
        product_id: product_id,
        qty: qty,
      });

      const product = productItem;
      const item = product.variant_productid === product_id;
      if (productItem.qty > 0) {
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

  // add to wishlist
  const wishList = (e) => {
    dispatch(addToWish(e));
    setTimeout(() => {
      toast.success("Product added to WishList", {
        position: "top-left",
      });
    }, 2000);
  };

  // local storage
  const addToWishLocal = (e) => {
    // dispatch(addToWish1(product));
    try {
      setLoading(true);

      dispatch(addToWish1(e));
      const product = productItem;

      const item = product.variant_productid === e.variant_productid;
      console.log(item);
      if (item) {
        if (productItem.Wishlist === false) {
          productItem.Wishlist = true;
        } else if (productItem.Wishlist === true) {
          productItem.Wishlist = false;
        }
      }
      setProductItem(product);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1);
    }
  };

  // local storage
  const handlewish = (product) => {
    dispatch(addToWish1(product));
    router.push("/cart");
  };

  const addToCartLocal = (e) => {
    try {
      setLoading(true);
      dispatch(addToCart1(e));
      const product = productItem;
      const item = product.variant_productid === e.variant_productid;
      if (item) {
        productItem.qty++;
      } else {
        productItem.qty = 1;
      }
      setProductItem(productItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        // setShowCartIcon(false);
      }, 1);
    }
  };



  const decAddToCartLocal = (product) => {
    dispatch(decreaseCart1(product));
    setProductItem(prevProductItem => {
      const updatedProductItem = { ...prevProductItem };
      const item = updatedProductItem.variant_productid === product.variant_productid;
      if (item && updatedProductItem.qty > 0) {
        updatedProductItem.qty--;
      }
  
      return updatedProductItem; 
    });
  };
  

  const handleAddToCart1 = (product) => {
    const newKey = {
      qty: qty,
    };
    const mergedObject = Object.assign({}, product, newKey);
    dispatch(addToCartFromProductDetails(mergedObject));
    router.push("/cart");
  };

  const handleDecrement1 = (e) => {
    dispatch(removeFromProductIncDec(e));
  };


  useEffect(() => {
    ProductsDetails();
    ProductVarient();
  }, []);

  var attributeIds = [];

  if (ProductDetail && ProductDetail.variant_attributes) {
    attributeIds = ProductDetail.variant_attributes.split(",").map(Number);
  }

  return (
    <>
      {ProductDetail ? (
        <main className="main__content_wrapper">
          {/* Start breadcrumb section */}
          <section className="breadcrumb__section breadcrumb__bg">
            <div className="container">
              <div className="row row-cols-1">
                <div className="col">
                  <div className="breadcrumb__content">
                    <h1 className="breadcrumb__content--title text-white mb-10">
                      Product Details
                    </h1>
                    <ul className="breadcrumb__content--menu d-flex">
                      <li className="breadcrumb__content--menu__items">
                        <Link className="text-white" href="/">
                          Home
                        </Link>
                      </li>
                      <li className="breadcrumb__content--menu__items">
                        <span className="text-white">Product Details</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* End breadcrumb section */}
          {/* Start product details section */}
          <section className="product__details--section section--padding">
            <div className="container">
              <div className="row row-cols-lg-2 row-cols-md-2">
                <div className="col">
                  <div className="product__details--media">
                    <BottomSlider item={productItem.image} />
                    {/* nav swiper */}
                  </div>
                </div>
                <div className="col">
                  <div className="product__details--info">
                    <form action="#">
                      <h2 className="product__details--info__title mb-15">
                        {productItem.name}
                      </h2>
                      <div className="product__details--info__price mb-10">
                        <span className="current__price">
                          ₹{productItem.offer_price?.toFixed(2)}
                        </span>
                        <span className="old__price">
                          {productItem.discount_amount > 0
                            ? `₹${productItem.sale_price}`
                            : null}
                        </span>
                        <br />

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
                      {/* rating */}
                      {/* <Rating /> */}
                      <p className="product__details--info__desc mb-20">
                        {productItem.short_description}
                      </p>

                      <div className="product__variant">
                        <div className="product__variant--list mb-20"></div>
                        <div className="product__variant--list mb-20">
                          {productItem.variants &&
                          productItem.variants.length > 0
                            ? productItem.variants.map((item, index) => {
                                return (
                                  <fieldset
                                    key={index}
                                    className="variant__input--fieldset"
                                  >
                                    <legend className="product__variant--title mb-8">
                                      {item.name}
                                    </legend>
                                    <ul
                                      style={{ marginBottom: "20px" }}
                                      className="variant__size d-flex"
                                    >
                                      {item.attribute?.map(
                                        (attributeItem, attributeIndex) => {
                                          return (
                                            <li
                                              key={attributeIndex}
                                              className="variant__size--list"
                                            >
                                              <input
                                                id={`weight${attributeIndex}`}
                                                name="weight"
                                                type="radio"
                                                defaultChecked={attributeIds.includes(
                                                  attributeItem.id
                                                )}
                                              />
                                              <label
                                                style={{
                                                  width: "80px",
                                                  border: `1px solid  ${
                                                    attributeIds.includes(
                                                      attributeItem.id
                                                    )
                                                      ? "red"
                                                      : ""
                                                  }`,
                                                }}
                                                onClick={(e) =>
                                                  ProductVarient(
                                                    attributeItem.id
                                                  )
                                                }
                                                className={`variant__size--value`}
                                                htmlFor={`weight${attributeIndex}`}
                                              >
                                                {attributeItem.title}
                                              </label>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  </fieldset>
                                );
                              })
                            : null}
                        </div>

                        {logged ? (
                          <>
                            <div className="product__variant--list quantity d-flex align-items-center mb-20">
                              {productItem.stock === 0 ? null : (
                                <div class="quantity__box">
                                  <button
                                    style={{ borderRadius: "2px" }}
                                    // onClick={() => {
                                    //   afterLoginDec(
                                    //     productItem.variant_productid,
                                    //     productItem.qty
                                    //   );
                                      
                                    // }}
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
                                    style={{
                                      position: "relative",
                                      display: "block",
                                    }}
                                  >
                                    <input
                                      type="number"
                                      className="quantity__number quickview__value--number"
                                      value={productItem.qty}
                                    />
                                  </label>

                                  <button
                                    style={{ borderRadius: "2px" }}
                                    onClick={() => {
                                      AddCart(productItem);
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

                              {productItem.stock === 0 ? (
                                <button
                                  disabled={loading || productItem.stock === 0}
                                  className="primary__btn mx-5"
                                >
                                  Product out of stock
                                </button>
                              ) : (
                                <>
                                  {productItem.qty <= 0 ? (
                                    <button
                                      onClick={() => AddCart(productItem)}
                                      className="primary__btn mx-5"
                                      type="button"
                                      disabled={loading}
                                    >
                                      Add To Cart
                                    </button>
                                  ) : null}
                                </>
                              )}
                            </div>

                            <div className="product__variant--list mb-15">
                              <button
                                onClick={() => wishList(productItem)}
                                type="button"
                                className="variant__wishlist--icon mb-15"
                                title="Add to wishlist"
                              >
                                <svg
                                  className="quickview__variant--wishlist__svg"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                  />
                                </svg>
                                Add to Wishlist
                              </button>
                              {productItem.stock ===
                              0 ? //   className="variant__buy--now__btn primary__btn" //   type="button" //   <button
                              // >
                              //   Out of stock
                              // </button>
                              null : (
                                <button
                                  onClick={() => checkout(productItem)}
                                  type="button"
                                  className="variant__buy--now__btn primary__btn"
                                >
                                  Buy it now
                                </button>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="product__variant--list quantity d-flex align-items-center mb-20">
                              {productItem.stock === 0 ? null : (
                                <div className="quantity__box">
                                  <button
                                    onClick={() =>
                                      decAddToCartLocal(productItem)
                                    }
                                    type="button"
                                    className="quantity__value quickview__value--quantity decrease"
                                    aria-label="quantity value"
                                    value="Decrease Value"
                                  >
                                    -
                                  </button>
                                  <label>
                                    <input
                                      type="number"
                                      className="quantity__number quickview__value--number"
                                      value={productItem.qty}
                                    />
                                  </label>
                                  <button
                                    onClick={() => addToCartLocal(productItem)}
                                    type="button"
                                    className="quantity__value quickview__value--quantity increase"
                                    aria-label="quantity value"
                                    value="Increase Value"
                                  >
                                    +
                                  </button>
                                </div>
                              )}

                              {productItem.stock === 0 ? (
                                <button
                                  style={{ backgroundColor: "green" }}
                                  className="primary__btn"
                                  type="button"
                                  disabled={true}
                                >
                                  Out of stock
                                </button>
                              ) : (
                                <>
                                {productItem.qty <= 0 ? (
                                 <button
                                  onClick={() => addToCartLocal(productItem)}
                                  className="primary__btn"
                                  type="button"
                                  disabled={loading}
                                >
                                  Add To Cart
                                </button>
                                 ) : null}
                                </>
                               
                              )}
                            </div>

                            <div className="product__variant--list mb-15">
                              <button
                                onClick={() => addToWishLocal(productItem)}
                                type="button"
                                className="variant__wishlist--icon mb-15"
                                title="Add to wishlist"
                              >
                                <svg
                                  className="quickview__variant--wishlist__svg"
                                  // style={{
                                  //   marginLeft: "10px",
                                  //   backgroundColor:
                                  //     productItem.Wishlist == true ? "pink" : "red",
                                  // }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={32}
                                  />
                                </svg>
                                Add to Wishlist
                              </button>
                              {productItem.stock ===
                              0 ? //   className="variant__buy--now__btn primary__btn" //   type="button" //   <button
                              // >
                              //   Out of stock
                              // </button>
                              null : (
                                <button
                                  onClick={() => handleAddToCart1(productItem)}
                                  type="button"
                                  className="variant__buy--now__btn primary__btn"
                                >
                                  Buy it now
                                </button>
                              )}
                            </div>
                          </>
                        )}

                        <div className="product__variant--list mb-15">
                          <div className="product__details--info__meta">
                            <p className="product__details--info__meta--list">
                              <strong>Refundable:</strong>{" "}
                              <span>{productItem.refundable}</span>{" "}
                            </p>
                            <p className="product__details--info__meta--list">
                              <strong>Category:</strong>{" "}
                              <span>{productItem.category}</span>{" "}
                            </p>
                            <p className="product__details--info__meta--list">
                              <strong>Products unit:</strong>{" "}
                              <span>{productItem.products_unit}</span>{" "}
                            </p>
                            <p className="product__details--info__meta--list">
                              <strong>Brand:</strong>{" "}
                              <span>{productItem.brand}</span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* End product details section */}
          {/* Start product details tab section */}
          <ProductTab item={productItem} />
          {/* <CardSlider/> */}
          {/* <TopSellingProduct /> */}
          <ProductSlider />
        </main>
      ) : null}
    </>
  );
};

export default Page;
