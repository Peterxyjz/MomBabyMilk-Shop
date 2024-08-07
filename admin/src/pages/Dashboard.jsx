import React, { useEffect, useState } from "react";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { useStateContext } from "../contexts/ContextProvider";
import {
  fetchAllUsers,
  fetchOrder,
  fetchProducts,
  fetchRevenue,
} from "../data/api";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { Col, Row, Select } from "antd";
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
  // const [profit, setProfit] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  // const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Sắp hết");
  const [revenueTimeRange, setRevenueTimeRange] = useState('thisWeek');
  const [profitTimeRange, setProfitTimeRange] = useState('thisWeek');
  const [salesTimeRange, setSalesTimeRange] = useState('thisWeek');
  const [order, setOrder] = useState([]);
  const { Option } = Select;

  //fetch revenue
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

  //fetch customer
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

  //fetch product
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

  //fetch order
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
  }, [salesTimeRange]);

  //time in Vietnam
  const timezoneOffset = 7 * 60; // GMT+7 in minutes
  const convertToVietnamTime = (date) => {
    const utcDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
    const vietnamDate = new Date(utcDate.getTime() + (timezoneOffset * 60000));
    return vietnamDate;
  };

  const calculateTotalProfit = (data, timeRange) => {
    const now = new Date();
    let filteredData = [];

    const startOfToday = convertToVietnamTime(new Date(now.setHours(0, 0, 0, 0)));

    if (timeRange === 'today') {
      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfToday;
      });
    } else if (timeRange === 'thisWeek') {
      const startOfWeek = convertToVietnamTime(new Date(now.setDate(now.getDate() - (now.getDay() + 6) % 7)));
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      console.log("dau tuan:", startOfWeek.toISOString(), "cuoi tuan:", endOfWeek.toISOString());

      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfWeek && completedDate <= endOfWeek;
      });
    } else if (timeRange === 'thisMonth') {
      const startOfMonth = convertToVietnamTime(new Date(now.getFullYear(), now.getMonth(), 1));
      startOfMonth.setHours(0, 0, 0, 0);

      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfMonth;
      });
    } else if (timeRange === 'thisYear') {
      const startOfYear = convertToVietnamTime(new Date(now.getFullYear(), 0, 1));
      startOfYear.setHours(0, 0, 0, 0);

      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfYear;
      });
    } else if (timeRange === 'all') {
      filteredData = data;
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

  //tinh doanh thu
  const calculateTotalRevenue = (data, timeRange) => {
    const now = new Date();
    let filteredData = [];

    const startOfToday = convertToVietnamTime(new Date(now.setHours(0, 0, 0, 0)));

    if (timeRange === 'today') {
      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfToday;
      });
    } else if (timeRange === 'thisWeek') {
      const startOfWeek = convertToVietnamTime(new Date(now.setDate(now.getDate() - (now.getDay() + 6) % 7)));
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      console.log("dau tuan:", startOfWeek.toISOString(), "cuoi tuan:", endOfWeek.toISOString());

      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfWeek && completedDate <= endOfWeek;
      });
    } else if (timeRange === 'thisMonth') {
      const startOfMonth = convertToVietnamTime(new Date(now.getFullYear(), now.getMonth(), 1));
      startOfMonth.setHours(0, 0, 0, 0);

      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfMonth;
      });
    } else if (timeRange === 'thisYear') {
      const startOfYear = convertToVietnamTime(new Date(now.getFullYear(), 0, 1));
      startOfYear.setHours(0, 0, 0, 0);

      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.completed_date));
        return completedDate >= startOfYear;
      });
    } else if (timeRange === 'all') {
      filteredData = data;
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
    const startOfToday = convertToVietnamTime(new Date(now.setHours(0, 0, 0, 0)));

    let filteredData = [];

    if (timeRange === 'today') {
      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.order.shipped_date));
        return completedDate >= startOfToday && item.order.status === 2;
      });
    } else if (timeRange === 'thisWeek') {
      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.order.shipped_date));
        const startOfWeek = convertToVietnamTime(new Date(now.setDate(now.getDate() - (now.getDay() + 6) % 7)));
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return completedDate >= startOfWeek && completedDate <= endOfWeek && item.order.status === 2;
      });
      console.log("sales:", filteredData);
    } else if (timeRange === 'thisMonth') {
      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.order.shipped_date));
        const startOfMonth = convertToVietnamTime(new Date(now.getFullYear(), now.getMonth(), 1));
        startOfMonth.setHours(0, 0, 0, 0);

        return completedDate >= startOfMonth && item.order.status === 2;
      });
    } else if (timeRange === 'thisYear') {
      filteredData = data.filter(item => {
        const completedDate = convertToVietnamTime(new Date(item.order.shipped_date));
        const startOfYear = convertToVietnamTime(new Date(now.getFullYear(), 0, 1));
        startOfYear.setHours(0, 0, 0, 0);

        return completedDate >= startOfYear && item.order.status === 2;
      });
    } else if (timeRange === 'all') {
      filteredData = data;
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
        <Select defaultValue="thisWeek" style={{ width: '110px' }} onChange={(value) => setRevenueTimeRange(value)}>
          <Option value="today">Hôm nay</Option>
          <Option value="thisWeek">Tuần này</Option>
          <Option value="thisMonth">Tháng này</Option>
          <Option value="thisYear">Năm nay</Option>
          <Option value="all">Tất cả</Option>
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
        <Select defaultValue="thisWeek" style={{ width: '110px' }} onChange={(value) => setProfitTimeRange(value)}>
          <Option value="today">Hôm nay</Option>
          <Option value="thisWeek">Tuần này</Option>
          <Option value="thisMonth">Tháng này</Option>
          <Option value="thisYear">Năm nay</Option>
          <Option value="all">Tất cả</Option>
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
        <Select defaultValue="thisWeek" style={{ width: '110px' }} onChange={(value) => setSalesTimeRange(value)}>
          <Option value="today">Hôm nay</Option>
          <Option value="thisWeek">Tuần này</Option>
          <Option value="thisMonth">Tháng này</Option>
          <Option value="thisYear">Năm nay</Option>
          <Option value="all">Tất cả</Option>
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
                    Thống kê lợi nhuận
                  </p>
                </div>

                <div className="mt-0">
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
