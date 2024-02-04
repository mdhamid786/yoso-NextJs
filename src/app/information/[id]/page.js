"use client";
import { getApiData } from "@/Helper/common";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [term, setTerm] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  var infoId = 0;
  const information = params.id;
  if (information == "term-condition") {
    infoId = 1;
  } else if (information == "about") {
    infoId = 3;
  } else {
    infoId = 2;
  }

  //@ term & condition api calling ...
  const termCondition = async () => {
    try {
      const data = await getApiData(`get-information-pages-data/${infoId}`);
      setTerm(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching term condition:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    termCondition();
  }, [infoId]);
  return (
    // information-term & condition
    <div>
      <main className="main__content_wrapper">
        <div>
          <section className="breadcrumb__section breadcrumb__bg">
            <div className="container">
              <div className="row row-cols-1">
                <div className="col">
                  <div className="breadcrumb__content">
                    <h1 className="breadcrumb__content--title text-white mb-10">
                      {term.title}
                    </h1>
                    <ul className="breadcrumb__content--menu d-flex">
                      <li className="breadcrumb__content--menu__items">
                        <Link className="text-white" href="index.html">
                          Home
                        </Link>
                      </li>
                      <li className="breadcrumb__content--menu__items">
                        <span className="text-white">term.title</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="faq__section section--padding">
            <div className="container">
              <div className="faq__section--inner">
                <div
                  className="face__step one border-bottom"
                  id="accordionExample"
                >
                  <h3 className="face__step--title mb-30">{term.title}</h3>
                </div>
                <h3 className="face__step--title mb-30">Description</h3>
                <p style={{ textAlign: "justify" }}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: term.description,
                    }}
                  />
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Page;
