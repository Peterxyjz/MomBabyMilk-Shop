import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderRating from "../../components/Element/RenderRating";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchProducts, fetchUpdateProduct } from "../../data/api";
import { Card } from "primereact/card";
import { Button, Image, Modal, Switch, Table, notification } from "antd";
import confirm from "antd/es/modal/confirm";
const Product = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const navigate = useNavigate();


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

  const updateProduct = async (product) => {
    const token = JSON.parse(localStorage.getItem("result"));
    console.log(product);
    const id = product._id;
    fetchUpdateProduct(product, token, id);
  };

  const handleSwitchChange = (checked, product) => {
    Modal.confirm({
      title: 'Xác nhận thay đổi trạng thái sản phẩm',
      content: `Bạn có muốn thay đổi trạng thái sản phẩm? Hiện đang ${checked ? 'tắt' : 'bật'}`,
      onOk: async () => {
        product.isActive = checked;
        await updateProduct(product);
        setProducts([...products]);
        notification.success({
          message: 'Thành công',
          description: `Thay đổi thành công! Sản phẩm hiện đang ${checked ? 'bật' : 'tắt'}`,
          placement: 'top',
        });
      },
      onCancel() {
        console.log('Cancel');
      },
      okButtonProps: {
        style: {
          backgroundColor: '#46B5C1',
          borderColor: '#46B5C1',
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: '#FF4D4F',
          borderColor: '#FF4D4F',
          color: '#FFFFFF',
        },
      },
      cancelText: 'Đóng',
      okText: 'Đồng ý',
    });
  };

  const columns = [
    {
      title: 'Hình Ảnh',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      width: 100,
      render: (text) => <Image src={text} alt="Product Image" width={50} />,
    },
    {
      title: 'Sản Phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
      width: 150,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Loại Sản Phẩm',
      dataIndex: 'category_name',
      key: 'category_name',
      width: 150,
    },
    {
      title: 'Thương Hiệu',
      dataIndex: 'brand_name',
      key: 'brand_name',
      width: 150,
    },
    {
      title: 'Số Lượng',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Đánh Giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 100,
      sorter: (a, b) => a.rating - b.rating,
      render: (text) => (
        <div className="flex items-center">
          <RenderRating rating={text} />
          <span className="ml-1 text-gray-500">{text}</span>
        </div>
      ),
    },
    {
      title: 'Lượng Bán',
      dataIndex: 'sales',
      key: 'sales',
      width: 100,
      render: (text) => (
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-gray-400">
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
          {text}
        </div>
      ),
    },
    {
      title: 'Doanh Thu',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 100,
      render: (text) => `${text}`,
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      sorter: (a, b) => a.isActive - b.isActive,
      render: (text, record) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleSwitchChange(checked, record)}
          style={{ backgroundColor: record.isActive ? '#4A99FF' : '#898989' }}
        />
      ),
    },
    {
      title: 'Chi Tiết',
      dataIndex: '_id',
      key: '_id',
      width: 100,
      render: (text) => <a href={`/edit-product?id=${text}`}>Chi Tiết</a>,
    },
  ];

  if (loading) {
    return <div className="text-center font-bold text-2xl">Loading...</div>;
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '120vh' }}>
      <Card title="Tất cả sản phẩm" style={{ width: '90%', marginTop: '50px', height: '110vh' }}>
        <div>
          <div className="flex justify-between items-center mb-4">
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: '#46B5C1', height: '100%' }}
              onClick={() => navigate('/add-product')}
            >
              Thêm sản phẩm mới
            </Button>
            <div>
              <h5 className="text-sm sm:text-base">
                <span className="text-gray-500">Tổng sản phẩm</span>
                <span className="dark:text-white">123456</span>
              </h5>
              <h5 className="text-sm sm:text-base">
                <span className="text-gray-500">Tổng doanh thu</span>
                <span className="dark:text-white">$88.4k</span>
              </h5>
            </div>

          </div>
          <Table
            dataSource={products}
            columns={columns}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: products.length,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
            }}
            rowKey="_id"
          />
        </div>
      </Card>
    </div>
  );
};
export default Product;
