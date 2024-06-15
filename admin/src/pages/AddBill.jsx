import { useEffect, useState } from "react";
import { fetchProducts } from "../data/api";
import { Button } from "flowbite-react";

const AddBill = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);
  if (loading) {
    return <div className="text-center font-bold text-2xl">Loading...</div>;
  }
  return (
    <div className="container mx-auto px-2 py-2">
      <div className="w-full flex gap-8 min-h-screen">
        {/* table */}
        <div className="w-2/3 h-full">
          <h1 className="text-2xl font-bold mx-4">Chọn Sản Phẩm</h1>
          <section className=" py-3 sm:py-5">
            <div className="px-4 mx-auto max-w-screen-2xl lg:px-12 min-h-screen flex flex-col">
              <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg flex-grow">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Sản Phẩm
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Số Lượng
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Lượt Bán
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Giá Tiền
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Nhập Hàng
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <th
                              scope="row"
                              className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <img
                                src={product.imgUrl}
                                alt=""
                                className="w-auto h-8 mr-3"
                              />
                              {product.product_name}
                            </th>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {product.amount}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Lượt Bán
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {Number(product.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </td>
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <Button>
                                Nhập Hàng
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={9}
                            className="text-center font-bold text-2xl"
                          >
                            Không tìm thấy sản phẩm
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* bills */}
        {/* table */}
        <div className="w-1/3 h-full">
          <h1 className="text-2xl font-bold mx-4">Đơn Nhập Hàng</h1>
        </div>
      </div>
    </div>
  );
};

export default AddBill;
