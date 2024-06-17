import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <Navbar fluid rounded>
      <div className="mr-3 h-6 sm:h-9"></div>
      <div className="flex md:order-2"></div>
      <Navbar.Collapse>
        <Navbar.Link active className="text-lg">
          <Link to="/">Trang chủ</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/filter">Tất Cả Sản Phẩm</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link>Bán Chạy Sản Phẩm</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link>Ưu Đãi</Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link>Tin Tức</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
