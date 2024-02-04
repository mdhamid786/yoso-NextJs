"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FilterByPrice from "@/components/FilterByPrice";
import TopRelatedProducts from "@/components/TopRelatedProducts";
import Brand from "@/components/Brand";
import { getApiData, getProducts } from "@/Helper/common";
import ProductItems from "@/components/ProductItems";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonProduct from "@/components/SkeletonProduct";
import DietaryNeeds from "@/components/DietaryNeeds";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import Acordition from "@/components/Acordition";


const Page = () => {
  const [products, setProducts] = useState([]);
  const [verient, setVarient] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState(0);
  const [filterByOrder, setfilterByOrder] = useState([]);
  const [category, setCategory] = useState([]);
  const [sidebarActive, setSidebarActive] = useState("close");
  const params = useParams();
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [isNext, isNextFunc] = useState(false);
  const [offset, setPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelection = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  var myattribute = selectedAttributes;
  const allAttributes = myattribute.join(", ");

  const getAllProducts = async () => {
    try {
      const data = await getApiData(
        `new-product?category=${params.slug}&pincode=444601&sort_order=${filterByOrder}&page=${offset}&limit=12&price_id=${priceFilter}&attributeId=${myattribute.join(",")}`
      );
      console.log(responseData);
      if (data.error === false) {
        setResponseData([...responseData, ...data.result]);
        isNextFunc(true);
        setProducts(data.result);
        setTotalProducts(data.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (errorData) {
      setLoading(false);
    }
  };

  const getProductVarient = async () => {
    try {
      const data = await getApiData(`variant-attribute-list`);
      if (data.error === false) {
        setVarient(data.result);
      } else {
        setLoading(false);
      }
    } catch (errorData) {
      setLoading(false);
    }
  };

  function fetchMoreData() {
    if (totalProducts > responseData.length || totalProducts === 0) {
      setPage((prevOffset) => prevOffset + 12);
      getAllProducts();
    }
  }

  useEffect(() => {
    fetchMoreData();
  }, []);

  const sortBy = (value) => {
    setfilterByOrder(value);
    setResponseData([]);
  };

  useEffect(() => {
    getAllProducts();
    getProductVarient();
    setTotalProducts(0);
    setPage(0);
  }, [category, filterByOrder, priceFilter, allAttributes]); // page



  const OrderByPrice = (e) => {
    setPriceFilter(e);
    setResponseData([]);
    // getAllProducts([])
  };

 const handleCheckboxChange = (attributeId) => {
    const updatedAttributes = selectedAttributes.includes(attributeId)
      ? selectedAttributes.filter((id) => id !== attributeId)
      : [...selectedAttributes, attributeId];

    setSelectedAttributes(updatedAttributes);
  };

  const verientAttributeIdFilter = (attributeId) => {
    setResponseData([]);
  };


  


  return (
    <>
      <div
        className={`offcanvas__filter--sidebar widget__area ${sidebarActive}`}
      >
        <button type="button" className="offcanvas__filter--close">
          <svg
            className="minicart__close--icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={32}
              d="M368 368L144 144M368 144L144 368"
            />
          </svg>{" "}
          <span
            onClick={() => setSidebarActive("close")}
            className="offcanvas__filter--close__text"
          >
            Close
          </span>
        </button>
        <Acordition/>
          {/* varient of product */}
          {verient && verient.length > 0
                    ? verient.map((item, index) => (
                      <div className="single__widget widget__bg">
                      <h2 className="widget__title position__relative h3">
                        {item.name}
                      </h2>
                      <ul className="widget__form--check">
                        {item.attributes && item.attributes.length > 0
                          ? item.attributes.map((iteam, subIndex) => (
                              <li
                              onClick={() => setSidebarActive("close")}
                                className="widget__form--check__list"
                                key={subIndex}
                              >
                                <label
                                  className="widget__form--check__label"
                                  htmlFor={`check${subIndex}`}
                                >
                                  {iteam.title}
                                </label>
                                <input
                                  value={iteam.id}
                                  onChange={() => {
                                    handleCheckboxChange(iteam.id);
                                    verientAttributeIdFilter(iteam.id);
                                  }}
                                  checked={selectedAttributes.includes(
                                    iteam.id
                                  )}
                                  className="widget__form--check__input"
                                  id={`check${subIndex}`}
                                  type="checkbox"
                                />
                                <span className="widget__form--checkmark" />
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                      ))
                    : null}

                    {/* price */}

                    <div
                    onChange={(e) => OrderByPrice(e.target.value)}
                    className="single__widget widget__bg"
                  >
                    <h2 className="widget__title position__relative h3">
                      PRICE
                    </h2>
                    <ul onClick={() => setSidebarActive("close")} className="widget__form--check">
                      <li  className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio1"
                        >
                          ₹0 - ₹200
                        </label>
                        <input
                          name="price"
                          value="1"
                          id="priceOne"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>
                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio2"
                        >
                          ₹201 - ₹500
                        </label>
                        <input
                          name="price"
                          value="2"
                          id="priceTwo"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>
                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio3"
                        >
                          ₹501 - ₹1000
                        </label>
                        <input
                          name="price"
                          value="3"
                          id="priceThree"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>

                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio3"
                        >
                          ₹1001 Above
                        </label>
                        <input
                          name="price"
                          value="4"
                          id="priceThree"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>
                    </ul>
                  </div>
      </div>

      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}

        <Breadcrumb />
        {/* End breadcrumb section */}
        {/* Start shop section */}
        <section className="shop__section section--padding">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <div className="shop__sidebar--widget widget__area d-md-none">
                  {/* <Category /> */}
                  <Acordition/>
                {/* varient of product */}
                  {verient && verient.length > 0
                    ? verient.map((item, index) => (
                      <div className="single__widget widget__bg">
                      <h2 className="widget__title position__relative h3">
                        {item.name}
                      </h2>
                      <ul className="widget__form--check">
                        {item.attributes && item.attributes.length > 0
                          ? item.attributes.map((iteam, subIndex) => (
                              <li
                                className="widget__form--check__list"
                                key={subIndex}
                              >
                                <label
                                  className="widget__form--check__label"
                                  htmlFor={`check${subIndex}`}
                                >
                                  {iteam.title}
                                </label>
                                <input
                                  value={iteam.id}
                                  onChange={() => {
                                    handleCheckboxChange(iteam.id);
                                    verientAttributeIdFilter(iteam.id);
                                  }}
                                  checked={selectedAttributes.includes(
                                    iteam.id
                                  )}
                                  className="widget__form--check__input"
                                  id={`check${subIndex}`}
                                  type="checkbox"
                                />
                                <span className="widget__form--checkmark" />
                              </li>
                            ))
                          : null}
                      </ul>
                    </div>
                      ))
                    : null}

                  {/* OrderByPrice */}
                  <div
                    onChange={(e) => OrderByPrice(e.target.value)}
                    className="single__widget widget__bg"
                  >
                    <h2 className="widget__title position__relative h3">
                      PRICE
                    </h2>
                    <ul className="widget__form--check">
                      <li  className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio1"
                        >
                          ₹0 - ₹200
                        </label>
                        <input
                          name="price"
                          value="1"
                          id="priceOne"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>
                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio2"
                        >
                          ₹201 - ₹500
                        </label>
                        <input
                          name="price"
                          value="2"
                          id="priceTwo"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>
                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio3"
                        >
                          ₹501 - ₹1000
                        </label>
                        <input
                          name="price"
                          value="3"
                          id="priceThree"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>

                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio3"
                        >
                          ₹1001 Above
                        </label>
                        <input
                          name="price"
                          value="4"
                          id="priceThree"
                          className="widget__form--check__input"
                          type="radio"
                        />
                        <span className="widget__form--checkmark" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* main page */}
              <div className="col-xl-9 col-lg-8">
                {/* <ShopHeader /> */}
                <div>
                  <div className="shop__header bg__gray--color d-flex align-items-center justify-content-between mb-30">
                    <button className="widget__filter--btn d-none d-md-flex align-items-center">
                      <svg
                        className="widget__filter--btn__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={28}
                          d="M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80"
                        />
                        <circle
                          cx={336}
                          cy={128}
                          r={28}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={28}
                        />
                        <circle
                          cx={176}
                          cy={256}
                          r={28}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={28}
                        />
                        <circle
                          cx={336}
                          cy={384}
                          r={28}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={28}
                        />
                      </svg>
                      <span
                        onClick={(e) => setSidebarActive("active")}
                        className="widget__filter--btn__text"
                      >
                        Filter
                      </span>
                    </button>

                    <p className="product__showing--count">
                      Showing {products.length} results
                    </p>

                    <div className="product__view--mode d-flex align-items-center">
                      <div className="product__view--mode__list product__short--by align-items-center d-none d-lg-flex">
                        <label className="product__view--label">Sort By</label>
                        <div className="select shop__header--select">
                          <select
                            value={filterByOrder}
                            onChange={(e) => sortBy(e.target.value)}
                            className="product__view--select"
                          >
                            <option selected="0">Sort By</option>
                            <option value="1">Price: Low to High</option>
                            <option value="2">Price: High to Low</option>
                            <option value="3">Order: ASC By Name</option>
                            <option value="4">Order: DESC By Name</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {responseData && responseData.length > 0 ? (
                  <div className="shop__product--wrapper">
                    <div className="tab_content">
                      {/* prpduct */}
                      <div id="product_grid" className="tab_pane active show">
                        <div className="product__section--inner product__grid--inner">
                          <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">
                            {loading
                              ? Array.from({ length: 10 }).map((_, index) => (
                                  <div>
                                    <SkeletonProduct />
                                  </div>
                                ))
                              : responseData && responseData.length > 0
                              ? responseData.map((item, index) => (
                                  <ProductItems key={index} item={item} />
                                ))
                              : null}
                            <InfiniteScroll
                              dataLength={responseData.length} //sets the length of data
                              next={fetchMoreData} //fetching next set of data
                              hasMore={isNext} //determine is more data is there to load
                              loader={
                                !loading ? (
                                  <></>
                                ) : (
                                  <div>
                                    <SkeletonProduct />
                                  </div>
                                )
                              }
                              //is displayed when more data is loaded
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end */}
                    {/* <Pagination /> */}
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        className="empty-cart1"
                        style={{ height: "500px", width: "auto" }}
                        src="https://res.cloudinary.com/dfpanyr0i/image/upload/v1702374505/undraw_Empty_re_opql_dogjq8.png"
                        alt="Empty Cart Image"
                      />
                    </div>
                    <h4
                      style={{
                        textAlign: "center",
                        color: "grey",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      No products Found!
                    </h4>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        {/* End shop section */}
      </main>
    </>
  );
};

export default Page;
