import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaTruck, FaTags, FaPercentage, FaThumbsUp } from "react-icons/fa";
import logo from "../../assets/images/logo/Logo.png";

export default function MainFooter() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="flex justify-around">
          <div className="flex items-center mb-5">
            <FaTruck className="text-3xl mr-2" />
            <span>Hàng Luôn Được Cập Nhật</span>
          </div>
          <div className="flex items-center mb-5">
            <FaTruck className="text-3xl mr-2" />
            <span>Miễn Phí Giao Hàng Nội Thành</span>
          </div>
          <div className="flex items-center mb-5">
            <FaPercentage className="text-3xl mr-2" />
            <span>Luôn Có Ưu Đãi</span>
          </div>
          <div className="flex items-center mb-5">
            <FaThumbsUp className="text-3xl mr-2" />
            <span>Bình Ổn Giá Thị Trường</span>
          </div>
        </div>
        <div className="border-t border-gray-300 mb-8"></div>
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="/"
              src={logo}
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Về MOMBABYMILK" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about_us">Về chúng tôi</Footer.Link>
                <Footer.Link href="/contact">Liên hệ</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Chính sách" />
              <Footer.LinkGroup col>
                <Footer.Link href="/exchange_policy">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Flowbite™" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
