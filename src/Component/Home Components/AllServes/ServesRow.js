import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import useFetch from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import OneServe from "./OneServe";
import OneProduct from "./OneProduct";

export const ServesRow = ({ title, link }) => {
  const { t } = useTranslation();
  const { data, error, loading } = useFetch("/data.json");
  const allProduct = data?.products;
  const allServes = data?.services;
  if (loading) return <h3 className="text-center m-3">Loading...</h3>;
  if (error) return <h3 className="text-center m-3">Error loading data.</h3>;

  return (
    <div className="privete_servies mb-3">
      <div className="row my-3 head">
        <Col xs={8} lg={9} md={8} sm={8} className="">
          <h4>{title}</h4>
        </Col>
        <Col xs={4} lg={3} md={4} sm={4} className="">
          <Link to={link} className="link see_more">
            <span>{t("home_see_more")}</span>
          </Link>
        </Col>
      </div>
      {title === t("home_category3") ? (
        <div className="row servies">
          {allProduct &&
            allProduct.slice(0, 4).map((product) => (
              <Col
                xs={9}
                lg={3}
                md={6}
                sm={9}
                className=" mb-1 product_div"
                key={product?.id}
              >
                <OneProduct
                  productObj={product}
                  link={`/product/${product?.id}`}
                />
              </Col>
            ))}
        </div>
      ) : (
        <div className="row servies">
          {allServes &&
            allServes.map((serve, index) => (
              <OneServe
                key={serve?.id}
                image={serve?.image}
                link={`/serves/${serve?.id}`}
                name_ar={serve?.name_ar}
                name_en={serve?.name_en}
              />
            ))}
        </div>
      )}
    </div>
  );
};
