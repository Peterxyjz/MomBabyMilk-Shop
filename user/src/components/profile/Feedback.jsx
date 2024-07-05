import { Button, Table, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import Loader from "../../assets/loading2.gif";
import { FaFilter } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { fetchGetFeedbackByUser } from "../../data/api";
import RenderRating from "../elements/RenderRating";

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const products = JSON.parse(localStorage.getItem("products"));
  const user = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const findProductById = (product_id) => {
      return products.find((product) => product._id === product_id);
    };

    const getReviews = async () => {
      try {
        const feedbackData = await fetchGetFeedbackByUser(user._id);
        const reviews = feedbackData.data.result;

        const updatedReviews = await Promise.all(
          reviews.map(async (item) => {
            const product = findProductById(item.product_id);
            return { ...item, product };
          })
        );

        setReviews(updatedReviews);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getReviews();
  }, [user._id, products]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const openFeedbackModal = (feedback) => {
    setCurrentFeedback(feedback);
    setShowModal(true);
  };

  const closeFeedbackModal = () => {
    setShowModal(false);
    setCurrentFeedback(null);
  };

  const handleFeedbackChange = (e) => {
    setCurrentFeedback({ ...currentFeedback, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setCurrentFeedback({ ...currentFeedback, rating: newRating });
  };

  const submitFeedback = () => {
    if(currentFeedback.rating === 0 || currentFeedback.description === "") {
      alert("Vui lòng nhập đủ thông tin đánh giá và mô tả sản phẩm.");
      return;
    }
    closeFeedbackModal();
  };

  const deleteFeedback = () => {
    console.log("delete: ", currentFeedback);
    closeFeedbackModal();
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
              {reviews.length > 0 ? (
                reviews.map((item) => (
                  <Table.Row key={item._id} className="bg-white border">
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
                      {item.reply_feedback !== null ? item.reply_feedback.description : ""}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="light"
                        size={"md"}
                        className="mx-auto"
                        onClick={() => openFeedbackModal(item)}
                      >
                        Chi tiết
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="7" className="text-center">
                    Bạn chưa đánh giá sản phẩm nào hết!
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>

      {currentFeedback && (
        <Modal show={showModal} onClose={closeFeedbackModal}>
          <Modal.Header className="text-xl font-semibold">
            Đánh giá sản phẩm:
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <img
                  src={currentFeedback.product.imgUrl}
                  alt={currentFeedback.product.product_name}
                  className="w-32 h-32 object-cover mx-auto"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                  Tên sản phẩm:
                </label>
                <input
                  type="text"
                  value={currentFeedback.product.product_name}
                  className="mt-1 p-2 border rounded w-full"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                  Nội dung feedback:
                </label>
                <textarea
                  name="description"
                  className="mt-1 p-2 border rounded w-full"
                  rows="5"
                  value={currentFeedback.description}
                  onChange={handleFeedbackChange}
                />
              </div>
              <div className="flex items-center">
                <label className="block text-xl font-medium text-gray-700 dark:text-gray-200 mr-4">
                  Đánh giá:
                </label>
                <RenderRating
                  rating={currentFeedback.rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="blue" size={"md"}  onClick={submitFeedback}>
              <RxUpdate className="text-lg mr-1"/>Cập nhật
            </Button>
            <Button color="failure"  size={"md"} onClick={deleteFeedback}>
              <AiOutlineDelete className="text-lg mr-1"/> Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Feedback;
