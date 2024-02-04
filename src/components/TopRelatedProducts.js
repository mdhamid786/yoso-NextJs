"use client"
import { getApiData } from '@/Helper/common';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const TopRelatedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products , setProducts] = useState([])

  
  const TopsellingProducts = async () =>{
    const data = await getApiData('new-product?pincode=444601&type=top_selling');
    setLoading(false)
    setProducts(data.result)

  }

  useEffect(()=>{
      TopsellingProducts();
  },[])


  return (
    <div>
        <div className="single__widget widget__bg">
              <h2 className="widget__title position__relative h3">
                Top Selling Product
              </h2>
              <div className="product__grid--inner">
               {/* {products && products.length>0?(
                products.map((item , index)=>(
                  <div className="product__items product__items--grid d-flex align-items-center">
                  <div className="product__items--grid__content">
                    <h3 className="product__items--content__title h4">
                      <Link href="product-details">{item.name}</Link>
                    </h3>
                    <div className="product__items--price">
                      <span className="current__price">{item.sale_price}</span>
                    </div>
                    <div className="product__items--color">
                     
                    </div>
                  </div>
                </div>
                ))
               ):(null)} */}
               

               <div>
               {products && products.length > 0 ? (
              products.map((item, index) => (
               <div key={index} className="product__items product__items--grid d-flex align-items-center">
                  <div className="product__items--grid__thumbnail position__relative">
                    <Link
                      className="product__items--link"
                      href="product-details"
                    >
                      <img
                        className="product__items--img product__primary--img"
                        src={item.first_image}
                        alt="product-img"
                      />
                      <img
                        className="product__items--img product__secondary--img"
                        src={item.first_image}
                        alt="product-img"
                      />
                    </Link>
                  </div>
                  <div className="product__items--grid__content">
                    <h3 className="product__items--content__title h4">
                      <Link href="product-details">{item.name}</Link>
                    </h3>
                    <div className="product__items--price">
                      <span className="current__price">₹{item.sale_price}</span>
                    </div>
                  </div>
                </div>
                 ))
                 ) : (
                   <p>No products available</p>
                 )}
               </div>
              </div>
            </div>
    </div>
  )
}

export default TopRelatedProducts
