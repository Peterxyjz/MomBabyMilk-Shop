import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../assets/loading2.gif";
import { FaFilter } from "react-icons/fa6";
import { fetchGetFeedbackByUser } from "../../data/api";
import RenderRating from "../elements/RenderRating";

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || null;
  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const feedbackData = await fetchGetFeedbackByUser(user._id);
        setFeedbacks(feedbackData.data.result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getFeedbacks();
  }, [user?._id]);
  console.log(feedbacks);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <img src={Loader} alt="loading" />
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Bình luận của tôi</h1>
        <p>Hiển thị thông tin các đánh giá của bạn tại MomBabyMilk Shop</p>
      </div>
      <hr className="my-4" />
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Nội dung đánh giá..."
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/6"
          />
          <input
            type="date"
            placeholder="Từ ngày"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <input
            type="date"
            placeholder="Đến ngày"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/6"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
            <FaFilter className="mr-2" />
            Lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable className="border">
            <Table.Head>
              <Table.HeadCell className="w-1/7 border">
                Ngày viết
              </Table.HeadCell>
              <Table.HeadCell className="w-2/7 border">Nội dung</Table.HeadCell>
              <Table.HeadCell className="w-1/7 border">Đánh giá</Table.HeadCell>
              <Table.HeadCell className="w-2/7 border">
                Trả lời từ MombabyMilk
              </Table.HeadCell>
              <Table.HeadCell className="w-1/7 border">
                <span className="sr-only"></span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {feedbacks.length > 0 ? (
                feedbacks.map((item) => (
                  <Table.Row
                    key={item._id}
                    className="bg-white border"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 border">
                      {formatDate(item.created_at)}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 border">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 border">
                    <RenderRating rating={item.rating} />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 border">
                    {item.reply_feedback !== null ? 
                      item.reply_feedback.description : "" }
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to="/order-detail"
                        state={{ order: item }}
                        className=" font-medium text-cyan-600 hover:underline"
                      >
                        Xóa bình luận
                      </Link>
                    </Table.Cell>
                  </Table.Row>

                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="6" className="text-center">
                    Bạn chưa đánh giá sản phẩm nào hết!
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
