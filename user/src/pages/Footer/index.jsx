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
            <span>Every Fresh Products</span>
          </div>
          <div className="flex items-center mb-5">
            <FaTruck className="text-3xl mr-2" />
            <span>Free Delivery For Order Over $50</span>
          </div>
          <div className="flex items-center mb-5">
            <FaPercentage className="text-3xl mr-2" />
            <span>Daily Mega Discounts</span>
          </div>
          <div className="flex items-center mb-5">
            <FaThumbsUp className="text-3xl mr-2" />
            <span>Best Price On The Market</span>
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
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
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
