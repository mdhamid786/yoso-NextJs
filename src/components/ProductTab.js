"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { postApiData } from "@/Helper/common";

const ProductTab = () => {
  const params = useParams();
  const [ProductDetail, setProductDetail] = useState([]);
  const [ProductImage, setProductImage] = useState([]);
  const [loading, setLoading] = useState(true);

  // product details api calling ...
  const ProductsDetails = async () => {
    const product_id = params.productid;
    const apiData = JSON.stringify({ product_id });
    try {
      const data = await postApiData("product-detail", apiData);
      setProductDetail(data.result);
      setProductImage(data.result.image[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    ProductsDetails();
  }, []);

  return (
    <>
      <section className="product__details--tab__section section--padding">
        <div className="container">
          <div className="row row-cols-1">
            <div className="col">
              <Tabs>
                <TabList>
                  <Tab>
                    <Heading as="h4" size="lg">
                      Description
                    </Heading>
                  </Tab>
                  <Tab>
                    <Heading as="h4" size="lg">
                      Information
                    </Heading>
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <div id="description" className="tab_pane active show">
                      <div className="product__tab--content">
                        {/* Product Description */}
                        <div className="product__tab--content__items mb-40 d-flex align-items-center">
                          <div className="product__tab--content__right">
                            <div className="product__tab--content__step mb-20">
                              <h4 className="product__tab--content__title">
                                Description
                              </h4>
                              <p
                                className="product__tab--content__desc"
                                style={{ fontSize: "20px" }}
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: ProductDetail.description,
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Product Information */}
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div id="description" className="tab_pane active show">
                      <div className="product__tab--content">
                        {/* Product Information */}
                        <div className="product__tab--content__items d-flex align-items-center">
                          <div className="product__tab--content__right">
                            <div className="product__tab--content__step">
                              <h4 className="product__tab--content__title">
                                Information
                              </h4>
                              <p
                                className="product__tab--content__desc"
                                style={{ fontSize: "20px" }}
                              >
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: ProductDetail.information,
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductTab;
