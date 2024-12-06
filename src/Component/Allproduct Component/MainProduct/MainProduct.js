import React, { useState, useEffect } from "react";
import OneProduct from "../../Home Components/AllServes/OneProduct";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PaginationCom from "../../Common Component/Pagination/Pagination";
import useFetch from "../../../hooks/useFetch";

const MainProduct = ({ getPage }) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch("/data.json");

  const allProduct = data?.products || []; // Default to an empty array if products are undefined
  const [filteredProducts, setFilteredProducts] = useState(allProduct);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter products based on the search query
    if (searchQuery.trim() !== "") {
      const results = allProduct.filter(
        (product) =>
          product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name_ar.includes(searchQuery)
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(allProduct);
    }
  }, [searchQuery, allProduct]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="main_product py-4">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} lg={11} md={9} sm={11}>
            <input
              className="search_input"
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t("search")}
            />
          </Col>
        </Row>
        <div className="row servies mt-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col
                key={product.id}
                xs={9}
                lg={3}
                md={4}
                sm={9}
                className="col-lg-3 col-md-4 mb-4"
              >
                <OneProduct
                  productObj={product}
                  image={`${product.image}`}
                  name_ar={product.name_ar}
                  name_en={product.name_en}
                  price={product.price}
                  discount={product.discount}
                  link={`/product/${product.id}`}
                  id={product.id}
                />
              </Col>
            ))
          ) : (
            <h1 className="text-center">{t("no_products")}</h1>
          )}
        </div>
        {/* <PaginationCom total={allProduct.length} getPage={getPage} /> */}
      </Container>
    </div>
  );
};

export default MainProduct;
//
