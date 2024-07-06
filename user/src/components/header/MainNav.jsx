import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <Navbar fluid rounded>
      <div className="mr-3 h-6 sm:h-9"></div>
      <div className="flex md:order-2"></div>
      <Navbar.Collapse>
        <Navbar.Link active className="text-lg">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>Trang chủ</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/filter" onClick={() => window.scrollTo(0, 0)}>Tất Cả Sản Phẩm</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/filter" onClick={() => window.scrollTo(0, 0)}>Sản Phẩm Bán Chạy</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/order-tracking" onClick={() => window.scrollTo(0, 0)}>Theo Dõi Đơn Hàng</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/news" onClick={() => window.scrollTo(0, 0)}>Tin Tức</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
