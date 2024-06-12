import { Button, Navbar } from "flowbite-react";

export function MainNav() {
    return (
        <Navbar fluid rounded>
            <div className="mr-3 h-6 sm:h-9"></div>
            <div className="flex md:order-2"></div>
            <Navbar.Collapse>
                <Navbar.Link href="#" active className="text-lg">
                    Trang chủ
                </Navbar.Link>
                <Navbar.Link href="#" className="text-lg">Tất cả sản phẩm</Navbar.Link>
                <Navbar.Link href="#" className="text-lg">Bán chạy</Navbar.Link>
                <Navbar.Link href="#" className="text-lg">Ưu đãi</Navbar.Link>
                <Navbar.Link href="#" className="text-lg">Tin tức</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
