import React, { useEffect, useState } from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import product9 from "../data/product9.jpg";
import {
  fetchAllUsers,
  fetchCategories,
  fetchOrder,
  fetchProducts,
  fetchRefreshToken,
  fetchRevenue,
} from "../data/api";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { Col, Row, Select } from "antd";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import RevenueMixCost from "../components/Dashboard/RevenueMixCost";
import MonthlyProfit from "../components/Dashboard/MonthlyProfit";
import BestCategory from "../components/Dashboard/BestCategory";
import ProductStock from "../components/Dashboard/ProductStock";
import MonthlyOrder from "../components/Dashboard/MonthlyOrder";

const DropDown = ({ currentMode, onSelect }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "option", value: "Id" }}
      style={{
        border: "none",
        color: currentMode === "Dark" ? "white" : "black",
      }}
      value="1"
      dataSource={[
        { Id: "1", option: "Sắp hết" },
        { Id: "2", option: "Nhiều nhất" },
      ]}
      popupHeight="220px"
      popupWidth="120px"
      change={(e) => onSelect(e.itemData.option)}
    />
  </div>
);

const Dashboard = ({ isAuthenticatedAdmin, isAuthenticatedStaff }) => {
  const { currentColor, currentMode } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [revenues, setRevenues] = useState([]);
  const [profit, setProfit] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Sắp hết");
  const [revenueTimeRange, setRevenueTimeRange] = useState('today');
  const [profitTimeRange, setProfitTimeRange] = useState('today');
  const [salesTimeRange, setSalesTimeRange] = useState('today');
  const [order, setOrder] = useState([]);
  const { Option } = Select;

  const result = JSON.parse(localStorage.getItem("result")) || null;
  useEffect(() => {
    const checkToken = async () => {
      if (result !== null) {
        console.log("result: ", result);
        await fetchRefreshToken(result)
          .then((res) => {
            localStorage.setItem("result", JSON.stringify(res.data.result));
          })
          .catch((error) => {
            console.log("Error refreshing token:", error);
            localStorage.removeItem("user");
            localStorage.removeItem("result");
            localStorage.removeItem("isAuthenticatedStaff");
            window.location.reload();

          });
      }
    };
    checkToken();
  }, [])
  {/* fetch revenue */ }
  useEffect(() => {
    const getRevenue = async () => {
      try {
        const data = await fetchRevenue();
        setRevenues(data);
        calculateTotalRevenue(data, revenueTimeRange);
        calculateTotalProfit(data, profitTimeRange);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching revenue:", error);
        setLoading(false);
      }
    };

    getRevenue();
  }, [revenueTimeRange, profitTimeRange]);

  {/* fetch customer */ }
  useEffect(() => {
    const getCustomer = async () => {
      try {
        const result = JSON.parse(localStorage.getItem("result"));
        const response = await fetchAllUsers(result);
        const data = response.data.users;
        setCustomers(data);
        calculateCustomer(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };

    getCustomer();
  }, []);

  {/* fetch product */ }
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        calculateProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  {/* fetch order */ }
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrder();
        setOrder(orderData);
        calculateTotalSales(orderData, salesTimeRange);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    getOrders();
    console.log(order);
  }, [salesTimeRange]);

  const calculateTotalProfit = (data, timeRange) => {
    const now = new Date();
    let filteredData = [];

    if (timeRange === 'today') {
      filteredData = data.filter(item => new Date(item.completed_date).toDateString() === now.toDateString());
    } else if (timeRange === 'thisWeek') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      filteredData = data.filter(item => new Date(item.completed_date) >= startOfWeek);
    } else if (timeRange === 'thisMonth') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filteredData = data.filter(item => new Date(item.completed_date) >= startOfMonth);
    }

    let total = 0;
    filteredData.forEach(item => {
      if (item.type === 1) {
        total += item.total;
      } else {
        total -= item.total;
      }
    });
    setTotalProfit(total);
  };

  const calculateTotalRevenue = (data, timeRange) => {
    const now = new Date();
    let filteredData = [];

    if (timeRange === 'today') {
      filteredData = data.filter(item => new Date(item.completed_date).toDateString() === now.toDateString());
    } else if (timeRange === 'thisWeek') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      filteredData = data.filter(item => new Date(item.completed_date) >= startOfWeek);
    } else if (timeRange === 'thisMonth') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filteredData = data.filter(item => new Date(item.completed_date) >= startOfMonth);
    }

    let total = 0;
    filteredData.forEach(item => {
      if (item.type === 1) {
        total += item.total;
      }
    });
    setTotalRevenue(total);
  };

  const calculateCustomer = (data) => {
    let total = 0;
    data.forEach((item) => {
      if (item.role_name === "Member") {
        total++;
      }
    });
    setTotalCustomer(total);
  };

  const calculateProduct = (data) => {
    let total = 0;
    data.forEach((item) => {
      total++;
    });
    setTotalProduct(total);
  };

  const calculateTotalSales = (data, timeRange) => {
    const now = new Date();
    let filteredData = [];

    if (timeRange === 'today') {
      filteredData = data.filter(order => new Date(order.order.shipped_date).toDateString() === now.toDateString() && order.order.status === 2);
    } else if (timeRange === 'thisWeek') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      filteredData = data.filter(order => new Date(order.order.shipped_date) >= startOfWeek && order.order.status === 2);
    } else if (timeRange === 'thisMonth') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      filteredData = data.filter(order => new Date(order.order.shipped_date) >= startOfMonth && order.order.status === 2);
    }

    let total = 0;
    filteredData.forEach(order => {
      total += order.order_detail.reduce((acc, item) => acc + item.amount, 0);
    });
    setTotalSales(total);
  };


  const earningData = [
    {
      icon: <BsCurrencyDollar />,
      amount: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalRevenue),
      // percentage: '-4%',
      title: "Tổng doanh thu",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
      pcColor: "green-600",
      dropdown: (
        <Select defaultValue="today" onChange={(value) => setRevenueTimeRange(value)}>
          <Option value="today">Hôm nay</Option>
          <Option value="thisWeek">Tuần này</Option>
          <Option value="thisMonth">Tháng này</Option>
        </Select>
      )
    },
    {
      icon: <BsCurrencyDollar />,
      amount: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalProfit),
      // percentage: '-4%',
      title: "Tổng lợi nhuận",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
      dropdown: (
        <Select defaultValue="today" onChange={(value) => setProfitTimeRange(value)}>
          <Option value="today">Hôm nay</Option>
          <Option value="thisWeek">Tuần này</Option>
          <Option value="thisMonth">Tháng này</Option>
        </Select>
      )
    },
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: totalCustomer,
      // percentage: '-4%',
      title: "Tổng khách hàng",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
      pcColor: "red-600",
    },
    {
      icon: <BsBoxSeam />,
      amount: totalProduct,
      // percentage: '+23%',
      title: "Tổng sản phẩm",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600",
    },
    {
      icon: <FiBarChart />,
      amount: totalSales,
      // percentage: '+38%',
      title: "Tổng lượt bán",
      iconColor: "rgb(228, 106, 118)",
      iconBg: "rgb(255, 244, 229)",

      pcColor: "green-600",
      dropdown: (
        <Select defaultValue="today" onChange={(value) => setSalesTimeRange(value)}>
          <Option value="today">Hôm nay</Option>
          <Option value="thisWeek">Tuần này</Option>
          <Option value="thisMonth">Tháng này</Option>
        </Select>
      )
    },
  ];

  if (loading) {
    return <div className="w-full h-full mx-6 py-6">Loading...</div>;
  }
  return (
    <div className="mt-24">

      {isAuthenticatedAdmin && (
        <div>
          {/*Row 1*/}
          <div className="flex flex-wrap lg:flex-nowrap justify-center ">
            <Row justify="space-between" gutter={[16, 16]}>
              {earningData.map((item) => (
                <Col key={item.title} span={4}>
                  <div style={{ position: 'relative' }} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                      {item.dropdown}
                    </div>

                    <button
                      type="button"
                      style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                      }}
                      className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
                    >
                      {item.icon}
                    </button>
                    <p className="mt-3">
                      <span className="text-lg font-semibold">
                        {item.amount}
                      </span>
                      <span className={`text-sm text-${item.pcColor} ml-2`}>
                        {item.percentage}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{item.title}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/*Row 2*/}
          <div className="flex gap-10 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
              <div className="flex justify-between">
                <p className="font-semibold text-xl">
                  Bảng tương quan giữa doanh thu và vốn
                </p>
              </div>
              <div>
                <RevenueMixCost />
              </div>
            </div>
            <div>
              <div
                className=" rounded-2xl md:w-400 p-4 m-3"
                style={{ backgroundColor: currentColor }}
              >
                <div className="flex justify-between items-center ">
                  <p className="font-semibold text-white text-xl">
                    Lợi nhuận theo tháng
                  </p>
                </div>

                <div className="mt-4">
                  <MonthlyProfit />
                </div>
              </div>

              <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
                <div>
                  <p className="text-xl font-semibold ">
                    Thống kê phân loại sữa theo lượt mua
                  </p>
                </div>

                <div className="w-40">
                  <BestCategory />
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex gap-10 m-4 flex-wrap justify-center">
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
              <div className="flex justify-between items-center gap-2">
                <p className="text-xl font-semibold">Số lượng hàng tồn kho</p>
                <DropDown
                  currentMode={currentMode}
                  onSelect={setSelectedOption}
                />
              </div>
              <div className="mt-2 w-72 md:w-400">
                <ProductStock selectedOption={selectedOption} />
              </div>
            </div>
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
              <div className="flex justify-between items-center gap-2 mb-10">
                <p className="text-xl font-semibold">
                  Thống kê trạng thái đơn hàng theo tháng
                </p>
              </div>
              <div className="md:w-full overflow-auto">
                <MonthlyOrder />
              </div>
            </div>
          </div>
        </div>
      )}

      {isAuthenticatedStaff && (
        <div className="w-full">Dashboard cho staff</div>
      )}
    </div>
  );
};

export default Dashboard;
