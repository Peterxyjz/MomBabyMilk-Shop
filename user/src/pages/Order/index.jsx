import React from 'react'
import Breadcrumbs from '../../components/elements/Breadcrumb'
import OrderInfor from '../../components/order/OrderInfor'

const Order = () => {
  return (
    <>
    <Breadcrumbs headline="Thông tin đơn hàng" />

    <OrderInfor/>
</>
  )
}

export default Order