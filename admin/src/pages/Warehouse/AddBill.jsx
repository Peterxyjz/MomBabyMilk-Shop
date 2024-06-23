import { useEffect, useState } from "react";
import { fetchProducts, fetchUploadBill } from "../../data/api";
import { Button } from "flowbite-react";
import { Card } from "primereact/card";
import { Col, InputNumber, Row, Table, notification } from 'antd';
import moment from 'moment';
import { Navigate } from "react-router-dom";


const AddBill = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [billProducts, setBillProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const token = JSON.parse(localStorage.getItem("result"));
  const [formState, setFormState] = useState({}); // Thêm state để quản lý form

  //ham phan chia trang
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

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


  const productTable = [
    {
      title: 'Hình Ảnh',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (imgUrl) => (
        <img src={imgUrl} alt="product" className="w-auto h-8" />
      ),
    },
    {
      title: 'Sản Phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Lượt Bán',
      dataIndex: 'sales',
      key: 'sales',
    },
    {
      title: 'Giá Tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price) => Number(price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
      sorter: (a, b) => a.price - b.price,
    },
  ]

  //chon san pham
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedProducts(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const billTable = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <InputNumber min={1} value={record.amount} onChange={(value) => handleQuantityChange(value, record)} />
      ),
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => Number(price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleDeleteFromBill(record)}>
          Xóa
        </Button>
      ),
    },
  ];

  //thay doi so luong trong bill
  const handleQuantityChange = (value, record) => {
    const newData = billProducts.map((item) => {
      if (item._id === record._id) {
        return { ...item, amount: value };
      }
      return item;
    });
    setBillProducts(newData);
  };

  //tinh tong tien goc
  const calculatePrice = () => {
    return billProducts.reduce((total, product) => total + product.price * product.amount, 0);
  };
  const getDiscountPercentage = (amount) => {
    if (amount > 20) return 60;
    if (amount >= 10) return 40;
    if (amount >= 1) return 20;
    return 0;
  };
  const calculateTotalDiscount = () => {
    const totalAmount = billProducts.reduce((total, product) => total + product.amount, 0);
    const discountPercentage = getDiscountPercentage(totalAmount);
    const originalTotal = calculatePrice();
    return originalTotal * (discountPercentage / 100);
  };

  //tinh tong tien
  const calculateTotal = () => {
    return calculatePrice() - calculateTotalDiscount();
  };

  //them vao bill
  const handleAddToBill = () => {
    const newBillProducts = [...billProducts];
    selectedProducts.forEach(product => {
      if (!newBillProducts.some(item => item._id === product._id)) {
        newBillProducts.push({ ...product, amount: 1 });
      }
    });
    setBillProducts(newBillProducts);
    setSelectedRowKeys([]);
    setSelectedProducts([]);
  };

  const handleDeleteFromBill = (record) => {
    const newBillProducts = billProducts.filter(item => item._id !== record._id);
    setBillProducts(newBillProducts);
    notification.success({
      message: 'Xóa thành công',
      description: 'Xóa sản phẩm khỏi đơn nhập hàng thành công',
      placement: 'top'
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const inputBill = {
      input_date: moment().toISOString(),
      inputBillDetailList: billProducts.map(product => ({
        product_id: product._id,
        amount: product.amount
      })
    ),
    total: calculateTotal()
    };

    try {
      await fetchUploadBill(inputBill, token);
      notification.success({
        message: 'Tạo đơn nhập hàng thành công',
        placement: 'top'
      });
      setBillProducts([]); //reset 
      setFormState({}); //reset
    } catch (error) {
      console.error('Lỗi từ server:', error.response.data);
      alert(`Lỗi khi tạo đơn: ${error.response.data.message}`);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Row justify="space-between" style={{ flexGrow: 1 }}>
        <Col span={13}>
          <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
            <Card
              title="Chọn sản phẩm"
              style={{ width: '90%', marginTop: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh' }}
            >
              <div style={{ marginBottom: 16, textAlign: 'right' }} onClick={() => Navigate('/add-brand')}>
                <Button type="primary" style={{ backgroundColor: '#46B5C1' }} disabled={selectedRowKeys.length === 0} onClick={handleAddToBill}>Nhập Hàng</Button>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Table
                  columns={productTable}
                  dataSource={products}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: products.length,
                  }}
                  scroll={{ x: '100%' }}
                  onChange={handleTableChange}
                  rowKey="_id"
                  locale={{ emptyText: 'Không tìm thấy sản phẩm' }}
                  rowSelection={rowSelection}
                />
              </div>
            </Card>
          </div>
        </Col>
        <Col span={11}>
          <div style={{ display: 'flex', justifyContent: 'center', height: '90vh' }}>
            <Card title="Đơn nhập hàng" style={{ width: '90%', marginTop: '50px', height: '90vh' }}>
              <div style={{ marginBottom: 16, textAlign: 'right' }}>
                <Button type="primary" style={{ backgroundColor: '#46B5C1' }} disabled={billProducts.length === 0} onClick={handleSubmit}>Tạo đơn</Button>
              </div>
              <p>Ngày làm đơn: {moment().format('DD/MM/YYYY HH:mm:ss')}</p>
              <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <Table
                  columns={billTable}
                  dataSource={billProducts}
                  pagination={false}
                  rowKey={(record) => record.key || record._id}
                  scroll={{ y: "50vh" }}
                />
              </div>
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p>Tổng giá theo giá sản phẩm: </p>
                  <strong>
                    {Number(calculatePrice()).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })},
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p>Giá chiết khấu ({getDiscountPercentage(billProducts.reduce((total, product) => total + product.amount, 0))}%): </p>
                  <strong>
                    {Number(calculateTotalDiscount()).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })},
                  </strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Tổng Tiền: </strong>
                <strong>
                  {Number(calculateTotal()).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strong>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>


  );
};

export default AddBill;
