import React from 'react'
import Breadcrumbs from '../../components/elements/Breadcrumb'
import ShoppingCart from '../../components/cart/ShoppingCart'

const Cart = () => {
  return (
    <>
        <Breadcrumbs headline="Giỏ hàng" link="/cart" />

        <ShoppingCart />
    </>
  )
}

export default Cart