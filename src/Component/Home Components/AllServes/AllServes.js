import React from 'react'
import './AllServes.css'
import { Link } from 'react-router-dom'
import { ServesRow } from './ServesRow'
import { useTranslation } from 'react-i18next'
const AllServes = () => {
    const {t,i18n}=useTranslation()

  return (
    <section className="allservice">
        <div className="container">
        <ServesRow title={t("home_category1")} link={"/serves"}  />
        <ServesRow title={t("home_category3")} link={"/product"}  />

        </div>
    </section>  )
}

export default AllServes