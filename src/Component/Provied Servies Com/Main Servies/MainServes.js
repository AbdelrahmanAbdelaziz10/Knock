import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./MainServes.css";
import useFetch from "../../../hooks/useFetch";
import PaginationCom from "../../Common Component/Pagination/Pagination";
import ServesComponent from "../../Home Components/Serves/ServesComponent";
import { useTranslation } from "react-i18next";

const MainServes = ({ getPage }) => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch("/data.json");

  const allServes = data?.services || []; // Fallback to an empty array if services are undefined
  const [filteredServes, setFilteredServes] = useState(allServes);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter services based on the search query
    if (searchQuery.trim() !== "") {
      const results = allServes.filter(
        (service) =>
          service.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.name_ar.includes(searchQuery)
      );
      setFilteredServes(results);
    } else {
      setFilteredServes(allServes);
    }
  }, [searchQuery, allServes]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="main_serves py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} lg={11} md={10} sm={11}>
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
        <div className="row Servies allservice justify-content-center">
          {filteredServes.length > 0 ? (
            filteredServes.map((service) => (
              <ServesComponent
                image={`${service.image}`}
                key={service.id}
                link={`/serves/${service.id}`}
                name_ar={service.name_ar}
                name_en={service.name_en}
              />
            ))
          ) : searchQuery.trim() !== "" ? (
            <h2 className="text-center p-4">{t("no_result")}</h2>
          ) : (
            <h2 className="text-center p-4">{t("no_serves")}</h2>
          )}
          <Row>
            <Col>
              {/*             <PaginationCom
                total={allServes.length} // Total number of services
                getPage={getPage}
                url={"#"} // URL is optional since data is fetched locally
              /> */}
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MainServes;
