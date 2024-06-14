import React from 'react'
import Breadcrumbs from '../../components/elements/Breadcrumb'
import ProductDetail from '../../components/product/ProductDetail'

const Product = () => {
  return (
    <>
        <Breadcrumbs headline="Thông Tin Chi Tiết" link="/product" />

        {/* product */}
        <ProductDetail/>
    </>
  )
}

export default Product