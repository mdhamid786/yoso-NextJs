import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { getApiData } from "@/Helper/common";
import Link from "next/link";
import CategoriesSkeleton from "./CategoriesSkeleton";

const Acordition = () => {
      const [categories, setCategories] = useState("");
      const [subcategories, setSubCategories] = useState([]);
      const [loading, setLoading] = useState(true);

  // @ fetchCategories API
  const fetchCategories = async () => {
    try {
      const data = await getApiData("categorylist");
      setCategories(data.result);
      setLoading(false);
      setSubCategories(data.result.child)
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ paddingBottom: "30px", paddingTop: "10px" }}>
   {loading ? (
    // <CategoriesSkeleton/>
    <p>Not found</p>
   ):(
    <Accordion allowToggle>
    {categories && categories.length > 0 ? (
      categories.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
            
                <label className="widget__categories--menu__label d-flex align-items-center">
                <Link  href={`/shop/${item.slug}`}>
                  <img
                    className="widget__categories--menu__img"
                    src={item.image}
                    alt="categories-img"
                  />
                  </Link>
                  <Link  href={`/shop/${item.slug}`}>
                  <span style={{ fontSize: "15px" }} className="widget__categories--menu__text">
                    {item.name}
                  </span>
                  </Link>
                 
                  <svg
                    className="widget__categories--menu__arrowdown--icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.355"
                    height="8.394"
                  >
                    <path
                      d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                      transform="translate(-6 -8.59)"
                      fill="currentColor"
                    />
                  </svg>
                </label>
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {item.child && item.child.length>0 ? (
                item.child.map((item2, index)=>(
                    <li className="widget__categories--sub__menu--list">
                    <Link style={{paddingLeft:"20px"}}  href={`/shop/${item2.slug}`}
                      className="widget__categories--sub__menu--link d-flex align-items-center"
                    
                    >
                      <img
                        className="widget__categories--sub__menu--img"
                        src={item2.image}
                        alt="categories-img"
                      />
                      <span className="widget__categories--sub__menu--text">
                       {item2.name}
                      </span>
                    </Link>
                  </li>
                ))
            ):(
             null
            )}
           
          </AccordionPanel>
        </AccordionItem>
      ))
    ) : null}
  </Accordion>
   )}
    </div>
  );
}

export default Acordition;
