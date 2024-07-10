import { Link } from "react-router-dom";
import NotFind from "../../assets/images/background/404.png";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="container mx-auto w-full my-2">
      <Link to="/" className="text-blue-500 font-medium flex items-center"><MdOutlineArrowBackIosNew className="mr-2"/> Quay lại trang chủ</Link>
      <div className="flex flex-col items-center justify-center my-8">
        <h1 className="text-3xl font-bold mb-4">
          Đường dẫn không tồn tại hoặc đã bị xóa!
        </h1>
        <p className="text-xl mb-4">
          Vui lòng liên hệ với hỗ trợ để biết thêm chi tiết.
        </p>
        <img src={NotFind} alt="Not Found" />
      </div>
    </div>
  );
};

export default NotFound;
