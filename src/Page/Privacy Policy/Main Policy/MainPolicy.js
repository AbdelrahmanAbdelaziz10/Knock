import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ContextLang } from "../../../App";
import { Col, Container, Row } from "react-bootstrap";

const MainPolicy = () => {
  const { t, i18n } = useTranslation();
  const { selectedLanguage, setSelectedLanguage } = useContext(ContextLang);
  return (
    <div className="main_terms">
      <Container>
        <Row className="policy_row ">
          <Col xs={12} lg={12} md={12} sm={12}>
            <h2 className="text-center">{t("Policy_title")}</h2>
            <p className="">
              {t("Terms_p1")}
              <br />
              {t("Policy_p2")}

              <br />
              {t("Policy_p3")}
              <br />
              {t("Policy_p4")}
            </p>
            <p>{t("Policy_p5")}</p>
            <ul>
              <li>{t("Policy_p6")}</li>
              <li>{t("Policy_p7")}</li>
              <li>{t("Policy_p8")}</li>
              <li>{t("Policy_p9")}</li>
              <li>{t("Policy_p10")}</li>
              <li>{t("Policy_p11")}</li>
              <li>{t("Policy_p12")}</li>
              <li>{t("Policy_p13")}</li>
              <li>{t("Policy_p14")}</li>
              <li>{t("Policy_p15")}</li>
              <li>{t("Policy_p16")}</li>
            </ul>
            <p className="">
              {t("Policy_p17")}
              <br />
              {t("Policy_p18")}
            </p>
            <ul>
              <li>{t("Policy_p19")}</li>
              <li>{t("Policy_p20")}</li>
              <li>{t("Policy_p21")}</li>
              <li>{t("Policy_p22")}</li>
              <li>{t("Policy_p23")}</li>
            </ul>
            <p className="">
              {t("Policy_p24")}
              <br />
              {t("Policy_p25")}
              <br />
              {t("Policy_p26")}
              <br />
              {t("Policy_p27")}
              <br />
              {t("Policy_p28")}
              <br />
              {t("Policy_p29")}
            </p>
            <ul>
              <li>{t("Policy_p30")}</li>
            </ul>
            <p>
              {t("Policy_p31")}
              <br />
              {t("Policy_p32")}
              <br />
              {t("Policy_p33")}
              <br />
              {t("Policy_p34")}
            </p>
            <ul>
              <li>{t("Policy_p35")}</li>
              <li>{t("Policy_p36")}</li>
              <li>{t("Policy_p37")}</li>
              <li>{t("Policy_p38")}</li>
              <li>{t("Policy_p39")}</li>
              <li>{t("Policy_p40")}</li>
              <li>{t("Policy_p41")}</li>
              <li>{t("Policy_p42")}</li>
            </ul>
            <p>{t("Policy_p43")}</p>
            <ul>
              <li>{t("Policy_p44")}</li>
              <li>{t("Policy_p45")}</li>
              <li>{t("Policy_p46")}</li>
              <li>{t("Policy_p47")}</li>
              <li>{t("Policy_p48")}</li>
              <li>{t("Policy_p49")}</li>
            </ul>
            <p>
              {t("Policy_p50")}
              <br />
              {t("Policy_p51")}
              <br />
              {t("Policy_p52")}
              <br />
              {t("Policy_p53")}
              <br />
              {t("Policy_p54")}
              <br />
              {t("Policy_p55")}
              <br />
              {t("Policy_p56")}
              <br />
              {t("Policy_p57")}
              <br />
              {t("Policy_p58")}
              <br />
              {t("Policy_p59")}
              <br />
              {t("Policy_p60")}
              <br />
              {t("Policy_p61")}
              <br />
              {t("Policy_p62")}
              <br />
              {t("Policy_p63")}
              <br />
              {t("Policy_p64")}
              <br />
              {t("Policy_p65")}
              <br />
            </p>
            <ul>
              <li>{t("Policy_p66")}</li>
              <li>{t("Policy_p67")}</li>
              <li>{t("Policy_p68")}</li>
              <li>{t("Policy_p69")}</li>
              <li>{t("Policy_p70")}</li>
            </ul>
            <p>
              {t("Policy_p71")}
              <br />
              {t("Policy_p72")}
              <br />
              {t("Policy_p73")}
              <br />
              {t("Policy_p74")}
              <br />
              {t("Policy_p77")}
              <br />
              {t("Policy_p76")}
              <br />
              {t("Policy_p77")}
              <br />
              {t("Policy_p78")}
              <br />
              {t("Policy_p79")}
              <br />
              {t("Policy_p80")}
              <br />
              {t("Policy_p81")}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainPolicy;
