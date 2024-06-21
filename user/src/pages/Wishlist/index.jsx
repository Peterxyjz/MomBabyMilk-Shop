import React from 'react'
import Breadcrumbs from '../../components/elements/Breadcrumb'
import ShoppingWishlist from '../../components/wishlist/ShoppingWishlist'

const WishList = () => {
  return (
    <>
        <Breadcrumbs headline={"Danh Sách Yêu Thích"} />

        <ShoppingWishlist />
    </>
  )
}

export default WishList