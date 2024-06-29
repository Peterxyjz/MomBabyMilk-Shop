import { useLocation } from "react-router-dom"
import Breadcrumbs from "../elements/Breadcrumb";

const OrderDetail = () => {
    const location = useLocation();
    const order = location.state?.order;

  return (
    <>
        <div className="container mx-auto min-h-screen">
            <Breadcrumbs headline={"Chi tiết đơn hàng"} />
        </div>
    </>
  )
}

export default OrderDetail