import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumbs from "../../components/elements/Breadcrumb";

const NewsDetail = () => {
  const location = useLocation();
  const news = location.state?.news;
  const products = JSON.parse(localStorage.getItem("products")) || [];

  const findProductById = (product_id) => {
    return products.find((product) => product._id === product_id);
  };
  const product = findProductById(news.product_id);
  if (!news) {
    return <div>No news item selected.</div>;
  }

  return (
    <>
      <Breadcrumbs headline="Chi tiết bài viết" />
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{news.news_name}</h1>
        <img
          src={news.img_url}
          alt={news.news_name}
          className="w-70 h-auto mb-4 object-cover"
        />
        <div
          dangerouslySetInnerHTML={{ __html: news.description }}
          className="text-gray-800 leading-7"
        />
        <p className="text-sm text-gray-600 mt-4">
          {new Date(news.created_at).toLocaleString()}
        </p>
        <div className="mt-4">
          <Link
            to="/product"
            state={{ product: product }}
            onClick={() => window.scrollTo(0, 0)}
            className="text-blue-500 text-sm underline"
          >
            {">> "} Tìm hiểu thêm về sản phẩm
          </Link>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
